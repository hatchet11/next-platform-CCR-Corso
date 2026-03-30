import { jwtVerify, SignJWT } from 'jose'
import { NextRequest } from 'next/server'

const getSecret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET ?? 'ccr-admin-change-this-secret')

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  try {
    await jwtVerify(token, getSecret())
    return true
  } catch {
    return false
  }
}
