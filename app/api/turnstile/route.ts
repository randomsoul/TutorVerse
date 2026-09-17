import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const token = body?.token
    const secret = process.env.TURNSTILE_SECRET_KEY

    console.log('Turnstile verification request received', {
      hasToken: typeof token === 'string' && token.length > 0,
      hasSecret: Boolean(secret),
    })

    if (!secret) {
      console.error('Turnstile: TURNSTILE_SECRET_KEY is missing in the server environment')
      return NextResponse.json({ ok: false, error: 'Security verification is not configured.' }, { status: 500 })
    }

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ ok: false, error: 'Security verification is required.' }, { status: 400 })
    }

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })

    const data = await result.json().catch(() => null)
    console.log('Turnstile Siteverify response', {
      status: result.status,
      success: data?.success ?? null,
      errorCodes: Array.isArray(data?.['error-codes']) ? data['error-codes'] : [],
      hostname: data?.hostname || null,
    })

    if (!result.ok || !data?.success) {
      const errorCodes = Array.isArray(data?.['error-codes']) ? data['error-codes'] : []
      return NextResponse.json({
        ok: false,
        error: `Security verification failed. Cloudflare: ${errorCodes.join(', ') || `HTTP ${result.status}`}`,
      }, { status: 403 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Turnstile verification request failed', { message })
    return NextResponse.json({
      ok: false,
      error: `Security verification failed. Server error: ${message}`,
    }, { status: 502 })
  }
}
