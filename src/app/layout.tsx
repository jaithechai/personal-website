import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jai Dilbaghi | ECE at UT Austin",
  description:
    "Jai Dilbaghi is a freshman in ECE at UT Austin. He works on solar cars, machine learning, web projects, and student-focused tech.",
  keywords: [
    "Jai Dilbaghi",
    "UT Austin",
    "ECE",
    "solar car",
    "machine learning",
    "computer vision",
    "web development",
    "iCode",
    "Green Portfolio Project",
    "Texas",
  ],
  authors: [{ name: "Jai Dilbaghi" }],
  creator: "Jai Dilbaghi",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jai Dilbaghi | ECE at UT Austin",
    description:
      "Freshman in ECE at UT Austin, with work in solar car systems, research, and student web projects.",
    siteName: "Jai Dilbaghi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jai Dilbaghi | ECE at UT Austin",
    description:
      "Freshman in ECE at UT Austin, with work in solar car systems, research, and student web projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
