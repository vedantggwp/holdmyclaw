# Deploying HoldMyClaw to Vercel

Use this checklist before and during deployment.

---

## Before you deploy

### 1. Monorepo build (Root Directory)

- In Vercel: **Project Settings → General → Root Directory** = `packages/web`.
- **Build:** `packages/web`’s build script runs `build:core` then `next build`. `build:core` runs from repo root and builds `@holdmyclaw/core`, so the default Vercel “npm run build” does the right thing without a custom Build Command.
- **Install:** Ensure install runs from repo root (Vercel’s default for monorepos) so workspaces are linked and `@holdmyclaw/core` is available.

### 2. Environment variables

Set in **Project Settings → Environment Variables**:

| Variable | Required | Value | Notes |
|----------|----------|--------|--------|
| `NEXT_PUBLIC_SITE_URL` | Optional | `https://holdmyclaw.com` (or your Vercel URL) | Used for canonical URL and guide JSON-LD. Defaults to `https://holdmyclaw.com` in code. |

No API keys or secrets are needed for the app itself (users supply their own keys in the wizard).

### 3. Function timeout (deploy API)

- `/api/deploy` uses `maxDuration = 10` so it works on **Vercel Hobby** (10 s limit). Provider create-server calls are usually 1–5 s.
- On **Vercel Pro** you can increase to 30–60 s in `packages/web/app/api/deploy/route.ts` if you see timeouts.

### 4. File tracing (templates + content)

- `packages/web/next.config.ts` uses `experimental.outputFileTracingIncludes` so that:
  - `/api/deploy` and `/api/config-template` get `templates/**/*` (cloud-init + configs).
  - `/guide` gets `content/**/*` (managing-your-openclaw.md).
- Without this, serverless functions can throw "file not found" for those paths. If you see that in production, confirm the route keys match your App Router paths.

---

## While deploying (Vercel UI)

1. **Import** the repo (GitHub/GitLab/Bitbucket).
2. **Root Directory:** set to `packages/web`.
3. **Framework Preset:** Vercel should detect Next.js; leave as is.
4. **Build Command:** leave as **npm run build** (the web package builds core first via `build:core`, then runs `next build`).
5. **Output Directory:** leave default (Next.js uses `.next`).
6. **Environment Variables:** add `NEXT_PUBLIC_SITE_URL` if you use a custom domain.
7. Deploy.

---

## After first deploy

- Open **Deploy Now** (wizard): `https://your-project.vercel.app/setup`.
- Run through one cloud deploy (e.g. DigitalOcean + Claude + Telegram) to confirm:
  - Provider/LLM/channel validation work.
  - Deploy creates a server and returns IP.
  - Guide page loads: `https://your-project.vercel.app/guide`.
- If `/api/deploy` or `/api/config-template` returns 500 with "template not found", re-check `outputFileTracingIncludes` in `next.config.ts` and that `templates/` lives under `packages/web/`.

---

## Optional later

- **Rate limiting:** ProductPlan mentions Vercel KV for 1 deploy per IP per hour; not implemented yet. Add `KV_REST_API_*` (and/or `KV_REST_API_URL` + `KV_REST_API_TOKEN`) when you implement it.
- **Custom domain:** Point your domain to Vercel and set `NEXT_PUBLIC_SITE_URL` to that URL for correct canonical and guide links.
