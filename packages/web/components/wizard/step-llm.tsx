"use client";

import { useState, useCallback } from "react";
import type { WizardState, LLMProvider } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

const LLM_OPTIONS: { value: LLMProvider; label: string }[] = [
  { value: "anthropic", label: "Anthropic Claude" },
  { value: "openai", label: "OpenAI" },
  { value: "google", label: "Google Gemini" },
  { value: "openrouter", label: "OpenRouter" },
];

export function StepLlm({ state, dispatch }: Props) {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateLlm = useCallback(async () => {
    if (!state.llmApiKey.trim()) return;
    setValidating(true);
    setError(null);
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "llm",
          provider: state.llmProvider,
          apiKey: state.llmApiKey.trim(),
        }),
      });
      const data = (await res.json()) as { valid?: boolean; error?: string };
      if (data.valid) {
        dispatch({ type: "SET_LLM_VALIDATED", validated: true });
      } else {
        setError(data.error ?? "Validation failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Validation failed");
    } finally {
      setValidating(false);
    }
  }, [state.llmProvider, state.llmApiKey, dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">AI model</h1>
      <p className="text-muted mb-6">
        Choose your LLM provider and paste your API key. We validate it before
        continuing.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Provider
          </label>
          <select
            value={state.llmProvider}
            onChange={(e) =>
              dispatch({
                type: "SET_LLM_PROVIDER",
                provider: e.target.value as LLMProvider,
              })
            }
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          >
            {LLM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            API key
          </label>
          <input
            type="password"
            value={state.llmApiKey}
            onChange={(e) =>
              dispatch({ type: "SET_LLM_API_KEY", key: e.target.value })
            }
            placeholder="Paste your API key"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-sm"
          />
          <button
            type="button"
            onClick={validateLlm}
            disabled={validating || !state.llmApiKey.trim()}
            className="mt-2 px-3 py-1.5 rounded-lg bg-accent-indigo text-white text-sm hover:opacity-90 disabled:opacity-50"
          >
            {validating ? "Checking…" : "Validate key"}
          </button>
          {state.llmValidated && (
            <p className="mt-2 text-sm text-accent-emerald">Key validated.</p>
          )}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
