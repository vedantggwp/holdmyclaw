/**
 * Provisioning pipeline — orchestrate cloud deploy or local file generation.
 * See ProductPlan.md — Provisioning Pipeline.
 */

import { randomBytes } from "crypto";
import type { DeployInputCloud, CreateServerResult } from "./types.js";
import { getProvider } from "./providers/index.js";
import {
  renderOpenClawConfig,
  OPENCLAW_VERSION_DEFAULT,
  type OpenClawConfigVars,
} from "./openclaw-config.js";
import {
  generateCloudInitScript,
  buildSoulMdBlock,
  buildIdentityMdBlock,
  type CloudInitVars,
} from "./cloud-init.js";

export interface ProvisionCloudInput extends DeployInputCloud {
  /** Raw cloud-init.sh template content. */
  cloudInitTemplateContent: string;
  /** Raw openclaw config template (e.g. anthropic-telegram.json5). */
  configTemplateContent: string;
}

export interface ProvisionCloudResult extends CreateServerResult {
  statusToken: string;
  consoleUrl: string;
}

const OPENCLAW_VERSION = OPENCLAW_VERSION_DEFAULT;

/**
 * Run cloud provisioning: generate cloud-init script, create server via provider API.
 * Caller must load cloudInitTemplateContent and configTemplateContent from templates.
 */
export async function provisionCloud(
  input: ProvisionCloudInput
): Promise<ProvisionCloudResult> {
  const gatewayToken = randomBytes(32).toString("hex");
  const dmPolicy = input.dmPolicy ?? "pairing";

  const configVars: OpenClawConfigVars = {
    OPENCLAW_GATEWAY_TOKEN: gatewayToken,
    LLM_API_KEY: input.llmApiKey,
    CHANNEL_TOKEN: input.channelToken,
    DM_POLICY: dmPolicy,
  };

  const openclawConfigJson = renderOpenClawConfig(
    input.configTemplateContent,
    configVars
  );

  const soulBlock = buildSoulMdBlock(input.personality);
  const identityBlock = buildIdentityMdBlock(
    input.agentName,
    input.agentEmoji
  );

  const cloudInitVars: CloudInitVars = {
    SSH_PUBLIC_KEY: input.sshPublicKey,
    OPENCLAW_GATEWAY_TOKEN: gatewayToken,
    OPENCLAW_CONFIG_JSON: openclawConfigJson,
    OPENCLAW_VERSION,
    SOUL_MD_BLOCK: soulBlock,
    IDENTITY_MD_BLOCK: identityBlock,
  };

  const cloudInitScript = generateCloudInitScript(
    input.cloudInitTemplateContent,
    cloudInitVars
  );

  const provider = getProvider(input.provider);
  const region = input.region ?? provider.getRegions()[0]?.id ?? "";
  const serverType = provider.getServerTypes()[0]?.id ?? "";
  const name = "openclaw";

  const result = await provider.createServer({
    apiKey: input.providerApiKey,
    sshPublicKey: input.sshPublicKey,
    cloudInitScript,
    region,
    serverType,
    name,
  });

  const statusToken = randomBytes(16).toString("hex");
  const consoleUrl = provider.getConsoleUrl(result.serverId);

  return {
    ...result,
    statusToken,
    consoleUrl,
  };
}
