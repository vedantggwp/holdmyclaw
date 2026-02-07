import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://holdmyclaw.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HoldMyClaw — Deploy OpenClaw on Your Own Server in 5 Minutes",
  description:
    "Free setup wizard for OpenClaw. Deploy on your own cloud server or locally with Docker. You own everything. No subscription, no lock-in.",
  openGraph: {
    title: "HoldMyClaw — Deploy OpenClaw in 5 Minutes",
    description:
      "Free setup wizard for OpenClaw. Deploy on your own server. You own everything. No subscription, no lock-in.",
    url: siteUrl,
    siteName: "HoldMyClaw",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "HoldMyClaw — Deploy OpenClaw in 5 Minutes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HoldMyClaw — Deploy OpenClaw in 5 Minutes",
    description: "Free setup wizard for OpenClaw. Deploy on your own server. You own everything. No subscription, no lock-in.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HoldMyClaw",
  description: "Free setup wizard for OpenClaw. Deploy on your own cloud server or locally with Docker.",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
