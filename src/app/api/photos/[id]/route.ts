import { NextRequest, NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const store = getStore('kennel-photos')
  const result = await store.getWithMetadata(id, { type: 'arrayBuffer' })
  if (!result) return new NextResponse(null, { status: 404 })
  const contentType = (result.metadata as { contentType?: string }).contentType ?? 'image/jpeg'
  return new NextResponse(result.data as ArrayBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
