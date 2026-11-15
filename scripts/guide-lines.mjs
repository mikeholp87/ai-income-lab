// Pure helpers for `tag-youtube-descriptions.mjs --guide-links`: read the lines from
// docs/youtube-description-links.md and add a video's link to the "Useful Links & Resources"
// section of its YouTube description, directly below the "Work with me → …" line or at the end.

// Rows look like: | [Title](https://studio.youtube.com/video/<id>/edit) | `Written guide: …: https://…` |
// Returned in the file's order, which is the priority order (guides that link the video come first).
export function guideLines(markdown) {
  return [...markdown.matchAll(/studio\.youtube\.com\/video\/([\w-]{11})\/edit\) \| `([^`]+)` \|/g)].map(([, id, line]) => ({ id, line }));
}

// The page a line points at, without campaign tags, so a description that already links it is left alone.
export const linkedPage = line => line.match(/https:\/\/www\.ai-automation-station\.com(\/[^?\s]+)/)?.[1] ?? null;

// Match the section's "Name → URL" style: a guide link, or the watch page when no guide matches.
export function resourceLine(line) {
  const url = line.match(/https:\/\/www\.ai-automation-station\.com\/\S+$/)?.[0];
  if (!url) return null;
  return `${line.startsWith('Written guide') ? 'Read the written guide' : 'Notes and chapters'} → ${url}`;
}

// YouTube rejects descriptions over 5,000 characters or containing angle brackets.
const maxLength = 5000;
const workWithMe = /^Work with me\b.*$/im;

// Returns the new description, or null with a reason when the video should be skipped.
export function withGuideLine(description, line) {
  const current = description ?? '';
  const page = linkedPage(line);
  const resource = resourceLine(line);
  if (!page || !resource) return { description: null, reason: 'no site link in the line' };
  if (current.includes(`ai-automation-station.com${page}`)) return { description: null, reason: 'already links this page' };
  if (/[<>]/.test(resource)) return { description: null, reason: 'line contains < or >' };
  const anchor = current.match(workWithMe);
  const at = anchor ? anchor.index + anchor[0].length : current.trimEnd().length;
  const next = anchor
    ? `${current.slice(0, at)}\n${resource}${current.slice(at)}`
    : `${current.trimEnd()}${current.trim() ? '\n\n' : ''}${resource}`;
  if (next.length > maxLength) return { description: null, reason: `would exceed ${maxLength} characters` };
  return { description: next, reason: null };
}

// For `--move-intro`: older descriptions open with the "Join the growing AI community ⤵️" line and its
// link, then the video's own text. Move that text above the community block, leaving every other line as is.
// Only plain text moves: a paragraph with a link (or the next emoji, Timestamps or hashtag section) ends it.
const communityBlock = /^Join the growing AI community ⤵️[ \t]*\n\S+[ \t]*$/m;
const sectionStart = /^\s*(\p{Extended_Pictographic}|Timestamps|Chapters|#)/iu;
export function withIntroAbove(description) {
  const current = description ?? '';
  const block = current.match(communityBlock);
  if (!block) return { description: null, reason: 'no community block' };
  const above = current.slice(0, block.index).trim();
  const paragraphs = current.slice(block.index + block[0].length).trim().split(/\n\s*\n/);
  let count = 0;
  while (count < paragraphs.length && !sectionStart.test(paragraphs[count]) && !/https?:\/\//.test(paragraphs[count])) count++;
  if (!count) return { description: null, reason: above ? 'text already above the community link' : 'no text below the community link' };
  const intro = paragraphs.slice(0, count).join('\n\n').trim();
  const rest = paragraphs.slice(count).join('\n\n');
  return { description: `${[above, intro].filter(Boolean).join('\n\n')}\n\n${block[0]}${rest ? `\n\n${rest}` : ''}`, reason: null };
}
