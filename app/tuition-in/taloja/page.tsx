import type { Metadata } from "next";
import LocalTuitionPage from "../_local-page";

export const metadata: Metadata = {
  title: "Taloja Tuition | Science, Maths, JEE & NEET Tutors | TutorVerse",
  description: "Find school and competitive exam tutors in Taloja, Navi Mumbai. Explore Science, Physics, Chemistry, Biology, Mathematics, JEE, NEET and MHT-CET tuition with TutorVerse.",
  alternates: { canonical: "/tuition-in/taloja" },
};

export default function Page() { return <LocalTuitionPage location="Taloja" />; }
