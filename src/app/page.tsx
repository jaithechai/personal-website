import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Jai Dilbaghi | Electrical and Computer Engineering",
  description:
    "Electrical and computer engineering at UT Austin. Circuits designed, assembled, and debugged on the road. Seeking Summer 2027 internships and research.",
};
export default function Home() {
  return (
    <>
      <Hero />
      <Footer sheet={1} />
    </>
  );
}
