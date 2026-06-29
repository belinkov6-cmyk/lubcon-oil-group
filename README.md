# NovaCore Global FZE — Website

Premium B2B marketing site for **NovaCore Global FZE**, the export division of an ISO-certified
lubricant manufacturer (Lubcon Oil Based Lubricanting Manufacturing L.L.C) in Ras Al Khaimah, UAE.

Built light, fast, responsive and fully internationalized (incl. Arabic RTL) for the GCC, Europe
and Latin America markets.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** with a token-based light design system (white + deep blue + brass)
- **next-intl** — `en` (default), `ar` (RTL), `ru`, `es`, `pt`
- Self-hosted fonts via `next/font` (Bricolage Grotesque · Instrument Serif · Inter)
- Serverless lead API → Telegram (`/api/lead`)
- Static / SSG export per locale — deploys to **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Telegram values (optional in dev)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Environment variables

Set these in `.env.local` (dev) and in the Vercel project settings (prod). **Never commit secrets.**

| Variable | Purpose |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token for lead delivery |
| `TELEGRAM_CHAT_ID` | Chat/channel that receives leads |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, OG, hreflang) |

If Telegram vars are absent, the lead API still returns success (logs the lead server-side) and the
UI always offers a prefilled WhatsApp fallback.

## Project structure

```
src/
  app/[locale]/        # localized pages (home, products, manufacturing,
                       #   certifications, private-label, about, contact)
  app/api/lead/        # POST lead -> Telegram (honeypot + validation)
  app/sitemap.ts       # all routes x all locales, with hreflang alternates
  app/robots.ts        # robots.txt + sitemap ref
  app/manifest.ts      # PWA manifest
  components/          # Header, Footer, forms, JSON-LD, shared UI
  components/sections/ # Hero, Products, Manufacturing, Certifications,
                       #   PrivateLabel, ExportMap (signature), Contact, About
  i18n/                # next-intl routing / request / navigation
  lib/site.ts          # single source of truth for company facts + certificates
  messages/*.json      # translation catalogs (one per locale, key-parity enforced)
public/
  llms.txt, llms-full.txt   # GEO / AI-search summaries
  favicon.svg
```

## Content & facts

All company facts (contacts, address, certificate numbers, products, regions) live in
[`src/lib/site.ts`](src/lib/site.ts). Edit there — values propagate to the UI, JSON-LD and sitemap.

The ISO 9001/14001/45001 certificates are presented honestly as held by the **group manufacturing
entity** (Lubcon), with certificate numbers and a verification note — not falsely attributed to
NovaCore.

## SEO / GEO

- Per-locale localized `metadata`, canonical + `hreflang` alternates on every page
- `Organization` JSON-LD site-wide, `FAQPage` JSON-LD on the home page
- `sitemap.xml`, `robots.txt`, `llms.txt` + `llms-full.txt`

## Deferred (next phases — see CLAUDE_CODE_BRIEF.md)

These were intentionally left for the next round (current scope = premium marketing site first):

1. **Headless CMS** (Sanity/Payload) for products, certificates, media, TDS PDFs + editor guide.
2. **Remaining 5 locales** (zh, hi, fr, de, it) — message files only; architecture is ready.
3. **Lead persistence** (Postgres/Supabase/KV) + rate limiting beyond the honeypot.
4. **Product detail pages** (`/products/[category]`) with grade tables and downloadable TDS.
5. **Real photography** for the manufacturing gallery (facility/lab images supplied separately).
6. **Lighthouse 100 pass** + analytics wiring on the live Vercel URL.

## Deploy (Vercel)

1. Push the repo and import it in Vercel.
2. Add the env vars above.
3. Deploy. Post-deploy: submit `sitemap.xml` to Google/Bing and run Lighthouse.
