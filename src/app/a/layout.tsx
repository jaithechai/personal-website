import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./poster.css";
import Smooth from "@/components/va/Smooth";
import Preloader from "@/components/va/Preloader";
import Cursor from "@/components/va/Cursor";
import Nav from "@/components/va/Nav";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--pa-f-display",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--pa-f-body", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--pa-f-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Jai Dilbaghi | ECE at UT Austin",
  robots: { index: false, follow: false },
};

export default function PosterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pa-root ${archivo.variable} ${geist.variable} ${geistMono.variable}`}>
      <a className="pa-skip" href="#about">
        Skip to content
      </a>
      <Smooth />
      <Preloader />
      <Cursor />
      <div className="pa-bezel" aria-hidden="true" />
      {children}
      <Nav />
    </div>
  );
}
