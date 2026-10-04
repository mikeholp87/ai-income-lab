const trackedParams = ['angle', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];

export function getCampaign(searchString, validAngles) {
  const search = new URLSearchParams(searchString);
  const requestedAngle = search.get('angle');
  return {
    angle: validAngles.includes(requestedAngle) ? requestedAngle : 'default',
    params: Object.fromEntries(trackedParams.flatMap(key => search.get(key) ? [[key, search.get(key)]] : [])),
  };
}

export function outboundUrl(base, campaign, extras = {}) {
  const url = new URL(base);
  Object.entries({ ...campaign.params, ...extras }).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

export function outboundProperties(campaign, { placement, plan, href, designVersion }) {
  return {
    action: 'visit_skool',
    placement,
    plan: plan || 'undecided',
    angle: campaign.angle,
    campaign: campaign.params.utm_campaign || 'direct',
    source: campaign.params.utm_source || 'direct',
    content: campaign.params.utm_content || 'none',
    link_url: href,
    design_version: designVersion,
  };
}
