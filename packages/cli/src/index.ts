#!/usr/bin/env node
/**
 * HoldMyClaw CLI — Deploy OpenClaw in 5 minutes.
 * See ProductPlan.md — CLI Flow, Phase 4.
 */

import { createCommand } from "commander";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import {
  getProvider,
  provisionCloud,
  generateEd25519KeyPair,
  generateLocalDockerFiles,
  pollUntilReady,
  validateCloudProviderKeyFormat,
  validateChannelToken,
  validateLlmApiKeyFormat,
  type CloudProviderId,
} from "@holdmyclaw/core";
import { loadCloudInitTemplate, loadConfigTemplate } from "./load-templates.js";
import { runPrompts, type PromptAnswers } from "./prompts.js";

const KEYS_DIR = join(homedir(), ".holdmyclaw", "keys");
const DEFAULT_OUTPUT_DIR = "openclaw";

function ensureKeysDir(): void {
  if (!existsSync(KEYS_DIR)) {
    mkdirSync(KEYS_DIR, { recursive: true });
  }
}

function logStep(step: string, status: "pending" | "ok" | "fail", duration?: number): void {
  const icon = status === "ok" ? "✓" : status === "fail" ? "✗" : "●";
  const suffix = duration != null ? `  ${duration}s` : "";
  console.log(`  ${icon} ${step}${suffix}`);
}

async function validateAndReport(
  answers: PromptAnswers
): Promise<{ ok: boolean }> {
  if (answers.deployTarget !== "local") {
    const format = validateCloudProviderKeyFormat(
      answers.deployTarget as CloudProviderId,
      answers.providerApiKey
    );
    if (!format.valid) {
      console.log(`  ✗ ${format.error}`);
      return { ok: false };
    }
    try {
      const provider = getProvider(answers.deployTarget as CloudProviderId);
      const result = await provider.validateApiKey(answers.providerApiKey.trim());
      if (!result.valid) {
        console.log(`  ✗ ${result.error ?? "Invalid API key"}`);
        return { ok: false };
      }
      console.log(`  ✓ ${provider.displayName} API key validated`);
    } catch (e) {
      console.log(`  ✗ ${e instanceof Error ? e.message : "Validation failed"}`);
      return { ok: false };
    }
  }

  const llmFormat = validateLlmApiKeyFormat(answers.llmProvider, answers.llmApiKey);
  if (!llmFormat.valid && answers.llmProvider !== "ollama") {
    console.log(`  ✗ ${llmFormat.error}`);
    return { ok: false };
  }
  if (answers.llmProvider !== "ollama") {
    console.log("  ✓ LLM API key format OK");
  }

  if (answers.channel !== "whatsapp") {
    const ch = validateChannelToken(answers.channel, answers.channelToken);
    if (!ch.valid) {
      console.log(`  ✗ ${ch.error}`);
      return { ok: false };
    }
  }
  console.log("  ✓ Channel token format OK");
  return { ok: true };
}

async function runCloudDeploy(answers: PromptAnswers): Promise<void> {
  const providerId = answers.deployTarget as CloudProviderId;
  const provider = getProvider(providerId);

  console.log("\nDeploying to " + provider.displayName + " ...\n");

  const t0 = Date.now();
  logStep("Generating SSH key", "pending");
  const keyPair = generateEd25519KeyPair();
  ensureKeysDir();
  const keyPath = join(KEYS_DIR, "openclaw.pem");
  writeFileSync(keyPath, keyPair.privateKeyPem, { mode: 0o600 });
  logStep("SSH key saved to ~/.holdmyclaw/keys/openclaw.pem", "ok", (Date.now() - t0) / 1000);

  const t1 = Date.now();
  logStep("Loading templates", "pending");
  const cloudInitContent = loadCloudInitTemplate();
  const configContent = loadConfigTemplate(answers.llmProvider, answers.channel);
  logStep("Templates loaded", "ok", (Date.now() - t1) / 1000);

  const t2 = Date.now();
  logStep("Creating server on " + provider.displayName, "pending");
  const result = await provisionCloud({
    provider: providerId,
    providerApiKey: answers.providerApiKey.trim(),
    region: answers.region || undefined,
    llmProvider: answers.llmProvider,
    llmApiKey: answers.llmApiKey.trim(),
    channel: answers.channel,
    channelToken: answers.channelToken.trim(),
    sshPublicKey: keyPair.publicKey,
    personality: answers.personality,
    agentName: answers.agentName,
    agentEmoji: answers.agentEmoji,
    dmPolicy: answers.dmPolicy,
    cloudInitTemplateContent: cloudInitContent,
    configTemplateContent: configContent,
  });
  logStep("Server created (" + result.serverIp + ")", "ok", (Date.now() - t2) / 1000);

  logStep("Waiting for OpenClaw to be ready (this may take 2–4 minutes)", "pending");
  const startTime = Date.now();
  const status = await pollUntilReady(
    async () => result.serverIp,
    async (ip: string) => {
      try {
        const res = await fetch(`http://${ip}/health`, { signal: AbortSignal.timeout(5000) });
        const data = (await res.json()) as { ok?: boolean };
        return data?.ok === true;
      } catch {
        return false;
      }
    },
    { startTime, timeoutSec: 600, intervalMs: 10_000 }
  );
  if (status.ready) {
    logStep("OpenClaw is live!", "ok", status.elapsed);
  } else {
    logStep("Timeout waiting for health check; server may still be starting", "fail", status.elapsed);
  }

  const dashboardUrl = `http://${result.serverIp}:18789`;
  const guideUrl = "https://holdmyclaw.com/guide";

  console.log("\n  ✓ Your OpenClaw agent is live!\n");
  console.log("  Server IP:    " + result.serverIp);
  console.log("  SSH:          ssh openclaw@" + result.serverIp + " -i " + keyPath);
  console.log("  Dashboard:    " + dashboardUrl);
  console.log("  Console:      " + result.consoleUrl);
  console.log("  Guide:        " + guideUrl);
  console.log("\n  Send a message to your " + answers.channel + " bot to test it!\n");
}

async function runLocalDeploy(answers: PromptAnswers): Promise<void> {
  const configContent = loadConfigTemplate(answers.llmProvider, answers.channel);
  const files = generateLocalDockerFiles(
    {
      target: "local",
      llmProvider: answers.llmProvider,
      llmApiKey: answers.llmApiKey.trim(),
      channel: answers.channel,
      channelToken: answers.channelToken.trim(),
      personality: answers.personality,
      agentName: answers.agentName,
      agentEmoji: answers.agentEmoji,
      dmPolicy: answers.dmPolicy,
    },
    configContent
  );

  const outDir = join(process.cwd(), DEFAULT_OUTPUT_DIR);
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  const configDir = join(outDir, "config");
  const workspaceDir = join(outDir, "workspace");
  if (!existsSync(configDir)) mkdirSync(configDir, { recursive: true });
  if (!existsSync(workspaceDir)) mkdirSync(workspaceDir, { recursive: true });

  writeFileSync(join(outDir, ".env"), files.env);
  writeFileSync(join(outDir, "docker-compose.yml"), files.dockerComposeYaml);
  writeFileSync(join(configDir, "openclaw.json"), files.openclawJson);
  if (files.soulMd) {
    writeFileSync(join(workspaceDir, "SOUL.md"), files.soulMd);
  }
  if (files.identityMd) {
    writeFileSync(join(workspaceDir, "IDENTITY.md"), files.identityMd);
  }

  console.log("\n  ✓ Setup files written to " + outDir + "\n");
  console.log("  Next steps:");
  console.log("    cd " + outDir);
  console.log("    docker compose up -d");
  console.log("    Open http://localhost:18789 to access your agent dashboard.");
  console.log("\n  Guide: https://holdmyclaw.com/guide\n");
}

async function run(): Promise<void> {
  console.log("\n  HoldMyClaw - Deploy OpenClaw in 5 minutes\n");

  const answers = await runPrompts();
  const validation = await validateAndReport(answers);
  if (!validation.ok) {
    process.exitCode = 1;
    return;
  }

  if (answers.deployTarget === "local") {
    await runLocalDeploy(answers);
  } else {
    await runCloudDeploy(answers);
  }
}

const program = createCommand();

program
  .name("holdmyclaw")
  .description("Deploy OpenClaw on your own server or locally in 5 minutes.")
  .version("0.0.1")
  .action(run);

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
