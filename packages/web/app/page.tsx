import Link from "next/link";

/**
 * Placeholder hero section per ProductPlan.md — Section 1: Hero
 * Top bar: HoldMyClaw wordmark left, Guide + FAQ right
 * Headline, subtext, CTA, secondary link
 * Terminal block and mascot come in Phase 5.
 */
export default function HomePage() {
  return (
    <main className="min-h-[90vh] flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <span className="text-lg font-semibold text-foreground">
          HoldMyClaw
        </span>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/guide"
            className="text-muted hover:text-foreground transition-colors"
          >
            Guide
          </Link>
          <Link
            href="/faq"
            className="text-muted hover:text-foreground transition-colors"
          >
            FAQ
          </Link>
        </nav>
      </header>

      {/* Hero content — centered */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Claw mascot placeholder — amber, ~120px */}
        <div
          className="w-[120px] h-[120px] rounded-full bg-[var(--color-accent-amber)]/20 border-2 border-[var(--color-accent-amber)] mb-8 flex items-center justify-center text-2xl"
          aria-hidden
        >
          🦞
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground max-w-3xl leading-tight">
          Deploy OpenClaw in 5 Minutes
          <br />
          <span className="text-foreground">Your server, your data,</span>
          <br />
          <span className="text-foreground">completely free.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted max-w-xl">
          We set it up, hand you the keys, and walk away.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/setup"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent-indigo)] px-8 py-3.5 text-base font-medium text-white hover:opacity-95 transition-opacity"
          >
            Deploy Now
          </Link>
          <a
            href="#how-it-works"
            className="text-[var(--color-accent-indigo)] text-base font-medium hover:underline"
          >
            See how it works ↓
          </a>
        </div>

        {/* Terminal block placeholder — light gray bg */}
        <div className="mt-12 w-full max-w-2xl rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] p-4 font-mono text-sm text-left">
          <div className="text-muted">$ holdmyclaw deploy</div>
          <div className="mt-2 text-foreground">
            Terminal animation will go here (Phase 5).
          </div>
        </div>
      </section>
    </main>
  );
}
