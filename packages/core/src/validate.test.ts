import { describe, it, expect } from "vitest";
import {
  validateTelegramToken,
  validateDiscordToken,
  validateChannelToken,
  validateLlmApiKeyFormat,
  validateCloudProviderKeyFormat,
} from "./validate.js";

describe("validate", () => {
  describe("validateTelegramToken", () => {
    it("accepts valid Telegram bot token", () => {
      // Format: 8-10 digits : exactly 35 chars (A-Za-z0-9_-)
      const token = "123456789:" + "A".repeat(35);
      expect(validateTelegramToken(token)).toMatchObject({ valid: true });
    });
    it("rejects empty token", () => {
      expect(validateTelegramToken("")).toMatchObject({ valid: false });
    });
    it("rejects invalid format (too short)", () => {
      expect(validateTelegramToken("123:abc")).toMatchObject({ valid: false });
    });
  });

  describe("validateDiscordToken", () => {
    it("accepts valid Discord bot token format", () => {
      // Placeholder format: 24+ . 6 . 27+ (no real secret)
      expect(validateDiscordToken("YOUR_DISCORD_TOKEN_24CHR.XXXXXX.YOUR_REST_27_CHARS_HERE_ABC")).toMatchObject({ valid: true });
    });
    it("rejects empty token", () => {
      expect(validateDiscordToken("")).toMatchObject({ valid: false });
    });
  });

  describe("validateChannelToken", () => {
    it("accepts whatsapp (no token validation)", () => {
      expect(validateChannelToken("whatsapp", "")).toMatchObject({ valid: true });
    });
    it("validates telegram token when channel is telegram", () => {
      const token = "123456789:" + "A".repeat(35);
      expect(validateChannelToken("telegram", token)).toMatchObject({ valid: true });
    });
  });

  describe("validateLlmApiKeyFormat", () => {
    it("accepts valid Anthropic key", () => {
      expect(validateLlmApiKeyFormat("anthropic", "sk-ant-" + "a".repeat(24))).toMatchObject({ valid: true });
    });
    it("accepts valid OpenAI key", () => {
      expect(validateLlmApiKeyFormat("openai", "sk-proj-abc123def456ghi789")).toMatchObject({ valid: true });
    });
    it("rejects empty key", () => {
      expect(validateLlmApiKeyFormat("anthropic", "")).toMatchObject({ valid: false });
    });
  });

  describe("validateCloudProviderKeyFormat", () => {
    it("accepts valid Hetzner 64-char key", () => {
      const key = "a".repeat(64);
      expect(validateCloudProviderKeyFormat("hetzner", key)).toMatchObject({ valid: true });
    });
    it("rejects Hetzner key with wrong length", () => {
      expect(validateCloudProviderKeyFormat("hetzner", "short")).toMatchObject({ valid: false });
    });
    it("accepts any DigitalOcean key (API validation only)", () => {
      expect(validateCloudProviderKeyFormat("digitalocean", "any-token")).toMatchObject({ valid: true });
    });
  });
});
