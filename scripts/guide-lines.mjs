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
