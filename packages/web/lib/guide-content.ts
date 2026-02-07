import fs from "fs";
import path from "path";

/** Resolve guide path so it works when dev server runs from repo root or from packages/web */
function getGuidePath(): string {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "content", "managing-your-openclaw.md"),
    path.join(cwd, "packages", "web", "content", "managing-your-openclaw.md"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`Guide markdown not found. Tried: ${candidates.join(", ")}`);
}

export function getGuideMarkdown(): string {
  return fs.readFileSync(getGuidePath(), "utf-8");
}

/** Slug for anchor (match rehype-slug style: lowercase, hyphenate) */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type TocEntry = { title: string; slug: string; level: number };

export function getGuideToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const h2 = /^## (.+)$/.exec(line);
    const h3 = /^### (.+)$/.exec(line);
    if (h2) {
      entries.push({ title: h2[1], slug: slugify(h2[1]), level: 2 });
    } else if (h3) {
      entries.push({ title: h3[1], slug: slugify(h3[1]), level: 3 });
    }
  }
  return entries;
}
