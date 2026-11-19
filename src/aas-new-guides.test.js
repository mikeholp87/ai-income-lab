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
  ['trakkr-codex-visibility-workflow', ['0jzTOUv_B04'], 'Trakkr and Codex: AI Visibility, Crawlers and Visits', 'Track how AI assistants see your site with Trakkr and Codex, and tell AI visibility, crawler hits, citations and real visits apart.', 'Trakkr and Codex: AI Visibility, Crawlers and Visits'],
  ['treg-inside-grokbot', ['9A2StjrxOms'], 'Treg in GrokBot: Connect Data Tools and Control Costs', 'Connect Treg data tools inside GrokBot for SEO reports, see what each call costs, and approve paid data requests before they run.', 'Treg in GrokBot: Connect Data Tools and Control Costs'],
];
const EXCLUDED = ['claude-models-compared', 'openrouter-setup', 'claude-code-vs-codex'];

const BATCH01 = [
  ['rank-prompt-ai-search-visibility', ['ndG48skyZZY'], 'Rank Prompt AI Visibility: Scan, MCP and Fixes', 'Run a Rank Prompt visibility scan, track prompts across AI answers, connect the MCP in Claude Code, and review the recorded content and outreach steps.'],
  ['semrush-mcp-ai-visibility', ['Fw-RqLjArc8'], 'Semrush MCP: AI Visibility and Keyword Gaps', 'Connect Semrush to a coding agent over MCP, read AI visibility and citation data, then turn keyword and backlink gaps into a plan you review.'],
  ['opencode-seo-audit-skills', ['1LN7TqmW--w'], 'OpenCode SEO Audit Skills: Site Checks and Files', 'Run OpenCode SEO audit skills on a live site, generate llms.txt and sitemap files, and note plan limits shown in my walkthrough.'],
  ['ai-token-usage-dashboard', ['L_dAm5Xh-fQ'], 'Token Usage Dashboard: ccusage, RTK and Costs', 'Build a local token-usage dashboard with ccusage, compare daily costs, and check RTK and Caveman savings this walkthrough showed.'],
  ['hermes-agent-supermemory', ['wL6bjqaUcd8'], 'Install Supermemory on Hermes Agent', 'Install Supermemory on Hermes Agent, add the API key, test a memory write, then connect the same plugin in OpenCode and Codex.'],
  ['hermes-backlink-outreach-pipeline', ['bBGqWXXIw44'], 'Hermes backlink outreach pipeline', 'Build a Hermes outreach pipeline with Firecrawl, Hunter.io and Mailgun, keep sends gated, and read the delivery numbers from this walkthrough.'],
  ['chatgpt-thumbnail-ctr-pipeline', ['JJe2G17_eRU'], 'ChatGPT Thumbnails: Audit CTR and Redesign', 'Audit channel thumbnail CTR, note brightness and contrast targets from this walkthrough, then run the master prompt in ChatGPT Images.'],
  ['visiscan-ai-visibility-audit', ['e73WvglCLW0'], 'VisiScan AI Visibility: Free Scan and Report', 'Run a VisiScan domain scan, read readiness and visibility scores, and review sitemap, robots.txt and llms.txt checks. Mike owns VisiScan.'],
  ['rtk-token-savings-claude-code', ['jB9hYQJGAuM'], 'RTK Token Savings: Install, Hooks and Checks', 'Install RTK with curl or Homebrew, add hooks in Claude Code and Codex, then run rtk gain to read the savings this walkthrough showed.'],
  ['claude-code-second-brain', ['pwLLS6zFpKs'], 'Claude Code Second Brain: Cortex Project Tour', 'Walk through Cortex, a Claude Code second-brain project: markdown files, Radar, theme graph, VidIQ MCP and the limits shown on camera.'],
  ['claude-code-video-editor-skill', ['3cP3DeBG5Q0'], 'Claude Code Video Editor Skill: Build and Run', 'Follow the recorded video-editor skill for Claude Code: the prompt loop, guardrails, confidence checks and the command used to run it.'],
  ['9router-cost-tracking-fallbacks', ['tzSGF7gu6EE'], '9Router Cost Tracking: Combos and Fallbacks', 'Track 9Router token cost, set model combos and auto-fallback across paid, cheap and free models, and read weekly quota from this walkthrough.'],
  ['ai-visibility-tracker-saas-build', ['2G5klyFz61E'], 'AI Visibility Tracker: SaaS Build Log', 'Follow a recorded SaaS build of an AI visibility tracker: landing page, DataForSEO MCP data, GEO files and a Stripe pricing page draft.'],
  ['zcode-glm-desktop-app', ['mmiQaVfA5e0'], 'ZCode GLM Desktop: Install, Plans and Review', 'Install Z.ai\'s ZCode desktop app for GLM 5.2 on Linux, review the plans shown on camera, and run a local site review from the terminal.'],
  ['claude-fable-5-game-prompts', ['X9Bo29B_46k'], 'Claude Fable 5 Games: Prompts and Plugins', 'Use Claude Fable 5 to build a small game: effort modes, Compound Engineering, plan mode and the prompt briefs shown in my walkthrough.'],
];

const BATCH02 = [
  ['updateforge-package-manager-windows-linux', ['2ToaOs7HMD0'], 'UpdateForge: Windows and Linux Package Manager GUI', 'Install UpdateForge, Mike\'s own open-source package manager GUI for Windows and Linux, then update apps across apt, npm and Cargo.'],
  ['claude-fable-5-use-cases', ['avgG3VtN2C4'], 'Claude Code Fable 5: Security and Checkout', 'How to use Fable 5 in Claude Code: switch the model, run a security audit and a checkout review on TubeAnalytics.'],
  ['odysseus-brand-deal-agents', ['YNpIRq7O3UE'], 'Odysseus AI Brand-Deal Agent: Research and Outreach', 'Build an Odysseus AI sponsorship agent that researches brands, drafts pitches and schedules Monday outreach. The $81,000 figure was an estimate.'],
  ['hermes-agent-ai-operating-system', ['kUbhr1QGYeU'], 'Hermes Agent Dashboard: Local AI Operating System', 'Build a Hermes Agent dashboard: prompt a local React operations UI, then try YouTube API credentials on mock data.'],
  ['ai-coding-agent-skills-top-10', ['kxp_dF6NEbg'], 'npx skills: Install Ten Coding Agent Skills', 'Run npx skills update and npx skills add, then use ten coding agent skills for design, React, SEO, page speed and GEO audits.'],
  ['opencode-linkedin-post-generator', ['vvDdXF2Yuz8'], 'OpenCode: Turn a YouTube Video into LinkedIn Posts', 'Build an OpenCode script that transcribes a video and writes five LinkedIn post variants. Posting stays manual in this walkthrough.'],
  ['browseract-web-scraping', ['quDDekuPQNI'], 'BrowserAct: Scrape Jobs and Build a Board', 'BrowserAct web scraping in Codex: install Skill Forge, scrape We Work Remotely jobs, and build a searchable React board. BrowserAct sponsored it.'],
  ['codex-website-redesign', ['MABL6XZgy4g'], 'Rebuild a Site in Codex with Vite and React', 'Ask Claude Desktop for a replication prompt, rebuild a Lovable site in Codex with Vite and React, then deploy to Vercel and read PageSpeed scores.'],
  ['opusclip-alternative-viral-clips', ['w_MoA8lpWTg'], 'Opus Clip Alternative: Detect, Score and Export Clips', 'An Opus Clip alternative demo of Short Forge: import a YouTube URL or file, transcribe with Whisper, score clips and export shorts locally.'],
  ['hermes-agent-scheduled-jobs', ['DB-9bW85TKY'], 'Hermes Agent CLI Cron Jobs: Install and Schedule', 'Install Hermes Agent from the CLI, run hermes setup, then create cron jobs and manage them with hermes cron list.'],
];

const BATCH03 = [
  ['free-claude-code-setup', ['Qb6RG0-8O1k'], 'Free Claude Code GitHub Setup: NIM and OpenRouter Proxy', 'Set up Free Claude Code from GitHub: add NVIDIA NIM and OpenRouter keys, start the Claude Code proxy on port 8082, then test it. The app was unfinished.'],
  ['kilo-code-ai-visibility-optimizer', ['LoNsDme0XQI'], 'Kilo Code Skills: Build an AI Visibility Optimizer', 'Build a custom Kilo Code skill from an AI visibility playbook, then score a TubeAnalytics post. I own TubeAnalytics. Scores are from 2 May 2026.'],
  ['claude-design-getting-started', ['yHaBYtUnzBg'], 'How to Use Claude Design: First Pitch Deck Tutorial', 'How to use Claude Design: open claude.ai/design, upload a screenshot, answer its questions and export a 10-slide deck. I used TubeAnalytics, which I own.'],
  ['claude-design-website-redesign', ['n3NO40juUBo'], 'Claude Design Website Redesign: design.md to Claude Code', 'Redesign a website in Claude Design: import design.md, build a design system from GitHub, then hand off to Claude Code and Codex. I own TubeAnalytics.'],
  ['geo-aeo-tracker-github', ['3X2VU7EyaEU'], 'Free AEO Tracker: GEO/AEO Tracker GitHub with Bright Data', 'Set up the free open-source GEO/AEO tracker from GitHub: add Bright Data, run an AEO audit, then schedule 12-hour checks. Figures from 27 April 2026.'],
  ['claude-code-video-editing-skill-github', ['ztEj6zCJh5k'], 'Claude Code Video Editing: Install the video-use Skill', 'Claude Code video editing with the video-use GitHub skill: install it, then prompt a 9:16 short with FFmpeg and Faster Whisper. Tested 25 April 2026.'],
  ['chatgpt-images-2-getting-started', ['FBlN3qWR9kg'], 'ChatGPT Images 2.0: How to Use It, First Tests and Edits', 'How to use ChatGPT Images 2.0: open image mode, run gallery-style prompts, then try selection edits, a caricature, a blueprint and an ISBN mockup.'],
  ['claude-code-routines', ['AO8NoHPU3e0'], 'Claude Code Routines: Scheduled Tasks, PRs and Email', 'Set up Claude Code routines for email triage, GitHub PR reviews, a 9:00 a.m. calendar list and a scheduled TubeAnalytics speed audit. I own TubeAnalytics.'],
  ['otterly-ai-visibility-tracking', ['pDrMGahPnwc'], 'Otterly AI Walkthrough: Brand Mentions, Citations, Pricing', 'Otterly AI walkthrough: brand coverage, citations, crawl checks and the pricing I quoted, on TubeAnalytics, which I own. The signup link is a referral.'],
  ['cline-ai-coding-agent', ['c_WK6TImkNQ'], 'Cline AI: Install the CLI and Free Coding Agent', 'Install Cline AI with npm i -g cline, add the IDE extension, pick a free model, then run a GEO pass on an existing repo. No to-do app was built.'],
];

test('the 21 new AAS guides have exact metadata, canonicals, robots, schema and discovery', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  const collection = schemas(hub).find(item => item['@type'] === 'CollectionPage');
  assert.equal(NEW.length, 21);
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

test('batch 03 AAS guides have exact metadata, canonicals, robots, schema and discovery', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  const collection = schemas(hub).find(item => item['@type'] === 'CollectionPage');
  assert.equal(BATCH03.length, 10);
  for (const [slug, ids, title, description] of BATCH03) {
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
    const embeds = [...html.matchAll(/data-embed="https:\/\/www.youtube-nocookie\.com\/embed\/([\w-]{11})"/g)].map(match => match[1]);
    assert.deepEqual(embeds, ids, slug);
    assert.doesNotMatch(html, /<iframe/, slug);
  }
});

test('batch 02 AAS guides have exact metadata, canonicals, robots, schema and discovery', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  const collection = schemas(hub).find(item => item['@type'] === 'CollectionPage');
  assert.equal(BATCH02.length, 10);
  for (const [slug, ids, title, description] of BATCH02) {
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
    const embeds = [...html.matchAll(/data-embed="https:\/\/www.youtube-nocookie\.com\/embed\/([\w-]{11})"/g)].map(match => match[1]);
    assert.deepEqual(embeds, ids, slug);
    assert.doesNotMatch(html, /<iframe/, slug);
  }
});

test('batch 01 AAS guides have exact metadata, canonicals, robots, schema and discovery', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  const collection = schemas(hub).find(item => item['@type'] === 'CollectionPage');
  assert.equal(BATCH01.length, 15);
  for (const [slug, ids, title, description] of BATCH01) {
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
    assert.doesNotMatch(html, /<iframe/, slug);
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
  const openrouter = await read('public/guides/openrouter-setup.html');
  assert.doesNotMatch(openrouter, /<figure class="video">/);
  assert.doesNotMatch(openrouter, /data-embed="https:\/\/www\.youtube-nocookie\.com\/embed\/Qb6RG0-8O1k"/);
  const hub = await read('public/guides.html');
  assert.doesNotMatch(hub, /qQVAnp4-EpI/);
  const openrouterCard = hub.match(/<li class="guide"><img[^>]*>\s*<div><h3><a href="\/guides\/openrouter-setup\.html">[\s\S]*?<\/li>/)?.[0] ?? '';
  assert.doesNotMatch(openrouterCard, /Qb6RG0-8O1k/);
});

test('batch 03 watch titles route to the new dedicated guides', () => {
  const route = title => guides.find(([pattern]) => pattern.test(title))?.[1];
  assert.equal(route('How To Build Apps Using Free Claude Code!'), '/guides/free-claude-code-setup.html');
  assert.equal(route('I Built an AI Visibility Optimizer – Here’s How It Works'), '/guides/kilo-code-ai-visibility-optimizer.html');
  assert.equal(route("I Tested CLAUDE DESIGN And It's Incredible!"), '/guides/claude-design-getting-started.html');
  assert.equal(route('I Redesigned My Website In Claude Design!'), '/guides/claude-design-website-redesign.html');
  assert.equal(route('Optimize Your AI Visibility Using This Free Tracker!'), '/guides/geo-aeo-tracker-github.html');
  assert.equal(route('I Built an AI Video Editor with Claude Code'), '/guides/claude-code-video-editing-skill-github.html');
  assert.equal(route('CHATGPT IMAGES 2.0 Is Insanely Useful!'), '/guides/chatgpt-images-2-getting-started.html');
  assert.equal(route("Claude Routines Just Dropped and It's a Game Changer!"), '/guides/claude-code-routines.html');
  assert.equal(route("Your Competitors Are Winning AI Search (Here's How To Beat Them!)"), '/guides/otterly-ai-visibility-tracking.html');
  assert.equal(route('How to Build Web Apps for Free Using This AI Agent'), '/guides/cline-ai-coding-agent.html');
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
