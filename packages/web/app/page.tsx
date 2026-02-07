import Link from "next/link";
import { ClawMascot } from "../components/claw-mascot";
import { FaqAccordion } from "../components/faq-accordion";
import { ScrollWeightHeading } from "../components/scroll-weight-heading";
import { StepNumber } from "../components/step-number";
import { TerminalDemo } from "../components/terminal-demo";
import { faqItems } from "./faq/faq-data";

/**
 * Full landing per ProductPlan: Hero, How it works, What you get, Principles, FAQ, Final CTA, Footer.
 * Terminal animation and kinetic typography in Phase 5 (separate components).
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Section 1: Hero */}
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
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center min-h-[85vh]">
        <ClawMascot variant="idle" size={120} className="mb-8 shrink-0" />
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
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent-indigo)] px-8 py-3.5 text-base font-medium text-white hover:opacity-95 transition-opacity hover:scale-[1.02] active:scale-[0.98]"
          >
            Deploy Now
          </Link>
          <a href="#how-it-works" className="text-[var(--color-accent-indigo)] text-base font-medium hover:underline">
            See how it works ↓
          </a>
        </div>
        <div className="mt-12 w-full max-w-2xl">
          <TerminalDemo />
        </div>
      </section>

      {/* Section 2: How it works */}
      <section id="how-it-works" className="px-6 py-20 max-w-3xl mx-auto">
        <ScrollWeightHeading className="text-3xl sm:text-4xl text-foreground text-center mb-14">
          How it works
        </ScrollWeightHeading>
        <div className="space-y-14">
          <div>
            <StepNumber value={1} className="font-mono text-2xl text-[var(--color-accent-indigo)] block" />
            <h3 className="text-xl font-bold text-foreground mt-2">Choose where to run</h3>
            <p className="mt-2 text-muted text-[17px] leading-relaxed">
              Your own cloud server (Hetzner, DigitalOcean) or your own computer with Docker. You decide.
            </p>
          </div>
          <div>
            <StepNumber value={2} className="font-mono text-2xl text-[var(--color-accent-indigo)] block" />
            <h3 className="text-xl font-bold text-foreground mt-2">Connect your AI + channel</h3>
            <p className="mt-2 text-muted text-[17px] leading-relaxed">
              Pick your LLM provider. Connect Telegram, WhatsApp, or Discord. We validate everything.
            </p>
          </div>
          <div>
            <StepNumber value={3} className="font-mono text-2xl text-[var(--color-accent-indigo)] block" />
            <h3 className="text-xl font-bold text-foreground mt-2">Deploy & learn</h3>
            <p className="mt-2 text-muted text-[17px] leading-relaxed">
              We configure everything in ~3 minutes. You get a working agent AND a guide to manage it yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: What you get */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <ScrollWeightHeading className="text-3xl sm:text-4xl text-foreground text-center mb-10">
          What you get
        </ScrollWeightHeading>
        <ul className="space-y-3 text-[17px] text-foreground">
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-emerald)] shrink-0" aria-hidden>✓</span>
            Working OpenClaw agent on your own server
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-emerald)] shrink-0" aria-hidden>✓</span>
            Security-hardened (firewall, brute-force protection, SSH-only access)
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-emerald)] shrink-0" aria-hidden>✓</span>
            Docker-based (easy to update, reproducible)
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-emerald)] shrink-0" aria-hidden>✓</span>
            Choice of cloud provider or local Docker
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--color-accent-emerald)] shrink-0" aria-hidden>✓</span>
            &quot;Managing Your OpenClaw&quot; guide (SSH, restart, update, troubleshoot)
          </li>
        </ul>
      </section>

      {/* Section 4: Principles */}
      <section className="px-6 py-20 text-center">
        <p className="text-2xl sm:text-3xl text-foreground font-normal">
          We believe you should{" "}
          <span className="font-extrabold text-[#B45309]">own</span> your AI.
        </p>
        <p className="mt-4 text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Your server. Your data. Your keys. Always.
          <br />
          Free. No subscription. No hidden fees.
          <br />
          We teach you to manage it yourself.
          <br />
          If we disappear, your agent keeps running.
        </p>
      </section>

      {/* Section 5: FAQ */}
      <section className="px-6 py-20 max-w-2xl mx-auto">
        <ScrollWeightHeading className="text-3xl sm:text-4xl text-foreground text-center mb-10">
          Frequently asked questions
        </ScrollWeightHeading>
        <FaqAccordion items={faqItems} />
        <p className="mt-6 text-center">
          <Link href="/faq" className="text-[var(--color-accent-indigo)] font-medium hover:underline">
            See all FAQ →
          </Link>
        </p>
      </section>

      {/* Section 6: Final CTA */}
      <section className="px-6 py-20 flex flex-col items-center text-center">
        <ScrollWeightHeading className="text-3xl sm:text-4xl text-foreground">Ready?</ScrollWeightHeading>
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <ClawMascot variant="wave" size={64} className="shrink-0 order-2 sm:order-1" />
          <Link
            href="/setup"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent-indigo)] px-8 py-3.5 text-base font-medium text-white hover:opacity-95 transition-opacity hover:scale-[1.02] active:scale-[0.98] order-1 sm:order-2"
          >
            Deploy Now — It&apos;s Free
          </Link>
        </div>
        <p className="mt-4 text-muted text-sm">No account needed. No payment. Just deploy.</p>
      </section>

      {/* Section 7: Footer */}
      <footer className="border-t border-[var(--color-border)] px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-foreground">HoldMyClaw</span>
            <Link href="/guide" className="hover:text-foreground">Guide</Link>
            <Link href="/faq" className="hover:text-foreground">FAQ</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
          <p>Made for the OpenClaw community</p>
        </div>
      </footer>
    </main>
  );
}
