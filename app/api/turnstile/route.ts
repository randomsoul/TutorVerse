import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    const secret = process.env.TURNSTILE_SECRET_KEY

    if (!secret) {
      console.error('Turnstile: TURNSTILE_SECRET_KEY is missing in the server environment')
      return NextResponse.json({ ok: false, error: 'Security verification is not configured.' }, { status: 500 })
    }
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ ok: false, error: 'Security verification is required.' }, { status: 400 })
    }

    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    })
    const data = await result.json()

    if (!data.success) {
      const errorCodes = Array.isArray(data['error-codes']) ? data['error-codes'] : []
      console.error('Turnstile verification failed', {
        status: result.status,
        errorCodes,
        hostname: data.hostname || null,
      })
      return NextResponse.json({
        ok: false,
        error: `Security verification failed. Cloudflare: ${errorCodes.join(', ') || 'unknown error'}`,
      }, { status: 403 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Turnstile verification request failed', error)
    return NextResponse.json({ ok: false, error: 'Security verification failed. Please try again.' }, { status: 400 })
  }
}
