import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jai Dilbaghi | ECE at UT Austin",
  description:
    "Jai Dilbaghi studies Electrical and Computer Engineering at UT Austin. He designs circuit boards and electrical systems in KiCad, and was Electrical Lead on Plano Green Team's solar car.",
  keywords: [
    "Jai Dilbaghi",
    "UT Austin",
    "ECE",
    "solar car",
    "Plano Green Team",
    "Solar Car Challenge",
    "KiCad",
    "PCB design",
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
      "ECE at UT Austin. Designs circuit boards in KiCad and was Electrical Lead on Plano Green Team's solar car.",
    siteName: "Jai Dilbaghi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jai Dilbaghi | ECE at UT Austin",
    description:
      "ECE at UT Austin. Designs circuit boards in KiCad and was Electrical Lead on Plano Green Team's solar car.",
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
