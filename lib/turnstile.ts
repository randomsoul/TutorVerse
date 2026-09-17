export async function verifyTurnstile(token: string) {
  const response = await fetch('/api/turnstile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.ok) throw new Error(data.error || 'Security verification failed. Please try again.')
}
