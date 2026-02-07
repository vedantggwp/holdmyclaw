/**
 * FAQ content per ProductPlan.md Part 5 Section A.
 */

export const faqItems: { question: string; answer: string }[] = [
  {
    question: "What is HoldMyClaw?",
    answer:
      "A free setup wizard that deploys OpenClaw on your own cloud server or local computer. We configure everything, and you own it completely. We don't manage anything after setup.",
  },
  {
    question: "What do I need before starting?",
    answer:
      "A cloud account (Hetzner or DigitalOcean — we walk you through creating one) OR Docker Desktop installed on your computer; an API key from your LLM provider (OpenAI, Anthropic, Google, etc.); and a Telegram/WhatsApp/Discord account for your bot's messaging channel.",
  },
  {
    question: "Which cloud providers do you support?",
    answer:
      "Hetzner and DigitalOcean at launch, with more providers coming soon. You can also run locally on your own computer with Docker — it's free and works while your computer is on.",
  },
  {
    question: "How long does setup take?",
    answer:
      "About 5 minutes total for cloud. The wizard guides you through each step. Deployment itself takes 2-3 minutes. Local Docker setup is even faster — under 2 minutes.",
  },
  {
    question: "How much does it cost?",
    answer:
      "HoldMyClaw is free. Your only ongoing costs are: cloud server (~$4/month on Hetzner, ~$6/month on DigitalOcean, billed directly by the provider) or $0 if running locally; LLM API usage (varies, typically $10-80/month). We accept optional tips but it's never required.",
  },
  {
    question: "Can I run it on my own computer?",
    answer:
      "Yes! Choose \"My Computer\" in the wizard. You'll need Docker Desktop installed. The wizard generates all the config files, and you run docker compose up -d. Your agent runs while your computer is on.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. The wizard handles everything. After setup, we give you a guide covering the basics: restarting your agent, updating it, and basic troubleshooting. If you can follow step-by-step instructions, you can manage it.",
  },
  {
    question: "What if I need help after setup?",
    answer:
      "We provide a comprehensive \"Managing Your OpenClaw\" guide. Beyond that, the OpenClaw community (GitHub Discussions, Discord, Reddit) is active and helpful. We're a setup tool, not a support service — but the guide covers the most common scenarios.",
  },
  {
    question: "Can I add more messaging channels later?",
    answer:
      "Yes. OpenClaw supports 12+ platforms. We set up your first channel during the wizard. The guide explains how to add more.",
  },
  {
    question: "What about security?",
    answer:
      "For cloud deployments, we apply security hardening automatically: firewall (UFW), brute-force protection (fail2ban), SSH-only access, non-root user. Your API keys are stored as environment variables on your server, never on ours. We don't retain any of your credentials after setup.",
  },
  {
    question: "Can I install OpenClaw skills/plugins?",
    answer:
      "Yes. We pre-install ClawHub (the skill registry) so you can discover and install any of 3,000+ community skills. The guide explains how. Note: always review skills before enabling them — a small percentage may contain malicious instructions.",
  },
  {
    question: "What about WhatsApp? Is it safe?",
    answer:
      "WhatsApp connects via Linked Devices — the same mechanism as WhatsApp Web. No Meta Business account needed. However, automated messaging may technically violate WhatsApp's Terms of Service, which could lead to account restrictions. We recommend using a secondary phone number if this concerns you.",
  },
  {
    question: "What happens if HoldMyClaw shuts down?",
    answer:
      "Nothing changes for you. Your agent runs on YOUR server (or your computer). There's zero dependency on us after setup. That's the whole point.",
  },
];
