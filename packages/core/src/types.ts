/**
 * Shared types for HoldMyClaw provisioning pipeline.
 * See ProductPlan.md for full API contracts.
 */

export type CloudProviderId = "hetzner" | "digitalocean";
export type LLMProvider = "anthropic" | "openai" | "google" | "openrouter" | "ollama";
export type Channel = "telegram" | "whatsapp" | "discord";

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detail?: string;
}

export interface CreateServerResult {
  serverId: string;
  serverIp: string;
}

export interface ServerStatus {
  ready: boolean;
  elapsed: number;
  timedOut: boolean;
}

/** Input for cloud deployment (API / deploy pipeline). */
export interface DeployInputCloud {
  provider: CloudProviderId;
  providerApiKey: string;
  region?: string;
  llmProvider: LLMProvider;
  llmApiKey: string;
  channel: Channel;
  channelToken: string;
  sshPublicKey: string;
  personality?: string;
  agentName?: string;
  agentEmoji?: string;
  dmPolicy?: "pairing" | "open";
  skills?: string[];
}

/** Input for local Docker (file generation only). */
export interface DeployInputLocal {
  target: "local";
  llmProvider: LLMProvider;
  llmApiKey: string;
  channel: Channel;
  channelToken: string;
  personality?: string;
  agentName?: string;
  agentEmoji?: string;
  dmPolicy?: "pairing" | "open";
  skills?: string[];
}
