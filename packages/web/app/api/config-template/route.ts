/**
 * GET /api/config-template?llm=X&channel=Y — Return OpenClaw config template content.
 * Used by wizard for local Docker file generation.
 */

import { NextRequest, NextResponse } from "next/server";
import { loadConfigTemplate } from "../../../lib/server/load-templates";

export async function GET(request: NextRequest) {
  const llm = request.nextUrl.searchParams.get("llm");
  const channel = request.nextUrl.searchParams.get("channel");
  if (!llm || !channel) {
    return NextResponse.json(
      { error: "Missing llm or channel" },
      { status: 400 }
    );
  }
  try {
    const content = loadConfigTemplate(llm, channel);
    return new NextResponse(content, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Template not found" },
      { status: 404 }
    );
  }
}
