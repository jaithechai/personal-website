export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="page-shell flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-display text-3xl leading-none">Jai Dilbaghi</div>
          <p className="mt-2 text-sm text-text-muted">
            ECE at UT Austin. Builder. Researcher.
          </p>
        </div>

        <p className="text-xs font-mono uppercase tracking-[0.18em] text-text-muted">
          Built with Next.js and Framer Motion
        </p>
      </div>
    </footer>
  );
}
