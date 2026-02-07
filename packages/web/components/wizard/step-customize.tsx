"use client";

import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

export function StepCustomize({ state, dispatch }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Customize your agent
      </h1>
      <p className="text-muted mb-6">
        Optional: give your agent a name, emoji, and personality. You can skip
        and use defaults.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Agent name
          </label>
          <input
            type="text"
            value={state.agentName}
            onChange={(e) =>
              dispatch({ type: "SET_AGENT_NAME", name: e.target.value })
            }
            placeholder="e.g. My Assistant"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Agent emoji
          </label>
          <input
            type="text"
            value={state.agentEmoji}
            onChange={(e) =>
              dispatch({ type: "SET_AGENT_EMOJI", emoji: e.target.value })
            }
            placeholder="e.g. 🤖"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Personality (SOUL.md)
          </label>
          <textarea
            value={state.personality}
            onChange={(e) =>
              dispatch({ type: "SET_PERSONALITY", text: e.target.value })
            }
            placeholder="e.g. Be concise and direct. Use casual language."
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Who can message your bot?
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dmPolicy"
                checked={state.dmPolicy === "pairing"}
                onChange={() =>
                  dispatch({ type: "SET_DM_POLICY", policy: "pairing" })
                }
              />
              <span>Only me (recommended) — approve with a code after deploy</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dmPolicy"
                checked={state.dmPolicy === "open"}
                onChange={() =>
                  dispatch({ type: "SET_DM_POLICY", policy: "open" })
                }
              />
              <span>Anyone — bot responds to everyone</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
