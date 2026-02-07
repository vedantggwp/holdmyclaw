# Phase 6 Launch Checklist

Internal checklist for beta, bug fixes, and public launch. See ProductPlan.md Part 8 (Phase 6) and Part 7 (GTM).

---

## 1. Pre-launch verification

Complete before inviting beta users. From ProductPlan Part 10:

| # | Check | Done |
|---|--------|------|
| 1 | **Hetzner cloud flow:** Wizard with real Hetzner credentials → server in dashboard within ~3 min, agent responds to test message | |
| 2 | **DigitalOcean cloud flow:** Same with DO; droplet appears in dashboard | |
| 3 | **Local Docker flow:** "My Computer" → download zip → extract → `docker compose up -d` → localhost works | |
| 4 | **Input validation:** Invalid API keys show provider-specific errors; valid keys show success | |
| 5 | **Security (cloud):** SSH in → non-root user, UFW, fail2ban, password auth disabled | |
| 6 | **OpenClaw running:** Docker containers up; `openclaw status --all` clean | |
| 7 | **Channel working:** Telegram/Discord message → agent responds with configured model | |
| 8 | **WhatsApp pairing:** Deploy → QR on Done page → scan → messages reach agent | |
| 9 | **CLI parity:** `npx holdmyclaw` same credentials → same result as web | |
| 10 | **Dashboard access:** `http://<serverIp>:18789` loads Control UI | |
| 11 | **Pairing flow:** First message → pairing code → Dashboard approve → subsequent messages get AI | |
| 12 | **Guide accuracy:** Every command in "Managing Your OpenClaw" works on deployed server | |
| 13 | **Error recovery:** Kill server mid-deploy → wizard shows IP, console link, "delete to stop billing"; localStorage backup after refresh | |
| 14 | **No data retained:** Vercel has no API keys, server IP, credentials (only rate-limit counters in KV) | |
| 15 | **Rate limiting:** Deploy once → immediate second deploy shows rate limit; after 1 hr, second deploy works | |
| 16 | **Responsive:** Wizard at 375px viewport usable, touch targets adequate | |
| 17 | **Accessibility:** axe-core on landing + wizard; no critical violations | |
| 18 | **Non-technical user test:** Someone non-technical completes wizard without help | |

---

## 2. Beta phase (20–50 deployments)

- **Goal:** 20+ deployments (target 20–50) across Hetzner, DigitalOcean, and local Docker.
- **Feedback:** Collect via:
  - [ ] Contact page or footer link (GitHub Discussions / email)
  - [ ] Optional: short feedback ask on Done page ("How was setup? Reply in GitHub Discussions or email us.")
- **Track:** Simple log (spreadsheet or doc): date, provider (Hetzner/DO/local), any issue reported.
- **Invite:** Soft launch in OpenClaw communities (GitHub Discussions, Discord, Reddit). "Early access to first 50 users — free, you own everything."

---

## 3. Bug triage and fix

- **Log issues:** Every bug from beta → `.prodman/issues/` (see AGENTS.md). Increment `counters.issue` in `.prodman/config.yaml`.
- **Priority:** Fix p0/p1 before public launch; p2/p3 can be logged and fixed post-launch.
- **Epic link:** Reference `epic: "EP-001"` in issue YAML when relevant.

---

## 4. Public launch (GTM)

Per ProductPlan Part 7:

| Step | Action | Done |
|------|--------|------|
| 1 | **Product Hunt:** Screen recording demo, maker story | |
| 2 | **Hacker News:** "Show HN" post — technical honesty, open-source angle | |
| 3 | **Reddit:** r/selfhosted (own-your-server), r/SideProject (indie maker) | |
| 4 | **Blog post:** One post — "How to deploy OpenClaw the easy way (and manage it yourself)" | |
| 5 | **Ongoing:** Keep answering OpenClaw questions in GitHub/Discord/Reddit; don’t spam, just help | |

---

## 5. Optional

- [ ] Publish CLI to npm: `npm publish` from `packages/cli` (set `"private": false` if needed).
- [ ] Add GitHub repo URL to package.json / README / contact page once repo is public.

---

## 6. Mark Phase 6 complete

- [ ] Update `.prodman/epics/EP-001-launch-phase-6.yaml`: `status: complete`, `updated_at`.
- [ ] Update `.prodman/roadmap.yaml`: milestone M1 `status: complete`.
- [ ] Update `docs/internal/setup-and-progress.md`: Phase 6 ✅ Done.
