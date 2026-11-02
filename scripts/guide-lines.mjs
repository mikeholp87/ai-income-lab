// Pure helpers for `tag-youtube-descriptions.mjs --guide-links`: read the paste-ready lines from
// docs/youtube-description-links.md and put a video's line first in its YouTube description.

// Rows look like: | [Title](https://studio.youtube.com/video/<id>/edit) | `Written guide: …: https://…` |
// Returned in the file's order, which is the priority order (guides that link the video come first).
export function guideLines(markdown) {
  return [...markdown.matchAll(/studio\.youtube\.com\/video\/([\w-]{11})\/edit\) \| `([^`]+)` \|/g)].map(([, id, line]) => ({ id, line }));
}

// The page a line points at, without campaign tags, so a description that already links it is left alone.
export const linkedPage = line => line.match(/https:\/\/www\.ai-automation-station\.com(\/[^?\s]+)/)?.[1] ?? null;

// YouTube rejects descriptions over 5,000 characters or containing angle brackets.
const maxLength = 5000;

// Returns the new description, or null with a reason when the video should be skipped.
export function withGuideLine(description, line) {
  const page = linkedPage(line);
  if (!page) return { description: null, reason: 'no site link in the line' };
  if (description.includes(`ai-automation-station.com${page}`)) return { description: null, reason: 'already links this page' };
  if (/[<>]/.test(line)) return { description: null, reason: 'line contains < or >' };
  const next = description.trim() ? `${line}\n\n${description}` : line;
  if (next.length > maxLength) return { description: null, reason: `would exceed ${maxLength} characters` };
  return { description: next, reason: null };
}
