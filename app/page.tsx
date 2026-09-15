import Link from 'next/link';
import { Header, Footer } from './components/site';

const cards = [
  { title: 'Batch Tuition', text: 'Structured classes with focused teaching and regular academic support.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Home Tuition', text: 'One-to-one attention at home, coordinated around the student.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Online Tuition', text: 'Live classes through Google Meet, wherever the student is.', image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Students & Parents', text: 'Calendar, attendance, reports, homework and updates in one place.', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=88' },
];
const exams = ['JEE Main & Advanced','NEET','MHT-CET','BITSAT','NDA','NATA','RMS','AISSEE','IMO','JSO'];

export default function Home() {
 return <div className="min-h-screen bg-[#fbfcfa] text-[#18304a]"><Header/><main>
  <section className="mx-auto max-w-[1180px] px-5 pt-7 sm:px-8">
   <div className="relative overflow-hidden rounded-[30px] bg-[#edf8f0] px-7 py-9 sm:px-11 sm:py-11 lg:px-14">
    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#ffe8a8]/70 blur-2xl"/><div className="absolute bottom-[-100px] left-1/3 h-64 w-64 rounded-full bg-[#d5ecff]/70 blur-2xl"/>
    <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr]">
     <div><span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[.12em] text-[#178950] shadow-sm">TutorVerse · Powered by Saral Vigyan</span>
      <h1 className="mt-5 text-[44px] font-black leading-[.98] tracking-[-.055em] sm:text-[58px]">Better Teaching.<br/><span className="text-[#168b50]">Brighter Futures.</span></h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-[#40546a] sm:text-lg">Trusted home, online and batch tuition for school subjects and competitive exams.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Link href="/demo" className="rounded-xl bg-[#199754] px-6 py-3.5 font-extrabold text-white shadow-lg">Schedule a Free Demo Class →</Link><Link href="/tutors" className="rounded-xl border-2 border-[#199754] bg-white px-6 py-3.5 font-extrabold text-[#166e45]">Find a Tutor</Link></div>
      <div className="mt-5 text-sm font-bold text-[#526579]">📍 Mumbai &nbsp;•&nbsp; Navi Mumbai &nbsp;•&nbsp; Thane &nbsp;•&nbsp; Online (All India)</div>
     </div>
     <div className="relative hidden lg:block"><div className="overflow-hidden rounded-[26px] border-[7px] border-white shadow-[0_24px_55px_rgba(39,79,56,.18)]"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=88" alt="Student learning" className="h-[330px] w-full object-cover"/></div><div className="absolute -bottom-4 -left-5 rounded-2xl bg-white px-5 py-3 shadow-xl"><b className="text-sm text-[#168b50]">Simple. Personal. Managed.</b></div></div>
    </div>
   </div>
  </section>

  <section className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10"><div className="mb-5 flex items-end justify-between"><div><span className="text-xs font-black uppercase tracking-[.16em] text-[#168b50]">Choose your learning mode</span><h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Learning designed around you.</h2></div></div>
   <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cards.map((c,i)=><Link href={i===1?'/tutors':'/subjects'} key={c.title} className="group overflow-hidden rounded-[24px] border border-[#e0e8e3] bg-white shadow-[0_8px_28px_rgba(26,55,42,.06)]"><div className="overflow-hidden"><img src={c.image} alt="" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"/></div><div className="p-5"><div className="flex items-center justify-between"><h3 className="text-xl font-black">{c.title}</h3><span className="grid h-9 w-9 place-items-center rounded-full bg-[#eaf7ee] text-lg font-black text-[#168b50]">→</span></div><p className="mt-2 text-sm leading-6 text-[#617185]">{c.text}</p></div></Link>)}</div>
  </section>

  <section className="bg-[#eaf5ff] py-12 sm:py-14"><div className="mx-auto max-w-[1180px] px-5 sm:px-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><span className="text-xs font-black uppercase tracking-[.16em] text-[#2876c6]">Competitive preparation</span><h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Prepare for your next goal.</h2><p className="mt-2 text-[#53677b]">Experienced faculty and structured subject support.</p></div><Link href="/subjects" className="font-extrabold text-[#168b50]">View all subjects →</Link></div><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">{exams.map((e,i)=><Link href="/subjects" key={e} className="rounded-2xl border border-[#d8e8f4] bg-white px-3 py-5 text-center shadow-sm transition hover:-translate-y-1"><span className="text-2xl font-black text-[#168b50]">{String(i+1).padStart(2,'0')}</span><div className="mt-2 text-xs font-black leading-4">{e}</div></Link>)}</div></div></section>

  <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14"><div className="grid overflow-hidden rounded-[28px] bg-[#fff7df] md:grid-cols-[.82fr_1.18fr]"><div className="min-h-[250px] overflow-hidden md:min-h-[300px]"><img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=88" alt="Students in a classroom" className="h-full w-full object-cover"/></div><div className="flex flex-col justify-center px-7 py-9 sm:px-11"><span className="text-xs font-black uppercase tracking-[.16em] text-[#d98209]">A little support goes a long way</span><h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Let’s Build<br/><span className="text-[#168b50]">A Brighter Tomorrow</span><br/>Together</h2><p className="mt-3 max-w-md text-sm leading-6 text-[#667487]">Tell us what the student needs. Our team will understand the requirement and coordinate the next step.</p><Link href="/demo" className="mt-5 inline-flex w-fit rounded-xl bg-[#199754] px-6 py-3.5 font-extrabold text-white">Schedule a Free Demo Class →</Link></div></div></section>

  <section className="border-y border-[#e2e9e4] bg-white"><div className="mx-auto grid max-w-[1180px] grid-cols-2 sm:grid-cols-4">{[['01','Experienced Tutors'],['02','Personalised Learning'],['03','Regular Parent Updates'],['04','Managed Learning Journey']].map(([n,t],i)=><div key={n} className={`px-5 py-7 text-center ${i?'border-l border-[#e2e9e4]':''}`}><div className="text-2xl font-black text-[#168b50]">{n}</div><p className="mt-1 text-xs font-bold text-[#667487]">{t}</p></div>)}</div></section>
 </main><Footer/></div>
}
