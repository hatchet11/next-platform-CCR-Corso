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

  // Load logo
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.jpg')
  const logoBuffer = fs.readFileSync(logoPath)

  // Resize logo to 20% of image width
  const watermarkSize = Math.round(width * 0.20)
  const resized = await sharp(logoBuffer)
    .resize(watermarkSize, watermarkSize, { fit: 'inside' })
    .ensureAlpha()
    .toBuffer()

  // Manually set alpha channel to 25% opacity
  const { data, info } = await sharp(resized).raw().toBuffer({ resolveWithObject: true })
  for (let i = 3; i < data.length; i += 4) {
    data[i] = Math.round(data[i] * 0.25)
  }
  const watermark = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer()

  // Position: centered
  const wmMeta = await sharp(watermark).metadata()
  const left = Math.round((width - (wmMeta.width ?? watermarkSize)) / 2)
  const top = Math.round((height - (wmMeta.height ?? watermarkSize)) / 2)

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

  // Apply CCR logo watermark at 15% opacity
  const watermarked = await applyWatermark(arrayBuffer)

  const store = getStore('kennel-photos')
  await store.set(id, watermarked.buffer as ArrayBuffer, { metadata: { contentType: 'image/jpeg' } })

  const index = await getIndex(store)
  index.photos.unshift({ id, caption, uploadedAt: new Date().toISOString(), contentType: 'image/jpeg' })
  await store.setJSON('index', index)

  return NextResponse.json({ ok: true, id })
}
