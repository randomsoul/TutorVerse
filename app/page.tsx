import Link from 'next/link';
import { Header, Footer } from './components/site';

const services = [
  { title: 'Batch Tuition', sub: 'Structured learning. Stronger results.', icon: '👥', tone: 'bg-emerald-50 text-emerald-700', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=85' },
  { title: 'Home Tuition', sub: 'One-to-one attention at your home.', icon: '⌂', tone: 'bg-blue-50 text-blue-700', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=85' },
  { title: 'Online Tuition', sub: 'Learn from anywhere. Same great quality.', icon: '▣', tone: 'bg-purple-50 text-purple-700', image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=700&q=85' },
  { title: 'For Students & Parents', sub: 'Track progress, get regular updates.', icon: '👥', tone: 'bg-amber-50 text-amber-700', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=85' },
];
const exams = ['JEE Main & Advanced','NEET','MHT-CET','BITSAT','NDA','NATA','RMS','AISSEE','IMO','JSO'];
const examIcons = ['⚛','♧','▥','⚙','◆','◢','▤','●','🏆','⚗'];

export default function Home() {
  return <div className="min-h-screen bg-white text-[#10243a]"><Header /><main>
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,#e9f7ef_0,transparent_42%)]" />
      <div className="relative mx-auto grid max-w-[1280px] items-center lg:grid-cols-[47%_53%]">
        <div className="px-7 py-12 sm:px-10 lg:py-14 lg:pr-4">
          <h1 className="text-[48px] font-extrabold leading-[1.03] tracking-[-.045em] sm:text-[60px] lg:text-[58px] xl:text-[64px]">Better Teaching.<br /><span className="text-[#168b50]">Brighter Futures.</span></h1>
          <p className="mt-5 max-w-[610px] text-[18px] leading-7 text-[#203247] sm:text-[20px]">Trusted home, online and batch tuition for school subjects and competitive exams.</p>
          <div className="mt-7 grid max-w-[560px] grid-cols-3 border-y border-[#e8edf0] py-4 text-center">
            <div className="border-r border-[#e8edf0]"><div className="text-3xl text-[#f59a16]">♟</div><b className="text-sm">Experienced<br />Tutors</b></div>
            <div className="border-r border-[#e8edf0]"><div className="text-3xl text-[#2779cf]">↗</div><b className="text-sm">Personalised<br />Learning</b></div>
            <div><div className="text-3xl text-[#169554]">★</div><b className="text-sm">Proven<br />Results</b></div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/demo" className="rounded-xl bg-[#199754] px-7 py-4 font-extrabold text-white shadow-lg shadow-green-100">Schedule a Free Demo Class&nbsp; →</Link><Link href="/tutors" className="rounded-xl border-2 border-[#199754] bg-white px-7 py-4 font-extrabold text-[#166e45]">Find a Tutor</Link></div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-[#203247]"><span>📍 Serving Mumbai</span><span>|</span><span>Navi Mumbai</span><span>|</span><span>Thane</span><span>|</span><span>Online (All India)</span></div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden lg:min-h-[565px]">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=88" alt="Student studying" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/5 to-transparent lg:from-white/100 lg:via-white/10" />
          <div className="absolute right-5 top-6 rounded-2xl bg-[#fff8cf]/95 px-4 py-3 shadow-md"><p className="text-xs font-black text-[#274056]">Good Students</p><p className="text-xs font-black text-[#168b50]">Brighter Tomorrows</p></div>
          <div className="absolute bottom-5 left-5 right-5 hidden rounded-2xl bg-white/92 p-4 shadow-xl backdrop-blur-sm sm:block lg:left-10 lg:right-10"><b className="text-xs uppercase tracking-wider text-[#168b50]">Your learning journey</b><p className="mt-1 font-extrabold">Simple. Personal. Managed.</p></div>
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s)=><Link href={s.title==='Home Tuition'?'/tutors':'/subjects'} key={s.title} className={`group overflow-hidden rounded-2xl p-2 shadow-sm ring-1 ring-black/5 ${s.tone.split(' ')[0]}`}><img src={s.image} alt="" className="h-36 w-full rounded-xl object-cover transition group-hover:scale-[1.02]" /><div className="px-4 pb-4 pt-3"><span className={`inline-grid h-10 w-10 place-items-center rounded-full bg-white text-xl shadow ${s.tone.split(' ')[1]}`}>{s.icon}</span><h2 className="mt-3 text-xl font-extrabold text-[#10243a]">{s.title}</h2><p className="mt-1 text-sm leading-5 text-[#203247]">{s.sub}</p><span className="mt-2 inline-block text-xl">→</span></div></Link>)}
    </section>

    <section className="relative overflow-hidden bg-[#eef8ff] px-6 py-12 sm:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#dff2ff,transparent_40%)]" />
      <div className="relative mx-auto max-w-[1220px]">
        <div className="flex items-start gap-4"><div className="text-5xl">🏆</div><div><h2 className="text-3xl font-extrabold tracking-[-.03em] sm:text-4xl">Prepare for <span className="text-[#168b50]">Top Competitive Exams</span></h2><p className="mt-2 text-lg">Guidance and subject support from experienced faculty.</p></div></div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">{exams.map((e,i)=><Link href="/subjects" key={e} className="rounded-xl bg-white px-2 py-4 text-center shadow-sm ring-1 ring-[#dfeaf2] transition hover:-translate-y-1"><div className="text-2xl">{examIcons[i]}</div><div className="mt-2 text-xs font-extrabold leading-4">{e}</div></Link>)}</div>
      </div>
    </section>

    <section className="relative overflow-hidden border-y border-[#e4ebef]">
      <div className="absolute inset-0 bg-[#f7fbfd]" />
      <div className="relative mx-auto grid max-w-[1280px] items-center lg:grid-cols-[43%_57%]">
        <div className="h-[250px] bg-cover bg-center lg:h-[290px]" style={{backgroundImage:"url('https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1000&q=85')"}} />
        <div className="px-7 py-10 sm:px-12"><h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">Let’s Build<br /><span className="text-[#168b50]">A Brighter Tomorrow</span><br />Together</h2><p className="mt-3 max-w-md text-sm text-[#526273]">No obligation. Just a conversation about your child’s goals.</p><Link href="/demo" className="mt-5 inline-flex rounded-xl bg-[#199754] px-6 py-3.5 font-extrabold text-white">Schedule a Free Demo Class&nbsp; →</Link></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-7 py-8 sm:grid-cols-4 sm:py-10">
      {[['♣','Trusted by Students','and Parents'],['↗','Focus on Concept Clarity','and Real Understanding'],['◆','Safe, Supportive','Learning Environment'],['♥','Committed to','Long-term Success']].map(([i,a,b])=><div key={a} className="flex items-start gap-3"><span className="text-3xl text-[#168b50]">{i}</span><div className="text-sm font-bold">{a}<br />{b}</div></div>)}
    </section>
  </main><Footer /></div>;
}
