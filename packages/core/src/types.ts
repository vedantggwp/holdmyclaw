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
