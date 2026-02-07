import Link from "next/link";
import { getGuideMarkdown, getGuideToc } from "../../lib/guide-content";
import { GuideBody } from "./guide-body";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://holdmyclaw.com";

export const metadata = {
  title: "Managing Your OpenClaw — HoldMyClaw",
  description:
    "Complete guide to managing your self-hosted OpenClaw agent. SSH, restart, update, troubleshoot, install skills.",
};

const guideJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Managing Your OpenClaw",
  description: "Complete guide to managing your self-hosted OpenClaw agent. SSH, restart, update, troubleshoot, install skills.",
  url: `${siteUrl}/guide`,
  step: [
    { "@type": "HowToStep", name: "Your Agent at a Glance" },
    { "@type": "HowToStep", name: "The Dashboard" },
    { "@type": "HowToStep", name: "Talking to Your Agent" },
    { "@type": "HowToStep", name: "Customizing Your Agent" },
    { "@type": "HowToStep", name: "Adding Skills" },
    { "@type": "HowToStep", name: "Adding More Messaging Channels" },
    { "@type": "HowToStep", name: "Keeping Things Running" },
    { "@type": "HowToStep", name: "Updating OpenClaw" },
    { "@type": "HowToStep", name: "Your Server and Billing" },
    { "@type": "HowToStep", name: "Troubleshooting" },
    { "@type": "HowToStep", name: "Security Basics" },
    { "@type": "HowToStep", name: "Getting Help" },
  ],
};

export default function GuidePage() {
  const markdown = getGuideMarkdown();
  const toc = getGuideToc(markdown);

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }} />
      <header className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-muted hover:text-foreground text-sm font-medium"
          >
            ← HoldMyClaw
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/setup" className="text-muted hover:text-foreground">
              Deploy
            </Link>
            <Link href="/faq" className="text-muted hover:text-foreground">
              FAQ
            </Link>
            <Link href="/contact" className="text-muted hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12">
        {/* Sticky TOC — desktop */}
        <aside className="lg:w-56 shrink-0 hidden lg:block">
          <nav
            className="sticky top-8 text-sm"
            aria-label="Table of contents"
          >
            <p className="font-medium text-foreground mb-3">On this page</p>
            <ul className="space-y-1.5">
              {toc.map((entry) => (
                <li
                  key={entry.slug}
                  className={entry.level === 3 ? "pl-4" : undefined}
                >
                  <a
                    href={`#${entry.slug}`}
                    className="text-muted hover:text-foreground hover:underline"
                  >
                    {entry.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 flex-1 max-w-3xl">
          <GuideBody markdown={markdown} />
        </article>
      </div>
    </main>
  );
}
