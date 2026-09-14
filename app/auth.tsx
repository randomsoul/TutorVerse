'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from './components/site';

function Auth({ signup = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return alert('Please enter a valid email.');
    localStorage.setItem('tutorverse_user', JSON.stringify({ name: name || email.split('@')[0], email }));
    setDone(true);
  }

  if (done) return <><Header/><main className="auth"><div className="auth-card"><div className="success">✓</div><h1>You're in.</h1><p>Your TutorVerse account has been saved on this device. The next step is connecting Supabase for production authentication.</p><Link href="/tutors" className="btn primary full">Find a tutor →</Link></div></main><Footer/></>;

  return <><Header/><main className="auth"><form className="auth-card" onSubmit={submit}><div className="eyebrow">TutorVerse account</div><h1>{signup ? 'Create your account' : 'Welcome back.'}</h1><p>{signup ? 'Start your learning journey.' : 'Log in to continue your learning journey.'}</p>{signup && <label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/></label>}<label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" placeholder="••••••••" minLength={6} required/></label><button className="btn primary full">{signup ? 'Create account' : 'Log in'} →</button><p className="switch">{signup ? 'Already have an account? ' : 'New to TutorVerse? '}<Link href={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create one'}</Link></p></form></main><Footer/></>;
}

export function Login(){ return <Auth/>; }
export function Signup(){ return <Auth signup/>; }
