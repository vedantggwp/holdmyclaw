import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Landing page", () => {
  test("renders hero headline and CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Deploy OpenClaw in 5 Minutes/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Deploy Now/i }).first()).toBeVisible();
  });

  test("Guide and FAQ links in header work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Guide" }).first().click();
    await expect(page).toHaveURL(/\/guide/);
    await expect(page.getByRole("heading", { name: /Managing Your OpenClaw/i })).toBeVisible();

    await page.goto("/");
    await page.getByRole("link", { name: "FAQ" }).first().click();
    await expect(page).toHaveURL(/\/faq/);
    await expect(page.getByRole("heading", { name: /Frequently asked questions/i })).toBeVisible();
  });

  test("Deploy Now links to setup", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Deploy Now" }).first().click();
    await expect(page).toHaveURL(/\/setup/);
  });

  test("How it works section is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible();
    await expect(page.getByText("Choose where to run")).toBeVisible();
  });

  test("FAQ accordion expands", async ({ page }) => {
    await page.goto("/");
    const firstQuestion = page.getByRole("button", { name: "What is HoldMyClaw?" });
    await firstQuestion.click();
    await expect(page.getByText(/free setup wizard that deploys OpenClaw/i)).toBeVisible();
  });

  test("landing page has no critical accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    expect(critical, `Accessibility violations: ${JSON.stringify(critical, null, 2)}`).toEqual([]);
  });
});
