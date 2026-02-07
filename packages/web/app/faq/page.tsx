import Link from "next/link";
import { faqItems } from "./faq-data";
import { FaqAccordion } from "../../components/faq-accordion";

export const metadata = {
  title: "FAQ — HoldMyClaw",
  description:
    "Frequently asked questions about HoldMyClaw: setup, cost, cloud providers, security, and managing your OpenClaw agent.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-2xl mx-auto">
      <header className="mb-10">
        <Link
          href="/"
          className="text-muted hover:text-foreground text-sm font-medium"
        >
          ← HoldMyClaw
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-muted text-lg">
          Everything you need to know about deploying and managing OpenClaw with
          HoldMyClaw.
        </p>
      </header>

      <FaqAccordion items={faqItems} />

      <p className="mt-10 text-muted text-sm">
        Still have questions? Check the{" "}
        <Link href="/guide" className="text-[var(--color-accent-indigo)] hover:underline">
          Managing Your OpenClaw
        </Link>{" "}
        guide or reach out to the OpenClaw community.
      </p>
    </main>
  );
}
