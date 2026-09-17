'use client';
import { useEffect, useState } from 'react';
import { Header, Footer } from '../components/site';
import Turnstile from '../components/turnstile';
import { verifyTurnstile } from '../../lib/turnstile';

function ContactForm(){
  const [tutor,setTutor]=useState(''); const [captchaToken,setCaptchaToken]=useState(''); const [error,setError]=useState(''); const [done,setDone]=useState(false); const [busy,setBusy]=useState(false);
  useEffect(()=>{const value=new URLSearchParams(window.location.search).get('tutor');if(value)setTutor(value)},[]);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');try{if(!captchaToken)throw new Error('Please complete the security check.');await verifyTurnstile(captchaToken);setDone(true)}catch(err){setError(err instanceof Error?err.message:'Unable to send your request. Please try again.')}finally{setBusy(false)}}
  return <><Header/><main className="form-page"><div className="form-intro"><div className="eyebrow">Get in touch</div><h1>Let's make the next step easy.</h1><p>{tutor?`Send a lesson request for ${tutor}.`:'Tell us what you’re looking for and we’ll help you take the next step.'}</p></div>{done ? <div className="form-card success-card"><div className="success">✓</div><h2>Request sent.</h2><p>Thanks. This demo flow has captured your request. Production messaging will be connected to Supabase.</p><a href="/tutors" className="btn primary">Continue browsing →</a></div> : <form className="form-card" onSubmit={submit}><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="you@example.com"/></label><label>Message<textarea required rows={6} defaultValue={tutor?`I’d like to know more about lessons with ${tutor}.`:''} placeholder="Tell us what you need…"/></label><Turnstile onVerify={setCaptchaToken} onExpire={()=>setCaptchaToken('')} onError={()=>setCaptchaToken('')}/>{error&&<p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button className="btn primary" disabled={busy}>{busy?'Sending…':'Send request →'}</button></form>}</main><Footer/></>;
}
export default function Contact(){return <ContactForm/>;}
