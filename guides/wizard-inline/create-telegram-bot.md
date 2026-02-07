# Create Your Telegram Bot

**Estimated time: 5 minutes**

You're going to create a "bot" on Telegram — this is the account your AI agent will use to send and receive messages. You create bots by talking to a special Telegram account called **@BotFather** (it's made by Telegram themselves).

At the end, you'll get a **"bot token"** — a long code that acts like the bot's password, letting OpenClaw control it.

---

## Step 1: Open Telegram

1. Open **Telegram** on your phone or computer.
   - If you don't have Telegram yet, download it from [telegram.org](https://telegram.org) and create an account first.

---

## Step 2: Find BotFather

1. Tap the **search icon** (magnifying glass) at the top of Telegram.
2. Type **`@BotFather`** [Copy button] in the search bar.
3. Look for the result that says **"BotFather"** with a **blue checkmark** next to it.
   - The blue checkmark means it's the official, verified account.
4. Tap on **BotFather** to open a chat with it.

[Screenshot: Telegram search results showing BotFather with blue checkmark]

> **Make sure you see the blue checkmark!** There are fake accounts that try to look like BotFather. The real one always has a blue verification checkmark.

---

## Step 3: Start a Conversation with BotFather

1. If this is your first time talking to BotFather, tap the **"Start"** button at the bottom of the screen.
   - If you've talked to BotFather before, skip this step.
2. BotFather will reply with a list of commands it understands. You can ignore this message.

[Screenshot: BotFather chat with Start button at the bottom]

---

## Step 4: Create a New Bot

1. Type this message and send it:
   ```
   /newbot
   ```
   [Copy button]

2. BotFather will reply: **"Alright, a new bot. How are we going to call it? Please choose a name for your bot."**

3. Type a **display name** for your bot and send it. This is the name people will see when they talk to it. For example:
   ```
   My AI Assistant
   ```
   [Copy button]
   - You can use any name you want — spaces and normal characters are fine.

[Screenshot: BotFather asking for the bot name, with a user sending "My AI Assistant"]

4. BotFather will reply: **"Good. Now let's choose a username for your bot..."**

5. Type a **username** for your bot and send it. This must:
   - End with the word `bot` (like `my_cool_bot` or `myassistantbot`)
   - Only use letters, numbers, and underscores
   - Be unique (nobody else has taken it)

   For example:
   ```
   my_openclaw_assistant_bot
   ```
   [Copy button]

   > **"Sorry, this username is already taken"?** This means someone else already has that name. Try adding some numbers or making it more unique, like `my_openclaw_bot_2024` or `janes_ai_helper_bot`.

[Screenshot: BotFather asking for username, with a user sending a username ending in "bot"]

---

## Step 5: Copy Your Bot Token

1. After you send a valid username, BotFather will reply with a success message that includes your **bot token**. It looks something like this:

   ```
   Done! Congratulations on your new bot. You will find it at t.me/your_bot_name.

   Use this token to access the HTTP API:
   7123456789:AAH1bGciOiJSUzI1NiIsInR5cCI6Ikp-abc123

   Keep your token secure and store it safely, it can be used
   by anyone to control your bot.
   ```

2. The token is the long string that looks like this:
   ```
   7123456789:AAH1bGciOiJSUzI1NiIsInR5cCI6Ikp-abc123
   ```
   It always has a **colon (:)** in the middle.

3. **Tap and hold** on the token to select it, then tap **"Copy"**.
   - On a computer, you can triple-click to select the line, then press `Ctrl+C` (Windows/Linux) or `Cmd+C` (Mac).

[Screenshot: BotFather success message with the token highlighted]

> **IMPORTANT:** Don't share this token with anyone. It gives full control of your bot. If you accidentally share it, you can use `/revoke` with BotFather to get a new one.

---

## Step 6: Disable Privacy Mode

By default, if you add your bot to a group chat, it can only see messages that start with a `/` command. To let your AI agent read and respond to all messages in groups, you need to turn off "Privacy Mode."

**If you only plan to chat with your bot in a private one-on-one conversation, you can skip this step.** But we recommend doing it now in case you want to add the bot to a group later.

1. Send this message to BotFather:
   ```
   /setprivacy
   ```
   [Copy button]

2. BotFather will reply with a list of your bots. Tap on **your bot's username** (the one you just created).

3. BotFather will ask: **"Choose new privacy setting"** and show two buttons:
   - **Enable** — bot only sees commands (starts with /)
   - **Disable** — bot sees all messages

4. Tap **"Disable"**.

[Screenshot: BotFather privacy setting with "Disable" option highlighted]

5. BotFather will confirm: **"Privacy mode is disabled for your bot."**

> **Why do this?** With privacy mode enabled, your bot would ignore most messages in a group chat — it would only respond to messages that start with `/`. Disabling privacy mode lets your AI agent read and respond to all messages in the group, which is how a normal conversation works.

---

## Step 7: Paste the Token into the Wizard

1. Go back to the OpenClaw setup wizard in your browser.
2. Paste the bot token into the **"Telegram Bot Token"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| "Username is already taken" | Try a more unique name. Add numbers or your name, like `janedoe_ai_bot` or `my_helper_bot_42`. |
| Accidentally closed BotFather before copying the token | Send `/mybots` to BotFather, tap your bot, then tap "API Token" to see it again. |
| Copied extra spaces with the token | Delete the token from the field, then carefully re-copy just the token (the part that looks like `1234567:ABCdef...`). |
| "Invalid token" error in the wizard | Make sure you copied the **full** token including the numbers before the colon. It should look like `1234567890:ABCxyz...`. |
| Talked to a fake BotFather | Make sure BotFather has a **blue checkmark**. Search for exactly `@BotFather`. |

---

## You're Done!

You now have a Telegram bot with a token. After OpenClaw is deployed, you'll be able to open Telegram, search for your bot by its username, and start chatting with your AI agent!

**Tip:** You can customize your bot later (add a profile picture, description, etc.) by talking to @BotFather and using the `/mybots` command.
