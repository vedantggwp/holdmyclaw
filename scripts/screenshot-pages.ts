/**
 * Capture screenshots of main pages for visual review.
 * Run: npx tsx scripts/screenshot-pages.ts (or ts-node)
 * Requires dev server on http://localhost:3001 (or set BASE_URL).
 */
import { chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";
const OUT_DIR = path.join(process.cwd(), "output", "playwright");

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  const pages: { name: string; path: string }[] = [
    { name: "landing", path: "/" },
    { name: "faq", path: "/faq" },
    { name: "guide", path: "/guide" },
    { name: "setup", path: "/setup" },
  ];

  for (const { name, path: p } of pages) {
    await page.goto(`${BASE_URL}${p}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.screenshot({
      path: path.join(OUT_DIR, `${name}.png`),
      fullPage: name === "landing" || name === "guide",
    });
    console.log(`Screenshot: ${name}.png`);
  }

  await browser.close();
  console.log(`Saved to ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
