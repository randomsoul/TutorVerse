import type { Metadata } from "next";
import LocalTuitionPage from "../_local-page";

export const metadata: Metadata = {
  title: "Sanpada Tuition | Science, Maths, JEE & NEET Tutors | TutorVerse",
  description: "Find school and competitive exam tutors in Sanpada, Navi Mumbai. Explore Science, Physics, Chemistry, Biology, Mathematics, JEE, NEET and MHT-CET tuition with TutorVerse.",
  alternates: { canonical: "/tuition-in/sanpada" },
};

export default function Page() { return <LocalTuitionPage location="Sanpada" />; }
