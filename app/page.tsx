import Link from 'next/link';
import { Header, Footer } from './components/site';
import AIChat from './components/ai-chat';

const modes = [
  { title: 'Batch Tuition', text: 'Structured learning. Stronger concepts.', image: 'https://images.unsplash.com/photo-1629306262232-1f854b4b0b13?auto=format&fit=crop&w=1400&q=90', icon: 'B', tone: 'bg-[#dff5e8]', accent: 'text-[#168b50]' },
  { title: 'Home Tuition', text: 'One-to-one attention at your home.', image: 'https://pagemaker.b-cdn.net/media/131487/1024x1024.webp', icon: 'H', tone: 'bg-[#e1f2fb]', accent: 'text-[#1466b8]' },
  { title: 'Online Tuition', text: 'Learn from anywhere. Same great quality.', image: 'https://www.hindustantimes.com/ht-img/img/2025/11/06/cropped/1-1/Best_laptops_for_school_students_1762418505554_1762418505672.png', icon: 'O', tone: 'bg-[#f5e5f8]', accent: 'text-[#7041c8]' },
  { title: 'For Students & Parents', text: 'Track progress and get regular updates.', image: 'https://static.wixstatic.com/media/f2f963_4b85c173ab654979944367386537ad15~mv2.png/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/f2f963_4b85c173ab654979944367386537ad15~mv2.png', icon: 'P', tone: 'bg-[#fff1d8]', accent: 'text-[#ec8314]' },
];

const exams = [
  ['JEE', 'Main + Advanced', '⚙', 'bg-[#dff5e8]', 'text-[#168b50]'],
  ['NEET', 'Medical', '🩺', 'bg-[#e1f2fb]', 'text-[#1466b8]'],
  ['CET', 'MHT-CET', '🪜', 'bg-[#fff1d8]', 'text-[#e37b0b]'],
  ['BITS', 'BITSAT', '▣', 'bg-[#f5e5f8]', 'text-[#7041c8]'],
  ['NDA', 'Defence', '★', 'bg-[#e8f1e9]', 'text-[#315d42]'],
  ['NATA', 'Architecture', '⌂', 'bg-[#e8f0fb]', 'text-[#426ba6]'],
  ['RMS', 'Rashtriya Military', '🎖', 'bg-[#fff0df]', 'text-[#c76d10]'],
  ['AIS', 'AISSEE', '▰', 'bg-[#e8f5f3]', 'text-[#178476]'],
  ['IMO', 'Olympiad', '🏅', 'bg-[#f3ebff]', 'text-[#7549b7]'],
  ['JSO', 'Junior Science', '⚗', 'bg-[#edf5e8]', 'text-[#4f8a35]'],
];

const trust = [
  ['01', 'Trusted by Students', 'and Parents'],
  ['02', 'Focus on Concept Clarity', 'and Real Understanding'],
  ['03', 'Safe, Supportive', 'Learning Environment'],
  ['04', 'Committed to', 'Long-term Success'],
];

export default function Home() {
  return <div className="min-h-screen bg-white text-[#18304a]"><Header/><main>
    <section className="border-b border-[#e9eeeb] bg-[#f7fbf8]">
      <div className="mx-auto max-w-[1180px] px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid items-center overflow-hidden rounded-[28px] border border-[#dfece4] bg-white shadow-[0_10px_35px_rgba(27,67,48,.07)] lg:grid-cols-[1.05fr_.95fr]">
          <div className="px-6 py-8 sm:px-9 sm:py-9 lg:py-10">
            <div className="inline-flex rounded-full bg-[#e3f6e9] px-4 py-2 text-[11px] font-black uppercase tracking-[.13em] text-[#168b50]">TutorVerse • Powered by Saral Vigyan</div>
            <p className="mt-5 text-[13px] font-extrabold uppercase tracking-[.12em] text-[#f07b16]">Expert teaching • Personal attention</p>
            <h1 className="mt-3 text-[40px] font-black leading-[1.03] tracking-[-.045em] sm:text-[50px]">Better Teaching.<br/><span className="text-[#168b50]">Brighter Futures.</span></h1>
            <p className="mt-4 max-w-[570px] text-[16px] leading-7 text-[#40556a]">Trusted home, online and batch tuition for school subjects and competitive exams.</p>
            <div className="mt-5 flex flex-wrap gap-3"><Link href="/demo" className="rounded-xl bg-[#199754] px-5 py-3.5 text-sm font-extrabold text-white shadow-md">Schedule a Free Demo Class&nbsp; →</Link><Link href="/tutors" className="rounded-xl border-2 border-[#199754] bg-white px-5 py-3 font-extrabold text-[#166e45]">Find a Tutor</Link></div>
            <div className="mt-4 text-sm font-bold text-[#53677a]">Serving Mumbai &nbsp;|&nbsp; Navi Mumbai &nbsp;|&nbsp; Thane &nbsp;|&nbsp; Online (All India)</div>
          </div>
          <div className="relative h-[270px] overflow-hidden sm:h-[310px] lg:h-[360px]"><img src="https://akgeducation.com/hero.png" alt="Lady tutor teaching one student at home" className="h-full w-full object-cover"/><div className="absolute left-5 top-5 rounded-2xl bg-white/95 px-5 py-4 shadow-xl"><div className="text-base font-black leading-tight text-[#183a5b]">Learn.<br/><span className="text-[#168b50]">Practice. Grow.</span></div><div className="mt-2 h-1 w-12 rounded-full bg-[#f08a19]"/></div><div className="absolute bottom-5 right-5 rounded-2xl bg-[#183a5b] px-4 py-3 text-sm font-extrabold text-white shadow-xl">Personal. Simple. Managed.</div></div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10">
      <div className="mb-6"><p className="text-xs font-black uppercase tracking-[.16em] text-[#168b50]">Choose your learning mode</p><h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Learning designed around you.</h2></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{modes.map((m)=><Link href={m.title==='Home Tuition'?'/tutors':'/subjects'} key={m.title} className={`group overflow-hidden rounded-[24px] border border-[#e2e9e5] ${m.tone} shadow-[0_8px_28px_rgba(26,55,42,.07)]`}><div className="h-[205px] overflow-hidden sm:h-[220px]"><img src={m.image} alt={m.title==='Batch Tuition'?'Students learning in a classroom batch':m.title==='Home Tuition'?'Lady tutor teaching one student in an upscale home':m.title==='Online Tuition'?'Student attending one-to-one online tuition at home':'Parents supporting their child’s learning at home'} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div><div className="px-5 pb-5 pt-0 text-center"><div className={`mx-auto -mt-7 grid h-14 w-14 place-items-center rounded-full bg-white text-xl font-black shadow-md ring-4 ring-white/80 ${m.accent}`}>{m.icon}</div><h3 className={`mt-3 text-[19px] font-black ${m.accent}`}>{m.title}</h3><p className="mt-1 text-sm leading-5 text-[#263b4f]">{m.text}</p><div className={`mt-3 text-lg font-black ${m.accent}`}>→</div></div></Link>)}</div>
    </section>

    <section className="bg-[#eaf5ff] py-9 sm:py-11"><div className="mx-auto max-w-[1180px] px-5 sm:px-8">
      <div className="flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-xl font-black text-[#168b50] shadow-sm">GO</div><div><p className="text-xs font-black uppercase tracking-[.15em] text-[#2876c6]">Competitive preparation</p><h2 className="mt-1 text-3xl font-black tracking-[-.035em]">Prepare for <span className="text-[#168b50]">Top Competitive Exams</span></h2><p className="mt-1 text-sm font-semibold text-[#4d6277] sm:text-base">Guidance and subject support from experienced faculty.</p></div></div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">{exams.map(([name,sub,icon,tone,accent])=><Link href="/subjects" key={name} className="group rounded-2xl border border-white/90 bg-white/90 p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${tone} ${accent} text-xl font-black`} aria-hidden="true">{icon}</div><div className="mt-3 text-xs font-black leading-4">{sub}</div></Link>)}</div>
    </div></section>

    <section className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 sm:py-10"><div className="grid overflow-hidden rounded-[26px] bg-[#eef7fc] shadow-[0_8px_28px_rgba(26,55,73,.06)] md:grid-cols-[1.08fr_.92fr]"><div className="min-h-[250px] overflow-hidden md:min-h-[285px]"><img src="https://cdn5.planetspark.in/media/large_u1228994638_A_fair_young_Indian_child_around_10_years_old_stu_e5b25308_3088_4cce_b3c4_9d2225016496_1_d45af394a0.png" alt="One-to-one parent-supported learning at home" className="h-full w-full object-cover"/></div><div className="flex flex-col justify-center px-7 py-8 sm:px-10"><p className="text-xs font-black uppercase tracking-[.15em] text-[#168b50]">A managed learning experience</p><h2 className="mt-2 text-3xl font-black leading-tight text-[#183a5b]">Let’s Build<br/><span className="text-[#168b50]">A Brighter Tomorrow</span><br/>Together</h2><p className="mt-3 text-sm leading-6 text-[#53687c]">No obligation. Just a conversation about your child’s goals.</p><Link href="/demo" className="mt-5 inline-flex w-fit rounded-xl bg-[#199754] px-6 py-3.5 font-extrabold text-white shadow-md">Schedule a Free Demo Class&nbsp; →</Link></div></div></section>

    <section className="border-y border-[#e2e8e5] bg-white"><div className="mx-auto grid max-w-[1180px] grid-cols-2 sm:grid-cols-4">{trust.map(([n,a,b],i)=><div key={a} className={`flex items-center gap-3 px-4 py-6 sm:px-6 ${i?'border-l border-[#e2e8e5]':''}`}><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf4ef] text-xs font-black text-[#168b50]">{n}</div><div className="text-xs font-black leading-4 text-[#18304a]">{a}<br/>{b}</div></div>)}</div></section>
  </main><AIChat/><Footer/></div>;
}
