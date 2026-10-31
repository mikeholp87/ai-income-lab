// Caption file (SRT) to readable text, and text to watch-page paragraphs.
export function captionText(srt) {
  const lines = srt.replace(/\r/g, '').split('\n')
    .filter(line => line.trim() && !/^\d+$/.test(line.trim()) && !line.includes('-->'))
    .map(line => line.replace(/<[^>]+>/g, '').replace(/\[(music|applause|laughter)\]/gi, '').trim())
    .filter(Boolean);
  // Auto-generated tracks repeat the previous line as the next one starts; keep each line once.
  return lines.filter((line, index) => line !== lines[index - 1]).join(' ').replace(/\s+/g, ' ').trim();
}

// Auto captions mishear product names; "codec" is left alone because video guides use the real word.
// "school" is only corrected next to words that mean the Skool platform.
const terms = [[/\bcodeex\b/gi, 'Codex'], [/\b(?:cloud|clawed) code\b/gi, 'Claude Code'], [/\b(?:cloud|clawed) (opus|sonnet|fable|haiku|design|desktop|mythos|skills?)\b/gi, (match, word) => `Claude ${word[0].toUpperCase()}${word.slice(1)}`], [/\bclawed\b/gi, 'Claude'], [/\bopen code\b/gi, 'OpenCode'], [/\bversal\b/gi, 'Vercel'], [/\bchat GPT\b/gi, 'ChatGPT'], [/\bsuper ?base\b/gi, 'Supabase'], [/\bgrock ?(bot|pot)(s?)\b/gi, 'GrokBot$2'], [/\bgrock\b/gi, 'Grok'],
  [/\bschool (community|communities|members|platform|classroom|group)\b/gi, 'Skool $1'], [/\b(my|on|inside|join|free) school\b/gi, '$1 Skool'],
  [/\b(?:hey ?genen|hijen|hey ?jen|hey gen|hen)\b/gi, 'HeyGen'], [/\b(?:nan|n eight n)\b/gi, 'n8n'], [/\bmake com\b/gi, 'Make.com'], [/\bnine routers?\b/gi, '9Router'], [/\bvappy\b/gi, 'Vapi'], [/\bherder\b/gi, 'Herdr'],
  [/\b(?:11|eleven) labs\b/gi, 'ElevenLabs'], [/\bair table\b/gi, 'Airtable'], [/\b(?:appify|ampify)\b/gi, 'Apify'], [/\bdata for seo\b/gi, 'DataForSEO'], [/\bopen seo\b/gi, 'OpenSEO'], [/\bghosty\b/gi, 'Ghostty'], [/\bopen claw\b/gi, 'OpenClaw'],
  [/\bkimmy\b/gi, 'Kimi'], [/\bdeep seek\b/gi, 'DeepSeek'], [/\breplet\b/gi, 'Replit'], [/\bbase 44\b/gi, 'Base44'], [/\bkilo code\b/gi, 'KiloCode'], [/\bkilo claw\b/gi, 'KiloClaw'], [/\banti[- ]gravity\b/gi, 'Antigravity'],
  [/\bolama\b/gi, 'Ollama'], [/\bmind studio\b/gi, 'MindStudio'], [/\bnotebook lm\b/gi, 'NotebookLM'], [/\bsonet\b/gi, 'Sonnet'], [/\bwind surf\b/gi, 'Windsurf']];
export const fixTerms = text => terms.reduce((fixed, [pattern, term]) => fixed.replace(pattern, term), text);

// ponytail: fixed ~90-word paragraphs; auto captions have no paragraph breaks to follow.
export function transcriptParagraphs(text, size = 90) {
  const words = fixTerms(text).split(' ');
  const paragraphs = [];
  for (let start = 0; start < words.length;) {
    let end = Math.min(start + size, words.length);
    // Prefer to break after a sentence within the last 30 words of the chunk.
    for (let i = end; i > end - 30 && i > start && end < words.length; i -= 1) if (/[.!?]$/.test(words[i - 1])) { end = i; break; }
    paragraphs.push(words.slice(start, end).join(' '));
    start = end;
  }
  return paragraphs;
}
