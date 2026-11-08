import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { guides } from './archive.js';

const site = 'https://www.ai-automation-station.com';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));

const NEW = [
  ['ai-threejs-rocket-demo', ['K2UeJZ_7mS0'], 'AI Rocket Demo: Three.js Scene and Camera Controls', 'Follow a recorded AI-generated rocket scene, inspect its HTML preview and add zoom and rotation, without treating the demo as a validated flight simulator.', 'Build an AI-generated Three.js rocket demo, then add camera controls'],
  ['chatgpt-images-sketch-workflow', ['c3AtpUbpXNA'], 'ChatGPT Image Editing: Sketch-to-Scene and Local Edits', 'Follow a sketch-to-image composition and a local dog edit in ChatGPT Images, then check object placement, reference fidelity and unintended changes.', 'ChatGPT image editing with Sketch: compose a scene, then make a local edit'],
  ['claude-code-task-manager', ['phVQuQMojA8'], 'Claude Code Task Manager: Scope, Checks and Packaging', 'Explore a recorded Windows and Linux task-manager project, from its prompt and metric checks to packaging limits and platform differences.', 'Build a task manager with Claude Code: scope, prompt and packaging'],
  ['cleanyourtv-claude-code', ['0iTOlQjNdhs'], 'CleanYourTV with Claude Code: TCL Setup and Risks', 'Follow the TCL CleanYourTV case, including debugging access, backups, launcher changes and the remote-button failures that remain in the recorded outcome.', 'CleanYourTV with Claude Code: a TCL walkthrough and the problems to check'],
  ['codex-seo-workflow', ['TuVL2x6IfDk'], 'Internal Link Audit with Codex: A Reviewed SEO Workflow', 'Use a recorded internal link audit to structure research, a phased plan, reviewed edits and rechecks, without turning an anecdotal link count into a rule.', 'Codex for SEO: A Step-by-Step Internal Linking Workflow'],
  ['crowdreply-mcp-codex', ['9WPazkEp7VU'], 'CrowdReply MCP with Codex: Citation Data to Review Plans', 'Follow the CrowdReply-to-Codex workflow for citation records and implementation plans, with clear limits on samples, marketplace claims and measured uplift.', 'CrowdReply MCP with Codex: turn citation records into a review plan'],
  ['deepseek-harness-first-test', ['exXV5ehmsEU'], 'DeepSeek Harness First Test: Setup Errors and Demo Limits', 'Follow a DeepSeek Harness preview test through provider failures, a working OpenRouter route and a generated engine animation that remains buggy.', 'DeepSeek Harness first test: source build, provider errors and a buggy HTML demo'],
  ['ghostty-debian-configuration', ['YdvngsXEqo8'], 'Ghostty Config on Debian: Themes and Reload Checks', 'Explore a recorded Debian Ghostty config and theme setup, official config filenames and reload behavior, without assuming universal packages or RAM gains.', 'Ghostty config on Debian: installation checks, themes and configuration reloads'],
  ['grokbot-for-beginners', ['gNcHbc2kdzw'], 'GrokBot for Beginners: First Bot, Access and Approvals', 'Set up a narrowly scoped GrokBot workflow, understand the shared box and separate desktops, connect needed services and keep external actions reviewable.', 'GrokBot for Beginners: Set Up Your First AI Bot'],
  ['grokbot-for-seo', ['6jDcOXSOT00'], 'GrokBot for SEO: Audit Bots, Data and Reviewed Fixes', 'Follow a recorded SEO-bot setup, separate provider data from estimates and turn an audit into reviewed changes without assuming current trial entitlements.', 'GrokBot for SEO: How to Set Up Site Audit and Keyword Bots'],
  ['grokbot-virtual-office', ['wzC2r426KWs'], 'GrokBot Virtual Office: Build a Custom Agent Dashboard', 'Follow a custom GrokBot office Page, including layout fixes, copied approval handoffs and the unfinished status synchronization behind the visual overview.', 'How to Build a Virtual Office for Your AI Agents in GrokBot'],
  ['grokbot-vs-dots', ['vauqktcB6ak', 'uTcTJd5JaZU'], 'GrokBot vs Dots: Onboarding, Job Drafts and Permissions', 'Compare recorded Dots onboarding with a GrokBot job-draft workflow: permission limits, unequal test conditions and no claim of submitted applications.', 'GrokBot vs Dots: Which Always-On AI Agent Should You Use?'],
  ['herdr-desktop-app', ['IV6q81wRay4'], 'Herdr Desktop Guide: Setup, Workspaces and Limits', 'Follow Herdr desktop setup, themes, session resume and side-by-side agents, with documented lifecycle limits and a qualified recorded memory observation.', 'Herdr desktop app: a practical guide to coding-agent workspaces'],
  ['herdr-guide', ['VE66JDHoS6Y'], 'Herdr Terminal Guide: Workspaces and Coding-Agent Sessions', 'Organize existing coding agents in the Herdr terminal interface, use the documented installer and distinguish background sessions from desktop-app behavior.', 'Herdr: Run Claude Code, Codex and Other Agents in One Terminal'],
  ['jev-skills-router-setup', ['wakl0ayO_fk'], 'Jev AI with Coding Agents: Skills, Access and Routed Tests', 'Follow recorded TypeSafe Jev skills and routing tests, separate access from installation and inspect returned requests; confidence is not proof.', 'Jev with coding agents: install skills, configure access and test a routed request'],
  ['muse-code-setup', ['mPHM81X1oqc'], 'Meta Muse Code Setup: API Failure and a Working CLI', 'Follow an unsuccessful OpenCode API route and a responding Meta Muse Code CLI, with clear limits on model access, installer details and the open audit.', 'Meta Muse Code setup: an API failure, a working CLI route and an unfinished audit'],
  ['opendesign-linux-slides', ['rMRsVyIsZCU'], 'OpenDesign (Open Design) on Linux: Source Setup and Slides', 'Explore recorded OpenDesign (Open Design) source setup, dependency fixes and HTML deck export, while separating model charges from software access.', 'OpenDesign (Open Design) on Linux: source setup, a first design and HTML slides'],
  ['rea-video-editor-prototype', ['UAPaM6KrC-M'], 'REA Coding-Agent Case: A Video-Editor Prototype', 'Follow a REA-assisted editor prototype, its documented setup command and the playback, effects and resizing problems that remain after the recorded build.', 'REA with a coding agent: a video-editor prototype and its limits'],
  ['run-a-blog-with-grokbot', ['wLIiTkra7uM'], 'GrokBot WordPress Workflow: Long-Form Videos to Drafts', 'Turn long-form video sources into reviewable WordPress drafts, separating connector access, recurring writing, publication approval and subscriber emails.', 'GrokBot Blog Automation: Turn Long-Form Videos Into Reviewable WordPress Drafts'],
  ['runable-audit-website', ['qQVAnp4-EpI'], 'Runable AI Audit-Service Website: Research to an MVP', 'Follow a Runable AI audit-service site from business brief to revised MVP, with payments, inquiry delivery and service fulfillment still requiring checks.', 'Build an audit-service website with Runable: research to a reviewed MVP'],
  ['trakkr-codex-visibility-workflow', ['0jzTOUv_B04'], 'Trakkr and Codex: AI Visibility, Crawlers and Visits', 'Follow tracked questions and MCP action lists while distinguishing AI visibility, crawler activity, citations and visits from verified commercial outcomes.', 'Trakkr and Codex: distinguish AI visibility, crawler activity and visits'],
  ['treg-inside-grokbot', ['9A2StjrxOms'], 'Treg in GrokBot: Connect Data Tools and Control Costs', 'Follow recorded Treg connections and SEO reporting, distinguish provider billing from catalog access and require a deliberate decision before paid requests.', 'Treg Inside GrokBot: How to Give Your Bots Pay-Per-Call Data Tools'],
];
const EXCLUDED = ['claude-models-compared', 'openrouter-setup', 'claude-code-vs-codex'];

test('the 22 new AAS guides have exact metadata, canonicals, robots, schema and discovery', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  const collection = schemas(hub).find(item => item['@type'] === 'CollectionPage');
  assert.equal(NEW.length, 22);
  for (const [slug, ids, title, description, headline] of NEW) {
    const html = await read(`public/guides/${slug}.html`);
    const url = `${site}/guides/${slug}.html`;
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), title, slug);
    assert.equal(decode(html.match(/<meta name="description" content="([^"]*)">/)[1]), description, slug);
    assert.match(html, /<meta name="robots" content="index,follow">/, slug);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`), slug);
    assert.ok(html.includes(`<h1>${headline}</h1>`), slug);
    const article = schemas(html).find(item => item['@type'] === 'Article');
    const crumbs = schemas(html).find(item => item['@type'] === 'BreadcrumbList');
    const faq = schemas(html).find(item => item['@type'] === 'FAQPage');
    assert.equal(article.headline, headline, slug);
    assert.equal(article.url, url, slug);
    assert.equal(article.description, description, slug);
    assert.equal(faq.url, url, slug);
    assert.equal(crumbs.itemListElement[2].item, url, slug);
    assert.match(hub, new RegExp(`<a href="/guides/${slug}\\.html">`), slug);
    assert.ok(collection.mainEntity.itemListElement.some(item => item.url === url), slug);
    assert.ok(sitemap.includes(`<loc>${url}</loc><lastmod>2026-11-08</lastmod>`), slug);
    assert.ok(llms.includes(`](${url})`), slug);
    const embeds = [...html.matchAll(/data-embed="https:\/\/www\.youtube-nocookie\.com\/embed\/([\w-]{11})"/g)].map(match => match[1]);
    assert.deepEqual(embeds, ids, slug);
    for (const id of ids) {
      assert.match(html, new RegExp(`<figure class="video"><a class="player" href="https://www.youtube.com/watch\\?v=${id}" data-embed="https://www.youtube-nocookie.com/embed/${id}"`), slug);
    }
    assert.doesNotMatch(html, /<iframe/, slug);
    assert.doesNotMatch(html, /connect-claude-code-codex-to-grokbot/, slug);
  }
});

test('excluded existing-URL revisions and the unpublished connect path stay out of this phase', async () => {
  const files = (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html'));
  assert.ok(!files.includes('connect-claude-code-codex-to-grokbot.html'));
  assert.ok(!existsSync(new URL('../public/guides/connect-claude-code-codex-to-grokbot.html', import.meta.url)));
  for (const slug of EXCLUDED) assert.ok(files.includes(`${slug}.html`), slug);
  const comparison = await read('public/guides/claude-code-vs-codex.html');
  assert.doesNotMatch(comparison, /connect-claude-code-codex-to-grokbot/);
  assert.match(comparison, /<title>Codex vs Claude Code: /);
});

test('the rocket guide stays a qualified case study without reconstructing the prompt', async () => {
  const html = await read('public/guides/ai-threejs-rocket-demo.html');
  assert.match(html, /The original prompt is not reproduced here/);
  assert.match(html, /not a physics-validated simulator|without treating the demo as a validated flight simulator/);
  assert.doesNotMatch(html, /TODO|lorem ipsum/i);
});

test('CrowdReply and Herdr desktop routing do not invent a missing watch page', () => {
  const route = title => guides.find(([pattern]) => pattern.test(title))?.[1];
  assert.equal(route('This Is The AI SEO Strategy You’re Missing!'), '/guides/crowdreply-mcp-codex.html');
  assert.equal(route("This Is The AI SEO Strategy You're Missing!"), '/guides/crowdreply-mcp-codex.html');
  assert.equal(route('New HERDR Desktop App Is A Game Changer!'), '/guides/herdr-desktop-app.html');
  assert.equal(route('Herdr Lets You Run Claude Code And Codex In One Place'), '/guides/herdr-guide.html');
});

test('Dots is one guide with both long-form embeds and Shorts stay excluded', async () => {
  const html = await read('public/guides/grokbot-vs-dots.html');
  assert.match(html, /data-embed="https:\/\/www\.youtube-nocookie\.com\/embed\/vauqktcB6ak"/);
  assert.match(html, /data-embed="https:\/\/www\.youtube-nocookie\.com\/embed\/uTcTJd5JaZU"/);
  assert.equal((html.match(/<figure class="video">/g) || []).length, 2);
  const files = await readdir(new URL('../public/guides', import.meta.url));
  assert.ok(!files.some(file => /short/i.test(file)));
});
