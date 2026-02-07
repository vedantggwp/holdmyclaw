# Common Pitfalls

Known OpenClaw issues to watch for. Internal reference. Not for the website.

---

1. **Node.js &lt; 22 causes install failures** → Docker solves this
2. **Using npm instead of pnpm causes dependency conflicts** → Docker + pnpm inside container
3. **`openclaw doctor` and `--update` replace `${VAR}` in config with plaintext** → we use .env files
4. **OAuth tokens expire silently** → we recommend setup tokens
5. **Settings like `web.braveApiKey` get stripped on restart** → use env vars
6. **Discord adapter has intermittent message delivery bugs** → known issue, adapter-level
7. **WhatsApp QR code expires quickly** → handle in wizard with clear timing and retry
8. **~15% of community skills contain malicious instructions** → security warning in guide
9. **Memory management issues under load with multiple channels** → CX22 (4GB) handles 1–2 channels well
10. **Telegram Privacy Mode limits group message visibility** → document in channel setup
11. **Poisoned Baileys fork (Dec 2025) stole credentials** → only use official @whiskeysockets/baileys
12. **WhatsApp session drops if phone is offline for ~14 days** → document re-pairing flow
