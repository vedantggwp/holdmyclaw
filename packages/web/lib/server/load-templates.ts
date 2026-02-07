/**
 * Load cloud-init and config templates for API routes.
 * Reads from packages/web/templates (or repo root templates when cwd is monorepo root).
 */

import { readFileSync } from "fs";
import { join } from "path";

function templatesDir(): string {
  const cwd = process.cwd();
  const inWeb = cwd.endsWith("web") || cwd.includes("packages/web");
  if (inWeb) {
    const local = join(cwd, "templates");
    return local;
  }
  return join(cwd, "templates");
}

export function loadCloudInitTemplate(): string {
  const base = templatesDir();
  try {
    return readFileSync(join(base, "cloud-init.sh"), "utf-8");
  } catch {
    try {
      return readFileSync(join(process.cwd(), "..", "..", "templates", "cloud-init.sh"), "utf-8");
    } catch (e) {
      throw new Error("Cloud-init template not found: " + String(e));
    }
  }
}

export function loadConfigTemplate(llm: string, channel: string): string {
  const name = `${llm}-${channel}.json5`;
  const base = templatesDir();
  try {
    return readFileSync(join(base, "configs", name), "utf-8");
  } catch {
    try {
      return readFileSync(join(process.cwd(), "..", "..", "templates", "configs", name), "utf-8");
    } catch (e) {
      throw new Error(`Config template ${name} not found: ${e}`);
    }
  }
}
