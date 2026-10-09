// Resend webhook handler — bounces, complaints, deliveries for mail.beremoteconsulting.com
// One file. Web-standard handler: works as
//   - Next.js App Router:  app/api/resend-webhook/route.js
//   - Plain Vercel function: api/resend-webhook.js
// Env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_WEBHOOK_SECRET   whsec_... from Resend → Webhooks → your endpoint
//   AIRTABLE_PAT            (or AIRTABLE_API_KEY) — token with write access to the suppression base
//   SUPPRESSION_BASE_ID     e.g. appXXXXXXXXXXXXXX
//   SUPPRESSION_TABLE       table name or id, default "Email Suppression"
//   EVENTS_TABLE            optional table for delivered/all events log, default "Resend Events"
import crypto from "node:crypto";

export const runtime = "nodejs";

const DOMAIN = "beremoteconsulting.com";
const TOLERANCE_SEC = 5 * 60;

function verify(raw, headers) {
  const id = headers.get("svix-id");
  const ts = headers.get("svix-timestamp");
  const sigHeader = headers.get("svix-signature");
  const secret = process.env.RESEND_WEBHOOK_SECRET || "";
  if (!id || !ts || !sigHeader || !secret.startsWith("whsec_")) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > TOLERANCE_SEC) return false; // replay guard
  const key = Buffer.from(secret.slice(6), "base64");
  const expected = crypto.createHmac("sha256", key).update(`${id}.${ts}.${raw}`).digest("base64");
  return sigHeader.split(" ").some((part) => {
    const sig = part.split(",")[1] || "";
    return sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  });
}

async function airtable(table, fields) {
  const base = process.env.SUPPRESSION_BASE_ID;
  const token = process.env.AIRTABLE_PAT || process.env.AIRTABLE_API_KEY;
  if (!base || !token) throw new Error("Airtable env missing");
  const res = await fetch(`https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`);
}

export async function POST(req) {
  const raw = await req.text(); // raw body is required for signature check
  if (!verify(raw, req.headers)) return new Response("invalid signature", { status: 401 });

  const evt = JSON.parse(raw);
  const d = evt.data || {};
  const from = String(d.from || "");
  if (!from.toLowerCase().includes(DOMAIN)) return new Response("ignored (other domain)", { status: 200 });

  const recipients = (Array.isArray(d.to) ? d.to : [d.to]).filter(Boolean).map((e) => String(e).toLowerCase().trim());
  const common = {
    "Event": evt.type,
    "Resend Email ID": d.email_id || "",
    "From": from,
    "Subject": d.subject || "",
    "Event At": evt.created_at || new Date().toISOString(),
    "Webhook ID": req.headers.get("svix-id") || "",
  };

  try {
    if (evt.type === "email.bounced" || evt.type === "email.complained") {
      for (const email of recipients) {
        await airtable(process.env.SUPPRESSION_TABLE || "Email Suppression", {
          ...common,
          "Email": email,
          "Reason": evt.type === "email.bounced" ? "Bounced" : "Complained",
          "Bounce Detail": d.bounce ? JSON.stringify(d.bounce) : "",
          "Suppressed": true,
        });
      }
    } else if (evt.type === "email.delivered") {
      for (const email of recipients) {
        await airtable(process.env.EVENTS_TABLE || "Resend Events", { ...common, "Email": email });
      }
    }
    // other event types: acknowledged, not stored
  } catch (err) {
    console.error("resend-webhook", err);
    return new Response("storage error", { status: 500 }); // non-2xx → Resend retries
  }
  return new Response("ok", { status: 200 });
}
