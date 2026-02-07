"use client";

import Link from "next/link";
import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

export function StepDone({ state }: Props) {
  const dashboardUrl =
    state.dashboardUrl ??
    (state.serverIp ? `http://${state.serverIp}:18789` : "http://localhost:18789");
  const isLocal = state.deployTarget === "local";

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        You&apos;re all set
      </h1>
      <p className="text-muted mb-6">
        {isLocal
          ? "Extract the zip, run docker compose up -d, then open the Control UI."
          : "Your OpenClaw agent is running. Bookmark the dashboard and guide."}
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Control UI
          </label>
          <a
            href={dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg border border-border bg-code-bg font-mono text-sm text-accent-indigo hover:underline"
          >
            {dashboardUrl}
          </a>
        </div>
        {!isLocal && state.serverIp && (
          <div className="p-4 rounded-lg bg-code-bg font-mono text-sm text-foreground space-y-2">
            <p>
              <span className="text-muted">Server IP:</span> {state.serverIp}
            </p>
            <p>
              <span className="text-muted">SSH:</span> ssh openclaw@{state.serverIp} -i
              holdmyclaw-key.pem
            </p>
            {state.consoleUrl && (
              <p>
                <span className="text-muted">Provider console:</span>{" "}
                <a
                  href={state.consoleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-indigo hover:underline"
                >
                  {state.consoleUrl}
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      <Link
        href="/guide"
        className="inline-block px-4 py-2 rounded-lg bg-accent-indigo text-white hover:opacity-90"
      >
        Managing Your OpenClaw (guide)
      </Link>
    </div>
  );
}
