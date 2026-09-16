'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const WHATSAPP = 'https://wa.me/919082271860';
type Message = { from: 'bot' | 'user'; text: string; fallback?: boolean };

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! I’m the TutorVerse AI assistant. Ask me about tutors, tuition, exams, classes or parent support.' },
  ]);

  useEffect(() => {
    let id = window.localStorage.getItem('tutorverse_ai_session');
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem('tutorverse_ai_session', id);
    }
    setSessionId(id);
    const f = () => setOpen(true);
    window.addEventListener('open-tutorverse-chat', f);
    return () => window.removeEventListener('open-tutorverse-chat', f);
  }, []);

  async function send(text = input) {
    const question = text.trim();
    if (!question || loading || !sessionId) return;
    setInput('');
    setMessages((current) => [...current, { from: 'user', text: question }]);
    setLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.from === 'bot' ? 'assistant' as const : 'user' as const,
        content: m.text,
      }));
      const { data, error } = await supabase.functions.invoke('tutorverse-ai-chat', {
        body: { session_id: sessionId, message: question, history },
      });
      if (error || !data) throw error || new Error('No response');
      setMessages((current) => [...current, {
        from: 'bot',
        text: data.answer || 'Please continue with our team on WhatsApp.',
        fallback: Boolean(data.escalate),
      }]);
    } catch {
      setMessages((current) => [...current, {
        from: 'bot',
        text: 'I’m having trouble answering right now. Please continue with our team on WhatsApp.',
        fallback: true,
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <div className="mb-3 w-[min(390px,calc(100vw-30px))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-slate-950 p-4 text-white">
            <b>TutorVerse AI Assistant</b>
            <p className="mt-1 text-xs text-slate-400">AI answers about TutorVerse • Human help on WhatsApp when needed</p>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`rounded-2xl p-3 text-sm ${m.from === 'bot' ? 'bg-slate-100 text-slate-700' : 'ml-8 bg-slate-950 text-white'}`}>{m.text}</div>
                {m.fallback && (
                  <a href={`${WHATSAPP}?text=${encodeURIComponent('Hi TutorVerse, I need help with this question: ' + messages[i - 1]?.text)}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex rounded-xl bg-[#25D366] px-4 py-2 text-sm font-extrabold text-white shadow-sm">Continue on WhatsApp →</a>
                )}
              </div>
            ))}
            {loading && <div className="rounded-2xl bg-slate-100 p-3 text-sm text-slate-500">Thinking…</div>}
          </div>
          <div className="flex gap-2 border-t border-slate-100 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} disabled={loading} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none disabled:bg-slate-50" placeholder="Ask TutorVerse..." />
            <button onClick={() => send()} disabled={loading} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{loading ? '…' : 'Send'}</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-full bg-[#087ee8] px-5 py-3 text-sm font-black text-white shadow-xl" aria-label="Open TutorVerse AI Assistant">✦ {open ? 'Close' : 'Ask TutorVerse AI'}</button>
    </div>
  );
}
