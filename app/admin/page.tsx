'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';

const cards=[['Leads','18','New enquiries'],['Students','42','Active'],['Tutor applications','7','Awaiting review'],['Classrooms','16','Running'],['Today’s classes','9','2 currently live'],['Pending notifications','4','Need attention']];
const nav=['Overview','Students','Parents','Tutors','Classrooms','Calendar','Class reports','Content','Assessments','Payments','Tutor search','Feedback','Notifications'];
const createOptions=['Student','Parent','Tutor','Classroom','Class','Assessment','Material','Payment'];

export default function AdminDashboard(){
  const [authorized,setAuthorized]=useState(false);
  const [checking,setChecking]=useState(true);
  const [section,setSection]=useState('Overview');
  const [createType,setCreateType]=useState('');
  const [saved,setSaved]=useState(false);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [subject,setSubject]=useState('Physics');
  const [grade,setGrade]=useState('Class 11');
  const [mode,setMode]=useState('Home tuition');
  const [date,setDate]=useState('');
  const [details,setDetails]=useState('');

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
    }
    checkAccess();
    return ()=>{active=false};
  },[]);

  function createRecord(e:React.FormEvent){e.preventDefault();const old=JSON.parse(localStorage.getItem('tutorverse_admin_records')||'[]');old.push({type:createType,name,email,subject,grade,mode,date,details,createdAt:new Date().toISOString()});localStorage.setItem('tutorverse_admin_records',JSON.stringify(old));setSaved(true);setName('');setEmail('');setDetails('')}

  if(checking) return <><Header/><main className="mx-auto max-w-3xl px-5 py-20"><div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">TutorVerse secure access</p><h1 className="mt-3 text-2xl font-black">Checking administrator access…</h1><p className="mt-2 text-slate-500">The admin workspace is available only to authorised Saral Vigyan staff.</p></div></main><Footer/></>;
  if(!authorized) return null;

  return <><Header/><main className="mx-auto max-w-7xl px-5 py-8"><div className="flex flex-col gap-5 lg:flex-row"><aside className="w-full shrink-0 lg:w-60"><div className="rounded-3xl bg-slate-950 p-4 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Saral Vigyan</p><h1 className="mt-2 text-2xl font-black">Admin control</h1><p className="mt-1 text-xs text-slate-400">TutorVerse operations</p><div className="mt-5 grid gap-1">{nav.map(n=><button key={n} onClick={()=>{setSection(n);setCreateType('')}} className={`rounded-xl px-3 py-2 text-left text-sm font-semibold ${section===n?'bg-white text-slate-950':'text-slate-300 hover:bg-white/10'}`}>{n}</button>)}</div></div></aside><section className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Admin dashboard</p><h2 className="mt-2 text-4xl font-black tracking-tight">{section}</h2><p className="mt-2 text-slate-500">Create, edit, assign, publish and audit the managed learning journey.</p></div><Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold">View public site →</Link></div>
{section==='Overview'?<><div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(c=><div key={c[0]} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{c[0]}</p><p className="mt-2 text-3xl font-black">{c[1]}</p><p className="mt-1 text-xs text-slate-400">{c[2]}</p></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-2"><div className="rounded-3xl border border-slate-200 bg-white p-6"><h3 className="text-xl font-black">Today’s operations</h3><div className="mt-4 grid gap-3 text-sm"><div className="rounded-2xl bg-slate-50 p-4"><b>5:30 PM · Physics · Home tuition</b><p className="mt-1 text-slate-500">Tutor: Aarav · Student: Aarav Sharma · Parent reminder queued for 5:00 PM</p></div><div className="rounded-2xl bg-slate-50 p-4"><b>6:00 PM · Chemistry · Online</b><p className="mt-1 text-slate-500">Google Meet link ready · parent notification queued</p></div></div></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><h3 className="text-xl font-black">Quick create</h3><p className="mt-1 text-sm text-slate-500">Create core records now in the preview; the same forms will write to Supabase in production.</p><div className="mt-4 grid grid-cols-2 gap-2">{createOptions.map(x=><button key={x} onClick={()=>{setCreateType(x);setSaved(false)}} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold hover:bg-slate-50">+ {x}</button>)}</div></div></div></>:<div className="mt-7 rounded-3xl border border-slate-200 bg-white p-7"><h3 className="text-xl font-black">{section} workspace</h3><p className="mt-2 max-w-2xl text-slate-500">Saral Vigyan controls this module. Use Quick create below for core records or select the module-specific controls in the next database-backed iteration.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{['Create','Edit','View history'].map(a=><button key={a} onClick={()=>{setCreateType(section==='Students'?'Student':section==='Tutors'?'Tutor':section==='Classrooms'?'Classroom':section==='Calendar'?'Class':section==='Content'?'Material':section==='Assessments'?'Assessment':'Student');setSaved(false)}} className="rounded-2xl bg-slate-50 p-5 text-left font-black">{a}<p className="mt-1 text-xs font-normal text-slate-500">Open controlled workflow</p></button>)}</div></div>}
{createType&&<div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Create record</p><h3 className="mt-2 text-2xl font-black">New {createType}</h3></div><button onClick={()=>setCreateType('')} className="text-sm font-bold text-slate-400">Close</button></div><form onSubmit={createRecord} className="mt-5 grid gap-4 md:grid-cols-2"><label className="text-sm font-bold">Name / title<input required value={name} onChange={e=>setName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" placeholder={createType==='Assessment'?'Physics Practice Test':'Full name or record title'}/></label><label className="text-sm font-bold">Email / contact<input value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" placeholder="Email or WhatsApp number"/></label><label className="text-sm font-bold">Subject<select value={subject} onChange={e=>setSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"><option>Physics</option><option>Mathematics</option><option>Chemistry</option><option>Biology</option><option>English</option><option>Computer Science</option></select></label><label className="text-sm font-bold">Class / grade<select value={grade} onChange={e=>setGrade(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"><option>Class 10</option><option>Class 11</option><option>Class 12</option><option>JEE Main</option><option>NEET</option></select></label><label className="text-sm font-bold">Mode<select value={mode} onChange={e=>setMode(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"><option>Home tuition</option><option>Online tuition</option><option>Batch tuition</option></select></label><label className="text-sm font-bold">Date / schedule<input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal"/></label><label className="text-sm font-bold md:col-span-2">Notes / details<textarea value={details} onChange={e=>setDetails(e.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" placeholder="Add classroom details, instructions, content URL, assessment rules or admin notes..."/></label><div className="md:col-span-2 flex flex-wrap gap-3"><button className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Save {createType} →</button>{saved&&<span className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">✓ Saved in preview storage. Production will save to Supabase and create notification events.</span>}</div></form></div>}</section></div></main><Footer/></>}
