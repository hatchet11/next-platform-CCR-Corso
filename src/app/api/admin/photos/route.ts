import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'
import sharp from 'sharp'
import { WATERMARK_B64 } from '@/lib/watermark-logo'

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

  const logoBuffer = Buffer.from(WATERMARK_B64, 'base64')
  const watermarkSize = Math.round(width * 0.30)

  // Resize logo — force PNG so we always get 4-channel RGBA (JPEG has no alpha)
  const resized = await sharp(logoBuffer)
    .resize(watermarkSize, watermarkSize, { fit: 'inside' })
    .ensureAlpha()
    .png()
    .toBuffer()

  const { data, info } = await sharp(resized).raw().toBuffer({ resolveWithObject: true })
  const wmW = info.width
  const wmH = info.height

  // Logo is gold on dark background:
  // Dark pixels (background) → fully transparent
  // Gold/light pixels (logo) → exactly 18% opacity
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

  let imageBuffer: Buffer
  let watermarked = false
  try {
    imageBuffer = await applyWatermark(arrayBuffer)
    watermarked = true
  } catch (err) {
    console.error('[watermark error — saving original]', err)
    imageBuffer = Buffer.from(arrayBuffer)
  }

  const store = getStore('kennel-photos')
  try {
    await store.set(id, imageBuffer as unknown as ArrayBuffer, { metadata: { contentType: 'image/jpeg' } })

    const index = await getIndex(store)
    index.photos.unshift({ id, caption, uploadedAt: new Date().toISOString(), contentType: 'image/jpeg' })
    await store.setJSON('index', index)
  } catch (err) {
    console.error('[blob store error]', err)
    return NextResponse.json({ ok: false, error: `Storage failed: ${String(err)}` }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id, watermarked })
}
