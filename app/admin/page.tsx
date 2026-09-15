'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';
import MaterialsPanel from './materials-panel';

const nav=['Overview','Students','Parents','Tutors','Classrooms','Calendar','Class reports','Content','Assessments','Payments','Tutor search','Feedback','Notifications'];

export default function AdminDashboard(){
  const [authorized,setAuthorized]=useState(false);
  const [checking,setChecking]=useState(true);
  const [section,setSection]=useState('Overview');
  const [stats,setStats]=useState({students:0,classrooms:0,classes:0,tutors:0,assessments:0,payments:0});

  useEffect(()=>{
    let active=true;
    async function checkAccess(){
      const { data:{ user } }=await supabase.auth.getUser();
      if(!user){ window.location.href='/login'; return; }
      const { data:profile, error }=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
      if(!active) return;
      if(error || !profile || !['admin','staff'].includes(profile.role)){
        await supabase.auth.signOut();
        window.location.href='/login';
        return;
      }
      setAuthorized(true);
      setChecking(false);

      const tables=['students','classrooms','classes','tutors','assessments','payments'] as const;
      const counts=await Promise.all(tables.map(table=>supabase.from(table).select('id',{count:'exact',head:true})));
      if(active) setStats({students:counts[0].count||0,classrooms:counts[1].count||0,classes:counts[2].count||0,tutors:counts[3].count||0,assessments:counts[4].count||0,payments:counts[5].count||0});
    }
    checkAccess();
    return ()=>{active=false};
  },[]);

  if(checking) return <><Header/><main className="mx-auto max-w-3xl px-5 py-20"><div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">TutorVerse secure access</p><h1 className="mt-3 text-2xl font-black">Checking administrator access…</h1><p className="mt-2 text-slate-500">The admin workspace is available only to authorised Saral Vigyan staff.</p></div></main><Footer/></>;
  if(!authorized) return null;

  const cards=[['Students',stats.students,'Database records'],['Tutors',stats.tutors,'Database records'],['Classrooms',stats.classrooms,'Database records'],['Classes',stats.classes,'Database records'],['Assessments',stats.assessments,'Database records'],['Payments',stats.payments,'Database records']];

  return <><Header/><main className="mx-auto max-w-7xl px-5 py-8"><div className="flex flex-col gap-5 lg:flex-row"><aside className="w-full shrink-0 lg:w-60"><div className="rounded-3xl bg-slate-950 p-4 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Saral Vigyan</p><h1 className="mt-2 text-2xl font-black">Admin control</h1><p className="mt-1 text-xs text-slate-400">TutorVerse operations</p><div className="mt-5 grid gap-1">{nav.map(n=><button key={n} onClick={()=>setSection(n)} className={`rounded-xl px-3 py-2 text-left text-sm font-semibold ${section===n?'bg-white text-slate-950':'text-slate-300 hover:bg-white/10'}`}>{n}</button>)}</div></div></aside><section className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Admin dashboard</p><h2 className="mt-2 text-4xl font-black tracking-tight">{section}</h2><p className="mt-2 text-slate-500">Saral Vigyan controls the managed TutorVerse learning journey.</p></div><Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold">View public site →</Link></div>

{section==='Overview' ? <><div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(c=><div key={c[0]} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{c[0]}</p><p className="mt-2 text-3xl font-black">{c[1]}</p><p className="mt-1 text-xs text-slate-400">{c[2]}</p></div>)}</div><div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7"><h3 className="text-xl font-black">Control centre</h3><p className="mt-2 max-w-3xl text-slate-500">Use the left menu to manage students, classrooms, classes, reports, learning materials, assessments, payments and tutor-search cases. Counts above come directly from Supabase; no fictional operational numbers are shown.</p></div></> : section==='Content' ? <MaterialsPanel/> : <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-7"><h3 className="text-xl font-black">{section} workspace</h3><p className="mt-2 max-w-2xl text-slate-500">This Saral Vigyan-controlled module is ready for the next database-backed workflow. The Content section is already connected to the live learning-material database.</p><div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600"><b>Next:</b> build this module around the same real records and permissions rather than browser-only preview data.</div></div>}
</section></div></main><Footer/></>;
}
