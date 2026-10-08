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
  if (/\b(codex|claude code)\b/i.test(title)) return {
    title: 'Keep building with Claude Code and Codex',
    detail: 'Explore the coding tutorials and ask the community for help with your own project.',
    access: 'Explore course access and membership options on Skool.',
  };
  return {
    title: 'Put what you watched into practice',
    detail: 'Bring your AI project to AI Income Lab for courses and community help when a build stalls.',
    access: 'Membership starts at $29 a month. Course access varies by plan.',
  };
}
