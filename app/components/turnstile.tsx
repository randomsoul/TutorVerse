'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
    }
  }
}

type Props = {
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}

export default function Turnstile({ onVerify, onExpire, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string>()
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    const render = () => {
      if (!containerRef.current || !window.turnstile || !siteKey || widgetId.current) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: onVerify,
        'expired-callback': onExpire,
        'error-callback': onError,
      })
    }

    if (window.turnstile) render()
    window.addEventListener('turnstile-loaded', render)
    return () => window.removeEventListener('turnstile-loaded', render)
  }, [onVerify, onExpire, onError, siteKey])

  if (!siteKey) return <p className="text-xs font-semibold text-red-600">Security verification is not configured.</p>

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => window.dispatchEvent(new Event('turnstile-loaded'))}
      />
      <div ref={containerRef} className="my-3 min-h-[65px]" />
    </>
  )
}
