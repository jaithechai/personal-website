import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jai Dilbaghi | ECE at UT Austin",
  description:
    "Jai Dilbaghi is a freshman in ECE at UT Austin. Electrical and Telemetry Lead on Plano Green Team and machine learning research intern at UT Dallas.",
  keywords: [
    "Jai Dilbaghi",
    "UT Austin",
    "ECE",
    "solar car",
    "Plano Green Team",
    "Solar Car Challenge",
    "KiCad",
    "machine learning",
    "computer vision",
    "iCode",
    "Texas",
  ],
  authors: [{ name: "Jai Dilbaghi" }],
  creator: "Jai Dilbaghi",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jai Dilbaghi | ECE at UT Austin",
    description:
      "Freshman in ECE at UT Austin, with work in solar car electrical systems and machine learning research.",
    siteName: "Jai Dilbaghi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jai Dilbaghi | ECE at UT Austin",
    description:
      "Freshman in ECE at UT Austin, with work in solar car electrical systems and machine learning research.",
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
