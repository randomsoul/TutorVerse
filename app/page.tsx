import Link from 'next/link';
import { Header, Footer } from './components/site';

const modes = [
  { title: 'Batch Tuition', text: 'Structured learning. Stronger concepts.', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=90', icon: '👥', tone: 'bg-[#dff5e8]', accent: 'text-[#168b50]' },
  { title: 'Home Tuition', text: 'One-to-one attention at your home.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=90', icon: '⌂', tone: 'bg-[#e1f2fb]', accent: 'text-[#1466b8]' },
  { title: 'Online Tuition', text: 'Learn from anywhere. Same great quality.', image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=90', icon: '▣', tone: 'bg-[#f5e5f8]', accent: 'text-[#7041c8]' },
  { title: 'For Students & Parents', text: 'Track progress and get regular updates.', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=90', icon: '👨‍👩‍👦', tone: 'bg-[#fff1d8]', accent: 'text-[#ec8314]' },
];
const exams = [
  ['⚛', 'JEE Main &', 'Advanced'], ['♧', 'NEET', ''], ['▥', 'MHT-CET', ''], ['⚙', 'BITSAT', ''], ['◆', 'NDA', ''],
  ['∠', 'NATA', ''], ['▤', 'RMS', ''], ['●', 'AISSEE', ''], ['🏆', 'IMO', ''], ['⚗', 'JSO', ''],
];
const trust = [
  ['👥', 'Trusted by Students', 'and Parents'], ['↗', 'Focus on Concept Clarity', 'and Real Understanding'], ['✓', 'Safe, Supportive', 'Learning Environment'], ['♥', 'Committed to', 'Long-term Success'],
];

export default function Home() {
 return <div className="min-h-screen bg-white text-[#18304a]"><Header/><main>
  <section className="border-b border-[#e9eeeb] bg-white">
   <div className="mx-auto grid max-w-[1180px] items-stretch lg:grid-cols-[.9fr_1.1fr]">
    <div className="flex flex-col justify-center px-6 py-10 sm:px-9 lg:py-12">
      <p className="text-[13px] font-extrabold uppercase tracking-[.12em] text-[#168b50]">Expert teaching • Personal attention</p>
      <h1 className="mt-4 text-[46px] font-black leading-[1.02] tracking-[-.045em] sm:text-[58px]">Better Teaching.<br/><span className="text-[#168b50]">Brighter Futures.</span></h1>
      <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#354a60]">Trusted home, online and batch tuition for school subjects and competitive exams.</p>
      <div className="mt-6 grid max-w-[500px] grid-cols-3 gap-2 border-y border-[#e8ecea] py-4">{[['👥','Experienced','Tutors'],['▟','Personalised','Learning'],['★','Proven','Results']].map(([i,a,b])=><div key={a} className="text-center"><div className="text-[27px]">{i}</div><div className="mt-1 text-xs font-extrabold leading-4 text-[#18304a]">{a}<br/>{b}</div></div>)}</div>
      <div className="mt-5 flex flex-wrap gap-3"><Link href="/demo" className="rounded-xl bg-[#199754] px-6 py-3.5 font-extrabold text-white shadow-md">Schedule a Free Demo Class&nbsp; →</Link><Link href="/tutors" className="rounded-xl border-2 border-[#199754] bg-white px-6 py-3 font-extrabold text-[#166e45]">Find a Tutor</Link></div>
      <div className="mt-5 text-sm font-bold text-[#4e6174]">📍 Serving Mumbai &nbsp;|&nbsp; Navi Mumbai &nbsp;|&nbsp; Thane &nbsp;|&nbsp; Online (All India)</div>
    </div>
    <div className="relative min-h-[390px] overflow-hidden lg:min-h-[500px]"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=90" alt="Student learning" className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent"/><div className="absolute right-6 top-7 hidden max-w-[190px] rounded-2xl bg-white/90 px-5 py-4 shadow-xl sm:block"><div className="text-lg font-black leading-tight">Good Students.<br/><span className="text-[#168b50]">Brighter Tomorrows.</span></div><div className="mt-2 h-1 w-16 rounded-full bg-[#f08a19]"/></div><div className="absolute bottom-5 right-5 rounded-2xl bg-[#183a5b] px-5 py-3 text-sm font-extrabold text-white shadow-xl">Learn • Practice • Grow</div></div>
   </div>
  </section>

  <section className="mx-auto max-w-[1180px] px-5 py-7 sm:px-8 sm:py-9"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{modes.map((m)=><Link href={m.title==='Home Tuition'?'/tutors':'/subjects'} key={m.title} className={`group overflow-hidden rounded-[22px] border border-white ${m.tone} shadow-[0_7px_22px_rgba(27,53,73,.08)]`}><div className="h-[158px] overflow-hidden sm:h-[166px]"><img src={m.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div><div className="px-5 pb-5 pt-0 text-center"><div className="mx-auto -mt-7 grid h-14 w-14 place-items-center rounded-full bg-white text-2xl shadow-md ring-4 ring-white/70">{m.icon}</div><h2 className={`mt-3 text-[19px] font-black ${m.accent}`}>{m.title}</h2><p className="mt-1 text-sm leading-5 text-[#263b4f]">{m.text}</p><div className={`mt-3 text-lg font-black ${m.accent}`}>→</div></div></Link>)}</div></section>

  <section className="relative overflow-hidden bg-[#eaf5ff] py-9 sm:py-11"><div className="absolute inset-0 opacity-40" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #ffffff 0 2px, transparent 3px), radial-gradient(circle at 80% 60%, #ffffff 0 2px, transparent 3px)',backgroundSize:'42px 42px'}}/><div className="relative mx-auto max-w-[1180px] px-5 sm:px-8"><div className="flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm">🏆</div><div><h2 className="text-3xl font-black tracking-[-.035em]">Prepare for <span className="text-[#168b50]">Top Competitive Exams</span></h2><p className="mt-1 text-sm font-semibold text-[#4d6277] sm:text-base">Guidance and subject support from experienced faculty.</p></div></div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">{exams.map(([icon,a,b])=><Link href="/subjects" key={a} className="group rounded-2xl border border-white/80 bg-white/85 px-2 py-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="text-3xl leading-none">{icon}</div><div className="mt-3 text-xs font-black leading-4">{a}{b&&<><br/>{b}</>}</div></Link>)}</div></div></section>

  <section className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10"><div className="grid overflow-hidden rounded-[26px] bg-[#eef7fc] md:grid-cols-[1.12fr_.88fr]"><div className="min-h-[245px] overflow-hidden md:min-h-[285px]"><img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=90" alt="Students learning together" className="h-full w-full object-cover"/></div><div className="flex flex-col justify-center px-7 py-8 sm:px-10"><h2 className="text-3xl font-black leading-tight text-[#183a5b]">Let’s Build<br/><span className="text-[#168b50]">A Brighter Tomorrow</span><br/>Together</h2><p className="mt-3 text-sm leading-6 text-[#53687c]">No obligation. Just a conversation about your child’s goals.</p><Link href="/demo" className="mt-5 inline-flex w-fit rounded-xl bg-[#199754] px-6 py-3.5 font-extrabold text-white shadow-md">Schedule a Free Demo Class&nbsp; →</Link></div></div></section>

  <section className="border-y border-[#e2e8e5] bg-white"><div className="mx-auto grid max-w-[1180px] grid-cols-2 sm:grid-cols-4">{trust.map(([icon,a,b],i)=><div key={a} className={`flex items-center gap-3 px-4 py-6 sm:px-6 ${i?'border-l border-[#e2e8e5]':''}`}><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f1f4f5] text-2xl">{icon}</div><div className="text-xs font-black leading-4 text-[#18304a]">{a}<br/>{b}</div></div>)}</div></section>
 </main><Footer/></div>
}
