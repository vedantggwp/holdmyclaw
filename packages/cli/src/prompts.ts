/**
 * Interactive prompts for HoldMyClaw CLI.
 * See ProductPlan.md — CLI Flow.
 */

import { select, input, password, confirm } from "@inquirer/prompts";
import type { CloudProviderId, LLMProvider, Channel } from "@holdmyclaw/core";

export type DeployTarget = "hetzner" | "digitalocean" | "local";

export interface PromptAnswers {
  deployTarget: DeployTarget;
  providerApiKey: string;
  region: string;
  llmProvider: LLMProvider;
  llmApiKey: string;
  channel: Channel;
  channelToken: string;
  personality?: string;
  agentName?: string;
  agentEmoji?: string;
  dmPolicy: "pairing" | "open";
}

const DEPLOY_TARGET_CHOICES = [
  { name: "Hetzner (cloud — from $4/month)", value: "hetzner" as DeployTarget },
  { name: "DigitalOcean (cloud — from $6/month)", value: "digitalocean" as DeployTarget },
  { name: "My Computer (local — free, requires Docker)", value: "local" as DeployTarget },
];

const LLM_CHOICES: { name: string; value: LLMProvider }[] = [
  { name: "Anthropic Claude", value: "anthropic" },
  { name: "OpenAI", value: "openai" },
  { name: "Google Gemini", value: "google" },
  { name: "OpenRouter", value: "openrouter" },
  { name: "Ollama (local)", value: "ollama" },
];

const CHANNEL_CHOICES: { name: string; value: Channel }[] = [
  { name: "Telegram", value: "telegram" },
  { name: "WhatsApp", value: "whatsapp" },
  { name: "Discord", value: "discord" },
];

export async function promptDeployTarget(): Promise<DeployTarget> {
  return select<DeployTarget>({
    message: "Where to deploy?",
    choices: DEPLOY_TARGET_CHOICES,
  });
}

export async function promptProviderApiKey(provider: "hetzner" | "digitalocean"): Promise<string> {
  const label = provider === "hetzner" ? "Hetzner" : "DigitalOcean";
  return password({
    message: `${label} API key:`,
    mask: "*",
  });
}

export async function promptRegion(
  provider: "hetzner" | "digitalocean",
  getRegions: () => { id: string; name: string }[]
): Promise<string> {
  const regions = getRegions();
  if (regions.length === 0) return "";
  if (regions.length === 1) return regions[0].id;
  const choices = regions.map((r) => ({ name: r.name, value: r.id }));
  return select({
    message: "Region:",
    choices,
    default: regions[0].id,
  });
}

export async function promptLlmProvider(): Promise<LLMProvider> {
  return select<LLMProvider>({
    message: "LLM Provider:",
    choices: LLM_CHOICES,
  });
}

export async function promptLlmApiKey(provider: LLMProvider): Promise<string> {
  if (provider === "ollama") {
    return input({
      message: "Ollama base URL (or leave blank for http://localhost:11434):",
      default: "http://localhost:11434",
    });
  }
  return password({
    message: `${provider === "anthropic" ? "Anthropic" : provider === "openai" ? "OpenAI" : provider === "google" ? "Google" : "OpenRouter"} API key:`,
    mask: "*",
  });
}

export async function promptChannel(): Promise<Channel> {
  return select<Channel>({
    message: "Messaging channel:",
    choices: CHANNEL_CHOICES,
  });
}

export async function promptChannelToken(channel: Channel): Promise<string> {
  if (channel === "whatsapp") {
    return ""; // WhatsApp uses QR pairing post-deploy
  }
  const label = channel === "telegram" ? "Telegram bot token" : "Discord bot token";
  return password({
    message: `${label}:`,
    mask: "*",
  });
}

export async function promptCustomization(): Promise<{
  personality?: string;
  agentName?: string;
  agentEmoji?: string;
  dmPolicy: "pairing" | "open";
}> {
  const doCustomize = await confirm({
    message: "Customize agent (name, personality, who can message)?",
    default: false,
  });
  let personality: string | undefined;
  let agentName: string | undefined;
  let agentEmoji: string | undefined;
  let dmPolicy: "pairing" | "open" = "pairing";

  if (doCustomize) {
    agentName = await input({
      message: "Agent name (e.g. Jarvis):",
      default: "",
    });
    if (!agentName?.trim()) agentName = undefined;
    agentEmoji = await input({
      message: "Agent emoji (e.g. 🤖):",
      default: "",
    });
    if (!agentEmoji?.trim()) agentEmoji = undefined;
    personality = await input({
      message: "Personality / SOUL (optional, one line):",
      default: "",
    });
    if (!personality?.trim()) personality = undefined;
    const openDm = await confirm({
      message: "Allow anyone to message the bot? (No = only you after pairing)",
      default: false,
    });
    dmPolicy = openDm ? "open" : "pairing";
  }
  return { personality, agentName, agentEmoji, dmPolicy };
}

export async function runPrompts(): Promise<PromptAnswers> {
  const deployTarget = await promptDeployTarget();

  let providerApiKey = "";
  let region = "";

  if (deployTarget !== "local") {
    providerApiKey = await promptProviderApiKey(deployTarget);
    const { getProvider } = await import("@holdmyclaw/core");
    const provider = getProvider(deployTarget);
    region = await promptRegion(deployTarget, () => provider.getRegions());
  }

  const llmProvider = await promptLlmProvider();
  const llmApiKey = await promptLlmApiKey(llmProvider);
  const channel = await promptChannel();
  const channelToken = await promptChannelToken(channel);
  const customization = await promptCustomization();

  return {
    deployTarget,
    providerApiKey,
    region,
    llmProvider,
    llmApiKey,
    channel,
    channelToken,
    personality: customization.personality,
    agentName: customization.agentName,
    agentEmoji: customization.agentEmoji,
    dmPolicy: customization.dmPolicy,
  };
}
