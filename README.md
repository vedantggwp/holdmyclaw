# HoldMyClaw

**Deploy OpenClaw in 5 minutes. Your server, your data, completely free.**

HoldMyClaw is a free setup wizard that deploys [OpenClaw](https://github.com/openclaw/openclaw) on your own cloud server (Hetzner, DigitalOcean) or locally with Docker. We configure everything, hand you the keys, and walk away. You own everything; we manage nothing.

- **Domain:** [holdmyclaw.com](https://holdmyclaw.com) (registered)
- **Full product plan:** [ProductPlan.md](./ProductPlan.md)
- **Agent workflow:** [AGENTS.md](./AGENTS.md)

---

## Prerequisites

- **Node.js** 22+ (or 20.x; engine warning only)
- **npm** 10+

---

## Quick start

```bash
# Install dependencies (from repo root)
npm install

# Run the web app (Next.js dev server)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll see the placeholder landing hero.

```bash
# Build for production (core + web)
npm run build
```

---

## Project structure

| Path | Purpose |
|------|---------|
| `packages/core` | Shared provisioning logic (`@holdmyclaw/core`) — providers, cloud-init, validation, provision, SSH keygen |
| `packages/web` | Next.js 15 app — landing page, setup wizard, guide, FAQ |
| `packages/cli` | CLI `holdmyclaw` — commander + @inquirer/prompts, cloud + local deploy (same core pipeline) |
| `guides/` | Inline wizard tutorials + post-setup “Managing Your OpenClaw” guide |
| `templates/` | Cloud-init script, Docker Compose, OpenClaw config templates |
| `.prodman/` | Product management — product definition, roadmap, epics, specs |
| `docs/internal/` | Internal notes, **progress log (what’s done / not done / what’s left)** |

---

## Current status

**Phases 1–4 complete.** Phase 5 (content & polish) and Phase 6 (launch) remain.

- **Phase 1 (Foundation)** — Done: monorepo, core scaffold, web placeholder, domain registered.
- **Phase 2 (Core pipeline)** — Done: Hetzner/DigitalOcean adapters, cloud-init, provision, validate, tests.
- **Phase 3 (Web wizard)** — Done: API routes (deploy, status, validate), wizard steps, SSH keygen browser, setup flow.
- **Phase 4 (CLI)** — Done: `packages/cli` with commander + @inquirer/prompts, cloud + local deploy, smoke test. Not yet published to npm.
- **Next:** Phase 5 (content & polish) — guide content, FAQ, full landing, mascot, animations, E2E tests.

**Single source for “what’s done / not done / what’s left”:** [docs/internal/setup-and-progress.md](./docs/internal/setup-and-progress.md). It includes a status table, deferred items, and next steps.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (web app) |
| `npm run build` | Build `@holdmyclaw/core` then Next.js app |
| `npm run build:cli` | Build core + CLI |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run E2E tests (Playwright; when added) |
| `npm run lint` | Lint package sources |

---

## Documentation

| Document | Purpose |
|----------|---------|
| [ProductPlan.md](./ProductPlan.md) | Full product plan: positioning, design system, architecture, wizard flow, API contracts, execution roadmap |
| [AGENTS.md](./AGENTS.md) | Instructions for AI agents: epic workflow, .prodman layout, verification, issue logging |
| [.prodman/product.yaml](./.prodman/product.yaml) | Product definition: vision, principles, target users |
| [.prodman/roadmap.yaml](./.prodman/roadmap.yaml) | Milestones and releases (epic-driven) |
| [docs/internal/setup-and-progress.md](./docs/internal/setup-and-progress.md) | **Implementation log: what’s done, what’s not done, what’s left** — status table, deferred items, next steps (Phase 5 & 6) |
