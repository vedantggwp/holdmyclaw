# HoldMyClaw — Complete Product Plan

## Context

OpenClaw (formerly Clawdbot/Moltbot, by Peter Steinberger) is an open-source AI agent with 173K+ GitHub stars (`github.com/openclaw/openclaw`). It's the fastest-growing open-source AI project of 2025-2026. Setting it up takes 30-45 minutes for technical users and days for non-technical users. The hype is at peak (Feb 2026) and will fade within 6 months.

**Our mission:** Make OpenClaw setup trivially easy for everyone. Not a business — a community tool that builds goodwill, personal brand, and distribution for future projects.

**What HoldMyClaw is:** A free setup wizard. Connect your own cloud account (or use your own computer), we deploy OpenClaw, hand you a guide, and walk away. You own everything. We manage nothing.

**What HoldMyClaw is NOT:** A managed hosting service. We don't run your infrastructure, don't charge monthly, and don't hold your data. Once you're set up, you never need us again.

---

## Part 1: Positioning (Principle-Based, No Competitor Names)

We do NOT name or attack competitors. We state our principles and let the contrast speak for itself.

**Core principles we communicate:**
1. **You own everything.** Your server, your data, your API keys. We never touch it after setup.
2. **Free.** No subscription. No hidden fees. No payment required. Ever.
3. **We teach, not trap.** You get a guide that teaches you to manage it yourself. We want you to NOT need us.
4. **No lock-in.** If we disappear tomorrow, your agent keeps running. Nothing depends on us.
5. **Community-first.** We exist to help, not to extract rent.

**One-liner:** "Deploy OpenClaw in 5 minutes. Your server, your data, completely free."

**Why this works without naming anyone:**
- Other services charge monthly subscriptions — we don't need to say who. The user knows.
- Other services own your infrastructure — we don't need to say who. The contrast is self-evident.
- The community will make the comparisons for us. We just state our terms.

---

## Part 2: Brand & Design System

### Domain: HoldMyClaw.com

**Verdict: Strong choice.** It's memorable, playful, and distinctive. The "hold my beer" riff communicates confidence and approachability — exactly right for a community tool that's not trying to be corporate.

The key tension — playful name vs. serious tool — actually works in our favor. A sophisticated design paired with a fun name signals: "we're competent AND human." This is the trust combination that community tools need.

**Potential concern:** The name alone doesn't scream "deployment tool." This is solved entirely by the hero headline. The moment someone lands on the page and reads "Deploy OpenClaw in 5 minutes," the name becomes memorable context, not confusion.

### Design Direction: Kinetic Minimalism + Claw Mascot

**Core idea:** The design is radically clean — white background, pure typography, zero decoration. The ONLY visual personality comes from (a) kinetic typography that responds to interaction, and (b) the claw mascot. This contrast — sterile precision meeting a playful character — IS the brand. It says: "serious tool, human touch."

**Why this is distinctive:** In Feb 2026, every dev tool is dark-mode + gradient mesh + shadcn. A white-background, typography-first design is the contrarian move. It feels premium (Stripe, Apple) while every competitor looks like a v0 template.

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Pure white | #FFFFFF | Page background — the canvas |
| Text primary | Near-black | #111111 | Headlines, body. High contrast on white. |
| Text secondary | Medium gray | #6B7280 | Descriptions, labels, secondary info |
| Accent 1 | Saturated indigo | #4F46E5 | Primary CTA, links, interactive elements |
| Accent 2 | Saturated emerald | #10B981 | Success states, deployment complete, "live" indicators |
| Accent 3 | Saturated amber | #F59E0B | Warnings, highlights, the claw mascot's primary color |
| Border | Light gray | #E5E7EB | Subtle structural dividers |
| Code background | Near-white | #F9FAFB | Terminal/code block backgrounds |

**Why this palette:**
- White background is rebellious for a dev tool — instantly stands apart from dark-mode competitors
- Three saturated accent colors (indigo, emerald, amber) pop against white with high energy
- The accents are MORE saturated than typical — they vibrate slightly against the clean background
- Amber (#F59E0B) doubles as the claw mascot's color, tying character to brand
- No gradients. No mesh. No glow. Just clean color on white.

### Typography

| Role | Font | Weight | Size (Desktop) |
|------|------|--------|------|
| Headlines | Mona Sans | Bold (700) - ExtraBold (800) | 56-72px (H1), 36-44px (H2), 24-32px (H3) |
| Body | Mona Sans | Regular (400) | 17-18px, line-height 1.65 |
| UI labels | Mona Sans | Medium (500) | 14px |
| Code/terminal | JetBrains Mono | Regular (400) | 15px |

**Why Mona Sans:** GitHub's custom variable font — open-source, free, and almost nobody outside GitHub uses it yet. It's clean and geometric like Inter but has subtle personality differences (slightly narrower, more technical feel). The variable font axes (weight 100-900, width 75-125) enable the kinetic typography effects that define this design.

**One font family for everything** (except code): Using Mona Sans at different weights/widths instead of mixing font families creates visual unity. The design variation comes from weight and motion, not from font switching.

**JetBrains Mono for code:** Terminal output, deployment logs, and code snippets use monospace. The contrast between Mona Sans and JetBrains Mono clearly separates "concept" from "implementation."

### Responsive Breakpoints

| Element | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| H1 (hero) | 64px | 48px | 36px |
| H2 | 36-44px | 30-36px | 26-30px |
| H3 | 24-32px | 22-28px | 20-24px |
| Body | 17-18px | 17px | 16px |
| UI labels | 14px | 14px | 13px |

**Mobile-specific adaptations:**
- Terminal animation: replace with static "deployment steps" list (typing animation is CPU-heavy on mobile)
- Wizard: full-width, single column, larger touch targets (min 44px tap area)
- CTA buttons: full-width on mobile
- Mascot: smaller (60px) or hidden on mobile hero
- FAQ accordion: larger tap targets
- Layout: single column below 768px, no side-by-side elements

### The Claw Mascot

**Character:** A stylized arcade claw machine claw — geometric, not cartoonish. Bold outline illustration with personality through pose and gesture, not facial features.

**Visual style:**
- Line-art style, 3-4px stroke weight
- Primary color: amber (#F59E0B) with black (#111111) outlines
- Simple enough to work at 24px (favicon) and 400px (hero)
- Works in single-color form (for stickers, monochrome contexts)

**SVG specification for AI builder:**
- Viewbox: `0 0 64 64`
- Shape: three curved "fingers" spreading from a central palm circle, like an arcade claw machine
- Keep to <20 path elements — geometric, not organic
- Think: logo mark, not illustration
- States as separate SVG files or CSS class variants:
  - `idle`: fingers slightly open, relaxed angle — landing page default
  - `grabbing`: fingers closing inward, rotated 10° forward — during deployment
  - `success`: open palm / thumbs-up gesture — deployment complete
  - `wave`: tilted 20°, motion implied — 404 page, welcome

**Where the mascot appears:**
- Landing page hero: Large, animated (subtle idle motion — breathing/floating via CSS)
- Favicon: Simplified claw silhouette in amber
- Deployment wizard: Small claw in corner, changes state with deployment progress
- Success page: Claw celebrating
- 404 page: Claw looking confused
- Social media avatar: Claw waving
- CLI output: ASCII art claw on startup

**What the mascot is NOT:**
- Not a full character with eyes/mouth/personality (keep it abstract)
- Not cute/kawaii (it's confident, not adorable)
- Not detailed/realistic (it's a brand mark, not an illustration)

### Animation Strategy: Kinetic Typography

**The defining feature:** Text itself IS the visual design. Typography moves, breathes, and responds. No decorative animation — every motion IS the content.

**1. Variable font weight animation (the signature effect):**
- Headlines shift weight on scroll: as a section enters the viewport, the headline font-weight animates from 400 → 700 (light → bold) over 300ms
- On hover: interactive text elements shift weight (500 → 800) and letter-spacing tightens slightly (-0.02em)
- Implementation: CSS `font-variation-settings` with Framer Motion's `useScroll` hook
- This is ONLY possible with variable fonts (Mona Sans). It's the reason we chose this font.

**2. Deployment terminal animation (hero + wizard):**
- Styled terminal block on white background (light theme, #F9FAFB background, no faux-dark-terminal)
- Text types out character by character in JetBrains Mono
- Each completed step: line turns emerald (#10B981) with a checkmark
- Current step: indigo (#4F46E5) with a blinking cursor
- The claw mascot sits beside the terminal, reacting to each step

**3. Number counters:**
- Any statistics (e.g., "500+ agents deployed") animate from 0 to the target number when scrolled into view
- Use JetBrains Mono for numbers (tabular figures, no width shifting)
- Count animation: fast start, slow finish (ease-out, 1.5s duration)

**4. Scroll-triggered section reveals:**
- Sections fade in + slide up (opacity 0→1, translateY 20px→0, 400ms, ease-out)
- Staggered: elements enter one after another with 100ms delay between items
- Subtle — this is a supporting effect, not the main show

**5. CTA button interaction:**
- Hover: subtle scale (1.02x), shadow appears, background-color shifts slightly
- Active: scale down (0.98x) — tactile "press" feeling
- No glow, no gradient animation — keep it physical and grounded

**What NOT to animate:**
- No parallax (dated)
- No floating decorative elements (against minimalism)
- No auto-playing video
- No loading spinners (use skeleton states)
- Always respect `prefers-reduced-motion` — disable all kinetic effects, show static design

**Libraries:**
- Framer Motion (scroll-triggered animations, variable font transitions)
- CSS `font-variation-settings` for weight animations
- No GSAP, no Anime.js — keep the dependency surface small

### SEO & Meta Tags

```
Landing page (app/layout.tsx):
- <title>HoldMyClaw — Deploy OpenClaw on Your Own Server in 5 Minutes</title>
- <meta name="description" content="Free setup wizard for OpenClaw. Deploy on your own cloud server or locally with Docker. You own everything. No subscription, no lock-in.">
- Open Graph: og:title, og:description, og:image (screenshot of terminal demo or mascot)
- Twitter Card: twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image
- Favicon: simplified claw SVG in amber (generated as part of mascot work)
- Canonical URL: https://holdmyclaw.com

Guide page (/guide):
- <title>Managing Your OpenClaw — HoldMyClaw</title>
- <meta name="description" content="Complete guide to managing your self-hosted OpenClaw agent. SSH, restart, update, troubleshoot, install skills.">
- Structured data: HowTo schema for Google search snippets

All pages:
- lang="en" on <html>
- viewport meta tag (already handled by Next.js)
- robots: index, follow (default)
```

### Landing Page Structure (Kinetic Minimalism)

The page is almost entirely typography on white. The claw mascot provides the only illustrative element. Sections are separated by whitespace, not by background colors or dividers.

**Section 1: Hero** (above the fold, 90vh)
```
[Top bar: minimal — just "HoldMyClaw" wordmark left, "Guide" + "FAQ" links right]

                    [Claw mascot — amber, idle animation, ~120px]

         Deploy OpenClaw in 5 Minutes                  ← Mona Sans ExtraBold, 64px
         Your server, your data,                       ← weight animates 400→800 on load
         completely free.

    We set it up, hand you the keys, and walk away.    ← Mona Sans Regular, 20px, #6B7280

              [CTA: "Deploy Now" — indigo bg, white text, pill shape]
                [Secondary: "See how it works ↓" — text link, no button]

    [Below CTA: styled terminal block on light gray (#F9FAFB)]
    [Terminal auto-plays deployment animation — text typing out in JetBrains Mono]
    [Claw mascot reacts to terminal steps — reaches toward it, celebrates on complete]
```

**Section 2: How It Works** (3 steps, typographic hierarchy only)
```
                         How it works                 ← H2, weight animates on scroll

    01                                                ← Large indigo number, JetBrains Mono
    Choose where to run                               ← H3, Mona Sans Bold
    Your own cloud server (Hetzner, DigitalOcean)     ← Body, Mona Sans Regular, #6B7280
    or your own computer with Docker. You decide.

    02
    Connect your AI + channel
    Pick your LLM provider. Connect Telegram,
    WhatsApp, or Discord. We validate everything.

    03
    Deploy & learn
    We configure everything in ~3 minutes. You get
    a working agent AND a guide to manage it yourself.

    [Each step fades in + slides up as you scroll, staggered 100ms]
    [Numbers animate: count up from 00 → 01, 02, 03]
```

**Section 3: What you get** (no cards — just a typographic list)
```
                       What you get                   ← H2

    ✓  Working OpenClaw agent on your own server      ← Each line fades in staggered
    ✓  Security-hardened (firewall, brute-force       ← Checkmarks in emerald (#10B981)
       protection, SSH-only access)
    ✓  Docker-based (easy to update, reproducible)
    ✓  Choice of cloud provider or local Docker
    ✓  "Managing Your OpenClaw" guide
       (SSH, restart, update, troubleshoot)

    [No cards, no boxes, no icons. Just text + checkmarks on white.]
```

**Section 4: Principles** (large typography, centered)
```
    We believe you should                             ← Mona Sans Regular, 36px
    own your AI.                                      ← Mona Sans ExtraBold, 36px

    Your server. Your data. Your keys. Always.        ← Each principle on its own line
    Free. No subscription. No hidden fees.            ← Mona Sans Regular, 18px, #6B7280
    We teach you to manage it yourself.               ← Staggered fade-in on scroll
    If we disappear, your agent keeps running.

    [The word "own" in the headline is in amber (#F59E0B) — the claw's color]
```

**Section 5: FAQ** (collapsible accordion, clean)
```
    Frequently asked questions                        ← H2

    [Accordion items — just text, thin bottom borders (#E5E7EB)]
    [Click to expand: smooth height animation, 300ms]
    [Open state: indigo (#4F46E5) question text]
    [Closed state: black (#111111) question text]

    See Part 5 for full FAQ content
```

**Section 6: Final CTA**
```
                    Ready?                            ← Mona Sans Bold, 48px
              [CTA: "Deploy Now — It's Free" — same style as hero]
    No account needed. No payment. Just deploy.       ← small, #6B7280

    [Claw mascot waving — small, beside the CTA]
```

**Section 7: Footer** (minimal)
```
    ──────────────────────────────────────────        ← thin #E5E7EB line
    HoldMyClaw          Guide    FAQ    Contact       ← Mona Sans, 14px, #6B7280
    Made for the OpenClaw community
```

**What the landing page does NOT have:**
- No dark sections / alternating backgrounds (it's all white)
- No cards with borders or shadows (typography creates hierarchy)
- No icons (the claw mascot is the only visual element)
- No gradients, no mesh, no glow effects
- No pricing comparison table (we don't name competitors)
- No testimonials at launch (add later when we have them)
- No blog, no newsletter signup

**The visual tension that makes this work:**
The entire page is pristine, typographic, almost austere — and then there's this amber claw character living in the whitespace, reacting to things, providing warmth. The contrast between the clean design and the playful mascot IS the brand personality. Remove either and it doesn't work.

### Design References to Study

Study these specifically for the kinetic/typographic approach:
1. **Stripe.com** — Typography hierarchy on white, saturated accent colors, premium feel
2. **Linear.app** — Clean kinetic interactions, motion that feels purposeful
3. **Apple.com** (product pages) — Scroll-driven typography animation, white backgrounds, minimal decoration
4. **GitHub.com** (homepage redesign) — Mona Sans in action, variable font weight transitions
5. **Raycast.com** — Clean dev tool design, excellent typography, light aesthetic

---

## Part 3: Technical Architecture

### Stack

| Component | Technology | Cost |
|-----------|-----------|------|
| Frontend + API routes | Next.js 15 on Vercel | Free tier |
| Provisioning (cloud) | Hetzner / DigitalOcean Cloud APIs + Cloud-Init | $0 (user's account) |
| Provisioning (local) | Docker Compose file generation | $0 |
| Server config | Cloud-Init script (runs on server boot) | $0 |
| Rate limiting | Vercel KV (free tier) | $0 |
| CLI | Node.js package on npm | $0 |
| DNS/SSL | Caddy auto-TLS on deployed server | $0 |

**What we explicitly don't need:**
- Backend server or SSH relay — Cloud-Init eliminates the need for SSH from our side
- Database — no user accounts, no ongoing state (Vercel KV only stores rate-limit counters with TTL)
- Payment processing — no Stripe, no payment gateway, completely free
- Monitoring service — not our responsibility after handoff
- Background job queue — no long-running server-side processes
- Customer dashboard — doesn't exist
- Analytics — no tracking, no cookies, no GDPR cookie banner

### Multi-Provider Architecture

**Key insight:** All VPS providers (Hetzner, DigitalOcean, Vultr, Linode, Contabo) support cloud-init/user_data. The setup script is 100% identical across providers. Only the "create server" API call differs. This means we build one cloud-init script and thin adapters per provider.

**v1 Deployment Targets:**

| Target | Type | Cost | Best for |
|--------|------|------|----------|
| **Hetzner** | Cloud VPS | ~$4/mo (CX22) | Best value, technical users |
| **DigitalOcean** | Cloud VPS | ~$6/mo (s-2vcpu-4gb) | Most popular, best docs |
| **Local Docker** | User's computer | $0 | Testing, development, home server |

**v2 Expansion (add later — just a new adapter each):**

| Target | Cost | Notes |
|--------|------|-------|
| **Vultr** | ~$6-12/mo | `user_data` field, base64 encoded |
| **Contabo** | ~$4-8/mo | Full cloud-init support, growing popularity |

**Provider Adapter Interface:**

```typescript
// packages/core/src/providers/types.ts

interface CloudProvider {
  name: string;                          // "hetzner" | "digitalocean"
  displayName: string;                   // "Hetzner" | "DigitalOcean"

  // Validation
  validateApiKey(apiKey: string): Promise<ValidationResult>;

  // Server lifecycle
  createServer(config: ServerConfig): Promise<CreateServerResult>;
  getServerStatus(serverId: string): Promise<ServerStatus>;
  deleteServer(serverId: string, apiKey: string): Promise<void>;

  // Provider-specific info
  getConsoleUrl(serverId: string): string;  // Link to provider dashboard
  getRegions(): Region[];                   // Available datacenter regions
  getServerTypes(): ServerType[];           // Available server sizes
  getEstimatedCost(): string;               // e.g., "~$4/month"
}

interface ServerConfig {
  apiKey: string;
  sshPublicKey: string;
  cloudInitScript: string;    // SAME script for ALL providers
  region: string;
  serverType: string;         // Provider-specific size name
  name: string;               // Server hostname
}

interface CreateServerResult {
  serverId: string;
  serverIp: string;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  detail?: string;
}
```

**Hetzner adapter specifics:**
- API base: `https://api.hetzner.cloud/v1`
- Auth: `Authorization: Bearer <api_key>`
- Create: `POST /servers` with `{ name, server_type: "cx22", image: "ubuntu-24.04", ssh_keys: [...], user_data: "<cloud-init>" }`
- Validate: `GET /servers` (200 = valid key)
- Console URL: `https://console.hetzner.cloud`
- Regions: `fsn1` (Falkenstein), `nbg1` (Nuremberg), `hel1` (Helsinki), `ash` (Ashburn), `hil` (Hillsboro), `sin` (Singapore)

**DigitalOcean adapter specifics:**
- API base: `https://api.digitalocean.com/v2`
- Auth: `Authorization: Bearer <api_key>`
- Create: `POST /droplets` with `{ name, region, size: "s-2vcpu-4gb", image: "ubuntu-24-04-x64", ssh_keys: [...], user_data: "<cloud-init>" }`
- Validate: `GET /account` (200 = valid key)
- Console URL: `https://cloud.digitalocean.com`
- Regions: `nyc1`, `sfo3`, `ams3`, `sgp1`, `lon1`, `fra1`, `blr1`

### Architecture: Cloud-Init Approach (No SSH Needed)

**Key insight:** Instead of SSH-ing into the server from our side (which requires a relay or long-running server process), we pass the entire setup script as `user_data` in the create-server API call. The provider's Cloud-Init runs this script automatically on first boot. Our wizard just polls until the health endpoint responds.

**Why this is better than SSH:**
- Zero server infrastructure on our side — no WebSocket relay, no SSH connections
- The Vercel API route makes ONE quick API call (~1-2 seconds) to the provider — fits in free tier timeout
- The heavy lifting (Docker install, OpenClaw setup) runs on the user's server autonomously
- User's API keys go from browser → our API route → provider API. Never stored. Never logged.
- If our Vercel app goes down mid-deploy, the server still finishes setup (Cloud-Init is independent)

**Health polling architecture (solves mixed-content issue):**
The wizard runs on `https://holdmyclaw.com` (HTTPS). The newly created server only has HTTP (no TLS cert for bare IPs). Browsers block HTTP requests from HTTPS pages (mixed content). Solution: the browser polls our Vercel API route `/api/status`, which makes the HTTP request to the server server-side. No mixed-content issue.

```
Browser (HTTPS) → /api/status (Vercel, HTTPS) → http://<server-ip>/health (HTTP, server-side)
```

### SSH Key Generation: Client-Side

**Web flow:**
- Browser generates an Ed25519 key pair using the Web Crypto API (or `tweetnacl` library as fallback)
- Private key is immediately triggered as a `.pem` file download — never sent to our servers
- Only the public key is sent to the `/api/deploy` endpoint, which passes it to the cloud provider
- The cloud-init script writes the public key to the server's `authorized_keys`

**CLI flow:**
- CLI generates the key pair locally using Node.js `crypto` module or shells out to `ssh-keygen`
- Private key is saved to `~/.holdmyclaw/keys/<server-name>.pem`
- Only the public key is sent to the API

**Why client-side:** The private key never transits through our infrastructure. This is a security-critical decision — users must trust that we never see their SSH keys.

### Cloud-Init Script Template

This is the core provisioning script. It is **identical across all cloud providers** — only the API call to create the server differs. The full script is in `templates/cloud-init.sh`.

**What it does (8 steps, ~3 minutes total):**

| Step | Action | Time |
|------|--------|------|
| 1 | Create non-root `openclaw` user + SSH key | 2s |
| 2 | Harden security: UFW firewall, fail2ban, disable password SSH, disable root login | 15s |
| 3 | Install Docker Engine from official repo | 45s |
| 4 | Create directory structure (`/opt/openclaw/config/`, `/opt/openclaw/workspace/`) | 1s |
| 5 | Write Docker Compose `.env` (gateway token + version pin) | 1s |
| 6 | Write `docker-compose.yml` (two-service compose: gateway + cli) | 1s |
| 7 | Write `openclaw.json` to `config/` directory | 1s |
| 8 | Write SOUL.md + IDENTITY.md to `workspace/` (if provided) | 1s |
| 9 | Fix ownership to uid 1000 (container's `node` user) | 1s |
| 10 | Pull + start OpenClaw gateway | 60s |
| 11 | Install Caddy reverse proxy + `/health` endpoint | 30s |

**Key differences from the original plan (corrected after research):**
- **Directory structure:** `/opt/openclaw/config/` and `/opt/openclaw/workspace/` (not flat `/opt/openclaw/`)
- **Config path:** `/opt/openclaw/config/openclaw.json` (mounted to `/home/node/.openclaw/openclaw.json` in container)
- **Ownership:** Files must be owned by uid 1000 (the `node` user in the container), NOT the `openclaw` system user
- **`.env` file:** Only contains `OPENCLAW_GATEWAY_TOKEN` and `OPENCLAW_VERSION` for Docker Compose — NOT API keys
- **API keys:** Embedded in `openclaw.json`'s `env:` section
- **SOUL.md location:** Written to `/opt/openclaw/workspace/SOUL.md` (mounted inside container at `/home/node/.openclaw/workspace/`)
- **IDENTITY.md:** Also written to workspace (new — not in original plan)
- **Two services:** The compose file includes both gateway and CLI services
- **Port 18789 opened in UFW:** So users can access the Control UI directly
- **Caddy `/health` handler:** Placed BEFORE the reverse_proxy to avoid conflicts with OpenClaw's own routes
- **`|| true` on apt commands:** Prevents `set -e` from aborting on benign failures
- **Root login disabled:** Extra hardening not in original plan

**Template variables** (substituted by `core/cloud-init.ts` before passing to the provider API):
- `${SSH_PUBLIC_KEY}` — user's public key (generated client-side)
- `${OPENCLAW_GATEWAY_TOKEN}` — random 64-char hex token (generated server-side)
- `${OPENCLAW_CONFIG_JSON}` — rendered openclaw.json content (from config templates)
- `${OPENCLAW_VERSION}` — pinned Docker image tag (e.g., `2026.2.6-3`)
- `${SOUL_MD_BLOCK}` — either a heredoc writing SOUL.md to workspace or empty string
- `${IDENTITY_MD_BLOCK}` — either a heredoc writing IDENTITY.md to workspace or empty string

**Note on TLS:** Caddy serves on HTTP port 80 only (bare IPs can't get Let's Encrypt certs). The wizard polls health via our Vercel proxy route (server-side), so there's no mixed-content issue. If users later add a real domain, the guide explains how to update the Caddyfile for automatic HTTPS.

### Docker Compose Template

**VERIFIED** against the official OpenClaw repo (`github.com/openclaw/openclaw/blob/main/docker-compose.yml`).

OpenClaw requires TWO services: the gateway (always-running daemon) and the CLI (used for admin commands like channel login, pairing approval, etc.).

```yaml
# Generated by HoldMyClaw — verified against official OpenClaw compose
services:
  openclaw-gateway:
    image: ghcr.io/openclaw/openclaw:${OPENCLAW_VERSION:-2026.2.6-3}
    container_name: openclaw-gateway
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
    volumes:
      - ./config:/home/node/.openclaw
      - ./workspace:/home/node/.openclaw/workspace
    ports:
      - "${OPENCLAW_GATEWAY_PORT:-18789}:18789"
      - "${OPENCLAW_BRIDGE_PORT:-18790}:18790"
    init: true
    restart: unless-stopped
    command:
      - "node"
      - "dist/index.js"
      - "gateway"
      - "--bind"
      - "${OPENCLAW_GATEWAY_BIND:-lan}"
      - "--port"
      - "18789"

  openclaw-cli:
    image: ghcr.io/openclaw/openclaw:${OPENCLAW_VERSION:-2026.2.6-3}
    container_name: openclaw-cli
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
      BROWSER: echo
    volumes:
      - ./config:/home/node/.openclaw
      - ./workspace:/home/node/.openclaw/workspace
    stdin_open: true
    tty: true
    init: true
    entrypoint: ["node", "dist/index.js"]
    profiles: ["cli"]
```

**Key details (verified):**
- **Image:** `ghcr.io/openclaw/openclaw:main` (or pinned versions like `2026.2.6-3`). Published to GHCR with 116K+ pulls, multi-arch (AMD64 + ARM64).
- **Container user:** Runs as `node` (uid 1000). Config mounts to `/home/node/.openclaw/`.
- **Two services:** Gateway runs 24/7. CLI runs on-demand via `docker compose run --rm openclaw-cli <command>`.
- **Ports:** 18789 (gateway + Control UI), 18790 (bridge).
- **No `.env` mount:** API keys go in `openclaw.json`'s `env:` section, not a mounted `.env` file.
- **The `.env` file** at the compose root is ONLY for Docker Compose variables (`OPENCLAW_GATEWAY_TOKEN`, `OPENCLAW_VERSION`).
- **`profiles: ["cli"]`** means the CLI service only starts when explicitly invoked, not on `docker compose up -d`.

**Docker Compose `.env` file** (at the same level as `docker-compose.yml`):
```bash
OPENCLAW_GATEWAY_TOKEN=<random-64-char-hex-token>
OPENCLAW_VERSION=2026.2.6-3
```

### OpenClaw Configuration Generated

**VERIFIED** against the official OpenClaw config schema (`docs.openclaw.ai/gateway/configuration`). OpenClaw uses JSON5 format (supports comments, trailing commas) validated against a strict Zod schema. Unknown keys cause startup failure.

The wizard generates `openclaw.json` based on user inputs. The file is written to `/opt/openclaw/config/openclaw.json` on the server (mounted to `/home/node/.openclaw/openclaw.json` inside the container).

**Minimal Anthropic + Telegram config (most common):**
```json5
{
  // Gateway: the WebSocket control plane
  gateway: {
    port: 18789,
    bind: "lan",                          // "loopback" | "lan" | "auto" — NOT an IP address
    auth: {
      token: "GENERATED_64_CHAR_HEX"     // Random token, also in Docker Compose .env
    }
  },

  // LLM API keys go HERE — not in a separate .env file
  env: {
    ANTHROPIC_API_KEY: "sk-ant-..."
  },

  // Agent configuration
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: ["anthropic/claude-sonnet-4-5-20250929"]
      },
      contextTokens: 200000,
      timeoutSeconds: 600
    }
  },

  // Messaging channel
  channels: {
    telegram: {
      enabled: true,
      botToken: "123456789:ABCdef...",    // From @BotFather
      dmPolicy: "pairing",                // "pairing" | "open" | "allowlist" | "disabled"
      groups: {
        "*": { requireMention: true }
      },
      streamMode: "partial",
      reactionNotifications: "own"
    }
  },

  // Daily session reset
  session: {
    reset: {
      mode: "daily",
      atHour: 4
    }
  },

  // Pre-enable ClawHub for skill discovery
  skills: {
    allowBundled: ["clawhub"]
  }
}
```

**Per-provider env var mapping** (the `env:` key in openclaw.json):

| LLM Provider | Env var name | Model ID format |
|---|---|---|
| Anthropic Claude | `ANTHROPIC_API_KEY` | `anthropic/claude-opus-4-6` |
| OpenAI | `OPENAI_API_KEY` | `openai/gpt-4.1` |
| Google Gemini | `GOOGLE_GENERATIVE_AI_API_KEY` | `google/gemini-2.5-pro` |
| OpenRouter | `OPENROUTER_API_KEY` | `openrouter/anthropic/claude-opus-4-6` |

**Per-channel config differences:**

| Channel | Token field | Token source | Pre-deploy? |
|---|---|---|---|
| Telegram | `channels.telegram.botToken` | @BotFather | Yes |
| Discord | `channels.discord.token` | Developer Portal | Yes |
| WhatsApp | None — QR pairing | `openclaw channels login` | No — post-deploy |

**Full config template files** for all 12 provider+channel combinations are in `templates/configs/` (e.g., `anthropic-telegram.json5`, `openai-discord.json5`, etc.).

**IMPORTANT — what NOT to do:**
- Do NOT put API keys in a separate `.env` file mounted to the container. OpenClaw reads them from the `env:` section of `openclaw.json`.
- Do NOT use `"bind": "0.0.0.0"`. Use `"bind": "lan"` (OpenClaw's string-based bind modes).
- Do NOT add unknown keys. The strict Zod schema will reject them and the Gateway will refuse to start.

### Local Docker Deployment Flow

For users who choose "My Computer" instead of a cloud provider:

**What's different:**
- No cloud API call — no server creation, no remote provisioning
- No SSH key generation (it's local)
- No security hardening (local network, not exposed to internet)
- No Caddy reverse proxy (access via localhost)
- No health polling via Vercel proxy (poll localhost directly, or just show instructions)

**What the wizard generates:**
- `docker-compose.yml` — same two-service template as cloud
- `.env` — Docker Compose env (OPENCLAW_GATEWAY_TOKEN + OPENCLAW_VERSION)
- `config/openclaw.json` — same as cloud, but `bind: "loopback"` instead of `"lan"`
- `workspace/SOUL.md` — same as cloud (if personality provided)
- `workspace/IDENTITY.md` — same as cloud (if identity provided)

**Delivery method:**
- Package all files into a zip and trigger browser download
- Also display copy-pasteable terminal commands as alternative:
  ```
  mkdir ~/openclaw && cd ~/openclaw
  # Download the zip and extract, OR paste these files:
  docker compose up -d
  ```

**Wizard step differences for local:**
```
Step 1: Select "My Computer"
  → Skip cloud API key entirely
  → Show prerequisite: "Docker Desktop must be installed and running"
Step 2-4: Same as cloud (LLM, channel, customization)
Step 5: Generate & Download
  → Generate config files in browser (no API call needed)
  → "Download Setup Files" button → zip download
  → Show manual commands as alternative
Step 6: Verify
  → "Run 'docker compose up -d' in the extracted folder"
  → "Visit http://localhost:18789 to confirm it's running"
  → WhatsApp: show QR pairing instructions
  → Link to guide
```

### API Contracts

```typescript
// ============================================
// POST /api/deploy — Create a cloud server
// ============================================
// NOT used for local Docker (local generates files client-side)

interface DeployRequest {
  provider: 'hetzner' | 'digitalocean';
  providerApiKey: string;
  region?: string;               // e.g., "fsn1" (Hetzner) or "nyc1" (DO)
  llmProvider: 'anthropic' | 'openai' | 'google' | 'openrouter' | 'ollama';
  llmApiKey: string;
  channel: 'telegram' | 'whatsapp' | 'discord';
  channelToken: string;          // Telegram bot token or Discord bot token
  channelMethod?: 'qr';         // WhatsApp only — always QR for v1
  sshPublicKey: string;          // Generated client-side, we never see the private key
  personality?: string;          // Optional SOUL.md content
  skills?: string[];             // Optional skill names to pre-install
}

interface DeployResponse {
  success: true;
  serverId: string;              // Provider-specific server/droplet ID
  serverIp: string;              // e.g., "203.0.113.42"
  statusToken: string;           // Random token for polling /api/status
  consoleUrl: string;            // Link to provider dashboard for this server
}

interface DeployErrorResponse {
  success: false;
  error: string;                 // Human-readable error message
  code: 'INVALID_PROVIDER_KEY' | 'PROVIDER_NO_PAYMENT' | 'PROVIDER_QUOTA'
      | 'INVALID_LLM_KEY' | 'INVALID_CHANNEL_TOKEN' | 'RATE_LIMITED'
      | 'SERVER_CREATE_FAILED' | 'INTERNAL_ERROR';
}

// ============================================
// GET /api/status?token=<statusToken>&ip=<serverIp>
// ============================================
// Proxies health check to avoid mixed-content (HTTPS page → HTTP server)
// Vercel function calls http://<serverIp>/health server-side

interface StatusResponse {
  ready: boolean;                // true when /health responds "OK" on the server
  elapsed: number;               // seconds since server creation
  timedOut: boolean;             // true if >10 minutes elapsed
}

// ============================================
// POST /api/validate — Real-time input validation
// ============================================

interface ValidateRequest {
  type: 'cloud_provider' | 'llm' | 'telegram' | 'discord';
  provider?: string;             // 'hetzner' | 'digitalocean' for cloud_provider type
                                 // 'anthropic' | 'openai' etc. for llm type
  apiKey: string;
}

interface ValidateResponse {
  valid: boolean;
  error?: string;                // Human-readable error if invalid
  detail?: string;               // e.g., "Account has 3 existing servers"
}

```

### Provisioning Pipeline

This is the core logic. A single TypeScript module used by both web and CLI, using the CloudProvider adapter interface.

```
Input:
  - provider ('hetzner' | 'digitalocean' | 'local')
  - provider_api_key (cloud only)
  - region (cloud only, optional — defaults to closest)
  - llm_provider (anthropic | openai | google | openrouter | ollama)
  - llm_api_key
  - channel (telegram | whatsapp | discord)
  - channel_token (bot token — except WhatsApp which pairs post-deploy)
  - ssh_public_key (cloud only, generated client-side)
  - [optional] skills to pre-install
  - [optional] personality/SOUL.md content

Pipeline (cloud path):

Step 1: Validate inputs (browser-side + API-side)
  - Test provider API key (provider.validateApiKey())
  - Test LLM API key (simple completion call)
  - Validate channel token format (Telegram: regex, Discord: regex)

Step 2: Generate Cloud-Init script
  - Render .env from user inputs
  - Render docker-compose.yml from template
  - Render openclaw.json from user inputs
  - Render SOUL.md if personality provided
  - Assemble cloud-init bash script with all rendered files embedded

Step 3: Create server via provider API (~1-2 seconds)
  - provider.createServer({ apiKey, sshPublicKey, cloudInitScript, region, serverType, name })
  - Returns: serverId, serverIp

Step 4: Poll for completion (browser-side via /api/status, 2-4 minutes)
  - Browser polls /api/status every 10 seconds
  - /api/status proxies to http://<serverIp>/health (server-side, avoids mixed content)
  - Wizard shows real-time progress (estimated steps with timing)
  - Timeout after 10 minutes with troubleshooting guidance

Step 5: Verify
  - Confirm /health responds "OK"
  - For Telegram/Discord: send test message via channel API, confirm agent responds
  - For WhatsApp: show QR code for pairing (fetched from running OpenClaw instance)

Step 6: Present credentials
  - Server IP address
  - SSH command (key already downloaded in Step 3)
  - OpenClaw dashboard URL (http://<serverIp>)
  - Provider console URL (for managing/deleting the server)
  - Link to "Managing Your OpenClaw" guide

Pipeline (local path):

Step 1: Validate inputs (browser-side only)
  - Test LLM API key
  - Validate channel token format

Step 2: Generate config files
  - Render .env, docker-compose.yml, openclaw.json, SOUL.md

Step 3: Download
  - Package as zip, trigger browser download
  - Show copy-pasteable commands

Step 4: User runs locally
  - User extracts zip, runs `docker compose up -d`
  - Wizard shows instructions

Step 5: Verify
  - "Visit http://localhost:18789"
  - WhatsApp: show QR pairing instructions

Total time: < 5 minutes (cloud), < 2 minutes (local)
```

**How the Vercel API route works (single short-lived function):**
1. Receives: provider + providerApiKey + all config inputs + sshPublicKey
2. Looks up the provider adapter (hetzner or digitalocean)
3. Generates cloud-init script string (template + user values)
4. Calls provider.createServer() — 1-2 second API call
5. Returns: serverId, serverIp, statusToken, consoleUrl
6. Done — function exits. Everything else happens on the server or in the browser.

This fits comfortably within Vercel's free tier 10-second function timeout.

### Error Handling Strategy

Every failure mode mapped to user-facing response and recovery action:

**Provider validation errors:**

| Error | Code | User Message | Recovery |
|-------|------|-------------|----------|
| Invalid API key (Hetzner) | INVALID_PROVIDER_KEY | "This API key isn't valid. Check that you copied the full key from Hetzner Cloud Console → Security → API Tokens." | Re-enter key |
| Invalid API key (DO) | INVALID_PROVIDER_KEY | "This API token isn't valid. Get one from cloud.digitalocean.com → API → Tokens." | Re-enter key |
| No payment method | PROVIDER_NO_PAYMENT | "Your {provider} account doesn't have a payment method. Add one at {consoleUrl} → Billing." | Link to provider billing |
| Server quota reached | PROVIDER_QUOTA | "Your {provider} account has reached its server limit. Delete an unused server or contact {provider} support." | Link to provider console |

**LLM + channel validation errors:**

| Error | Code | User Message | Recovery |
|-------|------|-------------|----------|
| Invalid LLM API key | INVALID_LLM_KEY | "This API key didn't work. We tried a test request and got an authentication error. Check that the key is active and has credits." | Re-enter key |
| Invalid channel token | INVALID_CHANNEL_TOKEN | "This bot token isn't valid. For Telegram: get it from @BotFather. For Discord: get it from the Developer Portal." | Re-enter token |

**Deployment errors:**

| Error | Code | User Message | Recovery |
|-------|------|-------------|----------|
| Rate limited | RATE_LIMITED | "You've already deployed a server in the last hour. Wait a bit and try again, or use the CLI tool." | Wait / use CLI |
| Server creation failed | SERVER_CREATE_FAILED | "{Provider} couldn't create the server. This usually means a temporary issue on their end. Try again in a few minutes." | Retry button |
| Health timeout (>10 min) | TIMEOUT | "Your server was created but setup is taking longer than expected. This usually means a package download is slow. Your server IP is {ip} — you can SSH in and check `/var/log/holdmyclaw-setup.log`" | Show IP + SSH instructions |
| Server unreachable | UNREACHABLE | "Can't reach your server. It may still be starting up. Try refreshing in 2 minutes." | Auto-retry with countdown |

**Local Docker errors:**

| Error | User Message | Recovery |
|-------|-------------|----------|
| Docker not installed | "Docker doesn't seem to be installed. Download Docker Desktop from docker.com." | Link to docker.com |
| Docker not running | "Docker is installed but not running. Start Docker Desktop and try again." | Instructions |
| Port 18789 in use | "Port 18789 is already in use by another service on your computer." | Suggest changing port |

**Critical failure recovery (cloud deployments):**
- If a server is created but setup fails, the user STILL has a running server that costs money
- Always show the server IP AND a direct link to the provider's console (`{consoleUrl}`)
- Store `serverIp` and `consoleUrl` in `localStorage` on creation so it survives page refresh
- Show: "If something went wrong, you can delete this server at {consoleUrl} to stop billing."
- If the browser closes mid-deployment, the server still completes setup (Cloud-Init is independent)

### Rate Limiting

- **Natural gate:** Requiring a cloud provider API key means users need a real account — this alone prevents most abuse
- **IP-based throttle:** 1 deployment per IP per hour, stored in Vercel KV (free tier: 256 daily commands, 30-day TTL entries)
- **No API access:** No public deploy API — only the wizard UI and CLI trigger deployments
- **CLI exemption:** The CLI runs locally and calls provider APIs directly (not through our Vercel route), so it's not rate-limited by us

### Wizard State Management

```typescript
// packages/web/app/setup/page.tsx — single page, no URL routing per step

// All wizard steps are components rendered by a single page.
// State stored in useReducer. No URL routing per step (avoids back-button issues).

interface WizardState {
  step: number;                    // 1-7
  // Step 1: Deployment target
  deployTarget: 'cloud' | 'local' | null;
  cloudProvider: 'hetzner' | 'digitalocean' | null;
  providerApiKey: string;
  providerValidated: boolean;
  region: string;
  // Step 2: LLM
  llmProvider: LLMProvider;
  llmApiKey: string;
  llmValidated: boolean;
  // Step 3: Channel
  channel: Channel;
  channelToken: string;            // Telegram botToken or Discord token (not WhatsApp)
  channelValidated: boolean;
  // Step 4: Customization
  personality: string;             // → SOUL.md content
  agentName: string;               // → IDENTITY.md name field
  agentEmoji: string;              // → IDENTITY.md emoji field
  dmPolicy: 'pairing' | 'open';   // Security vs ease tradeoff
  // Step 5: Deployment / Download
  deploying: boolean;
  serverIp: string | null;
  statusToken: string | null;
  consoleUrl: string | null;
  dashboardUrl: string | null;     // http://<serverIp>:18789 — the Control UI
  sshPublicKey: string | null;     // Only public key in state
  deployError: string | null;
  healthReady: boolean;
  // Step 6: First Message + Pairing (cloud only)
  pairingApproved: boolean;
  // Step 7: Done
}

type LLMProvider = 'anthropic' | 'openai' | 'google' | 'openrouter';
type Channel = 'telegram' | 'whatsapp' | 'discord';

// NOTE: Ollama removed from web wizard (requires local GPU, not suitable for
// non-technical cloud deployment). Available via CLI for advanced users.
```

**Flow by deployment target:**

- **Cloud (Hetzner/DigitalOcean):**
  Step 1: Provider selection + API key → Step 2: LLM → Step 3: Channel → Step 4: Customize → Step 5: Deploy (poll) → Step 6: Done

- **Local Docker:**
  Step 1: Local selected → Step 2: LLM → Step 3: Channel → Step 4: Customize → Step 5: Generate + Download zip → Step 6: Instructions

**Credential safety:**
- On cloud deploy (Step 5), before calling `/api/deploy`:
  - Generate SSH key pair client-side (Web Crypto API or `tweetnacl` library)
  - Trigger immediate `.pem` file download of private key
  - Store `serverIp` + `consoleUrl` in `localStorage` as backup
- On Done (Step 6):
  - Display credentials from React state
  - "Download SSH Key Again" button (from state, not from server)
  - If page refreshes: show recovery message with serverIp from localStorage and reminder to check Downloads folder for the .pem file
- Add `beforeunload` event warning if `deploying === true`

### Wizard UI Flow (Web)

```
Step 1: Where to Deploy

  Where do you want to run your agent?

  [Cloud icon] Cloud Server (Recommended)
    Always-on, accessible from anywhere. ~$4-6/month.

    [Hetzner logo]       Hetzner         — From $4/month  (Best value)
    [DigitalOcean logo]  DigitalOcean    — From $6/month  (Most popular)

  [Laptop icon] My Computer
    Free. Runs while your computer is on.
    Requires Docker Desktop installed.

  (If cloud selected:)
  - "Paste your API key" → validate in real-time
  - Brief help: "Don't have an account? Here's how to create one and get an API key" (step-by-step text + screenshots)
  - Optional: select region (default: auto-select closest)

Step 2: AI Model
  - Select provider: Anthropic Claude / OpenAI / Google Gemini / OpenRouter / Local (Ollama)
  - Paste API key → validate in real-time
  - Brief explanation of each option + rough cost expectations

Step 3: Messaging Channel
  - Select: Telegram / WhatsApp / Discord
  - Telegram: Guided walkthrough for BotFather flow with screenshots, paste bot token → validate
  - Discord: Guided walkthrough for Developer Portal, paste bot token → validate
  - WhatsApp: Explanation that pairing happens after deployment (QR code scan)

Step 4: Customize Your Agent
  - Agent name (text input → becomes identity.name, e.g. "Samantha", "Jarvis")
  - Agent emoji (emoji picker → becomes identity.emoji, e.g. "🦞", "🤖")
  - Agent personality (text area → becomes SOUL.md — "How should your agent behave?")
    - Placeholder text: "e.g., Be concise and direct. Use casual language. Focus on productivity."
    - Default: sensible general-purpose personality if skipped
  - Who can message your bot? (radio → becomes dmPolicy)
    - "Only me (Recommended)" → pairing
    - "Anyone" → open
  - Default: skip all customization (sensible defaults applied)

Step 5: Deploy (cloud) / Download (local)
  (Cloud:)
  - Generate SSH key pair client-side, trigger .pem download
  - Call /api/deploy → create server
  - Browser polls /api/status every 10 seconds
  - Real-time progress display (terminal-style, estimated steps)
  - Final verification: test message or health check

  (Local:)
  - Generate config files in browser
  - "Download Setup Files" button → zip download
  - Show copy-pasteable terminal commands as alternative

Step 6: Connect to Your Agent (cloud only)
  - "Let's make sure your agent knows who you are"
  - Link to Dashboard: "Open your Dashboard → http://<serverIp>:18789"
  - For Telegram/Discord:
    - "Send a message to your bot — you'll get a pairing code back"
    - "Go to your Dashboard → Pairing → enter the code → Approve"
    - OR: "Already set to 'open' mode? Just send a message — it'll respond!"
  - For WhatsApp:
    - Show QR pairing instructions
    - "SSH into your server and run: docker compose run --rm openclaw-cli channels login"
    - "Scan the QR code with WhatsApp → Settings → Linked Devices → Link a Device"
  - [Screenshot: Dashboard pairing screen]

Step 7: Done
  (Cloud:)
  - "Your AI agent is live!"
  - Dashboard URL (prominent, bookmarkable): http://<serverIp>:18789
  - Server IP + SSH command (collapsible "Advanced" section)
  - Provider console link
  - "Managing Your OpenClaw" guide link
  - "Bookmark this page — save these details somewhere safe"

  (Local:)
  - Instructions: "Extract the zip and run: docker compose up -d"
  - "Visit http://localhost:18789 to access your agent dashboard"
  - For WhatsApp: QR pairing instructions
  - "Managing Your OpenClaw" guide link
```

### CLI Flow

```bash
$ npx holdmyclaw

  HoldMyClaw - Deploy OpenClaw in 5 minutes

  ? Where to deploy: (Use arrow keys)
  ❯ Hetzner (cloud — from $4/month)
    DigitalOcean (cloud — from $6/month)
    My Computer (local — free, requires Docker)

  ? Hetzner API key: ████████████████
  ✓ Hetzner API key validated

  ? LLM Provider: (Use arrow keys)
  ❯ Anthropic Claude
    OpenAI
    Google Gemini
    OpenRouter
    Ollama (local)

  ? Anthropic API key: ████████████████
  ✓ API key validated

  ? Messaging channel: (Use arrow keys)
  ❯ Telegram
    WhatsApp
    Discord

  ? Telegram bot token: ████████████████
  ✓ Bot token validated

  Deploying to Hetzner (fsn1)...
  [1/6] Creating server on Hetzner...          ✓ (45s)
  [2/6] Waiting for server boot...             ✓ (30s)
  [3/6] Securing server...                     ✓ (20s)
  [4/6] Installing Docker + OpenClaw...        ✓ (60s)
  [5/6] Configuring channels + model...        ✓ (15s)
  [6/6] Verifying deployment...                ✓ (10s)

  ✓ Your OpenClaw agent is live!

  Server IP:    203.0.113.42
  SSH:          ssh openclaw@203.0.113.42 -i ~/.holdmyclaw/keys/server.pem
  Dashboard:    http://203.0.113.42
  Console:      https://console.hetzner.cloud
  Guide:        https://holdmyclaw.com/guide

  Send a message to your Telegram bot to test it!
```

The CLI uses the exact same `core/provision.ts` module. No code duplication. Both web and CLI are completely free. The CLI calls provider APIs directly (not through our Vercel route), so it's not subject to our rate limiting.

### File Structure

```
holdmyclaw/
├── packages/
│   ├── core/                           # Shared provisioning logic
│   │   ├── src/
│   │   │   ├── providers/
│   │   │   │   ├── types.ts            # CloudProvider interface + shared types
│   │   │   │   ├── hetzner.ts          # Hetzner Cloud API adapter
│   │   │   │   ├── digitalocean.ts     # DigitalOcean API adapter
│   │   │   │   ├── local-docker.ts     # Local Docker file generator (no API calls)
│   │   │   │   └── index.ts            # Provider registry + factory function
│   │   │   ├── provision.ts            # Main pipeline orchestrator (provider-agnostic)
│   │   │   ├── validate.ts             # Input validation (API keys, tokens)
│   │   │   ├── cloud-init.ts           # Cloud-init script generator (shared across all cloud providers)
│   │   │   ├── openclaw-config.ts      # Config template rendering (openclaw.json, .env, docker-compose)
│   │   │   ├── verify.ts              # Health polling + test message verification
│   │   │   ├── ssh-keygen.ts           # SSH key pair generation (browser + Node.js paths)
│   │   │   └── types.ts               # Shared TypeScript types
│   │   ├── templates/
│   │   │   ├── cloud-init.sh.ts        # Cloud-init bash script template (parameterized)
│   │   │   ├── docker-compose.yml.ts   # Docker compose template
│   │   │   ├── openclaw.json.ts        # OpenClaw config template
│   │   │   ├── Caddyfile.ts            # Reverse proxy template
│   │   │   └── soul-default.md         # Default SOUL.md
│   │   ├── __tests__/
│   │   │   ├── validate.test.ts        # Validation function tests
│   │   │   ├── cloud-init.test.ts      # Script generation tests
│   │   │   ├── openclaw-config.test.ts # Config generation tests
│   │   │   └── provision.test.ts       # Integration test (mocked provider API)
│   │   ├── package.json                # "@holdmyclaw/core"
│   │   └── tsconfig.json
│   ├── web/                            # Next.js 15 app
│   │   ├── app/
│   │   │   ├── layout.tsx              # Root layout (fonts, meta tags, SEO)
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── setup/
│   │   │   │   └── page.tsx            # Wizard UI (single page, multi-step form)
│   │   │   ├── guide/
│   │   │   │   └── page.tsx            # "Managing Your OpenClaw" guide
│   │   │   ├── faq/
│   │   │   │   └── page.tsx            # FAQ page
│   │   │   └── api/
│   │   │       ├── deploy/route.ts     # Creates server via provider API
│   │   │       ├── status/route.ts     # Proxies health check to server (avoids mixed content)
│   │   │       └── validate/route.ts   # Validates API keys + tokens
│   │   ├── components/
│   │   │   ├── wizard/
│   │   │   │   ├── step-provider.tsx   # Step 1: deployment target + provider selection
│   │   │   │   ├── step-llm.tsx        # Step 2: LLM provider + API key
│   │   │   │   ├── step-channel.tsx    # Step 3: messaging channel + token
│   │   │   │   ├── step-customize.tsx  # Step 4: personality + identity + dmPolicy
│   │   │   │   ├── step-deploy.tsx     # Step 5: deployment progress (cloud)
│   │   │   │   ├── step-download.tsx   # Step 5: file generation + download (local)
│   │   │   │   ├── step-connect.tsx    # Step 6: first message + pairing approval
│   │   │   │   ├── step-done.tsx       # Step 7: dashboard link + credentials + guide
│   │   │   │   ├── wizard-shell.tsx    # Wizard container, step navigation, useReducer
│   │   │   │   └── inline-tutorial.tsx # Expandable tutorial panel (renders guide markdown)
│   │   │   ├── landing/
│   │   │   │   ├── hero.tsx            # Hero section with terminal demo
│   │   │   │   ├── how-it-works.tsx    # 3-step explainer
│   │   │   │   ├── what-you-get.tsx    # Feature checklist
│   │   │   │   ├── principles.tsx      # Core values section
│   │   │   │   └── final-cta.tsx       # Bottom CTA with mascot
│   │   │   ├── terminal-demo.tsx       # Animated terminal for landing page
│   │   │   ├── claw-mascot.tsx         # SVG mascot with state variants
│   │   │   └── ui/                     # Shared UI components (button, input, accordion)
│   │   ├── lib/
│   │   │   └── ssh-keygen-browser.ts  # Client-side SSH key generation (WebCrypto)
│   │   ├── e2e/
│   │   │   ├── wizard.spec.ts         # Playwright: wizard flow with mocked APIs
│   │   │   └── landing.spec.ts        # Playwright: landing page rendering + accessibility
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── cli/                            # npx holdmyclaw
│       ├── src/
│       │   ├── index.ts               # CLI entry point
│       │   └── prompts.ts             # Interactive prompts (@inquirer/prompts)
│       ├── __tests__/
│       │   └── cli.test.ts            # Smoke test
│       ├── package.json               # "holdmyclaw"
│       └── tsconfig.json
├── guides/
│   ├── wizard-inline/                  # Inline tutorials shown inside wizard steps
│   │   ├── create-hetzner-account.md   # Step-by-step Hetzner signup + API key
│   │   ├── create-digitalocean-account.md
│   │   ├── create-telegram-bot.md      # @BotFather walkthrough with screenshots
│   │   ├── create-discord-bot.md       # Developer Portal walkthrough
│   │   ├── whatsapp-pairing.md         # QR code pairing (post-deploy)
│   │   ├── get-anthropic-key.md        # Anthropic console walkthrough
│   │   ├── get-openai-key.md
│   │   ├── get-openrouter-key.md       # Recommended: one key for all models
│   │   ├── get-google-key.md
│   │   └── approve-first-message.md    # Pairing code approval via Dashboard
│   └── post-setup/
│       └── managing-your-openclaw.md   # Full post-setup reference guide
├── templates/
│   ├── docker-compose.yml              # Verified two-service compose template
│   ├── cloud-init.sh                   # Cloud-init provisioning script
│   └── configs/                        # openclaw.json per provider+channel combo
│       ├── anthropic-telegram.json5
│       ├── anthropic-discord.json5
│       ├── anthropic-whatsapp.json5
│       ├── openai-telegram.json5
│       ├── openai-discord.json5
│       ├── openai-whatsapp.json5
│       ├── openrouter-telegram.json5
│       ├── openrouter-discord.json5
│       ├── openrouter-whatsapp.json5
│       ├── google-telegram.json5
│       ├── google-discord.json5
│       └── google-whatsapp.json5
├── docs/
│   └── internal/
│       ├── strengths-weaknesses.md     # Internal: honest assessment
│       └── common-pitfalls.md          # Internal: known issues + fixes
├── tsconfig.base.json                  # Shared TypeScript config
├── vitest.config.ts                    # Test configuration
├── playwright.config.ts                # E2E test configuration
└── package.json                        # Monorepo root (npm workspaces)
```

### Monorepo & Build Configuration

**Root `package.json`:**
```json
{
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "npm run dev --workspace=packages/web",
    "build": "npm run build --workspace=packages/core && npm run build --workspace=packages/web",
    "build:cli": "npm run build --workspace=packages/core && npm run build --workspace=packages/cli",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "lint": "eslint packages/*/src"
  },
  "devDependencies": {
    "typescript": "^5.7",
    "vitest": "^3.0",
    "@playwright/test": "^1.50",
    "tsup": "^8.0"
  }
}
```

**Package structure:**
- `packages/core/package.json`: name `@holdmyclaw/core`, builds with `tsup` to `dist/` (ESM + CJS)
- `packages/web/package.json`: Next.js 15 app, depends on `"@holdmyclaw/core": "workspace:*"`
- `packages/cli/package.json`: name `holdmyclaw` (the `npx` name), depends on `"@holdmyclaw/core": "workspace:*"`

**TypeScript:**
- `tsconfig.base.json` at root with shared compiler options (`strict: true`, `target: "ES2022"`, `module: "ESNext"`)
- Each package extends: `{ "extends": "../../tsconfig.base.json" }`
- Core builds to ESM (for Next.js) + CJS (for CLI) via tsup

**Key dependency versions:**
| Package | Version | Used by |
|---------|---------|---------|
| Next.js | 15 | web |
| React | 19 | web |
| Tailwind CSS | 4 | web (styling — see Builder Directives) |
| Framer Motion | 11 | web |
| TypeScript | 5.7+ | all |
| Node.js | 22 | development runtime |
| commander | 12 | cli |
| @inquirer/prompts | 7 | cli |
| vitest | 3 | testing |
| Playwright | 1.50 | E2E testing |
| msw | 2 | API mocking in tests |
| tsup | 8 | core build |
| JSZip | 3 | web (local Docker zip generation) |
| tweetnacl | 1 | web (SSH key fallback) |
| react-markdown | 9 | web (render inline tutorial guides) |

### Testing Strategy

**packages/core/ (unit tests with Vitest):**
- `validate.test.ts`: test each validation function with valid/invalid inputs
- `cloud-init.test.ts`: test script generation produces valid bash with all template variables substituted, no `${...}` remaining
- `openclaw-config.test.ts`: test config generation produces valid JSON, .env has correct format
- `provision.test.ts`: integration test with mocked provider APIs (via msw) — full pipeline from input to server creation

**packages/web/ (E2E with Playwright):**
- `wizard.spec.ts`: walk through all 6 steps with mocked API responses — both cloud and local flows
- `landing.spec.ts`: verify landing page renders, animations don't crash, CTAs link correctly
- Accessibility: `axe-core` audit on landing page and wizard

**packages/cli/ (smoke test):**
- `cli.test.ts`: verify CLI starts, shows prompts, handles Ctrl+C gracefully

**Test infrastructure:**
- Mock all external APIs (Hetzner, DigitalOcean, Stripe, LLM providers) with `msw` (Mock Service Worker)
- Use Vitest for unit tests across all packages
- Use Playwright for browser E2E tests
- CI: GitHub Actions — run tests on every PR

---

## Part 4: OpenClaw Ecosystem Integration

### What the Wizard Should Know About

**Skills system:** OpenClaw has 3,000+ community skills on ClawHub (clawhub.ai). Skills are directories with a SKILL.md file. They extend agent capabilities: web search, email, calendar, cost tracking, cron jobs, etc.

**Our wizard should:**
- Offer 5-6 popular skills during setup (optional step):
  - `clawhub` — Browse and install more skills later
  - `cost-report` — Track AI API usage and costs
  - `cron-creator` — Create scheduled tasks from natural language
  - `brave-search` — Web search capability (requires free Brave API key)
  - `skill-creator` — Create new skills via conversation
- Pre-install `clawhub` by default so users can discover more skills
- Include a "Skills" section in the post-setup guide explaining how to find/install/create skills

### Messaging Platforms

**Supported by OpenClaw:**
Telegram, WhatsApp, Discord, Slack, Signal, iMessage (via BlueBubbles), Microsoft Teams, Google Chat, Matrix, Zalo, WebChat.

**Our wizard at launch:** Telegram + Discord + WhatsApp (the three most popular). Others can be added post-setup using the guide.

**Telegram setup flow:**
- User creates a bot via @BotFather in Telegram (guided with screenshots)
- Gets a bot token (format: `123456789:ABCDEF...`)
- Pastes token in wizard → we validate by calling Telegram's `getMe` API
- Token is baked into the config before deployment

**Discord setup flow:**
- User creates a bot in Discord Developer Portal (guided with screenshots)
- Gets a bot token
- Pastes token in wizard → we validate by calling Discord's API
- Token is baked into the config before deployment

**WhatsApp setup flow (Baileys QR code — NOT Business API):**

OpenClaw uses `@whiskeysockets/baileys` to connect via WhatsApp's Linked Devices feature. This is the same mechanism as WhatsApp Web — no Meta Business verification needed.

Setup flow:
1. User selects WhatsApp in wizard Step 3
2. Wizard shows explanation: "WhatsApp connects via Linked Devices — like adding WhatsApp Web"
3. **WhatsApp pairing happens AFTER deployment** (unlike Telegram/Discord where the token goes into the config before deploy). This is because the QR code is generated by the running OpenClaw instance.
4. After deployment completes (Step 6), wizard fetches QR code from the running OpenClaw instance
5. User opens WhatsApp → Settings → Linked Devices → Link a Device → scans QR code
6. Wizard confirms connection via OpenClaw's status endpoint

**Key architectural difference:** For Telegram/Discord, the token is embedded in the config before deployment. For WhatsApp, the config enables the WhatsApp channel but pairing happens post-deployment. The wizard flow must handle this ordering difference — WhatsApp gets an extra pairing step on the Done page.

**Risk warnings displayed during WhatsApp setup:**
- "WhatsApp connects via Linked Devices — the same technology as WhatsApp Web. No business account needed."
- "Note: Automated messaging may violate WhatsApp's Terms of Service. There is a risk of account restrictions. Consider using a secondary phone number."
- "Always use the official `@whiskeysockets/baileys` package. In December 2025, a malicious fork was discovered that stole user credentials and messages."

**Technical notes for WhatsApp:**
- WhatsApp channel config in `openclaw.json` does NOT need a pre-set token (unlike Telegram/Discord)
- QR pairing stores session credentials in the OpenClaw data directory on the server
- If the session drops (e.g., phone offline for ~14 days), user needs to re-pair by scanning a new QR code
- Baileys uses ~50MB RAM with sub-second startup — lightweight enough for a CX22

### LLM Providers

**Supported by OpenClaw:**
Anthropic Claude, OpenAI, Google Gemini, OpenRouter, xAI Grok, Groq, Mistral, Ollama (local), LM Studio, vLLM, Moonshot AI.

**Our wizard:** Anthropic / OpenAI / Google / OpenRouter / Ollama. These cover 95%+ of users. Others configurable post-setup.

### Agent Personality (SOUL.md + IDENTITY.md)

OpenClaw uses workspace files to define personality. SOUL.md = internal values. IDENTITY.md = external presentation (name, emoji, tone).

**Our wizard:** Optional text area for personality. Generates SOUL.md. Default is a sensible general-purpose personality if skipped.

### Known OpenClaw Pain Points Our Wizard Eliminates

1. Node.js 22+ requirement — Docker handles this
2. npm vs pnpm conflicts — Docker handles this
3. Security hardening — our cloud-init script handles UFW, fail2ban, SSH-only
4. Environment variable exposure — we use .env files (not inline in openclaw.json)
5. OAuth token expiration — we recommend setup tokens over OAuth
6. Configuration complexity — we generate openclaw.json from simple wizard inputs
7. WhatsApp QR code expiration — wizard handles timing with clear instructions
8. ~15% of community skills contain malicious instructions — security warning in guide
9. Memory issues with multiple channels — CX22 (4GB) handles 1-2 channels well

---

## Part 5: Documentation

### A. FAQ (on the website — /faq)

**1. What is HoldMyClaw?**
A free setup wizard that deploys OpenClaw on your own cloud server or local computer. We configure everything, and you own it completely. We don't manage anything after setup.

**2. What do I need before starting?**
- A cloud account (Hetzner or DigitalOcean — we walk you through creating one) OR Docker Desktop installed on your computer
- An API key from your LLM provider (OpenAI, Anthropic, Google, etc.)
- A Telegram/WhatsApp/Discord account for your bot's messaging channel

**3. Which cloud providers do you support?**
Hetzner and DigitalOcean at launch, with more providers coming soon. You can also run locally on your own computer with Docker — it's free and works while your computer is on.

**4. How long does setup take?**
About 5 minutes total for cloud. The wizard guides you through each step. Deployment itself takes 2-3 minutes. Local Docker setup is even faster — under 2 minutes.

**5. How much does it cost?**
HoldMyClaw is free. Your only ongoing costs are:
- Cloud server: ~$4/month on Hetzner, ~$6/month on DigitalOcean (billed directly by the provider to you). Or $0 if running locally.
- LLM API usage: varies by usage, typically $10-80/month depending on your model and volume
- We accept optional tips if the tool saved you time, but it's never required.

**6. Can I run it on my own computer?**
Yes! Choose "My Computer" in the wizard. You'll need Docker Desktop installed. The wizard generates all the config files, and you run `docker compose up -d`. Your agent runs while your computer is on.

**7. Do I need technical knowledge?**
No. The wizard handles everything. After setup, we give you a guide covering the basics: restarting your agent, updating it, and basic troubleshooting. If you can follow step-by-step instructions, you can manage it.

**8. What if I need help after setup?**
We provide a comprehensive "Managing Your OpenClaw" guide. Beyond that, the OpenClaw community (GitHub Discussions, Discord, Reddit) is active and helpful. We're a setup tool, not a support service — but the guide covers the most common scenarios.

**9. Can I add more messaging channels later?**
Yes. OpenClaw supports 12+ platforms. We set up your first channel during the wizard. The guide explains how to add more.

**10. What about security?**
For cloud deployments, we apply security hardening automatically: firewall (UFW), brute-force protection (fail2ban), SSH-only access, non-root user. Your API keys are stored as environment variables on your server, never on ours. We don't retain any of your credentials after setup.

**11. Can I install OpenClaw skills/plugins?**
Yes. We pre-install ClawHub (the skill registry) so you can discover and install any of 3,000+ community skills. The guide explains how. Note: always review skills before enabling them — a small percentage may contain malicious instructions.

**12. What about WhatsApp? Is it safe?**
WhatsApp connects via Linked Devices — the same mechanism as WhatsApp Web. No Meta Business account needed. However, automated messaging may technically violate WhatsApp's Terms of Service, which could lead to account restrictions. We recommend using a secondary phone number if this concerns you.

**13. What happens if HoldMyClaw shuts down?**
Nothing changes for you. Your agent runs on YOUR server (or your computer). There's zero dependency on us after setup. That's the whole point.

### B. Post-Setup Guide: "Managing Your OpenClaw" (on the website — /guide)

This is the key deliverable alongside the deployment itself. It's what makes the "walkaway" possible.

**Structure:**

```
1. Your Server Basics
   - How to SSH into your server (cloud) / accessing your local instance
   - Server IP and credentials (reminder to save them)
   - How to find your OpenClaw dashboard

2. Day-to-Day Management
   - Checking if your agent is running
     $ docker compose ps
     $ openclaw status --all
   - Restarting your agent
     $ docker compose restart
   - Viewing logs (what do they mean?)
     $ docker compose logs -f --tail 100

3. Updating OpenClaw
   - When to update (check GitHub releases or community channels)
   - How to update safely:
     $ docker compose pull
     $ docker compose up -d
   - How to roll back if something breaks:
     $ docker compose down
     $ docker compose up -d  # with previous image tag

4. Configuration Changes
   - Where your config lives: /opt/openclaw/.env and openclaw.json
     (local: wherever you extracted the zip)
   - Changing your LLM provider or API key
   - Adding a new messaging channel
   - Editing your agent's personality (SOUL.md)
   - Always restart after config changes

5. Installing Skills
   - What are skills? (brief explanation)
   - Using ClawHub to browse and install:
     $ clawhub install <skill-name>
   - Popular skills to try: web search, cost tracking, cron jobs
   - Security note: always review skills before enabling (~15% of community skills may contain malicious instructions)

6. Troubleshooting
   - Agent not responding? Run: openclaw doctor --fix
   - Channel disconnected? Check: openclaw status --deep
   - High API costs? Check: openclaw skill cost-report
   - Server unresponsive? SSH in and run: docker compose restart
   - Nuclear option: docker compose down && docker compose up -d
   - WhatsApp disconnected? Re-pair by scanning a new QR code

7. Security Basics
   - Don't share your SSH key
   - Don't expose port 18789 directly (Caddy handles HTTP on cloud; local is already protected)
   - Regularly update: apt update && apt upgrade (cloud only)
   - Keep your API keys in .env, not in openclaw.json

8. Managing Your Server (Cloud Only)
   - Your server costs ~$4-6/month — check your provider's billing page
   - To stop billing: delete the server from your provider's console
   - Provider console links:
     - Hetzner: console.hetzner.cloud
     - DigitalOcean: cloud.digitalocean.com

9. Useful Resources
   - OpenClaw docs: docs.openclaw.ai
   - OpenClaw community: GitHub Discussions, Discord
   - ClawHub skill registry: clawhub.ai
   - Hetzner docs: docs.hetzner.com
   - DigitalOcean docs: docs.digitalocean.com
   - Docker docs: docs.docker.com
```

### C. Internal Documentation (not on website — for our own use)

**C1. Strengths & Weaknesses (docs/internal/strengths-weaknesses.md)**

Strengths:
- Dead simple setup — 5 minutes to a working agent
- Free — zero friction, maximum adoption
- Multi-provider — Hetzner, DigitalOcean, or local Docker
- User owns everything — no lock-in, no dependency on us
- Zero server infrastructure — cloud-init means we don't even SSH into anything
- Docker-based — eliminates Node.js version conflicts, reproducible
- Security-hardened out of the box
- Community goodwill — only free tool in a market of subscription services
- No ongoing operational burden — Vercel free tier, no database, no monitoring

Weaknesses:
- No ongoing support — users are on their own after setup
- Limited to 2 cloud providers at launch (Hetzner + DigitalOcean) — users on AWS/GCP need manual setup
- OpenClaw-specific — if OpenClaw hype dies, the tool dies with it
- No monitoring — we don't know if a user's agent goes down
- Cloud-init is opaque — if the setup script fails, debugging is harder than SSH
- No revenue — entirely free, no monetization path
- Can be replicated — the provisioning pipeline isn't complex IP
- WhatsApp integration has ToS violation risk and potential ban issues

**C2. Common Pitfalls (docs/internal/common-pitfalls.md)**

Known OpenClaw issues to watch for:
1. Node.js < 22 causes install failures → Docker solves this
2. Using npm instead of pnpm causes dependency conflicts → Docker + pnpm inside container
3. `openclaw doctor` and `--update` replace `${VAR}` in config with plaintext → we use .env files
4. OAuth tokens expire silently → we recommend setup tokens
5. Settings like `web.braveApiKey` get stripped on restart → use env vars
6. Discord adapter has intermittent message delivery bugs → known issue, adapter-level
7. WhatsApp QR code expires quickly → handle in wizard with clear timing and retry
8. ~15% of community skills contain malicious instructions → security warning in guide
9. Memory management issues under load with multiple channels → CX22 (4GB) handles 1-2 channels well
10. Telegram Privacy Mode limits group message visibility → document in channel setup
11. Poisoned Baileys fork (Dec 2025) stole credentials → only use official @whiskeysockets/baileys
12. WhatsApp session drops if phone is offline for ~14 days → document re-pairing flow

---

## Part 6: Pricing

### Completely Free — No Payments, No Tips, No Catch

- **The tool is free.** No payment gate. No signup. No tips. No Stripe. Just use it.
- There is zero payment infrastructure in the product. No Stripe account needed. No checkout flow. No payment processing code.
- The user's only costs are their own cloud server (~$4-6/month, billed by their provider) and LLM API usage (billed by their provider).

**Why free:**
- Maximum adoption — zero friction means maximum users
- Maximum goodwill — "this person gave away a useful tool for free" is the strongest brand signal
- The community becomes your marketing team when the barrier is zero
- No payment code means less to build, less to maintain, less to break

**Abuse prevention without a paywall:**
- Cloud provider API key required (natural gate — you need a real account with payment method)
- Rate limit: 5 deployments per IP per hour via Vercel KV (generous but prevents scripted mass deploys)
- No public deploy API / no bulk deploy endpoint
- These measures prevent abuse without blocking legitimate users

---

## Part 7: Go-to-Market

### Guiding principle: Be genuinely helpful. The marketing IS the helpfulness.

**Week 1-2: Build the tool + build in public**
- Post daily build progress on X/Twitter (terminal screenshots, short screen recordings)
- Frame as: "I was frustrated setting up OpenClaw, so I'm building a tool to make it easy for everyone"
- NOT: "I'm building a business"
- Spend 30 min/day answering OpenClaw questions in GitHub Discussions, Discord, Reddit
- Don't promote. Just help. Become a recognized name.

**Week 2-3: Soft launch**
- Share in OpenClaw communities: "I built a free tool. Deploys OpenClaw on your own server in 5 minutes — Hetzner, DigitalOcean, or local Docker. You own everything. I walk away."
- Offer early access to first 50 users, collect feedback
- In a market where everyone charges subscriptions, "free" speaks for itself — no need to name anyone

**Week 3-4: Public launch**
- Product Hunt: screen recording demo, maker story
- Hacker News: "Show HN" post — the HN audience rewards technical honesty and open-source alignment
- Reddit: r/selfhosted (own-your-server angle), r/SideProject (indie maker story)
- Write one blog post: "How to deploy OpenClaw the easy way (and manage it yourself)"

**Week 4+: Let the community do the marketing**
- When the tool works well and is free, every "how do I set up OpenClaw?" gets answered with "use HoldMyClaw"
- Continue being helpful in OpenClaw communities
- Write the best OpenClaw tutorials on the internet
- Your name becomes synonymous with "the person who helps with OpenClaw"

**The real asset:** When OpenClaw hype fades in 6 months, you'll have:
- A recognized name in the AI agent community
- Proof that you ship useful things fast
- Goodwill and distribution for your next project
- A template for doing this again with the next wave

---

## Part 8: Execution Roadmap

### Step-by-Step Build Order (What to Do, In What Sequence)

**Phase 1: Foundation (Days 1-3)**
1. Register HoldMyClaw.com
2. Create accounts: Hetzner Cloud, DigitalOcean, Vercel (all free — no Stripe needed)
3. Set up monorepo: Next.js 15 + Tailwind CSS 4 + npm workspaces + tsconfig.base.json + tsup for core
4. Manually deploy OpenClaw on a Hetzner CX22 via Docker — time every step, document pain points
5. Manually deploy OpenClaw on a DigitalOcean Droplet — verify cloud-init works identically
6. Create X/Twitter account, post first "building in public" thread
7. Deploy placeholder landing page to Vercel (just hero section)

**Phase 2: Core Pipeline (Days 4-10)**
8. Build `core/providers/types.ts` — CloudProvider interface
9. Build `core/providers/hetzner.ts` — Hetzner API adapter
10. Build `core/providers/digitalocean.ts` — DigitalOcean API adapter
11. Build `core/providers/local-docker.ts` — Local Docker file generator
12. Build `core/cloud-init.ts` — generate the cloud-init bash script from user inputs
13. Build `core/openclaw-config.ts` — generate templates for openclaw.json, .env, docker-compose.yml
14. Build `core/ssh-keygen.ts` — SSH key pair generation (both browser WebCrypto and Node.js paths)
15. Build `core/validate.ts` — validate API keys and tokens against real APIs
16. Build `core/verify.ts` — poll health endpoint, send test message
17. Build `core/provision.ts` — orchestrate all above into one pipeline (provider-agnostic)
18. Write unit tests for core package (validate, cloud-init, config generation)
19. Test end-to-end: create server on Hetzner with cloud-init, wait for health, verify agent works
20. Test end-to-end: same on DigitalOcean

**Phase 3: Web Wizard (Days 11-16)**
21. Build wizard shell (useReducer, step navigation, progress indicator)
22. Build Step 1: deployment target + provider selection + API key validation
23. Build Step 2: LLM provider selection + API key validation
24. Build Step 3: messaging channel selection + token validation (including WhatsApp post-deploy note)
25. Build Step 4: optional customization (personality + skills)
26. Build Step 5 (cloud): deploy progress with terminal-style display + health polling via /api/status
27. Build Step 5 (local): file generation + zip download
28. Build Step 6: connect page — first message + pairing approval via Dashboard link
29. Build Step 7: done page with dashboard link, credentials (collapsible), guide link
30. Build API routes: /api/deploy, /api/status, /api/validate
31. Build client-side SSH key generation (WebCrypto + .pem download)
32. Build inline-tutorial component (expandable panel that renders guide markdown)
33. Integrate all 10 wizard inline tutorials into their respective steps

**Phase 4: CLI (Days 17-18)**
32. Build CLI package using commander + @inquirer/prompts
33. Connect to same core/provision.ts module
34. Test: `npx holdmyclaw` runs full flow in terminal (both cloud providers + local)
35. Publish to npm

**Phase 5: Content & Polish (Days 19-23)**
36. Write "Managing Your OpenClaw" guide (the full post-setup document)
37. Write FAQ page content
38. Build landing page (hero, how-it-works, principles, FAQ, CTA)
39. Generate claw mascot SVGs (idle, grabbing, success, wave states)
40. Add deployment terminal animation to landing page
41. Add kinetic typography animations (scroll weight transitions, counters)
42. Add responsive styles (tablet + mobile breakpoints)
43. Add SEO meta tags (Open Graph, Twitter Card, structured data)
44. Write internal documentation (service manual, strengths/weaknesses, pitfalls)
45. Write E2E tests (Playwright: wizard flow, landing page, accessibility audit)

**Phase 6: Launch (Days 24-28)**
46. 20-50 free beta deployments across Hetzner, DigitalOcean, and local Docker — collect feedback
47. Fix bugs found during beta
48. Public launch — post everywhere (see GTM section)

---

## Part 9: Costs

| Item | Cost | When |
|------|------|------|
| HoldMyClaw.com domain | ~$12/year | Day 1 |
| Hetzner test servers (during dev) | ~$10 | Days 4-15 |
| DigitalOcean test servers (during dev) | ~$10 | Days 4-15 |
| Vercel, npm, Vercel KV | $0 (free tiers) | Day 1 |
| **Total to launch** | **~$32** | |

Ongoing costs: effectively $0/month. Vercel free tier handles the traffic. Vercel KV free tier handles rate limiting (256 daily commands). No database. No monitoring infrastructure. No server to maintain. No payment processing.

---

## Part 10: Verification Plan

Before launching, verify the complete flow end-to-end:

1. **Hetzner cloud flow:** Complete wizard with real Hetzner credentials. Server should appear in user's own Hetzner dashboard within 3 minutes. Agent should respond to a test message.
2. **DigitalOcean cloud flow:** Same test with DigitalOcean. Droplet should appear in user's DO dashboard.
3. **Local Docker flow:** Complete wizard with "My Computer" selected. Download zip, extract, run `docker compose up -d`. Agent should be accessible at localhost.
4. **Input validation:** Enter invalid API keys for each provider → should show provider-specific error messages. Enter valid keys → should show success with account details.
5. **Security (cloud):** SSH into provisioned server. Confirm: non-root user, UFW active, fail2ban running, password auth disabled.
6. **OpenClaw running:** Confirm Docker containers are up. Run `openclaw status --all` inside container — should be clean.
7. **Channel working:** Send a message to the Telegram bot. Confirm it responds with the configured AI model. Test Discord similarly.
8. **WhatsApp pairing:** Complete deployment, scan QR code on Done page. Confirm WhatsApp messages reach the agent.
9. **CLI parity:** Run `npx holdmyclaw` with the same credentials on each provider. Should produce identical results.
10. **Dashboard access:** After deployment, open `http://<serverIp>:18789`. Confirm the OpenClaw Control UI loads and shows the running agent status.
11. **Pairing flow:** Send a first message to the Telegram bot. Confirm a pairing code is returned. Open the Dashboard, approve the code. Confirm subsequent messages get AI responses.
12. **Guide accuracy:** Follow every step in "Managing Your OpenClaw" guide on the deployed server. Every command should work.
12. **Error recovery:** Kill a server mid-deployment. Verify the wizard shows the server IP, provider console link, and "delete to stop billing" message. Verify localStorage backup works after page refresh.
13. **No data retained:** After deployment, confirm our Vercel app has zero record of the user's API keys, server IP, or credentials. Nothing stored (only rate-limit counters in KV with TTL).
14. **Rate limiting:** Deploy once, try deploying again immediately. Confirm rate limit message appears. Wait 1 hour, confirm second deploy works.
15. **Responsive:** Test wizard on mobile viewport (375px width). Verify all steps are usable, touch targets are adequate.
16. **Accessibility:** Run axe-core audit on landing page and wizard. Fix any critical violations.
17. **Non-technical user test:** Have someone non-technical attempt the wizard without help. They should succeed without asking a question.

---

## Part 11: Builder Directives

Explicit decisions and specifications to prevent ambiguity during AI-assisted building. Every item here is a DECISION, not a suggestion.

### Styling: Tailwind CSS 4

- **Framework:** Tailwind CSS 4 (the standard for Next.js 15 projects)
- **No CSS modules.** No styled-components. No vanilla CSS files. All styling via Tailwind utility classes.
- **Dark mode:** NONE. Do not add a dark mode toggle. The design is white-only. This is intentional.
- **Custom theme tokens** in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#111111",
        muted: "#6B7280",
        accent: {
          indigo: "#4F46E5",
          emerald: "#10B981",
          amber: "#F59E0B",
        },
        border: "#E5E7EB",
        "code-bg": "#F9FAFB",
      },
      fontFamily: {
        sans: ["var(--font-mona-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### Fonts: next/font/local

- **Mona Sans:** Self-hosted via `next/font/local` with `.woff2` files. Variable font (weight 100-900, width 75-125).
- **JetBrains Mono:** Self-hosted via `next/font/local` with `.woff2` files. Regular weight only.
- **Fallback:** System font stack (`system-ui, sans-serif` / `Menlo, monospace`)
- **Loading strategy:** `display: "swap"` for both (avoids FOIT)
- **Download:** Get `.woff2` files from GitHub (Mona Sans: github.com/mona-sans, JetBrains Mono: github.com/JetBrains/JetBrainsMono)

```typescript
// app/layout.tsx
import localFont from "next/font/local";

const monaSans = localFont({
  src: "./fonts/MonaSans[wght,wdth].woff2",
  variable: "--font-mona-sans",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

### prefers-reduced-motion

Every Framer Motion animation must be wrapped with a reduced-motion check:

```typescript
const prefersReducedMotion = useReducedMotion();

// For scroll-triggered weight animations:
const fontWeight = prefersReducedMotion ? 700 : scrollWeight;

// For Framer Motion components:
<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
/>
```

### Wizard State Persistence

- Wizard state is stored in `sessionStorage` (survives page refresh within tab, cleared on tab close)
- Sensitive fields (API keys, tokens) are cleared from `sessionStorage` on wizard completion (Step 7)
- Post-deploy recovery data (`serverIp`, `consoleUrl`, `dashboardUrl`) is stored in `localStorage` (survives tab close)
- `beforeunload` event warning if `deploying === true`

### Wizard Inline Tutorials

Each wizard step has an expandable "Need help?" panel that renders the corresponding guide from `guides/wizard-inline/`. These are pre-written markdown files rendered via `react-markdown` inside an `inline-tutorial.tsx` component.

The tutorials contain `[Screenshot: description]` placeholders. The AI builder should create simple placeholder images (colored rectangles with text labels) for these. Real screenshots will be added manually later.

### Validation Regex Patterns

```typescript
// packages/core/src/validate.ts

const TELEGRAM_BOT_TOKEN = /^\d{8,10}:[A-Za-z0-9_-]{35}$/;
const DISCORD_BOT_TOKEN = /^[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{6}\.[A-Za-z0-9_-]{27,}$/;
const ANTHROPIC_API_KEY = /^sk-ant-[A-Za-z0-9_-]{20,}$/;
const OPENAI_API_KEY = /^sk-[A-Za-z0-9_-]{20,}$/;
const OPENROUTER_API_KEY = /^sk-or-[A-Za-z0-9_-]{20,}$/;
const GOOGLE_API_KEY = /^AIza[A-Za-z0-9_-]{30,}$/;
const HETZNER_API_KEY = /^[A-Za-z0-9]{64}$/;
// DigitalOcean tokens are validated via API call only (no reliable regex)
```

### Region Auto-Selection

- Default regions: Hetzner → `fsn1` (Falkenstein, Germany), DigitalOcean → `nyc1` (New York)
- No geolocation. Just sensible defaults with a dropdown to override.
- Show region names in human-readable form: "Falkenstein, Germany" not "fsn1"

### Gateway Token Generation

```typescript
// packages/core/src/provision.ts
import { randomBytes } from "crypto";
const gatewayToken = randomBytes(32).toString("hex"); // 64 char hex string
```

In the browser (Web Crypto API):
```typescript
const array = new Uint8Array(32);
crypto.getRandomValues(array);
const gatewayToken = Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
```

### Terminal Animation Content (Hero)

The landing page hero terminal animation shows this exact sequence:

```
$ holdmyclaw deploy

  HoldMyClaw v1.0.0

  ✓ Connected to Hetzner                    0.8s
  ✓ Server created (Falkenstein, Germany)    1.2s
  ✓ Security hardened (firewall + SSH)       0.4s
  ✓ Docker installed                         0.6s
  ✓ OpenClaw configured                      0.3s
  ● Starting OpenClaw...                     [blinking cursor]
  ✓ OpenClaw is live!                        0.5s

  Dashboard:  http://203.0.113.42:18789
  Agent:      Ready — say hello on Telegram!

  Total time: 3 minutes 48 seconds
```

Each line types out character-by-character in JetBrains Mono. Completed lines turn emerald (#10B981) with a checkmark. Current line is indigo (#4F46E5) with a blinking cursor. Timing between lines: 800ms-1200ms.

### Guide Page Format

The "Managing Your OpenClaw" guide at `/guide` uses:
- Single scrollable page
- Sticky sidebar table of contents (desktop) / collapsible hamburger TOC (mobile)
- Anchor links for each section
- Copy buttons on all code blocks
- Responsive: sidebar collapses to top-bar on mobile (<768px)

### Status Endpoint Security

The `/api/status` endpoint uses a `statusToken` to prevent abuse:
- Token is a random 32-char hex string, generated at deploy time
- Stored in the browser's `sessionStorage` (same tab) and returned in the deploy response
- The Vercel function validates the token matches the deploy session (stored in Vercel KV with 15-minute TTL)
- Without the matching token, `/api/status` returns 403
- This prevents using our proxy as a port scanner

### No Dark Mode

The design is white-background only. Do NOT add:
- A theme toggle
- A dark mode stylesheet
- `prefers-color-scheme` media queries (except for `prefers-reduced-motion`)
- Any CSS custom properties for theme switching

### No Analytics

No tracking, no analytics, no cookies. The site is completely stateless from the user's perspective. No cookie banner needed.

### 404 Page

Route: `app/not-found.tsx`
- Claw mascot in "wave" state (tilted 20°)
- "Page not found" in Mona Sans Bold
- "The claw couldn't grab this one." in muted gray
- Link back to home

### Privacy Policy

Route: `app/privacy/page.tsx`
- Simple, honest privacy policy page
- States: "We process your API keys and server credentials transiently during deployment. Nothing is stored after your server is created. We don't use cookies, analytics, or tracking."
- Required because Hetzner's primary market is EU (GDPR)

### SEO Additions

- `robots.txt` at `public/robots.txt`: Allow all, sitemap reference
- `sitemap.xml` generated via Next.js metadata API
- `og:image`: 1200x630px image showing the terminal demo + claw mascot on white background
- Favicon: Generate from claw SVG at sizes 16x16, 32x32, 180x180 (Apple touch icon), plus `.ico`

### Pairing Solution for Non-Technical Users

The first-message pairing problem is solved with a TWO-OPTION approach in the wizard:

**During Step 4 (Customization), the wizard asks:**

> **Who should be able to message your bot?**
>
> [Only me (Recommended)]
> Your bot will only respond to you. You'll approve yourself with a simple code after deployment.
>
> [Anyone]
> Your bot responds to everyone who messages it. Good for shared bots.

- "Only me" → `dmPolicy: "pairing"` in config. Step 6 walks them through approval.
- "Anyone" → `dmPolicy: "open"` in config. Step 6 is skipped (no pairing needed).

For the "Only me" flow, Step 6 ("Connect to Your Agent") provides:
1. A direct link to the Dashboard: `http://<serverIp>:18789`
2. "Send any message to your bot on [Telegram/Discord]"
3. "You'll get a code back like: `ABC123`"
4. "Open your Dashboard (link above) → go to Pairing → enter the code → Approve"
5. "Now send another message — your agent will respond!"
6. [Screenshot: Dashboard pairing screen]

### WhatsApp: Deferred to "Advanced" Flow

WhatsApp requires QR code scanning via `openclaw channels login` which is an interactive CLI command on the server. This cannot be easily proxied through the wizard.

**For v1:** WhatsApp is listed in the wizard with an "Advanced Setup" badge. When selected:
- The wizard generates the config with `channels.whatsapp.enabled: true`
- Step 6 shows clear instructions:
  1. "WhatsApp requires one extra step after deployment"
  2. "Open your terminal and connect to your server:" `ssh openclaw@<serverIp> -i ~/Downloads/holdmyclaw-key.pem`
  3. "Run this command:" `cd /opt/openclaw && docker compose run --rm openclaw-cli channels login`
  4. "A QR code will appear. Scan it with WhatsApp → Settings → Linked Devices → Link a Device"
  5. "Once scanned, your agent is connected to WhatsApp!"
- Risk warning about WhatsApp ToS is shown
- Recommendation to use a secondary phone number

**For v2 (future):** Build a WebSocket proxy that forwards the QR code from the server to the wizard UI. This eliminates the SSH step entirely but adds significant complexity.

### Wizard Action Types (useReducer)

```typescript
type WizardAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_DEPLOY_TARGET'; target: 'cloud' | 'local' }
  | { type: 'SET_CLOUD_PROVIDER'; provider: 'hetzner' | 'digitalocean' }
  | { type: 'SET_PROVIDER_API_KEY'; key: string }
  | { type: 'SET_PROVIDER_VALIDATED'; validated: boolean }
  | { type: 'SET_REGION'; region: string }
  | { type: 'SET_LLM_PROVIDER'; provider: LLMProvider }
  | { type: 'SET_LLM_API_KEY'; key: string }
  | { type: 'SET_LLM_VALIDATED'; validated: boolean }
  | { type: 'SET_CHANNEL'; channel: Channel }
  | { type: 'SET_CHANNEL_TOKEN'; token: string }
  | { type: 'SET_CHANNEL_VALIDATED'; validated: boolean }
  | { type: 'SET_PERSONALITY'; text: string }
  | { type: 'SET_AGENT_NAME'; name: string }
  | { type: 'SET_AGENT_EMOJI'; emoji: string }
  | { type: 'SET_DM_POLICY'; policy: 'pairing' | 'open' }
  | { type: 'SET_DEPLOYING'; deploying: boolean }
  | { type: 'SET_SERVER_IP'; ip: string }
  | { type: 'SET_STATUS_TOKEN'; token: string }
  | { type: 'SET_CONSOLE_URL'; url: string }
  | { type: 'SET_DASHBOARD_URL'; url: string }
  | { type: 'SET_SSH_PUBLIC_KEY'; key: string }
  | { type: 'SET_DEPLOY_ERROR'; error: string | null }
  | { type: 'SET_HEALTH_READY'; ready: boolean }
  | { type: 'SET_PAIRING_APPROVED'; approved: boolean }
  | { type: 'RESET' };
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test

  e2e:
    runs-on: ubuntu-latest
    needs: lint-and-test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

### Vercel Deployment Configuration

- **Root directory:** `packages/web`
- **Build command:** `cd ../.. && npm run build`
- **Output directory:** `.next`
- **Node.js version:** 22
- **Environment variables:** None required (no secrets on our side)
- **Framework preset:** Next.js

No `vercel.json` needed — the default Next.js preset handles everything.
