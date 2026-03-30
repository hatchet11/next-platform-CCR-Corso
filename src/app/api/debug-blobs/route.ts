import { NextResponse } from 'next/server'
import { getStore } from '@netlify/blobs'

export async function GET() {
  try {
    const store = getStore('litter-photos')

    // Try to read the index
    const raw = await store.get('index', { type: 'json' })

    // Try a test write/read
    await store.set('_test', 'hello')
    const test = await store.get('_test', { type: 'text' })
    await store.delete('_test')

    return NextResponse.json({
      ok: true,
      index: raw,
      testWrite: test === 'hello' ? 'PASS' : 'FAIL (got: ' + test + ')',
      env: {
        hasBlobsContext: !!process.env.NETLIFY_BLOBS_CONTEXT,
        hasSiteId: !!process.env.SITE_ID,
      },
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: String(err),
      stack: (err as Error).stack,
    }, { status: 500 })
  }
}
