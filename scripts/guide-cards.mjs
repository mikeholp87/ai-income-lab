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
  'n8n-hostinger-uploader-sora-2-and-version-2': {
    title: "n8n on a Hostinger VPS: four things I built",
    steps: [["Upload","Drive folder to YouTube, AI title and tags"],["Update","docker compose pull, then up -d"],["Generate","Sora 2 node needs n8n 1.118.1 or later"]],
    note: "October to December 2025; the transcript step failed in the demo.",
  },
  'three-ai-site-builds-antigravity-n8n-hotel': {
    title: "Three sites built by prompting AI tools",
    steps: [["Landing page","Antigravity and OpenCode, 16 sections"],["Dashboard","Web app calls an n8n webhook"],["Hotel site","Apify scrape to a filterable site"]],
    note: "February and March 2026; each had unfinished parts.",
  },
  'tubeanalytics-build-log-claude-code-opencode': {
    title: "Building a YouTube analytics SaaS with AI tools",
    steps: [["Demo","February 2026, unfinished tabs"],["Tour","March: plans, dashboard, tools"],["Debug","June: pricing 500 error, redirects"]],
    note: "My own product; plans and availability may have changed.",
  },
  'ai-visibility-trakkr-dataforseo-geo-skills': {
    title: "Tracking and improving AI search visibility",
    steps: [["Track","Trakkr: citations, crawler visits, prompts"],["Write","GEO skill and MCP gaps in Codex"],["Audit","DataForSEO MCP in Claude Code"]],
    note: "April and May 2026; results are self-reported, causes unproven.",
  },
  'nano-banana-pro-infographics-thumbnails-notebooklm': {
    title: "Infographics and thumbnails with Nano Banana Pro",
    steps: [["Summarize","Gemini summarizes the video transcript"],["Draw","Nano Banana Pro in AI Studio or KIE"],["Compare","NotebookLM is quicker, less detailed"]],
    note: "December 2025 to January 2026; thumbnail click rates not measured.",
  },
  'opencode-free-models-go-plan-and-skills': {
    title: "OpenCode: models, plans and agent skills",
    steps: [["Install","curl or npm, free Zen models"],["Upgrade","Go plan, models by API key"],["Skills","npx skills add: design, SEO, speed, GEO"]],
    note: "May and June 2026; model lists and prices change.",
  },
  'opencode-webcam-layout-skill-and-clip-app': {
    title: "Vertical clips with an OpenCode skill",
    steps: [["Skill","Detect the webcam, stack screen over it"],["Render","About 20 seconds per clip"],["App","ShortForge finds and scores clips"]],
    note: "May 2026; subtitles and the layout were not yet in the app.",
  },
  'hermes-agent-install-electron-build-openclaw': {
    title: "Hermes Agent: install, build and the risks",
    steps: [["Install","One-line installer, full setup, free model"],["Build","Electron wrapper; Codex fixed the chart bug"],["Caution","Agent networks expose keys"]],
    note: "Three videos, February to May 2026; sandbox data only.",
  },
  'ai-model-news-kimi-glm-fable-gemini': {
    title: "Four model releases and how I tried them",
    steps: [["Read","Release posts and benchmark pages"],["Try","OpenCode Go or AI Studio, where I could"],["Check","Cost, speed and limits on your own task"]],
    note: "Release-day notes, November 2025 to July 2026; claims are the vendors’.",
  },
  'sendpulse-facebook-comment-chatbot': {
    title: "A comment-to-DM chatbot on a Facebook page",
    steps: [["Trigger","Any comment on any post, varied public replies"],["DM","One message with buttons, ignore repeats"],["AI","Agent step on a paid plan"]],
    note: "Three videos, October 2025 to January 2026; plans change.",
  },
  'n8n-job-search-resume-cover-letter-workflows': {
    title: "Find and score jobs with n8n",
    steps: [["Scrape","Apify Indeed actor on a schedule"],["Score","OpenAI rates fit out of 10"],["Draft","Cover letter or resume, log in Airtable or Sheets"]],
    note: "November 2025; applying to jobs stays manual.",
  },
  'youtube-to-linkedin-automations-n8n-opencode': {
    title: "Repurpose a YouTube video for LinkedIn",
    steps: [["Transcript","Apify pulls it, n8n joins the text"],["Create","Summary, infographic, post, newsletter"],["Post","You review and publish by hand"]],
    note: "Four builds, November 2025 to May 2026; posting stays manual.",
  },
  'suno-n8n-music-video-workflow': {
    title: "AI music videos with n8n",
    steps: [["Prompt","Form genre, OpenAI writes the Suno prompt"],["Make","KIE: Suno tracks and a 2K image, with polling"],["Assemble","Creatomate render, then Google Drive"]],
    note: "January 2026; the Creatomate step still errored.",
  },
  'kimi-k2-7-code-opencode-test': {
    title: "Kimi K2.7 Code, tested on one real site",
    steps: [["Select","Choose the model with /models in OpenCode"],["Audit","Codebase-only SEO audit, then fixes"],["Cost","About 3 USD, Go monthly limit reached"]],
    note: "June 2026, a few hours after the release; one test, not a benchmark.",
  },
  'odysseus-electron-desktop-app': {
    title: "An Electron desktop app for Odysseus",
    steps: [["Ask","Odysseus builds the Electron wrapper"],["Fix","Stalled npm install, finish with Codex"],["Run","Own window, about 2.3 GB memory"]],
    note: "June 2026; the build used 31 cents of credits.",
  },
  'make-news-to-video-autoposter': {
    title: "RSS article to posted video in Make.com",
    steps: [["Summarize","RSS item, Perplexity Sonar summary"],["Script","ChatGPT writes scenes, JSON2Video renders"],["Post","Router to Facebook, Instagram, YouTube"]],
    note: "October 2025; the demo stopped when JSON2Video ran out of credits.",
  },
  'agent-skills-seo-kilo-code': {
    title: "SEO agent skills in Kilo Code",
    steps: [["Install","npx skills add, pick skills with space"],["Run","Images, Core Web Vitals, IndexNow"],["Retest","PageSpeed barely moved; desktop 97"]],
    note: "April 2026; Core Web Vitals still failed after the fixes.",
  },
  'hermes-cron-jobs-vercel-reports': {
    title: "Hermes cron jobs, then Vercel cron for reliability",
    steps: [["Create","Hermes builds the jobs and scripts"],["Report","Resend emails the results"],["Move","Codex adds cron routes to vercel.json"]],
    note: "June 2026; local jobs need the computer awake.",
  },
  'make-apify-apollo-leads-sheet': {
    title: "Apollo leads into Google Sheets with Make.com",
    steps: [["Search","Copy the Apollo people-search URL"],["Run","Apify actor with a 100-lead limit"],["Write","Map fields, iterate into sheet rows"]],
    note: "June 2025; the phone column came back wrong.",
  },
  'hermes-youtube-to-linkedin-cron': {
    title: "YouTube to LinkedIn, run daily by Hermes",
    steps: [["Script","Find the newest video, write two posts"],["Fix","Move to OpenCode and the OpenAI API"],["Schedule","Daily cron job, dated output files"]],
    note: "May 2026; posting is still done by hand.",
  },
  'dextrolab-white-label-automations': {
    title: "A client portal for your automations",
    steps: [["Connect","Make.com or n8n with an API key"],["Price","Per run, monthly base, setup fee"],["Deliver","Workflow waits for client approval"]],
    note: "August 2025; prices are examples and may have changed.",
  },
  'whatsapp-ai-voice-clone-make': {
    title: "A WhatsApp assistant that replies in your cloned voice",
    steps: [["Route","Router splits texts and voice memos"],["Answer","OpenAI assistant with a transcript knowledge base"],["Speak","ElevenLabs voice sent back as audio"]],
    note: "June 2025; tested with a hardcoded test number.",
  },
  'vapi-outbound-ai-caller-make-twilio': {
    title: "An outbound AI caller with Vapi and Make.com",
    steps: [["Assistant","Vapi scheduler template, voice, tools"],["Number","Twilio number imported into Vapi"],["Calls","Make.com reads sheet rows and dials"]],
    note: "July 2025; Vapi’s own outbound campaign feature did not work for me.",
  },
  'opusclip-clone-app-opencode': {
    title: "A local OpusClip-style app built with OpenCode",
    steps: [["Prompt","Detailed prompt written in Claude Desktop"],["Scaffold","OpenCode builds workers, API and UI"],["Fix","Keys, Postgres, local storage instead of S3"]],
    note: "May 2026; the app was unfinished, with no clips shown.",
  },
  'claude-seo-skill-site-audit': {
    title: "The Claude SEO skill on a real site",
    steps: [["Install","One curl command from GitHub"],["Audit","SEO audit, plan, image audit"],["Fix","Approve edits; GEO check for AI crawlers"]],
    note: "February 2026; usage limits stopped the run twice.",
  },
  'opencode-video-trim-skill': {
    title: "A custom OpenCode skill for video trimming",
    steps: [["Prompt","Describe the cut: hook first, no filler"],["Process","Faster Whisper, hook finder, trim"],["Short","9x16 stack and animated subtitles"]],
    note: "May 2026 walkthrough; subtitles still needed polish.",
  },
  'make-messenger-chatgpt-bot': {
    title: "A ChatGPT Messenger bot in Make.com",
    steps: [["Scenario","Watch messages, ChatGPT, send reply"],["Meta app","Webhook, verify token, page token"],["Go live","Permissions and business verification"]],
    note: "July 2025; the bot was not shown live because verification was pending.",
  },
  'pi-dev-terminal-coding-agent': {
    title: "Pi: a minimal terminal coding agent",
    steps: [["Install","One npm command, then run pi"],["Connect","Log in with an OpenRouter key"],["Watch","Session cost, slow models, rate limits"]],
    note: "April 2026; I preferred OpenCode in this test.",
  },
  'odysseus-ai-self-hosted-workspace': {
    title: "Odysseus: a self-hosted AI chat workspace",
    steps: [["Install","Clone, venv, requirements, localhost"],["Connect","OpenRouter, OpenCode, OpenAI keys"],["Try","Agent mode, compare, email digest task"]],
    note: "June 2026 test; read the repo before you run it.",
  },
  'emergent-saas-agency-website': {
    title: "An agency website built in Emergent",
    steps: [["Prompt","ChatGPT writes the full build prompt"],["Budget","Pick GPT-5 and cap the credits"],["Refine","Form, booking popup, fix the broken button"]],
    note: "September 2025 walkthrough; plans and credits may have changed.",
  },
  'free-claude-code-vs-opencode-codex': {
    title: "Free Claude Code, OpenCode and Codex on one project",
    steps: [["Build","AI visibility app in Next.js"],["Break","API errors, slow replies, a 401"],["Switch","OpenCode free models; Codex at ≈$20"]],
    note: "My own experience from May 2026, not a benchmark.",
  },
  'opencode-desktop-habit-tracker-electron': {
    title: "A habit tracker built in the OpenCode desktop app",
    steps: [["Install","Desktop app on Debian, free Zen model"],["Build","Plan, then React and Electron"],["Fix","Relative paths for the white screen, local storage"]],
    note: "May 2026 walkthrough; model lists change often.",
  },
  'lovable-landing-page-calcom-stripe-domain': {
    title: "A landing page built and published with Lovable",
    steps: [["Compare","Same prompt in Replit, Lovable, Orchids"],["Add","Cal.com booking, Supabase, Stripe links"],["Publish","Domain through Lovable; Stripe incomplete"]],
    note: "July 2025 walkthrough; Stripe was only partly working.",
  },
  'nano-banana-gemini-images-make': {
    title: "Nano Banana: Gemini 2.5 Flash Image",
    steps: [["Open","aistudio.google.com, Gemini 2.5 Flash Image"],["Prompt","Generate and edit; compare variants"],["Automate","Make.com needs billing, else quota error"]],
    note: "August 2025 walkthrough; Google features change quickly.",
  },
  'replit-viral-post-genie-build': {
    title: "A web app built with Replit’s AI agent",
    steps: [["Prompt","Write it in ChatGPT, choose web app"],["Fix","OpenAI key, max tokens, JSON errors"],["Extend","History, sign-in; deploy needs paid"]],
    note: "August 2025; the free plan limit stopped the build.",
  },
  'apollo-apify-b2b-lead-list': {
    title: "Build a B2B lead list in Apollo, export with Apify",
    steps: [["Filter","Verified emails, titles, location, size"],["Save","Lists, 25 contacts at a time on free"],["Export","Apify actor, about 1.20 USD per 1,000 leads"]],
    note: "Check cold-email laws and Apollo’s terms first.",
  },
  'hostinger-n8n-vps-setup': {
    title: "n8n on a Hostinger VPS, step by step",
    steps: [["Plan","KVM plan, one month, nearest location"],["Template","n8n with 100 workflows"],["Open","Manage App, owner account, import"]],
    note: "October 2025 prices; backups and hardening not covered.",
  },
  'manus-first-test-calendar-gmail': {
    title: "Manus on the Lite model: connectors and an autoresponder",
    steps: [["Connect","Google Calendar and Gmail"],["Build","Hourly task drafts replies with a script"],["Switch","Move from OpenAI to Gemini"]],
    note: "Calendar delete and a SaaS build did not work on Lite.",
  },
  'emergent-openclaw-install': {
    title: "OpenClaw on Emergent, no local install",
    steps: [["Install","Run the Moltbot script in Emergent"],["Sign in","Google, preconfigured Opus 4.5"],["Extend","Skills via ClawHub; WhatsApp failed"]],
    note: "February 2026 walkthrough; credits and features may have changed.",
  },
  'apify-klook-hotel-scraper-claude-code': {
    title: "Scrape hotel data with Apify skills in Claude Code",
    steps: [["Install","npx skills add apify/agent-skills"],["Scrape","Ultimate scraper skill, direct Klook URL"],["Fix","Add check-in dates so prices appear"]],
    note: "Sponsored by Apify; check a site’s terms before scraping.",
  },
  'vidiq-mcp-claude-channel-audit': {
    title: "The vidIQ MCP inside Claude Desktop",
    steps: [["Connect","Add a connector with the vidIQ MCP URL"],["Ask","Idea check, channel audit, competitors"],["Verify","Paste the channel ID if it picks the wrong one"]],
    note: "Not sponsored by vidIQ; the link is an affiliate link.",
  },
  'syllaby-faceless-video-first-test': {
    title: "A faceless video in Syllaby, start to publish",
    steps: [["Setup","Style, voice, subtitles, portrait"],["Script","Custom topic in the script assistant"],["Publish","Render, then post to YouTube"]],
    note: "Trial had about 50 credits; script facts not checked.",
  },
  'syllaby-bulk-scheduler-faceless-videos': {
    title: "Schedule a month of faceless videos with Syllaby",
    steps: [["Style","Hyper realism, subtitles, voice"],["Script","AI assistant for 7 to 30 days"],["Schedule","Bulk scheduler, up to five posts a day"]],
    note: "Based on about three months of my own use in August 2025.",
  },
  'skool-welcome-email-automation': {
    title: "Skool member to welcome email, automated",
    steps: [["Capture","Skool Zapier integration fills a sheet"],["Add","Make.com watches rows, adds to EmailOctopus"],["Send","Three-email welcome sequence"]],
    note: "Paid communities cannot ask membership questions.",
  },
  'skool-membership-tiers': {
    title: "Skool membership tiers: free, premium and VIP",
    steps: [["Settings","Pricing, then membership tiers"],["Tiers","Free, $29 premium, $89 VIP in my community"],["Lock","Classroom modules and calls by tier"]],
    note: "Prices from an October 2025 walkthrough; check Skool.",
  },
  'skool-hobby-plan-review': {
    title: "Skool Hobby vs Pro: what changes",
    steps: [["Hobby","$9 a month, one admin, 10% fee"],["Pro","$99 a month, 2.9% fee, plugins"],["Choose","Downgrade if you do not need Pro"]],
    note: "July 2025 plan details; they may have changed.",
  },
  'skool-free-community-first-weeks': {
    title: "Launching a free Skool community",
    steps: [["Free","No barrier to joining; collect emails"],["Promote","Facebook, YouTube, email list"],["Offer","Templates, course, consultation"]],
    note: "Earnings and ranking claims are my own, June 2025.",
  },
  'skool-community-setup-guide': {
    title: "Set up a Skool community from scratch",
    steps: [["Launch","Hobby or Pro plan, 14-day trial"],["Set up","Pricing, questions, About page"],["Grow","Discovery, posts, classroom"]],
    note: "Income examples in the video are not verified.",
  },
  'skool-classroom-upsell-tour': {
    title: "A free Skool community with paid upsells",
    steps: [["Feed","Reply fast to introductions"],["Classroom","Start here, free tutorials, how-tos"],["Upsell","Course, templates, consultation"]],
    note: "Figures are my own from a June 2025 walkthrough.",
  },
  'make-youtube-description-updater': {
    title: "Auto-update YouTube descriptions with Make.com",
    steps: [["Queue","Airtable rows with status to-do"],["Write","Transcript, then an assistant fills a template"],["Update","YouTube module, then mark the row done"]],
    note: "Test on one video first; this edits live descriptions.",
  },
  'make-gmail-ai-auto-reply': {
    title: "An AI email auto-reply in Make.com",
    steps: [["Watch","Unread emails in the inbox"],["Write","OpenAI drafts a reply from the message"],["Send","After a delay, with a copy in Sent"]],
    note: "Unlink the send step and read the draft first.",
  },
  'make-faceless-video-json2video': {
    title: "Faceless AI videos from Airtable, posted by Make.com",
    steps: [["Topics","Airtable rows with status to-do"],["Render","OpenAI script, JSON2Video toolbox"],["Post","Router sends to Facebook and YouTube"]],
    note: "Resolution lowered to fit the free plan’s 5 MB file cap.",
  },
  'make-ai-agent-tally-email': {
    title: "A Make.com AI agent that replies to form submissions",
    steps: [["Agent","Pick a model and write a system prompt"],["Trigger","A Tally submission runs the agent"],["Reply","It drafts the email; sending needs plan access"]],
    note: "AI agents were in beta in this July 2025 walkthrough.",
  },
  'heygen-make-youtube-automation': {
    title: "HeyGen video to YouTube, automated in Make.com",
    steps: [["Script","OpenAI assistant writes from a topic"],["Render","HeyGen makes the avatar video"],["Upload","Second scenario posts it unlisted"]],
    note: "Videos rendered at 720p in this July 2025 test.",
  },
  'heygen-elevenlabs-make-course': {
    title: "AI avatar videos: HeyGen, ElevenLabs and Make.com",
    steps: [["Avatar","Upload 2+ minutes of footage and consent"],["Voice","Clone in HeyGen or import ElevenLabs"],["Automate","Make.com, with the 180-second API cap"]],
    note: "From a July 2025 walkthrough; check current plans.",
  },
  'heygen-airtable-facebook-content-machine': {
    title: "A Make.com content machine for avatar videos",
    steps: [["Topic","Airtable row with status to-do"],["Make","Perplexity research, script, HeyGen render"],["Post","Facebook upload, Airtable set to done"]],
    note: "The HeyGen API capped videos at 3 minutes in this walkthrough.",
  },
  'gamma-workshop-deck-and-site-export': {
    title: "A workshop deck in Gamma, published as a site",
    steps: [["Outline","ChatGPT outline pasted into Gamma"],["Generate","Concise text, professional theme"],["Share","Publish as a site or export a PDF"]],
    note: "Google Slides export failed in my walkthrough.",
  },
  'gamma-coaching-deck-from-chatgpt-plan': {
    title: "A Gamma deck from a pasted outline",
    steps: [["Paste","Detailed plan as notes"],["Set","Ten cards, concise text, theme, images"],["Export","Edit with the agent, then Google Slides"]],
    note: "Plans and prices are from a March 2026 walkthrough.",
  },
  'bluehost-ai-assistant': {
    title: "Bluehost AI Assistant: one dashboard, four model families",
    steps: [["Plan","AI All Access Pack, $20 a month in my walkthrough"],["Chat","Auto routing, web search, image edits"],["Agents","Research, article writer, slides"]],
    note: "Sponsored video; check current plans on Bluehost.",
  },
  'apify-agent-skills': {
    title: 'Apify agent skills: scrape leads in Cursor',
    steps: [['Install', 'npx skills add apify/agent-skills'], ['Token', 'Add APIFY_TOKEN to .env'], ['Scrape', 'Leads CSV, then emails']],
    note: 'The Google Maps CSV in my walkthrough had websites but no emails.',
  },
  "ai-agent-workflow": {"title": "An AI agent workflow with checks at every boundary", "steps": [["Brief", "Define inputs and allowed actions"], ["Draft", "Propose a structured result"], ["Check", "Validate before acting"]], "note": "Practice: classify three fictional requests without sending anything."},
  "ai-content-creation-workflows": {"title": "Make an AI content draft you can review", "steps": [["Brief", "One message and one format"], ["Draft", "Create one small asset"], ["Review", "Check facts, rights and export"]], "note": "Practice: turn three supplied facts into a 20-second explainer."},
  "build-apps-with-ai-coding-agents": {"title": "Build a small app with an AI coding agent", "steps": [["Scope", "One feature with clear checks"], ["Change", "Use the project’s existing pattern"], ["Verify", "Try edge cases and read the diff"]], "note": "Practice: add a case-insensitive filter to a local task list."},
  "choosing-ai-models-for-a-task": {"title": "Choose a model using your actual task", "steps": [["Examples", "Write the answers first"], ["Compare", "Use the same prompt and inputs"], ["Choose", "Check quality, cost and failure"]], "note": "Practice: compare two models on six fictional requests."},
  "youtube-channel-growth-workflow": {"title": "Improve one upload with a repeatable workflow", "steps": [["Research", "Choose one viewer problem"], ["Publish", "Deliver the title’s promise"], ["Learn", "Compare reach, clicks and retention"]], "note": "Practice: review one upload and record one change for the next."},
  "chatgpt-linux": {"title": "Use ChatGPT on Linux through official sources", "steps": [["Web", "Open chatgpt.com in your browser"], ["Desktop", "Check supported Linux preview releases"], ["Check", "Try a fictional task before real work"]], "note": "Practice: extract three fields and check that unknown facts stay unknown."},

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
  'claude-models-compared': {
    title: 'Claude Opus vs Sonnet vs Haiku vs Fable',
    steps: [['Opus 5.5', 'The default for most work'], ['Sonnet 5.5', 'Fast, cheaper everyday coding'], ['Haiku / Fable', 'Bulk work / the hardest tasks']],
    note: 'Lower the effort before you change the model.',
  },
  'lovable-vs-base44-vs-replit': {
    title: 'Lovable vs Base44 vs Replit',
    steps: [['Lovable', 'Polished sites, credits per change'], ['Base44', 'Apps with sign-in and data built in'], ['Replit', 'A full workspace when you want the code']],
    note: 'All three start free: test one prompt in each.',
  },
  'install-openclaw': {
    title: 'How to install OpenClaw safely',
    steps: [['Where', 'A VPS or hosted, not your main computer'], ['Install', 'One installer, then onboarding'], ['Lock down', 'Pairing, localhost, security audit']],
    note: 'Formerly Clawdbot and Moltbot.',
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
    title: 'ChatGPT Pro 20x is open again',
    steps: [['Sept 2026', 'OpenAI paused the $200 plan'], ['Oct 2026', 'Reopened, higher allowance'], ['Codex', 'Medium effort makes credits last']],
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
  'ai-threejs-rocket-demo': {"title":"An AI-generated Three.js rocket scene, then camera controls","steps":[["Source","Use a prompt you can read"],["Inspect","Open the generated HTML"],["Follow up","Add one camera control"]],"note":"My demo build, not a physics-validated simulator."},
  'chatgpt-images-sketch-workflow': {"title":"ChatGPT Images Sketch: compose, then edit locally","steps":[["Compose","Place objects in the scene"],["Generate","Check the whole image"],["Edit","Make one local change"]],"note":"Check placement, references and unintended changes."},
  'claude-code-task-manager': {"title":"A Claude Code task manager: scope, checks, packaging","steps":[["Scope","Name the checks first"],["Build","Follow my build"],["Package","Note platform limits"]],"note":"A project walkthrough, not a complete installer test."},
  'cleanyourtv-claude-code': {"title":"CleanYourTV on a TCL set, including remaining failures","steps":[["Access","Enable debugging carefully"],["Backup","Save settings first"],["Check","Test every remote button"]],"note":"Some remote buttons still failed after my changes."},
  'codex-seo-workflow': {"title":"Codex internal-link audits with reviewed changes","steps":[["Research","Choose the source with care"],["Plan","Write a phased edit plan"],["Review","Check the diff before deploy"]],"note":"An anecdotal link count is not a ranking rule."},
  'crowdreply-mcp-codex': {"title":"CrowdReply MCP: citation records into a review plan","steps":[["Connect","Connect the MCP server"],["Sample","Inspect citation records"],["Plan","Turn findings into reviews"]],"note":"Samples are not measured ranking uplift."},
  'deepseek-harness-first-test': {"title":"DeepSeek Harness: provider errors and a buggy demo","steps":[["Build","Run the preview build"],["Route","Note which provider worked"],["Inspect","Keep the buggy HTML visible"]],"note":"The failures I hit stay in the case study."},
  'ghostty-debian-configuration': {"title":"Ghostty on Debian: config files and reloads","steps":[["Install","Use current distro docs"],["Config","Edit key = value files"],["Reload","Open a fresh terminal"]],"note":"No universal package or RAM-saving claim."},
  'grokbot-for-beginners': {"title":"GrokBot for beginners: first bot and approvals","steps":[["Create","Give one bot a narrow job"],["Connect","Add only needed apps"],["Approve","Review outbound actions"]],"note":"Shared box, separate desktops, explicit approval."},
  'grokbot-for-seo': {"title":"GrokBot SEO bots: audits, data and reviewed fixes","steps":[["Bot","Scope the audit job"],["Data","Separate estimates from provider data"],["Fix","Review before changing the site"]],"note":"Costs and trials in my video are examples, not entitlements."},
  'grokbot-virtual-office': {"title":"A custom GrokBot office page for agent status","steps":[["Layout","Build the office Page"],["Handoff","Copy approvals into chat"],["Limits","Status sync stayed unfinished"]],"note":"A visual overview, not a native approval API."},
  'grokbot-vs-dots': {"title":"GrokBot vs Dots: onboarding, drafts and permissions","steps":[["Onboard","Follow each product’s docs"],["Draft","Compare one job-search task"],["Bound","Do not claim applications were sent"]],"note":"Two long-form videos, one comparison page."},
  'grokbot-job-application-agent': {"title":"GrokBot job applications: resume, queue and review","steps":[["Resume","Upload and review the file"],["Leads","Ask the job-app agent for roles"],["Approve","Nothing sends without your OK"]],"note":"I queued drafts. It did not show a live send."},
  'grokbot-credit-usage': {"title":"GrokBot credit usage: routines, rules and caps","steps":[["Chats","One conversation per task"],["Routines","Widen schedules and pause idle ones"],["Cap","Leave on-demand spending off"]],"note":"Settings come from the Maestro article shown in my walkthrough."},
  'herdr-on-windows': {"title":"Herdr on Windows: install, mods and Insights","steps":[["Install","Paste the official PowerShell line"],["Mods","Copy a gallery prompt into Herdr"],["Insights","Switch layout to open the dashboard"]],"note":"The Linux desktop walkthrough stays on its own page."},
  'grok-4-7-openrouter': {"title":"Grok 4.7 in Hermes through OpenRouter","steps":[["Find","Open the Grok 4.7 model page"],["Switch","Pick x-ai/grok-4.7 in Hermes"],["Continue","Resume the task in the new model"]],"note":"Vendor charts in my walkthrough are not current price quotes."},
  'herdr-desktop-app': {"title":"Herdr desktop: workspaces, resume and limits","steps":[["Install","Use the current official app"],["Space","One repo, separate tabs"],["Review","Check diffs and lifecycle docs"]],"note":"Closing the window is not the same as stopping herdr-core."},
  'herdr-guide': {"title":"Herdr TUI: one terminal for existing coding agents","steps":[["Install","Use the documented installer"],["Space","Open the project folder"],["Session","Distinguish TUI from desktop"]],"note":"It organizes agents; it does not replace them."},
  'jev-skills-router-setup': {"title":"Jev with coding agents: skills, access and routed tests","steps":[["Install","Add the Jev skills"],["Access","Configure provider credentials"],["Inspect","Read the returned request"]],"note":"Confidence is not proof of a correct route."},
  'muse-code-setup': {"title":"Muse Code: an API failure and a working CLI","steps":[["Attempt","Record the failed API route"],["CLI","Use the path that responded"],["Stop","Leave the unfinished audit"]],"note":"Installer details are omitted rather than guessed."},
  'opendesign-linux-slides': {"title":"OpenDesign on Linux: source setup and HTML slides","steps":[["Source","Set up from source"],["Design","Make one first design"],["Export","Use the HTML deck path"]],"note":"Model charges stay separate from software access."},
  'rea-video-editor-prototype': {"title":"REA with a coding agent: a limited editor prototype","steps":[["Setup","Use the documented command"],["Build","Build the prototype"],["Limits","Keep playback bugs visible"]],"note":"A prototype, not a rights-cleared editor."},
  'run-a-blog-with-grokbot': {"title":"GrokBot WordPress drafts from long-form videos","steps":[["Connect","Use the supported WordPress flow"],["Draft","Ask for reviewable posts"],["Separate","Publishing is a later approval"]],"note":"Drafts, schedules and emails are distinct actions."},
  'trakkr-codex-visibility-workflow': {"title":"Trakkr and Codex: visibility, crawlers and visits","steps":[["Track","Inspect tracked questions"],["Distinguish","Visibility is not visits"],["Review","Do not auto-publish fixes"]],"note":"llms.txt is not treated as a ranking lever."},
  'treg-inside-grokbot': {"title":"Treg in GrokBot: data tools with a spending check","steps":[["Connect","Add the Treg plugin"],["Price","Inspect the endpoint first"],["Approve","Paid calls are a separate decision"]],"note":"Provider billing is not the same as catalog access."},
  'rank-prompt-ai-search-visibility': {"title": "Rank Prompt: scan, track prompts, then fix", "steps": [["Scan", "Run a visibility check"], ["Track", "Read prompts by category"], ["Fix", "Review MCP edits"]], "note": "Rank Prompt sponsored the 12 November 2026 walkthrough."},
  'visiscan-ai-visibility-audit': {"title": "VisiScan: free scan and a paid report", "steps": [["Scan", "Enter a domain"], ["Read", "Readiness and visibility"], ["Files", "Check sitemap and robots"]], "note": "Mike owns VisiScan. Prices below are from 22 July 2026."},
  'semrush-mcp-ai-visibility': {"title": "Semrush MCP: visibility and keyword gaps", "steps": [["Connect", "Add the Semrush MCP"], ["Read", "AI visibility and citations"], ["Plan", "Review keyword gaps"]], "note": "Scores and shares are from the 6 August 2026 walkthrough."},
  'ai-visibility-tracker-saas-build': {"title": "An AI visibility tracker, built on camera", "steps": [["Land", "Ship a landing page"], ["Data", "Pull DataForSEO MCP data"], ["Price", "Draft a Stripe page"]], "note": "A build log, not a finished product launch."},
  'opencode-seo-audit-skills': {"title": "OpenCode SEO skills: site checks and files", "steps": [["Audit", "Run the SEO skills"], ["Files", "Generate llms.txt"], ["Limits", "Note the plan caps"]], "note": "Plan limits are what this walkthrough showed."},
  'ai-token-usage-dashboard': {"title": "A local dashboard for token usage", "steps": [["Install", "Run ccusage locally"], ["Read", "Compare daily costs"], ["Check", "Note RTK savings"]], "note": "Costs and savings are from 3 August 2026."},
  'rtk-token-savings-claude-code': {"title": "RTK: compress tokens before they land", "steps": [["Install", "Use curl or Homebrew"], ["Hook", "Add Claude Code and Codex"], ["Gain", "Run rtk gain"]], "note": "Savings numbers are from 21 July 2026."},
  '9router-cost-tracking-fallbacks': {"title": "9Router costs, combos and fallbacks", "steps": [["Track", "Read token cost"], ["Combo", "Set paid, cheap, free"], ["Fallback", "Auto-switch on failure"]], "note": "Install lives on the 9Router setup guide."},
  'zcode-glm-desktop-app': {"title": "ZCode desktop for GLM 5.2", "steps": [["Install", "Use the Linux app"], ["Plans", "Read the recorded tiers"], ["Review", "Run a local site check"]], "note": "Plan prices are from 4 July 2026."},
  'claude-fable-5-game-prompts': {"title": "Claude Fable 5: small games from prompts", "steps": [["Mode", "Pick an effort setting"], ["Plan", "Use plan mode"], ["Build", "Run the recorded briefs"]], "note": "A prompt walkthrough, not a game-engine course."},
  'claude-code-second-brain': {"title": "A Claude Code second-brain tour", "steps": [["Files", "Keep notes in markdown"], ["Radar", "Open the theme graph"], ["Limits", "Watch rate limits"]], "note": "A project tour, not a drop-in Cortex install."},
  'claude-code-video-editor-skill': {"title": "A Claude Code video-editor skill", "steps": [["Prompt", "Follow the recorded loop"], ["Guard", "Keep confidence checks"], ["Run", "Use the shown command"]], "note": "A skill walkthrough, not a shipped editor."},
  'hermes-agent-supermemory': {"title": "Give Hermes Agent a memory plugin", "steps": [["Install", "Add the Supermemory CLI"], ["Key", "Paste the API key"], ["Test", "Write one memory"]], "note": "Then connect the same plugin in OpenCode and Codex."},
  'hermes-backlink-outreach-pipeline': {"title": "Hermes outreach: crawl, pitch, then send", "steps": [["Crawl", "Find candidate pages"], ["Pitch", "Draft the outreach"], ["Gate", "Review before send"]], "note": "Delivery numbers are from 29 July 2026."},
  'chatgpt-thumbnail-ctr-pipeline': {"title": "Audit thumbnail CTR, then redesign", "steps": [["Audit", "Read channel CTR"], ["Note", "Brightness and contrast"], ["Redraw", "Run the Images prompt"]], "note": "Contrast targets are from 24 July 2026."},
  'google-ai-studio-chat-app': {"title":"Build a chat web app in Google AI Studio","steps":[["Prompt","Describe the app in build mode"],["Connect","Add an OpenAI API key"],["Deploy","Needs a Google Cloud project"]],"note":"An October 2025 walkthrough, with the limits noted."},
  'opencode-stripe-billing-saas': {"title":"OpenCode adds Stripe billing to a SaaS app","steps":[["Prompt","Paste one billing prompt"],["Fix","Install Stripe, regenerate Prisma"],["Check","Build, then test checkout"]],"note":"A February 2026 case study, with gaps listed."},
  'n8n-social-media-agent-template': {"title":"An n8n social post workflow from a template","steps":[["Trends","Pull Google Trends with SerpApi"],["Research","Pick a topic, ask Perplexity"],["Post","Log it, then publish"]],"note":"Only the first steps ran in my walkthrough."},
  'n8n-whatsapp-ai-agent': {"title":"An n8n agent that answers WhatsApp messages","steps":[["Trigger","WhatsApp on-messages node"],["Agent","Chat model plus memory"],["Send","Reply node needs Meta access"]],"note":"The send step was still blocked in my walkthrough."},
  'make-com-beginner-course-scenarios': {"title":"A Make.com course in three builds","steps":[["Template","Sheets row sends a Gmail"],["Scratch","OpenAI, Airtable, Facebook"],["Scraper","Apify leads into Sheets"]],"note":"Errors left in on purpose."},
  'make-business-automation-examples': {"title":"Make.com automations for a small business","steps":[["Reply","Draft email replies with ChatGPT"],["Sync","Add new members to your list"],["Reach","Send, scrape, then review"]],"note":"Consent and spam rules apply."},
  'codex-cli': {"title":"Install Codex CLI and run a first task","steps":[["Install","Installer, npm or Homebrew"],["Sign in","Choose Sign in with ChatGPT"],["Run","codex in a project folder"]],"note":"Official commands for Mac, Windows and Linux."},
  'what-is-mcp': {
    title: 'What is MCP? One standard plug for AI tools',
    steps: [['Host', 'Claude Code, Codex or ChatGPT'], ['Server', 'Offers tools, data and prompts'], ['Check', 'Start read-only, approve writes']],
    note: 'Try it: the official filesystem server in a test folder.',
  },
  'what-is-an-ai-agent': {
    title: 'What is an AI agent? A model using tools in a loop',
    steps: [['Goal', 'Instructions and allowed tools'], ['Loop', 'Pick a tool, read the result'], ['Stop', 'Done, ask a person or hit a limit']],
    note: 'Use one when the steps cannot be planned in advance.',
  },
};

const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The byline is pinned to the bottom edge, so the headline shrinks until it fits in two lines and the note clears it.
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
<p class="by">Mike Holp · ai-automation-station.com</p>
<script>const h = document.querySelector('h1'); let size = 60; while (h.offsetHeight > 2 * size * 1.1 + 1 && size > 42) h.style.fontSize = \`\${--size}px\`;</script>`;
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
