import fs from 'node:fs';
import path from 'node:path';

const dir = '/home/mikeh/Projects/ai-income-lab/public/guides';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
const hub = fs.readFileSync('/home/mikeh/Projects/ai-income-lab/public/guides.html', 'utf8');
const today = new Date('2026-11-11');
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const all = Object.fromEntries(files.map((f) => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
const rows = [];
for (const f of files) {
  const h = all[f];
  const main = (h.match(/<main[\s\S]*?<\/main>/) || [''])[0];
  const body = main
    .replace(/<aside class="note next-steps"[\s\S]*?<\/aside>/, '')
    .replace(/<section class="cta"[\s\S]*?<\/section>/, '')
    .replace(/<form class="notes"[\s\S]*?<\/form>/, '')
    .replace(/<nav[\s\S]*?<\/nav>/g, '');
  const text = strip(body);
  const words = text.split(' ').length;
  const title = (h.match(/<title>(.*?)<\/title>/) || [])[1] || '';
  const desc = (h.match(/name="description" content="(.*?)"/) || [])[1] || '';
  const h1 = strip((body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const pub = (h.match(/published_time" content="(.*?)"/) || [])[1];
  const mod = (h.match(/modified_time" content="(.*?)"/) || [])[1];
  const meta = strip((body.match(/<p class="meta">([\s\S]*?)<\/p>/) || [])[1] || '');
  const type = meta.split('·')[0].trim();
  const h2s = (body.match(/<h2/g) || []).length;
  const ext = [...body.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).filter((u) => !u.includes('ai-automation-station.com'));
  const intl = [...body.matchAll(/href="(\/guides\/[^"#]+)"/g)].map((m) => m[1]);
  const inbound = files.filter((g) => g !== f && all[g].includes(`/guides/${f}`)).length;
  const inHub = hub.includes(`/guides/${f}`);
  const affiliate = ext.filter((u) => /[?&](ref|via|aff|affiliate|fpr|utm_source|referral|coupon|code)=|\/ref\/|partnerstack|go\.|\/r\//i.test(u));
  const disclosure = /affiliate|sponsor|commission|partner link|paid partnership/i.test(text);
  const sources = /id="sources"/.test(body);
  const faq = (body.match(/class="faq-item"/g) || []).length;
  const quick = /Quick answer/i.test(text);
  const firstPerson = (text.match(/\b(I|I'm|I’ve|I’m|I've|my|me)\b/g) || []).length;
  const tested = /\b(tested|I ran|I used|I installed|in my test|I tried|my setup|screenshot)\b/i.test(text);
  const video = /\/watch\/[A-Za-z0-9_-]{11}/.test(body);
  const imgs = (body.match(/<img /g) || []).length;
  const emDash = (text.match(/—/g) || []).length;
  const years = [...new Set(text.match(/\b20(1\d|2[0-5])\b/g) || [])];
  const ageDays = mod ? Math.round((today - new Date(mod)) / 864e5) : null;
  const checkedAsOf = (text.match(/as of ([A-Z][a-z]+ \d{1,2}, \d{4})/) || [])[1] || '';
  const pricing = (text.match(/\$\d[\d,.]*/g) || []).length;
  const unverified = /not (been )?(tested|verified|run)|haven’t tested|have not tested|untested/i.test(text);
  rows.push({ f, type, words, tl: title.length, dl: desc.length, h1EqTitle: h1 === title, h2s, ext: ext.length, intl: new Set(intl).size, inbound, inHub, aff: affiliate.length, disclosure, sources, faq, quick, firstPerson, tested, video, imgs, emDash, years: years.join(' '), pub, mod, ageDays, checkedAsOf, pricing, unverified, title, desc });
}
fs.writeFileSync(new URL('./guide-metrics.json', import.meta.url), JSON.stringify(rows, null, 1));
const cols = ['f', 'type', 'words', 'tl', 'dl', 'h2s', 'ext', 'intl', 'inbound', 'inHub', 'aff', 'disclosure', 'sources', 'faq', 'quick', 'firstPerson', 'video', 'imgs', 'pricing', 'mod', 'checkedAsOf'];
console.log(cols.join('\t'));
for (const r of rows.sort((a, b) => a.words - b.words)) console.log(cols.map((c) => r[c]).join('\t'));
// title similarity for cannibalization
const tok = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(' ').filter((w) => w.length > 3));
console.log('\n--- similar titles (jaccard>=0.4)');
for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
  const a = tok(rows[i].title), b = tok(rows[j].title);
  const inter = [...a].filter((x) => b.has(x)).length;
  const jac = inter / (a.size + b.size - inter);
  if (jac >= 0.4) console.log(jac.toFixed(2), rows[i].f, '|', rows[j].f);
}
const dupDesc = rows.filter((r, i) => rows.findIndex((x) => x.desc === r.desc) !== i);
console.log('\ndup descriptions', dupDesc.map((r) => r.f));
console.log('\ntitles >60 / desc outside 120-160');
for (const r of rows) if (r.tl > 60 || r.dl < 120 || r.dl > 160) console.log(r.tl, r.dl, r.f, '|', r.title);
