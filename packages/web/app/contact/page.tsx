import Link from "next/link";

/**
 * Contact / feedback page for Phase 6 launch.
 * Update the feedback link when GitHub repo or email is set.
 */
export const metadata = {
  title: "Contact — HoldMyClaw",
  description: "Feedback and contact for HoldMyClaw.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <Link href="/" className="text-lg font-semibold text-foreground">
          HoldMyClaw
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/guide" className="text-muted hover:text-foreground transition-colors">
            Guide
          </Link>
          <Link href="/faq" className="text-muted hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-muted hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">Contact</h1>
        <p className="mt-4 text-muted text-[17px] leading-relaxed">
          We&apos;d love to hear from you — especially if something didn&apos;t work or you have ideas to improve HoldMyClaw.
        </p>
        <p className="mt-4 text-muted text-[17px] leading-relaxed">
          For feedback and questions, open a GitHub Discussion or issue (when the repo is public), or email us. We read everything and use it to fix bugs and improve the wizard.
        </p>
        <p className="mt-6 text-sm text-muted">
          <a href="mailto:feedback@holdmyclaw.com" className="text-[var(--color-accent-indigo)] hover:underline">
            feedback@holdmyclaw.com
          </a>
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--color-accent-indigo)] px-6 py-3 text-sm font-medium text-white hover:opacity-95 transition-opacity"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
