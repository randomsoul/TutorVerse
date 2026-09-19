import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../components/site";

export const metadata: Metadata = {
  title: "School Tuition in India | Home, Online & Batch Tuition",
  description:
    "School tuition for students across India, with support in Mathematics, Science, Physics, Chemistry, Biology and other subjects through home, online and batch tuition.",
  alternates: { canonical: "/tuition" },
};

const subjects = ["Mathematics", "Science", "Physics", "Chemistry", "Biology"];
const boards = ["CBSE", "ICSE", "Maharashtra State Board", "IB", "IGCSE"];

export default function TuitionPage() {
  return (
    <>
      <Header />
      <main className="page">
        <div className="page-intro">
          <div>
            <div className="eyebrow">TutorVerse India</div>
            <h1>School Tuition in India</h1>
            <p>
              Find focused tuition support for school students in core academic
              subjects, with home tuition, online tuition and batch learning.
              TutorVerse helps parents connect with tutors based on subject,
              class, board, location and learning needs.
            </p>
          </div>
        </div>

        <section>
          <div className="eyebrow">Science & academic subjects</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Tuition for the subjects students study every day
          </h2>
          <div className="subject-grid big mt-6">
            {subjects.map((subject) => (
              <Link
                key={subject}
                className="subject-card"
                href={`/tutors?subject=${encodeURIComponent(subject)}`}
              >
                <h3>{subject}</h3>
                <p>Find tutors →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="eyebrow">School boards</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Support across major Indian school boards
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Tutor requirements differ by board, class and subject. Students can
            look for tutors familiar with CBSE, ICSE, Maharashtra State Board,
            IB and IGCSE learning requirements.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {boards.map((board) => (
              <span key={board} className="rounded-full border border-slate-200 bg-white px-4 py-2 font-bold">
                {board}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
          <div className="eyebrow">Competitive preparation</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            School learning and competitive exams can work together
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            For Classes 11 and 12, students may also need preparation for JEE,
            NEET and MHT-CET. TutorVerse keeps the academic subject and exam
            goal visible when students search for suitable tutors.
          </p>
          <Link href="/jee-neet-tuition" className="mt-5 inline-flex rounded-xl bg-[#199754] px-5 py-3 font-extrabold text-white">
            Explore competitive exam tuition →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
