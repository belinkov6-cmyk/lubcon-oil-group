import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type LeadPayload = {
  name?: string;
  company?: string;
  country?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  company_website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max = 800): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: bots fill hidden field — silently accept, do nothing.
  if (clean(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const company = clean(body.company, 160);
  const country = clean(body.country, 120);
  const phone = clean(body.phone, 60);
  const interest = clean(body.interest, 80);
  const message = clean(body.message, 2000);

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = [
    '🛢️ *New Lubcon lead*',
    `*Name:* ${name}`,
    company && `*Company:* ${company}`,
    country && `*Country:* ${country}`,
    `*Email:* ${email}`,
    phone && `*Phone:* ${phone}`,
    interest && `*Interest:* ${interest}`,
    message && `*Message:* ${message}`,
  ]
    .filter(Boolean)
    .join('\n');

  // If Telegram isn't configured, don't fail the user — log and accept.
  if (!token || !chatId) {
    console.warn('[lead] TELEGRAM env not set; lead not forwarded:\n', text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) throw new Error(`Telegram ${tg.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[lead] Telegram delivery failed:', err);
    return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
  }
}
