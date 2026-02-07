/**
 * Input validation (API keys, tokens).
 * See ProductPlan.md — Validation Regex Patterns, API validation.
 */

import type { LLMProvider, Channel, CloudProviderId, ValidationResult } from "./types.js";

// Format validation (regex)
const TELEGRAM_BOT_TOKEN = /^\d{8,10}:[A-Za-z0-9_-]{35}$/;
const DISCORD_BOT_TOKEN = /^[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{27,}$/;
const ANTHROPIC_API_KEY = /^sk-ant-[A-Za-z0-9_-]{20,}$/;
const OPENAI_API_KEY = /^sk-[A-Za-z0-9_-]{20,}$/;
const OPENROUTER_API_KEY = /^sk-or-[A-Za-z0-9_-]{20,}$/;
const GOOGLE_API_KEY = /^AIza[A-Za-z0-9_-]{30,}$/;
const HETZNER_API_KEY = /^[A-Za-z0-9]{64}$/;

export function validateTelegramToken(token: string): ValidationResult {
  if (!token?.trim()) return { valid: false, error: "Token is required" };
  if (!TELEGRAM_BOT_TOKEN.test(token.trim())) {
    return {
      valid: false,
      error: "Invalid Telegram bot token format. Get it from @BotFather (e.g. 123456789:ABC...).",
    };
  }
  return { valid: true };
}

export function validateDiscordToken(token: string): ValidationResult {
  if (!token?.trim()) return { valid: false, error: "Token is required" };
  if (!DISCORD_BOT_TOKEN.test(token.trim())) {
    return {
      valid: false,
      error: "Invalid Discord bot token format. Get it from the Developer Portal.",
    };
  }
  return { valid: true };
}

export function validateChannelToken(
  channel: Channel,
  token: string
): ValidationResult {
  if (channel === "whatsapp") {
    // WhatsApp uses QR pairing; no token to validate
    return { valid: true };
  }
  if (channel === "telegram") return validateTelegramToken(token);
  if (channel === "discord") return validateDiscordToken(token);
  return { valid: false, error: "Unknown channel" };
}

export function validateLlmApiKeyFormat(
  provider: LLMProvider,
  key: string
): ValidationResult {
  if (!key?.trim()) return { valid: false, error: "API key is required" };
  const trimmed = key.trim();
  switch (provider) {
    case "anthropic":
      if (!ANTHROPIC_API_KEY.test(trimmed))
        return { valid: false, error: "Invalid Anthropic API key format (expected sk-ant-...)." };
      break;
    case "openai":
      if (!OPENAI_API_KEY.test(trimmed))
        return { valid: false, error: "Invalid OpenAI API key format (expected sk-...)." };
      break;
    case "openrouter":
      if (!OPENROUTER_API_KEY.test(trimmed))
        return { valid: false, error: "Invalid OpenRouter API key format (expected sk-or-...)." };
      break;
    case "google":
      if (!GOOGLE_API_KEY.test(trimmed))
        return { valid: false, error: "Invalid Google API key format (expected AIza...)." };
      break;
    case "ollama":
      // Ollama is local; no key or arbitrary key
      break;
    default:
      return { valid: false, error: "Unknown LLM provider" };
  }
  return { valid: true };
}

export function validateCloudProviderKeyFormat(
  provider: CloudProviderId,
  key: string
): ValidationResult {
  if (!key?.trim()) return { valid: false, error: "API key is required" };
  if (provider === "hetzner" && !HETZNER_API_KEY.test(key.trim())) {
    return {
      valid: false,
      error: "Invalid Hetzner API key format (64-character alphanumeric).",
    };
  }
  // DigitalOcean has no reliable regex; validated via API only
  if (provider === "digitalocean") return { valid: true };
  return { valid: true };
}
