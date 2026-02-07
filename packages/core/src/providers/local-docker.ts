/**
 * Local Docker file generator (no API calls).
 * See ProductPlan.md — Local Docker Deployment Flow.
 */

import type { DeployInputLocal } from "../types.js";
import {
  getConfigTemplateName,
  renderOpenClawConfig,
  renderEnvFile,
  getDockerComposeYaml,
  OPENCLAW_VERSION_DEFAULT,
  type OpenClawConfigVars,
} from "../openclaw-config.js";
import { randomBytes } from "crypto";
import { buildIdentityMdBlock } from "../cloud-init.js";

export interface LocalDockerFiles {
  env: string;
  dockerComposeYaml: string;
  openclawJson: string;
  soulMd: string | null;
  identityMd: string | null;
}

const DEFAULT_SOUL =
  "Be helpful and concise. Use casual language. Focus on getting things done.";

/**
 * Generate file contents for local Docker deployment.
 * Caller must provide config template content (e.g. from templates/configs/<llm>-<channel>.json5).
 */
export function generateLocalDockerFiles(
  input: DeployInputLocal,
  configTemplateContent: string
): LocalDockerFiles {
  const gatewayToken = randomBytes(32).toString("hex");
  const dmPolicy = input.dmPolicy ?? "pairing";

  const configVars: OpenClawConfigVars = {
    OPENCLAW_GATEWAY_TOKEN: gatewayToken,
    LLM_API_KEY: input.llmApiKey,
    CHANNEL_TOKEN: input.channelToken,
    DM_POLICY: dmPolicy,
  };

  const openclawJson = renderOpenClawConfig(configTemplateContent, configVars);

  const env = renderEnvFile({
    OPENCLAW_GATEWAY_TOKEN: gatewayToken,
    OPENCLAW_VERSION: OPENCLAW_VERSION_DEFAULT,
  });

  const dockerComposeYaml = getDockerComposeYaml();

  const soulMd = input.personality?.trim() ? input.personality.trim() : DEFAULT_SOUL;
  const identityLines: string[] = [];
  if (input.agentName?.trim()) identityLines.push(`name: ${input.agentName.trim()}`);
  if (input.agentEmoji?.trim()) identityLines.push(`emoji: ${input.agentEmoji.trim()}`);
  const identityMd = identityLines.length > 0 ? identityLines.join("\n") : null;

  return {
    env,
    dockerComposeYaml,
    openclawJson,
    soulMd,
    identityMd,
  };
}

/** Get config template name for local deploy (for caller to load file). */
export function getLocalConfigTemplateName(
  input: Pick<DeployInputLocal, "llmProvider" | "channel">
): string {
  return getConfigTemplateName(input.llmProvider, input.channel);
}

export { buildIdentityMdBlock };
