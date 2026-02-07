/**
 * Health polling and deployment verification.
 * See ProductPlan.md — Health polling architecture.
 */

import type { ServerStatus } from "./types.js";

const HEALTH_TIMEOUT_SEC = 600; // 10 minutes
const POLL_INTERVAL_MS = 10_000; // 10 seconds

/**
 * Check if a server's /health endpoint returns OK.
 * Caller (e.g. Vercel /api/status) should proxy to http://<serverIp>/health
 * to avoid mixed-content (HTTPS page → HTTP server).
 */
export async function checkHealth(
  fetchHealth: (ip: string) => Promise<{ ok: boolean }>
): Promise<(ip: string) => Promise<boolean>> {
  return async (ip: string): Promise<boolean> => {
    try {
      const res = await fetchHealth(ip);
      return res.ok;
    } catch {
      return false;
    }
  };
}

/**
 * Poll until server is ready or timeout.
 * Returns status with ready, elapsed seconds, and timedOut flag.
 */
export async function pollUntilReady(
  getIp: () => Promise<string | null>,
  checkHealth: (ip: string) => Promise<boolean>,
  options: {
    timeoutSec?: number;
    intervalMs?: number;
    startTime?: number;
  } = {}
): Promise<ServerStatus> {
  const timeoutSec = options.timeoutSec ?? HEALTH_TIMEOUT_SEC;
  const intervalMs = options.intervalMs ?? POLL_INTERVAL_MS;
  const startTime = options.startTime ?? Date.now();

  let ip: string | null = null;
  for (;;) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    if (elapsed >= timeoutSec) {
      return {
        ready: false,
        elapsed,
        timedOut: true,
      };
    }

    ip = await getIp();
    if (!ip) {
      await sleep(intervalMs);
      continue;
    }

    const ok = await checkHealth(ip);
    if (ok) {
      return {
        ready: true,
        elapsed,
        timedOut: false,
      };
    }

    await sleep(intervalMs);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { HEALTH_TIMEOUT_SEC, POLL_INTERVAL_MS };
