import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../components/site";

export const metadata: Metadata = {
  title: "JEE & NEET Tuition in India | Physics, Chemistry, Biology & Maths",
  description:
    "JEE and NEET tuition in India with subject-focused support in Physics, Chemistry, Mathematics and Biology, alongside school learning for Classes 11 and 12.",
  alternates: { canonical: "/jee-neet-tuition" },
};

const tracks = [
  ["JEE Main", "Physics, Chemistry and Mathematics"],
  ["JEE Advanced", "Deeper concepts and problem solving"],
  ["NEET", "Physics, Chemistry and Biology"],
  ["MHT-CET", "Maharashtra-focused competitive preparation"],
];

export default function CompetitiveTuitionPage() {
  return (
    <>
      <Header />
      <main className="page">
        <div className="page-intro">
          <div>
            <div className="eyebrow">Competitive exam tuition</div>
            <h1>JEE & NEET Tuition in India</h1>
            <p>
              Subject-focused tutoring for students preparing for JEE Main,
              JEE Advanced, NEET and MHT-CET. TutorVerse connects the exam goal
              with the relevant school subject and tutor profile.
            </p>
          </div>
        </div>

        <section>
          <div className="subject-grid big">
            {tracks.map(([exam, subjects]) => (
              <Link
                key={exam}
                className="subject-card"
                href={`/tutors?exam=${encodeURIComponent(exam)}`}
              >
                <h3>{exam}</h3>
                <p>{subjects}</p>
                <span className="arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="eyebrow">Subject-first preparation</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Build the right subject support around the exam</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subject) => (
              <Link key={subject} href={`/tutors?subject=${encodeURIComponent(subject)}`} className="rounded-2xl border border-slate-200 bg-white p-5 font-black hover:border-emerald-300">
                {subject} tuition →
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-blue-100 bg-blue-50 p-7">
          <h2 className="text-2xl font-black">For Classes 11 & 12</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Competitive preparation works alongside strong school fundamentals.
            TutorVerse is designed so parents and students can consider class,
            board, subject, exam and learning mode when looking for a tutor.
          </p>
          <Link href="/find-tutor" className="mt-5 inline-flex rounded-xl bg-[#199754] px-5 py-3 font-extrabold text-white">
            Find a tutor →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
