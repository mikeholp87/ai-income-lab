// Weekly build notes signup: adds the address to Resend's contact list, which broadcasts go to.
// Env: RESEND_API_KEY, the same key as the contact form; it needs full access to add contacts.
import { isEmail } from "./contact.js";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try { body = await req.json(); }
  catch { return Response.json({ error: "invalid" }, { status: 400 }); }
  // Honeypot: hidden from people, so only bots fill it. Pretend it worked.
  if (body?.website) return Response.json({ ok: true });
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
    // 409: already on the list, which is the outcome the visitor wanted.
    if (!res.ok && res.status !== 409) throw new Error(`Resend ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error("subscribe", err);
    return Response.json({ error: "failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
