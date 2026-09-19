import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../../../components/site";

const locations = {
  kharghar: "Kharghar",
  taloja: "Taloja",
  seawoods: "Seawoods",
  nerul: "Nerul",
  vashi: "Vashi",
  sanpada: "Sanpada",
} as const;

type LocationKey = keyof typeof locations;

export function generateStaticParams() {
  return Object.keys(locations).map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const name = locations[location as LocationKey];
  if (!name) return {};

  return {
    title: `${name} Tuition | Science, Maths, JEE & NEET Tutors | TutorVerse`,
    description: `Find school and competitive exam tutors in ${name}, Navi Mumbai. Explore Science, Physics, Chemistry, Biology, Mathematics, JEE, NEET and MHT-CET tuition with TutorVerse.`,
    alternates: { canonical: `/tuition-in/${location}` },
    openGraph: {
      title: `${name} Tuition | TutorVerse`,
      description: `Find school tuition and competitive exam tutors in ${name}, Navi Mumbai.`,
      url: `https://www.tutorverse.in/tuition-in/${location}`,
      type: "website",
    },
  };
}

export default async function LocalTuitionPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const name = locations[location as LocationKey];
  if (!name) return null;

  const localLinks = Object.entries(locations).filter(([slug]) => slug !== location);

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-intro">
          <div>
            <div className="eyebrow">TutorVerse • Navi Mumbai</div>
            <h1>{name} Tuition & Tutors</h1>
            <p>
              Find tuition support for school students and competitive exam preparation in {name}.
              TutorVerse helps parents and students look for tutors by subject, class, board,
              learning mode and location.
            </p>
          </div>
        </div>

        <section>
          <div className="eyebrow">School tuition</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Science and Mathematics tuition in {name}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Look for subject-focused tuition for Classes 6–12, including school Science,
            Mathematics, Physics, Chemistry and Biology. Students can search for tutors
            familiar with CBSE, ICSE and Maharashtra State Board requirements.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Mathematics", "Science", "Physics", "Chemistry", "Biology"].map((subject) => (
              <Link
                key={subject}
                href={`/tutors?subject=${encodeURIComponent(subject)}&city=${encodeURIComponent(name)}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold"
              >
                {subject} tutors →
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
          <div className="eyebrow">Competitive exams</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            JEE, NEET and MHT-CET tuition in {name}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Students preparing alongside Classes 11 and 12 can look for subject-specific
            support for JEE, NEET and MHT-CET, including Physics, Chemistry, Mathematics and Biology.
          </p>
          <Link
            href="/jee-neet-tuition"
            className="mt-5 inline-flex rounded-xl bg-[#199754] px-5 py-3 font-extrabold text-white"
          >
            Explore competitive exam tuition →
          </Link>
        </section>

        <section className="mt-16">
          <div className="eyebrow">Learning modes</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Home, online and batch tuition</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Depending on availability and the student's requirements, TutorVerse can help families
            search for home tuition, online tuition or batch learning in and around {name}.
          </p>
          <Link
            href={`/tutors?city=${encodeURIComponent(name)}`}
            className="mt-5 inline-flex font-extrabold text-[#147a45]"
          >
            Find tutors in {name} →
          </Link>
        </section>

        <section className="mt-16">
          <div className="eyebrow">Nearby Navi Mumbai areas</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">More local tuition areas</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {localLinks.map(([slug, label]) => (
              <Link
                key={slug}
                href={`/tuition-in/${slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 font-bold"
              >
                {label} tuition
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
