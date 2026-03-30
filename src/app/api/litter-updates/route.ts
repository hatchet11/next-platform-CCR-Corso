import { NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

type Update = { id: string; title: string; body: string; createdAt: string }
type UpdateIndex = { updates: Update[] }

export async function GET() {
  const store = getStore('litter-updates')
  const raw = await store.get('index', { type: 'json' }) as UpdateIndex | null
  return NextResponse.json((raw ?? { updates: [] }).updates)
}
