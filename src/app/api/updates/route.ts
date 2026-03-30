import { NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

type UpdateIndex = { updates: { id: string; title: string; body: string; createdAt: string }[] }

export async function GET() {
  const store = getStore('kennel-updates')
  const index = (await store.get('index', { type: 'json' }) as UpdateIndex | null) ?? { updates: [] }
  return NextResponse.json(index.updates)
}
