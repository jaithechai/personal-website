import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./board.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--pb-f-display",
  display: "swap",
});
const geist = Geist({ subsets: ["latin"], variable: "--pb-f-body", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--pb-f-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Jai Dilbaghi | ECE at UT Austin",
  description: "Jai Dilbaghi studies Electrical and Computer Engineering at UT Austin.",
};

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${archivo.variable} ${geist.variable} ${geistMono.variable} pb-fonts`}>
      {children}
    </div>
  );
}
