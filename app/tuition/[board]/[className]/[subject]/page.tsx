import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../../../../components/site";

const boards = {
  cbse: "CBSE",
  icse: "ICSE",
  "maharashtra-state-board": "Maharashtra State Board",
} as const;

const classes = ["6", "7", "8", "9", "10", "11", "12"] as const;
const schoolSubjects = ["mathematics", "science"] as const;
const seniorSubjects = ["mathematics", "physics", "chemistry", "biology"] as const;

const subjectNames: Record<string, string> = {
  mathematics: "Mathematics",
  science: "Science",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
};

const boardEntries = Object.entries(boards) as [keyof typeof boards, string][];

export function generateStaticParams() {
  const params: { board: string; className: string; subject: string }[] = [];
  for (const [board] of boardEntries) {
    for (const className of classes) {
      const subjects = Number(className) <= 10 ? schoolSubjects : seniorSubjects;
      for (const subject of subjects) params.push({ board, className, subject });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string; className: string; subject: string }>;
}): Promise<Metadata> {
  const { board, className, subject } = await params;
  const boardName = boards[board as keyof typeof boards];
  const subjectName = subjectNames[subject];
  if (!boardName || !subjectName || !classes.includes(className as (typeof classes)[number])) return {};
  return {
    title: { absolute: `Class ${className} ${subjectName} Tuition | ${boardName} | TutorVerse` },
    description: `Find Class ${className} ${subjectName} tuition for ${boardName} students in India. Explore home, online and batch tuition with TutorVerse.`,
    alternates: { canonical: `/tuition/${board}/${className}/${subject}` },
    openGraph: {
      title: `Class ${className} ${subjectName} Tuition | ${boardName}`,
      description: `TutorVerse helps students and parents find ${subjectName} tuition for Class ${className} ${boardName} learning in India.`,
      url: `https://www.tutorverse.in/tuition/${board}/${className}/${subject}`,
      type: "website",
    },
  };
}

export default async function TuitionSubjectPage({
  params,
}: {
  params: Promise<{ board: string; className: string; subject: string }>;
}) {
  const { board, className, subject } = await params;
  const boardName = boards[board as keyof typeof boards];
  const subjectName = subjectNames[subject];
  const valid = boardName && subjectName && classes.includes(className as (typeof classes)[number]);

  if (!valid) return null;

  const isJunior = Number(className) <= 10;
  const examContext = Number(className) >= 11;

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-intro">
          <div>
            <div className="eyebrow">TutorVerse India • {boardName}</div>
            <h1>Class {className} {subjectName} Tuition</h1>
            <p>
              Find tuition support for Class {className} {subjectName} under the {boardName} curriculum.
              TutorVerse helps parents and students compare tutors by subject, class, board,
              location and learning mode, including home and online tuition.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-3xl font-black tracking-tight">What students can look for</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-extrabold">Board-focused learning</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Tuition aligned to {boardName} schoolwork, concepts, homework and examinations.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-extrabold">Flexible tuition modes</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Explore home tuition, online tuition or batch learning based on the student's needs.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-extrabold">Subject-specific support</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Focus on {subjectName} rather than searching through unrelated tutoring categories.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
          <div className="eyebrow">Find a tutor</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Looking for a Class {className} {subjectName} tutor?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Tell TutorVerse the subject, class, board and location you need. Parents can then coordinate with suitable tutors directly.
          </p>
          <Link
            href={`/tutors?subject=${encodeURIComponent(subjectName)}&class=${encodeURIComponent(className)}&board=${encodeURIComponent(boardName)}`}
            className="mt-5 inline-flex rounded-xl bg-[#199754] px-5 py-3 font-extrabold text-white"
          >
            Find {subjectName} tutors →
          </Link>
        </section>

        {isJunior && (
          <section className="mt-16">
            <h2 className="text-3xl font-black tracking-tight">Build strong school fundamentals</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              For Classes 6–10, focused tuition can support classroom learning, regular practice,
              problem solving and preparation for school examinations. Tutor selection can be based on board, class and location.
            </p>
          </section>
        )}

        {examContext && (
          <section className="mt-16">
            <h2 className="text-3xl font-black tracking-tight">Class {className} and competitive preparation</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              Students in Classes 11 and 12 may also prepare for competitive examinations alongside school studies.
              TutorVerse supports searches for JEE, NEET and MHT-CET subject tuition where relevant.
            </p>
            <Link href="/jee-neet-tuition" className="mt-5 inline-flex font-extrabold text-[#147a45]">
              Explore competitive exam tuition →
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
