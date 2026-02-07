# Non-Tech Wizard Todo — Complete Guidance for Safe Deployment

**Goal:** Every step of the flow (hero → final stage) gives users everything they need to deploy safely, without assuming technical knowledge.

**Principles:**
- Surface existing wizard-inline guides in the UI so "how do I get this?" is always one click away.
- Use plain language (tokens, login key, personality) and one-sentence context per step.
- Add safety/cost/trust copy where keys or money are involved.
- Ensure error states and recovery point to next steps or the guide.

---

## Phase 1: Guide content availability

Wizard-inline guides exist in `guides/wizard-inline/` but are not loaded by the web app. Make them available so steps can link or embed them.

- [ ] **1.1** Add wizard-inline content loader in `packages/web/lib/` (e.g. `wizard-inline-content.ts`) that resolves markdown from `guides/wizard-inline/` (support both repo-root and `packages/web` cwd).
- [ ] **1.2** Copy or symlink `guides/wizard-inline/*.md` into `packages/web/content/wizard-inline/` so the loader can find them in all run contexts (Vercel, local).
- [ ] **1.3** Add optional route `/setup/help/[slug]` (e.g. `telegram-bot`, `digitalocean-account`) that renders the corresponding wizard-inline guide as a full page (reuse guide-body markdown rendering). This gives "open full guide in new tab" for each help topic.
- [ ] **1.4** (Optional v1) Replace `[Screenshot: ...]` placeholders in wizard-inline guides with real screenshots, or add a short note at the top of each guide: "Screenshots coming soon — follow the links and button names."

**Guide → step mapping:**

| Step | Guides to surface |
|------|--------------------|
| 1 Provider | `create-hetzner-account.md`, `create-digitalocean-account.md` |
| 2 LLM | `get-anthropic-key.md`, `get-openai-key.md`, `get-google-key.md`, `get-openrouter-key.md` |
| 3 Channel | `create-telegram-bot.md`, `create-discord-bot.md`; for WhatsApp show `whatsapp-pairing.md` (context only) |
| 6 Connect | `approve-first-message.md`; for WhatsApp `whatsapp-pairing.md` |

---

## Phase 2: Wire guidance into wizard steps

Use `InlineTutorial` (or equivalent) so each step that asks for a key/token has a clear "Need help? Step-by-step guide" that opens the full guide or an inline summary.

- [ ] **2.1** **Step 1 (Provider)**  
  - Add InlineTutorial (or "Step-by-step guide" link) per provider: "Don't have a Hetzner account?" → full guide / help route for `create-hetzner-account`; same for DigitalOcean.  
  - One-line under API key field: "This token lets us create one server for you. We never store it."
- [ ] **2.2** **Step 2 (LLM)**  
  - Add InlineTutorial per selected provider: "How to get an Anthropic (Claude) API key" → `get-anthropic-key`; same for OpenAI, Google, OpenRouter.  
  - One-line: "You'll need an account and credits with this AI provider. We only use the key to set up your agent."
- [ ] **2.3** **Step 3 (Channel)**  
  - Add InlineTutorial: "How to create a Telegram bot and get the token" → `create-telegram-bot`; "How to create a Discord bot" → `create-discord-bot`.  
  - One-line: "This token lets your agent use your bot. Get it from Telegram's @BotFather or Discord's Developer Portal."
- [ ] **2.4** **Step 6 (Connect)**  
  - Add InlineTutorial / link: "First time? How to approve yourself (pairing code)" → `approve-first-message`.  
  - For WhatsApp: "How to connect WhatsApp (QR pairing)" → `whatsapp-pairing`, and de-emphasize the raw SSH/Docker command (see Phase 3).

---

## Phase 3: Copy and jargon (per-step)

- [ ] **3.1** **Step 1**  
  - Consider label "Account token" or "Cloud provider token" with help text: "Sometimes called API key or API token in your provider's dashboard."  
  - Keep "Validate key" or rename to "Check token."
- [ ] **3.2** **Step 2**  
  - Consider label "AI service key" or keep "API key" with one line: "Get this from your AI provider's website (e.g. console.anthropic.com)."  
  - Optional: one-line cost hint per provider (e.g. "Claude: pay-as-you-use; add credits in Anthropic Console.").
- [ ] **3.3** **Step 4 (Customize)**  
  - Change "Personality (SOUL.md)" → "Personality" with subtitle "How should your agent behave?" Remove "SOUL.md" from UI.
- [ ] **3.4** **Step 5 (Deploy)**  
  - Replace "Your SSH private key will download; keep it safe" with: "A **login key** file will download. Keep it safe — it's the only way to access your server later. We never see it."  
  - Add one line during deploy: "Don't close this tab until the setup finishes."
- [ ] **3.5** **Step 6 (Connect)**  
  - For WhatsApp: add a non-tech block first: "To connect WhatsApp you'll run one command on your server. If you're not comfortable with a terminal, use the **Managing Your OpenClaw** guide — it has a full WhatsApp pairing section." Then show the command as "Command to run (see guide for details)" or in a collapsible "Advanced."
- [ ] **3.6** **Step 7 (Done)**  
  - Use one term everywhere: either "Control UI" or "Dashboard" (pick one and use it in wizard + guide references).  
  - Put SSH command in a collapsible "Technical details (SSH)" with one sentence: "Use this only if you need to manage the server from a terminal."  
  - Add: "Save the Control UI link and the guide link somewhere safe. If you lose the login key file, you can't recover it — keep a backup."

---

## Phase 4: One-sentence context per step

Add a single line of context at the top of each step (above the fold) so users know why they're here.

- [ ] **4.1** Step 1: "Pick where your agent will run. Cloud = always on; My Computer = free but only when your PC is on."
- [ ] **4.2** Step 2: "Choose which AI your agent uses (e.g. Claude). You'll paste a key from that provider."
- [ ] **4.3** Step 3: "Choose where you'll talk to your agent (e.g. Telegram). You'll create a bot and paste its token here."
- [ ] **4.4** Step 4: (Optional) "Optional: give your agent a name and personality. You can skip and use defaults."
- [ ] **4.5** Step 5: "We'll create the server and install everything. A login key will download — save it; you'll need it to access your server."
- [ ] **4.6** Step 6: "Open the link below, then approve yourself (or send a message if you chose 'Anyone')."
- [ ] **4.7** Step 7: "Bookmark the Control UI link. Use the guide for restarting, updating, or connecting WhatsApp."

---

## Phase 5: Safety, cost, and trust

- [ ] **5.1** Near Step 1 and Step 2 key inputs: one line "We never store your keys. They're only used in this session to set up your agent."
- [ ] **5.2** Near key/token inputs: "Don't share this key or token with anyone. It controls your account or bot."
- [ ] **5.3** Step 1 (cloud): Keep or add cost hint: "~$4–6/month. New DigitalOcean accounts often get free credits."
- [ ] **5.4** Step 2: Short cost hint per LLM (e.g. "Claude: add credits in Anthropic Console; usage is pay-as-you-go.").

---

## Phase 6: Local (My Computer) path

- [ ] **6.1** Step 1 (My Computer): Add one line: "You'll need Docker Desktop installed and running. [Install Docker Desktop](https://www.docker.com/products/docker-desktop/) if you haven't already."
- [ ] **6.2** Step Download: Before "Download setup files", add: "You need **Docker Desktop** installed and running. [Get Docker Desktop](https://www.docker.com/products/docker-desktop/) if you haven't already."
- [ ] **6.3** Step Download: After download, replace raw commands with: "**Next:** Unzip the folder, open Terminal (Mac/Linux) or Command Prompt (Windows), go into the folder, and run: `docker compose up -d`. Then open the link below in your browser." Optional: "Docker runs your agent in a small, isolated environment on your computer."
- [ ] **6.4** Step Done (local): Same as above if shown again; ensure link to Control UI and guide is prominent.

---

## Phase 7: Hero and entry

- [ ] **7.1** Optional under hero CTA: "No account here — you'll use your own cloud and AI keys."
- [ ] **7.2** Optional in "How it works": Mention "You'll get step-by-step help for each key and token" so non-tech users know guidance is built in.

---

## Phase 8: Errors and recovery

- [ ] **8.1** Ensure validation error messages are plain language (e.g. "This token didn't work. Check that you copied the full key and that your account has credits/billing.") and, where useful, point to the relevant wizard-inline guide or guide section.
- [ ] **8.2** Deploy failure (timeout, server error): Show "What to do next" — e.g. "Check the [Troubleshooting](/guide#troubleshooting) section in the guide" and "You can check your server in the provider console: [link]."
- [ ] **8.3** "Invalid key" / "Invalid token": Add a short line: "Need to get a new key? Use the step-by-step guide above."

---

## Phase 9: Done page and after

- [ ] **9.1** Step 7: Explicit line: "Bookmark this page or save the Control UI link and the guide link somewhere safe."
- [ ] **9.2** (Optional) "Copy summary" button that puts server IP, Control UI URL, guide URL, and one-line SSH note into clipboard for pasting into a doc.

---

## Phase 10: Consistency and polish

- [ ] **10.1** Use "Control UI" or "Dashboard" consistently across wizard and guide references; update one set if the other is the source of truth.
- [ ] **10.2** Ensure `InlineTutorial` (or replacement) is accessible: focus management when opened, aria-expanded, and keyboard-close.
- [ ] **10.3** Quick pass: any remaining "API key," "SSH," "token" in user-facing copy has either a one-line explanation or a "Learn more" that points to the right guide.

---

## Order of work (suggested)

1. **Phase 1** — Content loader + help route so guides are available.
2. **Phase 2** — Wire guidance into Steps 1, 2, 3, 6 (biggest impact).
3. **Phase 3** — Copy and jargon (login key, personality, WhatsApp, Done).
4. **Phase 4** — One-sentence context per step.
5. **Phase 5** — Safety/cost/trust lines.
6. **Phase 6** — Local path (Docker prerequisite + instructions).
7. **Phase 7** — Hero/entry (optional).
8. **Phase 8** — Errors and recovery.
9. **Phase 9** — Done page.
10. **Phase 10** — Consistency and accessibility.

---

## Checklist: "Everything guidance needed to deploy safely"

Before calling this done, confirm:

- [ ] Every place we ask for a key or token has a visible "How do I get this?" (link or InlineTutorial).
- [ ] We never assume the user knows "API key," "SSH," "BotFather," or "Developer Portal" without a one-line explanation or link.
- [ ] Safety: "We never store your keys" and "Don't share keys" appear where keys are entered.
- [ ] Cost: Cloud and LLM steps mention money/credits where relevant.
- [ ] Errors point to next step or guide (troubleshooting, re-get key).
- [ ] Deploy-in-progress: "Don't close this tab" (or equivalent).
- [ ] Done: "Save these somewhere safe" and guide link; SSH in collapsible "Technical details."
- [ ] Local path: Docker prerequisite and clear "what to do after download."
- [ ] WhatsApp: Non-tech path (guide first); raw command de-emphasized.
- [ ] One term for "Control UI" / "Dashboard" everywhere.
