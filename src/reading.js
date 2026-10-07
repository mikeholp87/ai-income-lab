import { campaignProperties, getCampaign, readingLink } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaOutbound } from './tracking.js';

const campaign = campaignProperties(getCampaign(window.location.search, []));
const properties = { ...campaign, page_path: window.location.pathname };
let viewed = false;

function recordView() {
  if (getTrackingConsent() !== 'granted') return;
  loadMarketingTracking();
  if (!viewed) viewed = trackGoogleEvent('guide_view', properties);
}

for (const link of document.querySelectorAll('a[href]')) {
  link.href = readingLink(link.href, window.location.href);
  const target = new URL(link.href);
  if (target.origin !== 'https://www.skool.com' || !/^\/ai-automation-station-7346(?:\/|$)/.test(target.pathname)) continue;
  link.addEventListener('click', () => {
    const event = { ...properties, placement: 'written_guide', action: 'visit_skool', link_url: link.href, button_text: link.textContent.trim() };
    trackGoogleEvent('cta_click', event);
    trackGoogleEvent('skool_outbound_clicked', event);
    trackMetaOutbound(event);
  });
}

const banner = document.createElement('aside');
banner.className = 'reading-consent';
banner.setAttribute('aria-label', 'Privacy choices');
banner.innerHTML = '<p><strong>Analytics &amp; marketing.</strong> Allow Google Analytics and Meta Pixel? <a href="/privacy.html">Privacy details</a>.</p><div><button type="button" data-consent="denied">Decline</button><button type="button" data-consent="granted">Allow both</button></div>';
banner.hidden = getTrackingConsent() !== null;
document.body.append(banner);
const choices = document.createElement('button');
choices.type = 'button';
choices.textContent = 'Privacy choices';
document.querySelector('footer').append(choices);
choices.addEventListener('click', () => {
  banner.hidden = false;
  banner.querySelector('button').focus();
});
for (const button of banner.querySelectorAll('button')) button.addEventListener('click', () => {
  const restoreFocus = banner.contains(document.activeElement);
  setTrackingConsent(button.dataset.consent);
  if (button.dataset.consent === 'granted') recordView();
  else disableMarketingTracking();
  banner.hidden = true;
  if (restoreFocus) choices.focus();
});
recordView();
