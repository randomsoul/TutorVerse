'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from './components/site'
import { supabase } from '../lib/supabase'

type Role = 'student' | 'parent' | 'tutor' | 'manager' | 'admin'

function dashboardForRole(role: string) {
  if (role === 'admin' || role === 'staff' || role === 'manager') return '/admin'
  if (role === 'parent') return '/parent-dashboard'
  if (role === 'student') return '/student-dashboard'
  if (role === 'tutor') return '/tutor-dashboard'
  return null
}

function Auth({ signup = false }: { signup?: boolean }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('student')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let active = true
    const redirectIfAuthenticated = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!active) return
      if (!sessionData.session) {
        setCheckingSession(false)
        return
      }
      const { data: profile, error: profileError } = await supabase.from('profiles').select('role, is_active, archived_at').eq('id', sessionData.session.user.id).maybeSingle()
      if (!active) return
      if (profileError || !profile || profile.is_active === false || profile.archived_at) {
        setCheckingSession(false)
        return
      }
      const destination = dashboardForRole(profile.role)
      if (destination) {
        window.location.replace(destination)
        return
      }
      setCheckingSession(false)
    }
    redirectIfAuthenticated()
    return () => { active = false }
  }, [])

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
        const { error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim(), role } } })
        if (signUpError) throw signUpError
        setDone(true)
      } else {
        const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        if (signInError) throw signInError
        const { data: profile, error: profileError } = await supabase.from('profiles').select('role, is_active, archived_at').eq('id', authData.user.id).maybeSingle()
        if (profileError || !profile) {
          await supabase.auth.signOut()
          throw new Error('Your TutorVerse account profile could not be verified.')
        }
        if (profile.is_active === false || profile.archived_at) {
          await supabase.auth.signOut()
          throw new Error('This account is inactive or archived. Please contact Saral Vigyan.')
        }
        if (role === 'admin') {
          if (!['admin', 'staff'].includes(profile.role)) {
            await supabase.auth.signOut()
            throw new Error('This account is not authorised for the Saral Vigyan admin area.')
          }
          window.location.href = '/admin'
          return
        }
        if (role === 'manager') {
          if (profile.role !== 'manager') {
            await supabase.auth.signOut()
            throw new Error('This account is not authorised as a Manager.')
          }
          window.location.href = '/admin'
          return
        }
        if (profile.role !== role) {
          await supabase.auth.signOut()
          throw new Error(`This account is registered as ${profile.role}, not ${role}. Please select the correct account type.`)
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

  if (done) return <><Header/><style>{`header a > span:first-child{background:#fff!important;color:#6257e8!important}`}</style><main className="auth"><div className="auth-card"><div className="success">✓</div><h1>Check your email.</h1><p>Your TutorVerse account has been created in Supabase. If email confirmation is enabled, open the confirmation email before logging in.</p><Link href="/login" className="btn primary full">Go to login →</Link></div></main><Footer/></>
  if (checkingSession) return <><Header/><main className="auth"><div className="auth-card"><div className="eyebrow">TutorVerse secure access</div><h1>Checking your session…</h1><p>One moment.</p></div></main><Footer/></>

  return <><Header/><style>{`header a > span:first-child{background:#fff!important;color:#6257e8!important}`}</style><main className="auth"><form className="auth-card" onSubmit={submit}><div className="eyebrow">TutorVerse secure access</div><h1>{signup ? 'Create your account' : 'Welcome back.'}</h1><p>{signup ? 'Your account will be stored securely in TutorVerse.' : 'Sign in to your TutorVerse account.'}</p>{signup && <label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" required/></label>}<label>Account type<select value={role} onChange={e=>setRole(e.target.value as Role)}><option value="student">Student</option><option value="parent">Parent</option><option value="tutor">Tutor</option><option value="manager">Manager</option><option value="admin">Saral Vigyan Admin</option></select></label><label>{role === 'admin' ? 'Admin email' : 'Email'}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" minLength={6} required/></label>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button className="btn primary full" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account →' : 'Log in →'}</button>{!signup && <p className="switch"><Link href="/forgot-password">Forgot your password?</Link></p>}<p className="switch">{signup ? 'Already have an account? ' : 'New to TutorVerse? '}<Link href={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create one'}</Link></p></form></main><Footer/></>
}

export function Login() { return <Auth /> }
export function Signup() { return <Auth signup /> }
