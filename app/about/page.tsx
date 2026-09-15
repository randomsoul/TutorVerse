import Link from 'next/link';
import { Header, Footer } from '../components/site';

export default function AboutPage() {
  return <div className="min-h-screen bg-white text-[#18304a]"><Header/><main>
    <section className="border-b border-[#e2e8e5] bg-[#f7fbf8]">
      <div className="mx-auto max-w-[980px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[.16em] text-[#168b50]">About TutorVerse</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.045em] sm:text-5xl">Why Personal Attention Matters</h1>
          <p className="mx-auto mt-4 max-w-[760px] text-base leading-7 text-[#53677a]">Every student is different. Learning should be personal too.</p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[980px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="space-y-6 text-[17px] leading-8 text-[#334b61]">
        <p>At TutorVerse, we believe that every student is different—and learning should be personal too. In large, crowded classes, students can easily miss concepts, hesitate to ask questions, or move ahead without truly understanding the fundamentals. <strong className="font-black text-[#183a5b]">One-to-one tuition changes that equation.</strong> With focused personal attention, students can learn at their own pace, have their doubts addressed immediately, and build the conceptual clarity and confidence they need to perform at their best.</p>
        <p>TutorVerse connects students with <strong className="font-black text-[#183a5b]">qualified, committed tutors for personalised home and online learning</strong>, with structured preparation, regular assessments and performance tracking. Whether the goal is stronger school academics or focused preparation for <strong className="font-black text-[#183a5b]">JEE, NEET and other competitive examinations</strong>, our approach is simple: understand first, practise intelligently, improve consistently—and let stronger concepts lead to better results.</p>
      </div>

      <div className="mt-10 rounded-[24px] bg-[#eef7f1] px-6 py-8 text-center shadow-[0_8px_28px_rgba(26,55,42,.06)] sm:px-10">
        <h2 className="text-2xl font-black tracking-[-.03em] text-[#183a5b]">Experience the difference of personal attention.</h2>
        <p className="mx-auto mt-2 max-w-[650px] text-sm leading-6 text-[#53687c]">Talk to us about your child’s goals and find out how TutorVerse can help.</p>
        <Link href="/demo" className="mt-5 inline-flex rounded-xl bg-[#199754] px-7 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-[#168b50]">Schedule a Free Demo Class&nbsp; →</Link>
      </div>
    </section>
  </main><Footer/></div>;
}
