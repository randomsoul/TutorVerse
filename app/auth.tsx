'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from './components/site'
import { supabase } from '../lib/supabase'

type Role = 'student' | 'parent' | 'tutor' | 'admin'

function Auth({ signup = false }: { signup?: boolean }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('student')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)

    try {
      if (signup && role === 'admin') {
        setError('Admin accounts are created and managed by Saral Vigyan. Use an administrator account created in Supabase Auth.')
        return
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email.')
        return
      }

      if (signup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: name.trim(), role } },
        })
        if (signUpError) throw signUpError
        setDone(true)
      } else {
        const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (signInError) throw signInError

        if (role === 'admin') {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', authData.user.id)
            .maybeSingle()
          if (profileError || !profile || !['admin', 'staff'].includes(profile.role)) {
            await supabase.auth.signOut()
            throw new Error('This account is not authorised for the Saral Vigyan admin area.')
          }
          window.location.href = '/admin'
          return
        }

        const destination = role === 'parent' ? '/parent-dashboard' : role === 'student' ? '/student-dashboard' : '/tutor-dashboard'
        window.location.href = destination
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return <><Header/><style>{`header a > span:first-child{background:#fff!important;color:#6257e8!important}`}</style><main className="auth"><div className="auth-card"><div className="success">✓</div><h1>Check your email.</h1><p>Your TutorVerse account has been created in Supabase. If email confirmation is enabled, open the confirmation email before logging in.</p><Link href="/login" className="btn primary full">Go to login →</Link></div></main><Footer/></>
  }

  return <><Header/><style>{`header a > span:first-child{background:#fff!important;color:#6257e8!important}`}</style><main className="auth"><form className="auth-card" onSubmit={submit}><div className="eyebrow">TutorVerse secure access</div><h1>{signup ? 'Create your account' : 'Welcome back.'}</h1><p>{signup ? 'Your account will be stored securely in TutorVerse.' : 'Sign in to your TutorVerse account.'}</p>{signup && <label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" required/></label>}<label>Account type<select value={role} onChange={e=>setRole(e.target.value as Role)}><option value="student">Student</option><option value="parent">Parent</option><option value="tutor">Tutor</option><option value="admin">Saral Vigyan Admin</option></select></label><label>{role === 'admin' ? 'Admin email' : 'Email'}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" minLength={6} required/></label>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button className="btn primary full" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account →' : 'Log in →'}</button>{!signup && <p className="switch"><Link href="/forgot-password">Forgot your password?</Link></p>}<p className="switch">{signup ? 'Already have an account? ' : 'New to TutorVerse? '}<Link href={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create one'}</Link></p></form></main><Footer/></>
}

export function Login() { return <Auth /> }
export function Signup() { return <Auth signup /> }
