# Managing Your OpenClaw Agent

Congratulations. You have your own AI agent running on your own server. It belongs to you. Nobody else can see your conversations, read your data, or shut it off.

This guide is your reference for everything that comes next. Bookmark it. Come back whenever you need a refresher.

Most things you need to do can be done from your **Dashboard** -- a web page you open in your browser. No terminal skills required.

---

## 1. Your Agent at a Glance

Here is what you now have:

- **A personal AI agent** running 24/7 on a server you own.
- **A Dashboard** where you control everything from your browser.
- **A messaging channel** (Telegram, Discord, or WhatsApp) where you talk to your agent.
- **A cloud server** (Hetzner or DigitalOcean) that costs about $4-6 per month, billed directly to you by the provider.

### Bookmark These

| What | Where |
|------|-------|
| **Your Dashboard** | `http://YOUR_SERVER_IP:18789` -- open this in any browser |
| **Your cloud provider console** | [Hetzner Console](https://console.hetzner.cloud) or [DigitalOcean Console](https://cloud.digitalocean.com) |
| **SSH access** (advanced users only) | `ssh openclaw@YOUR_SERVER_IP -i path/to/your-key.pem` |

Replace `YOUR_SERVER_IP` with the IP address you received at the end of setup. It looks something like `203.0.113.42`.

> **Tip:** Open your Dashboard right now and bookmark it. This is the page you will visit most often.

---

## 2. The Dashboard (Your Control Center)

Your Dashboard is a web page that lets you manage your agent without ever touching a terminal. Think of it as your agent's "home screen."

### How to Open It

1. Open any web browser (Chrome, Safari, Firefox, Edge -- all work).
2. Type your Dashboard URL into the address bar: `http://YOUR_SERVER_IP:18789`
3. Press Enter.

You should see the OpenClaw Control UI.

### What the Dashboard Shows You

- **Agent status** -- Is your agent running? Is it connected to your messaging channel?
- **Recent conversations** -- See what your agent has been up to.
- **Connected channels** -- Which messaging apps are linked (Telegram, Discord, WhatsApp).
- **Installed skills** -- What extra abilities your agent has.
- **Settings** -- Change your agent's behavior without editing files.

### How to Check If Your Agent Is Running

Open your Dashboard. If the page loads and shows your agent's status, it is running. If the page does not load at all, your agent or server may be down. Jump to the Troubleshooting section below.

### How to View Recent Conversations

On the Dashboard, look for a "Conversations" or "Messages" section. This shows recent messages your agent has sent and received. You can browse through them to see how your agent is performing.

### How to Approve New Users (Pairing)

When someone sends a message to your agent for the first time, they will need to be approved. The Dashboard shows pending pairing requests. You can approve or deny each one from there. More on this in the next section.

### How to Change Settings

Many settings can be adjusted right from the Dashboard. Look for a "Settings" or "Configuration" section. Changes you make here take effect after your agent restarts (the Dashboard may do this automatically for you).

---

## 3. Talking to Your Agent

Your agent lives on a messaging app -- Telegram, Discord, or WhatsApp (whichever you chose during setup).

### Sending Your First Message

1. Open the messaging app where your agent lives.
2. Find your agent (it is the bot you created during setup).
3. Send any message. Say hello.

### What Happens the First Time (Pairing)

The first time you (or anyone) messages your agent, OpenClaw will ask for a **pairing code**. This is a security feature. It makes sure only people you approve can talk to your agent.

Here is how it works:

1. You send a message to your agent.
2. Your agent replies with a pairing code (a short string of characters).
3. Open your Dashboard (`http://YOUR_SERVER_IP:18789`).
4. Find the pending pairing request.
5. Approve it.
6. Go back to your messaging app and try again. Your agent will now respond normally.

> **You only need to do this once per user.** After you approve yourself, your agent will recognize you every time.

### What Your Agent Can Do Out of the Box

Right away, your agent can:

- Have conversations with you using the AI model you chose (Claude, GPT, Gemini, etc.).
- Remember context within a conversation.
- Follow the personality you defined (if you set one up during the wizard).
- Respond to multiple approved users.

### How to Reset a Conversation

If you want to start fresh and clear your agent's memory of the current conversation:

**Send this message to your agent:**

```
/reset
```

That is it. Your agent will forget the current conversation and start fresh.

---

## 4. Customizing Your Agent

You can change how your agent thinks, talks, and behaves.

### Changing Your Agent's Personality (SOUL.md)

**What is SOUL.md?**
It is a text file that tells your agent who it is on the inside. Think of it as your agent's core values, instructions, and personality guidelines. For example: "You are a helpful research assistant. You are concise and avoid jargon."

**How to edit it from the Dashboard:**
1. Open your Dashboard (`http://YOUR_SERVER_IP:18789`).
2. Look for a section about personality, soul, or agent configuration.
3. Edit the text and save.
4. Your agent will pick up the changes (it may need a restart).

**How to edit it via SSH (advanced):**
1. Connect to your server: `ssh openclaw@YOUR_SERVER_IP -i path/to/your-key.pem`
2. Open the file: `nano /opt/openclaw/SOUL.md`
3. Make your changes.
4. Save the file: press `Ctrl + X`, then `Y`, then `Enter`.
5. Restart your agent: `cd /opt/openclaw && docker compose restart`

### Changing Your Agent's Identity (IDENTITY.md)

**What is IDENTITY.md?**
This controls the outward presentation of your agent -- its name, emoji, and tone of voice. SOUL.md is who your agent *is*. IDENTITY.md is how your agent *presents itself*.

Edit it the same way as SOUL.md -- either from the Dashboard or via SSH at `/opt/openclaw/IDENTITY.md`.

### Changing Your AI Model

You chose an AI model during setup (like Claude, GPT, or Gemini). You can switch to a different one later.

**From the Dashboard:**
1. Open your Dashboard.
2. Look for a "Model" or "AI Provider" section in Settings.
3. Select a different model.
4. You may need to enter a new API key if you are switching providers (for example, from Anthropic to OpenAI).
5. Save and restart.

**Via SSH (advanced):**
1. Connect to your server.
2. Edit the config: `nano /opt/openclaw/config/openclaw.json`
3. Find the `"model"` section and change the `"primary"` value.
4. If switching providers, update the API key in `/opt/openclaw/.env`.
5. Save and restart: `cd /opt/openclaw && docker compose restart`

> **About API keys:** Each AI provider (Anthropic, OpenAI, Google) has its own API key. If you switch providers, you need an API key from the new one. Your current key still works for the current provider.

---

## 5. Adding Skills (Superpowers)

### What Are Skills?

Skills are add-ons that give your agent new abilities. Without skills, your agent can have conversations. With skills, your agent can search the web, track your AI costs, run scheduled tasks, and much more.

Think of skills like apps on a phone. Your phone works without apps, but apps make it way more useful.

### Popular Skills to Try

| Skill | What It Does |
|-------|-------------|
| **brave-search** | Lets your agent search the web and find current information |
| **cost-report** | Tracks how much you are spending on AI API calls |
| **cron-creator** | Lets your agent set up scheduled tasks using plain English |
| **skill-creator** | Lets your agent build new skills for itself through conversation |
| **clawhub** | Browse and install skills from the community registry |

### How to Install a Skill

**From the Dashboard:**
1. Open your Dashboard.
2. Look for a "Skills" section.
3. Browse available skills or search by name.
4. Click "Install" on the skill you want.

**Via SSH (advanced):**
1. Connect to your server.
2. Run: `cd /opt/openclaw && docker compose exec openclaw clawhub install <skill-name>`

For example, to install the cost tracking skill:
```
docker compose exec openclaw clawhub install cost-report
```

### Browse More Skills

Visit **[clawhub.ai](https://clawhub.ai)** to see all 3,000+ community-created skills.

### A Word About Safety

Most skills are created by community members, not by the OpenClaw team. Before enabling a skill from an unknown author:

- Read its description carefully.
- Check if other people are using it (look at install counts).
- Be cautious with skills that ask for access to sensitive data.
- When in doubt, skip it.

> **Think of it like installing an app from an unknown developer.** Most are fine, but it pays to be careful.

---

## 6. Adding More Messaging Channels

You started with one messaging channel. You can add more so your agent is reachable on multiple platforms at once.

### Adding Telegram

If you did not set up Telegram during the wizard:

1. Open Telegram and search for **@BotFather**.
2. Send `/newbot` and follow the prompts to create a bot.
3. BotFather will give you a **bot token** (a long string that looks like `123456789:ABCdefGHI...`).
4. Add this token to your agent's configuration:
   - **Dashboard:** Go to Settings, find the Channels section, add Telegram, and paste your token.
   - **SSH:** Edit `/opt/openclaw/config/openclaw.json`, add a Telegram section with your token, and restart.
5. Restart your agent if prompted.

> See the full Telegram setup walkthrough in the wizard inline guides for step-by-step screenshots.

### Adding Discord

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click "New Application" and give it a name.
3. Go to the "Bot" section and click "Add Bot."
4. Copy the **bot token**.
5. Add the token to your agent's configuration:
   - **Dashboard:** Settings > Channels > Add Discord > paste token.
   - **SSH:** Edit `/opt/openclaw/config/openclaw.json`, add a Discord section with your token, and restart.
6. Invite the bot to your Discord server using the OAuth2 URL from the Developer Portal.
7. Restart your agent if prompted.

### Adding WhatsApp

WhatsApp works differently from Telegram and Discord. Instead of a token, it uses a pairing process (similar to linking WhatsApp Web on your computer).

1. **Via SSH:** Connect to your server and run:
   ```
   cd /opt/openclaw && docker compose run --rm openclaw-cli channels login
   ```
2. A QR code will appear in your terminal.
3. Open WhatsApp on your phone.
4. Go to **Settings > Linked Devices > Link a Device**.
5. Scan the QR code with your phone.

> **Important:** We recommend using a secondary phone number for WhatsApp. Automated messaging may violate WhatsApp's Terms of Service, which could lead to account restrictions on your primary number.

> **Note:** If your phone is offline for more than about 14 days, the WhatsApp connection will drop. You will need to repeat the pairing process above.

---

## 7. Keeping Things Running

Your agent is designed to run on its own. Here is what you need to know.

### It Auto-Restarts

If your server reboots (for example, after a security update), your agent will start up again automatically. This is built in. You do not need to do anything.

### Checking If Everything Is OK

**The easy way:** Open your Dashboard (`http://YOUR_SERVER_IP:18789`). If it loads and shows your agent as running, everything is fine.

**Via SSH (advanced):**
```
cd /opt/openclaw && docker compose ps
```

This shows you whether the OpenClaw container is running. You should see a status of "Up" or "running."

### Restarting Your Agent

Sometimes you need to restart -- for example, after changing settings.

**Via SSH:**
```
cd /opt/openclaw && docker compose restart
```

This takes about 10-30 seconds. Your agent will be briefly unavailable during the restart, then come back on its own.

### Viewing Logs (What Your Agent Has Been Doing)

If something seems wrong, logs can help you (or someone helping you) figure out what happened.

**Via SSH:**
```
cd /opt/openclaw && docker compose logs -f --tail 100
```

This shows the last 100 lines of activity and continues showing new lines as they happen. Press `Ctrl + C` to stop watching.

---

## 8. Updating OpenClaw

The OpenClaw team regularly releases updates with new features, bug fixes, and improvements. Updating is straightforward.

### When to Update

- Check the [OpenClaw GitHub releases page](https://github.com/openclaw/openclaw/releases) periodically.
- Follow OpenClaw community channels (Discord, GitHub Discussions) for announcements.
- There is no auto-update. You decide when to update.

### How to Update (SSH Required)

1. Connect to your server:
   ```
   ssh openclaw@YOUR_SERVER_IP -i path/to/your-key.pem
   ```

2. Navigate to the OpenClaw directory and pull the latest version:
   ```
   cd /opt/openclaw
   docker compose pull
   docker compose up -d
   ```

That is it. Docker will download the latest version and restart your agent with the new code. Your conversations and settings are preserved.

### How to Roll Back If Something Breaks

If an update causes problems, you can go back to a previous version:

1. Connect to your server.
2. Open the `.env` file:
   ```
   nano /opt/openclaw/.env
   ```
3. Find or add this line, replacing `X.Y.Z` with the version number you want:
   ```
   OPENCLAW_VERSION=X.Y.Z
   ```
4. Update the `docker-compose.yml` to use the pinned version. Find the `image:` line and change it:
   ```
   image: ghcr.io/openclaw/openclaw:X.Y.Z
   ```
5. Save the file and restart:
   ```
   cd /opt/openclaw
   docker compose up -d
   ```

> **How to find version numbers:** Check the [OpenClaw GitHub releases page](https://github.com/openclaw/openclaw/releases). Each release has a version number like `1.2.3`.

---

## 9. Your Server and Billing

### What You Are Paying For

Your agent runs on a cloud server. That server costs about **$4-6 per month**, depending on your provider:

- **Hetzner:** Approximately $4/month
- **DigitalOcean:** Approximately $6/month

This is billed directly to you by the cloud provider. HoldMyClaw does not charge you anything.

You also pay for AI API usage (the cost of your agent "thinking"). This varies by how much you use it and which model you chose. Typical range: $10-80/month.

### How to Check Your Bill

- **Hetzner:** Log in at [console.hetzner.cloud](https://console.hetzner.cloud) and check the Billing section.
- **DigitalOcean:** Log in at [cloud.digitalocean.com](https://cloud.digitalocean.com) and check the Billing section.

### How to Stop Billing

If you want to stop paying for the server entirely, you need to **delete the server** from your cloud provider's console.

- **Hetzner:** Log in > find your server > click "Delete."
- **DigitalOcean:** Log in > find your Droplet > click "Destroy."

> **WARNING:** Deleting the server permanently destroys your agent and all its data. There is no undo. If you want to keep your settings, back them up first (see below).

### How to Back Up Before Deleting

Before deleting your server, save your configuration files so you can redeploy later:

1. Connect via SSH.
2. Copy these files to your computer:
   - `/opt/openclaw/.env` (your API keys and environment settings)
   - `/opt/openclaw/config/openclaw.json` (your agent configuration)
   - `/opt/openclaw/SOUL.md` (your agent's personality, if you created one)
   - `/opt/openclaw/IDENTITY.md` (your agent's identity, if you created one)

You can copy files from the server to your computer using this command (run it on your own computer, not on the server):

```
scp -i path/to/your-key.pem openclaw@YOUR_SERVER_IP:/opt/openclaw/.env ./backup-env
scp -i path/to/your-key.pem openclaw@YOUR_SERVER_IP:/opt/openclaw/config/openclaw.json ./backup-config.json
```

---

## 10. Troubleshooting

Here are the most common issues and how to fix them.

### Agent Not Responding to Messages

**Step 1:** Check your Dashboard (`http://YOUR_SERVER_IP:18789`). Does it load? If yes, your server is running. Look at the agent status and channel connections.

**Step 2:** If the Dashboard loads but the agent is not responding, restart it via SSH:
```
cd /opt/openclaw && docker compose restart
```

**Step 3:** If the Dashboard does not load at all, your server may be stopped. Check your cloud provider's console (Hetzner or DigitalOcean) to make sure the server is running.

### Messaging Channel Disconnected

If your agent is running but not receiving messages from Telegram, Discord, or WhatsApp:

```
cd /opt/openclaw && docker compose run --rm openclaw-cli channels status
```

This shows the status of each connected channel. If one shows as disconnected, check that the bot token is still valid (tokens can sometimes expire or get revoked).

### WhatsApp Stopped Working

WhatsApp connections can drop if your phone was offline for an extended period. To reconnect:

```
cd /opt/openclaw && docker compose run --rm openclaw-cli channels login
```

Scan the new QR code with your phone, just like you did during setup.

### High AI Costs

If your AI API bill is higher than expected, install the cost tracking skill:

```
cd /opt/openclaw && docker compose exec openclaw clawhub install cost-report
```

Then ask your agent: "How much have I spent on AI this month?" The skill will give you a breakdown.

You can also switch to a less expensive AI model (see Section 4 above).

### Server Unreachable (Dashboard Won't Load)

1. **Check your cloud provider's console.** Log in to [Hetzner](https://console.hetzner.cloud) or [DigitalOcean](https://cloud.digitalocean.com). Make sure the server shows as "Running."
2. If the server shows as stopped, start it from the console.
3. If the server is running but the Dashboard still won't load, try connecting via SSH. If SSH also fails, the server may need to be rebooted from the provider's console.

### The Nuclear Option (Full Reset)

If nothing else works and you just want to start over, this stops everything and starts it fresh:

```
cd /opt/openclaw && docker compose down && docker compose up -d
```

This shuts down all containers and starts them again from scratch. Your configuration files and data are preserved.

---

## 11. Security Basics

You do not need to be a security expert. These basics will keep you safe.

### Protect Your SSH Key

Your SSH key file (the `.pem` file you downloaded during setup) is like a master key to your server. Keep it safe.

- Do not email it to anyone.
- Do not upload it to Google Drive or Dropbox.
- Do not share it in chat messages.
- Store it in a safe place on your computer. If you lose it, you will need to create a new server.

### Protect Your Dashboard URL

Your Dashboard is accessible to anyone who knows the URL. Do not share your server's IP address with people you do not trust.

> **Good news:** The firewall on your server only allows connections on specific ports. Your server is not wide open to the internet. But the Dashboard itself does not require a password by default, so keep the URL private.

### Keep Your API Keys Private

Your AI provider API key (Anthropic, OpenAI, Google, etc.) is linked to your billing. If someone else gets it, they can run up charges on your account.

- Do not share your `.env` file (it contains your API keys).
- If you suspect a key has been compromised, revoke it immediately from the provider's website and generate a new one.

### Security Updates Happen Automatically

Your server is configured to install security patches automatically (via unattended-upgrades). You do not need to do anything for this. It happens in the background.

---

## 12. Getting Help

You are not alone. Here is where to go when you need help.

### OpenClaw Resources

| Resource | What It Is | Link |
|----------|-----------|------|
| **OpenClaw Docs** | Official documentation for OpenClaw | [docs.openclaw.ai](https://docs.openclaw.ai) |
| **OpenClaw Community** | Ask questions, share tips, get help from other users | [GitHub Discussions](https://github.com/openclaw/openclaw/discussions) and [Discord](https://discord.gg/openclaw) |
| **ClawHub** | Browse and install skills for your agent | [clawhub.ai](https://clawhub.ai) |

### Cloud Provider Resources

| Provider | Documentation | Support |
|----------|--------------|---------|
| **Hetzner** | [docs.hetzner.com](https://docs.hetzner.com) | Support ticket from console |
| **DigitalOcean** | [docs.digitalocean.com](https://docs.digitalocean.com) | Support ticket from console |

### HoldMyClaw

HoldMyClaw is a setup tool, not an ongoing support service. But the resources above should cover everything you need. The OpenClaw community is active and friendly -- do not hesitate to ask questions there.

If you run into a problem specific to HoldMyClaw setup, you can reach us at **hello@holdmyclaw.com**.

---

## Quick Reference Card

Keep this handy for the most common tasks.

| I want to... | Do this |
|--------------|---------|
| Check if my agent is running | Open `http://YOUR_SERVER_IP:18789` in your browser |
| Restart my agent | SSH in, then: `cd /opt/openclaw && docker compose restart` |
| Update OpenClaw | SSH in, then: `cd /opt/openclaw && docker compose pull && docker compose up -d` |
| Reset a conversation | Send `/reset` to your agent in the messaging app |
| Install a skill | Dashboard > Skills > Install, or SSH: `docker compose exec openclaw clawhub install <name>` |
| View logs | SSH in, then: `cd /opt/openclaw && docker compose logs -f --tail 100` |
| Edit personality | Dashboard > Settings > Personality, or SSH: `nano /opt/openclaw/SOUL.md` then restart |
| Stop paying for the server | Delete the server from your cloud provider's console |
| Back up my config | Copy `/opt/openclaw/.env` and `/opt/openclaw/config/openclaw.json` to your computer |

---

*This guide was created by [HoldMyClaw](https://holdmyclaw.com). Your agent, your server, your data. Always.*
