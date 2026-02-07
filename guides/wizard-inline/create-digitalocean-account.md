# Create Your DigitalOcean Account

**Estimated time: 10-15 minutes**

DigitalOcean is a company that rents out computers (called "servers") over the internet — your AI agent will live on one of these computers.

**What it costs:** About **$6-12 per month**, depending on the server size you choose. **New accounts get $200 in free credits** that last for 60 days — so you can try it out without spending any money right away. You can delete the server at any time to stop being charged.

---

## Step 1: Open the DigitalOcean Website

1. Open a new tab in your web browser.
2. Go to **[https://cloud.digitalocean.com/registrations/new](https://cloud.digitalocean.com/registrations/new)**

[Screenshot: DigitalOcean sign-up page]

---

## Step 2: Create Your Account

You have several ways to sign up. Pick whichever is easiest for you:

### Option A: Sign Up with Email (Recommended)

1. Type your **email address** in the "Email Address" field.
2. Type a **password** you'll remember.
3. Click **"Sign Up"**.

### Option B: Sign Up with Google

1. Click the **"Sign up with Google"** button.
2. Choose your Google account or sign in.
3. Approve the permissions.

### Option C: Sign Up with GitHub

1. Click the **"Sign up with GitHub"** button.
2. Sign into GitHub if asked.
3. Approve the permissions.

[Screenshot: DigitalOcean registration page showing email, Google, and GitHub sign-up options]

---

## Step 3: Verify Your Email

If you signed up with email:

1. Open your email inbox (Gmail, Outlook, Yahoo, etc.).
2. Look for an email from **DigitalOcean** asking you to confirm your account.
   - If you don't see it, check your **Spam** or **Junk** folder.
3. Click the **confirmation link** in the email.

[Screenshot: DigitalOcean confirmation email with link highlighted]

> **Didn't get the email?** Wait 2-3 minutes, check your Spam folder, then try clicking "Resend" on the DigitalOcean page.

---

## Step 4: Add Your Payment Method

DigitalOcean requires a payment method before you can use it — even with the free credits.

1. After verifying your email, you'll be taken to a payment page.
2. Choose one of these options:
   - **Credit/Debit Card** — easiest option
   - **PayPal**
   - **Google Pay**

### If you chose Credit/Debit Card:

1. Type your **card number**.
2. Type the **expiration date**.
3. Type the **CVC** (the 3-digit number on the back of your card).
4. Type your **billing address** if asked.
5. Click **"Save"** or **"Continue"**.

[Screenshot: DigitalOcean payment form with card fields]

### If you chose PayPal:

1. Click **"PayPal"**.
2. You'll be redirected to PayPal to log in.
3. Confirm the connection.

> **You won't be charged right away.** DigitalOcean bills at the end of each month, and your **$200 free credit** will be used first. You won't pay anything out of pocket until the free credits run out (or after 60 days, whichever comes first).

> **Note:** DigitalOcean may place a temporary $1 hold on your card to verify it's real. This will be released shortly.

---

## Step 5: Claim Your Free Credits (If Offered)

After adding payment, you may see a screen about free credits or a promotional offer.

1. If you see a **"$200 free credit"** banner or offer, make sure to click **"Apply"** or confirm it.
2. If you're not automatically given credits, don't worry — many new accounts receive them automatically.

[Screenshot: DigitalOcean free credit offer banner]

> **Tip:** If you have a promo code, look for a field that says "Have a promo code?" and enter it there.

---

## Step 6: Navigate to the API Settings

Now you need to create an "API token" — this is like a special password that lets OpenClaw control your DigitalOcean account to create and manage the server for you.

1. Look at the **left sidebar** (menu on the left side of the screen).
2. Scroll down and click on **"API"**.
   - If you don't see a sidebar, click the **hamburger menu** (three horizontal lines) in the top-left corner to open it.

[Screenshot: DigitalOcean dashboard left sidebar with "API" highlighted]

> **Can't find it?** You can also go directly to this URL: **[https://cloud.digitalocean.com/account/api/tokens](https://cloud.digitalocean.com/account/api/tokens)**

---

## Step 7: Generate a Personal Access Token

1. On the API page, you should see a section called **"Personal access tokens"**.
2. Click the **"Generate New Token"** button.

[Screenshot: API page with "Generate New Token" button highlighted]

3. A form will appear. Fill it in:
   - **Token name:** Type `openclaw` [Copy button]
     - This is just a label to help you remember what the token is for.
   - **Expiration:** Select **"No expiry"** or **"90 days"** (your choice).
     - "No expiry" is easier — you won't have to replace it later.
     - "90 days" is more secure — but you'll need to generate a new one after it expires.
   - **Scopes:** Make sure **both "Read" and "Write"** are selected (this is sometimes labeled "Full Access").
     - This is important! "Read only" will NOT work.

[Screenshot: Token creation form with "openclaw" name, no expiry, and full access selected]

4. Click **"Generate Token"**.

---

## Step 8: Copy Your Token

1. Your new token will appear on the screen. It's a long string of letters and numbers — something like:
   ```
   dop_v1_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567
   ```
2. Click the **copy icon** next to the token to copy it to your clipboard.

[Screenshot: Generated token displayed with copy icon highlighted]

> **IMPORTANT:** This token is shown **only once**. After you leave this page, you can never see it again. If you lose it, you'll need to generate a new one (which is easy — just repeat Steps 7-8).

---

## Step 9: Paste the Token into the Wizard

1. Go back to the OpenClaw setup wizard tab in your browser.
2. Paste the token into the **"DigitalOcean API Token"** field.
   - **Windows/Linux:** Press `Ctrl + V`
   - **Mac:** Press `Cmd + V`

---

## Common Mistakes and How to Fix Them

| Problem | Solution |
|---------|----------|
| "Invalid token" error in the wizard | Make sure you selected **"Full Access"** (Read + Write), not "Read only." Generate a new token if needed. |
| Card was declined | Try a different card. Some virtual cards and prepaid cards may not work. You can also try PayPal. |
| Can't find the API page | Go directly to: **https://cloud.digitalocean.com/account/api/tokens** |
| Forgot to copy the token | No problem! Go back to the API page and click "Generate New Token" to create a new one. The old one still works too. |
| Didn't get the $200 free credits | Credits are applied automatically for most new accounts. Check your billing page at **https://cloud.digitalocean.com/account/billing** to see if credits are listed. |

---

## You're Done!

You now have a DigitalOcean account with a payment method and an API token. The wizard will use this token to automatically create and set up a server for your AI agent. You don't need to do anything else in DigitalOcean — the wizard handles the rest!

**Remember:** Your **$200 free credit** covers about 1-2 months of usage (depending on the server size). After the credits run out, you'll pay about **$6-12/month**. You can delete the server from the DigitalOcean dashboard at any time to stop being charged.
