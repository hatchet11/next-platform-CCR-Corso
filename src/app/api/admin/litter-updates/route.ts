import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'
import { verifyAdmin } from '@/lib/admin-auth'

type Update = { id: string; title: string; body: string; createdAt: string }
type UpdateIndex = { updates: Update[] }

async function getIndex(store: ReturnType<typeof getStore>): Promise<UpdateIndex> {
  const raw = await store.get('index', { type: 'json' }) as UpdateIndex | null
  return raw ?? { updates: [] }
}

export async function GET(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const store = getStore('litter-updates')
  const index = await getIndex(store)
  return NextResponse.json(index.updates)
}

export async function POST(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const { title, body } = await req.json()
  if (!title || !body) return NextResponse.json({ ok: false, error: 'Title and body required' }, { status: 400 })

  const id = `litter-update-${Date.now()}`
  const store = getStore('litter-updates')
  const index = await getIndex(store)
  index.updates.unshift({ id, title, body, createdAt: new Date().toISOString() })
  await store.setJSON('index', index)
  return NextResponse.json({ ok: true, id })
}
