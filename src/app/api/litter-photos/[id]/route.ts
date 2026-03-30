import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const store = getStore('litter-photos')
  const blob = await store.get(id, { type: 'arrayBuffer' })
  if (!blob) return new NextResponse('Not found', { status: 404 })
  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
