"use client";

import { useState, useCallback } from "react";
import type { WizardState, Channel } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

const CHANNELS: { value: Channel; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "discord", label: "Discord" },
  { value: "whatsapp", label: "WhatsApp (pairing after deploy)" },
];

export function StepChannel({ state, dispatch }: Props) {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateChannel = useCallback(async () => {
    if (state.channel === "whatsapp") {
      dispatch({ type: "SET_CHANNEL_VALIDATED", validated: true });
      return;
    }
    if (!state.channelToken.trim()) return;
    setValidating(true);
    setError(null);
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: state.channel,
          apiKey: state.channelToken.trim(),
        }),
      });
      const data = (await res.json()) as { valid?: boolean; error?: string };
      if (data.valid) {
        dispatch({ type: "SET_CHANNEL_VALIDATED", validated: true });
      } else {
        setError(data.error ?? "Validation failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Validation failed");
    } finally {
      setValidating(false);
    }
  }, [state.channel, state.channelToken, dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Messaging channel
      </h1>
      <p className="text-muted mb-6">
        Where should your agent receive messages? Paste your bot token (except
        WhatsApp — pairing happens after deployment).
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Channel
          </label>
          <select
            value={state.channel}
            onChange={(e) =>
              dispatch({
                type: "SET_CHANNEL",
                channel: (e.target as HTMLSelectElement).value as Channel,
              })
            }
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          >
            {CHANNELS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        {state.channel !== "whatsapp" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bot token
            </label>
            <input
              type="password"
              value={state.channelToken}
              onChange={(e) =>
                dispatch({ type: "SET_CHANNEL_TOKEN", token: (e.target as HTMLInputElement).value })
              }
              placeholder={
                state.channel === "telegram"
                  ? "From @BotFather"
                  : "From Developer Portal"
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-sm"
            />
            <button
              type="button"
              onClick={validateChannel}
              disabled={validating || !state.channelToken.trim()}
              className="mt-2 px-3 py-1.5 rounded-lg bg-accent-indigo text-white text-sm hover:opacity-90 disabled:opacity-50"
            >
              {validating ? "Checking…" : "Validate token"}
            </button>
            {state.channelValidated && (
              <p className="mt-2 text-sm text-accent-emerald">Token validated.</p>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        )}
        {state.channel === "whatsapp" && (
          <p className="text-sm text-muted">
            WhatsApp connects via QR pairing after deployment. No token needed
            here.
          </p>
        )}
      </div>
    </div>
  );
}
