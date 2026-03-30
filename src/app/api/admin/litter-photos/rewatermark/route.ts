import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'
import sharp from 'sharp'
import { WATERMARK_B64 } from '@/lib/watermark-logo'

type PhotoMeta = { id: string; caption: string; uploadedAt: string; contentType: string }
type PhotoIndex = { photos: PhotoMeta[] }

async function applyWatermark(input: ArrayBuffer): Promise<Buffer> {
  const inputBuffer = Buffer.from(input)
  const image = sharp(inputBuffer)
  const { width = 800, height = 600 } = await image.metadata()

  const logoBuffer = Buffer.from(WATERMARK_B64, 'base64')
  const watermarkSize = Math.round(width * 0.30)

  const resized = await sharp(logoBuffer)
    .resize(watermarkSize, watermarkSize, { fit: 'inside' })
    .ensureAlpha()
    .png()
    .toBuffer()

  const { data, info } = await sharp(resized).raw().toBuffer({ resolveWithObject: true })
  const wmW = info.width
  const wmH = info.height

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const isDark = r < 80 && g < 70 && b < 90
    data[i + 3] = isDark ? 0 : Math.round(255 * 0.18)
  }

  const watermark = await sharp(Buffer.from(data), {
    raw: { width: wmW, height: wmH, channels: 4 },
  }).png().toBuffer()

  const left = Math.round((width - wmW) / 2)
  const top = Math.round((height - wmH) / 2)

  return image
    .composite([{ input: watermark, left, top, blend: 'over' }])
    .jpeg({ quality: 90 })
    .toBuffer()
}

export async function POST(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const store = getStore('litter-photos')
  const raw = await store.get('index', { type: 'json' }) as PhotoIndex | null
  const index = raw ?? { photos: [] }

  if (index.photos.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, message: 'No photos to re-watermark' })
  }

  let processed = 0
  const errors: string[] = []

  for (const photo of index.photos) {
    try {
      const blob = await store.get(photo.id, { type: 'arrayBuffer' })
      if (!blob) { errors.push(`${photo.id}: not found`); continue }

      const watermarked = await applyWatermark(blob)
      await store.set(photo.id, watermarked as unknown as ArrayBuffer, { metadata: { contentType: 'image/jpeg' } })
      processed++
    } catch (err) {
      errors.push(`${photo.id}: ${String(err)}`)
    }
  }

  return NextResponse.json({ ok: true, processed, total: index.photos.length, errors })
}
