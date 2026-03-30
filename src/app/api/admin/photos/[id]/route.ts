import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'

type PhotoIndex = { photos: { id: string; caption: string; uploadedAt: string; contentType: string }[] }

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const { id } = await params
  const store = getStore('kennel-photos')
  await store.delete(id)
  const index = (await store.get('index', { type: 'json' }) as PhotoIndex | null) ?? { photos: [] }
  index.photos = index.photos.filter(p => p.id !== id)
  await store.setJSON('index', index)
  return NextResponse.json({ ok: true })
}
