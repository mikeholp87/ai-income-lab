import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Analytics, track } from '@vercel/analytics/react';
import { getCampaign, outboundUrl, outboundProperties } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaEvent } from './tracking.js';
import { buildPlan, campaignMessages, designVersion, faqGroups, pricingPlans, skoolAboutUrl, skoolCommunityUrl } from './content.js';
import './fonts.css';
import './styles.css';

function trackEvent(name, properties = {}) {
  const details = { design_version: designVersion, ...properties };
  track(name, details);
  trackGoogleEvent(name, details);
}

function SkoolLink({ campaign, placement, plan, children = 'Continue to Skool', className = 'button button-primary' }) {
  const href = outboundUrl(skoolAboutUrl, campaign);
  function visit() {
    const properties = outboundProperties(campaign, { placement, plan, href, designVersion });
    trackEvent('skool_outbound', properties);
    trackMetaEvent('SkoolOutboundClicked', properties);
  }
  return <a className={className} href={href} onClick={visit}>{children}</a>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  useEffect(() => setTheme(document.documentElement.dataset.theme || 'light'), []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#080d19' : '#f7f8fb';
    try { localStorage.setItem('theme', next); } catch (_) {}
    setTheme(next);
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? 'Light appearance' : 'Dark appearance'}</button>;
}

function ConsentBanner({ open, setOpen, campaign, campaignReady }) {
  useEffect(() => {
    setOpen(getTrackingConsent() === null);
    if (getTrackingConsent() === 'granted') loadMarketingTracking();
    const reopen = () => setOpen(true);
    window.addEventListener('open-privacy-choices', reopen);
    return () => window.removeEventListener('open-privacy-choices', reopen);
  }, [setOpen]);
  useEffect(() => {
    if (campaignReady) trackGoogleEvent('campaign_landing_viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', design_version: designVersion });
  }, [campaign, campaignReady]);
  function choose(value) {
    const previous = getTrackingConsent();
    setTrackingConsent(value);
    if (value === 'granted') {
      loadMarketingTracking();
      if (previous !== 'granted') trackGoogleEvent('campaign_landing_viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', design_version: designVersion });
    } else disableMarketingTracking();
    setOpen(false);
  }
  if (!open) return null;
  return <aside className="consent-banner" aria-label="Privacy choices">
    <p>Allow optional analytics? <a href="/privacy.html">Privacy details</a></p>
    <div className="consent-actions"><button type="button" onClick={() => choose('denied')}>Decline</button><button type="button" onClick={() => choose('granted')}>Allow analytics</button></div>
  </aside>;
}

const featuredDemoUrl = 'https://www.youtube.com/watch?v=AJpK3YTTKZ4';

function ClaudeCodeShowcase({ angle, context }) {
  const [playing, setPlaying] = useState(false);
  function demoEvent(name) {
    trackEvent(name, { angle, product: 'claude_code', video_id: 'AJpK3YTTKZ4', link_url: featuredDemoUrl });
  }
  return <section className="workflow-showcase" id="tour" aria-labelledby="workflow-title">
    <div className="product-heading"><strong className="product-name">Claude Code</strong><span>By Anthropic</span></div>
    <h2 id="workflow-title">From a request to working code.</h2>
    <p className="workflow-description">Watch Claude Code explore a project, add a feature, and test the changes in Anthropic’s official product demo.</p>
    <figure className="workflow-figure">
      <div className="demo-player">
        {playing ? <iframe src="https://www.youtube-nocookie.com/embed/AJpK3YTTKZ4?autoplay=1&rel=0&cc_load_policy=1" title="Introducing Claude Code — official Anthropic demo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" tabIndex={0} ref={node => { node?.focus(); }} /> : <button className="demo-play" type="button" onClick={() => { setPlaying(true); demoEvent('claude_demo_play_requested'); }} aria-label="Play the official Claude Code demo from Anthropic. Loads YouTube video.">
          <img src="/workflows/claude-code-demo.jpg" width="1280" height="720" alt="" decoding="async" />
          <span className="demo-play-label"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l14-8z" fill="currentColor" /></svg>Play Claude Code demo</span>
        </button>}
      </div>
      <figcaption>Official demo by Anthropic. YouTube loads when you press play.</figcaption>
    </figure>
    <ol className="workflow-steps"><li><strong>Explore</strong><span>Understand an unfamiliar project.</span></li><li><strong>Build</strong><span>Describe a feature and see the code change.</span></li><li><strong>Test</strong><span>Run checks, fix errors, and review the result.</span></li></ol>
    <p className="workflow-context">{context}</p>
    <a className="text-link workflow-link" href={featuredDemoUrl} target="_blank" rel="noopener noreferrer" onClick={() => demoEvent('claude_demo_opened')}>Watch on YouTube <span className="sr-only">(opens in a new tab)</span></a>
    <details className="workflow-setup"><summary>Try Claude Code yourself</summary><p>You’ll need a project and a supported Claude subscription or API account. Claude Code access is separate from AI Income Lab membership.</p><a className="text-link" href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener noreferrer">Read the official setup guide <span className="sr-only">(opens in a new tab)</span></a></details>
  </section>;
}

function IntroVideo({ angle }) {
  const video = useRef(null);
  return <details className="intro-video" onToggle={event => { if (!event.currentTarget.open) video.current?.pause(); }}>
    <summary>Watch the 14-second community introduction</summary>
    <p>Courses and community are included in every plan. Weekly coaching, software deals, and the complete template vault require VIP.</p>
    <video ref={video} controls preload="none" playsInline poster="/hero-video-poster.jpg" width="1280" height="720" aria-label="AI Income Lab community introduction" onPlay={() => trackEvent('intro_video_played', { angle })} onEnded={() => trackEvent('intro_video_completed', { angle })}>
      <source src="/hero-video.mp4" type="video/mp4" /><track kind="captions" src="/hero-video.en.vtt" srcLang="en" label="English" default />
    </video>
    <details className="video-transcript"><summary>Read video transcript</summary><p>Still watching AI tutorials without knowing what to build? AI Income Lab gives you step-by-step training, ready-to-use systems, templates, coaching, and the tools to turn AI skills into real income. No coding required. Join AI Income Lab today.</p></details>
  </details>;
}

function App() {
  const [campaign, setCampaign] = useState(() => getCampaign('', Object.keys(campaignMessages)));
  const [campaignReady, setCampaignReady] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard');
  const message = campaignMessages[campaign.angle];
  const navigation = useRef(null);
  useEffect(() => { setCampaign(getCampaign(window.location.search, Object.keys(campaignMessages))); setCampaignReady(true); }, []);

  useEffect(() => {
    if (!campaignReady) return undefined;
    track('campaign_landing_viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', content: campaign.params.utm_content || 'none', design_version: designVersion });
    let engaged = false;
    function markEngaged(signal) {
      if (!engaged) { engaged = true; trackEvent('engaged_visit', { signal, angle: campaign.angle }); }
    }
    const onScroll = () => {
      const distance = document.documentElement.scrollHeight - innerHeight;
      if (distance > 0 && scrollY / distance >= .5) markEngaged('50_percent_scroll');
    };
    const timer = setTimeout(() => markEngaged('30_seconds'), 30000);
    window.addEventListener('scroll', onScroll, { passive: true });
    const pricingHeading = document.getElementById('pricing-title');
    const pricingObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        trackEvent('view_pricing', { angle: campaign.angle });
        trackMetaEvent('PricingViewed', { angle: campaign.angle, design_version: designVersion });
        pricingObserver.disconnect();
      }
    }, { threshold: .5 });
    if (pricingHeading) pricingObserver.observe(pricingHeading);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); pricingObserver.disconnect(); };
  }, [campaign, campaignReady]);

  useEffect(() => {
    const elements = ['hero-actions', 'pricing', 'join'].map(id => document.getElementById(id));
    const visible = new Map(elements.map(element => [element, false]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visible.set(entry.target, entry.isIntersecting));
      const heroPassed = elements[0].getBoundingClientRect().bottom < 0;
      setMobileCtaVisible(heroPassed && ![...visible.values()].some(Boolean));
    });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function viewPricing(placement) { trackEvent('cta_click', { placement, action: 'view_pricing', angle: campaign.angle }); }
  function closeMenu(event) { if (event.target.closest('a')) navigation.current.open = false; }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="shell nav" id="top">
      <a className="brand" href="#top" aria-label="AI Income Lab home"><span>AI</span> Income Lab</a>
      <nav className="nav-links" aria-label="Main navigation"><a href="#tour">Claude Code demo</a><a href="#plan">How it works</a><a href="#faq">FAQ</a></nav>
      <div className="nav-actions"><a className="nav-pricing" href="#pricing" onClick={() => viewPricing('navigation')}>See plans</a><details className="nav-menu" ref={navigation} onKeyDown={event => { if (event.key === 'Escape') { navigation.current.open = false; navigation.current.querySelector('summary').focus(); } }}><summary aria-label="Explore navigation and appearance">Explore</summary><div onClick={closeMenu}><a href="#tour">Claude Code demo</a><a href="#plan">How it works</a><a href="#faq">FAQ</a><ThemeToggle /></div></details></div>
    </header>
    <main id="main-content" tabIndex="-1">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy" id="outcomes"><p className="audience">{message.audience}</p><h1 id="hero-title">{message.headline}</h1><p className="hero-text">{message.text}</p>
          <div className="hero-actions" id="hero-actions"><SkoolLink campaign={campaign} placement="hero">Join from $29 a month</SkoolLink><a className="text-link" href="#pricing" onClick={() => viewPricing('hero')}>Compare plans from $29/month</a></div>
          <p className="cta-note">Created by Mike Holp. Monthly membership. Cancel anytime.</p>
          <ul className="hero-facts"><li>No coding experience required</li><li>Courses and community in every plan</li><li>Weekly coaching with VIP</li></ul>
        </div>
        <ClaudeCodeShowcase angle={campaign.angle} context={message.context} />
      </section>

      <section className="community shell" id="inside" aria-labelledby="community-title">
        <div><p className="section-label">Your community host</p><h2 id="community-title">Learn with Mike Holp and the community.</h2></div>
        <div><p>Join 2,900+ members on Skool, where AI Income Lab brings practical training and member discussions together. Explore the public listing and review the current membership details before joining.</p><SkoolLink campaign={campaign} placement="community" className="text-link">Explore the community on Skool</SkoolLink><IntroVideo angle={campaign.angle} /></div>
      </section>

      <section className="pricing shell" id="pricing" aria-labelledby="pricing-title">
        <div className="section-heading"><h2 id="pricing-title">Choose your membership.</h2><p>Monthly in USD. Cancel or upgrade on Skool.</p></div>
        <fieldset className="pricing-grid"><legend className="sr-only">Compare membership plans</legend>
          {pricingPlans.map(plan => <label className={`price-card${selectedPlan === plan.name ? ' is-selected' : ''}`} key={plan.name}>
            <input type="radio" name="membership" value={plan.name} checked={selectedPlan === plan.name} onChange={() => { setSelectedPlan(plan.name); trackEvent('plan_selected', { plan: plan.name, angle: campaign.angle }); }} />
            <div className="price-top"><h3>{plan.name}</h3><div className="price-amount"><strong>${plan.price}</strong><span>/month</span></div></div>
            <p className="price-fit">{plan.fit}</p>
            {plan.name === 'Standard' && <span className="price-badge">Start here if you’re new</span>}
            <ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          </label>)}
        </fieldset>
        <div className="pricing-next"><SkoolLink campaign={campaign} placement="pricing" plan={selectedPlan} /><p aria-live="polite">Choose <strong>{selectedPlan}</strong> again on Skool to finish joining.</p></div>
        <p className="pricing-note">Your selection here helps you compare. Skool handles account creation, plan selection, and payment. Software and API costs are separate.</p>
      </section>

      <section className="plan shell" id="plan" aria-labelledby="plan-title"><div className="section-heading"><h2 id="plan-title">One task. Four weeks to work on it.</h2><p>A suggested path you can adapt to your experience.</p></div><ol className="plan-grid">{buildPlan.map(([week, title, copy]) => <li key={week}><span>{week}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><p className="plan-note">Start small and adjust the pace. Completion, income, and finding a client in 30 days are not guaranteed.</p></section>

      <section className="faq shell" id="faq" aria-labelledby="faq-title"><h2 id="faq-title">Before you join.</h2><div className="faq-groups">{faqGroups.map(group => <div key={group.title}><h3>{group.title}</h3>{group.items.map(([question, answer]) => <details key={question} onToggle={event => { if (event.currentTarget.open) trackEvent('faq_opened', { question, angle: campaign.angle }); }}><summary>{question}</summary><p>{answer}</p></details>)}</div>)}</div></section>

      <section className="join-card shell" id="join" aria-labelledby="join-title"><div><h2 id="join-title">Make your next step a useful one.</h2><p>Start with courses and community from $29/month.</p></div><div className="join-side"><SkoolLink campaign={campaign} placement="final" plan={selectedPlan} /><p>Choose your plan and create your account on Skool.</p><a href="#pricing" className="text-link" onClick={() => viewPricing('final_compare')}>Compare memberships</a></div></section>
    </main>
    <footer className="footer shell"><a className="brand" href="#top"><span>AI</span> Income Lab</a><p>Practical learning. A place to build.</p><div className="footer-links"><a href={skoolCommunityUrl}>Member login</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><button type="button" onClick={() => window.dispatchEvent(new Event('open-privacy-choices'))}>Privacy choices</button></div></footer>
    {mobileCtaVisible && !privacyOpen && <div className="mobile-cta"><span>Plans from <strong>$29/month</strong></span><a href="#pricing" onClick={() => viewPricing('mobile_sticky')}>See plans</a></div>}
    <ConsentBanner open={privacyOpen} setOpen={setPrivacyOpen} campaign={campaign} campaignReady={campaignReady} />
  </>;
}

export function Root() { return <StrictMode><App /><Analytics /></StrictMode>; }
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root.hasChildNodes()) hydrateRoot(root, <Root />);
  else createRoot(root).render(<Root />);
}
