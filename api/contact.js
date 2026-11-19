// Contact form: emails the site owner through Resend, with Reply-To set to the visitor.
// Env: RESEND_API_KEY (sending access for ai-automation-station.com). Without it the form
// answers 503 and the page offers a prefilled mailto link instead.
import { clientIp, createRateLimiter, tooManyRequests } from "../src/rate-limit.js";

export const runtime = "nodejs";

export const TO = "automojic@proton.me";
const FROM = "AI Automation Station <contact@ai-automation-station.com>";
const LIMITS = { name: 100, email: 254, topic: 120, message: 5000 };

export const isEmail = text => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

// Trimmed fields, or null when something required is missing, malformed, or too long.
export function readContact(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const fields = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = typeof body[key] === "string" ? body[key].trim() : "";
    if (value.length > max) return null;
    fields[key] = value;
  }
  if (!fields.name || !fields.message || !isEmail(fields.email)) return null;
  return fields;
}

// 5 messages per IP per 10 minutes, per warm instance (see src/rate-limit.js for its limits).
export const limitContact = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(req) {
  const limited = limitContact(clientIp(req.headers));
  if (!limited.ok) return tooManyRequests(limited.retryAfter);
  let body;
  try { body = await req.json(); }
  catch { return Response.json({ error: "invalid" }, { status: 400 }); }
  // Honeypot: the field is hidden from people, so only bots fill it. Pretend it worked.
  if (body?.hp) return Response.json({ ok: true });
  const contact = readContact(body);
  if (!contact) return Response.json({ error: "invalid" }, { status: 400 });
  if (!process.env.RESEND_API_KEY) return Response.json({ error: "unavailable" }, { status: 503 });

  const oneLine = (s) => s.replace(/\s+/g, " ");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: contact.email,
        subject: oneLine(`Website message from ${contact.name}${contact.topic ? `: ${contact.topic}` : ""}`),
        text: `From: ${oneLine(contact.name)} <${contact.email}>\nAbout: ${oneLine(contact.topic) || "(not given)"}\n\n${contact.message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error("contact", err);
    return Response.json({ error: "send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
