# Connect WhatsApp to Your AI Agent

**Estimated time: 5 minutes** (after deployment)

WhatsApp works differently from Telegram or Discord. Instead of creating a bot account, your AI agent connects to a **real WhatsApp account** using a feature called "Linked Devices" — the same feature you'd use to connect WhatsApp to your computer.

**You don't need to do anything right now.** The WhatsApp connection happens **after** your server is deployed. This guide tells you what to expect and how to complete the pairing process.

---

## What Is "Linked Devices"?

When you use WhatsApp Web (WhatsApp on your computer), you scan a QR code with your phone to connect it. This is called "Linked Devices." Your AI agent uses the exact same method — it shows you a QR code, you scan it with your phone, and your WhatsApp account is connected to the AI agent.

Once connected, the AI agent can read and send messages on behalf of your WhatsApp account.

---

## Important Warning: Read This First

> **WhatsApp Terms of Service:** WhatsApp does not officially allow bots or automated accounts. Using an automated system with your WhatsApp account **could result in your account being temporarily or permanently banned by WhatsApp**. This is rare with normal usage, but it's a real risk.

> **Our strong recommendation:** Use a **secondary phone number** for this — not your main personal WhatsApp account. You can get a cheap prepaid SIM card or use a VoIP number to create a separate WhatsApp account specifically for your AI agent. That way, if anything happens, your personal WhatsApp is safe.

---

## What You'll Need

- Your **phone** with the WhatsApp app installed
- The WhatsApp account you want to use (ideally a secondary number)
- Your server must already be **deployed and running** (the wizard will tell you when it's ready)

---

## Step 1: Wait for Deployment to Finish

1. Complete all the other steps in the setup wizard.
2. Wait for the wizard to confirm that your server is **deployed and running**.
3. The wizard will show you a **QR code** on screen, or it will give you a URL where you can find the QR code.

[Screenshot: Wizard showing deployment complete and QR code for WhatsApp pairing]

> **Don't see a QR code?** You can also find it by going to your OpenClaw Dashboard at `http://YOUR_SERVER_IP:18789` in your browser (the wizard will give you the exact address).

---

## Step 2: Open WhatsApp on Your Phone

1. Pick up your **phone**.
2. Open the **WhatsApp** app.

---

## Step 3: Open Linked Devices

### On iPhone:

1. Tap **"Settings"** (gear icon in the bottom-right corner).
2. Tap **"Linked Devices"**.

### On Android:

1. Tap the **three dots** (menu) in the top-right corner.
2. Tap **"Linked Devices"**.

[Screenshot: WhatsApp settings showing "Linked Devices" option on both iPhone and Android]

---

## Step 4: Scan the QR Code

1. Tap **"Link a Device"**.
2. Your phone may ask for your fingerprint, face, or PIN to confirm it's you. Complete that check.
3. Your phone's camera will open, ready to scan a QR code.
4. **Point your phone's camera** at the QR code shown on your computer screen (in the wizard or dashboard).
5. Hold steady for a moment — it should scan automatically.

[Screenshot: Phone camera scanning the QR code shown on the computer screen]

---

## Step 5: Wait for the Connection

1. After scanning, your phone will say something like **"Linking..."** or **"Encrypting..."**
2. This can take **10-30 seconds**. Don't close WhatsApp or the wizard while it's connecting.
3. Once connected, you'll see the device listed under "Linked Devices" on your phone.

[Screenshot: WhatsApp Linked Devices page showing the new device connected]

> **It might say something like "OpenClaw" or just "Chrome" or "Unknown"** in the linked devices list. That's normal — different setups show different names.

---

## Step 6: Test It Out

1. Ask someone to send a message to your WhatsApp number (or send a message to yourself from another account).
2. Your AI agent should receive the message and respond.
3. If this is your first time, you may need to **approve the sender** — see the [Approve First Message](/guides/wizard-inline/approve-first-message.md) guide.

---

## If the Session Drops (Re-Pairing)

WhatsApp sessions can disconnect for several reasons:
- Your phone was offline for more than 14 days
- You manually removed the linked device from your phone
- WhatsApp updated and reset linked devices
- Your server was restarted

### How to re-pair:

1. Open your **OpenClaw Dashboard** at `http://YOUR_SERVER_IP:18789` in your browser.
2. Look for the **WhatsApp section** — it will show that the session is disconnected and display a new QR code.
3. Follow **Steps 2-5 above** to scan the new QR code from your phone.
4. The AI agent will reconnect and start responding to messages again.

[Screenshot: OpenClaw Dashboard showing WhatsApp disconnected with a new QR code]

> **Tip:** If messages were sent to your WhatsApp while the session was disconnected, the AI agent will **not** see or respond to those older messages. Only new messages sent after re-pairing will be processed.

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| QR code won't scan | Make sure your phone camera is focused on the QR code. Move closer or further away. Also make sure the QR code on your screen hasn't expired — refresh the page if it's been sitting there for more than 2 minutes. |
| "Phone not connected to internet" warning | Your phone needs an active internet connection (Wi-Fi or mobile data) to complete the pairing. |
| QR code expired | Refresh the dashboard page or the wizard page to get a new QR code. QR codes typically expire after about 60 seconds. |
| Session disconnects frequently | Make sure your phone stays connected to the internet. WhatsApp checks the phone connection periodically. If your phone goes offline for too long, the linked session will be dropped. |
| WhatsApp account got restricted/banned | This can happen with automated usage. If you used your main number and it gets restricted, contact WhatsApp support. This is why we recommend using a secondary number. |
| "Already linked to the maximum number of devices" | WhatsApp allows up to 4 linked devices. Go to Linked Devices on your phone and remove a device you no longer use, then try again. |

---

## Summary

- WhatsApp pairing happens **after** deployment, not before.
- You scan a QR code with your phone, just like connecting to WhatsApp Web.
- Use a **secondary phone number** to avoid any risk to your personal account.
- If the session drops, go to your OpenClaw Dashboard and scan a new QR code.
- You don't need to enter any tokens or keys for WhatsApp — just scan and go.
