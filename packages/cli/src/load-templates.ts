/**
 * Load cloud-init and config templates for CLI.
 * Tries cwd/templates (monorepo root), then package-relative path (published npm package).
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

function getTemplatesBase(): string {
  const cwd = process.cwd();
  const candidates = [
    join(cwd, "templates"),
    join(cwd, "..", "templates"),
    join(cwd, "..", "..", "templates"),
  ];
  for (const p of candidates) {
    if (existsSync(join(p, "cloud-init.sh"))) return p;
  }
  // When published: dist/index.js -> package root -> templates (sibling of dist)
  try {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const pkgTemplates = join(currentDir, "..", "templates");
    if (existsSync(join(pkgTemplates, "cloud-init.sh"))) return pkgTemplates;
  } catch {
    // ignore
  }
  throw new Error(
    "Templates not found. Run from repo root or install holdmyclaw from npm."
  );
}

let _base: string | null = null;

function base(): string {
  if (_base === null) _base = getTemplatesBase();
  return _base;
}

export function loadCloudInitTemplate(): string {
  return readFileSync(join(base(), "cloud-init.sh"), "utf-8");
}

export function loadConfigTemplate(llm: string, channel: string): string {
  const name = `${llm}-${channel}.json5`;
  const path = join(base(), "configs", name);
  if (!existsSync(path)) {
    throw new Error(`Config template ${name} not found at ${path}`);
  }
  return readFileSync(path, "utf-8");
}
