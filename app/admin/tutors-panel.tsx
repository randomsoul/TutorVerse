'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Tutor {
  id: string;
  profile_id: string;
  approved: boolean;
  experience_years: number | null;
  bio: string | null;
  city: string | null;
  modes: string[] | null;
  created_at: string;
  profile?: { full_name: string | null; phone: string | null } | null;
}

export default function TutorsPanel() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  async function loadTutors() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tutors')
      .select('id, profile_id, approved, experience_years, bio, city, modes, created_at, profile:profiles(full_name, phone)')
      .order('created_at', { ascending: false });

    if (error) {
      setMessage(error.message);
      setTutors([]);
    } else {
      setTutors((data || []) as unknown as Tutor[]);
      setMessage('');
    }
    setLoading(false);
  }

  useEffect(() => { loadTutors(); }, []);

  return (
    <div className="mt-7">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black">Tutor directory</h3>
          <p className="mt-1 text-sm text-slate-500">All tutors created in TutorVerse, including tutors added directly by the main Admin.</p>
        </div>
        <button onClick={loadTutors} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold hover:bg-slate-50">Refresh</button>
      </div>
      {message && <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{message}</div>}
      <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {loading ? <div className="p-8 text-center text-sm text-slate-500">Loading tutors…</div> : tutors.length === 0 ? <div className="p-8 text-center"><p className="font-bold">No tutors found.</p></div> : (
          <div className="overflow-x-auto"><table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">Tutor</th><th className="px-5 py-4">Phone / WhatsApp</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Experience</th><th className="px-5 py-4">Mode</th><th className="px-5 py-4">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{tutors.map(tutor => { const profile=tutor.profile; return <tr key={tutor.id} className="hover:bg-slate-50/70">
              <td className="px-5 py-4"><p className="font-black text-slate-900">{profile?.full_name || 'Unnamed tutor'}</p><p className="mt-1 text-xs text-slate-400">Added {new Date(tutor.created_at).toLocaleDateString()}</p></td>
              <td className="px-5 py-4 text-slate-600">{profile?.phone || '—'}</td><td className="px-5 py-4 text-slate-600">{tutor.city || '—'}</td><td className="px-5 py-4 text-slate-600">{tutor.experience_years != null ? `${tutor.experience_years} years` : '—'}</td><td className="px-5 py-4 text-slate-600">{tutor.modes?.length ? tutor.modes.join(', ') : '—'}</td>
              <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${tutor.approved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{tutor.approved ? 'Approved' : 'Pending approval'}</span></td>
            </tr>})}</tbody>
          </table></div>
        )}
      </div>
    </div>
  );
}
