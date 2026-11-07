// Archive topic pages at /videos/<slug>. A video joins every topic whose pattern matches its title,
// so new uploads are sorted automatically; titles that match nothing stay in the full archive only.
// A watch page's breadcrumb uses the first topic that matches, so keep narrow tool topics above broad ones.
// ponytail: title regexes, tuned on the October 2026 uploads; switch to hand-kept tags if they misfile often.
export const topics = [
  {
    slug: 'claude-code', name: 'Claude Code',
    title: 'Claude Code tutorials: builds, skills and workflows | Mike Holp',
    heading: 'Claude Code tutorials and builds',
    intro: 'Builds, skills and workflows with Anthropic’s Claude Code in the terminal.',
    about: 'Each video here uses Claude Code on a real project rather than a toy prompt: installing it, adding skills and routines, wiring it to outside data, and checking what it gets wrong. Start with the beginner walkthrough if you have never run a coding agent, then use the comparison guide to decide when Claude Code is the right tool and when Codex or OpenCode fits the task better. Most builds show the full session, including the fixes, so you can judge how much supervision the agent needed.',
    pattern: /claude code|claude (skills?|routines)/i,
    guides: [['/guides/claude-code-for-beginners.html', 'Claude Code tutorial for beginners: install and use it'], ['/guides/claude-code-task-manager.html', 'Claude Code Task Manager: Scope, Checks and Packaging'], ['/guides/cleanyourtv-claude-code.html', 'CleanYourTV with Claude Code: TCL Setup and Risks'], ['/guides/claude-code-vs-codex.html', 'Codex vs Claude Code: how I use both and route tasks']],
  },
  {
    slug: 'codex-opencode', name: 'Codex and OpenCode',
    title: 'Codex and OpenCode tutorials: setup and builds | Mike Holp',
    heading: 'Codex and OpenCode tutorials',
    intro: 'Coding-agent builds with OpenAI Codex and OpenCode, from setup to side-by-side tests.',
    about: 'These videos cover OpenAI Codex and the open-source OpenCode agent: installing them on macOS and Linux, choosing providers and models, working within plan usage limits, and running the same task through different agents to compare the results. The written guides turn the recurring questions into checklists you can follow without rewatching: making and verifying a small code change, installing Codex on Linux, checking usage limits and reset times before a long session, and setting up OpenCode Go or an OpenRouter key.',
    pattern: /\bcodex\b|open ?code/i,
    guides: [['/guides/codex-workflow.html', 'Codex tutorial: make and verify a small code change'], ['/guides/codex-seo-workflow.html', 'Codex for SEO: Internal-Link Audits and Reviewed Changes'], ['/guides/herdr-guide.html', 'Herdr TUI Guide: Workspaces and Coding-Agent Sessions'], ['/guides/codex-on-linux.html', 'Codex on Linux: install Codex CLI and the desktop app'], ['/guides/codex-usage-limits.html', 'Codex usage limits: check usage, plans and reset times'], ['/guides/opencode-vs-claude-code.html', 'OpenCode vs Claude Code: pricing, setup and limits'], ['/guides/opencode-go.html', 'OpenCode Go: pricing, models, limits and setup'], ['/guides/openrouter-setup.html', 'OpenRouter: API key, free models, pricing and setup']],
  },
  {
    slug: 'n8n', name: 'n8n',
    title: 'n8n tutorials: AI workflows, agents and self-hosting | Mike Holp',
    heading: 'n8n tutorials: AI workflows and agents',
    intro: 'Workflows and AI automations in n8n, from a first build to self-hosted agents.',
    about: 'n8n is the open-source workflow tool I use when an automation needs custom logic, AI steps or self-hosting. The videos build complete workflows node by node, from content and LinkedIn automations to AI agents that call outside tools, and show where each one needed manual checks. The written guides cover what n8n is used for, how it compares with Zapier and Make on billing and hosting, open-source alternatives, and a Docker or Node.js install on Ubuntu.',
    pattern: /\bn8n\b/i,
    guides: [['/guides/what-is-n8n-used-for.html', 'What is n8n used for? Real uses and a first workflow'], ['/guides/self-host-n8n.html', 'Self-host n8n on Ubuntu: Docker and Node.js setup'], ['/guides/n8n-vs-zapier-vs-make.html', 'n8n vs Zapier vs Make: billing, builders and AI agents'], ['/guides/n8n-alternatives-open-source.html', 'n8n alternatives open source: 5 tools and their licenses'], ['/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build']],
  },
  {
    slug: 'make-com', name: 'Make.com',
    title: 'Make.com tutorials: no-code AI automations | Mike Holp',
    heading: 'Make.com tutorials: no-code AI automations',
    intro: 'No-code AI automations built step by step in Make.com.',
    about: 'Make.com is the easiest place to build a first automation without code. These videos range from a full one-hour course to short builds that connect Google Sheets, Gmail and AI modules, with the filters and field mapping shown on screen. The written guide is a small practice scenario you can finish in one sitting: watch a sheet, pass only approved rows, and verify the output before you turn on a schedule.',
    pattern: /make\.com/i,
    guides: [['/guides/make-first-automation.html', 'Make.com Google Sheets tutorial: filter approved requests'], ['/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build']],
  },
  {
    slug: 'ai-agents', name: 'AI agents',
    title: 'AI agent tutorials: assistants and voice agents | Mike Holp',
    heading: 'AI agent tutorials and tests',
    intro: 'Personal assistants, research agents and agent tools tested on real tasks.',
    about: 'This is the largest topic on the channel: personal AI assistants, research and job-search agents, voice agents and desktop agent apps, each given a real task instead of a demo prompt. The videos show the setup, what the agent finished on its own, and what still needed a person. The written guides cover installing Hermes and OpenClaw, building a Vapi voice agent, comparing no-code agent builders, and when agentic AI differs from a fixed workflow.',
    pattern: /\bagents?\b|grok ?bot|hermes|openclaw|second brain|chief of staff|personal ai assistant|\bvapi\b/i,
    guides: [['/guides/hermes-desktop.html', 'Hermes Desktop: install on Mac, Windows or Linux'], ['/guides/grokbot-for-beginners.html', 'GrokBot for Beginners: First Bot, Access and Approvals'], ['/guides/grokbot-vs-dots.html', 'GrokBot vs Dots: Onboarding, Job Drafts and Permissions'], ['/guides/herdr-desktop-app.html', 'Herdr Desktop Guide: Setup, Workspaces and Limits'], ['/guides/grokbot-virtual-office.html', 'GrokBot Virtual Office: Build a Custom Agent Dashboard'], ['/guides/run-a-blog-with-grokbot.html', 'GrokBot WordPress Workflow: Long-Form Videos to Drafts'], ['/guides/install-openclaw.html', 'How to install OpenClaw: local, VPS or hosted, safely'], ['/guides/vapi-voice-agent-tutorial.html', 'Vapi AI tutorial: build a voice agent, test calls, webhooks'], ['/guides/no-code-ai-agent-builder.html', 'No-code AI agent builder: compare n8n, Make, Zapier and more'], ['/guides/agentic-ai-vs-traditional-automation.html', 'How does agentic AI differ from traditional automation?'], ['/guides/ai-agent-workflow.html', 'AI agent workflow: choose tools, add checks, keep control']],
  },
  {
    slug: 'ai-seo', name: 'AI SEO',
    title: 'AI SEO tutorials: rank in Google and AI answers | Mike Holp',
    heading: 'AI SEO: get found in Google and AI answers',
    intro: 'Tools and tests for getting a site found in Google and in AI answers.',
    about: 'Search now happens in two places: classic Google results and AI answers from ChatGPT, Claude, Perplexity and Google’s AI features. These videos test tools for both, from free and open-source SEO suites to trackers that check whether AI engines mention your business. The written guides show how to give Claude Code real keyword and ranking data through DataForSEO, and what OpenSEO costs to run once its data usage is counted.',
    pattern: /\bseo\b|openseo|\baeo\b|\bgeo\b|ai (search|visibility|answer engines?)|invisible to ai|search (visibility|ranking)/i,
    guides: [['/guides/dataforseo-mcp-claude.html', 'DataForSEO MCP: connect Claude Code to real SEO data'], ['/guides/grokbot-for-seo.html', 'GrokBot for SEO: Audit Bots, Data and Reviewed Fixes'], ['/guides/treg-inside-grokbot.html', 'Treg in GrokBot: Connect Data Tools and Control Costs'], ['/guides/trakkr-codex-visibility-workflow.html', 'Trakkr and Codex: AI Visibility, Crawlers and Visits'], ['/guides/crowdreply-mcp-codex.html', 'CrowdReply MCP with Codex: Citation Data to Review Plans'], ['/guides/openseo-review.html', 'OpenSEO review: setup, data costs and practical limits']],
  },
  {
    slug: 'make-money', name: 'Earn with AI',
    title: 'Make money with AI: client services and honest tests | Mike Holp',
    heading: 'Make money with AI: client work, leads and services',
    intro: 'Client services, lead generation and monetization with AI, tested without income promises.',
    about: 'These videos cover the business side of AI skills: finding clients, generating and qualifying leads, running a small automation agency, and meeting platform monetization rules. None of them promise income. The written guides start with the honest version of fast AI income, then compare beginner side hustles and the client services you can sell with ChatGPT or automation tools. Results depend on your skills, your market and the time you put in.',
    pattern: /\bmoney\b|\bincome\b|side hustle|monetiz|\bclients?\b|\bleads?\b|agency|brand deals|profitable|rat race|scaling businesses|online business/i,
    guides: [['/guides/make-money-with-ai-fast.html', 'How to make money with AI fast: the honest path'], ['/guides/make-money-with-ai-no-experience.html', 'How to make money with AI with no experience'], ['/guides/make-money-with-chatgpt.html', 'How to make money with ChatGPT: 4 client services'], ['/guides/ai-side-hustles.html', 'AI side hustles for beginners: 7 services to test'], ['/guides/ai-automation-services-small-business.html', 'How to sell AI automation services to small businesses']],
  },
  {
    slug: 'ai-website-builders', name: 'AI website builders',
    title: 'AI website and app builders: tutorials and tests | Mike Holp',
    heading: 'AI website and app builder tutorials',
    intro: 'Websites, landing pages and web apps built with AI builders, start to finish.',
    about: 'Each video builds a real site or app with an AI builder, from Lovable, Replit and Base44 to Google AI Studio, Antigravity and KiloCode, then checks what shipped. You see the prompts, the fixes and the deployment, so you can compare how much each tool did on its own. The written guides cover installing Kilo Code and running a first task you can check, and adding a YouTube feed to a React site with caching and a fallback when the API is down.',
    pattern: /website|landing pages?|web apps?|\bsaas\b|lovable|replit|base44|ai studio|antigravity|kilocode|runable|bluehost|rocket ai/i,
    guides: [['/guides/lovable-vs-base44-vs-replit.html', 'Lovable vs Base44 vs Replit: pricing and which to pick'], ['/guides/runable-audit-website.html', 'Runable Audit-Service Website: Research to an MVP'], ['/guides/kilo-code-tutorial.html', 'Kilo Code tutorial: install, free models and first task'], ['/guides/youtube-feed.html', 'React YouTube feed tutorial: API, caching and fallbacks']],
  },
  {
    slug: 'ai-video', name: 'AI video and YouTube',
    title: 'AI video tutorials: avatars, Shorts and YouTube tools | Mike Holp',
    heading: 'AI video and YouTube tutorials',
    intro: 'AI video editing, Shorts, thumbnails and avatar workflows for creators.',
    about: 'Tools for making and growing video with AI: avatar presenters, faceless channels, Shorts automation, thumbnails and YouTube analytics. The videos test each tool on real uploads and show the limits, from credit costs to voice quality and platform rules on AI content. The written guides cover a first HeyGen avatar video, a YouTube channel growth workflow, and an AI content creation path for images, video and audio.',
    pattern: /\bvideos?\b|shorts|thumbnails?|youtube|opusclip|vidiq|tube ?analytics|heygen|avatar/i,
    guides: [['/guides/heygen-ai-avatar-tutorial.html', 'HeyGen AI avatar tutorial: create your first video'], ['/guides/chatgpt-images-sketch-workflow.html', 'ChatGPT Images Sketch: Composition and Local Edits'], ['/guides/opendesign-linux-slides.html', 'OpenDesign on Linux: Source Setup and HTML Slides'], ['/guides/rea-video-editor-prototype.html', 'REA Coding-Agent Case: A Video-Editor Prototype'], ['/guides/youtube-channel-growth-workflow.html', 'YouTube channel growth workflow: research, publish, learn'], ['/guides/ai-content-creation-workflows.html', 'AI content creation workflow: images, video and audio']],
  },
  {
    slug: 'new-models', name: 'New AI models',
    title: 'New AI models: launch breakdowns and first tests | Mike Holp',
    heading: 'New AI model launches, tested',
    intro: 'Launch breakdowns and first tests of new models from Anthropic, OpenAI, Google, xAI and others.',
    about: 'When a new model ships, these videos cover what changed, what it costs, and how it handles a real build compared with the model it replaces. They include Claude, GPT, Gemini, Grok and open-weight releases such as Qwen, DeepSeek and GLM. Launch details change quickly, so check the provider’s own pricing and limits before you switch a production workload to a model you saw here. The written guides compare Claude models and show how to choose a model with a small test set.',
    pattern: /claude (opus|sonnet|haiku|fable|mythos)|\bgpt[- ]?\d|chatgpt (\d|images)|gemini \d|grok \d|deepseek|\bglm\b|qwen|kimi|\bllama\b|meta muse|mistral|openai just released/i,
    guides: [['/guides/claude-models-compared.html', 'Claude Opus vs Sonnet vs Haiku vs Fable: which to use'], ['/guides/muse-code-setup.html', 'Muse Code Setup Case: API Failure and a Working CLI'], ['/guides/deepseek-harness-first-test.html', 'DeepSeek Harness First Test: Setup Errors and Demo Limits'], ['/guides/choosing-ai-models-for-a-task.html', 'How to choose an AI model for a task']],
  },
];

export const topicBySlug = slug => topics.find(topic => topic.slug === slug);

// The topic a watch page sits under in its breadcrumb: the first whose pattern matches the title.
export const topicFor = title => topics.find(topic => topic.pattern.test(title));
