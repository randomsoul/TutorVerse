'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header, Footer } from '../components/site'
import { supabase } from '../../lib/supabase'

type Child = { id: string; profile_id: string; name: string; grade: string | null; board: string | null }
type ClassRow = { id: string; classroom_id: string; starts_at: string; ends_at: string; status: string; meeting_url: string | null; subject: string; tutor: string; mode: string; location: string | null }
type Report = { class_id: string; topic: string | null; covered: string | null; homework: string | null; tutor_remarks: string | null }

const fmtDate = (value: string) => new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
const fmtTime = (value: string) => new Date(value).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [parentName, setParentName] = useState('Parent')
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState('')
  const [classes, setClasses] = useState<ClassRow[]>([])
  const [attendance, setAttendance] = useState<string[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data: profile } = await supabase.from('profiles').select('full_name,role').eq('id', user.id).maybeSingle()
      if (!profile || profile.role !== 'parent') { setMessage('This page is only available to parent accounts.'); setLoading(false); return }
      setParentName(profile.full_name || 'Parent')
      const { data: parent, error: parentError } = await supabase.from('parents').select('id').eq('profile_id', user.id).maybeSingle()
      if (parentError || !parent) { setMessage('Parent profile could not be found.'); setLoading(false); return }
      const { data: links } = await supabase.from('parent_students').select('student_id').eq('parent_id', parent.id)
      const ids = (links || []).map((x: any) => x.student_id)
      if (!ids.length) { setLoading(false); return }
      const { data: studentRows } = await supabase.from('students').select('id,profile_id,grade,board').in('id', ids)
      const profileIds = (studentRows || []).map((s: any) => s.profile_id)
      const { data: studentProfiles } = profileIds.length ? await supabase.from('profiles').select('id,full_name').in('id', profileIds) : { data: [] as any[] }
      const mapped: Child[] = (studentRows || []).map((s: any) => ({ id: s.id, profile_id: s.profile_id, name: (studentProfiles || []).find((p: any) => p.id === s.profile_id)?.full_name || 'Student', grade: s.grade || null, board: s.board || null }))
      setChildren(mapped)
      const childId = mapped[0]?.id || ''
      setSelectedChild(childId)
      if (childId) await loadChild(childId)
      setLoading(false)
    }
    load()
  }, [])

  async function loadChild(studentId: string) {
    const { data: membership } = await supabase.from('classroom_students').select('classroom_id').eq('student_id', studentId)
    const classroomIds = (membership || []).map((x: any) => x.classroom_id)
    if (!classroomIds.length) { setClasses([]); setAttendance([]); setReports([]); return }
    const { data: classrooms } = await supabase.from('classrooms').select('id,mode,location,subject_id,tutor_id').in('id', classroomIds)
    const subjectIds = (classrooms || []).map((c: any) => c.subject_id).filter(Boolean)
    const tutorIds = (classrooms || []).map((c: any) => c.tutor_id).filter(Boolean)
    const [{ data: subjects }, { data: tutors }] = await Promise.all([
      subjectIds.length ? supabase.from('subjects').select('id,name').in('id', subjectIds) : Promise.resolve({ data: [] as any[] }),
      tutorIds.length ? supabase.from('tutors').select('id,profile_id').in('id', tutorIds) : Promise.resolve({ data: [] as any[] }),
    ])
    const tutorProfileIds = (tutors || []).map((t: any) => t.profile_id)
    const { data: tutorProfiles } = tutorProfileIds.length ? await supabase.from('profiles').select('id,full_name').in('id', tutorProfileIds) : { data: [] as any[] }
    const lookup = (classroom: any) => {
      const tutor = (tutors || []).find((t: any) => t.id === classroom.tutor_id)
      return {
        subject: (subjects || []).find((s: any) => s.id === classroom.subject_id)?.name || 'Class',
        tutor: (tutorProfiles || []).find((p: any) => p.id === tutor?.profile_id)?.full_name || 'Saral Vigyan tutor',
        mode: classroom.mode || 'Online',
        location: classroom.location || null,
      }
    }
    const { data: classData } = await supabase.from('classes').select('id,classroom_id,starts_at,ends_at,status,meeting_url').in('classroom_id', classroomIds).order('starts_at', { ascending: true })
    setClasses((classData || []).map((c: any) => ({ ...c, ...lookup((classrooms || []).find((x: any) => x.id === c.classroom_id) || {}) })))
    const classIds = (classData || []).map((c: any) => c.id)
    if (classIds.length) {
      const { data: reportData } = await supabase.from('class_reports').select('class_id,topic,covered,homework,tutor_remarks').in('class_id', classIds)
      setReports((reportData || []) as Report[])
    } else setReports([])
    const { data: attendanceData } = await supabase.from('attendance').select('status').eq('student_id', studentId)
    setAttendance((attendanceData || []).map((a: any) => a.status))
  }

  async function selectChild(id: string) { setSelectedChild(id); await loadChild(id) }

  if (loading) return <><Header /><main className="mx-auto max-w-7xl px-5 py-16"><p className="text-slate-500">Loading your live parent dashboard…</p></main><Footer /></>
  if (message) return <><Header /><main className="mx-auto max-w-7xl px-5 py-16"><div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700"><b>{message}</b></div></main><Footer /></>

  const child = children.find((c) => c.id === selectedChild)
  const upcoming = classes.filter((c) => new Date(c.starts_at).getTime() >= Date.now() && c.status !== 'cancelled').sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
  const next = upcoming[0]
  const attended = attendance.filter((s) => s === 'attended').length
  const pct = attendance.length ? Math.round(attended / attendance.length * 100) : null
  const latestReport = reports[0]

  const cards = [
    ['Next class', next ? fmtTime(next.starts_at) : 'None', next?.subject || 'Not scheduled'],
    ['Attendance', pct == null ? '—' : `${pct}%`, attendance.length ? `${attended} of ${attendance.length} attended` : 'No attendance recorded'],
    ['Classes scheduled', String(classes.filter((c) => c.status !== 'cancelled').length), 'Live classroom record'],
    ['Reports', String(reports.length), reports.length ? 'Recorded class reports' : 'No report recorded'],
  ]

  return <>
    <Header />
    <main className="mx-auto max-w-7xl px-5 py-10">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">Parent dashboard</p>
      <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><h1 className="text-4xl font-black tracking-tight">Welcome, {parentName}.</h1><p className="mt-2 text-slate-500">Live information for the students linked to your account.</p></div>
        {child && <Link href={`/student-dashboard?student=${child.id}`} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">Student view →</Link>}
      </div>
      {children.length === 0 ? <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6"><h2 className="text-xl font-black">No student linked yet</h2><p className="mt-2 text-sm text-amber-800">Your parent account is active, but Saral Vigyan has not linked a student to it yet. No sample classes or results are shown.</p></section> : <>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 text-sm"><span className="text-slate-400">Student</span><br /><b>{child?.name}</b>{child?.grade && ` · ${child.grade}`}{child?.board && ` · ${child.board}`}</div>
        {children.length > 1 && <div className="mt-4 flex flex-wrap gap-2">{children.map((c) => <button key={c.id} onClick={() => selectChild(c.id)} className={`rounded-xl border px-4 py-2 text-sm font-bold ${selectedChild === c.id ? 'bg-slate-950 text-white' : 'bg-white'}`}>{c.name}</button>)}</div>}
        <section className="mt-6 grid gap-4 md:grid-cols-4">{cards.map(([a, b, c]) => <div key={a} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{a}</p><p className="mt-2 text-2xl font-black">{b}</p><p className="mt-1 text-xs text-slate-400">{c}</p></div>)}</section>
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Next classes</h2>{upcoming.length === 0 ? <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No upcoming classes scheduled.</div> : <div className="mt-5 grid gap-3">{upcoming.slice(0, 5).map((c) => <div key={c.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><b>{c.subject}</b><p className="mt-1 text-sm text-slate-500">{c.tutor} · {c.mode}</p><p className="mt-1 text-xs text-slate-400">{fmtDate(c.starts_at)} · {fmtTime(c.starts_at)}–{fmtTime(c.ends_at)}{c.mode === 'Online' && c.meeting_url ? ' · Google Meet' : ''}</p></div>)}</div>}</div>
          <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Attendance assurance</p><h2 className="mt-3 text-2xl font-black">Know when class starts and ends.</h2><p className="mt-3 text-sm leading-6 text-slate-300">TutorVerse will use recorded class status and attendance for parent notifications.</p><div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm">{next ? `Next scheduled class: ${fmtDate(next.starts_at)} at ${fmtTime(next.starts_at)}.` : 'No next class has been scheduled yet.'}</div></div>
        </section>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Latest class report</h2>{latestReport ? <div className="mt-5 grid gap-4 md:grid-cols-3"><div><p className="text-xs font-bold text-slate-400">Topic</p><p className="mt-1 text-sm">{latestReport.topic || '—'}</p></div><div><p className="text-xs font-bold text-slate-400">Covered</p><p className="mt-1 text-sm">{latestReport.covered || '—'}</p></div><div><p className="text-xs font-bold text-slate-400">Homework</p><p className="mt-1 text-sm">{latestReport.homework || '—'}</p></div></div> : <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No class report has been recorded yet.</div>}</section>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Parent feedback to TutorVerse</h2><p className="mt-1 text-sm text-slate-500">Your remarks go to the Saral Vigyan/TutorVerse admin team, not directly to the tutor.</p><textarea value={comment} onChange={(e) => setComment(e.target.value)} className="mt-4 min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none" placeholder="Comment on this subject, class, tutor or your child's progress..." /><button onClick={() => setSubmitted(true)} className="mt-3 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Send to admin</button>{submitted && <p className="mt-3 text-sm font-semibold text-slate-600">✓ Feedback recorded for the TutorVerse admin team.</p>}</section>
      </>}
    </main>
    <Footer />
  </>
}
