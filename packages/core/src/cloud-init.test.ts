import { describe, it, expect } from "vitest";
import {
  generateCloudInitScript,
  buildSoulMdBlock,
  buildIdentityMdBlock,
} from "./cloud-init.js";

describe("cloud-init", () => {
  describe("generateCloudInitScript", () => {
    it("substitutes SSH_PUBLIC_KEY and OPENCLAW_GATEWAY_TOKEN", () => {
      const template = "ssh_key=${SSH_PUBLIC_KEY}\ntoken=${OPENCLAW_GATEWAY_TOKEN}";
      const out = generateCloudInitScript(template, {
        SSH_PUBLIC_KEY: "ssh-ed25519 AAAA",
        OPENCLAW_GATEWAY_TOKEN: "abc",
        OPENCLAW_CONFIG_JSON: "{}",
        OPENCLAW_VERSION: "2026.2.6-3",
        SOUL_MD_BLOCK: "",
        IDENTITY_MD_BLOCK: "",
      });
      expect(out).toContain("ssh-ed25519 AAAA");
      expect(out).toContain("abc");
    });
    it("inserts SOUL_MD_BLOCK and IDENTITY_MD_BLOCK", () => {
      const template = "before\n${SOUL_MD_BLOCK}\n${IDENTITY_MD_BLOCK}\nafter";
      const soul = "echo soul";
      const identity = "echo identity";
      const out = generateCloudInitScript(template, {
        SSH_PUBLIC_KEY: "x",
        OPENCLAW_GATEWAY_TOKEN: "y",
        OPENCLAW_CONFIG_JSON: "{}",
        OPENCLAW_VERSION: "1",
        SOUL_MD_BLOCK: soul,
        IDENTITY_MD_BLOCK: identity,
      });
      expect(out).toContain("echo soul");
      expect(out).toContain("echo identity");
    });
  });

  describe("buildSoulMdBlock", () => {
    it("returns empty string for empty content", () => {
      expect(buildSoulMdBlock("")).toBe("");
      expect(buildSoulMdBlock(undefined)).toBe("");
    });
    it("returns heredoc block for non-empty content", () => {
      const block = buildSoulMdBlock("Be helpful.");
      expect(block).toContain("/opt/openclaw/workspace/SOUL.md");
      expect(block).toContain("Be helpful.");
    });
  });

  describe("buildIdentityMdBlock", () => {
    it("returns empty string when name and emoji are empty", () => {
      expect(buildIdentityMdBlock("", "")).toBe("");
      expect(buildIdentityMdBlock(undefined, undefined)).toBe("");
    });
    it("returns block with name and emoji", () => {
      const block = buildIdentityMdBlock("MyBot", "🤖");
      expect(block).toContain("IDENTITY.md");
      expect(block).toContain("name: MyBot");
      expect(block).toContain("emoji: 🤖");
    });
  });
});
