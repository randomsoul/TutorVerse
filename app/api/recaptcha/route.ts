import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return NextResponse.json({ success: false, error: 'Security verification is not configured.' }, { status: 503 })

  try {
    const { token, action } = await request.json()
    if (typeof token !== 'string' || !token || typeof action !== 'string' || !action) {
      return NextResponse.json({ success: false, error: 'Invalid security verification.' }, { status: 400 })
    }

    const body = new URLSearchParams({ secret, response: token })
    const result = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    })
    const data = await result.json()

    if (!data.success || data.action !== action || typeof data.score !== 'number' || data.score < 0.5) {
      return NextResponse.json({ success: false, error: 'Security verification failed. Please try again.' }, { status: 403 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Security verification could not be completed.' }, { status: 500 })
  }
}
