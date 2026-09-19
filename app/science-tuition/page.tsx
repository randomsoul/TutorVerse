import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../components/site";

export const metadata: Metadata = {
  title: "Science Tuition in India | Physics, Chemistry & Biology Tutors",
  description:
    "Find science tutors in India for school students: Physics, Chemistry, Biology and Science tuition for Classes 6 to 12, with home and online options.",
  alternates: { canonical: "/science-tuition" },
};

const subjects = [
  ["Physics", "Classes 9–12 and competitive exam foundations"],
  ["Chemistry", "School concepts, numericals and exam preparation"],
  ["Biology", "School Biology and NEET-oriented preparation"],
  ["Science", "Integrated Science support for middle and secondary school"],
];

export default function ScienceTuitionPage() {
  return (
    <>
      <Header />
      <main className="page">
        <div className="page-intro">
          <div>
            <div className="eyebrow">Science tuition</div>
            <h1>Science Tuition in India</h1>
            <p>
              Connect with tutors for Physics, Chemistry, Biology and school
              Science. Choose support for your class, board and learning mode,
              including online and home tuition where available.
            </p>
          </div>
        </div>

        <section>
          <div className="subject-grid big">
            {subjects.map(([name, text]) => (
              <Link
                key={name}
                className="subject-card"
                href={`/tutors?subject=${encodeURIComponent(name)}`}
              >
                <h3>{name}</h3>
                <p>{text}</p>
                <span className="arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="eyebrow">What parents can specify</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Search by the details that actually matter
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5"><h3 className="font-black">Class & board</h3><p className="mt-2 text-sm leading-6 text-slate-600">Select the student's class and school board rather than searching only by subject.</p></div>
            <div className="rounded-2xl border border-slate-200 p-5"><h3 className="font-black">Learning mode</h3><p className="mt-2 text-sm leading-6 text-slate-600">Compare online, home and batch tuition according to the student's needs.</p></div>
            <div className="rounded-2xl border border-slate-200 p-5"><h3 className="font-black">Exam goal</h3><p className="mt-2 text-sm leading-6 text-slate-600">For senior classes, combine school subject support with JEE, NEET or MHT-CET preparation.</p></div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-slate-50 p-7">
          <h2 className="text-2xl font-black">Looking for JEE or NEET tuition?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Explore dedicated competitive-exam tuition pages for Physics,
            Chemistry, Biology and Mathematics support.
          </p>
          <Link href="/jee-neet-tuition" className="mt-5 inline-flex rounded-xl bg-[#199754] px-5 py-3 font-extrabold text-white">
            JEE & NEET tuition →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
