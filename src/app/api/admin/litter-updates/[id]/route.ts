import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'

type UpdateIndex = { updates: { id: string; title: string; body: string; createdAt: string }[] }

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const { id } = await params
  const store = getStore('litter-updates')
  const raw = await store.get('index', { type: 'json' }) as UpdateIndex | null
  const index = raw ?? { updates: [] }
  index.updates = index.updates.filter(u => u.id !== id)
  await store.setJSON('index', index)
  return NextResponse.json({ ok: true })
}
