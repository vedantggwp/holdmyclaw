"use client";

import { useCallback, useState } from "react";
import JSZip from "jszip";
import { generateLocalDockerFiles } from "@holdmyclaw/core";
import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";
import { InlineTutorial } from "./inline-tutorial";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

export function StepDownload({ state }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadZip = useCallback(async () => {
    if (
      !state.llmApiKey.trim() ||
      (state.channel !== "whatsapp" && !state.channelToken.trim())
    ) {
      setError("Missing LLM key or channel token");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/config-template?llm=${encodeURIComponent(state.llmProvider)}&channel=${encodeURIComponent(state.channel)}`
      );
      if (!res.ok) throw new Error("Config template not found");
      const configContent = await res.text();

      const files = generateLocalDockerFiles(
        {
          target: "local",
          llmProvider: state.llmProvider,
          llmApiKey: state.llmApiKey.trim(),
          channel: state.channel,
          channelToken: state.channelToken.trim(),
          personality: state.personality.trim() || undefined,
          agentName: state.agentName.trim() || undefined,
          agentEmoji: state.agentEmoji.trim() || undefined,
          dmPolicy: state.dmPolicy,
        },
        configContent
      );

      const zip = new JSZip();
      zip.file(".env", files.env);
      zip.file("docker-compose.yml", files.dockerComposeYaml);
      zip.file("config/openclaw.json", files.openclawJson);
      if (files.soulMd) zip.file("workspace/SOUL.md", files.soulMd);
      if (files.identityMd) zip.file("workspace/IDENTITY.md", files.identityMd);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "holdmyclaw-setup.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setLoading(false);
    }
  }, [state]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Download setup files
      </h1>
      <p className="text-muted mb-2">
        You need <strong>Docker Desktop</strong> installed and running.{" "}
        <a
          href="https://www.docker.com/products/docker-desktop/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-indigo hover:underline"
        >
          Get Docker Desktop
        </a>{" "}
        if you haven&apos;t already.
      </p>
      <p className="text-muted mb-6">
        We&apos;ll pack your config into a zip. You&apos;ll unzip it, open
        Terminal (or Command Prompt), and run one command to start your agent.
      </p>
      {error && (
        <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={downloadZip}
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-accent-indigo text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Generating…" : "Download setup files"}
      </button>
      <div className="mt-6 p-4 rounded-lg bg-code-bg text-sm text-foreground space-y-3">
        <p className="font-medium">After downloading:</p>
        <ol className="list-decimal list-inside space-y-2 text-muted">
          <li>
            Unzip the downloaded folder (double-click the zip, or use your
            system&apos;s unzip).
          </li>
          <li>
            Open <strong>Terminal</strong> (Mac/Linux) or{" "}
            <strong>Command Prompt</strong> (Windows), go into that folder (e.g.{" "}
            <code className="px-1 py-0.5 rounded bg-background font-mono">
              cd holdmyclaw-setup
            </code>
            ), then run:{" "}
            <code className="px-1 py-0.5 rounded bg-background font-mono">
              docker compose up -d
            </code>
          </li>
          <li>
            Open the Control UI in your browser:{" "}
            <code className="px-1 py-0.5 rounded bg-background font-mono">
              http://localhost:18789
            </code>
          </li>
        </ol>
        <p className="text-muted text-xs pt-1">
          Docker runs your agent in a small, isolated environment on your
          computer.
        </p>
        <p className="text-muted text-xs border-t border-border pt-3 mt-3">
          If the container image fails to download (e.g. network or
          &quot;failed to copy&quot; error), try running{" "}
          <code className="font-mono">docker compose up -d</code> again. If it
          still fails, see <strong>Troubleshooting</strong> in the guide (link
          on the next step).
        </p>
      </div>
      <InlineTutorial title="Need help? How to run the setup">
        <ul className="list-disc list-inside space-y-1">
          <li>Install Docker Desktop from the link above if you don&apos;t have it.</li>
          <li>Unzip the folder, then open Terminal (Mac) or Command Prompt (Windows).</li>
          <li>
            In the terminal, type <code>cd</code> and a space, then drag the
            extracted folder into the window and press Enter.
          </li>
          <li>Run <code>docker compose up -d</code>. When it finishes, open http://localhost:18789 in your browser.</li>
        </ul>
      </InlineTutorial>
    </div>
  );
}
