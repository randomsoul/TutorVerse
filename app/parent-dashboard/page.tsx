'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '../components/site';

const classes = [
  { id: 1, subject: 'Physics', tutor: 'Saral Vigyan · Physics Faculty', type: 'Home tuition', date: 'Today', time: '5:30 PM – 6:30 PM', status: 'Upcoming', place: 'Tutor location' },
  { id: 2, subject: 'Chemistry', tutor: 'Manisha · Saral Vigyan', type: 'Online', date: 'Tomorrow', time: '6:00 PM – 7:00 PM', status: 'Scheduled', place: 'Google Meet' },
  { id: 3, subject: 'Mathematics', tutor: 'Priya Nair', type: 'Batch', date: 'Friday', time: '7:00 PM – 8:00 PM', status: 'Scheduled', place: 'Saral Vigyan classroom' },
];

export default function ParentDashboard() {
  const [seen, setSeen] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return <><Header/><main className="mx-auto max-w-7xl px-5 py-10">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div><p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Parent dashboard</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Good evening, Mrs. Sharma.</h1><p className="mt-2 text-slate-500">Stay informed about Aarav&apos;s classes, attendance and progress.</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"><span className="text-slate-400">Student</span><br/><b>Aarav Sharma · Class XI</b></div>
    </div>

    <section className="mt-8 grid gap-4 md:grid-cols-4">
      {[['Next class','Today, 5:30 PM','Physics'],['Attendance','96%','This month'],['Classes attended','24','of 25'],['Pending review','1','Class report']].map(([a,b,c])=><div key={a} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{a}</p><p className="mt-2 text-2xl font-black">{b}</p><p className="mt-1 text-xs text-slate-400">{c}</p></div>)}
    </section>

    <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between"><div><h2 className="text-xl font-black">Next classes</h2><p className="mt-1 text-sm text-slate-500">The parent receives an alert 30 minutes before every class.</p></div><Link href="/student-dashboard" className="text-sm font-bold text-slate-700">Student view →</Link></div>
        <div className="mt-5 grid gap-3">{classes.map((c, i)=><div key={c.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><div className="flex flex-wrap items-center gap-2"><b>{c.subject}</b><span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-slate-500">{c.type}</span></div><p className="mt-1 text-sm text-slate-500">{c.tutor}</p><p className="mt-1 text-xs text-slate-400">{c.date} · {c.time} · {c.place}</p></div><span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600">{i === 0 ? 'Reminder at 5:00 PM' : 'Scheduled'}</span></div></div>)}</div>
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Attendance assurance</p><h2 className="mt-3 text-2xl font-black">Know when class starts and ends.</h2><p className="mt-3 text-sm leading-6 text-slate-300">For home tuition especially, the tutor confirms when the class begins and closes. TutorVerse then informs the parent.</p><div className="mt-5 grid gap-3 text-sm"><div className="rounded-2xl bg-white/10 p-4"><b>✓ Class begun</b><p className="mt-1 text-slate-300">Tutor confirms the student has reached and class has started.</p></div><div className="rounded-2xl bg-white/10 p-4"><b>✓ Class closed</b><p className="mt-1 text-slate-300">Parent receives attendance and class-closure intimation.</p></div></div></div>
    </section>

    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Latest class report</p><h2 className="mt-2 text-xl font-black">Physics · Newton&apos;s Laws</h2><p className="mt-1 text-sm text-slate-500">Completed today · 5:30 PM – 6:30 PM · Attended</p></div><label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm"><input type="checkbox" checked={seen} onChange={e=>setSeen(e.target.checked)} className="mt-1 h-4 w-4"/><span><b>I have seen this class report</b><br/><small className="text-slate-400">Parent acknowledgement</small></span></label></div>
      <div className="mt-5 grid gap-4 md:grid-cols-3"><div><p className="text-xs font-bold text-slate-400">Covered</p><p className="mt-1 text-sm">Newton&apos;s laws, free-body diagrams and applications.</p></div><div><p className="text-xs font-bold text-slate-400">Homework</p><p className="mt-1 text-sm">Problems 1–10 from the assigned worksheet.</p></div><div><p className="text-xs font-bold text-slate-400">Tutor remark</p><p className="mt-1 text-sm">Good participation. Needs more practice with force diagrams.</p></div></div>
    </section>

    <section className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Progress & results</h2><p className="mt-1 text-sm text-slate-500">Parents can see the same academic information available to the student.</p><div className="mt-5 grid gap-3"><div className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between"><b>Physics assessment</b><span className="font-black">42 / 50</span></div><p className="mt-1 text-xs text-slate-400">Correct: 44 · Incorrect: 4 · Unanswered: 2</p></div><div className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between"><b>Mathematics assessment</b><span className="font-black">46 / 50</span></div><p className="mt-1 text-xs text-slate-400">Result available in student dashboard</p></div></div></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Parent feedback to TutorVerse</h2><p className="mt-1 text-sm text-slate-500">Your remarks go to the Saral Vigyan/TutorVerse admin team, not directly to the tutor.</p><textarea value={comment} onChange={e=>setComment(e.target.value)} className="mt-4 min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none" placeholder="Comment on this subject, class, tutor or your child’s progress..."/><button onClick={()=>setSubmitted(true)} className="mt-3 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Send to admin</button>{submitted&&<p className="mt-3 text-sm font-semibold text-slate-600">✓ Feedback recorded for the TutorVerse admin team.</p>}</div>
    </section>
  </main><Footer/></>;
}
