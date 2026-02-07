# Setup and Progress Log

Internal log of what’s been done, decisions, and next steps. Not for public website.

---

## Domain

- **holdmyclaw.com** — Registered (confirmed 2026-02-07).

---

## Phase 1: Foundation (Completed 2026-02-07)

### Git and repo

- Initialized git; default branch **main**.
- Added `.gitignore` (node_modules, .next, dist, env, logs, .vercel, *.pem, etc.).
- Initial commit: monorepo scaffold + placeholder hero.

### Monorepo

- **Root**
  - `package.json`: npm workspaces `packages/*`, scripts `dev`, `build`, `test`, `test:e2e`, `lint`.
  - `tsconfig.base.json`: strict, ES2022, ESNext module.
- **packages/core** (`@holdmyclaw/core`)
  - Build: tsup (ESM + CJS + dts).
  - `src/types.ts`: shared types (CloudProviderId, LLMProvider, Channel, ValidationResult, CreateServerResult, ServerStatus).
  - `src/index.ts`: re-exports types. Provider adapters, provision, validate, cloud-init to be added in Phase 2.
- **packages/web** (Next.js 15 + Tailwind 4)
  - Next.js 15, React 19, Tailwind 4 (`@tailwindcss/postcss`).
  - Design tokens in `app/globals.css` per ProductPlan (Kinetic Minimalism): background, foreground, muted, accent-indigo/emerald/amber, border, code-bg.
  - **Placeholder hero** (Section 1 only):
    - Top bar: “HoldMyClaw” wordmark; “Guide” and “FAQ” links.
    - Mascot placeholder (amber circle + emoji).
    - Headline: “Deploy OpenClaw in 5 Minutes / Your server, your data, completely free.”
    - Subtext; “Deploy Now” CTA; “See how it works ↓” link.
    - Terminal block placeholder (animation in Phase 5).
  - **Layout:** SEO meta (title, description, Open Graph) per ProductPlan.
  - **Placeholder routes:** `/`, `/guide`, `/faq`, `/setup`.
- **packages/cli** — Added in Phase 4 (see below).

### Decisions

- **npm workspaces:** Use `"@holdmyclaw/core": "*"` in `packages/web` (not `workspace:*`) for npm compatibility.
- **Core package exports:** `types` condition first in `exports` so TypeScript resolves correctly; tsup warning avoided.
- **Tailwind v4:** `@import "tailwindcss"` and `@theme` in `globals.css` for design tokens; no separate tailwind.config for now.

### Build verification

- `npm install` and `npm run build` succeed (core then web).
- Web build: static pages for `/`, `/faq`, `/guide`, `/setup`, `/_not-found`.

---

## Phase 2: Core Pipeline (Completed 2026-02-07)

### Core package (`packages/core`)

- **providers/types.ts** — CloudProvider interface, ServerConfig, Region, ServerType.
- **providers/hetzner.ts** — Hetzner Cloud API adapter (validate key, add SSH key, create server, get status, delete).
- **providers/digitalocean.ts** — DigitalOcean API adapter (same surface).
- **providers/local-docker.ts** — Local Docker file generator; `generateLocalDockerFiles()`, `getLocalConfigTemplateName()`.
- **providers/index.ts** — `getProvider(id)`, `getProviderIds()`, re-exports.
- **openclaw-config.ts** — `getConfigTemplateName()`, `substituteVars()`, `renderOpenClawConfig()`, `renderEnvFile()`, `getDockerComposeYaml()`.
- **cloud-init.ts** — `generateCloudInitScript()`, `buildSoulMdBlock()`, `buildIdentityMdBlock()`; caller provides template content.
- **validate.ts** — Format validation for Telegram/Discord tokens, LLM API keys, cloud provider keys.
- **verify.ts** — `checkHealth()`, `pollUntilReady()` for health polling.
- **ssh-keygen.ts** — `generateEd25519KeyPair()` for Node (OpenSSH public key + PEM private key).
- **provision.ts** — `provisionCloud(ProvisionCloudInput)` → CreateServerResult + statusToken + consoleUrl.
- **types.ts** — Added `DeployInputCloud`, `DeployInputLocal`.
- **index.ts** — Re-exports all above.

### Tests

- **validate.test.ts**, **openclaw-config.test.ts**, **cloud-init.test.ts** — 27 unit tests.
- **vitest.config.ts** — Root vitest config; `npm test` runs all core tests.

### Build

- `npm run build` and `npm test` succeed.

### Not done in Phase 2

- End-to-end manual test with real Hetzner/DigitalOcean API keys.
- API validation (real LLM/Telegram/Discord API calls) deferred to Phase 3.

---

## Phase 3: Web Wizard (Completed 2026-02-07)

### API routes (`packages/web/app/api/`)

- **deploy/route.ts** — POST: load cloud-init + config templates, call `provisionCloud`, return serverId, serverIp, statusToken, consoleUrl.
- **status/route.ts** — GET: proxy health check to `http://<ip>/health` (avoids mixed-content).
- **validate/route.ts** — POST: validate cloud_provider, llm, telegram, discord keys via core + provider API.
- **config-template/route.ts** — GET: return OpenClaw config template content for local Docker zip generation.

### Server helpers

- **lib/server/load-templates.ts** — `loadCloudInitTemplate()`, `loadConfigTemplate(llm, channel)`; reads from `packages/web/templates/` (or repo root fallback).
- **packages/web/templates/** — Copy of root `templates/cloud-init.sh` and `templates/configs/*.json5` for API routes.

### Wizard state and shell

- **lib/wizard-state.ts** — `WizardState`, `WizardAction`, `wizardReducer`, `initialState`.
- **components/wizard/wizard-shell.tsx** — useReducer, step progress bar, step routing (1–7 for cloud, 1–6 for local), Back/Next.
- **app/setup/page.tsx** — Renders `WizardShell`.

### Step components

- **step-provider.tsx** — Step 1: deploy target (cloud/local), cloud provider (Hetzner/DigitalOcean), API key + validate.
- **step-llm.tsx** — Step 2: LLM provider + API key + validate.
- **step-channel.tsx** — Step 3: channel (Telegram/Discord/WhatsApp), bot token + validate (WhatsApp skips token).
- **step-customize.tsx** — Step 4: agent name, emoji, personality (SOUL.md), dmPolicy (pairing/open).
- **step-deploy.tsx** — Step 5 cloud: generate SSH key (browser), download .pem, POST /api/deploy, poll /api/status until health ready, auto-advance.
- **step-download.tsx** — Step 5 local: GET config template, `generateLocalDockerFiles`, zip with JSZip, download.
- **step-connect.tsx** — Step 6 cloud: dashboard link, pairing/WhatsApp instructions.
- **step-done.tsx** — Step 6 local / Step 7 cloud: Control UI link, credentials (IP, SSH, console), guide link.
- **inline-tutorial.tsx** — Expandable “Need help?” panel (placeholder for guide markdown).

### Client-side SSH key generation

- **lib/ssh-keygen-browser.ts** — `generateKeyPairBrowser()` (Web Crypto Ed25519), `downloadPrivateKeyPem()`; OpenSSH public key + PEM private key.

### Build and tsconfig

- **packages/web/tsconfig.json** — Added `"lib": ["ES2022", "DOM", "DOM.Iterable"]` for DOM types.
- **npm run build** — core + web succeed; `/setup` is dynamic (wizard).

### Not done in Phase 3

- Inline tutorials: panel exists; wiring guide markdown from `guides/wizard-inline/` and react-markdown deferred.
- Rate limiting (Vercel KV) and statusToken validation on /api/status deferred.
- E2E tests (Playwright) and accessibility audit (Phase 5).

---

## Phase 4: CLI (Completed 2026-02-07)

### CLI package (`packages/cli`)

- **package.json** — Name `holdmyclaw`, bin `holdmyclaw`, dependencies: `@holdmyclaw/core`, `commander`, `@inquirer/prompts`. Build: tsup (ESM + CJS + dts). `files`: `dist`, `templates`.
- **templates/** — Copy of repo root `templates/` (cloud-init.sh + configs/*.json5) so the published npm package can load templates without repo context.
- **src/load-templates.ts** — Resolves template dir: tries `process.cwd()/templates`, parent dirs, then package-relative path (for `npx holdmyclaw`). Exports `loadCloudInitTemplate()`, `loadConfigTemplate(llm, channel)`.
- **src/prompts.ts** — Interactive flow with @inquirer/prompts: deploy target (Hetzner / DigitalOcean / My Computer), provider API key + region (cloud), LLM provider + API key, channel + token, optional customization (name, emoji, personality, dmPolicy). Exports `runPrompts()` → `PromptAnswers`.
- **src/index.ts** — Commander default action runs wizard. **Cloud path:** generate Ed25519 key → save private key to `~/.holdmyclaw/keys/openclaw.pem` → load templates → `provisionCloud()` → poll `http://<serverIp>/health` via `pollUntilReady()` → print server IP, SSH, dashboard, console, guide. **Local path:** `generateLocalDockerFiles()` → write `.env`, `docker-compose.yml`, `config/openclaw.json`, `workspace/SOUL.md` / `IDENTITY.md` into `./openclaw/` → print next steps. Validation: provider API key (format + `provider.validateApiKey()`), LLM format, channel token format; ✓/✗ messages.
- **__tests__/cli.test.ts** — Smoke test: `--version` prints version, `--help` prints usage.

### Root

- **package.json** — Already had `build:cli` script; workspace `packages/*` includes CLI.
- **npm run build:cli** — Builds core then CLI. `npx vitest run packages/cli/__tests__/cli.test.ts` passes.

### Not done in Phase 4

- **Publish to npm** — Step 35 in ProductPlan; run `npm publish` from `packages/cli` when ready (and set `"private": false` if needed).
- Live LLM API validation in CLI (only format validation; web uses /api/validate for live checks). Optional enhancement.

---

## Status at a glance

| Phase | Status | Notes |
|-------|--------|--------|
| Phase 1: Foundation | ✅ Done | Domain, monorepo, placeholder landing |
| Phase 2: Core Pipeline | ✅ Done | Providers, provision, validate, cloud-init, tests |
| Phase 3: Web Wizard | ✅ Done | API routes, wizard steps, SSH keygen browser, setup flow |
| Phase 4: CLI | ✅ Done | commander + @inquirer/prompts, cloud + local deploy, smoke test |
| Phase 5: Content & Polish | ✅ Done | Guide, FAQ, landing, mascot, terminal animation, E2E, favicon, internal docs, SEO, kinetic typography |
| Phase 6: Launch | 🔄 In progress | Beta, bug fixes, public launch (see launch-checklist.md) |

**Deferred (across phases):** Inline wizard tutorials (guide markdown), rate limiting (Vercel KV), statusToken validation on /api/status, npm publish for CLI.

---

## Phase 5: Content & Polish (Started 2026-02-07)

### Done

- **FAQ page** — Full content (13 Q&As from ProductPlan Part 5 Section A), accordion UI, link to guide.
- **Guide page** — “Managing Your OpenClaw” rendered from `packages/web/content/managing-your-openclaw.md` (copy of `guides/post-setup/managing-your-openclaw.md`) with react-markdown, remark-gfm, rehype-slug; sticky TOC (desktop); prose styling.
- **Claw mascot** — `components/claw-mascot.tsx`: four variants (idle, grabbing, success, wave), viewbox 0 0 64 64, amber + black outline.
- **Landing page** — Full structure: Hero (mascot + CTA + terminal demo), How it works (3 steps), What you get (checkmarks), Principles (“own” in darker amber for a11y), FAQ accordion, Final CTA (mascot wave), Footer.
- **Terminal animation** — `components/terminal-demo.tsx`: types out ProductPlan sequence character-by-character; emerald for completed steps, indigo + cursor for current; respects `prefers-reduced-motion`.
- **E2E tests** — `playwright.config.ts` (port 3002), `e2e/landing.spec.ts`: hero/CTA, Guide/FAQ/Deploy links, How it works, FAQ accordion, axe-core accessibility (critical/serious violations); all 6 tests pass.

### Phase 5 polish (completed 2026-02-07)

- **Favicon** — `app/icon.svg`: simplified claw (palm + three fingers), amber + black, works at small size.
- **Internal docs** — `docs/internal/strengths-weaknesses.md`, `docs/internal/common-pitfalls.md` (from ProductPlan Part 5 C1/C2).
- **SEO** — Layout: `metadataBase`, Open Graph (title, description, url, images), Twitter Card (summary_large_image), canonical, WebSite JSON-LD. `app/opengraph-image.tsx`: dynamic 1200×630 OG image (title + tagline + claw). Guide page: HowTo JSON-LD.
- **Kinetic typography** — `ScrollWeightHeading`: section headlines animate font-weight 400→700 on scroll (once). `StepNumber`: “How it works” step numbers count up from 00→01, 02, 03 when in view. Both respect `prefers-reduced-motion`.

---

## Phase 6: Launch (Started 2026-02-07)

- **Epic:** `.prodman/epics/EP-001-launch-phase-6.yaml` (status: in_progress).
- **Roadmap:** `.prodman/roadmap.yaml` — milestone M1 (Launch).
- **Checklist:** `docs/internal/launch-checklist.md` — pre-launch verification, beta (20–50 deployments), bug triage, public launch (Product Hunt, HN, Reddit, blog).
- **Feedback:** Contact page at `/contact` (footer link added); email feedback@holdmyclaw.com (update when repo/Discussions live).

### Next steps (from checklist)

1. Run pre-launch verification (Part 10 items in launch-checklist.md).
2. Invite beta users; collect feedback via Contact / GitHub Discussions.
3. Triage bugs → `.prodman/issues/`; fix p0/p1 before public launch.
4. Public launch: Product Hunt, Show HN, Reddit, one blog post.
5. Mark EP-001 and M1 complete; update this doc.

---

## Optional (post-launch)

- Publish CLI to npm (`npm publish` from `packages/cli`).

---

## Reference

- **ProductPlan.md** — Full product plan (positioning, design, architecture, wizard flow, API contracts, execution roadmap).
- **AGENTS.md** — Epic workflow, .prodman layout, verification, issue logging.
- **.prodman/product.yaml** — Product definition (vision, principles, target users); includes note that holdmyclaw.com is registered.
