// Verified VisiScan URLs for AAS referral links. Do not invent paths.
// Live checks on 19 Nov 2026 returned HTTP 200 for each of these.
export const visiscanOrigin = 'https://www.visiscan.app';
export const visiscanPaths = {
  tool: '/tools/ai-visibility-scanner',
  pricing: '/pricing',
  methodology: '/methodology',
  citationGap: '/research/citation-gap-worked-example',
  checklist: '/blog/ai-visibility-audit-checklist',
  about: '/about',
};

const allowed = new Set(Object.values(visiscanPaths));

export function visiscanUrl(path, pageSlug) {
  if (!pageSlug) throw new Error('visiscanUrl needs a page slug for utm_content');
  const url = new URL(path, visiscanOrigin);
  if (url.origin !== visiscanOrigin) throw new Error(`unverified VisiScan origin: ${url.origin}`);
  if (!allowed.has(url.pathname)) throw new Error(`unverified VisiScan path: ${url.pathname}`);
  url.searchParams.set('utm_source', 'ai-automation-station');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_content', pageSlug);
  return url.toString();
}

export function visiscanHref(path, pageSlug) {
  return visiscanUrl(path, pageSlug).replace(/&/g, '&amp;');
}
