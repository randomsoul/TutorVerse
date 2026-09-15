import Link from 'next/link';
import { Header, Footer } from './components/site';

const cards=[
  ['01','Batch Tuition','Structured batches for school and competitive preparation.'],
  ['02','Home Tuition','Personally managed tutor support at home.'],
  ['03','Online Tuition','Live classes with experienced teachers.'],
  ['04','Student + Parent','Classes, calendar, reports and attendance in one place.'],
];

export default function Home(){return <><Header/><main>
<section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
  <div><div className="eyebrow">TutorVerse · Powered by Saral Vigyan</div><h1 className="mt-5 max-w-3xl text-5xl font-black tracking-[-.06em] text-slate-950 sm:text-6xl lg:text-7xl">Expert teaching.<br/><span className="text-[#087ee8]">Personally managed.</span></h1><p className="mt-6 max-w-2xl text-lg leading-7 text-slate-600">Tell us what you need. Saral Vigyan manages the next step.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/demo" className="rounded-2xl bg-[#087ee8] px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-100">Schedule a Free Demo Class →</Link><Link href="/signup" className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-800">Create Student Account</Link></div><p className="mt-4 text-sm text-slate-400">Mumbai · Navi Mumbai · Thane</p></div>
  <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50"><div className="rounded-[26px] bg-slate-950 p-7 text-white"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.2em] text-slate-400">Start here</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Free demo</span></div><h2 className="mt-8 text-3xl font-black tracking-tight">One simple request.</h2><div className="mt-6 grid gap-3"><div className="rounded-2xl bg-white/10 p-4"><b>1.</b> Tell us about the student</div><div className="rounded-2xl bg-white/10 p-4"><b>2.</b> Pick a convenient time</div><div className="rounded-2xl bg-white/10 p-4"><b>3.</b> Our team confirms the demo</div></div><Link href="/demo" className="mt-6 block rounded-2xl bg-white px-5 py-4 text-center font-black text-slate-950">Schedule your free demo</Link></div></div>
</section>
<section className="mx-auto grid max-w-7xl gap-4 px-5 pb-8 sm:grid-cols-2 lg:grid-cols-4">{cards.map(c=><article key={c[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-xs font-black text-[#087ee8]">{c[0]}</span><h3 className="mt-8 text-xl font-black tracking-tight">{c[1]}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{c[2]}</p></article>)}</section>
<section className="mx-auto max-w-7xl px-5 pb-16"><div className="rounded-[32px] bg-slate-950 p-8 text-white sm:p-10"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><h2 className="text-3xl font-black tracking-tight">Ready to begin?</h2><p className="mt-2 text-slate-400">Start with a free demo. No tutor selection is required at this stage.</p></div><Link href="/demo" className="rounded-2xl bg-white px-6 py-4 font-black text-slate-950">Schedule a Free Demo →</Link></div></div></section>
</main><Footer/></>}
