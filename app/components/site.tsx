'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function Brand(){return <Link href="/" aria-label="TutorVerse home" className="flex items-center gap-2"><img src="/tutorverse-logo.svg" alt="TutorVerse" className="block h-auto w-[180px] sm:w-[200px]"/></Link>}
function FooterBrand(){return <Link href="/" aria-label="TutorVerse home" className="inline-flex items-center"><img src="/tutorverse-logo.svg" alt="TutorVerse" className="block h-auto w-[230px] sm:w-[260px]"/></Link>}
function Saral(){return <div className="border-l border-[#dfe5e8] pl-4"><img src="/saralvigyan.svg" alt="Saral Vigyan" className="h-[52px] w-[245px] object-contain object-left"/></div>}
function dashboardForRole(role:string){if(role==='admin'||role==='staff'||role==='manager')return '/admin';if(role==='parent')return '/parent-dashboard';if(role==='student')return '/student-dashboard';if(role==='tutor')return '/tutor-dashboard';return null}

export function Header(){
 const [signedIn,setSignedIn]=useState(false);
 const [dashboardHref,setDashboardHref]=useState<string|null>(null);
 const [menuOpen,setMenuOpen]=useState(false);
 useEffect(()=>{
  let active=true;
  const load=async()=>{
   const {data}=await supabase.auth.getSession();
   if(!active)return;
   setSignedIn(!!data.session);
   if(data.session){
    const {data:profile}=await supabase.from('profiles').select('role,is_active,archived_at').eq('id',data.session.user.id).maybeSingle();
    if(active&&profile&&profile.is_active!==false&&!profile.archived_at)setDashboardHref(dashboardForRole(profile.role));
   }else setDashboardHref(null);
  };
  load();
  const {data:listener}=supabase.auth.onAuthStateChange(async(_e,session)=>{
   if(!active)return;
   setSignedIn(!!session);
   if(!session){setDashboardHref(null);return;}
   const {data:profile}=await supabase.from('profiles').select('role,is_active,archived_at').eq('id',session.user.id).maybeSingle();
   if(active&&profile&&profile.is_active!==false&&!profile.archived_at)setDashboardHref(dashboardForRole(profile.role));
  });
  return()=>{active=false;listener.subscription.unsubscribe()}
 },[]);
 async function logout(){setMenuOpen(false);await supabase.auth.signOut();window.location.href='/login'}
 function closeMenu(){setMenuOpen(false)}
 return <header className="sticky top-0 z-50 border-b border-[#e1e7ea] bg-white"><div className="mx-auto flex max-w-[1280px] items-center gap-5 px-5 py-3"><Brand/><div className="hidden xl:block"><Saral/></div><nav className="ml-auto hidden items-center gap-6 text-sm font-semibold lg:flex"><Link href="/" className="border-b-2 border-[#178f52] pb-1 text-[#145f3b]">Home</Link><Link href="/tutors" className="hover:text-[#168b50]">Find a Tutor</Link><Link href="/subjects" className="hover:text-[#168b50]">Courses⌄</Link><Link href="/about" className="hover:text-[#168b50]">About Us</Link><Link href="/contact" className="hover:text-[#168b50]">Contact</Link>{signedIn&&dashboardHref&&<Link href={dashboardHref} className="hover:text-[#168b50]">Dashboard</Link>}</nav><div className="ml-auto lg:ml-2">{signedIn?<button onClick={logout} className="hidden lg:inline-flex rounded-lg border border-[#d7e2dc] px-5 py-2.5 text-sm font-extrabold text-[#24543a]">Logout</button>:<Link href="/login" className="hidden lg:inline-flex rounded-lg bg-[#198f52] px-6 py-2.5 text-sm font-extrabold text-white shadow-sm">Login</Link>}<button type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#d7e2dc] text-[#17324d] lg:hidden"><span className="text-2xl leading-none">{menuOpen?'×':'☰'}</span></button></div></div>{menuOpen&&<div className="border-t border-[#e1e7ea] bg-white px-5 py-4 shadow-md lg:hidden"><nav className="mx-auto flex max-w-[1280px] flex-col text-sm font-semibold"><Link href="/" onClick={closeMenu} className="border-b border-[#edf0f2] py-3 text-[#145f3b]">Home</Link><Link href="/tutors" onClick={closeMenu} className="border-b border-[#edf0f2] py-3">Find a Tutor</Link><Link href="/subjects" onClick={closeMenu} className="border-b border-[#edf0f2] py-3">Courses</Link><Link href="/about" onClick={closeMenu} className="border-b border-[#edf0f2] py-3">About Us</Link><Link href="/contact" onClick={closeMenu} className="border-b border-[#edf0f2] py-3">Contact</Link>{signedIn&&dashboardHref&&<Link href={dashboardHref} onClick={closeMenu} className="border-b border-[#edf0f2] py-3 text-[#145f3b]">Dashboard</Link>}{signedIn?<button onClick={logout} className="mt-3 rounded-lg border border-[#d7e2dc] px-5 py-3 text-left font-extrabold text-[#24543a]">Logout</button>:<Link href="/login" onClick={closeMenu} className="mt-3 rounded-lg bg-[#198f52] px-5 py-3 text-center font-extrabold text-white">Login</Link>}</nav></div>}</header>
}

function SocialIcon({label,active=false}:{label:string;active?:boolean}){return <span aria-label={label} title={active?label:`${label} — coming soon`} className={`grid h-9 w-9 place-items-center rounded-full border text-xs font-black ${active?'border-white/30 bg-white/10 text-white':'border-white/15 bg-white/5 text-white/45'}`}>{label==='Instagram'?'◎':label==='Facebook'?'f':label==='LinkedIn'?'in':'𝕏'}</span>}

export function Footer(){return <footer className="bg-[#102c43] text-white">
 <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8 lg:py-12">
  <div className="grid gap-10 lg:grid-cols-[1.35fr_.8fr_.8fr_1fr]">
   <div>
    <div className="flex items-center gap-4"><FooterBrand/><div className="hidden border-l border-white/30 pl-4 sm:block"><img src="/saralvigyan.svg" alt="Saral Vigyan" className="h-12 w-[225px] object-contain object-left"/></div></div>
    <p className="mt-4 max-w-[410px] text-sm leading-6 text-white/75">Find, Connect, Learn — trusted home, online and batch tuition for school subjects and competitive exams.</p>
    <p className="mt-3 text-xs font-semibold text-white/65">Powered by Saral Vigyan</p>
    <p className="mt-3 text-xs leading-5 text-white/60">Kharghar, Navi Mumbai, India<br/>+91 90822 71860</p>
   </div>
   <div><h3 className="text-sm font-black uppercase tracking-[.12em] text-white/90">Students & Parents</h3><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/tutors" className="hover:text-white">Find a Tutor</Link><Link href="/subjects" className="hover:text-white">Courses</Link><Link href="/demo" className="hover:text-white">Free Demo Class</Link><Link href="/how-it-works" className="hover:text-white">How It Works</Link></div></div>
   <div><h3 className="text-sm font-black uppercase tracking-[.12em] text-white/90">Tutors & Company</h3><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/become-a-tutor" className="hover:text-white">Become a Tutor</Link><Link href="/about" className="hover:text-white">About Us</Link><Link href="/contact" className="hover:text-white">Contact Us</Link></div></div>
   <div><h3 className="text-sm font-black uppercase tracking-[.12em] text-white/90">Legal & Support</h3><div className="mt-4 flex flex-col gap-3 text-sm text-white/75"><Link href="/privacy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms of Use</Link><Link href="/cancellation-refund" className="hover:text-white">Cancellation & Refund</Link><Link href="/contact" className="hover:text-white">Grievance / Support</Link></div><div className="mt-5 flex gap-2"><a href="https://www.instagram.com/tutorversein?stkn=MWRnbG14bngxYTVuOA==" target="_blank" rel="noreferrer" aria-label="TutorVerse on Instagram"><SocialIcon label="Instagram" active/></a><SocialIcon label="Facebook"/><SocialIcon label="LinkedIn"/><SocialIcon label="X"/></div></div>
  </div>
  <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><div>© {new Date().getFullYear()} TutorVerse. All rights reserved.</div><div className="flex flex-wrap gap-4"><Link href="/privacy" className="hover:text-white/85">Privacy</Link><Link href="/terms" className="hover:text-white/85">Terms</Link><Link href="/cancellation-refund" className="hover:text-white/85">Cancellation & Refund</Link></div></div>
 </div>
 </footer>}
