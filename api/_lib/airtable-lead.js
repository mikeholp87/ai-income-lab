export async function addAirtableLead(email, page) {
  try {
    const token = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN;
    if (!token) {
      console.error("airtable lead: missing API token");
      return false;
    }
    const base = process.env.AIRTABLE_BASE_ID || "appQ4kt0lriJEXdFd";
    const table = process.env.AIRTABLE_LEADS_TABLE || "tbl7ofTxzQ3tbdFDt";
    const fields = {
      Email: email,
      "Signed up at": new Date().toISOString(),
      Source: "ai-automation-station.com newsletter",
    };
    if (typeof page === "string" && /^https?:\/\//i.test(page)) {
      try {
        const url = new URL(page);
        if (url.protocol === "http:" || url.protocol === "https:") fields["Source page"] = page;
      } catch { /* Omit invalid referrers. */ }
    }
    const res = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(table)}`, {
      method: "PATCH",
      signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        performUpsert: { fieldsToMergeOn: ["Email"] },
        typecast: true,
        records: [{ fields }],
      }),
    });
    if (!res.ok) throw new Error(`Airtable ${res.status}`);
    return true;
  } catch (err) {
    console.error("airtable lead", err);
    return false;
  }
}
