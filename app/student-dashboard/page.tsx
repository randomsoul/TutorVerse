'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/site';
import { supabase } from '../../lib/supabase';
import { getAccurateLocation } from '../../lib/location';

type LocationFields={address_line:string;area:string;city:string;state:string;pincode:string;latitude:string;longitude:string;location_accuracy_m:string};
type ClassRow={id:string;classroom_id:string;starts_at:string;ends_at:string;status:string;meeting_url:string|null;classroomName:string;subject:string;tutor:string;mode:string;location:string|null};
type Material={id:string;title:string;content_type:string|null;url:string|null;description:string|null;created_at:string};
type Assessment={id:string;title:string;duration_minutes:number;starts_at:string|null;ends_at:string|null;positive_marks:number;negative_marks:number;published:boolean};

const fmtDate=(value:string)=>new Date(value).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});
const fmtTime=(value:string)=>new Date(value).toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});

export default function StudentDashboard(){
 const [loading,setLoading]=useState(true);
 const [message,setMessage]=useState('');
 const [name,setName]=useState('Student');
 const [studentId,setStudentId]=useState<string|null>(null);
 const [viewerRole,setViewerRole]=useState('student');
 const [classes,setClasses]=useState<ClassRow[]>([]);
 const [materials,setMaterials]=useState<Material[]>([]);
 const [assessments,setAssessments]=useState<Assessment[]>([]);
 const [attendance,setAttendance]=useState<string[]>([]);
 const [reports,setReports]=useState<Record<string,{topic:string|null;covered:string|null;homework:string|null;tutor_remarks:string|null}>>({});
 const [locationSaving,setLocationSaving]=useState(false);
 const [locationMessage,setLocationMessage]=useState('');
 const [location,setLocation]=useState<LocationFields>({address_line:'',area:'',city:'',state:'',pincode:'',latitude:'',longitude:'',location_accuracy_m:''});

 useEffect(()=>{
  async function load(){
   setLoading(true);setMessage('');
   const {data:{user}}=await supabase.auth.getUser();
   if(!user){window.location.href='/login';return;}
   const {data:profile,error:profileError}=await supabase.from('profiles').select('full_name,role').eq('id',user.id).maybeSingle();
   if(profileError||!profile){setMessage('Your account profile could not be loaded.');setLoading(false);return;}
   setViewerRole(profile.role);setName(profile.full_name||'Student');

   let targetStudentId:string|null=null;
   const requestedId=typeof window!=='undefined'?new URLSearchParams(window.location.search).get('student'):null;
   if(profile.role==='student'){
    const {data:student,error}=await supabase.from('students').select('id,address_line,area,city,state,pincode,latitude,longitude,location_accuracy_m').eq('profile_id',user.id).maybeSingle();
    if(error||!student){setMessage('Student profile could not be found.');setLoading(false);return;}
    targetStudentId=student.id;
    setLocation({address_line:student.address_line||'',area:student.area||'',city:student.city||'',state:student.state||'',pincode:student.pincode||'',latitude:student.latitude==null?'':String(student.latitude),longitude:student.longitude==null?'':String(student.longitude),location_accuracy_m:student.location_accuracy_m==null?'':String(student.location_accuracy_m)});
   } else if(profile.role==='parent' && requestedId){
    const {data:parent}=await supabase.from('parents').select('id').eq('profile_id',user.id).maybeSingle();
    if(!parent){setMessage('Parent profile could not be found.');setLoading(false);return;}
    const {data:link}=await supabase.from('parent_students').select('student_id').eq('parent_id',parent.id).eq('student_id',requestedId).maybeSingle();
    if(!link){setMessage('You are not authorised to view this student.');setLoading(false);return;}
    targetStudentId=requestedId;
    const {data:student}=await supabase.from('students').select('profile_id,address_line,area,city,state,pincode,latitude,longitude,location_accuracy_m').eq('id',requestedId).maybeSingle();
    if(student){
      const {data:studentProfile}=await supabase.from('profiles').select('full_name').eq('id',student.profile_id).maybeSingle();
      setName(studentProfile?.full_name||'Student');
      setLocation({address_line:student.address_line||'',area:student.area||'',city:student.city||'',state:student.state||'',pincode:student.pincode||'',latitude:student.latitude==null?'':String(student.latitude),longitude:student.longitude==null?'':String(student.longitude),location_accuracy_m:student.location_accuracy_m==null?'':String(student.location_accuracy_m)});
    }
   } else {
    setMessage('This page is available to students and authorised parents only.');setLoading(false);return;
   }
   setStudentId(targetStudentId);
   if(!targetStudentId){setLoading(false);return;}

   const {data:membership}=await supabase.from('classroom_students').select('classroom_id').eq('student_id',targetStudentId);
   const classroomIds=(membership||[]).map(x=>x.classroom_id);
   if(classroomIds.length){
    const {data:classrooms}=await supabase.from('classrooms').select('id,name,mode,location,subject_id,tutor_id,active').in('id',classroomIds);
    const subjectIds=(classrooms||[]).map(x=>x.subject_id).filter(Boolean);
    const tutorIds=(classrooms||[]).map(x=>x.tutor_id).filter(Boolean);
    const [{data:subjects},{data:tutors}]=await Promise.all([
      subjectIds.length?supabase.from('subjects').select('id,name').in('id',subjectIds):Promise.resolve({data:[]}),
      tutorIds.length?supabase.from('tutors').select('id,profile_id').in('id',tutorIds):Promise.resolve({data:[]})
    ]);
    const tutorProfileIds=(tutors||[]).map(x=>x.profile_id);
    const {data:tutorProfiles}=tutorProfileIds.length?await supabase.from('profiles').select('id,full_name').in('id',tutorProfileIds):{data:[]};
    const classById=(classrooms||[]).reduce((acc:any,c:any)=>{const tutor=(tutors||[]).find(t=>t.id===c.tutor_id);const tp=(tutorProfiles||[]).find(p=>p.id===tutor?.profile_id);acc[c.id]={...c,subject:(subjects||[]).find(s=>s.id===c.subject_id)?.name||'Class',tutor:tp?.full_name||'Saral Vigyan tutor'};return acc;},{});
    const {data:classData}=await supabase.from('classes').select('id,classroom_id,starts_at,ends_at,status,meeting_url').in('classroom_id',classroomIds).order('starts_at',{ascending:true});
    setClasses((classData||[]).map((c:any)=>({...c,classroomName:classById[c.classroom_id]?.name||'Classroom',subject:classById[c.classroom_id]?.subject||'Class',tutor:classById[c.classroom_id]?.tutor||'Saral Vigyan tutor',mode:classById[c.classroom_id]?.mode||'Online',location:classById[c.classroom_id]?.location||null})));
    const {data:materialData}=await supabase.from('content_items').select('id,title,content_type,url,description,created_at').in('classroom_id',classroomIds).order('created_at',{ascending:false});
    setMaterials((materialData||[]) as Material[]);
    const classIds=(classData||[]).map((c:any)=>c.id);
    if(classIds.length){
      const {data:reportData}=await supabase.from('class_reports').select('class_id,topic,covered,homework,tutor_remarks').in('class_id',classIds);
      setReports(Object.fromEntries((reportData||[]).map((r:any)=>[r.class_id,r])));
    }
   } else {setClasses([]);setMaterials([]);setReports({});}

   const {data:attendanceData}=await supabase.from('attendance').select('status').eq('student_id',targetStudentId);
   setAttendance((attendanceData||[]).map((a:any)=>a.status));
   const {data:assignmentData}=await supabase.from('assessment_assignments').select('assessment_id').eq('student_id',targetStudentId);
   const assessmentIds=(assignmentData||[]).map((a:any)=>a.assessment_id);
   if(assessmentIds.length){const {data:assessmentData}=await supabase.from('assessments').select('id,title,duration_minutes,starts_at,ends_at,positive_marks,negative_marks,published').in('id',assessmentIds).eq('published',true).order('starts_at',{ascending:true});setAssessments((assessmentData||[]) as Assessment[]);}else setAssessments([]);
   setLoading(false);
  }
  load();
 },[]);

 async function useApproximateLocation(){
  setLocationMessage('');setLocationSaving(true);
  try{const result=await getAccurateLocation();setLocation(l=>({...l,latitude:String(result.latitude),longitude:String(result.longitude),location_accuracy_m:String(result.accuracy_m)}));setLocationMessage('Location captured within the 5 km accuracy limit. Click Save location to store it.');}
  catch(error){setLocationMessage(error instanceof Error?error.message:'Location could not be obtained.');}
  finally{setLocationSaving(false);}
 }
 async function saveLocation(){
  if(!studentId){setLocationMessage('Student profile could not be found.');return;}
  setLocationSaving(true);setLocationMessage('');
  const {error}=await supabase.from('students').update({address_line:location.address_line.trim()||null,area:location.area.trim()||null,city:location.city.trim()||null,state:location.state.trim()||null,pincode:location.pincode.trim()||null,latitude:location.latitude?Number(location.latitude):null,longitude:location.longitude?Number(location.longitude):null,location_accuracy_m:location.location_accuracy_m?Number(location.location_accuracy_m):null}).eq('id',studentId);
  setLocationMessage(error?.message||'✓ Location details saved.');setLocationSaving(false);
 }
 const now=Date.now();
 const upcoming=classes.filter(c=>new Date(c.starts_at).getTime()>=now && c.status!=='cancelled').sort((a,b)=>new Date(a.starts_at).getTime()-new Date(b.starts_at).getTime());
 const nextClass=upcoming[0];
 const attended=attendance.filter(s=>s==='attended').length; const attendancePct=attendance.length?Math.round(attended/attendance.length*100):null;
 const recent=classes.filter(c=>new Date(c.starts_at).getTime()<now).sort((a,b)=>new Date(b.starts_at).getTime()-new Date(a.starts_at).getTime()).slice(0,5);
 if(loading)return <><Header/><main className="mx-auto max-w-7xl px-5 py-16"><p className="text-slate-500">Loading your live dashboard…</p></main><Footer/></>;
 if(message)return <><Header/><main className="mx-auto max-w-7xl px-5 py-16"><div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700"><b>{message}</b></div></main><Footer/></>;
 return <><Header/><main className="mx-auto max-w-7xl px-5 py-10">
  <p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Student dashboard</p>
  <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><h1 className="text-4xl font-black tracking-tight">Welcome back, {name}.</h1><p className="mt-2 text-slate-500">Your live classes, reports, materials and assessments — all in one place.</p></div>{viewerRole==='parent'&&<Link href="/parent-dashboard" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Parent dashboard →</Link>}</div>
  <section className="mt-8 grid gap-4 md:grid-cols-3">
   <div className="rounded-3xl bg-slate-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Next class</p>{nextClass?<><h2 className="mt-3 text-2xl font-black">{nextClass.subject}</h2><p className="mt-2 text-slate-300">{fmtDate(nextClass.starts_at)} · {fmtTime(nextClass.starts_at)} · {nextClass.mode}</p><p className="mt-1 text-sm text-slate-400">Tutor: {nextClass.tutor}</p></>:<><h2 className="mt-3 text-2xl font-black">No class scheduled</h2><p className="mt-2 text-slate-300">Saral Vigyan has not assigned your next class yet.</p></>}</div>
   <div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-sm font-semibold text-slate-500">Attendance</p><p className="mt-2 text-3xl font-black">{attendancePct==null?'—':`${attendancePct}%`}</p><p className="mt-1 text-sm text-slate-400">{attendance.length?`${attended} of ${attendance.length} classes attended`:'No attendance recorded yet'}</p></div>
   <div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-sm font-semibold text-slate-500">Upcoming assessment</p>{assessments[0]?<><p className="mt-2 text-xl font-black">{assessments[0].title}</p><p className="mt-1 text-sm text-slate-400">{assessments[0].duration_minutes} minutes · +{assessments[0].positive_marks} / −{assessments[0].negative_marks}</p></>:<><p className="mt-2 text-xl font-black">None assigned</p><p className="mt-1 text-sm text-slate-400">No published assessment is assigned to you.</p></>}</div>
  </section>

  <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Home tuition matching</p><h2 className="mt-2 text-2xl font-black">Your location</h2><p className="mt-1 text-sm text-slate-500">Used by Saral Vigyan for home-tuition matching. Your exact address is administrative information.</p></div><button type="button" onClick={useApproximateLocation} disabled={locationSaving} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold disabled:opacity-50">{locationSaving?'Getting location…':'Use my approximate location'}</button></div><div className="mt-6 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold">Area / locality<input value={location.area} onChange={e=>setLocation({...location,area:e.target.value})} placeholder="e.g. Sion" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold">City<input value={location.city} onChange={e=>setLocation({...location,city:e.target.value})} placeholder="e.g. Mumbai" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold">State<input value={location.state} onChange={e=>setLocation({...location,state:e.target.value})} placeholder="e.g. Maharashtra" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold">PIN code<input value={location.pincode} onChange={e=>setLocation({...location,pincode:e.target.value})} inputMode="numeric" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><label className="text-sm font-bold md:col-span-2">Address / landmark<input value={location.address_line} onChange={e=>setLocation({...location,address_line:e.target.value})} placeholder="House / building, street, nearby landmark" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label><div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500 md:col-span-2">{location.latitude&&location.longitude?<>Coordinates captured: <b>{location.latitude}, {location.longitude}</b>{location.location_accuracy_m?` (about ${location.location_accuracy_m} m accuracy)`:''}. These are for matching, not public display.</>:'No coordinates captured yet. Use the location button or enter the area and address manually.'}</div><div className="flex flex-wrap items-center gap-3 md:col-span-2"><button type="button" onClick={saveLocation} disabled={locationSaving} className="rounded-xl bg-slate-950 px-5 py-3 font-black text-white disabled:opacity-50">{locationSaving?'Saving…':'Save location'}</button>{locationMessage&&<p className="text-sm font-semibold text-slate-600">{locationMessage}</p>}</div></div></section>

  <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">My classrooms</h2><p className="mt-1 text-sm text-slate-500">Only classrooms actually assigned to you appear here.</p>{classes.length===0?<div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No classroom has been assigned yet. This is live data — no sample classes are shown.</div>:<div className="mt-5 grid gap-3 md:grid-cols-2">{Array.from(new Map(classes.map(c=>[c.classroom_id,c])).values()).map(c=><div key={c.classroom_id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5"><b>{c.classroomName}</b><p className="mt-1 text-sm text-slate-500">{c.subject} · {c.mode} · Tutor: {c.tutor}</p></div>)}</div>}</section>

  <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Learning materials</h2>{materials.length===0?<div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No learning materials have been shared with you yet.</div>:<div className="mt-5 grid gap-3 md:grid-cols-2">{materials.map(m=><div key={m.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{m.content_type||'Material'}</span><h3 className="mt-1 font-black">{m.title}</h3>{m.description&&<p className="mt-1 text-sm text-slate-500">{m.description}</p>}{m.url&&<a href={m.url} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white">Open →</a>}</div>)}</div>}</section>

  <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-black">Class history & reports</h2><p className="mt-1 text-sm text-slate-500">This section is populated only from recorded classes.</p></div></div>{recent.length===0?<div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No completed or past classes recorded yet.</div>:<div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs uppercase tracking-wider text-slate-400"><tr><th className="pb-3">Date</th><th className="pb-3">Subject</th><th className="pb-3">Status</th><th className="pb-3">Report</th></tr></thead><tbody className="divide-y divide-slate-100">{recent.map(c=><tr key={c.id}><td className="py-4">{fmtDate(c.starts_at)}</td><td>{c.subject}</td><td className="font-bold">{c.status}</td><td>{reports[c.id]?<div><b>{reports[c.id].topic||'Class report'}</b>{reports[c.id].homework&&<p className="mt-1 text-xs text-slate-500">Homework: {reports[c.id].homework}</p>}</div>:'No report yet'}</td></tr>)}</tbody></table></div>}</section>
 </main><Footer/></>;
}
