import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Analytics, track } from '@vercel/analytics/react';
import { campaignProperties, getCampaign, outboundUrl, wantsCommunity } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaOutbound } from './tracking.js';
import { getCal } from './cal.js';
import { channelUrl, validFeed } from './youtube.js';
import { videoOffer } from './video-offer.js';
import { featuredThumbnail } from './thumbnail.js';
import { dotCounts, mediaKit } from './media-kit.js';
import youtubeSnapshot from './youtube-snapshot.json';
import sponsoredSnapshot from './sponsored-snapshot.json';
import './fonts.css';
import './styles.css';

const memberAvatars = Array.from({ length: 8 }, (_, index) => `/members/member-${index}.png`);

const skoolAboutUrl = 'https://www.skool.com/ai-automation-station-7346/about';
const skoolCommunityUrl = 'https://www.skool.com/ai-automation-station-7346';
// The plan picker works logged out and skips the About page's extra Join click.
const skoolPlansUrl = 'https://www.skool.com/ai-automation-station-7346/plans';
const subscribeUrl = `${channelUrl}?sub_confirmation=1`;
const githubUrl = 'https://github.com/mikeholp87';
const linkedinUrl = 'https://www.linkedin.com/in/mikeholp';
const xUrl = 'https://x.com/mikeholp';
const emailIcon = 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217L8 8.5 0 4.217zm0 1.383v6.817l4.928-3.48zM5.711 9.847 0 13.883A2 2 0 0 0 2 14h12a2 2 0 0 0 2-.117l-5.711-4.036L8 11.5zM16 5.383l-4.928 3.48L16 12.2z';
// Footer social links; icon paths are Bootstrap Icons 1.11.3 (MIT), drawn on a 16×16 grid.
const socialLinks = [
  ['YouTube', channelUrl, 'M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z'],
  ['GitHub', githubUrl, 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8'],
  ['LinkedIn', linkedinUrl, 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'],
  ['X', xUrl, 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z'],
];
// cal.com event for sponsorship and collab intro calls.
const calLink = 'beremote/discovery-call';
const bookingUrl = `https://cal.com/${calLink}`;

const googleEventNames = {
  'CTA Clicked': 'cta_click',
};

function trackEvent(name, properties = {}) {
  track(name, properties);
  trackGoogleEvent(googleEventNames[name] || name.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase(), properties);
}

function trackClick(placement, buttonText, url, action) {
  return () => trackEvent('CTA Clicked', { button_text: buttonText, link_url: url, placement, action });
}

function trackCommunityVisit(placement, buttonText, url = skoolAboutUrl, videoId) {
  const properties = { ...campaignProperties(getCampaign(window.location.search, ['community'])), ...(videoId ? { video_id: videoId } : {}), content_name: 'AI Income Lab membership', content_category: 'membership', button_text: buttonText, link_url: url, placement };
  trackEvent('CTA Clicked', { ...properties, action: 'visit_skool' });
  trackEvent('Skool Outbound Clicked', properties);
  trackMetaOutbound(properties);
}

function ConsentBanner({ campaign, campaignReady }) {
  const [open, setOpen] = useState(false);
  const banner = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => {
    setOpen(getTrackingConsent() === null);
    if (getTrackingConsent() === 'granted') loadMarketingTracking();
    const reopen = () => { returnFocus.current = document.activeElement; setOpen(true); };
    window.addEventListener('open-privacy-choices', reopen);
    return () => window.removeEventListener('open-privacy-choices', reopen);
  }, []);

  useEffect(() => {
    if (open && returnFocus.current) banner.current?.querySelector('button').focus();
  }, [open]);

  useEffect(() => {
    if (campaignReady && getTrackingConsent() === 'granted') trackGoogleEvent('campaign_landing_viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', content: campaign.params.utm_content || 'none' });
  }, [campaign, campaignReady]);

  function choose(value) {
    const previous = getTrackingConsent();
    setTrackingConsent(value);
    if (value === 'granted') {
      loadMarketingTracking();
      if (previous !== 'granted') trackGoogleEvent('campaign_landing_viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', content: campaign.params.utm_content || 'none' });
    }
    else disableMarketingTracking();
    if (banner.current?.contains(document.activeElement)) {
      (returnFocus.current || document.getElementById('main-content'))?.focus({ preventScroll: true });
    }
    setOpen(false);
  }

  if (!open) return null;
  return <aside ref={banner} className="consent-banner" aria-label="Privacy choices"><p>Allow analytics &amp; marketing cookies? <a href="/privacy.html">Details</a></p><div className="consent-actions"><button type="button" onClick={() => choose('denied')}>Decline</button><button type="button" className="consent-accept" onClick={() => choose('granted')}>Allow both</button></div></aside>;
}

// Built-in values render first; /api/youtube replaces the keyed ones with live channel counts.
// The member count comes from Skool, so it has no key and stays static.
const stats = [
  ['2,900+', 'community members'],
  ['5.1K', 'YouTube subscribers', 'subscribers'],
  ['498K', 'video views', 'views'],
  ['336', 'videos published', 'videos'],
];

const tools = [
  {
    name: 'TubeAnalytics',
    url: 'https://www.tubeanalytics.net',
    image: '/tools/tubeanalytics.webp',
    size: [1600, 1000],
    tagline: 'YouTube analytics for creators.',
    copy: 'See why growth slowed, where viewers drop off, which competitors are pulling ahead, and which topics deserve your next upload.',
    facts: ['Real CPM and RPM for connected channels', '180+ registered creators', '7-day free trial, plans from $19 a month'],
    cta: 'Start a free trial',
    note: 'Payment details required. Cancel before the trial ends to avoid a charge.',
  },
  {
    name: 'VisiScan',
    url: 'https://www.visiscan.app',
    image: '/tools/visiscan.webp',
    size: [1734, 1278],
    tagline: 'See whether AI recommends your business.',
    copy: 'VisiScan asks AI engines like ChatGPT, Claude, and Perplexity the questions your buyers ask, then shows who gets named, who gets recommended instead, and what to fix.',
    facts: ['Free scan, no signup', 'Full report for $49, paid once', 'Weekly monitoring from $29 a month'],
    cta: 'Run a free scan',
  },
];

const repos = [
  { name: 'solar-business-directory', copy: 'Next.js directory of UK solar installers, with lead capture, an installer portal, and Stripe billing.', language: 'TypeScript', year: 2026, live: 'https://solar-business-directory.vercel.app' },
  { name: 'seo-tool', copy: 'SEO Scout: paste a URL, get a scored audit across eight categories with the steps to fix each issue.', language: 'TypeScript', year: 2026 },
  { name: 'ai-income-lab', copy: 'The source for this page. React and Vite on Vercel, with a YouTube feed that refreshes daily.', language: 'JavaScript', year: 2026 },
];

const plans = [
  { name: 'Standard', price: 29, fit: 'Self-directed learners happy to unlock courses as they participate.', features: ['Community, courses, and tutorials', 'Runable course', 'Beginner’s Automation Course (unlocks at level 2)', 'VAPI AI Voice Agent Course (unlocks at level 4)'] },
  { name: 'Premium', price: 49, fit: 'Builders who want immediate course access and AI avatar training.', features: ['Everything in Standard', 'Immediate access to the beginner and VAPI voice-agent courses', 'Complete AI Avatar Video Course'] },
  { name: 'VIP', price: 89, fit: 'Builders who want weekly coaching and the full template library.', features: ['Everything in Premium', 'Weekly coaching', '6,400+ n8n templates', 'Software deals'] },
];

const timeline = [
  ['2013', 'Shipped my first iOS apps in Objective-C'],
  ['2014', 'Rebuilt Tetris in Swift the year it came out'],
  ['2016', 'Built an iOS client for OBD car devices'],
  ['2025', 'Started AI Automation Station on YouTube'],
  ['Now', 'Building TubeAnalytics and VisiScan, and hosting AI Income Lab'],
];

const faqs = [
  ['What do I get in AI Income Lab that the videos don’t cover?', 'The videos show what a tool can do. AI Income Lab adds step-by-step courses, templates, and a community where you can ask questions while you build. VIP adds weekly coaching.'],
  ['What does AI Income Lab cost?', 'Standard is $29 a month, Premium $49, and VIP $89. Annual billing is also available on Skool: $290, $490, or $890 a year, respectively. You can cancel before the next billing period from your Skool account.'],
  ['How do course unlocks work?', 'On Standard, Beginner’s Automation Course unlocks at Skool level 2 and VAPI AI Voice Agent Course at level 4. Premium and VIP include immediate access to both, plus Complete AI Avatar Video Course. The Runable course is available to all members on every plan. VIP also includes Ultimate N8N Template Library with 6,400+ workflows.'],
  ['What tools will I need, and can they cost extra?', 'It depends on the build. Automation hosting, AI API usage, and other software can cost extra. Each video lists what it uses, so check before you buy anything.'],
  ['Do I need to code to follow your videos?', 'No. Many videos use no-code tools like n8n and Make.com. The Claude Code, Codex, and OpenCode builds run in a terminal, and I show every setup step on screen.'],
  ['How often do you post?', 'Most days. Subscribe on YouTube to see new uploads first. The latest videos on this page refresh once a day.'],
  ['Is income guaranteed if I join?', 'No. The training shows you how to build useful AI systems. Results depend on your project, your experience, and the time you put in.'],
];

const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const viewFormat = new Intl.NumberFormat('en', { notation: 'compact' });
const formatViews = views => `${viewFormat.format(views)} ${views === 1 ? 'view' : 'views'}`;
// Each video's page on this site; YouTube only when it blocks embedding (the watch page would 404).
const watchUrl = video => video.embeddable === false ? `https://www.youtube.com/watch?v=${video.id}` : `/watch/${video.id}`;
const newTab = video => video.embeddable === false ? { target: '_blank', rel: 'noreferrer' } : {};

function useYouTubeFeed() {
  const [feed, setFeed] = useState({ ...youtubeSnapshot, failed: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/youtube', { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response.status))
      .then(next => { if (validFeed(next)) setFeed({ ...next, failed: false }); })
      .catch(() => {}); // Keep the prerendered snapshot when the live feed is unavailable.
    return () => controller.abort();
  }, []);
  return feed;
}

// Same pattern as the feed: the build's list renders first, the daily server list replaces it.
function useSponsoredVideos() {
  const [videos, setVideos] = useState(sponsoredSnapshot);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/videos?sponsored', { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(response.status))
      .then(next => { if (Array.isArray(next) && next.every(video => /^[\w-]{11}$/.test(video?.id) && typeof video.title === 'string')) setVideos(next); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return videos;
}

// eyebrow names the section; accent is the headline's closing clause, set in the signal color.
function SectionHead({ eyebrow, title, accent, children }) {
  return (
    <div className="section-head reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title} <span className="accent">{accent}</span></h2>
      {children && <p className="lede">{children}</p>}
    </div>
  );
}

const navLinks = [['#community', 'Plans'], ['#latest', 'Videos'], ['#guides', 'Guides'], ['#tools', 'Tools'], ['#about', 'About'], ['#work-together', 'Contact']];
const navIds = navLinks.map(([href]) => href.slice(1));

// Sections fade up once as they scroll into view. index.html only hides them while this is expected to run.
function useScrollReveal() {
  useEffect(() => {
    window.__revealReady = true;
    const targets = document.querySelectorAll('.reveal, .reveal-group');
    const show = target => target.classList.add('is-visible');
    if (!('IntersectionObserver' in window)) return targets.forEach(show);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

// The nav link for the section currently under the header.
function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function VideoNextStep({ video, campaign }) {
  const offer = videoOffer(video.title);
  const url = outboundUrl(skoolPlansUrl, campaign);
  return <aside className="video-next-step" aria-label="Build with the Skool community">
    <p className="next-step-access">{offer.access}</p>
    <a href={url} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('featured_video', 'Join AI Income Lab', url, video.id)}>Join AI Income Lab ↗</a>
  </aside>;
}

function swapToJpegThumbnail(event, id) {
  const image = event.currentTarget;
  if (image.src.endsWith('/hqdefault.jpg')) return;
  image.removeAttribute('srcset');
  image.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function FeaturedVideo({ video, campaign, playButtonRef }) {
  const [playing, setPlaying] = useState(false);
  if (!video) return <div className="player"><div className="player-screen is-loading" /><div className="player-meta"><span className="skeleton-line" /><span className="skeleton-line short" /></div></div>;

  function play() {
    setPlaying(true);
    trackEvent('Video Played', { placement: 'latest', video_id: video.id });
  }

  return (
    <article className="player">
      <div className="player-screen">
        {playing
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          : <button ref={playButtonRef} type="button" onClick={play} aria-label={`Play ${video.title}${video.duration ? `, ${video.duration}` : ''}`}>
              <img
                {...featuredThumbnail(video.id)}
                sizes="(max-width: 640px) calc(100vw - 34px), (max-width: 960px) calc(100vw - 50px), (max-width: 1168px) calc((100vw - 96px) / 2 - 2px), 534px"
                onError={event => swapToJpegThumbnail(event, video.id)}
                alt="" width="1280" height="720" fetchPriority="high" decoding="async"
              />
              <span className="play-key" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
              {video.duration && <span className="duration">{video.duration}</span>}
            </button>}
      </div>
      <div className="player-meta">
        <p className="meta-row"><time dateTime={video.published}>{dateFormat.format(new Date(video.published))}</time><span>{formatViews(video.views)}</span></p>
        <h2><a href={watchUrl(video)} {...newTab(video)} onClick={trackClick('latest', video.title, watchUrl(video), 'watch_video')}>{video.title}</a></h2>
        <VideoNextStep video={video} campaign={campaign} />
      </div>
    </article>
  );
}

function VideoCard({ video, placement }) {
  return (
    <a className="video-card" href={watchUrl(video)} {...newTab(video)} onClick={trackClick(placement, video.title, watchUrl(video), 'watch_video')}>
      <span className="thumb-frame">
        <img src={`https://i.ytimg.com/vi_webp/${video.id}/hqdefault.webp`} srcSet={`https://i.ytimg.com/vi_webp/${video.id}/mqdefault.webp 320w, https://i.ytimg.com/vi_webp/${video.id}/hqdefault.webp 480w`} sizes="(max-width: 640px) calc((100vw - 46px) * 2 / 5), (max-width: 960px) calc((100vw - 72px) / 2), (max-width: 1168px) calc((100vw - 96px) / 3), 357px" onError={event => swapToJpegThumbnail(event, video.id)} alt="" width="480" height="270" loading="lazy" decoding="async" />
        {video.duration && <span className="duration">{video.duration}</span>}
      </span>
      <p className="meta-row"><time dateTime={video.published}>{dateFormat.format(new Date(video.published))}</time><span>{formatViews(video.views)}</span></p>
      <h3>{video.title}</h3>
    </a>
  );
}

function VideoGrid({ videos, failed }) {
  // The featured slot above already shows the error and a YouTube link.
  if (failed) return null;
  const items = videos ? videos.slice(1) : Array(6).fill(null);
  return (
    <ul className="video-grid reveal-group" aria-busy={!videos}>
      {items.map((video, index) => video
        ? <li key={video.id}><VideoCard video={video} placement="latest_posts" /></li>
        : <li key={index} className="video-card is-loading" aria-hidden="true"><span className="thumb" /><span className="skeleton-line" /><span className="skeleton-line short" /></li>)}
    </ul>
  );
}

const arrowKeys = { ArrowLeft: -1, ArrowRight: 1 };

// Dot and legend colors, brightest first; the largest share gets the brand color.
const tones = ['var(--signal)', 'var(--text)', 'var(--body)', 'var(--muted)', '#6b6b66', '#52524e', '#3d3d39'];

function MediaKit() {
  const [tab, setTab] = useState(0);
  const [shot, setShot] = useState(0);
  const studio = useRef(null);
  const view = mediaKit.tabs[tab];
  const dots = dotCounts(view.rows.map(([, share]) => share)).flatMap((count, tone) => Array(count).fill(tone));
  const shots = mediaKit.screenshots;
  const step = by => setShot(index => (index + by + shots.length) % shots.length);
  return (
    <section className="section" id="media-kit">
      <div className="shell">
        <div className="media-kit-head">
          <SectionHead eyebrow="Media kit" title="Audience" accent="insights.">Real numbers from YouTube Studio, {mediaKit.period}.</SectionHead>
          {(mediaKit.pdf || shots.length > 0) && <div className="button-row reveal">
            {mediaKit.pdf && <a className="button button-primary" href={mediaKit.pdf} download onClick={trackClick('media_kit', 'Download media kit', mediaKit.pdf, 'download_media_kit')}>Download media kit</a>}
            {shots.length > 0 && <button type="button" className="button button-quiet" onClick={() => { setShot(0); studio.current.showModal(); trackEvent('Studio Screenshots Opened'); }}>See the Studio screenshots</button>}
          </div>}
        </div>
        <div className="stats media-kit-stats reveal"><dl>{mediaKit.stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
        <div className="audience reveal">
          <div>
            <div className="dot-grid" aria-hidden="true">{dots.map((tone, index) => <span key={index} style={{ background: tones[tone] }} />)}</div>
            <p className="fine-print">Each dot is 1% of {view.unit}.</p>
          </div>
          <div>
            <div className="audience-tabs" role="group" aria-label="Audience breakdown">{mediaKit.tabs.map((item, index) => <button key={item.label} type="button" aria-pressed={index === tab} onClick={() => setTab(index)}>{item.label}</button>)}</div>
            <div aria-live="polite">
              <h3>{view.headline}</h3>
              <ul className="audience-list">{view.rows.map(([label, share], index) => <li key={label}><span className="swatch" style={{ background: tones[index] }} aria-hidden="true" />{label}<span>{share}%</span></li>)}</ul>
            </div>
          </div>
        </div>
      </div>
      {shots.length > 0 && <dialog ref={studio} className="studio-shots" aria-label="YouTube Studio screenshots" onClick={event => event.target === event.currentTarget && studio.current.close()} onKeyDown={event => shots.length > 1 && event.key in arrowKeys && step(arrowKeys[event.key])}>
        <div className="studio-bar"><p>YouTube Studio, {shot + 1} of {shots.length}</p><button type="button" onClick={() => studio.current.close()}>Close ×</button></div>
        <div className="studio-frame">
          <img src={shots[shot].src} alt={shots[shot].alt} width={shots[shot].width} height={shots[shot].height} loading="lazy" decoding="async" />
          {shots.length > 1 && <>
            <button type="button" className="studio-arrow" onClick={() => step(-1)} aria-label="Previous screenshot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
            <button type="button" className="studio-arrow next" onClick={() => step(1)} aria-label="Next screenshot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg></button>
          </>}
        </div>
        {shots.length > 1 && <div className="studio-dots">{shots.map((item, index) => <button key={item.src} type="button" aria-label={`Screenshot ${index + 1}`} aria-current={index === shot} onClick={() => setShot(index)} />)}</div>}
      </dialog>}
    </section>
  );
}

// The calendar loads once it nears the screen (and only while its tab is showing); the link below
// it is a real cal.com link, so booking still works without JavaScript or if the embed is blocked.
function BookingCalendar({ campaign }) {
  const box = useRef(null);
  const started = useRef(false);
  const booked = useRef(false);
  const attributedBookingUrl = outboundUrl(bookingUrl, campaign, { utm_source: campaign.params.utm_source || 'ai-automation-station', utm_medium: campaign.params.utm_medium || 'website', utm_content: 'booking' });

  useEffect(() => {
    if (started.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true; // StrictMode runs effects twice in development
      observer.disconnect();
      startCalendar();
    }, { rootMargin: '600px 0px' });
    observer.observe(box.current);
    return () => observer.disconnect();
  });

  function startCalendar() {
    const cal = getCal();
    cal('init', 'booking', { origin: 'https://cal.com' });
    cal.ns.booking('inline', { elementOrSelector: '#booking-calendar', calLink: attributedBookingUrl.replace('https://cal.com/', ''), config: { layout: 'month_view', theme: 'dark' } });
    cal.ns.booking('ui', { theme: 'dark', cssVarsPerTheme: { dark: { 'cal-brand': '#ff6846' } }, hideEventTypeDetails: false, layout: 'month_view' });
    cal.ns.booking('on', { action: 'bookingSuccessfulV2', callback: () => {
      if (booked.current) return;
      booked.current = true;
      trackEvent('Call Requested', { placement: 'booking', device: window.matchMedia('(max-width: 640px)').matches ? 'mobile' : 'desktop', campaign: campaign.params.utm_campaign || 'direct' });
    } });
  }

  return (
    <>
      <div className="booking-calendar" id="booking-calendar" ref={box} role="region" aria-label="Book an intro call" tabIndex="0" />
      <a className="text-link" href={attributedBookingUrl} target="_blank" rel="noreferrer">Calendar not loading? Book on cal.com ↗</a>
    </>
  );
}

// Posts to /api/contact; if that fails, the visitor still gets a mailto link with their message in it.
function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [mailto, setMailto] = useState('mailto:automojic@proton.me');

  async function send(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setMailto(`mailto:automojic@proton.me?subject=${encodeURIComponent(fields.topic || 'Website message')}&body=${encodeURIComponent(`${fields.message}\n\n${fields.name}`)}`);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) });
      if (!res.ok) throw new Error(res.status);
      setStatus('sent');
      trackEvent('Message Sent', { placement: 'contact' });
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') return <p className="contact-sent" role="status">Message sent. I&rsquo;ll reply to the email you gave.</p>;
  return (
    <form className="contact-form" onSubmit={send}>
      <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label className="contact-wide">What it&rsquo;s about (optional)<input name="topic" maxLength={120} placeholder="Sponsored video, collab, membership…" /></label>
      <label className="contact-wide">Message<textarea name="message" rows="5" required maxLength={5000} placeholder="Your product or idea, timeline, and budget if you have one." /></label>
      <label className="contact-trap" aria-hidden="true">Leave this empty<input name="website" tabIndex="-1" autoComplete="off" /></label>
      <button className="button button-primary contact-wide" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
      {status === 'failed' && <p className="contact-wide support-note" role="alert">That didn&rsquo;t send. <a href={mailto}>Email me instead</a>; your message is already filled in.</p>}
    </form>
  );
}

function ContactOptions({ campaign }) {
  const [mode, setMode] = useState('call');
  return (
    <>
      <div className="audience-tabs contact-tabs" role="group" aria-label="How to get in touch">{[['call', 'Book a call'], ['message', 'Send a message']].map(([key, label]) => <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)}>{label}</button>)}</div>
      <div hidden={mode !== 'call'}><BookingCalendar campaign={campaign} /></div>
      <div hidden={mode !== 'message'}><ContactForm /></div>
    </>
  );
}

function CommunityVideo() {
  const video = useRef(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    video.current?.play()?.catch(() => {}); // Native controls remain available if playback is blocked.
  }

  return (
    <figure className="community-video">
      <div className="player-screen">
        <video ref={video} controls={started} preload="none" loading="lazy" playsInline poster="/hero-video-poster.webp" width="1280" height="720" aria-label="A look inside AI Income Lab" onPlay={() => trackEvent('Hero Video Played', { placement: 'community' })} onEnded={() => trackEvent('Hero Video Completed', { placement: 'community' })}>
          <source src="/hero-video.mp4" type="video/mp4" />
          <track kind="captions" src="/hero-video.en.vtt" srcLang="en" label="English" default />
        </video>
        {!started && <button type="button" className="play-overlay" onClick={start} aria-label="Play the 14-second tour of AI Income Lab, sound on"><span className="play-key" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span></button>}
      </div>
      <figcaption>A 14-second look inside AI Income Lab</figcaption>
    </figure>
  );
}

function App() {
  const [campaign, setCampaign] = useState(() => getCampaign('', []));
  const [campaignReady, setCampaignReady] = useState(false);
  const videoPlayButton = useRef(null);
  const { videos, channel, failed } = useYouTubeFeed();
  const sponsoredVideos = useSponsoredVideos();
  const latest = videos?.[0];

  useEffect(() => {
    setCampaign(getCampaign(window.location.search, ['community']));
    setCampaignReady(true);
  }, []);

  useEffect(() => {
    if (!campaignReady) return undefined;
    track('Campaign Landing Viewed', { angle: campaign.angle, source: campaign.params.utm_source || 'direct', campaign: campaign.params.utm_campaign || 'direct', content: campaign.params.utm_content || 'none', hero: wantsCommunity(campaign) ? 'community_youtube' : 'community' });
    let engaged = false;
    const markEngaged = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (!engaged && scrollable > 0 && window.scrollY / scrollable >= .5) {
        engaged = true;
        trackEvent('Engaged Visit', { signal: '50_percent_scroll', angle: campaign.angle });
      }
    };
    const timer = window.setTimeout(() => {
      if (!engaged) {
        engaged = true;
        trackEvent('Engaged Visit', { signal: '30_seconds', angle: campaign.angle });
      }
    }, 30000);
    window.addEventListener('scroll', markEngaged, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('scroll', markEngaged); };
  }, [campaign, campaignReady]);

  useEffect(() => {
    if (!campaignReady) return undefined;
    const pricing = document.getElementById('pricing');
    if (!pricing) return undefined;
    let viewed = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !viewed) {
        viewed = true;
        trackEvent('View Pricing', { angle: campaign.angle });
        if (getTrackingConsent() === 'granted' && window.__marketingTrackingActive && typeof window.fbq === 'function') window.fbq('track', 'ViewContent', { content_name: 'Pricing', content_category: 'membership' });
      }
    }, { threshold: .25 });
    observer.observe(pricing);
    return () => observer.disconnect();
  }, [campaign, campaignReady]);

  const aboutUrl = outboundUrl(skoolAboutUrl, campaign);
  const communityUrl = outboundUrl(skoolCommunityUrl, campaign);
  const plansUrl = outboundUrl(skoolPlansUrl, campaign);
  const communityHero = wantsCommunity(campaign);
  const active = useActiveSection(navIds);
  useScrollReveal();
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="scroll-progress" aria-hidden="true" />
    <header className="site-header" id="top">
      <div className="nav shell">
      <a className="brand" href="#top" aria-label="AI Income Lab, home"><span aria-hidden="true" />AI Income Lab</a>
      <nav className="nav-links" aria-label="Sections">{navLinks.map(([href, label]) => <a key={href} href={href} aria-current={active === href.slice(1) ? 'location' : undefined}>{label}</a>)}</nav>
      <div className="nav-actions">
        <a className="button button-primary nav-join" aria-label="Join AI Income Lab" href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('navigation', 'Join AI Income Lab', plansUrl)}>Join <span className="nav-join-name">AI Income Lab</span> ↗</a>
        <details className="nav-mobile" onKeyDown={event => {
          if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary').focus(); }
        }}><summary>Menu</summary><nav aria-label="Sections">{navLinks.map(([href, label]) => <a key={href} href={href} onClick={event => { event.currentTarget.closest('details').open = false; }}>{label}</a>)}</nav></details>
      </div>
      </div>
    </header>

    <main>
      <section className="hero shell" id="main-content" tabIndex="-1">
        <div className="hero-grid">
        <div className="hero-copy">
        {communityHero ? (
          <>
          <h1><span>Build what you</span> <span className="accent">just watched.</span></h1>
          </>
        ) : (
          <>
          <h1><span>Build real AI</span> <span className="accent">automations.</span></h1>
          </>
        )}
        <p className="hero-text"><strong>AI Income Lab is the paid community from the AI Automation Station YouTube channel.</strong> Step-by-step courses, reusable templates, and 2,900+ members, hosted by Mike Holp.</p>
        <nav className="button-row hero-actions" aria-label="Choose your next step">
          <a className="button button-primary" href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('hero', 'Join AI Income Lab', plansUrl)}>Join AI Income Lab ↗</a>
          <a className="button button-quiet" href="#featured-video" onClick={() => {
            trackClick('hero', 'Watch a free build', '#featured-video', 'explore_video')();
            videoPlayButton.current?.click();
          }}>Watch a free build</a>
        </nav>
        <p className="fine-print hero-reassurance">From $29/month. Cancel anytime.</p>
        </div>
        <div className="hero-preview" id="featured-video"><FeaturedVideo video={latest} campaign={campaign} playButtonRef={videoPlayButton} /></div>
        </div>
      </section>

      <section className="course-promo shell" aria-labelledby="runable-course-title">
        <div className="course-promo-card">
          <img className="course-promo-image" src="/runable-course.webp" srcSet="/runable-course-640.webp 640w, /runable-course.webp 1200w" sizes="(max-width: 640px) calc(100vw - 68px), (max-width: 960px) calc(100vw - 116px), (max-width: 1168px) calc(100vw - 52px), 1116px" alt="Runable website-building course, featuring an AI Growth Audit business website with payments and a customer portal." width="1200" height="618" loading="lazy" decoding="async" />
          <div className="course-promo-content">
            <p className="eyebrow course-access">Included for all members</p>
            <h2 id="runable-course-title">Build an AI website in Runable.</h2>
            <p className="course-promo-copy">Create and launch an AI-powered business website, from idea to live site. Take the course inside AI Income Lab, included for all members.</p>
            <ul className="course-outcomes" aria-label="What you’ll build">
              <li>Build a business website in Runable.</li>
              <li>Add AI features to your website.</li>
              <li>Launch your finished site online.</li>
            </ul>
            <div className="course-promo-action">
              <a className="button button-primary" href={communityUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('runable_course', 'Join AI Income Lab', communityUrl)}>Join AI Income Lab ↗</a>
              <p className="fine-print">Included with every AI Income Lab plan, from $29/month.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Community and channel numbers">
        <dl className="shell reveal-group">{stats.map(([value, label, key]) => <div key={label}><dt>{label}</dt><dd>{Number.isFinite(channel?.[key]) ? viewFormat.format(channel[key]) : value}</dd></div>)}</dl>
      </section>

      <section className="section band" id="community">
        <div className="shell community-grid">
          <div>
            <SectionHead eyebrow="Plans" title="Your next build," accent="with support.">Join 2,900+ members in the AI Automation Station community. Choose the courses, templates, and support that fit your next project.</SectionHead>
            <div className="members">
              <span className="avatars" aria-hidden="true">{memberAvatars.map((src, index) => <img key={src} src={src} alt="" width="32" height="32" loading="lazy" decoding="async" style={{ zIndex: memberAvatars.length - index }} />)}</span>
              <p>Some of the members building AI workflows on Skool</p>
            </div>
            <ul className="plan-list" id="pricing" aria-label="AI Income Lab plans">
              {plans.map(plan => (
                <li key={plan.name}>
                  <div>
                    <h3>{plan.name}</h3>
                    <p className="plan-fit"><strong>Best for:</strong> {plan.fit}</p>
                    <ul className="plan-features">{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
                    <a className="plan-link" href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('pricing', `Choose ${plan.name}, $${plan.price}/month`, plansUrl)}>Choose {plan.name}, ${plan.price}/month ↗</a>
                  </div>
                  <p className="plan-price"><strong>${plan.price}</strong> a month</p>
                </li>
              ))}
            </ul>
            <p className="fine-print">Monthly prices shown; annual billing is available. Levels are your Skool community level. Choose your plan and billing period on Skool, and cancel anytime from your Skool account.</p>
            <p className="community-help">Comparing plans? <a href="mailto:automojic@proton.me?subject=AI%20Income%20Lab%20plans">Ask which plan fits your project</a>.</p>
          </div>
          <div className="reveal">
            <CommunityVideo />
            <div className="course-preview">
              <h3>Inside the classroom</h3>
              <ul>
                <li><strong>Runable Course</strong><span>Build and launch an AI-powered business website.</span></li>
                <li><strong>Beginner’s Automation Course</strong><span>Build simple business automations in Make.com.</span></li>
                <li><strong>Claude Code &amp; Skills / Codex Tutorials &amp; Courses</strong><span>Follow coding workflows, prompts, and practical lessons.</span></li>
                <li><strong>Complete AI Avatar Video Course</strong><span>Create an avatar, generate a voice, and automate the workflow with HeyGen, ElevenLabs, and Make.com.</span></li>
                <li><strong>VAPI AI Voice Agent Course</strong><span>Build a voice agent with VAPI and ElevenLabs.</span></li>
                <li><strong>Ultimate N8N Template Library</strong><span>6,400+ workflows for marketing, sales, operations, and data processing.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="shell faq-grid">
          <SectionHead eyebrow="FAQ" title="Questions" accent="people ask." />
          <div className="faq-list reveal-group">{faqs.map(([question, answer]) => <details key={question} onToggle={event => event.currentTarget.open && trackEvent('FAQ Opened', { question })}><summary>{question}<span className="faq-icon" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="section latest" id="latest">
        <div className="shell">
          <div className="latest-intro">
            <div>
              <SectionHead eyebrow="Latest videos" title="More real" accent="builds.">Watch another build, or follow a written guide for your own project.</SectionHead>
              <p className="feed-note"><span className="live-dot" aria-hidden="true" />Pulled from YouTube daily</p>
              <div className="button-row">
                <a className="button button-primary" href={subscribeUrl} target="_blank" rel="noreferrer" onClick={trackClick('latest', 'Subscribe on YouTube', subscribeUrl, 'subscribe_youtube')}>Subscribe on YouTube ↗</a>
                <a className="button button-quiet" href="/videos" onClick={trackClick('latest', 'Browse every video', '/videos', 'browse_videos')}>Browse every video</a>
              </div>
            </div>
          </div>
          <VideoGrid videos={videos} failed={failed} />
        </div>
      </section>

      <div className="divider reveal" aria-hidden="true" />
      <section className="section build-guides" id="guides">
        <div className="shell">
          <SectionHead eyebrow="Guides" title="Written guides," accent="step by step.">Free step-by-step builds with sample inputs, troubleshooting, and a clear finish line.</SectionHead>
          <ul>
            <li><a href="/start-here.html" onClick={trackClick('guides', 'Start here: your first build', '/start-here.html', 'start_free_build')}>Start here: your first build</a></li>
            <li><a href="/guides/vapi-voice-agent-tutorial.html">Vapi AI tutorial: build a voice agent, test calls, webhooks</a></li>
            <li><a href="/guides/opencode-vs-claude-code.html">OpenCode vs Claude Code: pricing, setup and limits</a></li>
            <li><a href="/guides/9router-setup.html">9Router setup: providers, model combos and request checks</a></li>
            <li><a href="/guides/codex-on-linux.html">Codex on Linux: install Codex CLI and the desktop app</a></li>
            <li><a href="/guides/claude-code-for-beginners.html">Claude Code tutorial for beginners: install and use it</a></li>
            <li><a href="/guides/heygen-ai-avatar-tutorial.html">HeyGen AI avatar tutorial: create your first video</a></li>
            <li><a href="/guides/claude-code-vs-codex.html">Claude Code vs Codex: how I use both</a></li>
            <li><a href="/guides/codex-usage-limits.html">Codex usage limits: check usage, plans and reset times</a></li>
            <li><a href="/guides/codex-workflow.html">Use Codex to make and verify a code change</a></li>
            <li><a href="/guides/ai-automation.html">What Is AI Automation? Examples, Tools and a First Build</a></li>
            <li><a href="/guides/make-first-automation.html">Route a sample business request with Make.com</a></li>
            <li><a href="/guides/first-api-request.html">Test your first AI API request locally</a></li>
            <li><a href="/guides/youtube-feed.html">Build a resilient YouTube feed in React</a></li>
            <li><a href="/guides/consent-tracking.html">Track clicks only after consent</a></li>
            <li><a href="/guides/self-host-n8n.html">Run n8n on your own Ubuntu machine</a></li>
            <li><a href="/guides/hermes-desktop.html">Install Hermes Agent with Hermes Desktop</a></li>
            <li><a href="/guides/openseo-review.html">OpenSEO review: setup, data costs and practical limits</a></li>
            <li><a href="/guides/dataforseo-mcp-claude.html">Give Claude Code real SEO data with DataForSEO</a></li>
            <li><a href="/guides/make-money-with-ai-no-experience.html">Make money with AI with no experience</a></li>
            <li><a href="/guides/make-money-with-ai-fast.html">Make money with AI fast</a></li>
            <li><a href="/guides/ai-side-hustles.html">AI side hustles worth testing</a></li>
            <li><a href="/guides/ai-automation-services-small-business.html">Scope AI automation services for small business</a></li>
            <li><a href="/guides/make-money-with-chatgpt.html">Make money with ChatGPT in client work</a></li>
            <li><a href="/guides/chatgpt-pro-20x.html">ChatGPT Pro 20x: Pause, Return &amp; Codex Limits (2026)</a></li>
            <li><a href="/watch/7v_675nO7nM">Video: build an OpenCode desktop app</a></li>
            <li><a href="/watch/geKngm3sg3w">Video: set up 9Router</a></li>
            <li><a href="/watch/G8u1-hKEqig">Video: follow the HeyGen avatar workflow</a></li>
          </ul>
          <a className="text-link" href="/guides.html">All guides</a>
        </div>
      </section>

      <div className="divider reveal" aria-hidden="true" />
      <section className="section band" id="tools">
        <div className="shell">
          <SectionHead eyebrow="Products" title="Two products" accent="I built and run.">Both started as problems I kept hitting while growing a channel. Both are live, and both have a free way to try them.</SectionHead>
          <div className="tool-grid reveal-group">
            {tools.map(tool => (
              <article className="tool" key={tool.name}>
                <img src={tool.image} alt={`${tool.name} product screen`} width={tool.size[0]} height={tool.size[1]} loading="lazy" decoding="async" />
                <div className="tool-body">
                  <h3>{tool.name}</h3>
                  <p className="tool-tagline">{tool.tagline}</p>
                  <p>{tool.copy}</p>
                  <ul>{tool.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
                  <div className="tool-action">
                    {tool.note && <p className="fine-print">{tool.note}</p>}
                    <a className="button button-primary" href={tool.url} target="_blank" rel="noreferrer" onClick={trackClick('tools', tool.cta, tool.url, `visit_${tool.name.toLowerCase()}`)}>{tool.cta} ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" id="about">
        <div className="shell about-grid">
          <img className="portrait reveal" src="/mike-holp.jpg" alt="Mike Holp" width="400" height="400" loading="lazy" decoding="async" />
          <div className="about-copy reveal">
            <p className="eyebrow">About</p>
            <h2>Hi, I&rsquo;m <span className="accent">Mike.</span></h2>
            <p>I&rsquo;ve been shipping software since 2013, starting with iOS apps in Objective-C: a charity-giving app, a language tutor, and a client for OBD car devices. When AI tools got good enough to build real things with, I started testing them in public.</p>
            <p>AI Automation Station publishes my practical AI builds. AI Income Lab is its paid learning community on Skool, with courses, templates, and help while you build. I also build and run TubeAnalytics and VisiScan.</p>
            <p>My rule for every video: build something real, leave the mistakes in, and tell you plainly whether the tool is worth your time.</p>
            <ol className="timeline">{timeline.map(([year, event]) => <li key={year}><span>{year}</span>{event}</li>)}</ol>
            <p className="about-links"><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={xUrl} target="_blank" rel="noreferrer">X ↗</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a></p>
          </div>
        </div>
        <div className="shell built" id="code">
          <h3>Things I&rsquo;ve built</h3>
          <p>Side projects and experiments, with the source open on GitHub.</p>
          <ul className="repo-list reveal-group">
            {repos.map(repo => {
              const source = `${githubUrl}/${repo.name}`;
              return (
                <li key={repo.name}>
                  <h4><a href={source} target="_blank" rel="noreferrer" onClick={trackClick('code', repo.name, source, 'visit_github')}>{repo.name}</a></h4>
                  <p>{repo.copy}</p>
                  <p className="repo-meta"><span>{repo.language}</span><span>{repo.year}</span></p>
                  <p className="repo-links"><a href={source} target="_blank" rel="noreferrer" aria-label={`${repo.name} source on GitHub`}>Source ↗</a>{repo.live && <a href={repo.live} target="_blank" rel="noreferrer" aria-label={`${repo.name} live site`}>Live site ↗</a>}</p>
                </li>
              );
            })}
          </ul>
          <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer" onClick={trackClick('code', 'All repositories', githubUrl, 'visit_github')}>All repositories on GitHub ↗</a>
        </div>
      </section>

      <div className="divider reveal" aria-hidden="true" />
      <MediaKit />

      {sponsoredVideos.length > 0 && <>
        <div className="divider reveal" aria-hidden="true" />
        <section className="section" id="sponsored">
          <div className="shell">
            <SectionHead eyebrow="Sponsored" title="Sponsored" accent="builds.">Videos a brand paid for. Same rules as every build: a real project, the mistakes left in, and a plain verdict.</SectionHead>
            <ul className="video-grid sponsored-grid reveal-group">{sponsoredVideos.map(video => <li key={video.id}><VideoCard video={video} placement="sponsored" /></li>)}</ul>
          </div>
        </section>
      </>}

      <div className="divider reveal" aria-hidden="true" />
      <section className="section" id="work-together">
        <div className="shell">
          <SectionHead eyebrow="Sponsors and collabs" title="Sponsor a video" accent="or work together.">Make an AI model, agent, or automation tool? I&rsquo;ll test it on a real build for the channel. Creators with a collab idea are welcome too. Book a free 10-minute intro call, or send a message.</SectionHead>
          <ContactOptions campaign={campaign} />
          <p className="support-note">For membership, billing, or privacy questions, email <a href="mailto:automojic@proton.me">automojic@proton.me</a>.</p>
        </div>
      </section>

    </main>

    <footer className="footer">
      <div className="shell">
        <div className="footer-cta reveal">
          <p>Build your next automation.</p>
          <div className="button-row">
            <a className="button button-primary" href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('footer', 'Join AI Income Lab', plansUrl)}>Join AI Income Lab ↗</a>
            <a className="footer-subscribe" href={subscribeUrl} target="_blank" rel="noreferrer" onClick={trackClick('footer', 'Subscribe on YouTube', subscribeUrl, 'subscribe_youtube')}>Subscribe on YouTube ↗</a>
          </div>
        </div>
        <div className="footer-directory">
          <div className="footer-brand"><a className="brand" href="#top"><span aria-hidden="true" />AI Automation Station</a><p>Practical AI builds by Mike Holp.</p></div>
          <nav className="footer-columns" aria-label="Footer">
            <div><h2>Explore</h2><a href="/start-here.html">Start here</a><a href="/guides.html">Written guides</a><a href="/videos">All videos</a></div>
            <div><h2>Products</h2><a href="https://www.tubeanalytics.net" target="_blank" rel="noreferrer">TubeAnalytics</a><a href="https://www.visiscan.app" target="_blank" rel="noreferrer">VisiScan</a></div>
            <div><h2>Community</h2><a href={aboutUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('footer', 'AI Income Lab')}>AI Income Lab</a><a href={skoolCommunityUrl} target="_blank" rel="noreferrer" onClick={trackClick('footer', 'Member login', skoolCommunityUrl, 'member_login')}>Member login</a></div>
            <div><h2>Connect</h2>{socialLinks.map(([name, url, icon]) => <a key={name} href={url} target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 16 16" aria-hidden="true"><path d={icon} /></svg>{name}</a>)}<a href="mailto:automojic@proton.me"><svg className="social-icon" viewBox="0 0 16 16" aria-hidden="true"><path d={emailIcon} /></svg>Email</a></div>
          </nav>
        </div>
        <div className="footer-base"><p>&copy; 2026 Mike Holp</p><div><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><button type="button" onClick={() => window.dispatchEvent(new Event('open-privacy-choices'))}>Privacy choices</button></div></div>
      </div>
    </footer>
    <ConsentBanner campaign={campaign} campaignReady={campaignReady} />
    </>
  );
}

export function Root() {
  return <StrictMode><App /><Analytics /></StrictMode>;
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root.hasChildNodes()) hydrateRoot(root, <Root />);
  else createRoot(root).render(<Root />);
}
