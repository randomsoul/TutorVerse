'use client'

import Script from 'next/script'

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function Recaptcha({ action }: { action: string }) {
  if (!SITE_KEY) return null
  return <>
    <Script src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`} strategy="afterInteractive" />
    <p className="text-xs text-slate-400">
      Protected by reCAPTCHA. Google’s <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a> apply.
    </p>
  </>
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!SITE_KEY) throw new Error('reCAPTCHA is not configured. Please try again later.')
  if (!window.grecaptcha) throw new Error('Security verification is still loading. Please wait a moment and try again.')
  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(SITE_KEY, { action }).then(resolve).catch(() => reject(new Error('Security verification failed. Please try again.')))
    })
  })
}

export async function verifyRecaptcha(token: string, action: string): Promise<void> {
  const response = await fetch('/api/recaptcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, action }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.success) throw new Error(data.error || 'Security verification failed. Please try again.')
}
