# Approve Your First Message (Pairing Code)

**Estimated time: 2-3 minutes**

You just sent your first message to your AI agent and got a **strange code** back instead of a real response. Don't worry — this is completely normal! It's a security feature.

---

## Why Did I Get a Code Instead of a Response?

When someone messages your bot for the first time, OpenClaw doesn't know if that person is **you** (the owner) or a random stranger. To protect your bot, it sends back a **pairing code** — a short code like:

```
Your pairing code is: 847291
Please approve this code in the OpenClaw Dashboard to start chatting.
```

You need to go to your OpenClaw Dashboard and confirm that this code belongs to you. This is a one-time step — once you approve yourself, you won't have to do it again.

Think of it like a new phone asking you to verify your identity before it lets you in.

---

## Step 1: Open the OpenClaw Dashboard

1. Open a new tab in your web browser.
2. Type the following address into the address bar:
   ```
   http://YOUR_SERVER_IP:18789
   ```
   Replace `YOUR_SERVER_IP` with your actual server's IP address. The wizard showed you this address after deployment. It looks something like:
   ```
   http://123.45.67.89:18789
   ```
   [Copy button]

3. Press **Enter** to go to the page.

[Screenshot: Browser address bar with the dashboard URL typed in]

> **Where do I find my server's IP address?** Go back to the OpenClaw wizard — it's displayed on the deployment summary page. It's a set of numbers separated by dots, like `123.45.67.89`.

---

## Step 2: Log Into the Dashboard

1. You may be asked to log in. Use the **admin credentials** that were shown during deployment (the wizard displayed these).
   - If you didn't save them, check the deployment summary in the wizard.
2. Enter the username and password, then click **"Log In"**.

[Screenshot: OpenClaw Dashboard login page]

---

## Step 3: Find the Pending Approval

1. After logging in, you should see the **Dashboard home page**.
2. Look for a section called **"Pending Approvals"**, **"Pairing Requests"**, or a notification badge/banner at the top.
3. You should see an entry showing:
   - The **pairing code** (the same code your bot sent you)
   - The **platform** (Telegram, Discord, WhatsApp, etc.)
   - The **username** or **phone number** of the person who sent the message

[Screenshot: Dashboard showing a pending pairing request with the code]

---

## Step 4: Verify and Approve the Code

1. **Check that the code matches.** Compare the code shown in the dashboard with the code your bot sent you in the chat. They should be identical.
   - This confirms that the approval request really came from your conversation.

2. Click the **"Approve"** button next to the pairing request.

[Screenshot: Pairing request entry with "Approve" button highlighted]

3. You should see a confirmation message like **"User approved successfully"** or similar.

[Screenshot: Success confirmation after approving]

---

## Step 5: Go Back and Chat

1. Go back to your messaging app (Telegram, Discord, WhatsApp, etc.).
2. Send another message to your bot.
3. This time, your AI agent should respond normally with a real reply!

[Screenshot: A normal conversation with the AI agent after approval]

> **Still getting a pairing code?** Wait about 10-15 seconds after approving, then try again. If it still doesn't work, try refreshing the dashboard page and approving again.

---

## Alternative: Skip Pairing and Allow Everyone

If you don't want to deal with pairing codes and you're okay with **anyone** being able to talk to your bot, you can turn off the approval requirement.

### How to disable pairing:

1. In the OpenClaw Dashboard, go to **"Settings"** (usually in the left sidebar or top menu).
2. Look for a setting called **"Require Approval"**, **"Pairing Mode"**, or **"Access Control"**.
3. Change it to **"Allow Everyone"** or toggle off **"Require Approval"**.
4. Click **"Save"**.

[Screenshot: Settings page with approval requirement toggle]

### Before you do this, understand the tradeoff:

| Setting | Who Can Chat | Security Level |
|---------|-------------|----------------|
| **Require Approval** (default) | Only people you approve | High — you control who uses your bot |
| **Allow Everyone** | Anyone who finds your bot | Low — anyone can use your bot (and your AI credits) |

> **Warning:** If you allow everyone, **anyone** who discovers your bot can chat with it, and **you'll be paying** for the AI usage. This could run up your AI bill if strangers start chatting with it. For Telegram bots especially, your bot can be found by searching for its username.

> **Our recommendation:** Keep pairing enabled. Approve yourself (and any friends/family you want), and leave it on. This way, random people can't use your bot and run up your bill.

---

## Approving Additional People

Want to let a friend or family member use your bot too?

1. Have them send a message to your bot.
2. They'll receive a pairing code, just like you did.
3. Go to the OpenClaw Dashboard.
4. You'll see their pairing request in the **"Pending Approvals"** section.
5. Verify the code and click **"Approve"**.

That person can now chat with your AI agent.

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| Can't access the dashboard (page won't load) | Make sure you're using the correct IP address and port (`:18789`). Also make sure your server is running — check in Hetzner/DigitalOcean that the server is "active." |
| "Connection refused" or "This site can't be reached" | The server might still be starting up. Wait 2-3 minutes after deployment and try again. If it still doesn't work, double-check the IP address. |
| Don't see any pending approvals | Make sure you actually sent a message to the bot first. The pairing request only appears after someone messages the bot. |
| Code in dashboard doesn't match code in chat | Each message attempt generates a new code. Make sure you're looking at the **most recent** one in both the chat and the dashboard. |
| Approved myself but bot still sends pairing codes | Wait 10-15 seconds, then send a new message. If it persists, try refreshing the dashboard and checking that the approval went through. |
| Forgot the dashboard login credentials | Check the deployment summary in the wizard. If you can't find it, you may need to redeploy or check the server configuration. |

---

## You're Done!

You've approved yourself and your AI agent is now ready to chat. From this point on, just message your bot normally and it will respond using the AI model you configured. No more pairing codes needed (for your account).

**Tip:** Bookmark the dashboard URL (`http://YOUR_SERVER_IP:18789`) — you'll use it to manage settings, approve new users, and monitor your bot.
