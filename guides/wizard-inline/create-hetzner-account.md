# Create Your Hetzner Cloud Account

**Estimated time: 10-15 minutes**

Hetzner is a company that rents out computers (called "servers") over the internet — your AI agent will live on one of these computers.

**What it costs:** About **$4-5 per month**. You can delete the server at any time to stop being charged — there are no contracts or commitments.

---

## Step 1: Open the Hetzner Website

1. Open a new tab in your web browser.
2. Go to **[https://accounts.hetzner.com/signUp](https://accounts.hetzner.com/signUp)**

[Screenshot: Hetzner sign-up page with email and password fields]

---

## Step 2: Create Your Account

1. Type your **email address** in the "Email" field.
2. Type a **password** you'll remember in the "Password" field.
   - It needs to be at least 8 characters with a mix of letters and numbers.
3. Check the box that says you agree to the terms.
4. Click the **"Register"** button.

[Screenshot: Hetzner registration form filled out with arrow pointing to Register button]

---

## Step 3: Verify Your Email

1. Open your email inbox (Gmail, Outlook, Yahoo, etc.).
2. Look for an email from **Hetzner** with the subject line about verifying your account.
   - If you don't see it, check your **Spam** or **Junk** folder.
3. Open the email and click the **verification link** inside it.

[Screenshot: Hetzner verification email with arrow pointing to the verification link]

> **Didn't get the email?** Wait 2-3 minutes, then check your Spam folder. If it's still not there, go back to the Hetzner sign-up page and click "Resend verification email."

---

## Step 4: Add Your Payment Method

After verifying your email, Hetzner will ask you to add a way to pay. This is required before you can create a server.

1. You should be taken to a page that says **"Add payment method"** or similar.
   - If not, go to **[https://console.hetzner.cloud](https://console.hetzner.cloud)** and log in.
2. Choose one of these options:
   - **Credit Card** (Visa, Mastercard, American Express) — easiest option
   - **PayPal**
   - **Bank Transfer** (SEPA) — only for European bank accounts

### If you chose Credit Card:

1. Type your **card number** in the card number field.
2. Type the **expiration date** (MM/YY).
3. Type the **CVC code** (the 3-digit number on the back of your card).
4. Click **"Add"** or **"Save"**.

[Screenshot: Hetzner payment form with credit card fields highlighted]

### If you chose PayPal:

1. Click **"PayPal"**.
2. You'll be taken to the PayPal website to log in.
3. Log into your PayPal account and confirm the connection.

> **You won't be charged yet.** Adding a payment method just lets Hetzner bill you later for what you actually use.

---

## Step 5: Create a New Project

Hetzner organizes things into "projects" — think of it like a folder.

1. After adding payment, you should land on the Hetzner Cloud Console.
   - If not, go to **[https://console.hetzner.cloud](https://console.hetzner.cloud)**
2. You should see a default project called **"My First Project"** or similar.
3. Click on it to open it.

[Screenshot: Hetzner Cloud Console showing the default project]

> **You can use the default project** — no need to create a new one unless you want to.

---

## Step 6: Generate an API Token

An "API token" is like a special password that lets OpenClaw control your Hetzner account to create and manage the server for you. You'll paste this token into the wizard in the next step.

1. Inside your project, look at the **left sidebar** (the menu on the left side of the screen).
2. Click on **"Security"**.

[Screenshot: Hetzner left sidebar with "Security" menu item highlighted]

3. You should see a page with tabs at the top. Click the **"API Tokens"** tab.

[Screenshot: Security page with "API Tokens" tab highlighted]

4. Click the **"Generate API Token"** button (usually a red button in the top-right area).

[Screenshot: API Tokens page with "Generate API Token" button highlighted]

5. A small window (dialog box) will appear:
   - In the **"Description"** field, type: `openclaw` [Copy button]
     - This is just a label to help you remember what this token is for.
   - For **"Permissions"**, select **"Read & Write"**.
     - This is important! "Read only" will NOT work.
   - Click **"Generate API Token"**.

[Screenshot: Generate API Token dialog with "openclaw" typed in description and "Read & Write" selected]

6. Your API token will appear. It's a long string of letters and numbers — something like:
   ```
   hcloud_abc123def456ghi789jkl012mno345pqr678stu901vwx234
   ```
7. **Click the copy icon** next to the token to copy it to your clipboard.

[Screenshot: Generated token displayed with copy icon highlighted]

> **IMPORTANT:** This token is shown **only once**. If you close this window without copying it, you'll need to generate a new one. That's okay — you can always generate another token.

---

## Step 7: Paste the Token into the Wizard

1. Go back to the OpenClaw setup wizard tab in your browser.
2. Paste the token into the **"Hetzner API Token"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| "Invalid token" error in the wizard | Make sure you selected **"Read & Write"** permissions, not "Read only." Generate a new token if needed. |
| Can't find the Security menu | Make sure you clicked into a project first. The Security menu only appears when you're inside a project. |
| Payment method was rejected | Try a different card or use PayPal instead. Some prepaid cards don't work. |
| Forgot to copy the token | No worries! Just go back to Security > API Tokens and click "Generate API Token" again to create a new one. |

---

## You're Done!

You now have a Hetzner account with a payment method and an API token. The wizard will use this token to automatically create and set up a server for your AI agent. You don't need to do anything else in Hetzner — the wizard handles the rest!

**Remember:** Your server will cost about **$4-5/month**. If you ever want to stop paying, you can delete the server from the Hetzner Cloud Console at any time.
