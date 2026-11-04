import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "About",
  description:
    "Jai Dilbaghi studies electrical and computer engineering at UT Austin, led electrical design at Plano Green Team, and researched machine learning at UT Dallas.",
};
export default function AboutPage() {
  return (
    <>
      <About />
      <Footer sheet={3} />
    </>
  );
}
