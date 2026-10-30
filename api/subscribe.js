// Weekly build notes signup: adds the address to Resend's contact list, which broadcasts go to,
// and welcomes new subscribers by email.
// Env: RESEND_API_KEY, the same key as the contact form; it needs full access to add contacts.
import { isEmail, TO as OWNER } from "./contact.js";

export const runtime = "nodejs";

const FROM = "Mike from AI Income Lab <notes@ai-automation-station.com>";
const REPLY_TO = "automojic@proton.me";
const site = "https://www.ai-automation-station.com";
export const welcome = {
  subject: "Welcome to AI Automation Station weekly build notes",
  text: `Hi, Mike here. Thanks for signing up for the weekly build notes.

AI Automation Station is my YouTube channel and written guides on practical AI automation with tools like GrokBot, Claude Code and Codex.

You'll get new guides and tested builds in one short email each week, with video breakdowns and practical workflows.

The website holds the written guides and the AI Income Lab community, where you get courses, templates and help while you build.

Your next steps:

Start Here
https://www.ai-automation-station.com/start-here.html

Guides
https://www.ai-automation-station.com/guides.html

YouTube channel
https://www.youtube.com/@ai-automation-station

Community
https://www.ai-automation-station.com/#community

Mike Holp
AI Automation Station

You're getting this because this address signed up for the build notes on ai-automation-station.com. Not you, or changed your mind? Reply "unsubscribe" and I'll take you off the list.`,
  html: `<div>
<p>Hi, Mike here. Thanks for signing up for the weekly build notes.</p>

<p>AI Automation Station is my YouTube channel and written guides on practical AI automation with tools like GrokBot, Claude Code and Codex.</p>

<p>You'll get new guides and tested builds in one short email each week, with video breakdowns and practical workflows.</p>

<p>The website holds the written guides and the AI Income Lab community, where you get courses, templates and help while you build.</p>

<p>Your next steps:</p>

<p><a href="https://www.ai-automation-station.com/start-here.html">Start Here</a></p>

<p><a href="https://www.ai-automation-station.com/guides.html">Guides</a></p>

<p><a href="https://www.youtube.com/@ai-automation-station">YouTube channel</a></p>

<p><a href="https://www.ai-automation-station.com/#community">Community</a></p>

<p>Mike Holp<br>AI Automation Station</p>

<footer><p>You're getting this because this address signed up for the build notes on <a href="https://www.ai-automation-station.com" style="color:inherit;text-decoration:none">ai-automation-station.com</a>. Not you, or changed your mind? Reply "unsubscribe" and I'll take you off the list.</p></footer>
</div>`,
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
