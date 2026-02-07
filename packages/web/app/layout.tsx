import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HoldMyClaw — Deploy OpenClaw on Your Own Server in 5 Minutes",
  description:
    "Free setup wizard for OpenClaw. Deploy on your own cloud server or locally with Docker. You own everything. No subscription, no lock-in.",
  openGraph: {
    title: "HoldMyClaw — Deploy OpenClaw in 5 Minutes",
    description:
      "Free setup wizard for OpenClaw. Deploy on your own server. You own everything. No subscription, no lock-in.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
