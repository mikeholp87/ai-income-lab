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
    pattern: /claude code|claude (skills?|design|routines)/i,
    guides: [['/guides/claude-code-for-beginners.html', 'Claude Code tutorial for beginners: install and use it'], ['/guides/claude-code-vs-codex.html', 'Codex vs Claude Code: how I use both and route tasks']],
  },
  {
    slug: 'codex-opencode', name: 'Codex and OpenCode',
    title: 'Codex and OpenCode tutorials: setup, limits and builds | Mike Holp',
    heading: 'Codex and OpenCode tutorials',
    intro: 'Coding-agent builds with OpenAI Codex and OpenCode, from setup to side-by-side tests.',
    about: 'These videos cover OpenAI Codex and the open-source OpenCode agent: installing them on macOS and Linux, choosing providers and models, working within plan usage limits, and running the same task through different agents to compare the results. The written guides turn the recurring questions into checklists you can follow without rewatching: making and verifying a small code change, installing Codex on Linux, and checking usage limits and reset times before a long session.',
    pattern: /\bcodex\b|open ?code/i,
    guides: [['/guides/codex-workflow.html', 'Codex tutorial: make and verify a small code change'], ['/guides/codex-on-linux.html', 'Codex on Linux: install Codex CLI and the desktop app'], ['/guides/codex-usage-limits.html', 'Codex usage limits: check usage, plans and reset times'], ['/guides/opencode-vs-claude-code.html', 'OpenCode vs Claude Code: pricing, setup and limits']],
  },
  {
    slug: 'n8n', name: 'n8n',
    title: 'n8n tutorials: AI workflows, agents and self-hosting | Mike Holp',
    heading: 'n8n tutorials: AI workflows and agents',
    intro: 'Workflows and AI automations in n8n, from a first build to self-hosted agents.',
    about: 'n8n is the open-source workflow tool I use when an automation needs custom logic, AI steps or self-hosting. The videos build complete workflows node by node, from content and LinkedIn automations to AI agents that call outside tools, and show where each one needed manual checks. If you want to run n8n on your own machine instead of n8n Cloud, the written guide walks through a Docker or Node.js install on Ubuntu and how to keep it updated.',
    pattern: /\bn8n\b/i,
    guides: [['/guides/self-host-n8n.html', 'Self-host n8n on Ubuntu: Docker and Node.js setup'], ['/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build']],
  },
  {
    slug: 'make-com', name: 'Make.com',
    title: 'Make.com tutorials: no-code AI automations, step by step | Mike Holp',
    heading: 'Make.com tutorials: no-code AI automations',
    intro: 'No-code AI automations built step by step in Make.com.',
    about: 'Make.com is the easiest place to build a first automation without code. These videos range from a full one-hour course to short builds that connect Google Sheets, Gmail and AI modules, with the filters and field mapping shown on screen. The written guide is a small practice scenario you can finish in one sitting: watch a sheet, pass only approved rows, and verify the output before you turn on a schedule.',
    pattern: /make\.com/i,
    guides: [['/guides/make-first-automation.html', 'Make.com Google Sheets tutorial: filter approved requests'], ['/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build']],
  },
  {
    slug: 'ai-agents', name: 'AI agents',
    title: 'AI agent tutorials: assistants, voice agents and tools | Mike Holp',
    heading: 'AI agent tutorials and tests',
    intro: 'Personal assistants, research agents and agent tools tested on real tasks.',
    about: 'This is the largest topic on the channel: personal AI assistants, research and job-search agents, voice agents and desktop agent apps, each given a real task instead of a demo prompt. The videos show the setup, what the agent finished on its own, and what still needed a person. The written guides cover two agents in depth: installing Hermes with a desktop app, and building a Vapi voice agent with test calls and webhook checks.',
    pattern: /\bagents?\b|grok ?bot|hermes|openclaw|second brain|chief of staff|personal ai assistant|\bvapi\b/i,
    guides: [['/guides/hermes-desktop.html', 'Hermes Desktop: install on Mac, Windows or Linux'], ['/guides/vapi-voice-agent-tutorial.html', 'Vapi AI tutorial: build a voice agent, test calls, webhooks']],
  },
  {
    slug: 'ai-seo', name: 'AI SEO',
    title: 'AI SEO tutorials: rank in Google and AI answers | Mike Holp',
    heading: 'AI SEO: get found in Google and AI answers',
    intro: 'Tools and tests for getting a site found in Google and in AI answers.',
    about: 'Search now happens in two places: classic Google results and AI answers from ChatGPT, Claude, Perplexity and Google’s AI features. These videos test tools for both, from free and open-source SEO suites to trackers that check whether AI engines mention your business. The written guides show how to give Claude Code real keyword and ranking data through DataForSEO, and what OpenSEO costs to run once its data usage is counted.',
    pattern: /\bseo\b|openseo|\baeo\b|\bgeo\b|ai (search|visibility|answer engines?)|invisible to ai|search (visibility|ranking)/i,
    guides: [['/guides/dataforseo-mcp-claude.html', 'DataForSEO MCP: connect Claude Code to real SEO data'], ['/guides/openseo-review.html', 'OpenSEO review: setup, data costs and practical limits']],
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
    about: 'Each video builds a real site or app with an AI builder, from Lovable, Replit and Base44 to Google AI Studio, Antigravity and KiloCode, then checks what shipped. You see the prompts, the fixes and the deployment, so you can compare how much each tool did on its own. For a hand-built alternative, the written guide shows how to add a YouTube feed to a React site with caching and a fallback when the API is down.',
    pattern: /website|landing pages?|web apps?|\bsaas\b|lovable|replit|base44|ai studio|antigravity|kilocode|runable|bluehost|rocket ai/i,
    guides: [['/guides/youtube-feed.html', 'React YouTube feed tutorial: API, caching and fallbacks']],
  },
  {
    slug: 'ai-video', name: 'AI video and YouTube',
    title: 'AI video tutorials: avatars, Shorts and YouTube tools | Mike Holp',
    heading: 'AI video and YouTube tutorials',
    intro: 'AI video editing, Shorts, thumbnails and avatar workflows for creators.',
    about: 'Tools for making and growing video with AI: avatar presenters, faceless channels, Shorts automation, thumbnails and YouTube analytics. The videos test each tool on real uploads and show the limits, from credit costs to voice quality and platform rules on AI content. The written guide walks through a first HeyGen avatar video, from recording consent footage to reviewing the export before you publish it.',
    pattern: /\bvideos?\b|shorts|thumbnails?|youtube|opusclip|vidiq|tube ?analytics|heygen|avatar/i,
    guides: [['/guides/heygen-ai-avatar-tutorial.html', 'HeyGen AI avatar tutorial: create your first video']],
  },
  {
    slug: 'new-models', name: 'New AI models',
    title: 'New AI models: launch breakdowns and first tests | Mike Holp',
    heading: 'New AI model launches, tested',
    intro: 'Launch breakdowns and first tests of new models from Anthropic, OpenAI, Google, xAI and others.',
    about: 'When a new model ships, these videos cover what changed, what it costs, and how it handles a real build compared with the model it replaces. They include Claude, GPT, Gemini, Grok and open-weight releases such as Qwen, DeepSeek and GLM. Launch details change quickly, so check the provider’s own pricing and limits before you switch a production workload to a model you saw here.',
    pattern: /claude (opus|sonnet|haiku|fable|mythos)|\bgpt[- ]?\d|chatgpt (\d|images)|gemini \d|grok \d|deepseek|\bglm\b|qwen|kimi|\bllama\b|meta muse|mistral|openai just released/i,
  },
];

export const topicBySlug = slug => topics.find(topic => topic.slug === slug);

// The topic a watch page sits under in its breadcrumb: the first whose pattern matches the title.
export const topicFor = title => topics.find(topic => topic.pattern.test(title));
