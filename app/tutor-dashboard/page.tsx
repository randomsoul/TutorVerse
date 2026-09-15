'use client';

import { useEffect, useState } from 'react';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';

const modes = ['Online', 'Home', 'Batch'];

export default function TutorDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [tutorId, setTutorId] = useState<string | null>(null);
  const [form, setForm] = useState({ full_name: '', phone: '', city: '', experience_years: '', bio: '', modes: [] as string[] });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      setEmail(user.email || '');
      const [{ data: profile, error: pe }, { data: tutor, error: te }] = await Promise.all([
        supabase.from('profiles').select('full_name, phone').eq('id', user.id).single(),
        supabase.from('tutors').select('id, experience_years, bio, city, modes').eq('profile_id', user.id).single(),
      ]);
      if (pe || te || !tutor) { setMessage(pe?.message || te?.message || 'Tutor profile could not be loaded.'); setLoading(false); return; }
      setTutorId(tutor.id);
      setForm({ full_name: profile?.full_name || '', phone: profile?.phone || '', city: tutor.city || '', experience_years: tutor.experience_years == null ? '' : String(tutor.experience_years), bio: tutor.bio || '', modes: tutor.modes || [] });
      setLoading(false);
    }
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setMessage('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !tutorId) { setMessage('Please log in again.'); setSaving(false); return; }
    const { error: pe } = await supabase.from('profiles').update({ full_name: form.full_name.trim(), phone: form.phone.trim() }).eq('id', user.id);
    const { error: te } = await supabase.from('tutors').update({ city: form.city.trim() || null, experience_years: form.experience_years ? Number(form.experience_years) : null, bio: form.bio.trim() || null, modes: form.modes }).eq('id', tutorId);
    setMessage(pe?.message || te?.message || '✓ Profile saved. Saral Vigyan can now review your details.'); setSaving(false);
  }

  function toggleMode(mode: string) { setForm(f => ({ ...f, modes: f.modes.includes(mode) ? f.modes.filter(x => x !== mode) : [...f.modes, mode] })); }
  async function logout() { await supabase.auth.signOut(); window.location.href = '/login'; }

  if (loading) return <><Header/><main className="mx-auto max-w-5xl px-5 py-16"><p className="text-slate-500">Loading your tutor profile…</p></main><Footer/></>;

  return <><Header/><main className="mx-auto max-w-7xl px-5 py-10">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Tutor dashboard</p><h1 className="mt-2 text-4xl font-black tracking-tight">Welcome, {form.full_name || 'Tutor'}.</h1><p className="mt-2 text-slate-500">Complete your profile. Classes will appear only after Saral Vigyan assigns real classes to you.</p></div><button onClick={logout} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Log out</button></div>
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Your profile</p><h2 className="mt-2 text-2xl font-black">Basic details</h2><p className="mt-1 text-sm text-slate-500">These details help Saral Vigyan match you with students. Creating a tutor account does not automatically make you a public listing.</p>
      <form onSubmit={save} className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold">Full name<input required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">Email<input readOnly value={email} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal text-slate-500"/></label>
        <label className="text-sm font-bold">Phone / WhatsApp<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">City / location<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="e.g. Sion, Mumbai" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">Years of teaching experience<input type="number" min="0" value={form.experience_years} onChange={e=>setForm({...form,experience_years:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <div className="text-sm font-bold">Teaching mode<div className="mt-2 flex flex-wrap gap-2">{modes.map(mode=><button type="button" key={mode} onClick={()=>toggleMode(mode)} className={`rounded-xl border px-4 py-3 text-sm font-bold ${form.modes.includes(mode)?'border-slate-950 bg-slate-950 text-white':'border-slate-200'}`}>{mode}</button>)}</div></div>
        <label className="text-sm font-bold md:col-span-2">Profile / teaching bio<textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} rows={5} placeholder="Tell us about your qualifications, experience and teaching approach." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3"><button disabled={saving} className="rounded-xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-50">{saving?'Saving…':'Save profile'}</button>{message&&<p className="text-sm font-semibold text-slate-600">{message}</p>}</div>
      </form>
    </section>
    <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Classes</p><h2 className="mt-2 text-xl font-black">No classes assigned yet</h2><p className="mt-2 text-sm leading-6 text-slate-500">There are no dummy classes here. Once Saral Vigyan assigns a real classroom, its schedule and class controls will appear in this section.</p></section>
  </main><Footer/></>;
}
