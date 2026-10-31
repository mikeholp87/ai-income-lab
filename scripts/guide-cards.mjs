// Renders guide cards to public/assets/guides/<slug>.webp, plus sizes/<slug>-640.webp for phones, with one shared template.
// The guides hub shows a headline-only version (hub/<slug>.webp, -400, -640 and -800): the full card's
// step text is unreadable at the hub's card width.
// Usage: node scripts/guide-cards.mjs [slug ...]   (no slugs renders every card below)
// Needs google-chrome on PATH; full cards use the system Noto Sans, hub cards the site's Archivo Black.
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

export const cards = {
  '9router-setup': {
    title: '9Router setup: providers, combos and fallbacks',
    steps: [['Providers', 'Connect the accounts you use'], ['Combos', 'Group models with fallback'], ['Check', 'Test requests and track cost']],
    note: 'One local endpoint for your coding tools.',
  },
  'claude-code-vs-codex': {
    title: 'Route each task to the agent that suits it',
    steps: [['Claude Code', 'Research, audits, writing'], ['Codex', 'Fixes, features, scripts'], ['Review', 'The other tool checks it']],
    note: 'When one hits a usage limit, the other takes the task.',
  },
  'codex-on-linux': {
    title: 'Codex on Linux: CLI first, then the desktop app',
    steps: [['CLI', 'Install and sign in with ChatGPT'], ['Desktop', 'Check the official Linux status'], ['Unofficial', 'Know what the old setup was']],
    note: 'Official and unofficial steps kept separate.',
  },
  'codex-usage-limits': {
    title: 'Codex usage limits: plans, resets and what to do',
    steps: [['Plan', 'Limits follow your ChatGPT plan'], ['Reset', 'Check remaining usage and reset time'], ['Out?', 'Wait, upgrade or switch billing']],
    note: 'Official OpenAI sources, dated.',
  },
  'codex-workflow': {
    title: 'Make a small change you can verify',
    steps: [['Step 1', 'Write a narrow brief'], ['Step 2', 'Inspect the diff'], ['Step 3', 'Run the check']],
    note: 'Practice task: add a malformed-JSON request and assert HTTP 400.',
  },
  'consent-tracking': {
    title: 'Track clicks after the visitor chooses',
    steps: [['Step 1', 'Ask for a choice'], ['Step 2', 'Store the preference'], ['Step 3', 'Gate optional events']],
    note: 'Check: declining consent keeps optional trackers off.',
  },
  'dataforseo-mcp-claude': {
    title: 'Give Claude Code real SEO data',
    steps: [['Step 1', 'Connect the MCP'], ['Step 2', 'Confirm its tools'], ['Step 3', 'One small query']],
    note: 'Pay per request: check the cost before scaling up.',
  },
  'first-api-request': {
    title: 'Check an API request before adding an agent',
    steps: [['Step 1', 'Send a request'], ['Step 2', 'Inspect the status'], ['Step 3', 'Assert the result']],
    note: 'Local checks: wrong key 401 / unknown model 404 / valid request 200',
  },
  'hermes-desktop': {
    title: 'Install Hermes Agent with a desktop app',
    steps: [['Step 1', 'Install Hermes One'], ['Step 2', 'Connect a provider'], ['Step 3', 'Check with /tools']],
    note: 'Add schedules and gateways after one task works.',
  },
  'make-first-automation': {
    title: 'Filter approved requests in Make and Sheets',
    steps: [['Step 1', 'Watch intake rows'], ['Step 2', 'Filter: Approved = yes'], ['Step 3', 'Add the output row']],
    note: 'Check: one approved sample arrives; the rejected sample stays out.',
  },
  'opencode-vs-claude-code': {
    title: 'OpenCode vs Claude Code: pick by models and pricing',
    steps: [['OpenCode', 'Open source, bring your own provider'], ['Claude Code', 'Anthropic models, Claude plan or API'], ['Pick', 'Match the tool to your models']],
    note: 'Check limits and prices on the official pages first.',
  },
  'opencode-go': {
    title: 'OpenCode Go: plans, model limits and setup',
    steps: [['Plan', 'Go, Go Plus or Go Teams'], ['Connect', '/connect, then /models'], ['Limits', '5-hour, weekly and monthly']],
    note: 'Zen is pay as you go. Go is a monthly plan.',
  },
  'openrouter-setup': {
    title: 'OpenRouter: API key, free models and costs',
    steps: [['Key', 'Create one key per tool'], ['Free', ':free models and daily caps'], ['Check', 'Read /api/v1/key and errors']],
    note: 'Credits carry a fee; model prices pass through.',
  },
  'kilo-code-tutorial': {
    title: 'Kilo Code tutorial: install and first task',
    steps: [['Install', 'VS Code extension or CLI'], ['Model', 'Auto Free, your key or credits'], ['Review', 'Set approvals, check the diff']],
    note: 'Free to install; model usage is billed separately.',
  },
  'openseo-review': {
    title: 'OpenSEO review: setup, data costs and limits',
    steps: [['Setup', 'Hosted connection or your own instance'], ['Data', 'DataForSEO costs are a separate bill'], ['Limits', 'Check the gaps vs a paid SEO suite']],
    note: 'Grounded in a live demo, not a feature list.',
  },
  'self-host-n8n': {
    title: 'Run n8n on your own machine',
    steps: [['Step 1', 'Install Node.js 24'], ['Step 2', 'Start on localhost'], ['Step 3', 'Run a test workflow']],
    note: 'No accounts needed until the test workflow passes.',
  },
  'youtube-feed': {
    title: 'A YouTube feed that survives a failed request',
    steps: [['Step 1', 'Fetch on the server'], ['Step 2', 'Keep saved uploads'], ['Step 3', 'Render useful HTML']],
    note: 'Check: a failed fetch still leaves watch links and thumbnails.',
  },
  'agentic-ai-vs-traditional-automation': {
    title: 'Agentic AI vs traditional automation',
    steps: [['Traditional', 'Follows a fixed, drawn path'], ['Agentic', 'Chooses its next step toward a goal'], ['Hybrid', 'One agent step inside fixed edges']],
    note: 'Validate the agent’s output before anything is sent.',
  },
  'n8n-alternatives-open-source': {
    title: 'Open-source n8n alternatives: 5 tools',
    steps: [['Tools', 'Node-RED, Windmill, Kestra +2'], ['License', 'Read the source each project publishes'], ['Test', 'Choose one in an afternoon']],
    note: 'Check the license file in the release you deploy.',
  },
  'n8n-vs-zapier-vs-make': {
    title: 'n8n vs Zapier vs Make: billing and builders',
    steps: [['Zapier', 'Tasks, linear steps, cloud only'], ['Make', 'Credits, visual canvas, cloud only'], ['n8n', 'Executions, nodes, cloud or self-host']],
    note: 'Each tool counts usage differently: run a one-hour test.',
  },
  'no-code-ai-agent-builder': {
    title: 'No-code AI agent builders: n8n, Make, Zapier',
    steps: [['Brief', 'Instructions and a model'], ['Reach', 'Tools and knowledge'], ['Check', 'A test loop before it goes live']],
    note: 'Every agent builder needs the same five parts.',
  },
  'what-is-n8n-used-for': {
    title: 'What is n8n used for? A first workflow',
    steps: [['Trigger', 'A form, webhook, row or schedule'], ['Nodes', 'Each node does one job'], ['Execution', 'Inspect every run step by step']],
    note: 'App syncs, webhooks, reports and AI agent steps.',
  },
  'ai-automation': {
    title: 'AI automation: what it is and a first build',
    steps: [['Trigger', 'A form, email or new row starts it'], ['AI step', 'A model sorts, drafts or extracts'], ['Check', 'A rule or person approves the result']],
    note: 'Zapier, Make, n8n or a coding agent: pick by the job.',
  },
  'chatgpt-pro-20x': {
    title: 'ChatGPT Pro 20x: paused, then back with less',
    steps: [['Sept 2026', 'OpenAI paused the $200 plan'], ['Now', 'Back with a lower allowance'], ['Codex', 'Medium effort makes credits last']],
    note: 'Plus, 5x and 20x limits compared side by side.',
  },
  'claude-code-for-beginners': {
    title: 'Claude Code for beginners: install it, make one change',
    steps: [['Install', 'Install and check the command'], ['Set up', 'Sign in and add a short CLAUDE.md'], ['Change', 'Make one small change and inspect it']],
    note: 'Mac, Windows or Linux, in about ten minutes.',
  },
  'heygen-ai-avatar-tutorial': {
    title: 'HeyGen: make your first AI avatar video',
    steps: [['Avatar', 'Pick stock or custom, record consent'], ['Script', 'Write for speech, choose a voice'], ['Review', 'Generate a draft, watch it through']],
    note: 'Check plan limits first; automate after one good clip.',
  },
  'vapi-voice-agent-tutorial': {
    title: 'Vapi: build a voice agent and test real calls',
    steps: [['Assistant', 'Pick a model, voice and transcriber'], ['Calls', 'Test in the dashboard, then by phone'], ['Webhooks', 'Set the server URL, inspect events']],
    note: 'Check the documented costs before going live.',
  },
  'make-money-with-ai-fast': {
    title: 'Make money with AI fast: the honest path',
    steps: [['Step 1', 'Pick a task you can check yourself'], ['Step 2', 'Ask one person who has that task'], ['Step 3', 'Deliver one small result']],
    note: 'No lazy shortcut: speed lives in the draft, not the payment.',
  },
  'make-money-with-ai-no-experience': {
    title: 'Make money with AI with no experience',
    steps: [['Step 1', 'Start from a skill you already use'], ['Step 2', 'Build it small on free tiers'], ['Step 3', 'Offer it to one person you know']],
    note: 'One useful task first, without AI if it works without.',
  },
  'make-money-with-chatgpt': {
    title: 'Make money with ChatGPT through client work',
    steps: [['Define', 'Agree the deliverable before the chat'], ['Draft', 'Edit, research or write FAQs'], ['Check', 'Verify against the original inputs']],
    note: 'Sell work you can judge, not raw ChatGPT output.',
  },
  'ai-side-hustles': {
    title: 'AI side hustles: seven services, one rubric',
    steps: [['Skill', 'Can you spot a wrong result?'], ['Cost', 'Can you demo with tools you have?'], ['First client', 'What must happen before a yes?']],
    note: 'Each idea comes with a first test you can run this week.',
  },
  'ai-automation-services-small-business': {
    title: 'Sell AI automation services to small businesses',
    steps: [['Discover', 'Ask the owner and the operator'], ['Scope', 'One fixed deliverable you can test'], ['Accept', 'Agree example outcomes first']],
    note: 'Build the record flow before adding the AI step.',
  },
};

const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function cardHtml({ title, steps, note }) {
  return `<!doctype html><meta charset="utf-8">
<style>
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#0a0a0a;color:#f5f5f0;font-family:'Noto Sans',system-ui,sans-serif;padding:72px 80px}
.eyebrow{display:flex;align-items:center;gap:14px;color:#b3b3ab;font-size:22px;letter-spacing:.06em;text-transform:uppercase}.eyebrow::before{content:'';width:44px;height:5px;background:#ff6846}
h1{margin-top:28px;font-size:60px;line-height:1.1;font-weight:700;max-width:820px}
.row{display:flex;gap:24px;margin-top:48px}.box{flex:1;padding:22px 24px;border:2px solid #333;border-radius:8px;background:#111}
.box b{display:block;color:#ff6846;font-size:20px;letter-spacing:.06em;text-transform:uppercase}.box span{display:block;margin-top:10px;font-size:26px}
.note{margin-top:34px;color:#b3b3ab;font-size:24px}.by{position:absolute;bottom:52px;left:80px;color:#8c8c86;font-size:20px}
</style>
<p class="eyebrow">AI Automation Station · Free build guide</p>
<h1>${escape(title)}</h1>
<div class="row">${steps.map(([label, text]) => `<p class="box"><b>${escape(label)}</b><span>${escape(text)}</span></p>`).join('')}</div>
<p class="note">${escape(note)}</p>
<p class="by">Mike Holp · ai-automation-station.com</p>`;
}

// Laid out at 600×315 and captured at 2x; the headline shrinks until it fits in four lines.
export function hubCardHtml({ title }) {
  const font = new URL('../public/fonts/archivo-black.woff2', import.meta.url).href;
  return `<!doctype html><meta charset="utf-8">
<style>
@font-face{font-family:'Archivo Black';src:url('${font}') format('woff2')}
*{box-sizing:border-box;margin:0}body{width:600px;height:315px;display:flex;flex-direction:column;justify-content:flex-end;padding:36px 40px 40px;background:radial-gradient(420px 220px at 100% 0,rgb(255 104 70/.16),transparent 70%),#111;color:#f5f5f0}
body::before{content:'';position:absolute;top:36px;left:40px;width:36px;height:5px;background:#ff6846}
h1{font:400 40px/1.08 'Archivo Black',sans-serif;letter-spacing:-.01em;text-wrap:balance}
</style>
<h1>${escape(title)}</h1>
<script>const h = document.querySelector('h1'); let size = 40; while (h.offsetHeight > 4 * size * 1.08 + 1 && size > 26) h.style.fontSize = \`\${--size}px\`;</script>`;
}

async function screenshot(html, [width, height], scale) {
  const dir = await mkdtemp(join(tmpdir(), 'guide-card-'));
  await writeFile(join(dir, 'card.html'), html);
  execFileSync('google-chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', `--force-device-scale-factor=${scale}`, `--window-size=${width},${height}`, `--screenshot=${join(dir, 'card.png')}`, `file://${join(dir, 'card.html')}`], { stdio: 'ignore' });
  return dir;
}

export async function renderHubCard(slug, card, outDir = 'public/assets/guides/hub') {
  const dir = await screenshot(hubCardHtml(card), [600, 315], 2);
  try {
    await mkdir(outDir, { recursive: true });
    await sharp(join(dir, 'card.png')).resize(400, 210).webp({ quality: 82 }).toFile(join(outDir, `${slug}-400.webp`));
    await sharp(join(dir, 'card.png')).resize(640, 336).webp({ quality: 82 }).toFile(join(outDir, `${slug}-640.webp`));
    await sharp(join(dir, 'card.png')).resize(800, 420).webp({ quality: 82 }).toFile(join(outDir, `${slug}-800.webp`));
    return await sharp(join(dir, 'card.png')).resize(1200, 630).webp({ quality: 82 }).toFile(join(outDir, `${slug}.webp`));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export async function renderCard(slug, card, outDir = 'public/assets/guides') {
  const dir = await mkdtemp(join(tmpdir(), 'guide-card-'));
  try {
    await writeFile(join(dir, 'card.html'), cardHtml(card));
    execFileSync('google-chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${join(dir, 'card.png')}`, `file://${join(dir, 'card.html')}`], { stdio: 'ignore' });
    await mkdir(join(outDir, 'sizes'), { recursive: true });
    await sharp(join(dir, 'card.png')).resize(640, 336).webp({ quality: 82 }).toFile(join(outDir, 'sizes', `${slug}-640.webp`));
    return await sharp(join(dir, 'card.png')).resize(1200, 630).webp({ quality: 82 }).toFile(join(outDir, `${slug}.webp`));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(cards);
  for (const slug of slugs) {
    if (!cards[slug]) throw new Error(`No card data for ${slug}`);
    const { width, height, size } = await renderCard(slug, cards[slug]);
    const hub = await renderHubCard(slug, cards[slug]);
    console.log(slug, width, height, size, hub.size);
  }
}
