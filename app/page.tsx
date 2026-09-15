import Link from 'next/link';
import { Header, Footer } from './components/site';

const services = [
  ['01','Batch Tuition','Structured batches for school boards and competitive preparation.','bg-[#eefaf3] text-[#18864b]'],
  ['02','Home Tuition','Personally managed tutor support at home in Mumbai, Navi Mumbai and Thane.','bg-[#fff5e8] text-[#d97706]'],
  ['03','Online Tuition','Live focused classes with experienced teachers through Google Meet.','bg-[#eef5ff] text-[#2563eb]'],
  ['04','Student + Parent','Classes, calendar, reports, attendance and learning material in one place.','bg-[#f4efff] text-[#7651d6]'],
];
const exams = ['JEE Main','JEE Advanced','NEET','MHT-CET','BITSAT','NDA','NATA','RMS','AISSEE','IMO','JSO'];

export default function Home() {
  return <><Header /><main className="overflow-hidden bg-[#fbfdfb]">
    <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:pb-24 lg:pt-12">
      <div className="pointer-events-none absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-[#c8f2da]/60 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-10 h-[480px] w-[480px] rounded-full bg-[#ffe2a1]/60 blur-3xl" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[.13em] text-[#18864b] shadow-sm ring-1 ring-[#dcebe1]"><span className="h-2 w-2 rounded-full bg-[#24a65a]" /> TutorVerse · Powered by Saral Vigyan</div>
          <h1 className="mt-6 text-5xl font-black leading-[.96] tracking-[-.06em] text-[#17213a] sm:text-6xl lg:text-[74px]">Better teaching.<br /><span className="text-[#168c52]">Brighter futures.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#59657a] sm:text-xl">Expert teachers, personally managed by Saral Vigyan — for school students, competitive exams and one-to-one learning.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/demo" className="rounded-2xl bg-[#1e9b58] px-6 py-4 text-base font-black text-white shadow-[0_15px_32px_rgba(30,155,88,.25)] transition hover:bg-[#16834a]">Schedule a Free Demo Class →</Link><Link href="/tutors" className="rounded-2xl border-2 border-[#d8e6dc] bg-white px-6 py-4 text-base font-black text-[#23402e] transition hover:border-[#8cc9a4]">Find a Tutor</Link></div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-[#68758a]"><span>✓ Mumbai</span><span>✓ Navi Mumbai</span><span>✓ Thane</span><span>✓ Online</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="absolute -right-3 -top-8 z-20 hidden w-44 rotate-3 overflow-hidden rounded-[28px] border-8 border-white shadow-2xl sm:block"><img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=85" alt="Students learning together" className="aspect-[4/3] w-full object-cover" /></div>
          <div className="absolute -bottom-8 -left-5 z-20 hidden w-48 -rotate-3 overflow-hidden rounded-[28px] border-8 border-white shadow-2xl md:block"><img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=600&q=85" alt="Students studying together" className="aspect-[4/3] w-full object-cover" /></div>
          <div className="relative z-10 overflow-hidden rounded-[46px] bg-[#dff3e8] shadow-[0_32px_80px_rgba(43,83,62,.2)]">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85" alt="Student studying" className="h-[520px] w-full object-cover object-center sm:h-[590px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123d2b]/80 via-transparent to-[#123d2b]/5" />
            <div className="absolute left-5 top-5 rounded-2xl bg-[#ffbf55]/95 px-4 py-3 shadow-xl"><p className="text-[10px] font-black uppercase tracking-[.15em] text-[#6b4200]">Learning, not just lessons</p><p className="mt-1 text-sm font-black text-[#4d3100]">Curated around the student</p></div>
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#18864b]">Your learning journey</p><p className="mt-1 text-xl font-black text-[#17213a]">Simple. Personal. Managed.</p></div><span className="rounded-full bg-[#eaf8ef] px-3 py-2 text-xs font-black text-[#18864b]">Free demo</span></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-[#526076]"><span className="rounded-xl bg-[#f5f8f6] p-3">Tell us<br />your need</span><span className="rounded-xl bg-[#f5f8f6] p-3">Meet the<br />right teacher</span><span className="rounded-xl bg-[#f5f8f6] p-3">Track the<br />learning</span></div></div>
          </div>
          <div className="absolute -right-2 bottom-5 z-30 rounded-2xl bg-[#ffb547] px-5 py-4 font-black text-[#5c3900] shadow-xl sm:-right-6"><span className="mr-1 text-xl">★</span> Personal attention</div>
        </div>
      </div>
    </section>

    <section className="border-y border-[#e7eee9] bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">{[['01','Understand the need'],['02','Find the right support'],['03','Coordinate the class'],['04','Track the learning']].map(([n,t],i)=><div key={n} className={`p-6 text-center ${i%2?'border-l':''} sm:border-l ${i===0?'sm:border-l-0':''} border-[#e7eee9]`}><b className={`text-2xl ${i===1?'text-[#168c52]':i===2?'text-[#d97706]':i===3?'text-[#7651d6]':'text-[#17213a]'}`}>{n}</b><p className="mt-1 text-xs font-bold text-[#788496]">{t}</p></div>)}</div></section>

    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24"><div className="grid items-end gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><span className="eyebrow-green">How TutorVerse helps</span><h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#17213a] sm:text-5xl">Education with a human team behind it.</h2><p className="mt-5 max-w-xl leading-7 text-[#68758a]">TutorVerse is not just a directory. Saral Vigyan manages the learning journey, from the first request to classes, reports and parent updates.</p></div><div className="grid gap-4 sm:grid-cols-2">{services.map(([n,t,d,c])=><article key={n} className="rounded-[30px] border border-[#e5ebe7] bg-white p-6 shadow-[0_8px_30px_rgba(23,33,58,.05)] transition hover:-translate-y-1 hover:shadow-xl"><span className={`inline-flex rounded-xl px-3 py-2 text-xs font-black ${c}`}>{n}</span><h3 className="mt-6 text-xl font-black text-[#17213a]">{t}</h3><p className="mt-2 text-sm leading-6 text-[#6c7889]">{d}</p></article>)}</div></div></section>

    <section className="relative overflow-hidden bg-[#eff9f2]"><div className="absolute right-0 top-0 hidden h-full w-[38%] lg:block"><img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=85" alt="Students in a classroom" className="h-full w-full object-cover opacity-20" /></div><div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24"><div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><span className="eyebrow-green">School + competitive preparation</span><h2 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#17213a] sm:text-5xl">From schoolwork to entrance exams.</h2><p className="mt-5 max-w-xl leading-7 text-[#68758a]">Support across school boards and major competitive examinations, with the right teacher and a managed learning plan.</p><Link href="/subjects" className="mt-7 inline-flex rounded-2xl bg-[#1e9b58] px-5 py-3.5 font-black text-white shadow-lg">Explore subjects & exams →</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{exams.map((x,i)=><div key={x} className="rounded-2xl border border-[#dcebe0] bg-white/95 p-4 font-black text-[#34465a] shadow-sm"><span className="mr-2 text-xs text-[#1e9b58]">{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24"><div className="relative overflow-hidden rounded-[40px] bg-[#183d2b] px-7 py-12 text-white sm:px-12"><div className="absolute right-0 top-0 h-full w-1/2 opacity-20"><img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1000&q=80" alt="" className="h-full w-full object-cover" /></div><div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[.14em] text-[#bce9cd]">Ready when you are</span><h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Let’s find the right learning path.</h2><p className="mt-3 max-w-2xl text-[#c9d9cf]">Start with a free demo. Our team will understand the requirement and coordinate the next step.</p></div><Link href="/demo" className="relative shrink-0 rounded-2xl bg-[#4fca7b] px-6 py-4 text-center font-black text-[#103522] shadow-lg">Schedule a Free Demo →</Link></div></div></section>
  </main><Footer /></>;
}
