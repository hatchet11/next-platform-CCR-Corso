import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

type PhotoMeta = { id: string; caption: string; uploadedAt: string; contentType: string }
type PhotoIndex = { photos: PhotoMeta[] }

async function getIndex(store: ReturnType<typeof getStore>): Promise<PhotoIndex> {
  const raw = await store.get('index', { type: 'json' }) as PhotoIndex | null
  return raw ?? { photos: [] }
}

async function applyWatermark(input: ArrayBuffer): Promise<Buffer> {
  const inputBuffer = Buffer.from(input)
  const image = sharp(inputBuffer)
  const { width = 800, height = 600 } = await image.metadata()

  // Load CCR Kennels logo
  const logoPath = path.join(process.cwd(), 'public', 'images', 'watermark-logo.jpeg')
  const logoBuffer = fs.readFileSync(logoPath)

  // Resize logo to 30% of image width
  const watermarkSize = Math.round(width * 0.30)
  const resized = await sharp(logoBuffer)
    .resize(watermarkSize, watermarkSize, { fit: 'inside' })
    .ensureAlpha()
    .toBuffer()

  const resizedMeta = await sharp(resized).metadata()
  const wmW = resizedMeta.width ?? watermarkSize
  const wmH = resizedMeta.height ?? watermarkSize

  // Remove dark background: use pixel brightness as alpha, then apply 15% opacity
  // Dark pixels (background) → transparent; gold pixels → visible at 15%
  const { data } = await sharp(resized).raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const brightness = r * 0.299 + g * 0.587 + b * 0.114
    data[i + 3] = Math.round((brightness / 255) * 255 * 0.20)
  }
  const watermark = await sharp(data, {
    raw: { width: wmW, height: wmH, channels: 4 },
  }).png().toBuffer()

  // Position: centered
  const left = Math.round((width - wmW) / 2)
  const top = Math.round((height - wmH) / 2)

  return image
    .composite([{ input: watermark, left, top, blend: 'over' }])
    .jpeg({ quality: 90 })
    .toBuffer()
}

export async function GET(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const store = getStore('kennel-photos')
  const index = await getIndex(store)
  return NextResponse.json(index.photos)
}

export async function POST(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('photo') as File | null
  const caption = (formData.get('caption') as string) || ''

  if (!file) return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ ok: false, error: 'File too large (max 5MB)' }, { status: 400 })

  const id = `photo-${Date.now()}`
  const arrayBuffer = await file.arrayBuffer()

  // Apply CCR Kennels logo watermark at 15% opacity centered
  const watermarked = await applyWatermark(arrayBuffer)

  const store = getStore('kennel-photos')
  await store.set(id, watermarked.buffer as ArrayBuffer, { metadata: { contentType: 'image/jpeg' } })

  const index = await getIndex(store)
  index.photos.unshift({ id, caption, uploadedAt: new Date().toISOString(), contentType: 'image/jpeg' })
  await store.setJSON('index', index)

  return NextResponse.json({ ok: true, id })
}
