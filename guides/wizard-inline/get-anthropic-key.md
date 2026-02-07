# Get Your Anthropic API Key (for Claude)

**Estimated time: 5-10 minutes**

Anthropic is the company that makes **Claude** — the AI model. An "API key" is like a password that lets your AI agent use Claude's brain to understand and respond to messages.

**What it costs:** You pay based on how much your agent is used. For a personal bot with light-to-moderate usage, expect roughly **$10-80 per month**. Light usage (a few conversations a day) will be on the lower end. Heavy usage (many long conversations) will be on the higher end. You need to add credits (pre-pay) before you can use it.

---

## Step 1: Go to the Anthropic Console

1. Open a new tab in your web browser.
2. Go to **[https://console.anthropic.com](https://console.anthropic.com)**

[Screenshot: Anthropic Console login/signup page]

---

## Step 2: Create an Account (or Log In)

### If you don't have an account yet:

1. Click **"Sign Up"** or **"Create Account"**.
2. You can sign up with:
   - **Email address** — type your email and create a password
   - **Google account** — click "Continue with Google"
3. If you signed up with email, check your inbox for a verification email and click the confirmation link.

### If you already have an account:

1. Click **"Log In"** and sign in with your email/password or Google account.

[Screenshot: Anthropic sign-up form]

---

## Step 3: Add Billing / Buy Credits

Before you can use the API, you need to add money to your account. Anthropic uses a **pre-paid credits** system — you add funds, and they get used up as your AI agent sends and receives messages.

1. After logging in, look at the **left sidebar** (menu on the left).
2. Click on **"Billing"** or **"Plans & Billing"**.
   - If you don't see a sidebar, look for a menu icon or navigate to **[https://console.anthropic.com/settings/billing](https://console.anthropic.com/settings/billing)**

[Screenshot: Anthropic Console sidebar with Billing highlighted]

3. Click **"Add Payment Method"** or **"Set up billing"**.
4. Enter your **credit card information**:
   - Card number
   - Expiration date
   - CVC (3-digit code on the back)
   - Billing address
5. Click **"Save"** or **"Add"**.

[Screenshot: Anthropic billing page with payment method form]

6. After adding your payment method, you may need to **buy credits**:
   - Look for a button like **"Add Credits"** or **"Buy Credits"**.
   - A good starting amount is **$10-20** to test things out.
   - You can always add more later.

> **Tip:** Start with a small amount like $10 to test your setup. You can add more credits anytime once you know everything is working.

---

## Step 4: Navigate to API Keys

1. In the **left sidebar**, click on **"API Keys"**.
   - Or go directly to **[https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)**

[Screenshot: Anthropic Console sidebar with "API Keys" highlighted]

---

## Step 5: Create a New API Key

1. Click the **"Create Key"** button.

[Screenshot: API Keys page with "Create Key" button highlighted]

2. A popup or form will appear:
   - **Name:** Type `openclaw` [Copy button]
     - This is just a label to help you remember what this key is used for.
   - Leave other settings as their defaults (if there are any).
3. Click **"Create Key"** or **"Generate"**.

[Screenshot: Create Key dialog with "openclaw" typed in the name field]

---

## Step 6: Copy Your API Key

1. Your new API key will be displayed. It's a long string that starts with `sk-ant-` — something like:
   ```
   sk-ant-api03-abc123def456ghi789jkl012mno345pqr678stu901vwx234...
   ```

2. Click the **"Copy"** button next to the key.

[Screenshot: Newly generated API key with Copy button highlighted]

> **IMPORTANT:** This key is shown **only once**. If you close this window without copying it, you'll need to create a new one. That's okay — you can always create another key.

---

## Step 7: Paste the Key into the Wizard

1. Go back to the OpenClaw setup wizard tab in your browser.
2. Paste the API key into the **"Anthropic API Key"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| "Invalid API key" error | Make sure you copied the **full** key including the `sk-ant-` prefix. There should be no extra spaces before or after. |
| "Insufficient credits" or "No billing" error | Go back to the Billing page and make sure you've added a payment method AND purchased credits. |
| Forgot to copy the key | Go back to **API Keys** page and click **"Create Key"** to make a new one. The old key still works too. |
| Can't find the API Keys page | Go directly to: **https://console.anthropic.com/settings/keys** |
| Key starts with "sk-ant-" — is that right? | Yes! That's the correct format for Anthropic API keys. |

---

## Understanding Costs

Here's a rough idea of what things cost with Claude:

| Usage Level | Description | Estimated Monthly Cost |
|-------------|-------------|----------------------|
| Light | A few short conversations per day | $5-15 |
| Moderate | Regular conversations throughout the day | $15-40 |
| Heavy | Many long, detailed conversations | $40-80+ |

The actual cost depends on how much text is sent back and forth. Longer conversations with lots of context cost more.

> **Tip:** You can monitor your usage on the Anthropic Console dashboard at any time. If costs are higher than expected, you can adjust your agent's settings (like using a smaller model) to reduce them.

---

## You're Done!

You now have an Anthropic API key that will let your AI agent use Claude to understand and respond to messages. The wizard will handle everything else!
