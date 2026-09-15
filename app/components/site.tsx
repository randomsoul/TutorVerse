'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

function Brand(){return <Link href="/" className="flex items-center gap-2"><div className="leading-none"><div className="text-[25px] font-black tracking-[-.06em] text-[#183a5b] sm:text-[29px]"><span className="text-[#179454]">Tutor</span>Verse</div><div className="mt-0.5 text-[9px] font-bold tracking-[.12em] text-[#203247]">Learn&nbsp; • &nbsp;Practice&nbsp; • &nbsp;Grow</div></div></Link>}
function Saral(){return <div className="border-l border-[#dfe5e8] pl-4 leading-none"><div className="font-serif text-[25px] tracking-[-.04em] text-[#1672a8]"><span>Saral</span><span className="font-bold text-[#f07a14]">Vigy@n</span></div><div className="mt-1 text-[9px] font-semibold text-[#26384a]">Making Learning Simple</div></div>}

export function Header(){
 const [signedIn,setSignedIn]=useState(false);
 useEffect(()=>{let active=true;supabase.auth.getSession().then(({data})=>{if(active)setSignedIn(!!data.session)});const {data:listener}=supabase.auth.onAuthStateChange((_e,session)=>setSignedIn(!!session));return()=>{active=false;listener.subscription.unsubscribe()}},[]);
 async function logout(){await supabase.auth.signOut();window.location.href='/login'}
 return <header className="sticky top-0 z-50 border-b border-[#e1e7ea] bg-white"><div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3"><Brand/><div className="hidden lg:block"><Saral/></div><nav className="ml-auto hidden items-center gap-6 text-sm font-semibold lg:flex"><Link href="/" className="border-b-2 border-[#178f52] pb-1 text-[#145f3b]">Home</Link><Link href="/tutors" className="hover:text-[#168b50]">Find a Tutor</Link><Link href="/subjects" className="hover:text-[#168b50]">Courses⌄</Link><Link href="/about" className="hover:text-[#168b50]">About Us</Link><Link href="/contact" className="hover:text-[#168b50]">Contact</Link></nav><div className="ml-2">{signedIn?<button onClick={logout} className="rounded-lg border border-[#d7e2dc] px-5 py-2.5 text-sm font-extrabold text-[#24543a]">Logout</button>:<Link href="/login" className="inline-flex rounded-lg bg-[#198f52] px-6 py-2.5 text-sm font-extrabold text-white shadow-sm">Login</Link>}</div></div></header>
}

export function Footer(){return <footer className="bg-[#102c43] text-white"><div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-7 px-6 py-9 md:flex-row"><div className="flex items-center gap-4"><Brand/><div className="hidden border-l border-white/30 pl-4 sm:block"><div className="font-serif text-2xl"><span className="text-white">Saral</span><span className="text-[#f28a18]">Vigy@n</span></div><div className="text-[8px] text-white/70">Making Learning Simple</div></div></div><div className="flex flex-wrap justify-center gap-3 text-xs text-white/90"><Link href="/">Home</Link><span>|</span><Link href="/about">About Us</Link><span>|</span><Link href="/contact">Contact</Link><span>|</span><Link href="/privacy">Privacy</Link><span>|</span><Link href="/terms">Terms</Link></div><div className="text-center text-xs text-white/75">© 2026 TutorVerse. All rights reserved.</div></div></footer>}
