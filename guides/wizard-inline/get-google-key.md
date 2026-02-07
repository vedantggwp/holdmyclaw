# Get Your Google Gemini API Key

**Estimated time: 5 minutes**

Google makes an AI model called **Gemini** (you might have heard of "Google Bard" — Gemini is the newer version). An "API key" is like a password that lets your AI agent use Gemini's brain to understand and respond to messages.

**What it costs:** Google offers a **generous free tier** — you can make a significant number of requests per day at no cost. If you go beyond the free tier, paid usage starts at very low rates. For most personal bots, you may stay within the free tier or pay just a few dollars per month.

---

## Step 1: Go to Google AI Studio

1. Open a new tab in your web browser.
2. Go to **[https://aistudio.google.com](https://aistudio.google.com)**

[Screenshot: Google AI Studio homepage]

---

## Step 2: Sign In with Your Google Account

1. If you're not already signed into Google, you'll be asked to sign in.
2. Click **"Sign in"** and use your **Google account** (the same one you use for Gmail, YouTube, etc.).
3. If you don't have a Google account, click **"Create account"** and follow the steps to make one.

[Screenshot: Google sign-in page]

> **Tip:** Use the same Google account you normally use. There's nothing extra to create — if you have Gmail, you already have what you need.

---

## Step 3: Accept the Terms

1. The first time you visit Google AI Studio, you may be asked to agree to the **terms of service**.
2. Read through them (or scroll to the bottom) and click **"Accept"** or **"I agree"**.

[Screenshot: Google AI Studio terms of service acceptance page]

---

## Step 4: Get Your API Key

1. Once you're in Google AI Studio, look for a button that says **"Get API Key"** in the left sidebar or the main page.
   - Or go directly to **[https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)**

[Screenshot: Google AI Studio with "Get API Key" button highlighted]

2. Click **"Get API Key"**.

3. You'll see the API Keys page. Click **"Create API Key"**.

[Screenshot: API Keys page with "Create API Key" button highlighted]

4. You may be asked to **select a Google Cloud project**:
   - If you see a list of projects, select any one — or click **"Create API key in new project"** if that option is available.
   - If you don't see this step, that's fine — Google may create a project automatically for you.

[Screenshot: Project selection dialog or "Create API key in new project" option]

> **Don't worry about "Google Cloud projects."** This is just how Google organizes things behind the scenes. You don't need to understand or manage it. Just select any option and continue.

---

## Step 5: Copy Your API Key

1. Your new API key will be displayed on the screen. It's a long string of letters and numbers. Copy the whole thing — never share it.

2. Click the **"Copy"** button (clipboard icon) next to the key.

[Screenshot: Generated API key with Copy button highlighted]

> **Tip:** Unlike some other providers, you can usually come back to this page and see your key again. But it's still a good idea to copy it now.

---

## Step 6: Paste the Key into the Wizard

1. Go back to the OpenClaw setup wizard tab in your browser.
2. Paste the API key into the **"Google Gemini API Key"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## About the Free Tier

Google's free tier for Gemini is quite generous:

| Feature | Free Tier Limit |
|---------|----------------|
| Requests per minute | 15 requests per minute |
| Requests per day | 1,500 requests per day |
| Models included | Gemini 1.5 Flash, Gemini 1.5 Pro, and others |

For a personal AI agent that handles a few conversations throughout the day, this free tier is often enough. You'll only start paying if you go over these limits.

> **What happens if you exceed the free tier?** You won't be charged automatically. Instead, requests will simply fail. If you want to go beyond the free tier, you'll need to set up billing in Google Cloud Console — but most personal users won't need to do this.

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| "Invalid API key" error | Make sure you copied the **full** key starting with `AIza`. No extra spaces before or after. |
| "API key not valid" error | The key may not have been activated yet. Wait a minute or two and try again. Newly created keys sometimes take a moment to become active. |
| Can't find the "Get API Key" button | Go directly to **https://aistudio.google.com/apikey** |
| Asked to set up billing / credit card | You do NOT need to add billing for the free tier. If you're being asked for payment, you may have accidentally navigated to the general Google Cloud Console. Go back to **https://aistudio.google.com/apikey** |
| "Project" selection is confusing | Just click **"Create API key in new project"** — this creates everything you need automatically. |
| Key starts with "AIza" — is that right? | Yes! That's the correct format for Google API keys. |

---

## Understanding Costs

| Usage Level | Estimated Cost |
|-------------|---------------|
| Light (a few conversations/day) | **Free** (within free tier) |
| Moderate (regular use throughout the day) | **Free** to **$1-5/month** |
| Heavy (many long conversations) | **$5-20/month** |

Google Gemini is one of the most affordable options, especially for getting started.

---

## You're Done!

You now have a Google Gemini API key that will let your AI agent use Gemini to understand and respond to messages. The wizard will handle everything else!

**Bonus:** Since Google offers a free tier, you can test your whole setup without spending anything on the AI model. You'll only pay for the server hosting (Hetzner or DigitalOcean).
