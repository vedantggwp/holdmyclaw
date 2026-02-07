# Get Your OpenAI API Key (for GPT)

**Estimated time: 5-10 minutes**

OpenAI is the company that makes **GPT** (the AI behind ChatGPT). An "API key" is like a password that lets your AI agent use GPT's brain to understand and respond to messages.

**What it costs:** You pay based on how much your agent is used. For a personal bot with light-to-moderate usage, expect roughly **$5-60 per month**. You need to add credits (pre-pay) before you can use it.

> **Note:** An OpenAI API account is separate from a ChatGPT subscription. Even if you pay for ChatGPT Plus, you still need to set up API billing separately.

---

## Step 1: Go to the OpenAI Platform

1. Open a new tab in your web browser.
2. Go to **[https://platform.openai.com](https://platform.openai.com)**

[Screenshot: OpenAI Platform homepage]

---

## Step 2: Create an Account (or Log In)

### If you don't have an account yet:

1. Click **"Sign Up"**.
2. You can sign up with:
   - **Email address** — type your email and create a password
   - **Google account** — click "Continue with Google"
   - **Microsoft account** — click "Continue with Microsoft"
   - **Apple account** — click "Continue with Apple"
3. If you signed up with email, check your inbox for a verification email and click the confirmation link.
4. You may be asked to verify your phone number — enter it and type the code they text you.

### If you already have an account:

1. Click **"Log In"** and sign in.

[Screenshot: OpenAI Platform sign-up / login page]

> **Already have a ChatGPT account?** You can log in with the same email and password. But you'll still need to set up billing for the API separately (ChatGPT and the API have different billing).

---

## Step 3: Add Billing / Buy Credits

Before you can use the API, you need to add money to your account.

1. After logging in, click on your **profile icon** or **organization name** in the top-right or left sidebar.
2. Click **"Billing"** or navigate to **Settings > Billing**.
   - Or go directly to **[https://platform.openai.com/settings/organization/billing/overview](https://platform.openai.com/settings/organization/billing/overview)**

[Screenshot: OpenAI Platform with Billing page navigation highlighted]

3. Click **"Add Payment Method"** or **"Set up paid account"**.
4. Enter your **credit card information**:
   - Card number
   - Expiration date
   - CVC (3-digit code on the back)
   - Billing address
5. Click **"Save"** or **"Submit"**.

[Screenshot: OpenAI billing payment method form]

6. After adding your payment method, you need to **add credits**:
   - Look for an **"Add credits"** or **"Buy credits"** button.
   - A good starting amount is **$10-20** to test things out.
   - You can always add more later.

[Screenshot: Add credits page with amount field]

> **Tip:** Start with $10 to test your setup. You can set up **auto-recharge** later so you never run out unexpectedly.

---

## Step 4: Navigate to API Keys

1. Click on **"API Keys"** in the left sidebar.
   - Or go directly to **[https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)**

[Screenshot: OpenAI Platform sidebar with "API Keys" highlighted]

---

## Step 5: Create a New API Key

1. Click the **"+ Create new secret key"** button.

[Screenshot: API Keys page with "Create new secret key" button highlighted]

2. A popup will appear:
   - **Name:** Type `openclaw` [Copy button]
     - This is just a label to help you remember what this key is used for.
   - **Permissions:** Select **"All"** (if this option appears).
   - **Project:** Leave as "Default project" (if this option appears).
3. Click **"Create secret key"**.

[Screenshot: Create secret key dialog with "openclaw" typed in the name field]

---

## Step 6: Copy Your API Key

1. Your new API key will be displayed. It's a long string that starts with `sk-` — something like:
   ```
   sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567...
   ```

2. Click the **green "Copy"** button next to the key.

[Screenshot: Newly generated API key with Copy button highlighted]

> **IMPORTANT:** This key is shown **only once**. After you close this popup, you can never see it again. If you lose it, you'll need to create a new one (which is easy — just repeat Steps 5-6).

---

## Step 7: Paste the Key into the Wizard

1. Go back to the OpenClaw setup wizard tab in your browser.
2. Paste the API key into the **"OpenAI API Key"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| "Invalid API key" error | Make sure you copied the **full** key starting with `sk-`. No extra spaces before or after. |
| "You exceeded your current quota" error | You need to add credits. Go to Billing and purchase credits. |
| "This API key doesn't have access" | When creating the key, make sure Permissions is set to **"All"** or at minimum includes chat/completions. |
| Forgot to copy the key | Go back to the **API Keys** page and click **"Create new secret key"** to make another one. |
| I have ChatGPT Plus — do I still need this? | **Yes.** ChatGPT Plus and the API are billed separately. You need to add credits to your API account even if you already pay for ChatGPT. |
| Key starts with "sk-proj-" — is that right? | Yes! That's the correct format for newer OpenAI API keys. Older keys start with just "sk-". Both work. |

---

## Understanding Costs

Here's a rough idea of what things cost with GPT:

| Usage Level | Description | Estimated Monthly Cost |
|-------------|-------------|----------------------|
| Light | A few short conversations per day | $3-10 |
| Moderate | Regular conversations throughout the day | $10-30 |
| Heavy | Many long, detailed conversations | $30-60+ |

The actual cost depends on which GPT model is used and how much text is sent back and forth. GPT-4o is more expensive than GPT-4o-mini, for example.

> **Tip:** You can monitor your usage on the OpenAI Platform dashboard. Consider setting a **monthly usage limit** in the Billing settings to avoid surprises.

---

## You're Done!

You now have an OpenAI API key that will let your AI agent use GPT to understand and respond to messages. The wizard will handle everything else!
