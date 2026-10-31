import { campaignProperties, getCampaign, readingLink } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaOutbound } from './tracking.js';
import { addCopyButtons } from './copy-code.js';
import { showSubscribeNotice } from './subscribe-notice.js';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Cookieless page views and Core Web Vitals from real visitors, the same as the homepage sends.
injectAnalytics();
injectSpeedInsights();

const campaign = campaignProperties(getCampaign(window.location.search, []));
const properties = { ...campaign, page_path: window.location.pathname };
for (const image of document.querySelectorAll('picture[data-thumbnail] img')) {
  const fallback = () => {
    const source = image.previousElementSibling;
    if (!source) return;
    source.remove();
    // eslint-disable-next-line no-self-assign -- Reassign src to retry after removing the picture source.
    image.src = image.src;
  };
  image.addEventListener('error', fallback, { once: true });
  if (image.complete && !image.naturalWidth) fallback();
}
const viewEvent = window.location.pathname.startsWith('/watch/') ? 'video_page_view'
  : /^\/videos(?:\/|$)/.test(window.location.pathname) ? 'video_archive_view'
  : /^\/(?:privacy|terms)\.html$/.test(window.location.pathname) ? 'legal_page_view' : 'guide_view';
let viewed = false;

function recordView() {
  if (getTrackingConsent() !== 'granted') return;
  loadMarketingTracking();
  if (!viewed) viewed = trackGoogleEvent(viewEvent, properties);
}

for (const link of document.querySelectorAll('a[href]')) {
  link.href = readingLink(link.href, window.location.href);
  const target = new URL(link.href);
  if (target.origin === 'https://www.youtube.com') {
    link.addEventListener('click', () => {
      const videoId = target.pathname === '/watch' ? target.searchParams.get('v') || '' : '';
      const action = videoId ? 'watch_on_youtube'
        : target.searchParams.get('sub_confirmation') === '1' ? 'subscribe_on_youtube' : 'visit_youtube_channel';
      const placement = link.dataset.placement || (viewEvent === 'video_page_view' ? 'watch_video'
        : viewEvent === 'video_archive_view' ? 'video_archive' : 'written_guide');
      const event = { ...properties, placement, action, video_id: videoId, link_url: link.href, button_text: link.textContent.trim() };
      trackGoogleEvent('cta_click', event);
      trackGoogleEvent('youtube_outbound_clicked', event);
    });
  }
  if (target.origin !== 'https://www.skool.com' || !/^\/ai-automation-station-7346(?:\/|$)/.test(target.pathname)) continue;
  link.addEventListener('click', () => {
    const event = { ...properties, placement: link.dataset.placement || 'written_guide', ...(link.dataset.videoId ? { video_id: link.dataset.videoId } : {}), action: 'visit_skool', link_url: link.href, button_text: link.textContent.trim() };
    trackGoogleEvent('cta_click', event);
    trackGoogleEvent('skool_outbound_clicked', event);
    trackMetaOutbound(event);
  });
}

const banner = document.createElement('aside');
banner.className = 'reading-consent';
banner.setAttribute('aria-label', 'Privacy choices');
banner.innerHTML = '<p>Allow analytics &amp; marketing cookies? <a href="/privacy.html">Details</a></p><div><button type="button" data-consent="denied">Decline</button><button type="button" data-consent="granted">Allow both</button></div>';
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
// The Clipboard API needs a secure page; without it the commands stay selectable as before.
if (navigator.clipboard) addCopyButtons(document, navigator.clipboard);

if (showSubscribeNotice(document, window.location, window.history) === 'confirmed') {
  trackGoogleEvent('newsletter_confirmed', properties);
}

// Weekly build notes signup at the end of guides.
for (const form of document.querySelectorAll('form[data-subscribe]')) {
  let started = false;
  form.addEventListener('focusin', event => {
    if (!started && event.target.name === 'email') {
      started = trackGoogleEvent('form_start', { ...properties, placement: form.dataset.placement || 'guide_end' });
    }
  });
  form.addEventListener('submit', async event => {
  event.preventDefault();
  const status = form.querySelector('[role="status"]');
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Subscribing…';
  const fields = Object.fromEntries(new FormData(form));
  const result = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) }).then(response => response.ok ? response.json() : null).catch(() => null);
  button.disabled = false;
  if (!result) return void (status.textContent = 'That didn’t go through. Try again in a minute.');
  form.reset();
  status.textContent = 'Almost there. Check your inbox (and spam) and click the link to confirm your signup.';
  trackGoogleEvent('newsletter_signup', { ...properties, placement: form.dataset.placement || 'guide_end' });
  });
}
