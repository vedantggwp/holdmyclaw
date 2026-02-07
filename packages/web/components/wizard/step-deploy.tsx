"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  generateKeyPairBrowser,
  downloadPrivateKeyPem,
} from "../../lib/ssh-keygen-browser";
import type { WizardState } from "../../lib/wizard-state";
import type { DispatchWizard } from "./wizard-shell";

interface Props {
  state: WizardState;
  dispatch: DispatchWizard;
  onNext: () => void;
  onBack: () => void;
}

const POLL_INTERVAL_MS = 10_000;
const START_TIME_KEY = "holdmyclaw-deploy-start";

export function StepDeploy({ state, dispatch, onNext }: Props) {
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startDeploy = useCallback(async () => {
    if (
      state.deployTarget !== "cloud" ||
      !state.cloudProvider ||
      !state.providerApiKey.trim() ||
      !state.llmApiKey.trim() ||
      (state.channel !== "whatsapp" && !state.channelToken.trim())
    ) {
      dispatch({ type: "SET_DEPLOY_ERROR", error: "Missing required fields" });
      return;
    }

    dispatch({ type: "SET_DEPLOYING", deploying: true });
    dispatch({ type: "SET_DEPLOY_ERROR", error: null });

    try {
      const { publicKey, privateKeyPem } = await generateKeyPairBrowser();
      downloadPrivateKeyPem(privateKeyPem, "holdmyclaw-key.pem");
      dispatch({ type: "SET_SSH_PUBLIC_KEY", key: publicKey });

      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: state.cloudProvider,
          providerApiKey: state.providerApiKey.trim(),
          region: state.region || undefined,
          llmProvider: state.llmProvider,
          llmApiKey: state.llmApiKey.trim(),
          channel: state.channel,
          channelToken: state.channelToken.trim(),
          sshPublicKey: publicKey,
          personality: state.personality.trim() || undefined,
          agentName: state.agentName.trim() || undefined,
          agentEmoji: state.agentEmoji.trim() || undefined,
          dmPolicy: state.dmPolicy,
        }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        serverIp?: string;
        statusToken?: string;
        consoleUrl?: string;
        error?: string;
      };

      if (!data.success || !data.serverIp) {
        dispatch({
          type: "SET_DEPLOY_ERROR",
          error: data.error ?? "Deploy failed",
        });
        dispatch({ type: "SET_DEPLOYING", deploying: false });
        return;
      }

      dispatch({ type: "SET_SERVER_IP", ip: data.serverIp });
      dispatch({ type: "SET_STATUS_TOKEN", token: data.statusToken ?? null });
      dispatch({ type: "SET_CONSOLE_URL", url: data.consoleUrl ?? null });
      dispatch({
        type: "SET_DASHBOARD_URL",
        url: `http://${data.serverIp}:18789`,
      });
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(START_TIME_KEY, String(Date.now()));
        window.localStorage.setItem("holdmyclaw-serverIp", data.serverIp);
        if (data.consoleUrl)
          window.localStorage.setItem("holdmyclaw-consoleUrl", data.consoleUrl);
      }
    } catch (e) {
      dispatch({
        type: "SET_DEPLOY_ERROR",
        error: e instanceof Error ? e.message : "Deploy failed",
      });
    } finally {
      dispatch({ type: "SET_DEPLOYING", deploying: false });
    }
  }, [state, dispatch]);

  useEffect(() => {
    if (
      !state.serverIp ||
      state.healthReady ||
      !state.statusToken ||
      state.deployError
    )
      return;

    const poll = async () => {
      const start =
        typeof window !== "undefined"
          ? parseInt(
              window.sessionStorage.getItem(START_TIME_KEY) ?? "0",
              10
            )
          : Date.now();
      const elapsed = Math.floor((Date.now() - start) / 1000);
      try {
        const res = await fetch(
          `/api/status?ip=${encodeURIComponent(state.serverIp!)}&startTime=${start}&elapsed=${elapsed}`
        );
        const data = (await res.json()) as {
          ready?: boolean;
          elapsed?: number;
          timedOut?: boolean;
        };
        if (data.ready) {
          dispatch({ type: "SET_HEALTH_READY", ready: true });
          if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
          }
          onNext();
        }
        if (data.timedOut) {
          dispatch({
            type: "SET_DEPLOY_ERROR",
            error: "Setup is taking longer than expected. Check your server console.",
          });
          if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
          }
        }
      } catch {
        // keep polling
      }
    };

    pollRef.current = setInterval(poll, POLL_INTERVAL_MS);
    poll();
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [
    state.serverIp,
    state.statusToken,
    state.healthReady,
    state.deployError,
    dispatch,
    onNext,
  ]);

  if (state.serverIp && !state.healthReady && !state.deployError) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Deploying your server
        </h1>
        <p className="text-muted mb-6">
          Your server is being created and configured. This usually takes 2–4
          minutes. The page will advance when it&apos;s ready.
        </p>
        <div className="p-4 rounded-lg bg-code-bg font-mono text-sm text-foreground">
          <p>Server IP: {state.serverIp}</p>
          <p>Waiting for OpenClaw to start…</p>
        </div>
      </div>
    );
  }

  if (state.healthReady) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Server is ready
        </h1>
        <p className="text-muted mb-6">
          Your OpenClaw agent is running. Click Next to see how to connect.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Deploy</h1>
      <p className="text-muted mb-6">
        We&apos;ll create a cloud server and install OpenClaw. Your SSH private
        key will download immediately; keep it safe.
      </p>
      {state.deployError && (
        <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {state.deployError}
        </p>
      )}
      <button
        type="button"
        onClick={startDeploy}
        disabled={state.deploying}
        className="px-4 py-2 rounded-lg bg-accent-indigo text-white hover:opacity-90 disabled:opacity-50"
      >
        {state.deploying ? "Creating server…" : "Deploy now"}
      </button>
    </div>
  );
}
