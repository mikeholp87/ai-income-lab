// Weekly build notes signup: adds the address to Resend's contact list, which broadcasts go to,
// and welcomes new subscribers by email.
// Env: RESEND_API_KEY, the same key as the contact form; it needs full access to add contacts.
import { isEmail, TO as OWNER } from "./contact.js";
import { clientIp, createRateLimiter, tooManyRequests } from "../src/rate-limit.js";

export const runtime = "nodejs";

const FROM = "Mike from AI Income Lab <notes@ai-automation-station.com>";
const REPLY_TO = "automojic@proton.me";
const site = "https://www.ai-automation-station.com";
export const welcome = {
  subject: "Welcome to the weekly build notes",
  text: `Hey, Mike here. Thanks for signing up.

Once a week you'll get one short email: the new guides I've published and the AI tools I've actually tested on real builds, with what worked and what didn't. No fluff, and nothing you have to read on a schedule.

While you wait for the first one, three good places to start:

1. Start here, the shortest path through everything on the site:
${site}/start-here.html

2. The free written build guides, step by step:
${site}/guides.html

3. Every video, grouped by tool (Claude Code, n8n, Make.com, AI agents and more):
${site}/videos

If you want help building alongside other people, that's what AI Income Lab is for: courses, templates and 2,900+ members on Skool. Have a look whenever you're ready:
${site}/#community

Hit reply and tell me what you're trying to build. I read every reply, and it shapes what I test next.

Mike Holp
AI Automation Station

You're getting this because this address signed up for the build notes on ${site.replace("https://", "")}. Not you, or changed your mind? Reply "unsubscribe" and I'll take you off the list.`,
};

// 5 signups per IP per 10 minutes, per warm instance (see src/rate-limit.js for its limits).
export const limitSubscribe = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(req) {
  const limited = limitSubscribe(clientIp(req.headers));
  if (!limited.ok) return tooManyRequests(limited.retryAfter);
  let body;
  try { body = await req.json(); }
  catch { return Response.json({ error: "invalid" }, { status: 400 }); }
  // Honeypot: hidden from people, so only bots fill it. Pretend it worked.
  if (body?.hp) {
    console.log("subscribe: trap field filled, ignored");
    return Response.json({ ok: true, confirm: true });
  }
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !isEmail(email)) return Response.json({ error: "invalid" }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.SUBSCRIBE_SECRET) return Response.json({ error: "unavailable" }, { status: 503 });

  // Double opt-in: nothing is added until the address owner clicks the link in this email.
  const page = req.headers.get("referer");
  const link = `${site}/api/subscribe?t=${await signConfirmation(email, page)}`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [email], reply_to: REPLY_TO, ...confirmation(link) }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
    console.log("subscribe: confirmation sent");
  } catch (err) {
    console.error("subscribe confirm", err);
    return Response.json({ error: "failed" }, { status: 502 });
  }
  // The same answer for new and existing addresses, so the form reveals nothing about the list.
  return Response.json({ ok: true, confirm: true });
}

// GET /api/subscribe?t=… is the confirmation link. A valid, unexpired link adds the contact,
// tells Mike and sends the welcome email, then lands on a page saying it worked.
export async function GET(req) {
  const claim = await verifyConfirmation(new URL(req.url).searchParams.get("t"));
  if (!claim) return Response.redirect(`${site}/start-here.html?subscribe=expired`, 303);
  if (!process.env.RESEND_API_KEY) return Response.redirect(`${site}/start-here.html?subscribe=failed`, 303);
  const result = await addSubscriber(claim.email, claim.page);
  return Response.redirect(`${site}/start-here.html?subscribe=${result.ok ? "confirmed" : "failed"}`, 303);
}

export const confirmation = link => ({
  subject: "Confirm your weekly build notes signup",
  text: `Hey, Mike here. Someone (hopefully you) asked to get the weekly build notes at this address.

Confirm with this link and the first email will be on its way:
${link}

The link works for 48 hours. If you didn't sign up, ignore this email and you won't hear from me again.

Mike Holp
AI Automation Station`,
});

const CONFIRM_TTL_MS = 48 * 60 * 60 * 1000;
const b64url = bytes => Buffer.from(bytes).toString("base64url");

async function hmac(data) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(process.env.SUBSCRIBE_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data)));
}

export async function signConfirmation(email, page, now = Date.now()) {
  const payload = b64url(JSON.stringify({ e: email, p: page ? String(page).slice(0, 300) : "", x: now + CONFIRM_TTL_MS }));
  return `${payload}.${await hmac(payload)}`;
}

export async function verifyConfirmation(token, now = Date.now()) {
  if (!process.env.SUBSCRIBE_SECRET || typeof token !== "string" || token.length > 1200) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await hmac(payload);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i += 1) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff) return null;
  try {
    const { e, p, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof e !== "string" || !isEmail(e) || !(x > now)) return null;
    return { email: e, page: p || null };
  } catch { return null; }
}

async function addSubscriber(email, page) {
  const headers = { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" };
  const contact = `https://api.resend.com/contacts/${encodeURIComponent(email)}`;
  // Already subscribed: they were welcomed before, so no second welcome or owner alert, but the
  // response matches a new signup so the form cannot be used to check who is subscribed.
  const alreadySubscribed = () => {
    console.log("subscribe: already on the list, no welcome sent");
    return { ok: true, welcomeSent: true };
  };
  try {
    // Resend accepts a POST for an existing contact instead of answering 409, so look it up first.
    const found = await fetch(contact, { signal: AbortSignal.timeout(8000), headers });
    if (found.ok) {
      if (!(await found.json().catch(() => ({}))).unsubscribed) return alreadySubscribed();
      const res = await fetch(contact, {
        method: "PATCH",
        signal: AbortSignal.timeout(8000),
        headers,
        body: JSON.stringify({ unsubscribed: false }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
      console.log("subscribe: contact resubscribed");
    } else if (found.status === 404) {
      const res = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers,
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (res.status === 409) return alreadySubscribed();
      if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
      console.log("subscribe: contact added");
    } else {
      throw new Error(`Resend ${found.status} ${await found.text()}`);
    }
  } catch (err) {
    console.error("subscribe", err);
    return { ok: false };
  }
  await notifyOwner(email, page);
  // The contact already exists even when the welcome email fails.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [email], reply_to: REPLY_TO, ...welcome }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
    console.log("subscribe: welcome sent", (await res.json().catch(() => ({}))).id ?? "");
  } catch (err) {
    console.error("subscribe welcome", err);
    return { ok: true, welcomeSent: false };
  }
  return { ok: true, welcomeSent: true };
}


// Tells Mike about each new signup. A failure here never fails the signup.
async function notifyOwner(email, page) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [OWNER],
        reply_to: email,
        subject: `New build notes signup: ${email}`,
        text: `${email} signed up for the weekly build notes.\nPage: ${page ? String(page).slice(0, 300) : "unknown"}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
    console.log("subscribe: owner notified", (await res.json().catch(() => ({}))).id ?? "");
  } catch (err) {
    console.error("subscribe notify", err);
  }
}
