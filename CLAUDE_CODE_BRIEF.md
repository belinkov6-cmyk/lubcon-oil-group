# NovaCore Global FZE — Final Build Brief for Claude Code

> Paste this ENTIRE file into Claude Code at the start of the session. It is the single source
> of truth. Build incrementally, commit often, and verify against §16 (Acceptance Criteria)
> before declaring done. Tools to use are in §0 — use them, don't hand-roll everything.

---

## 0. Tools & skills — set up and use these FIRST

You have two design tools available. **UI UX Pro Max** decides the design (tokens, palette,
typography, UX rules + audit). **21st.dev Magic** generates the actual components. Use them together.

### A) UI UX Pro Max skill (design intelligence + audit)
Repo: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Install (pick one):
```bash
# Option 1 — Claude Code plugin
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# Option 2 — CLI installer (requires Python 3.x)
npm install -g ui-ux-pro-max-cli
uipro init --ai claude
python3 --version   # confirm Python is present
```
Core usage (the skill is driven by a search script):
```bash
# 1) Generate & persist the project design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "lubricant manufacturer export premium institutional dark brass" \
  --design-system --persist -p "NovaCore" --page "home"

# 2) Domain searches for detail   (domains: product | style | typography | color | landing | chart | ux)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "minimalism dark premium" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant grotesque serif accent" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "deep petrol gold industrial" --domain color
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "b2b landing trust conversion" --domain landing

# 3) Stack-specific best practices
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "performance navigation forms" --stack nextjs
```
Tip: combine product + industry + tone + density in keywords ("b2b industrial premium dark
content-dense"), not single words. After the design system exists, read its `MASTER.md` (and any
`pages/<page>.md`) and treat those rules as authoritative; define tokens first, then never write
raw hex/spacing values again.

### B) 21st.dev Magic MCP (component generation)
Repo: https://github.com/21st-dev/magic-mcp — already installed in this Claude Code as `magic`.
Generate each section/component with the **`/ui`** command (prompts in §6), then refactor the output
onto the design-system tokens from UI UX Pro Max. Don't hand-write large components when Magic can
scaffold them.

### Order of operations per section
1. UI UX Pro Max `--design-system` once for the project → lock tokens.
2. UI UX Pro Max `--domain` searches for the section's specifics.
3. Magic `/ui` to generate the component.
4. Refactor to tokens; wire data; then UI UX Pro Max `--domain ux` audit pass.

### House rules
- **Never commit secrets.** Telegram token, CMS tokens, the 21st.dev key → `.env.local` / Vercel env only.
  (The 21st.dev key shown during setup was exposed in chat — **rotate it** at 21st.dev/magic/console.)
- Check any project `SKILL.md` before a task and use the relevant skill.
- After each milestone: `npm run build` + `npm run lint`, fix errors before moving on.

---

## 1. Mission

Build the premium B2B website for **NovaCore Global FZE**, the international export division of an
ISO-certified lubricant manufacturer in Ras Al Khaimah, UAE. Goal: generate qualified B2B leads
(quote requests, distributor and private-label inquiries) from the GCC, Europe, Russia/CIS, Africa,
Latin America and Asia. Priorities, in order: **Trust → Premium feel → Conversion → Performance →
SEO → GEO → Accessibility → Mobile.** Two-click-to-contact: every page reaches WhatsApp/Telegram/quote
form in ≤2 clicks. Visual reference for tone: institutional-premium (ADNOC / Mubadala / Bentley restraint),
dark petrol + brass, one signature element = the animated export-route map from RAK. Never look templated.

---

## 2. Company facts (source of truth — use exactly)

- **Brand / legal:** NovaCore Global FZE (export & commercial division).
- **Manufacturing & certificates belong to the group factory:** *Lubcon Oil Based Lubricanting
  Manufacturing L.L.C* — same ownership; NovaCore is its export arm. **State this relationship
  honestly wherever certificates or the factory are shown.** Do NOT present the ISO certificates as
  issued to "NovaCore"; present them as the group manufacturing entity's, with certificate numbers
  visible — B2B buyers verify them.
- **Facility:** Al Hamra Industrial Zone Free Zone (NFZ), Ras Al Khaimah, UAE (WIZN5-10, Shed N5).
- **Contact person:** Sazonov Kliment.
- **Phone / WhatsApp:** +971 56 333 3025 → `wa.me/971563333025`.
- **Telegram:** @beretta_chin → `https://t.me/beretta_chin`.

### Certificates (display with these exact numbers)
| Standard | System | Cert No. | Issued | Valid until |
|---|---|---|---|---|
| ISO 9001:2015 | Quality | LUB/QMS/L25/5484 | 18.12.2025 | 17.12.2028 |
| ISO 14001:2015 | Environmental | LUB/EMS/L25/2238 | 18.12.2025 | 17.12.2028 |
| ISO 45001:2018 | Health & Safety | LUB/OHS/L25/3613 | 18.12.2025 | 17.12.2028 |

Accreditation: United Accreditation Foundation (UAF), IAF member. Verifiable at saaracertification.com.

### Product families
Motor Oils · Diesel Engine Oils · Transmission & Gear (incl. ATF) · Industrial & Hydraulic ·
Marine Lubricants · Greases · Coolants/Brake fluids & Base Oils. Services: Private Label, White Label, Export.

Content rule: professional B2B language only — no marketing fluff, no exaggerated claims, no empty slogans.

---

## 3. Tech stack

- **Next.js (latest, App Router) + TypeScript.**
- **Tailwind CSS** using tokens from UI UX Pro Max (extend `tailwind.config`; no raw magic values).
- **next-intl** for i18n routing (`/[locale]/...`).
- **Sanity** (or Payload) headless CMS for products, certificates, photos, videos, documents.
- **Serverless** `app/api/lead/route.ts` for lead → Telegram bot.
- **Deploy: Vercel** (static/ISR where possible; zero render-blocking).
- Fonts via `next/font` (self-hosted, no CLS): display grotesque (Bricolage/Clash) + italic serif
  accent (Instrument Serif) + body Inter — confirm exact pairing from UI UX Pro Max typography search.
- Images via `next/image` (AVIF/WebP, responsive, blur placeholder).

---

## 4. Information architecture (all localized)

1. `/` Home — hero, trust strip, products, manufacturing, certifications, private label, export, contact+form.
2. `/products/[category]` — per family: grade tables + downloadable TDS (CMS).
3. `/private-label` — full offer + inquiry form.
4. `/manufacturing` — facility, lab, QC, gallery.
5. `/certifications` — all certs + verification note + PDFs.
6. `/about` — who/where/why + group structure (NovaCore ↔ factory) + export experience.
7. `/contact` — channels, map, form.

Every page: sticky header CTA (Request Quote), floating WhatsApp, Telegram link, footer with full contacts.

---

## 5. Design system (baseline tokens — refine with UI UX Pro Max output)

```
Colors
  --bg #06100F  --petrol #0F2C2A  --ink #04100E
  --brass #D2A85A  --brass-2 #E7C988  --brass-3 #F3E4C2
  --text #EAF0EE  --muted #9DB0AC  --line rgba(210,168,90,.20)
Type   display grotesque 600–800 (tracking -0.03em on big sizes); italic serif accent in headlines; body Inter 400–600
Motion subtle/premium, every animation earns its place; respect prefers-reduced-motion
Radius pills (100px) for buttons, 14–20px cards; depth via soft shadows + 1px brass-tinted borders
```
Aesthetic: institutional-premium, NOT a generic gradient template. Spend boldness on the export map.

---

## 6. Per-section build commands (UI UX Pro Max + Magic together)

For each section: run the Pro Max search, then the Magic `/ui` prompt, then wire to tokens + data.

**1. Header**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "sticky navbar scroll states b2b" --domain ux --stack nextjs`
- `/ui sticky transparent header that gains a blurred dark background on scroll; logo left, 5 nav links center, phone + "Request Quote" pill right, mobile hamburger drawer. Dark, brass accent #D2A85A.`

**2. Hero**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero conversion trust above fold" --domain landing`
- `/ui full-viewport dark hero for a premium UAE lubricant exporter: large display headline with an italic serif accent phrase, subhead, two CTAs (Request a Quote, Become a Distributor), subtle animated flowing-oil SVG background + grain, scroll cue. Brass on near-black petrol.`

**3. Trust marquee + stats**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "stat counters social proof" --domain ux`
- `/ui infinite horizontal marquee of certifications and regions, then 4 animated count-up stat cards. Dark, brass gradient numbers.`

**4. Products grid**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "product card grid hover states" --domain style --stack nextjs`
- `/ui responsive product grid: 7 lubricant category cards + 1 CTA card, each with index number, title, short B2B description, spec tags, hover lift + radial glow. Dark premium.`

**5. Manufacturing**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "feature split icon list" --domain style`
- `/ui split section: left = 4 capability rows with icon tiles (facility, lab, additive tech, logistics), right = tall framed visual with rotating concentric rings + caption. Dark + brass.`

**6. Certifications**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "credential badge card trust" --domain style`
- `/ui three ISO certificate cards: standard as gradient heading, definition list (cert no, issued, valid until, scope), faint seal watermark, plus a bordered verification note below.`

**7. Private label**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "process steps timeline" --domain ux`
- `/ui 4-step horizontal process (numbered rings) for private/white-label manufacturing, with two CTAs. Dark gradient band.`

**8. Export map (SIGNATURE)**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animated map data viz" --domain chart`
- `/ui animated world export-routes visualization: glowing hub at the UAE with dashed animated arcs flying to 6 regions, paired with a list of regions + notes. Premium, alive, lightweight SVG.`

**9. Contact + lead form**
- `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "form accessibility focus validation" --domain ux --stack nextjs`
- `/ui contact section: left = WhatsApp/Telegram/phone channel cards with hover slide; right = glassmorphism quote form (Name, Company, Country, Email, Phone, Product interest select, Message). Dark, brass focus states.`

**10. Footer**
- `/ui premium dark footer: brand + address block, two link columns, language list, copyright row.`

Final audit pass for the whole page:
`python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility contrast focus responsive" --domain ux`

---

## 7. Internationalization (next-intl)

- Locales: **en (default), ar, ru, zh, hi, fr, de, it, es, pt.**
- Routing `/[locale]/...`; language switcher in header + footer; persist choice.
- **Arabic must be full RTL** (`dir="rtl"`, logical CSS: margin/padding-inline, start/end; flip the
  export-map layout). Test every component in RTL.
- Translations in `messages/{locale}.json`; all copy externalized (no hard-coded strings).
- Per-locale SEO-optimized titles/descriptions (not literal machine translations).

---

## 8. SEO

- Per-page localized `metadata` (title, description, OG, Twitter).
- `app/sitemap.ts` → sitemap.xml for all pages × all locales; `app/robots.ts` → robots.txt + sitemap ref.
- **hreflang** alternates per locale on every page; correct **canonical** URLs.
- Target keywords woven naturally into headings/body/metadata: lubricant manufacturer UAE, engine oil
  manufacturer UAE, private label lubricants, lubricant exporter UAE, base oil supplier UAE, industrial
  lubricants manufacturer, white label motor oil, OEM lubricant manufacturer, private label engine oil,
  lubricant distributor partnership.
- Semantic HTML, one `h1`/page, descriptive `alt`, breadcrumb structured data.

---

## 9. GEO (AI-search optimization)

Be citable by ChatGPT, Gemini, Claude, Grok, DeepSeek, Perplexity, Google AI Overview.
- **JSON-LD:** `Organization` (address in RAK, `contactPoint`, `areaServed`, `makesOffer` per
  product/service) + `Product` on product pages + `BreadcrumbList` site-wide.
- Machine-readable **Company facts** block + an **FAQ** answering: Who are you? What do you manufacture?
  Where? Which countries do you supply? What certifications? Can you do private label? How do
  distributors contact you? — mark up with `FAQPage`.
- Add **`/llms.txt`** and **`/public/llms-full.txt`** summarizing company, products, certs, regions, contact.
- Keep entity names consistent (NovaCore Global FZE · Ras Al Khaimah · ISO 9001/14001/45001).

---

## 10. Lead generation → Telegram

- `POST /api/lead`: validate payload, forward to Telegram Bot API
  (`https://api.telegram.org/bot<TOKEN>/sendMessage`, `chat_id` from env).
- Message format: `Name / Company / Country / Email / Phone / Product Interest / Message`.
- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (never in code).
- Persist each lead (Vercel Postgres / Supabase / KV); return a delivery confirmation to the UI.
- Rate-limit + honeypot anti-spam; validate email/phone server-side.
- Fallback: prefilled WhatsApp link with the same fields if the API call fails.

---

## 11. CMS (non-technical editing)

Editors update without a dev: products (grades, TDS PDFs), certificates, photos, videos, documents.
Schemas: `product` (category, name, grades[], specs, packaging, tdsFile), `certificate` (standard,
number, issued, validUntil, scope, pdf), `mediaAsset`, `page/section`. Pages fetch via ISR.
Add a short editor guide in `/docs/cms.md`.

---

## 12. Performance budget (hard targets)

- Lighthouse mobile & desktop: **Performance 100, SEO 100, Accessibility 100, Best Practices 100.**
- CWV: **LCP < 1.5s, CLS < 0.05, INP < 100ms.** Desktop load < 1s, mobile < 2s.
- No render-blocking resources; defer/lazy non-critical JS; `next/image` everywhere; preload hero font.
- Animations CSS/SVG-first; no heavy autoplay; gate motion behind `prefers-reduced-motion`.
- Any 3D (Three.js/Spline): lazy-load below the fold; keep the hero LCP a static/text node.

---

## 13. Accessibility

WCAG AA contrast, visible keyboard focus, full keyboard nav, correct landmarks/roles, labelled fields,
`aria-expanded` on menus, alt text on media, RTL parity. (Use the UI UX Pro Max `--domain ux` audit.)

---

## 14. Deployment

Vercel (production + preview). All secrets as env vars. Ship `app/sitemap.ts`, `app/robots.ts`,
`llms.txt`, manifest, favicons/OG image. Post-deploy: Lighthouse + RTL pass + submit sitemap to Google/Bing.

---

## 15. Suggested build order

1. Scaffold Next.js + Tailwind + next-intl; install & run **UI UX Pro Max** `--design-system`; set tokens + fonts.
2. Generate Header / Hero / Footer with **Magic `/ui`**; lock the design system.
3. Build remaining home sections (per §6); wire static content first.
4. i18n (en + ar first to validate RTL), then the other 8 locales.
5. SEO + GEO (metadata, sitemap, robots, JSON-LD, FAQ, llms.txt).
6. CMS integration + product/cert pages.
7. `/api/lead` + Telegram + storage + anti-spam.
8. Performance pass → Lighthouse 100; accessibility + RTL pass (Pro Max `--domain ux`).
9. Deploy to Vercel; verify §16.

---

## 16. Acceptance criteria (verify before "done")

- [ ] Contact reachable in ≤2 clicks from every page (WhatsApp/Telegram/form).
- [ ] Certificates shown honestly with the group-factory entity name + numbers; nothing falsely attributed to NovaCore.
- [ ] All 10 locales build; Arabic is correct RTL across all components.
- [ ] sitemap.xml, robots.txt, hreflang, canonical, JSON-LD, llms.txt all present and valid.
- [ ] Lead form delivers to Telegram, stores the lead, confirms to the user, has WhatsApp fallback.
- [ ] CMS editing works for products/certs/media without code.
- [ ] Lighthouse 100/100/100/100 on the home page (mobile); CWV within budget.
- [ ] No secrets in the repo; 21st.dev key rotated.
- [ ] UI UX Pro Max design system generated and its tokens used throughout (no scattered raw values).
