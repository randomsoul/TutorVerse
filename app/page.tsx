const subjects = [
  { name: "Physics", accent: "from-sky-500 to-cyan-500" },
  { name: "Mathematics", accent: "from-indigo-500 to-violet-500" },
  { name: "Chemistry", accent: "from-blue-600 to-indigo-600" },
  { name: "Biology", accent: "from-emerald-500 to-teal-500" },
  { name: "English", accent: "from-amber-500 to-orange-500" },
  { name: "Computer Science", accent: "from-fuchsia-500 to-purple-500" },
  { name: "JEE", accent: "from-violet-600 to-indigo-600" },
  { name: "NEET", accent: "from-rose-500 to-pink-500" },
];

const classes = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const benefits = [
  {
    title: "Verified & experienced tutors",
    description: "Learn from carefully vetted educators who know how to guide students with clarity and confidence.",
  },
  {
    title: "Personalised learning",
    description: "Every student gets guidance tailored to their pace, level and goals—whether it is school marks or competitive exams.",
  },
  {
    title: "Flexible online/offline options",
    description: "Choose what works best for your routine with live online sessions and in-person tutoring support.",
  },
  {
    title: "Learn at your pace",
    description: "Build strong fundamentals through structured lessons, revision plans and focused doubt-solving support.",
  },
];

const steps = [
  { title: "Search", description: "Explore tutors by subject, class and board to find the right fit." },
  { title: "Choose your tutor", description: "Compare teaching styles, ratings and availability before you begin." },
  { title: "Start learning", description: "Schedule classes and start your learning journey with expert guidance." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="TutorVerse home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-indigo-200">
              TV
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">TutorVerse</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                tutorverse.in
              </div>
            </div>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <a href="#" className="transition hover:text-indigo-600">Find a Tutor</a>
            <a href="#subjects" className="transition hover:text-indigo-600">Subjects</a>
            <a href="#become-tutor" className="transition hover:text-indigo-600">Become a Tutor</a>
            <a href="#how-it-works" className="transition hover:text-indigo-600">How It Works</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#" className="hidden text-sm font-medium text-slate-700 transition hover:text-indigo-600 sm:inline-flex">
              Login
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px] hover:shadow-xl"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Trusted learning. Personalised teaching.
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-6xl">
              Find the Right Tutor. Learn Better.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Connect with experienced tutors for school, boards, JEE, NEET and more.
            </p>

            <form className="mt-8 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_25px_80px_-30px_rgba(79,70,229,0.35)] sm:p-5" aria-label="Tutor search form">
              <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">
                <label className="block text-left">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    What do you want to learn?
                  </span>
                  <input
                    type="text"
                    placeholder="Physics, Maths, JEE..."
                    aria-label="What do you want to learn?"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </label>

                <label className="block text-left">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Select Class / Grade
                  </span>
                  <select
                    aria-label="Select Class / Grade"
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Class
                    </option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </label>

                <label className="block text-left">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Select Board
                  </span>
                  <select
                    aria-label="Select Board"
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Board
                    </option>
                    <option>CBSE</option>
                    <option>ICSE</option>
                    <option>State Board</option>
                    <option>IB</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:translate-y-[-1px] hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "R", "S"].map((letter, index) => (
                    <span
                      key={letter}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${
                        index === 0
                          ? "bg-blue-500"
                          : index === 1
                            ? "bg-indigo-500"
                            : "bg-cyan-500"
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <span>
                  <span className="font-semibold text-slate-900">5000+</span> learners supported
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_35px_90px_-35px_rgba(15,23,42,0.5)] sm:p-6">
              <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl shadow-lg shadow-amber-200">
                ✦
              </div>

              <div className="rounded-[28px] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-5 text-white shadow-lg shadow-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-indigo-100">Top tutors this week</p>
                    <h2 className="mt-2 text-2xl font-bold">12,400+ lessons booked</h2>
                  </div>
                  <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">4.9 rating</div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-lg font-bold">
                          A
                        </div>
                        <div>
                          <p className="font-semibold">Aarav Sharma</p>
                          <p className="text-xs text-indigo-100">Physics • JEE Advanced</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">₹950</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-100">/ class</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-950/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Speciality</p>
                      <p className="mt-2 text-xl font-bold">JEE + NEET</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-indigo-100">Sessions</p>
                      <p className="mt-2 text-xl font-bold">1:1 + group</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">This month’s learner growth</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">+28%</p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Upward trend
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subjects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Popular subjects</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Learn what matters most</h2>
          </div>
          <a href="#" className="hidden text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 sm:inline-flex">
            Explore all subjects →
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <article
              key={subject.name}
              className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.accent} text-lg font-bold text-white shadow-lg`}>
                {subject.name.slice(0, 1)}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{subject.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Expert-led coaching with structured practice and focused revision.</p>
              <div className="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-700">
                Find tutors →
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">Explore by class</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Choose the right level</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {classes.map((grade) => (
              <a
                key={grade}
                href="#"
                className="group rounded-[22px] border border-slate-700 bg-slate-800/80 p-4 text-left transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-slate-800"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
                  {grade.split(" ")[1]}
                </div>
                <div className="text-lg font-semibold text-white">{grade}</div>
                <div className="mt-2 text-sm text-slate-300 transition group-hover:text-indigo-200">Open courses →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Why TutorVerse</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">A smarter way to learn</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-gradient-to-b from-slate-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Simple, guided and personal</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-[28px] border border-indigo-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="become-tutor" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-indigo-100 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-[0_30px_80px_-35px_rgba(59,130,246,0.9)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">Become a tutor</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Share your knowledge. Inspire the next learner.
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-md transition hover:bg-indigo-50"
            >
              Become a Tutor
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-indigo-200">
                TV
              </div>
              <div className="text-xl font-bold text-slate-900">TutorVerse</div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">Connecting students with great tutors.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#" className="transition hover:text-indigo-600">About us</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Students</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#" className="transition hover:text-indigo-600">Find a Tutor</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">Subjects</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">How it works</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Tutors</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#" className="transition hover:text-indigo-600">Join as tutor</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">Teaching resources</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© 2026 TutorVerse. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="transition hover:text-indigo-600">Privacy</a>
              <a href="#" className="transition hover:text-indigo-600">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
