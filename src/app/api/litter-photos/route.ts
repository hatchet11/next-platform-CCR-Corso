import { NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

type PhotoMeta = { id: string; caption: string; uploadedAt: string; contentType: string }
type PhotoIndex = { photos: PhotoMeta[] }

export async function GET() {
  const store = getStore('litter-photos')
  const raw = await store.get('index', { type: 'json' }) as PhotoIndex | null
  const photos = raw?.photos ?? []
  return NextResponse.json(photos)
}
