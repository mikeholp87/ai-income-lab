import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Analytics, track } from '@vercel/analytics/react';
import { getCampaign, outboundUrl } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaOutbound } from './tracking.js';
import { channelUrl } from './youtube.js';
import './fonts.css';
import './styles.css';

const memberAvatars = Array.from({ length: 8 }, (_, index) => `/members/member-${index}.png`);

const skoolAboutUrl = 'https://www.skool.com/ai-automation-station-7346/about';
const skoolCommunityUrl = 'https://www.skool.com/ai-automation-station-7346';
const subscribeUrl = `${channelUrl}?sub_confirmation=1`;
const githubUrl = 'https://github.com/mikeholp87';
const linkedinUrl = 'https://www.linkedin.com/in/mikeholp';
const xUrl = 'https://x.com/mikeholp';

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

function trackCommunityVisit(placement, buttonText) {
  const properties = { content_name: 'AI Income Lab membership', content_category: 'membership', button_text: buttonText, link_url: skoolAboutUrl, placement };
  trackEvent('CTA Clicked', { ...properties, action: 'visit_skool' });
  trackEvent('Skool Outbound Clicked', properties);
  trackMetaOutbound(properties);
}

function ConsentBanner({ campaign, campaignReady }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getTrackingConsent() === null);
    if (getTrackingConsent() === 'granted') loadMarketingTracking();
    const reopen = () => setOpen(true);
    window.addEventListener('open-privacy-choices', reopen);
    return () => window.removeEventListener('open-privacy-choices', reopen);
  }, []);

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
    setOpen(false);
  }

  if (!open) return null;
  return <aside className="consent-banner" aria-label="Privacy choices"><p><strong>Analytics preferences.</strong> Allow analytics to help improve this page and measure campaigns. <a href="/privacy.html">Privacy</a> and <a href="/terms.html">Terms</a>.</p><div className="consent-actions"><button type="button" onClick={() => choose('denied')}>Decline</button><button type="button" className="consent-accept" onClick={() => choose('granted')}>Allow analytics</button></div></aside>;
}

// Built-in values render first; /api/youtube replaces the keyed ones with live channel counts.
const stats = [
  ['5.1K', 'YouTube subscribers', 'subscribers'],
  ['498K', 'video views', 'views'],
  ['336', 'videos published', 'videos'],
];

const tools = [
  {
    name: 'TubeAnalytics',
    url: 'https://www.tubeanalytics.net',
    image: '/tools/tubeanalytics.jpg',
    size: [1102, 620],
    tagline: 'YouTube analytics for creators.',
    copy: 'See why growth slowed, where viewers drop off, which competitors are pulling ahead, and which topics deserve your next upload.',
    facts: ['Real CPM and RPM for connected channels', '180+ registered creators', '7-day free trial, plans from $19 a month'],
    cta: 'Start a free trial',
  },
  {
    name: 'VisiScan',
    url: 'https://www.visiscan.app',
    image: '/tools/visiscan.jpg',
    size: [1164, 850],
    tagline: 'See whether AI recommends your business.',
    copy: 'VisiScan asks AI engines like ChatGPT, Claude, and Perplexity the questions your buyers ask, then shows who gets named, who gets recommended instead, and what to fix.',
    facts: ['Free scan, no signup', 'Full report for $49, paid once', 'Weekly monitoring from $29 a month'],
    cta: 'Run a free scan',
  },
];

const repos = [
  { name: 'solar-business-directory', copy: 'Next.js directory of UK solar installers, with lead capture, an installer portal, and Stripe billing.', language: 'TypeScript', year: 2026, live: 'https://solar-business-directory.vercel.app' },
  { name: 'seo-tool', copy: 'SEO Scout: paste a URL, get a scored audit across eight categories with the steps to fix each issue.', language: 'TypeScript', year: 2026 },
  { name: 'trading-app', copy: 'A trading app built on the Alpaca brokerage API.', language: 'JavaScript', year: 2026, live: 'https://trading-app-mu-one.vercel.app' },
  { name: 'ai-income-lab', copy: 'The source for this page. React and Vite on Vercel, with a YouTube feed that refreshes daily.', language: 'JavaScript', year: 2026 },
  { name: 'Swiftris', copy: 'Tetris written in Swift, the year the language launched.', language: 'Swift', year: 2014 },
];

const plans = [
  { name: 'Standard', price: 29, copy: 'Community, courses, and tutorials' },
  { name: 'Premium', price: 49, copy: 'Everything in Standard, plus advanced training' },
  { name: 'VIP', price: 89, copy: 'Everything in Premium, plus weekly coaching, software deals, and 6,400+ n8n templates' },
];

const timeline = [
  ['2013', 'Shipped my first iOS apps in Objective-C'],
  ['2014', 'Rebuilt Tetris in Swift the year it came out'],
  ['2016', 'Built an iOS client for OBD car devices'],
  ['2025', 'Started AI Automation Station on YouTube'],
  ['Now', 'Building TubeAnalytics and VisiScan, and hosting AI Income Lab'],
];

const faqs = [
  ['Do I need to code to follow your videos?', 'No. Many videos use no-code tools like n8n and Make.com. The Claude Code, Codex, and OpenCode builds run in a terminal, and I show every setup step on screen.'],
  ['How often do you post?', 'Most days. Subscribe on YouTube to see new uploads first. The latest videos on this page refresh once a day.'],
  ['What do I get in AI Income Lab that the videos don’t cover?', 'The videos show what a tool can do. AI Income Lab adds step-by-step courses, templates, and a community where you can ask questions while you build. VIP adds weekly coaching.'],
  ['What does AI Income Lab cost?', 'Plans are $29, $49, or $89 a month, billed monthly. You can cancel before the next billing period from your Skool account.'],
  ['Is income guaranteed if I join?', 'No. The training shows you how to build useful AI systems. Results depend on your project, your experience, and the time you put in.'],
  ['Can I try TubeAnalytics or VisiScan for free?', 'Yes. TubeAnalytics has a 7-day free trial (payment details required), with plans from $19 a month. VisiScan runs a free scan with no signup, and the full report is $49, paid once.'],
  ['What tools will I need?', 'It depends on the build. Automation hosting, AI API usage, and other software can cost extra. Each video lists what it uses, so check before you buy anything.'],
];

const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' });
const viewFormat = new Intl.NumberFormat('en', { notation: 'compact' });
const relativeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const formatViews = views => `${viewFormat.format(views)} ${views === 1 ? 'view' : 'views'}`;
const daysAgo = published => relativeFormat.format(-Math.round((Date.now() - Date.parse(published)) / 86400000), 'day');
const watchUrl = id => `https://www.youtube.com/watch?v=${id}`;

function useYouTubeFeed() {
  const [feed, setFeed] = useState({ videos: null, channel: null, failed: false });
  useEffect(() => {
    fetch('/api/youtube')
      .then(response => response.ok ? response.json() : Promise.reject(response.status))
      .then(({ videos, channel }) => setFeed({ videos, channel, failed: !videos.length }))
      .catch(() => setFeed({ videos: [], channel: null, failed: true }));
  }, []);
  return feed;
}

function YouTubeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15V9l5.8 3-5.8 3Z" /></svg>;
}

function GitHubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" /></svg>;
}

function SectionHead({ title, children }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {children && <p className="lede">{children}</p>}
    </div>
  );
}

function FeaturedVideo({ video }) {
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
          : <button type="button" onClick={play} aria-label={`Play ${video.title}`}>
              <img src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} onError={event => { event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`; }} alt="" width="1280" height="720" />
              <span className="play-key" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
              {video.duration && <span className="duration">{video.duration}</span>}
            </button>}
      </div>
      <div className="player-meta">
        <p className="meta-row"><time dateTime={video.published}>{dateFormat.format(new Date(video.published))}</time><span>{formatViews(video.views)}</span></p>
        <h3><a href={watchUrl(video.id)} target="_blank" rel="noreferrer" onClick={trackClick('latest', video.title, watchUrl(video.id), 'watch_video')}>{video.title}</a></h3>
        {video.summary && <p className="player-summary">{video.summary}</p>}
        <p className="player-note">YouTube loads only after you press play.</p>
      </div>
    </article>
  );
}

function VideoGrid({ videos, failed }) {
  // The featured slot above already shows the error and a YouTube link.
  if (failed) return null;
  const items = videos ? videos.slice(1) : Array(6).fill(null);
  return (
    <ul className="video-grid" aria-busy={!videos}>
      {items.map((video, index) => video
        ? <li key={video.id}><a className="video-card" href={watchUrl(video.id)} target="_blank" rel="noreferrer" onClick={trackClick('latest_posts', video.title, watchUrl(video.id), 'watch_video')}>
            <span className="thumb-frame">
              <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" width="480" height="270" loading="lazy" decoding="async" />
              {video.duration && <span className="duration">{video.duration}</span>}
            </span>
            <p className="meta-row"><time dateTime={video.published}>{dateFormat.format(new Date(video.published))}</time><span>{formatViews(video.views)}</span></p>
            <h3>{video.title}</h3>
          </a></li>
        : <li key={index} className="video-card is-loading" aria-hidden="true"><span className="thumb" /><span className="skeleton-line" /><span className="skeleton-line short" /></li>)}
    </ul>
  );
}

function CommunityVideo() {
  const video = useRef(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    video.current?.play();
  }

  return (
    <figure className="community-video">
      <div className="player-screen">
        <video ref={video} controls={started} preload="metadata" playsInline poster="/hero-video-poster.jpg" width="1280" height="720" aria-label="A look inside AI Income Lab" onPlay={() => trackEvent('Hero Video Played', { placement: 'community' })} onEnded={() => trackEvent('Hero Video Completed', { placement: 'community' })}>
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
  const { videos, channel, failed } = useYouTubeFeed();
  const latest = videos?.[0];

  useEffect(() => {
    setCampaign(getCampaign(window.location.search, []));
    setCampaignReady(true);
  }, []);

  useEffect(() => {
    if (!campaignReady) return undefined;
    track('Campaign Landing Viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', content: campaign.params.utm_content || 'none' });
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
        if (typeof window.fbq === 'function') window.fbq('track', 'ViewContent', { content_name: 'Pricing', content_category: 'membership' });
      }
    }, { threshold: .25 });
    observer.observe(pricing);
    return () => observer.disconnect();
  }, [campaign, campaignReady]);

  const aboutUrl = outboundUrl(skoolAboutUrl, campaign);
  const navLinks = [['#latest', 'Latest'], ['#tools', 'Tools'], ['#community', 'Community'], ['#about', 'About']];
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="nav shell" id="top">
      <a className="brand" href="#top" aria-label="Mike Holp, home"><span aria-hidden="true" />Mike Holp</a>
      <nav className="nav-links" aria-label="Sections">{navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="nav-actions">
        <a className="icon-link" href={channelUrl} target="_blank" rel="noreferrer" aria-label="Mike Holp on YouTube" onClick={trackClick('navigation', 'YouTube', channelUrl, 'visit_youtube')}><YouTubeIcon /></a>
        <a className="icon-link" href={githubUrl} target="_blank" rel="noreferrer" aria-label="Mike Holp on GitHub" onClick={trackClick('navigation', 'GitHub', githubUrl, 'visit_github')}><GitHubIcon /></a>
        <details className="nav-mobile"><summary>Menu</summary><nav aria-label="Sections">{navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav></details>
      </div>
    </header>

    <main>
      <section className="hero shell" id="main-content" tabIndex="-1">
        <a className="hero-status" href="#latest">
          <span className="live-dot" aria-hidden="true" />
          {latest ? <><span className="status-label">New video {daysAgo(latest.published)}:</span> <strong>{latest.title}</strong></> : <>New videos most days on YouTube</>}
        </a>
        <h1><span>New AI tools,</span> <span>tested on real builds.</span></h1>
        <p className="hero-text">I&rsquo;m Mike Holp. Most days I take a new AI model, agent, or automation tool, build something real with it on camera for my YouTube channel, and show you what held up and what broke. Claude Code, Codex, OpenCode, and n8n, with every setup step included.</p>
        <div className="terminal">
          <span className="terminal-prompt" aria-hidden="true">~</span>
          <a className="terminal-url" href={channelUrl} target="_blank" rel="noreferrer" onClick={trackClick('hero', 'Channel URL', channelUrl, 'visit_youtube')}>youtube.com/@ai-automation-station</a>
          <a className="terminal-go" href={subscribeUrl} target="_blank" rel="noreferrer" onClick={trackClick('hero', 'Subscribe', subscribeUrl, 'subscribe_youtube')}>Subscribe</a>
        </div>
        <nav className="hero-links" aria-label="Jump to"><a href="#latest">Watch the latest video</a><a href="#tools">See the tools I built</a><a href="#about">About Mike</a></nav>
      </section>

      <section className="section latest" id="latest">
        <div className="shell">
          <div className="latest-grid">
            <div>
              <SectionHead title="Latest videos">A new upload lands most days. Each one is a real build, so you see the setup, the result, and the fix when something breaks.</SectionHead>
              <p className="feed-note"><span className="live-dot" aria-hidden="true" />Pulled from YouTube daily</p>
              <div className="button-row">
                <a className="button button-primary" href={subscribeUrl} target="_blank" rel="noreferrer" onClick={trackClick('latest', 'Subscribe on YouTube', subscribeUrl, 'subscribe_youtube')}>Subscribe on YouTube</a>
                <a className="button button-quiet" href="/videos" onClick={trackClick('latest', 'Browse every video', '/videos', 'browse_videos')}>Browse every video</a>
              </div>
            </div>
            {failed ? <p className="feed-error">The latest videos didn&rsquo;t load. <a href={channelUrl} target="_blank" rel="noreferrer">Watch them on YouTube ↗</a></p> : <FeaturedVideo video={latest} />}
          </div>
          <VideoGrid videos={videos} failed={failed} />
          <a className="text-link" href={channelUrl} target="_blank" rel="noreferrer" onClick={trackClick('latest_posts', 'Every video on YouTube', channelUrl, 'visit_youtube')}>Every video on YouTube ↗</a>
        </div>
      </section>

      <section className="stats" aria-label="Channel numbers">
        <dl className="shell">{stats.map(([value, label, key]) => <div key={label}><dt>{label}</dt><dd>{Number.isFinite(channel?.[key]) ? viewFormat.format(channel[key]) : value}</dd></div>)}</dl>
      </section>

      <section className="section band" id="tools">
        <div className="shell">
          <SectionHead title="Two products I built and run">Both started as problems I kept hitting while growing a channel. Both are live, and both have a free way to try them.</SectionHead>
          <div className="tool-grid">
            {tools.map(tool => (
              <article className="tool" key={tool.name}>
                <img src={tool.image} alt={`${tool.name} product screen`} width={tool.size[0]} height={tool.size[1]} loading="lazy" decoding="async" />
                <div className="tool-body">
                  <h3>{tool.name}</h3>
                  <p className="tool-tagline">{tool.tagline}</p>
                  <p>{tool.copy}</p>
                  <ul>{tool.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
                  <a className="button button-primary" href={tool.url} target="_blank" rel="noreferrer" onClick={trackClick('tools', tool.cta, tool.url, `visit_${tool.name.toLowerCase()}`)}>{tool.cta}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" id="community">
        <div className="shell community-grid">
          <div>
            <SectionHead title="Build it with 2,900+ others">The videos stay free. AI Income Lab is my Skool community for people who want step-by-step courses, templates, and a place to ask when a build stalls.</SectionHead>
            <div className="members">
              <span className="avatars" aria-hidden="true">{memberAvatars.map((src, index) => <img key={src} src={src} alt="" width="32" height="32" decoding="async" style={{ zIndex: memberAvatars.length - index }} />)}</span>
              <p>Some of the members building AI workflows on Skool</p>
            </div>
            <ul className="plan-list" id="pricing" aria-label="AI Income Lab plans">
              {plans.map(plan => <li key={plan.name}><div><h3>{plan.name}</h3><p>{plan.copy}</p></div><p className="plan-price"><strong>${plan.price}</strong> a month</p></li>)}
            </ul>
            <div className="button-row">
              <a className="button button-primary" href={aboutUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('community', 'See AI Income Lab on Skool')}>See AI Income Lab on Skool</a>
            </div>
            <p className="fine-print">Billed monthly. Cancel anytime from your Skool account.</p>
          </div>
          <CommunityVideo />
        </div>
      </section>

      <section className="section band" id="about">
        <div className="shell about-grid">
          <img className="portrait" src="/mike-holp.jpg" alt="Mike Holp" width="400" height="400" loading="lazy" decoding="async" />
          <div className="about-copy">
            <h2>Hi, I&rsquo;m Mike.</h2>
            <p>I&rsquo;ve been shipping software since 2013, starting with iOS apps in Objective-C: a charity-giving app, a language tutor, and a client for OBD car devices. When AI tools got good enough to build real things with, I started testing them in public.</p>
            <p>Today I make videos on AI Automation Station, build TubeAnalytics and VisiScan, and host AI Income Lab on Skool.</p>
            <p>My rule for every video: build something real, leave the mistakes in, and tell you plainly whether the tool is worth your time.</p>
            <ol className="timeline">{timeline.map(([year, event]) => <li key={year}><span>{year}</span>{event}</li>)}</ol>
            <p className="about-links"><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={xUrl} target="_blank" rel="noreferrer">X ↗</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a></p>
          </div>
        </div>
        <div className="shell built" id="code">
          <h3>Things I&rsquo;ve built</h3>
          <p>Side projects and experiments, with the source open on GitHub.</p>
          <ul className="repo-list">
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

      <section className="section" id="faq">
        <div className="shell faq-grid">
          <SectionHead title="Questions people ask" />
          <div className="faq-list">{faqs.map(([question, answer]) => <details key={question} onToggle={event => event.currentTarget.open && trackEvent('FAQ Opened', { question })}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="shell">
        <div className="footer-cta">
          <p>New AI builds, most days.</p>
          <div className="button-row">
            <a className="button button-primary" href={subscribeUrl} target="_blank" rel="noreferrer" onClick={trackClick('footer', 'Subscribe on YouTube', subscribeUrl, 'subscribe_youtube')}>Subscribe on YouTube</a>
            <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer" onClick={trackClick('footer', 'Follow on GitHub', githubUrl, 'visit_github')}>Follow on GitHub</a>
          </div>
        </div>
        <div className="footer-columns">
          <div><h2>Products</h2><a href="https://www.tubeanalytics.net" target="_blank" rel="noreferrer">TubeAnalytics</a><a href="https://www.visiscan.app" target="_blank" rel="noreferrer">VisiScan</a></div>
          <div><h2>Community</h2><a href={aboutUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('footer', 'AI Income Lab')}>AI Income Lab</a><a href={skoolCommunityUrl} target="_blank" rel="noreferrer" onClick={trackClick('footer', 'Member login', skoolCommunityUrl, 'member_login')}>Member login</a></div>
          <div><h2>Connect</h2><a href={channelUrl} target="_blank" rel="noreferrer">YouTube</a><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a><a href={xUrl} target="_blank" rel="noreferrer">X</a></div>
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
