/**
 * Smoke test for HoldMyClaw CLI.
 * See ProductPlan.md — Testing Strategy: CLI smoke test.
 */

import { describe, it, expect } from "vitest";
import { spawn } from "child_process";
import { join } from "path";

const CLI_PATH = join(__dirname, "..", "dist", "index.js");

describe("CLI smoke test", () => {
  it("runs and shows version when --version is passed", async () => {
    const proc = spawn(process.execPath, [CLI_PATH, "--version"], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    const out = await new Promise<string>((resolve, reject) => {
      let data = "";
      proc.stdout?.on("data", (ch) => (data += ch));
      proc.on("error", reject);
      proc.on("close", (code) => (code === 0 ? resolve(data) : reject(new Error("non-zero exit"))));
    });
    expect(out.trim()).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("runs and shows help when --help is passed", async () => {
    const proc = spawn(process.execPath, [CLI_PATH, "--help"], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    const out = await new Promise<string>((resolve, reject) => {
      let data = "";
      proc.stdout?.on("data", (ch) => (data += ch));
      proc.on("error", reject);
      proc.on("close", (code) => (code === 0 ? resolve(data) : reject(new Error("non-zero exit"))));
    });
    expect(out).toContain("holdmyclaw");
    expect(out).toContain("Deploy OpenClaw");
  });
});
