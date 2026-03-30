import { NextRequest, NextResponse } from 'next/server'
import { signAdminToken } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD || 'CCRkennels2026!'
  if (password !== adminPassword) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const token = await signAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}
