const trackedParams = ['angle', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];

export function getCampaign(searchString, validAngles) {
  const search = new URLSearchParams(searchString);
  const requestedAngle = search.get('angle');
  return {
    angle: validAngles.includes(requestedAngle) ? requestedAngle : 'default',
    params: Object.fromEntries(trackedParams.flatMap(key => search.get(key) ? [[key, search.get(key)]] : [])),
  };
}

// Visitors from YouTube descriptions clicked "join the community", so they get the AI Income Lab hero.
// ?angle=community forces it for testing or other links.
export const wantsCommunity = campaign => campaign.angle === 'community' || campaign.params.utm_source?.toLowerCase() === 'youtube';

export function outboundUrl(base, campaign, extras = {}) {
  const url = new URL(base);
  Object.entries({ ...campaign.params, ...extras }).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

export function nextTabIndex(current, key, count) {
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  if (key === 'ArrowRight') return (current + 1) % count;
  if (key === 'ArrowLeft') return (current - 1 + count) % count;
  return current;
}
