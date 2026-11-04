import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Net not found",
  description:
    "No net at this address. Return to Jai Dilbaghi’s engineering work.",
  robots: { index: false },
};
export default function NotFound() {
  return (
    <>
      <main id="main" className="page-shell not-found">
        <h1>No net at this address.</h1>
        <p>This page could not be found.</p>
        <div className="actions">
          <Link href="/" className="button">
            Home
          </Link>
          <Link href="/work" className="button secondary">
            See work
          </Link>
        </div>
      </main>
      <Footer sheet={null} />
    </>
  );
}
