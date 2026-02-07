"use client";

import { useCallback, useState } from "react";
import JSZip from "jszip";
import { generateLocalDockerFiles } from "@holdmyclaw/core";
import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

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
      <p className="text-muted mb-6">
        We&apos;ll generate your config files and pack them into a zip. Extract
        and run <code className="px-1 py-0.5 rounded bg-code-bg font-mono text-sm">docker compose up -d</code> in the
        folder.
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
      <div className="mt-6 p-4 rounded-lg bg-code-bg font-mono text-sm text-foreground">
        <p>After downloading:</p>
        <pre className="mt-2 whitespace-pre-wrap">
          {`unzip holdmyclaw-setup.zip
cd holdmyclaw-setup  # or the extracted folder name
docker compose up -d`}
        </pre>
        <p className="mt-2 text-muted">
          Then open http://localhost:18789 for the Control UI.
        </p>
      </div>
    </div>
  );
}
