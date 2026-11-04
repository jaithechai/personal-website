import type { Metadata } from "next";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Work",
  description:
    "Solar car electrical systems, KiCad PCBs, agentic workflows, and machine learning research by Jai Dilbaghi, former Electrical Lead at Plano Green Team.",
};
export default function WorkPage() {
  return (
    <>
      <Work />
      <Footer sheet={2} />
    </>
  );
}
