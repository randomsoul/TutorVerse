'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function Brand(){return <Link href="/" aria-label="TutorVerse home" className="flex items-center"><img src="/tutorverse-logo.svg" alt="TutorVerse" className="block h-auto w-[180px] sm:w-[200px]"/></Link>}
function FooterBrand(){return <Link href="/" aria-label="TutorVerse home" className="inline-flex items-center"><img src="/tutorverse-logo.svg" alt="TutorVerse" className="block h-auto w-[230px] sm:w-[260px]"/></Link>}
function Saral(){return <div className="mt-5"><div className="mb-2 text-xs font-semibold text-white/70">Powered by</div><img src="/saralvigyan.svg" alt="Saral Vigyan" className="h-auto w-[245px] max-w-full object-contain object-left"/></div>}
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
  const {data:sub}=supabase.auth.onAuthStateChange(()=>load());
  return()=>{active=false;sub.subscription.unsubscribe()};
 },[]);
 return <header className="sticky top-0 z-40 border-b border-[#dfe5e8] bg-white/95 backdrop-blur">
  <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-5 px-4 py-3 sm:px-6">
   <Brand/>
   <nav className="hidden items-center gap-6 text-sm font-semibold text-[#17324D] lg:flex">
    <Link href="/" className="hover:text-[#169B55]">Home</Link><Link href="/about" className="hover:text-[#169B55]">About</Link><Link href="/find-tutor" className="hover:text-[#169B55]">Find a Tutor</Link><Link href="/become-tutor" className="hover:text-[#169B55]">Become a Tutor</Link><Link href="/demo" className="hover:text-[#169B55]">Free Demo</Link>
    {dashboardHref&&<Link href={dashboardHref} className="hover:text-[#169B55]">Dashboard</Link>}
   </nav>
   <div className="hidden items-center gap-3 lg:flex">
    {!signedIn?<><Link href="/login" className="rounded-lg border border-[#17324D] px-4 py-2 text-sm font-semibold text-[#17324D]">Login</Link><Link href="/signup" className="rounded-lg bg-[#169B55] px-4 py-2 text-sm font-semibold text-white">Sign Up</Link></>:<Link href="/profile" className="rounded-lg bg-[#17324D] px-4 py-2 text-sm font-semibold text-white">Profile</Link>}
   </div>
   <button type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)} className="rounded-lg border border-[#dfe5e8] p-2 text-[#17324D] lg:hidden">☰</button>
  </div>
  {menuOpen&&<div className="border-t border-[#dfe5e8] bg-white px-4 py-4 lg:hidden"><nav className="flex flex-col gap-3 text-sm font-semibold text-[#17324D]"><Link href="/" onClick={()=>setMenuOpen(false)}>Home</Link><Link href="/about" onClick={()=>setMenuOpen(false)}>About</Link><Link href="/find-tutor" onClick={()=>setMenuOpen(false)}>Find a Tutor</Link><Link href="/become-tutor" onClick={()=>setMenuOpen(false)}>Become a Tutor</Link><Link href="/demo" onClick={()=>setMenuOpen(false)}>Free Demo</Link>{dashboardHref&&<Link href={dashboardHref} onClick={()=>setMenuOpen(false)}>Dashboard</Link>}{!signedIn?<><Link href="/login" onClick={()=>setMenuOpen(false)}>Login</Link><Link href="/signup" onClick={()=>setMenuOpen(false)}>Sign Up</Link></>:<Link href="/profile" onClick={()=>setMenuOpen(false)}>Profile</Link>}</nav></div>}
 </header>
}

export function Footer(){return <footer className="mt-auto bg-[#102c43] text-white"><div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6"><div><FooterBrand/><Saral/><p className="mt-4 max-w-sm text-sm leading-6 text-white/80">Connect with trusted tutors, practice with purpose, and grow with confidence.</p></div><div><h3 className="font-bold">Platform</h3><div className="mt-3 flex flex-col gap-2 text-sm"><Link href="/find-tutor">Find a Tutor</Link><Link href="/become-tutor">Become a Tutor</Link><Link href="/demo">Free Demo</Link></div></div><div><h3 className="font-bold">Company</h3><div className="mt-3 flex flex-col gap-2 text-sm"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/refund-cancellation">Cancellation & Refund</Link></div></div><div><h3 className="font-bold">Connect</h3><p className="mt-3 text-sm text-white/80">TutorVerse<br/>Mumbai • Navi Mumbai • Thane</p></div></div><div className="border-t border-white/15 py-4 text-center text-xs text-white/70">© {new Date().getFullYear()} TutorVerse. All rights reserved.</div></footer>}
