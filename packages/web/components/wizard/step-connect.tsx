"use client";

import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

export function StepConnect({ state }: Props) {
  const dashboardUrl = state.dashboardUrl ?? (state.serverIp ? `http://${state.serverIp}:18789` : null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Connect to your agent
      </h1>
      <p className="text-muted mb-6">
        Open your dashboard and approve yourself (or send a message if you chose
        &quot;Anyone&quot;).
      </p>

      {dashboardUrl && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dashboard
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
          {state.channel === "whatsapp" ? (
            <p className="text-sm text-muted">
              For WhatsApp: SSH into your server and run{" "}
              <code className="px-1 py-0.5 rounded bg-code-bg font-mono">
                docker compose run --rm openclaw-cli channels login
              </code>{" "}
              to get the QR code for pairing.
            </p>
          ) : state.dmPolicy === "pairing" ? (
            <p className="text-sm text-muted">
              Send a message to your bot — you&apos;ll get a pairing code. Enter
              it in the Dashboard under Pairing and approve.
            </p>
          ) : (
            <p className="text-sm text-muted">
              Your bot responds to everyone. Just send a message to test.
            </p>
          )}
        </div>
      )}

      <p className="text-sm text-muted">
        When you&apos;re ready, click Next to see your credentials and the
        guide.
      </p>
    </div>
  );
}
