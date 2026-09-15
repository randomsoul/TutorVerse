'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '../components/site'
import { supabase } from '../../lib/supabase'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tutorverse.in'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMessage('')
    setError('')

    try {
      if (!email.includes('@')) throw new Error('Please enter a valid email.')
      const redirectTo = `${SITE_URL.replace(/\/$/, '')}/update-password`
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo })
      if (resetError) throw resetError
      setMessage('If this email belongs to a TutorVerse account, a password-reset email has been sent. Open that email and follow the link.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send the password-reset email. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return <><Header/><style>{`header a > span:first-child{background:#fff!important;color:#6257e8!important}`}</style><main className="auth"><form className="auth-card" onSubmit={submit}><div className="eyebrow">TutorVerse account recovery</div><h1>Reset your password.</h1><p>Enter the email address used for your TutorVerse account.</p><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}{message&&<p className="rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>}<button className="btn primary full" disabled={busy}>{busy ? 'Sending…' : 'Send password reset email →'}</button><p className="switch"><Link href="/login">← Back to login</Link></p></form></main><Footer/></>
}
