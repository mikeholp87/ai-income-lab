import { topicFor } from './topics.js';

// Topic-matched next-step lines for videos the specific offers below do not match.
const topicLines = {
  'claude-code': 'Building with Claude Code? Bring your project to AI Income Lab and get help when it stalls.',
  'codex-opencode': 'Working in Codex or OpenCode? Share your build in AI Income Lab and compare setups with other members.',
  'n8n': 'Stuck on an n8n workflow? Post it in AI Income Lab and get help fixing it.',
  'make-com': 'Building in Make.com? Get step-by-step help with your scenario inside AI Income Lab.',
  'ai-agents': 'Setting up your own agents? See how members run theirs in AI Income Lab.',
  'ai-seo': 'Working on search and AI visibility? Learn the workflows with other site owners in AI Income Lab.',
  'make-money': 'Want to earn with what you build? Start with the courses in the AI Income Lab classroom.',
  'ai-website-builders': 'Building a site with AI? Get feedback on your draft inside AI Income Lab.',
  'ai-video': 'Making videos with AI? Swap workflows with other creators in AI Income Lab.',
  'new-models': 'Testing new models? Compare notes with other builders in AI Income Lab.',
};

// Both the landing page and server-rendered watch pages use the same membership claims.
export function videoOffer(title) {
  if (/\b(avatar|heygen)\b/i.test(title)) return {
    title: 'Create your own AI avatar videos',
    detail: 'Follow the Complete AI Avatar Video Course with HeyGen, ElevenLabs, and Make.com.',
    access: 'Included with Premium and VIP.',
  };
  if (/\bvapi\b|voice[ -]agents?/i.test(title)) return {
    title: 'Build your own voice agent',
    detail: 'Follow the VAPI AI Voice Agent Course and ask the community when you get stuck.',
    access: 'Unlocks at level 4 on Standard; immediate access with Premium and VIP.',
  };
  if (/\bn8n\b/i.test(title)) return {
    title: 'Start your next n8n workflow',
    detail: 'Explore the Ultimate N8N Template Library and adapt a workflow to your project.',
    access: 'The 6,400+ workflow library is included with VIP.',
  };
  if (/\bmake\.com\b|\bautomation\b/i.test(title)) return {
    title: 'Build your own business automation',
    detail: 'Start with the Beginner’s Automation Course in Make.com and get community help.',
    access: 'Unlocks at level 2 on Standard; immediate access with Premium and VIP.',
  };
  // Any Claude, Codex, OpenCode or coding-harness video: the classroom's Claude Code and Codex courses cover them.
  if (/\b(codex|claude|opencode|coding)\b/i.test(title)) return {
    title: 'Keep building with Claude Code and Codex',
    detail: 'Explore the coding tutorials and ask the community for help with your own project.',
    access: 'Explore course access and membership options on Skool.',
  };
  return {
    title: 'Put what you watched into practice',
    detail: topicLines[topicFor(title)?.slug] ?? 'Build your first useful AI workflow with help from AI Income Lab.',
    access: 'Membership starts at $29 a month.',
  };
}
