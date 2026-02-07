/**
 * GET /api/status — Proxy health check to avoid mixed-content (HTTPS → HTTP server).
 * See ProductPlan.md — Health polling architecture.
 */

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const ip = request.nextUrl.searchParams.get("ip");

  if (!ip?.trim()) {
    return NextResponse.json(
      { ready: false, elapsed: 0, timedOut: false, error: "Missing ip" },
      { status: 400 }
    );
  }

  // Optional: validate token (e.g. Vercel KV) to prevent abuse. For Phase 3 we allow without token.
  const elapsedParam = request.nextUrl.searchParams.get("elapsed");
  const elapsed = elapsedParam ? parseInt(elapsedParam, 10) : 0;
  const startTime = request.nextUrl.searchParams.get("startTime");
  const start = startTime ? parseInt(startTime, 10) : Date.now() - elapsed * 1000;
  const nowElapsed = Math.floor((Date.now() - start) / 1000);
  const timedOut = nowElapsed > 600; // 10 min

  try {
    const url = `http://${ip.trim()}/health`;
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
      headers: { Accept: "text/plain" },
    });
    const ok = res.ok && (await res.text()).toUpperCase().includes("OK");
    return NextResponse.json({
      ready: ok,
      elapsed: nowElapsed,
      timedOut,
    });
  } catch {
    return NextResponse.json({
      ready: false,
      elapsed: nowElapsed,
      timedOut,
    });
  }
}
