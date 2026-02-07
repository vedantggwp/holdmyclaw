/**
 * POST /api/deploy — Create cloud server via provider API.
 * See ProductPlan.md — API Contracts.
 */

import { NextResponse } from "next/server";
import { provisionCloud, type LLMProvider, type Channel } from "@holdmyclaw/core";
import { loadCloudInitTemplate, loadConfigTemplate } from "../../../lib/server/load-templates";

/** Vercel Hobby limit is 10s; Pro allows 60s. Provider create-server is typically 1–5s. */
export const maxDuration = 10;

interface DeployBody {
  provider?: string;
  providerApiKey?: string;
  region?: string;
  llmProvider?: string;
  llmApiKey?: string;
  channel?: string;
  channelToken?: string;
  sshPublicKey?: string;
  personality?: string;
  agentName?: string;
  agentEmoji?: string;
  dmPolicy?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DeployBody;
    const {
      provider,
      providerApiKey,
      region,
      llmProvider,
      llmApiKey,
      channel,
      channelToken,
      sshPublicKey,
      personality,
      agentName,
      agentEmoji,
      dmPolicy,
    } = body;

    if (
      !provider ||
      !providerApiKey ||
      !llmProvider ||
      !llmApiKey ||
      !channel ||
      !channelToken ||
      !sshPublicKey
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", code: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    if (provider !== "hetzner" && provider !== "digitalocean") {
      return NextResponse.json(
        { success: false, error: "Invalid provider", code: "INVALID_PROVIDER_KEY" },
        { status: 400 }
      );
    }

    const cloudInitContent = loadCloudInitTemplate();
    const configContent = loadConfigTemplate(llmProvider, channel);

    const result = await provisionCloud({
      provider: provider as "hetzner" | "digitalocean",
      providerApiKey: String(providerApiKey).trim(),
      region: region ? String(region) : undefined,
      llmProvider: llmProvider as LLMProvider,
      llmApiKey: String(llmApiKey).trim(),
      channel: channel as Channel,
      channelToken: String(channelToken).trim(),
      sshPublicKey: String(sshPublicKey).trim(),
      personality: personality ? String(personality) : undefined,
      agentName: agentName ? String(agentName) : undefined,
      agentEmoji: agentEmoji ? String(agentEmoji) : undefined,
      dmPolicy: dmPolicy === "open" ? "open" : "pairing",
      cloudInitTemplateContent: cloudInitContent,
      configTemplateContent: configContent,
    });

    return NextResponse.json({
      success: true,
      serverId: result.serverId,
      serverIp: result.serverIp,
      statusToken: result.statusToken,
      consoleUrl: result.consoleUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server create failed";
    const code = message.includes("valid") ? "INVALID_PROVIDER_KEY" : "SERVER_CREATE_FAILED";
    return NextResponse.json(
      { success: false, error: message, code },
      { status: 500 }
    );
  }
}
