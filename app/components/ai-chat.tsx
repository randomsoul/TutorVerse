'use client';

import { useEffect, useState } from 'react';

const WHATSAPP = 'https://wa.me/919082271860';

type Message = { from: 'bot' | 'user'; text: string; fallback?: boolean };

const answers: Record<string, string> = {
  tutor: 'Tell me the subject, class, board, city and whether you need batch, home or online tuition. TutorVerse can help you find the right tutor.',
  exams: 'TutorVerse supports preparation for JEE Main, JEE Advanced, NEET, MHT-CET, BITSAT, NDA, NATA, RMS, AISSEE, IMO and JSO.',
  parent: 'Parents can use TutorVerse to stay connected with the learning journey, including classes, attendance, reports and updates.',
  classes: 'TutorVerse supports batch, home and online tuition. Saral Vigyan manages the learning journey.',
};

function getReply(question: string) {
  const q = question.toLowerCase();
  if (q.includes('exam') || q.includes('jee') || q.includes('neet') || q.includes('cet') || q.includes('bitsat') || q.includes('nda') || q.includes('nata') || q.includes('rms') || q.includes('ais') || q.includes('imo') || q.includes('jso')) return answers.exams;
  if (q.includes('parent') || q.includes('attendance') || q.includes('report') || q.includes('result')) return answers.parent;
  if (q.includes('class') || q.includes('online') || q.includes('home') || q.includes('batch') || q.includes('tuition')) return answers.classes;
  if (q.includes('tutor') || q.includes('teacher') || q.includes('subject') || q.includes('board') || q.includes('grade') || q.includes('school')) return answers.tutor;
  return null;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! I’m the TutorVerse assistant. Ask me about tutors, tuition, exams, classes or parent support.' },
  ]);

  useEffect(() => {
    const f = () => setOpen(true);
    window.addEventListener('open-tutorverse-chat', f);
    return () => window.removeEventListener('open-tutorverse-chat', f);
  }, []);

  function send(text = input) {
    const question = text.trim();
    if (!question) return;

    const reply = getReply(question);
    const next: Message[] = [{ from: 'user', text: question }];

    if (reply) {
      next.push({ from: 'bot', text: reply });
    } else {
      next.push({
        from: 'bot',
        text: 'I’m not confident I have the right answer for that. Please continue with our team on WhatsApp and they can help you directly.',
        fallback: true,
      });
    }

    setMessages((current) => [...current, ...next]);
    setInput('');
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <div className="mb-3 w-[min(380px,calc(100vw-30px))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-slate-950 p-4 text-white">
            <b>TutorVerse Assistant</b>
            <p className="mt-1 text-xs text-slate-400">Quick answers about TutorVerse</p>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`rounded-2xl p-3 text-sm ${m.from === 'bot' ? 'bg-slate-100 text-slate-700' : 'ml-8 bg-slate-950 text-white'}`}>
                  {m.text}
                </div>
                {m.fallback && (
                  <a
                    href={`${WHATSAPP}?text=${encodeURIComponent('Hi TutorVerse, I need help with a question: ' + messages[i - 1]?.text)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex rounded-xl bg-[#25D366] px-4 py-2 text-sm font-extrabold text-white shadow-sm"
                  >
                    Continue on WhatsApp →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-slate-100 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
              placeholder="Ask TutorVerse..."
            />
            <button onClick={() => send()} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-[#087ee8] px-5 py-3 text-sm font-black text-white shadow-xl"
        aria-label="Open TutorVerse Assistant"
      >
        ✦ {open ? 'Close' : 'Ask TutorVerse'}
      </button>
    </div>
  );
}
