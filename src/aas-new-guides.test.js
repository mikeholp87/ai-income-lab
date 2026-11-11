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
  ['ai-threejs-rocket-demo', ['K2UeJZ_7mS0'], 'AI Rocket Demo: Three.js Scene and Camera Controls', 'Build an AI-generated Three.js rocket scene, inspect the HTML preview and add zoom and rotation controls. A fun visual demo, not a flight simulator.', 'AI Rocket Demo: Three.js Scene and Camera Controls'],
  ['chatgpt-images-sketch-workflow', ['c3AtpUbpXNA'], 'ChatGPT Image Editing: Sketch-to-Scene and Local Edits', 'Follow a sketch-to-image composition and a local dog edit in ChatGPT Images, then check object placement, reference fidelity and unintended changes.', 'ChatGPT Image Editing: Sketch-to-Scene and Local Edits'],
  ['claude-code-task-manager', ['phVQuQMojA8'], 'Claude Code Task Manager: Scope, Checks and Packaging', 'How I built a free Windows and Linux task manager with Claude Code: the prompt, checking every metric, and what packaging still needs.', 'Claude Code Task Manager: Scope, Checks and Packaging'],
  ['cleanyourtv-claude-code', ['0iTOlQjNdhs'], 'CleanYourTV with Claude Code: TCL Setup and Risks', 'How I cleaned up a TCL Android TV with Claude Code and CleanYourTV: debugging access, backups, launcher changes and the buttons that still fail.', 'CleanYourTV with Claude Code: TCL Setup and Risks'],
  ['codex-seo-workflow', ['TuVL2x6IfDk'], 'Internal Link Audit with Codex: A Reviewed SEO Workflow', 'Run an internal link audit with Codex: give it your research, get a phased plan, review the edits and recheck. The same loop fits most on-page SEO.', 'Internal Link Audit with Codex: A Reviewed SEO Workflow'],
  ['crowdreply-mcp-codex', ['9WPazkEp7VU'], 'CrowdReply MCP with Codex: Citation Data to Review Plans', 'Connect CrowdReply to Codex over MCP, pull AI citation records and turn them into a plan you review, plus what I measured and what I have not yet.', 'CrowdReply MCP with Codex: Citation Data to Review Plans'],
  ['deepseek-harness-first-test', ['exXV5ehmsEU'], 'DeepSeek Harness First Test: Setup Errors and Demo Limits', 'Get DeepSeek Harness running: the provider errors I hit, the OpenRouter route that worked, and the bugs left in my first generated demo.', 'DeepSeek Harness First Test: Setup Errors and Demo Limits'],
  ['ghostty-debian-configuration', ['YdvngsXEqo8'], 'Ghostty Config on Debian: Themes and Reload Checks', 'Set up Ghostty on Debian: install it, find the config file, switch themes and reload settings, plus the memory use I saw next to Konsole.', 'Ghostty Config on Debian: Themes and Reload Checks'],
  ['grokbot-for-beginners', ['gNcHbc2kdzw'], 'GrokBot for Beginners: First Bot, Access and Approvals', 'Set up a narrowly scoped GrokBot workflow, understand the shared box and separate desktops, connect needed services and keep external actions reviewable.', 'GrokBot for Beginners: First Bot, Access and Approvals'],
  ['grokbot-for-seo', ['6jDcOXSOT00'], 'GrokBot for SEO: Audit Bots, Data and Reviewed Fixes', 'Set up a GrokBot SEO audit bot, separate provider data from estimates, and turn its audit into changes you review before they go live.', 'GrokBot for SEO: Audit Bots, Data and Reviewed Fixes'],
  ['grokbot-virtual-office', ['wzC2r426KWs'], 'GrokBot Virtual Office: Build a Custom Agent Dashboard', 'Build a custom GrokBot office page that shows your agents and approval handoffs at a glance, with the layout fixes and the status sync still to finish.', 'GrokBot Virtual Office: Build a Custom Agent Dashboard'],
  ['grokbot-vs-dots', ['vauqktcB6ak', 'uTcTJd5JaZU'], 'GrokBot vs Dots: Onboarding, Job Drafts and Permissions', 'Dots vs GrokBot for job hunting: onboarding, job drafts and permissions side by side, and why my test drafted applications but submitted none.', 'GrokBot vs Dots: Onboarding, Job Drafts and Permissions'],
  ['herdr-desktop-app', ['IV6q81wRay4'], 'Herdr Desktop Guide: Setup, Workspaces and Limits', 'Set up the Herdr desktop app: themes, session resume and side-by-side coding agents, plus its lifecycle limits and the memory use I saw.', 'Herdr Desktop Guide: Setup, Workspaces and Limits'],
  ['herdr-guide', ['VE66JDHoS6Y'], 'Herdr Terminal Guide: Workspaces and Coding-Agent Sessions', 'Organize coding agents in the Herdr terminal, use the documented installer and distinguish background sessions from desktop-app behavior.', 'Herdr Terminal Guide: Workspaces and Coding-Agent Sessions'],
  ['jev-skills-router-setup', ['wakl0ayO_fk'], 'Jev AI with Coding Agents: Skills, Access and Routed Tests', 'Install TypeSafe Jev skills in your coding agent, set up access and test a routed request, then check what actually came back.', 'Jev AI with Coding Agents: Skills, Access and Routed Tests'],
  ['muse-code-setup', ['mPHM81X1oqc'], 'Meta Muse Code Setup: API Failure and a Working CLI', 'Get Meta’s Muse Wonder running in a coding agent: why my OpenCode API route failed, how to install Muse Code, and which plan includes which model.', 'Meta Muse Code Setup: API Failure and a Working CLI'],
  ['opendesign-linux-slides', ['rMRsVyIsZCU'], 'OpenDesign (Open Design) on Linux: Source Setup and Slides', 'Run OpenDesign (Open Design) from source on Linux, fix the Corepack and dependency errors, and export an HTML slide deck.', 'OpenDesign (Open Design) on Linux: Source Setup and Slides'],
  ['rea-video-editor-prototype', ['UAPaM6KrC-M'], 'REA Coding-Agent Case: A Video-Editor Prototype', 'Build a browser video-editor prototype with REA: the setup command, what worked after hours of agent time, and the playback and effects bugs left.', 'REA Coding-Agent Case: A Video-Editor Prototype'],
  ['run-a-blog-with-grokbot', ['wLIiTkra7uM'], 'GrokBot WordPress Workflow: Long-Form Videos to Drafts', 'Turn long-form video sources into reviewable WordPress drafts, separating connector access, recurring writing, publication approval and subscriber emails.', 'GrokBot WordPress Workflow: Long-Form Videos to Drafts'],
  ['runable-audit-website', ['qQVAnp4-EpI'], 'Runable AI Audit-Service Website: Research to an MVP', 'Build an audit-service website with Runable AI, from business brief to revised MVP, then check payments and inquiry emails before you launch.', 'Runable AI Audit-Service Website: Research to an MVP'],
  ['trakkr-codex-visibility-workflow', ['0jzTOUv_B04'], 'Trakkr and Codex: AI Visibility, Crawlers and Visits', 'Track how AI assistants see your site with Trakkr and Codex, and tell AI visibility, crawler hits, citations and real visits apart.', 'Trakkr and Codex: AI Visibility, Crawlers and Visits'],
  ['treg-inside-grokbot', ['9A2StjrxOms'], 'Treg in GrokBot: Connect Data Tools and Control Costs', 'Connect Treg data tools inside GrokBot for SEO reports, see what each call costs, and approve paid data requests before they run.', 'Treg in GrokBot: Connect Data Tools and Control Costs'],
];
const EXCLUDED = ['claude-models-compared', 'openrouter-setup', 'claude-code-vs-codex'];

test('the 22 new AAS guides have exact metadata, canonicals, robots, schema and discovery', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  const collection = schemas(hub).find(item => item['@type'] === 'CollectionPage');
  assert.equal(NEW.length, 22);
  for (const [slug, ids, title, description, headline] of NEW) {
    assert.equal(headline, title, slug);
    const html = await read(`public/guides/${slug}.html`);
    const url = `${site}/guides/${slug}.html`;
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), title, slug);
    assert.equal(decode(html.match(/<meta name="description" content="([^"]*)">/)[1]), description, slug);
    assert.match(html, /<meta name="robots" content="index,follow">/, slug);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`), slug);
    assert.ok(html.includes(`<h1>${title}</h1>`), slug);
    const article = schemas(html).find(item => item['@type'] === 'Article');
    const crumbs = schemas(html).find(item => item['@type'] === 'BreadcrumbList');
    const faq = schemas(html).find(item => item['@type'] === 'FAQPage');
    assert.equal(article.headline, title, slug);
    assert.equal(article.url, url, slug);
    assert.equal(article.description, description, slug);
    assert.equal(faq.url, url, slug);
    assert.equal(crumbs.itemListElement[2].item, url, slug);
    assert.match(hub, new RegExp(`<a href="/guides/${slug}\\.html">`), slug);
    assert.ok(collection.mainEntity.itemListElement.some(item => item.url === url), slug);
    assert.ok(sitemap.includes(`<loc>${url}</loc><lastmod>${article.dateModified}</lastmod>`), slug);
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
