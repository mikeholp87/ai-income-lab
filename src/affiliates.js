// Affiliate and referral links from the YouTube descriptions, for the /tools.html page and the watch pages'
// "Tools used" links. `recommended` marks the 16 tools in every description's "Recommended Tools (affiliate links)"
// list; the rest are referral links given in individual videos. `tools` are the names in video tool lists that
// link here, and the videos using those names are listed on the tools page. `site` is the official domain, used
// for the logo in public/tools/logos/ (node scripts/fetch-tool-logos.mjs). `cta` overrides "Try <name>" on the
// button; `price` is shown only when set, and must come from the tool's current pricing page.
export const categories = [
  ['coding', 'AI coding and app builders', 'Coding'],
  ['automation', 'Automation and AI agents', 'Automation'],
  ['seo', 'SEO and AI search', 'SEO'],
  ['video', 'Video and content creation', 'Video'],
  ['youtube', 'YouTube growth', 'YouTube'],
  ['marketing', 'Email, marketing and sales', 'Marketing'],
  ['hosting', 'Hosting', 'Hosting'],
  ['business', 'Community, hiring and freelancing', 'Business'],
];

export const affiliates = [
  { name: 'OpenCode', category: 'coding', site: 'opencode.ai', bestFor: 'Coding in the terminal with open models', url: 'https://opencode.ai/go?ref=Y0V64DGPZN', tools: ['OpenCode', 'OpenCode Go', 'OpenCode Zen'], blurb: 'An open-source AI coding agent for the terminal and desktop. OpenCode Go is its flat-price plan for open coding models.' },
  { name: 'Claude', category: 'coding', site: 'claude.ai', bestFor: 'Writing, research and coding with Claude Code', url: 'https://claude.ai/referral/nlKOl3Wcgg', tools: ['Claude', 'Claude Desktop', 'Claude Haiku 5.5', 'Claude Sonnet 5.5', 'Claude Opus 5', 'Claude Opus 5.5', 'Claude Fable 5', 'Claude Fable 5.1', 'Opus 4.5', 'Opus 4.6', 'Opus 4.8'], blurb: 'Anthropic’s AI assistant, and the home of Claude Code for coding in the terminal.' },
  { name: 'Lovable', category: 'coding', recommended: true, site: 'lovable.dev', bestFor: 'Building a web app without writing code', cta: 'Start building in Lovable', url: 'https://www.lovable.dev/?via=mike-holp', tools: ['Lovable'], blurb: 'Builds web apps from a chat prompt.' },
  { name: 'Replit', category: 'coding', site: 'replit.com', bestFor: 'Building and deploying apps in the browser', url: 'https://replit.com/refer/digitalnomadven', tools: ['Replit'], blurb: 'A browser-based coding workspace with an AI agent that builds and deploys apps.' },
  { name: 'Emergent', category: 'coding', site: 'emergent.sh', bestFor: 'Turning an app idea into a working first version', url: 'https://app.emergent.sh/?via=mike-holp', tools: ['Emergent'], blurb: 'An AI app builder that turns a prompt into a working app.' },
  { name: 'Google Gemini', category: 'coding', site: 'gemini.google.com', bestFor: 'Building and coding with Google’s models', url: 'https://g.co/g1referral/G68XU81Q', tools: ['Gemini', 'Google Gemini'], blurb: 'Google’s AI assistant and models.' },
  { name: 'Manus', category: 'coding', site: 'manus.im', bestFor: 'Handing off multi-step tasks across your apps', url: 'https://manus.im/invitation/DF5TX92CTYPP', tools: ['Manus'], blurb: 'A general AI agent that runs multi-step tasks and connects apps such as Gmail and Google Calendar.' },
  { name: 'Make.com', category: 'automation', recommended: true, site: 'make.com', bestFor: 'No-code automations between your apps', url: 'https://www.make.com/en/register?pc=mikeholp', tools: ['Make.com'], blurb: 'A visual, no-code platform for automating work across apps, with AI steps.' },
  { name: 'Vapi', category: 'automation', recommended: true, site: 'vapi.ai', bestFor: 'AI agents that answer and make phone calls', url: 'https://vapi.ai/?aff=mike9c', tools: ['Vapi'], blurb: 'A platform for building AI voice agents that answer and make phone calls.' },
  { name: 'Apify', category: 'automation', site: 'apify.com', bestFor: 'Scraping websites from code or an AI agent', url: 'https://www.apify.com?fpr=fklok2', tools: ['Apify', 'Apify Agent Skills'], blurb: 'Ready-made web scrapers, called Actors, that you can run from code or from an AI agent.' },
  { name: 'Firecrawl', category: 'automation', site: 'firecrawl.dev', bestFor: 'Turning websites into clean data for AI', url: 'https://firecrawl.link/mike-holp', tools: ['Firecrawl'], blurb: 'Scrapes and crawls websites into clean data for AI apps.' },
  { name: 'DataForSEO', category: 'seo', site: 'dataforseo.com', bestFor: 'SEO data in your agents, paid per request', url: 'https://try.dataforseo.com/70uqp0vd9ao3', tools: ['DataForSEO'], blurb: 'Pay-as-you-go APIs for search rankings, keywords and backlinks, with an MCP server for AI agents.' },
  { name: 'Treg', category: 'seo', site: 'treg.to', bestFor: 'Giving an agent many APIs through one token', url: 'https://www.treg.to/?ref=digitalnomad-2a5c2', tools: ['Treg'], blurb: 'A catalog of external APIs that an agent reaches through one connection and one token.' },
  { name: 'Trakkr', category: 'seo', site: 'trakkr.ai', bestFor: 'Seeing how AI assistants mention your brand', url: 'https://trakkr.ai/r/mikeholp87', tools: ['Trakkr'], blurb: 'Tracks how AI assistants mention your brand, with MCP servers for agents.' },
  { name: 'CrowdReply', category: 'seo', site: 'crowdreply.io', bestFor: 'Checking your visibility in AI search', url: 'https://crowdreply.io?via=mike98', tools: ['CrowdReply'], blurb: 'An AI search visibility tool.' },
  { name: 'HeyGen', category: 'video', recommended: true, site: 'heygen.com', bestFor: 'Avatar videos without filming yourself', url: 'https://www.heygen.com/?sid=rewardful&via=mike-holp', tools: ['HeyGen'], blurb: 'Makes AI avatar videos from a script, including a digital twin of you.' },
  { name: 'OpusClip', category: 'video', recommended: true, site: 'opus.pro', bestFor: 'Turning long videos into Shorts and Reels', url: 'https://www.opus.pro/?via=8b6827', tools: ['OpusClip', 'Opus Clip'], blurb: 'Cuts long videos into short clips for Shorts, Reels and TikTok.' },
  { name: 'Syllaby', category: 'video', recommended: true, site: 'syllaby.io', bestFor: 'Faceless social videos', url: 'https://www.syllaby.io/?via=mike26', tools: ['Syllaby'], blurb: 'Plans and produces faceless social videos with AI, including voice clones.' },
  { name: 'Pikzels', category: 'video', recommended: true, site: 'pikzels.com', bestFor: 'YouTube thumbnails', url: 'https://www.pikzels.com?via=mike76', tools: ['Pikzels'], blurb: 'Generates YouTube thumbnails with AI.' },
  { name: 'Gamma', category: 'video', site: 'gamma.app', bestFor: 'Slides and documents from a prompt', url: 'https://try.gamma.app/q9q68k9i00tu', tools: ['Gamma'], blurb: 'Creates presentations, documents and web pages from a prompt.' },
  { name: 'vidIQ', category: 'youtube', recommended: true, site: 'vidiq.com', bestFor: 'YouTube keyword research and video ideas', url: 'https://www.vidiq.com/mikeholp', tools: ['vidIQ', 'vidIQ MCP'], blurb: 'YouTube keyword research, channel analytics and video ideas.' },
  { name: 'TubeBuddy', category: 'youtube', recommended: true, site: 'tubebuddy.com', bestFor: 'YouTube SEO and thumbnail A/B tests', cta: 'See TubeBuddy plans', url: 'https://www.tubebuddy.com/pricing?a=digitalnomadventures', tools: ['TubeBuddy'], blurb: 'A browser extension for YouTube SEO, thumbnail A/B tests and bulk edits.' },
  { name: 'GetResponse', category: 'marketing', recommended: true, site: 'getresponse.com', bestFor: 'Email newsletters and automations', url: 'https://www.getresponse.com/?ab=TYTFh9kHv3', tools: ['GetResponse'], blurb: 'Email marketing with automations, landing pages and webinars.' },
  { name: 'SendPulse', category: 'marketing', recommended: true, site: 'sendpulse.com', bestFor: 'Email, SMS and chatbots in one place', url: 'https://www.sendpulse.com?p=68ef5bec898ba', tools: ['SendPulse'], blurb: 'Email, SMS and chatbot marketing in one platform.' },
  { name: 'Apollo', category: 'marketing', recommended: true, site: 'apollo.io', bestFor: 'Finding B2B leads and sending outreach', cta: 'Find leads with Apollo', url: 'https://get.apollo.io/1mpkcotn2pwa', tools: ['Apollo'], blurb: 'A B2B contact database for finding leads and sending outreach.' },
  { name: 'Hostinger', category: 'hosting', recommended: true, site: 'hostinger.com', bestFor: 'A VPS for self-hosting n8n and AI agents', cta: 'See Hostinger plans', url: 'https://www.hostinger.com?REFERRALCODE=5XNDIGITACZ9', tools: ['Hostinger', 'Hostinger VPS'], blurb: 'Web and VPS hosting. The n8n, OpenClaw and Hermes Agent videos link its VPS plans for self-hosting.' },
  { name: 'Bluehost', category: 'hosting', site: 'bluehost.com', bestFor: 'WordPress hosting', cta: 'See Bluehost plans', url: 'https://bluehost.sjv.io/k4Wm4v', tools: ['Bluehost AI Assistant'], blurb: 'Web hosting for WordPress sites, with an AI assistant in the dashboard.' },
  { name: 'Skool', category: 'business', recommended: true, site: 'skool.com', bestFor: 'Running a paid community with courses', cta: 'Start a Skool community', url: 'https://www.skool.com/signup?ref=8be413d469374945a9c1f8db3e5a92a0', tools: ['Skool'], blurb: 'The community platform AI Income Lab runs on, with courses, a forum and member levels.' },
  { name: 'Deel', category: 'business', recommended: true, site: 'deel.com', bestFor: 'Hiring and paying people in other countries', cta: 'Hire with Deel', url: 'https://get.deel.com/c4kz6nolu1bg', tools: ['Deel'], blurb: 'Hires and pays contractors and employees in other countries.' },
  { name: 'Fiverr', category: 'business', recommended: true, site: 'fiverr.com', bestFor: 'Hiring a freelancer for a single task', cta: 'Find a freelancer on Fiverr', url: 'https://www.fiverr.com/pe/VY9mgKZ', tools: ['Fiverr'], blurb: 'A marketplace for hiring freelancers by the gig.' },
];

export const logoSlug = affiliate => affiliate.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
