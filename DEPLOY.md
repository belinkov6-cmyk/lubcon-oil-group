# Deploying NovaCore Global to Vercel

The project is build-verified and ready to publish. Vercel auto-detects Next.js — no extra config needed.

## 1. Push the code to GitHub

A local git repo with an initial commit already exists. Create an empty GitHub repo, then:

```bash
git remote add origin https://github.com/<you>/novacore-global.git
git branch -M main
git push -u origin main
```

(Or use the GitHub CLI: `gh repo create novacore-global --private --source=. --push`.)

## 2. Import into Vercel

1. Go to https://vercel.com/new and import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected). Build command `next build`, output handled automatically.
3. Add the environment variables below, then **Deploy**.

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | No trailing slash. Used for canonical/OG/sitemap/hreflang. |
| `TELEGRAM_BOT_TOKEN` | *(from @BotFather)* | Lead delivery. Mark as "Sensitive". |
| `TELEGRAM_CHAT_ID` | *(your chat/channel id)* | Where leads are sent. |

> The lead form works even without Telegram vars (it logs server-side and always offers the
> WhatsApp fallback), but set them for production so quote requests reach you.

### Getting the Telegram values
1. In Telegram, message **@BotFather** → `/newbot` → copy the token → `TELEGRAM_BOT_TOKEN`.
2. Start a chat with your new bot (send any message), then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id` → `TELEGRAM_CHAT_ID`.
   (For a channel, add the bot as admin and use the channel id, e.g. `-100…`.)

## 4. Custom domain

Vercel → Project → Settings → Domains → add your domain and follow the DNS instructions.
After it resolves, update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

## 5. Post-deploy checklist

- [ ] Open the site, switch all 5 languages, verify Arabic shows right-to-left.
- [ ] Submit a test lead → confirm it arrives in Telegram.
- [ ] Submit `https://your-domain.com/sitemap.xml` to Google Search Console and Bing.
- [ ] Run Lighthouse (mobile) on the home page.
- [ ] Confirm `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` load.

## Local commands

```bash
npm run dev     # development
npm run build   # production build (verifies all 5 locales)
npm start       # serve the production build
npm run lint
```
