'use client';

import { useEffect, useState } from 'react';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';

const modes = ['Online', 'Home', 'Batch'];

type LocationFields = {
  address_line: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  location_accuracy_m: string;
};

export default function TutorDashboard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [locationSaving, setLocationSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [locationMessage, setLocationMessage] = useState('');
  const [email, setEmail] = useState('');
  const [tutorId, setTutorId] = useState<string | null>(null);
  const [form, setForm] = useState({ full_name: '', phone: '', city: '', experience_years: '', bio: '', modes: [] as string[] });
  const [location, setLocation] = useState<LocationFields>({ address_line: '', area: '', city: '', state: '', pincode: '', latitude: '', longitude: '', location_accuracy_m: '' });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      setEmail(user.email || '');
      const [{ data: profile, error: pe }, { data: tutor, error: te }] = await Promise.all([
        supabase.from('profiles').select('full_name, phone').eq('id', user.id).single(),
        supabase.from('tutors').select('id, experience_years, bio, city, modes, address_line, area, state, pincode, latitude, longitude, location_accuracy_m').eq('profile_id', user.id).order('created_at', { ascending: true }).limit(1).maybeSingle(),
      ]);
      if (pe || te || !tutor) { setMessage(pe?.message || te?.message || 'Tutor profile could not be loaded.'); setLoading(false); return; }
      setTutorId(tutor.id);
      setForm({ full_name: profile?.full_name || '', phone: profile?.phone || '', city: tutor.city || '', experience_years: tutor.experience_years == null ? '' : String(tutor.experience_years), bio: tutor.bio || '', modes: tutor.modes || [] });
      setLocation({ address_line: tutor.address_line || '', area: tutor.area || '', city: tutor.city || '', state: tutor.state || '', pincode: tutor.pincode || '', latitude: tutor.latitude == null ? '' : String(tutor.latitude), longitude: tutor.longitude == null ? '' : String(tutor.longitude), location_accuracy_m: tutor.location_accuracy_m == null ? '' : String(tutor.location_accuracy_m) });
      setLoading(false);
    }
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setMessage('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !tutorId) { setMessage('Please log in again.'); setSaving(false); return; }
    const { error: pe } = await supabase.from('profiles').update({ full_name: form.full_name.trim(), phone: form.phone.trim() }).eq('id', user.id);
    const { error: te } = await supabase.from('tutors').update({ city: location.city.trim() || null, address_line: location.address_line.trim() || null, area: location.area.trim() || null, state: location.state.trim() || null, pincode: location.pincode.trim() || null, latitude: location.latitude ? Number(location.latitude) : null, longitude: location.longitude ? Number(location.longitude) : null, location_accuracy_m: location.location_accuracy_m ? Number(location.location_accuracy_m) : null, experience_years: form.experience_years ? Number(form.experience_years) : null, bio: form.bio.trim() || null, modes: form.modes }).eq('id', tutorId);
    setMessage(pe?.message || te?.message || '✓ Profile saved. Saral Vigyan can now review your details.'); setSaving(false);
  }

  function toggleMode(mode: string) { setForm(f => ({ ...f, modes: f.modes.includes(mode) ? f.modes.filter(x => x !== mode) : [...f.modes, mode] })); }

  function useApproximateLocation() {
    setLocationMessage('');
    if (!navigator.geolocation) { setLocationMessage('Your browser does not provide location access.'); return; }
    setLocationSaving(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation(l => ({ ...l, latitude: position.coords.latitude.toFixed(6), longitude: position.coords.longitude.toFixed(6), location_accuracy_m: Math.round(position.coords.accuracy).toString() }));
        setLocationSaving(false);
        setLocationMessage('Approximate coordinates captured. Click Save profile to store them.');
      },
      () => { setLocationSaving(false); setLocationMessage('Location permission was not granted. You can enter the area and address manually.'); },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  async function logout() { await supabase.auth.signOut(); window.location.href = '/login'; }

  if (loading) return <><Header/><main className="mx-auto max-w-5xl px-5 py-16"><p className="text-slate-500">Loading your tutor profile…</p></main><Footer/></>;

  return <><Header/><main className="mx-auto max-w-7xl px-5 py-10">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Tutor dashboard</p><h1 className="mt-2 text-4xl font-black tracking-tight">Welcome, {form.full_name || 'Tutor'}.</h1><p className="mt-2 text-slate-500">Complete your profile. Classes will appear only after Saral Vigyan assigns real classes to you.</p></div><button onClick={logout} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Log out</button></div>
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Your profile</p><h2 className="mt-2 text-2xl font-black">Basic details</h2><p className="mt-1 text-sm text-slate-500">These details help Saral Vigyan match you with students. Creating a tutor account does not automatically make you a public listing.</p>
      <form onSubmit={save} className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold">Full name<input required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">Email<input readOnly value={email} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-normal text-slate-500"/></label>
        <label className="text-sm font-bold">Phone / WhatsApp<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">Years of teaching experience<input type="number" min="0" value={form.experience_years} onChange={e=>setForm({...form,experience_years:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <div className="text-sm font-bold md:col-span-2"><div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><span>Teaching location</span><button type="button" onClick={useApproximateLocation} disabled={locationSaving} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold hover:bg-slate-50 disabled:opacity-50">{locationSaving ? 'Getting location…' : 'Use my approximate location'}</button></div><p className="mt-1 text-xs font-normal text-slate-500">Used for matching home-tuition requests. Your exact address is not a public tutor listing detail.</p></div>
        <label className="text-sm font-bold">Area / locality<input value={location.area} onChange={e=>setLocation({...location,area:e.target.value})} placeholder="e.g. Sion" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">City<input value={location.city} onChange={e=>setLocation({...location,city:e.target.value})} placeholder="e.g. Mumbai" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">State<input value={location.state} onChange={e=>setLocation({...location,state:e.target.value})} placeholder="e.g. Maharashtra" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold">PIN code<input value={location.pincode} onChange={e=>setLocation({...location,pincode:e.target.value})} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-bold md:col-span-2">Address / landmark<input value={location.address_line} onChange={e=>setLocation({...location,address_line:e.target.value})} placeholder="House / building, street, nearby landmark" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500 md:col-span-2">{location.latitude && location.longitude ? <>Approximate coordinates captured: <b>{location.latitude}, {location.longitude}</b>{location.location_accuracy_m ? ` (about ${location.location_accuracy_m} m accuracy)` : ''}. These are for matching, not public display.</> : 'No coordinates captured yet. You can use the button above or simply enter the area, city, state and address manually.'}</div>
        {locationMessage&&<p className="text-sm font-semibold text-slate-600 md:col-span-2">{locationMessage}</p>}
        <div className="text-sm font-bold">Teaching mode<div className="mt-2 flex flex-wrap gap-2">{modes.map(mode=><button type="button" key={mode} onClick={()=>toggleMode(mode)} className={`rounded-xl border px-4 py-3 text-sm font-bold ${form.modes.includes(mode)?'border-slate-950 bg-slate-950 text-white':'border-slate-200'}`}>{mode}</button>)}</div></div>
        <label className="text-sm font-bold md:col-span-2">Profile / teaching bio<textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} rows={5} placeholder="Tell us about your qualifications, experience and teaching approach." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3"><button disabled={saving} className="rounded-xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-50">{saving?'Saving…':'Save profile'}</button>{message&&<p className="text-sm font-semibold text-slate-600">{message}</p>}</div>
      </form>
    </section>
    <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Classes</p><h2 className="mt-2 text-xl font-black">No classes assigned yet</h2><p className="mt-2 text-sm leading-6 text-slate-500">There are no dummy classes here. Once Saral Vigyan assigns a real classroom, its schedule and class controls will appear in this section.</p></section>
  </main><Footer/></>;
}
