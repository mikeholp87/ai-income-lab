// Archive topic pages at /videos/<slug>. A video joins every topic whose pattern matches its title,
// so new uploads are sorted automatically; titles that match nothing stay in the full archive only.
// ponytail: title regexes, tuned on the October 2026 uploads; switch to hand-kept tags if they misfile often.
export const topics = [
  { slug: 'claude-code', name: 'Claude Code', intro: 'Builds, skills and workflows with Anthropic’s Claude Code in the terminal.', pattern: /claude code|claude (skills?|design|routines)/i },
  { slug: 'codex-opencode', name: 'Codex and OpenCode', intro: 'Coding-agent builds with OpenAI Codex and OpenCode, from setup to side-by-side tests.', pattern: /\bcodex\b|open ?code/i },
  { slug: 'n8n', name: 'n8n', intro: 'Workflows and AI automations in n8n, from a first build to self-hosted agents.', pattern: /\bn8n\b/i },
  { slug: 'make-com', name: 'Make.com', intro: 'No-code AI automations built step by step in Make.com.', pattern: /make\.com/i },
  { slug: 'ai-agents', name: 'AI agents', intro: 'Personal assistants, research agents and agent tools tested on real tasks.', pattern: /\bagents?\b|grok ?bot|hermes|openclaw|second brain|chief of staff|personal ai assistant/i },
  { slug: 'ai-seo', name: 'AI SEO', intro: 'Tools and tests for getting a site found in Google and in AI answers.', pattern: /\bseo\b|\baeo\b|\bgeo\b|ai (search|visibility|answer engines?)|invisible to ai|search (visibility|ranking)/i },
  { slug: 'ai-video', name: 'AI video and YouTube', intro: 'AI video editing, Shorts, thumbnails and avatar workflows for creators.', pattern: /\bvideos?\b|shorts|thumbnails?|youtube|opusclip|vidiq|tube ?analytics|heygen|avatar/i },
  { slug: 'new-models', name: 'New AI models', intro: 'Launch breakdowns and first tests of new models from Anthropic, OpenAI, Google, xAI and others.', pattern: /claude (opus|sonnet|haiku|fable|mythos)|\bgpt[- ]?\d|chatgpt (\d|images)|gemini \d|grok \d|deepseek|\bglm\b|qwen|kimi|llama|meta muse|mistral|openai just released/i },
];

export const topicBySlug = slug => topics.find(topic => topic.slug === slug);
