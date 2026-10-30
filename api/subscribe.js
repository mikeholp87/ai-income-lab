// Weekly build notes signup: adds the address to Resend's contact list, which broadcasts go to,
// and welcomes new subscribers by email.
// Env: RESEND_API_KEY, the same key as the contact form; it needs full access to add contacts.
import { isEmail, TO as OWNER } from "./contact.js";
import { addAirtableLead } from "./_lib/airtable-lead.js";

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

export async function POST(req) {
  let body;
  try { body = await req.json(); }
  catch { return Response.json({ error: "invalid" }, { status: 400 }); }
  // Honeypot: hidden from people, so only bots fill it. Pretend it worked.
  if (body?.hp) {
    console.log("subscribe: trap field filled, ignored");
    return Response.json({ ok: true });
  }
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !isEmail(email)) return Response.json({ error: "invalid" }, { status: 400 });
  if (!process.env.RESEND_API_KEY) return Response.json({ error: "unavailable" }, { status: 503 });

  try {
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    // 409: already on the list. They were welcomed before, so the page tells them instead of promising an email.
    if (res.status === 409) {
      console.log("subscribe: already on the list, no welcome sent");
      return Response.json({ ok: true, already: true });
    }
    if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
    console.log("subscribe: contact added");
  } catch (err) {
    console.error("subscribe", err);
    return Response.json({ error: "failed" }, { status: 502 });
  }
  await addAirtableLead(email, req.headers.get("referer"));
  await notifyOwner(email, req.headers.get("referer"));
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
    return Response.json({ ok: true, welcomeSent: false });
  }
  return Response.json({ ok: true, welcomeSent: true });
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
