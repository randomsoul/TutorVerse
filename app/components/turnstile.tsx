'use client'

// Turnstile temporarily disabled while the production verification integration is being replaced.
// Keeping this component as a no-op lets all existing forms remain functional without changing
// each form individually. A replacement CAPTCHA can be wired in centrally later.
export default function Turnstile(_props: {
  onVerify?: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}) {
  return null
}
