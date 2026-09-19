import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://tutorverse.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TutorVerse | School & Competitive Exam Tuitions in India",
    template: "%s | TutorVerse",
  },
  description:
    "Find school tuition and science tutors for Physics, Chemistry, Biology and Mathematics, plus JEE, NEET, MHT-CET and other competitive exam preparation in India. Home, online and batch tuition.",
  keywords: [
    "school tuition India",
    "science tuition India",
    "Physics tuition",
    "Chemistry tuition",
    "Biology tuition",
    "Mathematics tuition",
    "JEE tuition",
    "NEET tuition",
    "MHT-CET tuition",
    "home tuition",
    "online tuition India",
    "private tutors India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "TutorVerse",
    title: "TutorVerse | School & Competitive Exam Tuitions in India",
    description:
      "School subject tuition and competitive exam preparation with home, online and batch learning options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "TutorVerse",
  url: siteUrl,
  description:
    "TutorVerse connects students and parents with tutors for school subjects and competitive exams in India.",
  areaServed: "IN",
  knowsAbout: [
    "School tuition",
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "JEE Main",
    "JEE Advanced",
    "NEET",
    "MHT-CET",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
