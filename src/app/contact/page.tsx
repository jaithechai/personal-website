import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jai Dilbaghi about Summer 2027 internships and research in electrical and computer engineering.",
};
export default function ContactPage() {
  return (
    <>
      <Contact />
      <Footer sheet={4} />
    </>
  );
}
