import Link from "next/link";
import { Header, Footer } from "../components/site";

const locations = [
  ["kharghar", "Kharghar"],
  ["taloja", "Taloja"],
  ["seawoods", "Seawoods"],
  ["nerul", "Nerul"],
  ["vashi", "Vashi"],
  ["sanpada", "Sanpada"],
] as const;

export default function LocalTuitionPage({ location }: { location: string }) {
  const nearby = locations.filter(([slug]) => slug !== location);

  return (
    <>
      <Header />
      <main className="page">
        <div className="page-intro">
          <div>
            <div className="eyebrow">TutorVerse • Navi Mumbai</div>
            <h1>{location} Tuition & Tutors</h1>
            <p>
              Find tuition support for school students and competitive exam preparation in {location}.
              TutorVerse helps parents and students look for tutors by subject, class, board,
              learning mode and location.
            </p>
          </div>
        </div>

        <section>
          <div className="eyebrow">School tuition</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Science and Mathematics tuition in {location}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Look for subject-focused tuition for Classes 6–12, including Science, Mathematics,
            Physics, Chemistry and Biology. Students can search for tutors familiar with CBSE,
            ICSE and Maharashtra State Board requirements.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Mathematics", "Science", "Physics", "Chemistry", "Biology"].map((subject) => (
              <Link key={subject} href={`/tutors?subject=${encodeURIComponent(subject)}&city=${encodeURIComponent(location)}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold">
                {subject} tutors →
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
          <div className="eyebrow">Competitive exams</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">JEE, NEET and MHT-CET tuition in {location}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Students preparing alongside Classes 11 and 12 can look for subject-specific support
            for JEE, NEET and MHT-CET, including Physics, Chemistry, Mathematics and Biology.
          </p>
          <Link href="/jee-neet-tuition" className="mt-5 inline-flex rounded-xl bg-[#199754] px-5 py-3 font-extrabold text-white">
            Explore competitive exam tuition →
          </Link>
        </section>

        <section className="mt-16">
          <div className="eyebrow">Learning modes</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Home, online and batch tuition</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Depending on availability and the student's requirements, TutorVerse can help families
            search for home tuition, online tuition or batch learning in and around {location}.
          </p>
          <Link href={`/tutors?city=${encodeURIComponent(location)}`} className="mt-5 inline-flex font-extrabold text-[#147a45]">
            Find tutors in {location} →
          </Link>
        </section>

        <section className="mt-16">
          <div className="eyebrow">Nearby Navi Mumbai areas</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight">More local tuition areas</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {nearby.map(([slug, label]) => (
              <Link key={slug} href={`/tuition-in/${slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 font-bold">
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
