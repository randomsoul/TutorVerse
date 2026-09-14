'use client';
import { useState } from 'react';

const answers: Record<string,string> = {
  tutor:'Tell me the subject, class/grade, board, city and whether you need batch, home or online tuition. TutorVerse will route the request to Saral Vigyan for managed tutor selection.',
  exams:'We currently plan support for JEE Main, JEE Advanced, NEET, MHT-CET, BITSAT, NDA, NATA, RMS, AISSEE, IMO and JSO.',
  parent:'Parents get a 30-minute class reminder, tutor-confirmed class start and closure alerts, attendance, class reports, results and an acknowledgement option.',
  classes:'TutorVerse supports batch tuition, home tuition and online tuition. Saral Vigyan manages the classroom journey rather than publishing every registered tutor publicly.',
};

export default function AIChat(){
 const [open,setOpen]=useState(false); const [input,setInput]=useState(''); const [messages,setMessages]=useState<{from:'bot'|'user';text:string}[]>([{from:'bot',text:'Hi! I’m the TutorVerse assistant. Ask me about tutors, classes, competitive exams or parent support.'}]);
 function send(text=input){if(!text.trim())return; const q=text.toLowerCase(); let reply=answers.tutor; if(q.includes('exam')||q.includes('jee')||q.includes('neet')||q.includes('cet'))reply=answers.exams; else if(q.includes('parent')||q.includes('attendance'))reply=answers.parent; else if(q.includes('class')||q.includes('online')||q.includes('home'))reply=answers.classes; setMessages(m=>[...m,{from:'user',text},{from:'bot',text:reply}]);setInput('');}
 return <div className="fixed bottom-5 right-5 z-[60]">{open&&<div className="mb-3 w-[min(360px,calc(100vw-30px))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"><div className="bg-slate-950 p-4 text-white"><b>TutorVerse AI Assistant</b><p className="mt-1 text-xs text-slate-400">Instant guidance · production AI connector can be added later</p></div><div className="max-h-80 space-y-3 overflow-y-auto p-4">{messages.map((m,i)=><div key={i} className={`rounded-2xl p-3 text-sm ${m.from==='bot'?'bg-slate-100 text-slate-700':'ml-8 bg-slate-950 text-white'}`}>{m.text}</div>)}</div><div className="flex gap-2 border-t border-slate-100 p-3"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none" placeholder="Ask TutorVerse..."/><button onClick={()=>send()} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">Send</button></div></div>}<button onClick={()=>setOpen(v=>!v)} className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-2xl">✦ {open?'Close':'Ask TutorVerse'}</button></div>
}
