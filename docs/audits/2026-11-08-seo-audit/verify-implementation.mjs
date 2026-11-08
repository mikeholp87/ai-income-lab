import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { GET } from '../../../api/videos.js';
import { archiveCss, consentCss, readingCss } from '../../../src/asset-version.js';

const base = 'https://www.ai-automation-station.com';
const edges = [
  ['build-apps-with-ai-coding-agents', 'consent-tracking'],
  ['build-apps-with-ai-coding-agents', 'rea-video-editor-prototype'],
  ['choosing-ai-models-for-a-task', 'deepseek-harness-first-test'],
  ['choosing-ai-models-for-a-task', 'muse-code-setup'],
  ['codex-on-linux', 'ghostty-debian-configuration'],
  ['ai-agent-workflow', 'grokbot-virtual-office'],
  ['ai-agent-workflow', 'grokbot-vs-dots'],
  ['codex-workflow', 'herdr-desktop-app'],
  ['ai-automation-services-small-business', 'runable-audit-website'],
  ['openseo-review', 'trakkr-codex-visibility-workflow'],
];
const files = (await readdir('dist/guides')).filter(f => f.endsWith('.html'));
const guides = await Promise.all(files.map(async file => ({ path: `/guides/${file}`, html: await readFile(`dist/guides/${file}`, 'utf8') })));
const observed = [];
for (const [source, target] of edges) {
  const sourcePath = `/guides/${source}.html`;
  const targetPath = `/guides/${target}.html`;
  const from = guides.find(g => g.path === sourcePath);
  const to = guides.find(g => g.path === targetPath);
  assert.ok(from && to, `${source} -> ${target} pages exist`);
  const body = from.html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const anchor = [...body.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].find(m => m[1] === targetPath);
  assert.ok(anchor, `${source} -> ${target} body link`);
  assert.ok(to.html.includes(`<link rel="canonical" href="${base}${targetPath}">`), target);
  assert.doesNotMatch(to.html, /<meta name="robots" content="[^"]*noindex/);
  observed.push({ source: base + sourcePath, target: base + targetPath, anchor: anchor[2].replace(/<[^>]*>/g, ''), placement: 'main body', delivery: 'local production build', canonical: base + targetPath, inboundGuidePages: guides.filter(g => g.path !== targetPath && g.html.includes(`href="${targetPath}"`)).length });
}
for (const url of [readingCss, consentCss, archiveCss]) {
  const [path, version] = url.split('?v=');
  const bytes = await readFile(`dist${path}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex').slice(0, 8), version, url);
}
const routes = [];
for (const id of ['miBtL2fVkpg', 'phVQuQMojA8', '0iTOlQjNdhs']) {
  const response = await GET(new Request(`${base}/watch/${id}`));
  assert.equal(response.status, 200, id);
  const html = await response.text();
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const player = html.match(/<iframe class="player"[^>]*src="([^"]+)"[^>]*><\/iframe>/);
  assert.ok(player, id);
  assert.equal(player[1], schema.embedUrl, id);
  assert.doesNotMatch(player[0], /autoplay=|srcdoc=|loading="lazy"/);
  routes.push({ path: `/watch/${id}`, status: response.status, player: player[1], check: 'direct Request through API GET handler; no browser' });
}
const privacy = await readFile('dist/privacy.html', 'utf8');
assert.ok(privacy.includes('Dedicated video watch pages load an embedded YouTube player when you open the page'));
assert.ok(privacy.includes('Written guides that include a video use a click-to-load control'));
const index = await readFile('dist/index.html', 'utf8');
assert.match(index, /<h1/);
const result = { checkedAt: new Date().toISOString(), delivery: 'local build; not deployed', guideCount: guides.length, contextualLinks: observed, watchRoutes: routes, stylesheetHashes: 'all three match emitted files', privacyNotice: 'matches player behavior', homepagePrerendered: true };
await writeFile(new URL('implementation-checks.json', import.meta.url), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ guides: guides.length, contextualLinks: observed.length, watchRoutes: routes.length, stylesheetHashes: 'passed', privacyNotice: 'passed', homepagePrerendered: true }, null, 2));
