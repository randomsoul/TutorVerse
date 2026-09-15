'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';

type Material={id:string;title:string;content_type:string|null;url:string|null;description:string|null;created_at:string|null};

type LocationFields={address_line:string;area:string;city:string;state:string;pincode:string;latitude:string;longitude:string;location_accuracy_m:string};

export default function StudentDashboard(){
 const [requestSent,setRequestSent]=useState(false);
 const [materials,setMaterials]=useState<Material[]>([]);
 const [materialsLoading,setMaterialsLoading]=useState(true);
 const [studentId,setStudentId]=useState<string|null>(null);
 const [locationSaving,setLocationSaving]=useState(false);
 const [locationMessage,setLocationMessage]=useState('');
 const [location,setLocation]=useState<LocationFields>({address_line:'',area:'',city:'',state:'',pincode:'',latitude:'',longitude:'',location_accuracy_m:''});

 useEffect(()=>{
  async function loadMaterials(){
   const { data:{ user } }=await supabase.auth.getUser();
   if(!user){setMaterialsLoading(false);return;}
   const { data:student }=await supabase.from('students').select('id,address_line,area,city,state,pincode,latitude,longitude,location_accuracy_m').eq('profile_id',user.id).maybeSingle();
   if(!student){setMaterialsLoading(false);return;}
   setStudentId(student.id);
   setLocation({address_line:student.address_line||'',area:student.area||'',city:student.city||'',state:student.state||'',pincode:student.pincode||'',latitude:student.latitude==null?'':String(student.latitude),longitude:student.longitude==null?'':String(student.longitude),location_accuracy_m:student.location_accuracy_m==null?'':String(student.location_accuracy_m)});
   const { data }=await supabase.from('content_items').select('id,title,content_type,url,description,created_at').order('created_at',{ascending:false});
   setMaterials((data||[]) as Material[]);
   setMaterialsLoading(false);
  }
  loadMaterials();
 },[]);

 function useApproximateLocation(){
  setLocationMessage('');
  if(!navigator.geolocation){setLocationMessage('Your browser does not provide location access.');return;}
  setLocationSaving(true);
  navigator.geolocation.getCurrentPosition(position=>{
   setLocation(l=>({...l,latitude:position.coords.latitude.toFixed(6),longitude:position.coords.longitude.toFixed(6),location_accuracy_m:Math.round(position.coords.accuracy).toString()}));
   setLocationSaving(false);setLocationMessage('Approximate coordinates captured. Click Save location to store them.');
  },()=>{setLocationSaving(false);setLocationMessage('Location permission was not granted. You can enter the area and address manually.');},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
 }

 async function saveLocation(){
  if(!studentId){setLocationMessage('Student profile could not be found.');return;}
  setLocationSaving(true);setLocationMessage('');
  const {error}=await supabase.from('students').update({address_line:location.address_line.trim()||null,area:location.area.trim()||null,city:location.city.trim()||null,state:location.state.trim()||null,pincode:location.pincode.trim()||null,latitude:location.latitude?Number(location.latitude):null,longitude:location.longitude?Number(location.longitude):null,location_accuracy_m:location.location_accuracy_m?Number(location.location_accuracy_m):null}).eq('id',studentId);
  setLocationMessage(error?.message||'✓ Location details saved.');setLocationSaving(false);
 }

 return <><Header/><main className="mx-auto max-w-7xl px-5 py-10">
  <p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Student dashboard</p><div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><h1 className="text-4xl font-black tracking-tight">Welcome back, Aarav.</h1><p className="mt-2 text-slate-500">Your classes, reports, materials and assessments — all in one place.</p></div><Link href="/parent-dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Parent dashboard →</Link></div>
  <section className="mt-8 grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Next class</p><h2 className="mt-3 text-2xl font-black">Physics</h2><p className="mt-2 text-slate-300">Today · 5:30 PM · Home tuition</p><div className="mt-5 rounded-2xl bg-white/10 p-3 text-sm">Parent reminder: 5:00 PM</div></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-sm font-semibold text-slate-500">Attendance</p><p className="mt-2 text-3xl font-black">96%</p><p className="mt-1 text-sm text-slate-400">24 of 25 classes attended</p></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-sm font-semibold text-slate-500">Upcoming assessment</p><p className="mt-2 text-xl font-black">Physics Practice Test</p><p className="mt-1 text-sm text-slate-400">45 questions · 45 minutes</p></div></section>

  <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Home tuition matching</p><h2 className="mt-2 text-2xl font-black">Your location</h2><p className="mt-1 text-sm text-slate-500">For home-tuition matching, Saral Vigyan needs your area, city and state. Your exact address is administrative information and is not a public profile detail.</p></div><button type="button" onClick={useApproximateLocation} disabled={locationSaving} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold disabled:opacity-50">{locationSaving?'Getting location…':'Use my approximate location'}</button></div><div className="mt-6 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold">Area / locality<input value={location.area} onChange={e=>setLocation({...location,area:e.target.value})} placeholder="e.g. Sion" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold">City<input value={location.city} onChange={e=>setLocation({...location,city:e.target.value})} placeholder="e.g. Mumbai" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold">State<input value={location.state} onChange={e=>setLocation({...location,state:e.target.value})} placeholder="e.g. Maharashtra" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold">PIN code<input value={location.pincode} onChange={e=>setLocation({...location,pincode:e.target.value})} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold md:col-span-2">Address / landmark<input value={location.address_line} onChange={e=>setLocation({...location,address_line:e.target.value})} placeholder="House / building, street, nearby landmark" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500 md:col-span-2">{location.latitude&&location.longitude?<>Approximate coordinates captured: <b>{location.latitude}, {location.longitude}</b>{location.location_accuracy_m?` (about ${location.location_accuracy_m} m accuracy)`:''}. These are for matching, not public display.</>:'No coordinates captured yet. You can use the location button or enter the area and address manually.'}</div><div className="flex flex-wrap items-center gap-3 md:col-span-2"><button type="button" onClick={saveLocation} disabled={locationSaving} className="rounded-xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-50">{locationSaving?'Saving…':'Save location'}</button>{locationMessage&&<p className="text-sm font-semibold text-slate-600">{locationMessage}</p>}</div></div></section>

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
