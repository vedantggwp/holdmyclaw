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
- **packages/cli** — Not scaffolded yet (Phase 4 in ProductPlan).

### Decisions

- **npm workspaces:** Use `"@holdmyclaw/core": "*"` in `packages/web` (not `workspace:*`) for npm compatibility.
- **Core package exports:** `types` condition first in `exports` so TypeScript resolves correctly; tsup warning avoided.
- **Tailwind v4:** `@import "tailwindcss"` and `@theme` in `globals.css` for design tokens; no separate tailwind.config for now.

### Build verification

- `npm install` and `npm run build` succeed (core then web).
- Web build: static pages for `/`, `/faq`, `/guide`, `/setup`, `/_not-found`.

---

## Next steps (from ProductPlan)

1. **Phase 2 — Core pipeline (Days 4–10)**  
   Build `core/providers/types.ts`, Hetzner and DigitalOcean adapters, `local-docker.ts`, `cloud-init.ts`, `openclaw-config.ts`, `validate.ts`, `verify.ts`, `provision.ts`; unit tests; manual cloud deploys to verify.

2. **Phase 3 — Web wizard (Days 11–16)**  
   Wizard shell, steps 1–7, API routes `/api/deploy`, `/api/status`, `/api/validate`, client-side SSH key generation, inline tutorials.

3. **Phase 4 — CLI (Days 17–18)**  
   Scaffold `packages/cli`, commander + @inquirer/prompts, same `core/provision.ts`.

4. **Phase 5 — Content and polish (Days 19–23)**  
   “Managing Your OpenClaw” guide content, FAQ page, full landing (How it works, What you get, Principles, FAQ, final CTA), claw mascot SVGs, terminal animation, kinetic typography, E2E tests.

5. **Phase 6 — Launch (Days 24–28)**  
   Beta deployments, bug fixes, public launch.

---

## Reference

- **ProductPlan.md** — Full product plan (positioning, design, architecture, wizard flow, API contracts, execution roadmap).
- **AGENTS.md** — Epic workflow, .prodman layout, verification, issue logging.
- **.prodman/product.yaml** — Product definition (vision, principles, target users); includes note that holdmyclaw.com is registered.
