'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Classroom = { id: string; name: string };
type Student = { id: string; name: string; grade: string | null };
type Material = { id: string; title: string; content_type: string | null; url: string | null; description: string | null; classroom_id: string | null; created_at: string | null };

export default function MaterialsPanel() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [type, setType] = useState<'pdf' | 'video'>('pdf');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [classroomId, setClassroomId] = useState('');
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function loadData() {
    setLoading(true);
    const [{ data: classroomRows }, { data: studentRows }, { data: materialRows }] = await Promise.all([
      supabase.from('classrooms').select('id,name').order('name'),
      supabase.from('students').select('id,grade,profile_id').order('created_at', { ascending: false }),
      supabase.from('content_items').select('id,title,content_type,url,description,classroom_id,created_at').order('created_at', { ascending: false }),
    ]);

    const profileIds = (studentRows || []).map((s: any) => s.profile_id).filter(Boolean);
    let profileMap = new Map<string, string>();
    if (profileIds.length) {
      const { data: profiles } = await supabase.from('profiles').select('id,full_name').in('id', profileIds);
      profileMap = new Map((profiles || []).map((p: any) => [p.id, p.full_name || 'Unnamed student']));
    }

    setClassrooms((classroomRows || []) as Classroom[]);
    setStudents((studentRows || []).map((s: any) => ({ id: s.id, grade: s.grade, name: profileMap.get(s.profile_id) || `Student ${s.id.slice(0, 8)}` })));
    setMaterials((materialRows || []) as Material[]);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  function toggleStudent(id: string) {
    setStudentIds(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  }

  async function saveMaterial(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Your admin session has expired. Please sign in again.');
      setSaving(false);
      return;
    }

    if (!classroomId && studentIds.length === 0) {
      setMessage('Attach this material to at least one classroom or student.');
      setSaving(false);
      return;
    }

    const { data: material, error } = await supabase.from('content_items').insert({
      title: title.trim(),
      content_type: type,
      url: url.trim(),
      description: description.trim() || null,
      classroom_id: classroomId || null,
      created_by: user.id,
    }).select('id').single();

    if (error || !material) {
      setMessage(error?.message || 'Could not save the material.');
      setSaving(false);
      return;
    }

    if (studentIds.length) {
      const { error: assignmentError } = await supabase.from('content_item_students').insert(
        studentIds.map(student_id => ({ content_item_id: material.id, student_id }))
      );
      if (assignmentError) {
        await supabase.from('content_items').delete().eq('id', material.id);
        setMessage(assignmentError.message);
        setSaving(false);
        return;
      }
    }

    setTitle('');
    setUrl('');
    setDescription('');
    setClassroomId('');
    setStudentIds([]);
    setMessage('✓ Material added and assigned successfully.');
    await loadData();
    setSaving(false);
  }

  return (
    <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Learning materials</p>
        <h3 className="mt-2 text-2xl font-black">Add material</h3>
        <p className="mt-2 text-sm text-slate-500">Add a PDF/notes link or a video link, then attach it to a classroom, an individual student, or both.</p>

        <form onSubmit={saveMaterial} className="mt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-2">
            <button type="button" onClick={() => setType('pdf')} className={`rounded-xl px-4 py-3 text-sm font-bold ${type === 'pdf' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>📄 PDF / Notes</button>
            <button type="button" onClick={() => setType('video')} className={`rounded-xl px-4 py-3 text-sm font-bold ${type === 'video' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>▶ Video Link</button>
          </div>

          <label className="text-sm font-bold">Title<input required value={title} onChange={e => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" placeholder={type === 'pdf' ? 'Current Electricity – Notes' : 'Current Electricity – Revision Video'} /></label>
          <label className="text-sm font-bold">{type === 'pdf' ? 'PDF / Notes link' : 'YouTube / video link'}<input required type="url" value={url} onChange={e => setUrl(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" placeholder={type === 'pdf' ? 'https://drive.google.com/...' : 'https://youtube.com/...'} /></label>
          <label className="text-sm font-bold">Description / instructions<textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" placeholder="Optional note for the student" /></label>

          <div>
            <p className="text-sm font-bold">Attach to classroom <span className="font-normal text-slate-400">(all students in that classroom)</span></p>
            <select value={classroomId} onChange={e => setClassroomId(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3">
              <option value="">— No classroom —</option>
              {classrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <p className="text-sm font-bold">Also attach to individual student <span className="font-normal text-slate-400">(optional)</span></p>
            <div className="mt-2 max-h-44 overflow-y-auto rounded-2xl border border-slate-200 p-2">
              {students.length === 0 ? <p className="p-3 text-sm text-slate-400">No student records yet.</p> : students.map(s => (
                <label key={s.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50">
                  <input type="checkbox" checked={studentIds.includes(s.id)} onChange={() => toggleStudent(s.id)} />
                  <span className="text-sm font-semibold">{s.name}</span><span className="text-xs text-slate-400">{s.grade || ''}</span>
                </label>
              ))}
            </div>
          </div>

          <button disabled={saving} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? 'Saving…' : 'Add material →'}</button>
          {message && <p className={`rounded-xl px-4 py-3 text-sm font-semibold ${message.startsWith('✓') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{message}</p>}
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">TutorVerse record</p><h3 className="mt-2 text-2xl font-black">Published materials</h3></div><button onClick={loadData} className="text-sm font-bold text-slate-500">Refresh</button></div>
        {loading ? <p className="mt-6 text-sm text-slate-400">Loading…</p> : materials.length === 0 ? <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">No materials have been added yet.</div> : <div className="mt-5 grid gap-3">
          {materials.map(m => <div key={m.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{m.content_type === 'video' ? 'Video' : 'PDF / Notes'}</span><p className="mt-1 font-black">{m.title}</p><p className="mt-1 break-all text-xs text-slate-500">{m.url}</p></div>{m.url && <a href={m.url} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold">Open</a>}</div></div>)}
        </div>}
      </div>
    </div>
  );
}
