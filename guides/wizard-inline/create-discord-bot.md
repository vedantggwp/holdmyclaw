# Create Your Discord Bot

**Estimated time: 15-20 minutes**

You're going to create a "bot" on Discord — this is the account your AI agent will use to read and send messages in your Discord server. This process has a few more steps than other platforms, but we'll walk through every single one.

At the end, you'll have two things:
1. A **bot token** (a long code that acts as the bot's password)
2. The bot **added to your Discord server** and ready to go

---

## Step 1: Open the Discord Developer Portal

1. Open a new tab in your web browser.
2. Go to **[https://discord.com/developers/applications](https://discord.com/developers/applications)**
3. If you're not already logged into Discord, you'll be asked to log in. Use your normal Discord account.

[Screenshot: Discord Developer Portal login page or applications page]

---

## Step 2: Create a New Application

An "application" is the container that holds your bot. Think of it as a folder for your bot's settings.

1. Click the **"New Application"** button (it's usually a blue or purple button in the top-right area).

[Screenshot: Developer Portal with "New Application" button highlighted]

2. A popup will appear asking for a name.
3. Type a name for your application, for example:
   ```
   OpenClaw AI
   ```
   [Copy button]
   - This name will become your bot's display name in Discord (you can change it later).
4. Check the box to agree to Discord's terms.
5. Click **"Create"**.

[Screenshot: "Create an Application" popup with name field filled in]

---

## Step 3: Go to the Bot Settings

1. After creating the application, you'll be on the "General Information" page.
2. Look at the **left sidebar** (menu on the left side).
3. Click on **"Bot"**.

[Screenshot: Application settings page with "Bot" highlighted in the left sidebar]

---

## Step 4: Enable Important Settings (Intents)

"Intents" tell Discord what information your bot is allowed to access. Your AI agent needs two specific intents to work properly.

1. On the Bot page, scroll down until you see the section called **"Privileged Gateway Intents"**.

2. Find **"Server Members Intent"** and click the **toggle switch** to turn it **ON** (it should turn blue/green).
   - This lets your bot know who is in the server.

[Screenshot: Server Members Intent toggle being turned on]

3. Find **"Message Content Intent"** and click the **toggle switch** to turn it **ON** (it should turn blue/green).
   - This lets your bot actually read the messages people send. Without this, the bot would see that someone sent a message but wouldn't be able to read what it says.

[Screenshot: Message Content Intent toggle being turned on]

4. Click the **"Save Changes"** button that appears at the bottom of the screen.
   - If you don't see a Save button, the changes may save automatically.

[Screenshot: Both intents turned on with Save Changes button at the bottom]

> **Don't skip this step!** Without these intents enabled, your AI agent won't be able to read messages or know who it's talking to.

---

## Step 5: Get Your Bot Token

The bot token is like a password that lets OpenClaw control your bot. You'll paste this into the wizard.

1. Scroll back up to the top of the Bot page.
2. Look for the **"Token"** section.
3. Click **"Reset Token"**.
   - If this is a brand-new bot, you might see a **"Copy"** button instead. Click that.

[Screenshot: Bot page Token section with Reset Token button]

4. Discord may ask you to confirm. Click **"Yes, do it!"** or enter your Discord password if asked.

5. Your bot token will appear. It's a long string of random characters — something like:
   ```
   YOUR_BOT_USER_ID_PART.OAuth2_SECRET.RANDOM_CHARS_PART
   ```
   (Replace with your actual token from Discord; never share it.)

6. Click the **"Copy"** button to copy the token.

[Screenshot: Bot token displayed with Copy button highlighted]

> **IMPORTANT:** This token is shown **only once** after resetting. If you navigate away without copying it, you'll need to click "Reset Token" again (which will make the old token stop working). Never share this token with anyone.

---

## Step 6: Set Up the Invite Link (OAuth2)

Now you need to create a special link that will let you add the bot to your Discord server with the right permissions.

1. In the **left sidebar**, click on **"OAuth2"**.

[Screenshot: Left sidebar with "OAuth2" highlighted]

2. On the OAuth2 page, scroll down to the **"OAuth2 URL Generator"** section.

3. In the **"Scopes"** section, you'll see a grid of checkboxes. Check these two:
   - **`bot`** — this makes it a bot
   - **`applications.commands`** — this lets the bot use slash commands

[Screenshot: Scopes section with "bot" and "applications.commands" checked]

4. After checking `bot`, a new section called **"Bot Permissions"** will appear below. Check all of these boxes:
   - **`View Channels`** — lets the bot see which channels exist
   - **`Send Messages`** — lets the bot send messages
   - **`Read Message History`** — lets the bot see previous messages in a conversation
   - **`Embed Links`** — lets the bot send rich formatted messages
   - **`Attach Files`** — lets the bot send images and files
   - **`Add Reactions`** — lets the bot react to messages with emoji

[Screenshot: Bot Permissions section with all six permissions checked]

> **Tip:** These permissions are the minimum your AI agent needs to work properly. Don't worry — the bot can only do these things, nothing more.

5. Scroll down to the bottom. You'll see a **"Generated URL"** section with a long URL.
6. Click the **"Copy"** button next to the URL.

[Screenshot: Generated URL section with Copy button highlighted]

---

## Step 7: Add the Bot to Your Discord Server

1. **Open a new tab** in your browser.
2. **Paste the URL** you just copied into the address bar and press **Enter**.
   - **Windows/Linux:** Press `Ctrl + V` then `Enter`
   - **Mac:** Press `Cmd + V` then `Enter`

3. A Discord authorization page will appear. You'll see:
   - A dropdown that says **"Add to Server"** or **"Select a server"**

4. Click the **dropdown** and select the server you want to add the bot to.
   - You can only add bots to servers where you have the **"Manage Server"** permission (usually the server owner or an admin).
   - If you don't see your server, it means you don't have permission to add bots to it.

[Screenshot: Discord authorization page with server dropdown]

5. Click **"Continue"**.

6. You'll see a list of permissions the bot is requesting (the ones you selected earlier). Click **"Authorize"**.

[Screenshot: Permission confirmation page with Authorize button]

7. Complete the CAPTCHA (a small puzzle to prove you're human) if one appears.

8. You should see a message: **"Authorized"** — the bot has been added to your server!

[Screenshot: Success message showing the bot was authorized]

---

## Step 8: Verify the Bot Is in Your Server

1. Open **Discord** (the app or website).
2. Go to the server you added the bot to.
3. Look at the **member list** on the right side. You should see your bot listed, usually with an "offline" status (it's offline because OpenClaw hasn't started it yet — that will happen after deployment).

[Screenshot: Discord server member list showing the new bot as offline]

---

## Step 9: Paste the Token into the Wizard

1. Go back to the OpenClaw setup wizard tab in your browser.
2. Paste the bot token (from Step 5) into the **"Discord Bot Token"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| Bot doesn't respond to messages | Make sure you turned on **"Message Content Intent"** in Step 4. Go back to the Bot settings page and check. |
| "Invalid token" error in the wizard | Make sure you copied the **bot token** from the Bot page (Step 5), not the "Client Secret" or "Application ID" from other pages. |
| Can't see my server in the dropdown | You need **"Manage Server"** permission. Ask the server owner to add the bot, or create your own server to test with. |
| Forgot to copy the token | Go back to the Bot page in the Developer Portal and click **"Reset Token"** to generate a new one. |
| Bot is in the server but shows as offline | That's normal! The bot will come online after OpenClaw is deployed. |
| "Missing Permissions" errors after deployment | Go back to Step 6 and make sure you checked all six permissions. You may need to re-invite the bot with the correct permissions. |

---

## You're Done!

You now have a Discord bot with a token and it's been added to your server. After OpenClaw is deployed, the bot will come online and start responding to messages!

**Tip:** If you want to restrict which channels the bot can see, you can adjust its channel permissions directly in your Discord server settings — just like you would for any other user role.
