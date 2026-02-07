"use client";

import { useState, useCallback } from "react";
import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

export function StepProvider({ state, dispatch }: Props) {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateProvider = useCallback(async () => {
    if (!state.cloudProvider || !state.providerApiKey.trim()) return;
    setValidating(true);
    setError(null);
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cloud_provider",
          provider: state.cloudProvider,
          apiKey: state.providerApiKey.trim(),
        }),
      });
      const data = (await res.json()) as { valid?: boolean; error?: string };
      if (data.valid) {
        dispatch({ type: "SET_PROVIDER_VALIDATED", validated: true });
      } else {
        setError(data.error ?? "Validation failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Validation failed");
    } finally {
      setValidating(false);
    }
  }, [state.cloudProvider, state.providerApiKey, dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Where do you want to run your agent?
      </h1>
      <p className="text-muted mb-6">
        Cloud server is always-on and accessible from anywhere. My Computer runs
        locally and is free.
      </p>

      <div className="space-y-4 mb-6">
        <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:bg-code-bg/50">
          <input
            type="radio"
            name="target"
            checked={state.deployTarget === "cloud"}
            onChange={() => {
              dispatch({ type: "SET_DEPLOY_TARGET", target: "cloud" });
            }}
            className="mt-1"
          />
          <div>
            <span className="font-medium text-foreground">Cloud Server</span>
            <p className="text-sm text-muted">~$4–6/month. Hetzner or DigitalOcean.</p>
          </div>
        </label>
        <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:bg-code-bg/50">
          <input
            type="radio"
            name="target"
            checked={state.deployTarget === "local"}
            onChange={() => {
              dispatch({ type: "SET_DEPLOY_TARGET", target: "local" });
            }}
            className="mt-1"
          />
          <div>
            <span className="font-medium text-foreground">My Computer</span>
            <p className="text-sm text-muted">Free. Requires Docker Desktop.</p>
          </div>
        </label>
      </div>

      {state.deployTarget === "cloud" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cloud provider
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="provider"
                  checked={state.cloudProvider === "hetzner"}
                  onChange={() =>
                    dispatch({ type: "SET_CLOUD_PROVIDER", provider: "hetzner" })
                  }
                />
                <span>Hetzner</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="provider"
                  checked={state.cloudProvider === "digitalocean"}
                  onChange={() =>
                    dispatch({ type: "SET_CLOUD_PROVIDER", provider: "digitalocean" })
                  }
                />
                <span>DigitalOcean</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              API key
            </label>
            <input
              type="password"
              value={state.providerApiKey}
              onChange={(e) =>
                dispatch({ type: "SET_PROVIDER_API_KEY", key: e.target.value })
              }
              placeholder="Paste your API key"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-sm"
            />
            <button
              type="button"
              onClick={validateProvider}
              disabled={validating || !state.providerApiKey.trim()}
              className="mt-2 px-3 py-1.5 rounded-lg bg-accent-indigo text-white text-sm hover:opacity-90 disabled:opacity-50"
            >
              {validating ? "Checking…" : "Validate key"}
            </button>
            {state.providerValidated && (
              <p className="mt-2 text-sm text-accent-emerald">Key validated.</p>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
