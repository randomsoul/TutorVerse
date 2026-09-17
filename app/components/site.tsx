'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function Brand(){return <Link href="/" className="flex items-center gap-2"><div className="leading-none"><div className="text-[25px] font-black tracking-[-.06em] text-[#17324d] sm:text-[30px]"><span className="text-[#169554]">Tutor</span>Verse</div><div className="mt-1 text-[9px] font-bold tracking-[.12em] text-[#203247]">Learn&nbsp; • &nbsp;Practice&nbsp; • &nbsp;Grow</div></div></Link>}
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

export function Footer(){return <footer className="bg-[#102c43] text-white"><div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-7 px-6 py-9 md:flex-row"><div className="flex items-center gap-4"><Brand/><div className="hidden border-l border-white/30 pl-4 sm:block"><img src="/saralvigyan.svg" alt="Saral Vigyan" className="h-12 w-[225px] object-contain object-left"/></div></div><div className="flex flex-wrap justify-center gap-3 text-xs text-white/90"><Link href="/">Home</Link><span>|</span><Link href="/about">About Us</Link><span>|</span><Link href="/contact">Contact</Link><span>|</span><Link href="/privacy">Privacy</Link><span>|</span><Link href="/terms">Terms</Link></div><div className="text-center text-xs text-white/75">© {new Date().getFullYear()} TutorVerse. All rights reserved.</div></div></footer>}
