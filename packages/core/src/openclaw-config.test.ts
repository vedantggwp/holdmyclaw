import { describe, it, expect } from "vitest";
import {
  substituteVars,
  renderOpenClawConfig,
  renderEnvFile,
  getDockerComposeYaml,
  getConfigTemplateName,
  OPENCLAW_VERSION_DEFAULT,
} from "./openclaw-config.js";

describe("openclaw-config", () => {
  describe("substituteVars", () => {
    it("replaces ${VAR} placeholders", () => {
      expect(substituteVars("hello ${NAME}", { NAME: "world" })).toBe("hello world");
    });
    it("replaces multiple occurrences", () => {
      expect(substituteVars("${X} and ${X}", { X: "a" })).toBe("a and a");
    });
    it("leaves unknown placeholders unchanged", () => {
      expect(substituteVars("${UNKNOWN}", {})).toBe("${UNKNOWN}");
    });
  });

  describe("renderOpenClawConfig", () => {
    it("substitutes gateway token and LLM key", () => {
      const template = '{"gateway":{"auth":{"token":"${OPENCLAW_GATEWAY_TOKEN}"}},"env":{"X":"${LLM_API_KEY}"}';
      const out = renderOpenClawConfig(template, {
        OPENCLAW_GATEWAY_TOKEN: "abc",
        LLM_API_KEY: "sk-xyz",
        CHANNEL_TOKEN: "t",
        DM_POLICY: "pairing",
      });
      expect(out).toContain("abc");
      expect(out).toContain("sk-xyz");
    });
  });

  describe("renderEnvFile", () => {
    it("outputs OPENCLAW_GATEWAY_TOKEN and OPENCLAW_VERSION", () => {
      const out = renderEnvFile({ OPENCLAW_GATEWAY_TOKEN: "secret" });
      expect(out).toContain("OPENCLAW_GATEWAY_TOKEN=secret");
      expect(out).toContain("OPENCLAW_VERSION=");
    });
    it("uses default version when not provided", () => {
      const out = renderEnvFile({ OPENCLAW_GATEWAY_TOKEN: "x" });
      expect(out).toContain(OPENCLAW_VERSION_DEFAULT);
    });
  });

  describe("getDockerComposeYaml", () => {
    it("returns YAML with openclaw-gateway and openclaw-cli services", () => {
      const yaml = getDockerComposeYaml();
      expect(yaml).toContain("openclaw-gateway");
      expect(yaml).toContain("openclaw-cli");
      expect(yaml).toContain("ghcr.io/openclaw/openclaw");
    });
  });

  describe("getConfigTemplateName", () => {
    it("returns llm-channel", () => {
      expect(getConfigTemplateName("anthropic", "telegram")).toBe("anthropic-telegram");
      expect(getConfigTemplateName("openai", "discord")).toBe("openai-discord");
    });
  });
});
