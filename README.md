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
| `packages/core` | Shared provisioning logic (`@holdmyclaw/core`) — types, providers, cloud-init, validation (to be built out) |
| `packages/web` | Next.js 15 app — landing page, setup wizard, guide, FAQ |
| `packages/cli` | CLI `npx holdmyclaw` (planned; not yet scaffolded) |
| `guides/` | Inline wizard tutorials + post-setup “Managing Your OpenClaw” guide |
| `templates/` | Cloud-init script, Docker Compose, OpenClaw config templates |
| `.prodman/` | Product management — product definition, roadmap, epics, specs |
| `docs/internal/` | Internal notes, progress log, strengths/weaknesses |

---

## Current status

- **Phase 1 (Foundation)** — Done  
  - Git initialized (branch `main`), `.gitignore` in place  
  - Monorepo: npm workspaces, `tsconfig.base.json`  
  - `packages/core`: scaffolded with tsup, shared types only  
  - `packages/web`: Next.js 15 + Tailwind 4, placeholder hero (wordmark, CTA, terminal block placeholder), routes `/`, `/guide`, `/faq`, `/setup`  
  - Design tokens in `app/globals.css` per ProductPlan (Kinetic Minimalism)  
  - Domain **holdmyclaw.com** registered  

- **Next:** Phase 2 (Core pipeline) — provider adapters, cloud-init, validation, provision pipeline. See [ProductPlan.md Part 8](./ProductPlan.md) and [docs/internal/setup-and-progress.md](./docs/internal/setup-and-progress.md).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (web app) |
| `npm run build` | Build `@holdmyclaw/core` then Next.js app |
| `npm run build:cli` | Build core + CLI (when CLI exists) |
| `npm test` | Run unit tests (Vitest; when added) |
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
| [docs/internal/setup-and-progress.md](./docs/internal/setup-and-progress.md) | Implementation log: what’s been done, decisions, next steps |
