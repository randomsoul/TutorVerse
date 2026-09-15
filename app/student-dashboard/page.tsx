'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';

type Material={id:string;title:string;content_type:string|null;url:string|null;description:string|null;created_at:string|null};

export default function StudentDashboard(){
 const [requestSent,setRequestSent]=useState(false);
 const [materials,setMaterials]=useState<Material[]>([]);
 const [materialsLoading,setMaterialsLoading]=useState(true);

 useEffect(()=>{
  async function loadMaterials(){
   const { data:{ user } }=await supabase.auth.getUser();
   if(!user){setMaterialsLoading(false);return;}
   const { data:student }=await supabase.from('students').select('id').eq('profile_id',user.id).maybeSingle();
   if(!student){setMaterialsLoading(false);return;}
   const { data }=await supabase.from('content_items').select('id,title,content_type,url,description,created_at').order('created_at',{ascending:false});
   setMaterials((data||[]) as Material[]);
   setMaterialsLoading(false);
  }
  loadMaterials();
 },[]);

 return <><Header/><main className="mx-auto max-w-7xl px-5 py-10">
  <p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Student dashboard</p><div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><h1 className="text-4xl font-black tracking-tight">Welcome back, Aarav.</h1><p className="mt-2 text-slate-500">Your classes, reports, materials and assessments — all in one place.</p></div><Link href="/parent-dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Parent dashboard →</Link></div>
  <section className="mt-8 grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Next class</p><h2 className="mt-3 text-2xl font-black">Physics</h2><p className="mt-2 text-slate-300">Today · 5:30 PM · Home tuition</p><div className="mt-5 rounded-2xl bg-white/10 p-3 text-sm">Parent reminder: 5:00 PM</div></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-sm font-semibold text-slate-500">Attendance</p><p className="mt-2 text-3xl font-black">96%</p><p className="mt-1 text-sm text-slate-400">24 of 25 classes attended</p></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-sm font-semibold text-slate-500">Upcoming assessment</p><p className="mt-2 text-xl font-black">Physics Practice Test</p><p className="mt-1 text-sm text-slate-400">45 questions · 45 minutes</p></div></section>

  <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6"><div className="flex flex-col justify-between gap-2 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Your classroom</p><h2 className="mt-2 text-2xl font-black">Learning Materials</h2><p className="mt-1 text-sm text-slate-500">Materials shared by Saral Vigyan for your classroom or specifically for you.</p></div></div>
   {materialsLoading ? <p className="mt-5 text-sm text-slate-400">Loading materials…</p> : materials.length===0 ? <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No learning materials have been shared with you yet.</div> : <div className="mt-5 grid gap-3 md:grid-cols-2">{materials.map(m=><div key={m.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5"><div className="flex items-start justify-between gap-3"><div><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{m.content_type==='video'?'Video':'PDF / Notes'}</span><h3 className="mt-1 font-black">{m.title}</h3>{m.description&&<p className="mt-1 text-sm text-slate-500">{m.description}</p>}</div>{m.url&&<a href={m.url} target="_blank" rel="noreferrer" className="shrink-0 rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white">Open →</a>}</div></div>)}</div>}
  </section>

  <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
   <div className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Today&apos;s class</h2><div className="mt-5 rounded-2xl bg-slate-50 p-5"><div className="flex flex-col justify-between gap-3 md:flex-row"><div><b>Physics · Newton&apos;s Laws</b><p className="mt-1 text-sm text-slate-500">5:30 PM – 6:30 PM · Home tuition</p></div><span className="rounded-full bg-white px-3 py-2 text-xs font-bold">Tutor confirms start</span></div><div className="mt-5 grid gap-2 md:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-white p-3 text-sm"><b>Before class</b><p className="mt-1 text-slate-500">Be ready 10 minutes early.</p></div><div className="rounded-xl border border-slate-200 bg-white p-3 text-sm"><b>After class</b><p className="mt-1 text-slate-500">Class report will appear here.</p></div></div></div></div>
   <div className="rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Classroom updates</h2><div className="mt-4 grid gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-4"><b>Homework added</b><p className="mt-1 text-slate-500">Physics worksheet · 10 questions</p></div><div className="rounded-2xl bg-slate-50 p-4"><b>Material shared</b><p className="mt-1 text-slate-500">Newton&apos;s Laws revision video</p></div><div className="rounded-2xl bg-slate-50 p-4"><b>Parent acknowledgement</b><p className="mt-1 text-slate-500">Your latest class report has been seen.</p></div></div></div>
  </section>
  <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-black">Recent class history</h2><p className="mt-1 text-sm text-slate-500">Attendance and reports are maintained as the classroom record.</p></div><button onClick={()=>setRequestSent(true)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Request calendar change</button></div><div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs uppercase tracking-wider text-slate-400"><tr><th className="pb-3">Date</th><th className="pb-3">Subject</th><th className="pb-3">Status</th><th className="pb-3">Report</th></tr></thead><tbody className="divide-y divide-slate-100"><tr><td className="py-4">Today</td><td>Physics</td><td><span className="font-bold">Attended</span></td><td>Available</td></tr><tr><td className="py-4">12 Sept</td><td>Chemistry</td><td><span className="font-bold">Attended</span></td><td>Available</td></tr><tr><td className="py-4">10 Sept</td><td>Mathematics</td><td><span className="font-bold">Attended</span></td><td>Available</td></tr></tbody></table></div>{requestSent&&<p className="mt-4 text-sm font-semibold text-slate-600">✓ Request sent to the Saral Vigyan admin team for confirmation.</p>}</section>
 </main><Footer/></>;
}
