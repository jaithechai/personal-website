import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});
const martian = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-martian",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jai Dilbaghi | Electrical and Computer Engineering",
    template: "%s | Jai Dilbaghi",
  },
  description:
    "Electrical and computer engineering at UT Austin. Jai Dilbaghi designed solar car circuits as Electrical Lead and researched machine learning at UT Dallas.",
  authors: [{ name: "Jai Dilbaghi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jai Dilbaghi",
    title: "Jai Dilbaghi | Electrical and Computer Engineering",
    description:
      "KiCad circuits, solar car electrical systems, and machine learning research.",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${martian.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
