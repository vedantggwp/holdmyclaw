/**
 * POST /api/validate — Real-time validation of API keys and tokens.
 * See ProductPlan.md — API Contracts.
 */

import { NextResponse } from "next/server";
import {
  getProvider,
  validateTelegramToken,
  validateDiscordToken,
  validateLlmApiKeyFormat,
  validateCloudProviderKeyFormat,
  type CloudProviderId,
  type LLMProvider,
} from "@holdmyclaw/core";

interface ValidateBody {
  type?: string;
  provider?: string;
  apiKey?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ValidateBody;
    const { type, provider, apiKey } = body;

    if (!type || !apiKey) {
      return NextResponse.json(
        { valid: false, error: "Missing type or apiKey" },
        { status: 400 }
      );
    }

    const key = String(apiKey).trim();

    if (type === "cloud_provider") {
      const p = provider as CloudProviderId | undefined;
      if (p !== "hetzner" && p !== "digitalocean") {
        return NextResponse.json({ valid: false, error: "Invalid provider" });
      }
      const formatResult = validateCloudProviderKeyFormat(p, key);
      if (!formatResult.valid) {
        return NextResponse.json({ valid: false, error: formatResult.error });
      }
      const cloudProvider = getProvider(p);
      const result = await cloudProvider.validateApiKey(key);
      return NextResponse.json({
        valid: result.valid,
        error: result.error,
        detail: result.detail,
      });
    }

    if (type === "llm") {
      const p = (provider ?? "anthropic") as LLMProvider;
      const result = validateLlmApiKeyFormat(p, key);
      return NextResponse.json({ valid: result.valid, error: result.error });
    }

    if (type === "telegram") {
      const result = validateTelegramToken(key);
      return NextResponse.json({ valid: result.valid, error: result.error });
    }

    if (type === "discord") {
      const result = validateDiscordToken(key);
      return NextResponse.json({ valid: result.valid, error: result.error });
    }

    return NextResponse.json(
      { valid: false, error: "Unknown validation type" },
      { status: 400 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Validation failed";
    return NextResponse.json(
      { valid: false, error: message },
      { status: 500 }
    );
  }
}
