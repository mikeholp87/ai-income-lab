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
const terms = [[/\bcodeex\b/gi, 'Codex'], [/\bcloud code\b/gi, 'Claude Code'], [/\bopen code\b/gi, 'OpenCode'], [/\bversal\b/gi, 'Vercel'], [/\bchat GPT\b/gi, 'ChatGPT'], [/\bsuperbase\b/gi, 'Supabase'], [/\bgrock\b/gi, 'Grok'], [/\bschool community\b/gi, 'Skool community']];
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
