import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'

type PhotoMeta = { id: string; caption: string; uploadedAt: string; contentType: string }
type PhotoIndex = { photos: PhotoMeta[] }

async function getIndex(store: ReturnType<typeof getStore>): Promise<PhotoIndex> {
  const raw = await store.get('index', { type: 'json' }) as PhotoIndex | null
  return raw ?? { photos: [] }
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
  const buffer = Buffer.from(await file.arrayBuffer())
  const store = getStore('kennel-photos')

  await store.set(id, buffer, { metadata: { contentType: file.type } })

  const index = await getIndex(store)
  index.photos.unshift({ id, caption, uploadedAt: new Date().toISOString(), contentType: file.type })
  await store.setJSON('index', index)

  return NextResponse.json({ ok: true, id })
}
