import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics, track } from '@vercel/analytics/react';
import { getCampaign, nextTabIndex, outboundUrl } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent } from './tracking.js';
import './fonts.css';
import './styles.css';

const memberAvatars = Array.from({ length: 8 }, (_, index) => `/members/member-${index}.png`);

const skoolPlansUrl = 'https://www.skool.com/ai-automation-station-7346/plans?src=join';
const skoolCommunityUrl = 'https://www.skool.com/ai-automation-station-7346';
const campaignMessages = {
  agency: { eyebrow: 'For AI freelancers and agency builders', headline: <>Build an AI workflow you can <em>demonstrate to clients.</em></>, text: <>Follow <strong>step-by-step training</strong>, build a practical workflow, and use the <strong>private community</strong> as you turn it into a client-ready offer.</> },
  business: { eyebrow: 'For business owners buried in repetitive work', headline: <>Turn one repetitive task into a <em>working AI automation.</em></>, text: <>Follow <strong>step-by-step training</strong>, build a practical workflow, and use the <strong>private community</strong> as you put it to work.</> },
  creator: { eyebrow: 'For creators ready to turn AI into output', headline: <>Build an AI workflow that <em>turns one idea into more output.</em></>, text: <>Follow <strong>step-by-step training</strong>, build a repeatable content workflow, and use the <strong>private community</strong> as you improve it.</> },
  default: { eyebrow: 'For freelancers, operators, and business owners', headline: <>Build your first useful <em>AI workflow in 30 days.</em></>, text: <>Follow <strong>step-by-step training</strong>, build a practical system you can use or sell, and use the <strong>private community</strong> when you need direction.</> },
};

const googleEventNames = {
  'CTA Clicked': 'cta_click',
};

function trackEvent(name, properties = {}) {
  track(name, properties);
  trackGoogleEvent(googleEventNames[name] || name.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase(), properties);
}

function trackPlanVisit(plan, price, placement) {
  const properties = { content_name: `${plan} membership`, content_category: 'membership', button_text: 'Continue to Skool plans', link_url: skoolPlansUrl, value: price, currency: 'USD', plan, placement };
  trackEvent('CTA Clicked', { ...properties, action: 'choose_plan' });
  trackEvent('Skool Outbound Clicked', properties);
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'SkoolOutboundClicked', properties);
  }
}

function trackCommunityVisit(placement, buttonText) {
  const properties = { content_name: 'AI Income Lab membership', content_category: 'membership', button_text: buttonText, link_url: skoolCommunityUrl, placement };
  trackEvent('CTA Clicked', { ...properties, action: 'visit_skool' });
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const isDark = theme === 'dark';

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]').content = nextTheme === 'dark' ? '#080d19' : '#f7f8fb';
    try { localStorage.setItem('theme', nextTheme); } catch (_) {}
    setTheme(nextTheme);
  }

  return <button className="theme-toggle" type="button" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} aria-pressed={isDark} title={`Switch to ${isDark ? 'light' : 'dark'} mode`} onClick={toggleTheme}><span aria-hidden="true">☼</span><span aria-hidden="true">☾</span></button>;
}

function ConsentBanner() {
  const [open, setOpen] = useState(() => getTrackingConsent() === null);

  useEffect(() => {
    if (getTrackingConsent() === 'granted') loadMarketingTracking();
    const reopen = () => setOpen(true);
    window.addEventListener('open-privacy-choices', reopen);
    return () => window.removeEventListener('open-privacy-choices', reopen);
  }, []);

  function choose(value) {
    setTrackingConsent(value);
    if (value === 'granted') loadMarketingTracking();
    else disableMarketingTracking();
    setOpen(false);
  }

  if (!open) return null;
  return <aside className="consent-banner" aria-label="Privacy choices"><div><strong>Analytics preferences</strong><p>Allow analytics to help improve this page and measure campaigns.</p><span><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span></div><div className="consent-actions"><button type="button" onClick={() => choose('denied')}>Decline</button><button type="button" className="consent-accept" onClick={() => choose('granted')}>Allow analytics</button></div></aside>;
}

const buildPlan = [
  ['Week 01', 'Choose a problem', 'Find a useful workflow worth automating.'],
  ['Week 02', 'Build the system', 'Follow the tutorials and adapt a template.'],
  ['Week 03', 'Package the result', 'Turn your system into a repeatable offer.'],
  ['Week 04', 'Put it to work', 'Use it in your business or sell it to a client.'],
];

const inclusions = [
  ['Community access · all plans', 'Discuss your build with other members and keep your learning in one private Skool community.'],
  ['Courses and tutorials · all plans', 'Follow practical training instead of guessing which AI tool to learn next.'],
  ['Advanced training · Premium and VIP', 'Go beyond the core courses when you are ready to build more capable systems.'],
  ['Curated software deals · VIP', 'Use the VIP software-deal library to compare tools and offers.'],
  ['6,400+ N8N templates · VIP', 'Open the complete template vault when implementation speed matters most.'],
  ['Weekly coaching · VIP', 'Bring questions to a weekly coaching session when you want live help with implementation.'],
];

const pricingPlans = [
  { name: 'Standard', price: 29, fit: 'Learn the foundations', bestFor: 'Best for learning and building your first workflow', description: 'Start with the community, core courses, and practical tutorials.', features: ['Community Access', 'Courses & Tutorials'] },
  { name: 'Premium', price: 49, fit: 'Build with more depth', bestFor: 'Recommended if you are ready for advanced training', description: 'Everything in Standard, plus advanced training for $20 more per month.', recommended: true, features: ['Community Access', 'Courses & Tutorials', 'Advanced Training'] },
  { name: 'VIP', price: 89, fit: 'Build with live support', bestFor: 'Best for weekly coaching and the complete resource vault', description: 'Everything in Premium, plus weekly coaching, software deals, and the N8N template vault.', features: ['Community Access', 'Courses & Tutorials', 'Advanced Training', 'Weekly Coaching', 'Curated Software Deals', '6,400+ N8N Templates'] },
];

const tourSteps = [
  { label: 'Learn', title: 'Start with one useful problem', copy: 'Follow a focused course or tutorial instead of guessing which AI tool to learn next.', visual: ['PROBLEM SELECTED', 'Repetitive lead follow-up', 'TARGET: save 5+ hours/week'] },
  { label: 'Build', title: 'Adapt a working template', copy: 'Use guided workflows and templates as your starting point, then customize the pieces that matter.', visual: ['WORKFLOW ACTIVE', 'Trigger → AI step → action', 'STATUS: ready to test'] },
  { label: 'Discuss', title: 'Bring questions to the community', copy: 'Discuss blockers with other members so you have a place to return when a small issue stalls the build.', visual: ['COMMUNITY DISCUSSION', 'Question posted', 'NEXT: compare approaches'] },
  { label: 'Ship', title: 'Put the system to work', copy: 'Use the finished workflow inside your business or package the outcome as a client-ready service.', visual: ['SYSTEM OUTPUT', 'Repeatable AI workflow', 'READY TO USE / SELL'] },
];

const faqs = [
  ['Do I need coding experience?', 'No. The training is designed around practical AI and no-code automation workflows. You can start with guided courses and tutorials.'],
  ['Which plan should I choose?', 'Choose Standard for the foundations, Premium for advanced training, or VIP when you want weekly coaching, software deals, and the complete N8N template vault. You can upgrade later as your needs grow.'],
  ['Which plan includes weekly coaching?', 'Weekly coaching is included with VIP. Standard and Premium include community access, courses, and tutorials but do not include weekly coaching.'],
  ['How much time should I set aside?', 'The 30-day path is designed for steady progress. A few focused hours each week is enough to choose a problem, build a first version, and put it to work.'],
  ['What happens after I join?', 'Skool gives you immediate access to the community and everything included in your selected plan. Start with the foundational material and introduce yourself so you can get directed to the right resources.'],
  ['Can I upgrade later?', 'Yes. Standard and Premium both include a clear upgrade path, so you can start at the level you need today.'],
  ['Can I cancel anytime?', 'Yes. Plans are billed monthly, and you can cancel your membership before the next billing period from your Skool account.'],
  ['What tools will I need?', 'Your tools depend on the workflow you choose. Automation hosting, AI API usage, and other software subscriptions may cost extra and are not included in the membership price. Check the requirements of your first tutorial before buying software.'],
  ['What could I build first?', 'One starting idea is an enquiry workflow: collect a message, extract its details, and draft a reply for you to approve. Start with one input and one output, test it with sample data, and keep human review before sending replies.'],
  ['Why join instead of watching free tutorials?', 'Free tutorials can help you learn individual tools. Membership brings courses and a community into one place so you can follow a learning path, discuss your build, and return with questions as you put it into practice.'],
  ['Is income or a client guaranteed in 30 days?', 'No. The 30-day roadmap is a suggested build schedule, not an income or client guarantee. Your progress depends on the project, your experience, and the time you put in.'],
];

function HeroVideo() {
  const video = useRef(null);
  const [started, setStarted] = useState(false);

  function start() {
    setStarted(true);
    video.current?.play();
  }

  return (
    <div className="vsl">
      <div className="vsl-screen">
        <video
          ref={video}
          controls={started}
          preload="metadata"
          playsInline
          poster="/hero-video-poster.jpg"
          width="1280"
          height="720"
          aria-label="What you build inside AI Income Lab"
          onPlay={() => trackEvent('Hero Video Played', { placement: 'hero' })}
          onEnded={() => trackEvent('Hero Video Completed', { placement: 'hero' })}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {!started && (
          <button type="button" className="vsl-play" onClick={start} aria-label="Play the intro, 14 seconds, sound on">
            <span className="vsl-play-key" aria-hidden="true">&#9654;</span>
            <span className="vsl-runtime" aria-hidden="true">0:14</span>
          </button>
        )}
      </div>
    </div>
  );
}

function ProductTour() {
  const [step, setStep] = useState(0);
  const tabs = useRef([]);
  const active = tourSteps[step];

  function selectStep(index) {
    setStep(index);
    trackEvent('Tour Step Viewed', { step: index + 1, chapter: tourSteps[index].label });
  }

  function handleTabKey(event, index) {
    const next = nextTabIndex(index, event.key, tourSteps.length);
    if (next === index && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    selectStep(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="tour-wrap" id="tour">
      <div className="tour shell">
        <div className="tour-heading"><div><p className="eyebrow"><span /> Illustrated build roadmap</p><h2>See how an idea<br />becomes a <em>system.</em></h2></div><p>This walkthrough illustrates the learning path. Visit the public Skool page to inspect the live community listing.</p></div>
        <div className="tour-console">
          <div className="tour-tabs" role="tablist" aria-label="Product tour chapters">
            {tourSteps.map((item, index) => <button id={`tour-tab-${index}`} key={item.label} ref={element => { tabs.current[index] = element; }} role="tab" aria-selected={step === index} aria-controls="tour-panel" tabIndex={step === index ? 0 : -1} type="button" onClick={() => selectStep(index)} onKeyDown={event => handleTabKey(event, index)}><span>0{index + 1}</span>{item.label}</button>)}
          </div>
          <div className="tour-panel" id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${step}`}>
            <div className="tour-copy"><span className="tour-kicker">CHAPTER 0{step + 1} / 04</span><h3>{active.title}</h3><p>{active.copy}</p><button type="button" className="tour-next" onClick={() => selectStep((step + 1) % tourSteps.length)}>{step === tourSteps.length - 1 ? 'Replay tour' : 'Next chapter'} <span>→</span></button></div>
            <div className="tour-screen" aria-label={`${active.label} example`}><div className="screen-bar"><i /><i /><i /><span>AI INCOME LAB / {active.label.toUpperCase()}</span></div><div className="screen-content"><small>{active.visual[0]}</small><strong>{active.visual[1]}</strong><span>{active.visual[2]}</span><div className="screen-progress"><i style={{ width: `${(step + 1) * 25}%` }} /></div></div></div>
          </div>
          <a className="tour-community-link" href={skoolCommunityUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('roadmap', 'View the community on Skool')}>View the community on Skool ↗</a>
        </div>
      </div>
    </section>
  );
}

function App() {
  const campaign = useRef(getCampaign(window.location.search, Object.keys(campaignMessages))).current;
  const message = campaignMessages[campaign.angle];
  const [mobileCtaVisible, setMobileCtaVisible] = useState(false);

  useEffect(() => {
    trackEvent('Campaign Landing Viewed', { angle: campaign.angle, campaign: campaign.params.utm_campaign || 'direct', content: campaign.params.utm_content || 'none' });
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
  }, [campaign]);

  useEffect(() => {
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
  }, [campaign]);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const pricing = document.getElementById('pricing');
    const join = document.getElementById('join');
    if (!hero || !pricing || !join) return undefined;
    const visible = new Map([[hero, true], [pricing, false], [join, false]]);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visible.set(entry.target, entry.isIntersecting));
      setMobileCtaVisible(!visible.get(hero) && !visible.get(pricing) && !visible.get(join));
    }, { threshold: .08 });
    [hero, pricing, join].forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const plansUrl = outboundUrl(skoolPlansUrl, campaign);
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <main id="top">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="AI Income Lab home"><span>AI</span> INCOME LAB</a>
        <div className="nav-links"><a href="#outcomes">Who it&apos;s for</a><a href="#tour">See inside</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
        <div className="nav-actions"><ThemeToggle /><a className="nav-pricing" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans', link_url: '#pricing', placement: 'navigation', action: 'view_pricing' })}>See plans</a></div>
      </nav>

      <section className="hero shell" id="main-content" tabIndex="-1">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {message.eyebrow}</p>
          <h1>{message.headline}</h1>
          <p className="hero-text">{message.text}</p>
        </div>
        <div className="hero-actions">
          <a className="button button-primary button-hero" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans from $29/month', link_url: '#pricing', placement: 'hero', action: 'view_pricing', angle: campaign.angle })}>See plans from $29/month <span>↓</span></a>
          <a className="hero-tour" href="#plan" onClick={() => trackEvent('CTA Clicked', { button_text: 'See the 30-day roadmap', link_url: '#plan', placement: 'hero', action: 'view_roadmap', angle: campaign.angle })}>See the 30-day roadmap <span>→</span></a>
        </div>
        <p className="cta-note">Monthly membership · Cancel anytime from your Skool account · Enrollment continues on Skool</p>
        <HeroVideo />
        <div className="hero-trust">
          <span className="hero-avatars" aria-hidden="true">
            {memberAvatars.map((src, index) => <img key={src} src={src} alt="" width="28" height="28" decoding="async" style={{ zIndex: memberAvatars.length - index }} />)}
          </span>
          <p><strong>2,900+ people</strong> listed in the Skool community</p>
        </div>
      </section>

      <section className="proof-strip" aria-label="Membership facts"><div className="shell"><div><strong>2,900+</strong><span>people listed on Skool</span></div><div><strong>6,400+</strong><span>N8N templates in VIP</span></div><div><strong>3</strong><span>monthly membership levels</span></div><a href={outboundUrl(skoolCommunityUrl, campaign)} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('proof_strip', 'View on Skool')}>View on Skool ↗</a></div></section>

      <section className="ticker" aria-label="Membership highlights"><div><span>NO CODING REQUIRED</span><i>✦</i><span>COURSES AND TUTORIALS</span><i>✦</i><span>WEEKLY COACHING WITH VIP</span><i>✦</i><span>CANCEL ANYTIME</span><i>✦</i></div></section>

      <section className="outcomes shell" id="outcomes">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Three ways people use this</p><h2>Make AI useful.<br /><em>Then make it pay.</em></h2></div>
          <p>No coding required. Pick one practical path, start small, and build the first version.</p>
        </div>
        <div className="outcome-grid">
          <article>
            <h3>Automate your own work</h3>
            <p>Hand the repetitive parts of your week to something that runs without you watching it.</p>
            <div className="outcome-build"><span>Start here</span><strong>A workflow that spots a new enquiry, pulls the details out, and drafts a reply for you to approve.</strong></div>
          </article>
          <article>
            <h3>Sell AI services to clients</h3>
            <p>Take something you have already built for yourself and set it up for a business that needs it.</p>
            <div className="outcome-build"><span>Start here</span><strong>That same enquiry workflow, rebuilt for one local business and run for them month to month.</strong></div>
          </article>
          <article>
            <h3>Start something of your own</h3>
            <p>Build a small product you keep improving, then sell the output or access to the system itself.</p>
            <div className="outcome-build"><span>Start here</span><strong>A content system that turns one recording into a week of posts, captions, and clips.</strong></div>
          </article>
        </div>
      </section>

      <section className="plan shell" id="plan">
        <div className="plan-title"><p className="eyebrow"><span /> Your first 30 days</p><h2>One clear path.<br />One working system.</h2></div>
        <div className="plan-grid">{buildPlan.map(([week, title, copy]) => <article key={week}><span>{week}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <p className="plan-note">This is a suggested build schedule. Income, client acquisition, and completion in 30 days are not guaranteed.</p>
      </section>

      <section className="pricing shell" id="pricing">
        <div className="pricing-intro">
          <div><p className="eyebrow"><span /> Select your build level</p><h2>Choose the support<br /><em>your next system needs.</em></h2></div>
          <p>Start with the essentials, add advanced training when you need it, or unlock the full template and software vault.</p>
        </div>
        <div className="pricing-assurance" aria-label="Membership details"><span>Monthly membership</span><span>Cancel anytime</span><span>Hosted on Skool</span><span>Upgrade as you grow</span></div>
        <div className="pricing-grid">
          {pricingPlans.map(({ name, price, fit, bestFor, description, recommended, features }, index) => (
            <article id={`plan-${name.toLowerCase()}`} className={`price-card${recommended ? ' price-card-recommended' : ''}`} key={name}>
              <div className="price-card-top">
                <span className="price-level">Level 0{index + 1}</span>
                {recommended && <span className="price-badge">Recommended</span>}
              </div>
              <h3>{name}</h3>
              <p className="price-fit">{fit}</p>
              <p className="price-best">{bestFor}</p>
              <p className="price-summary">{description}</p>
              <div className="price-amount"><span>$</span><strong>{price}</strong><small>USD<br />per month</small></div>
              <p className="price-includes">What you get</p>
              <ul aria-label={`${name} plan includes`}>{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <a className={`button ${recommended ? 'button-primary' : 'button-secondary'}`} href={outboundUrl(plansUrl, campaign, { selected_plan: name.toLowerCase() })} target="_blank" rel="noreferrer" onClick={() => trackPlanVisit(name, price, 'pricing_card')}>View {name} on Skool <span>↗</span></a>
              <small className="price-checkout">Skool will show all plans again before account creation</small>
            </article>
          ))}
        </div>
        <p className="pricing-note">All plans are billed monthly and can be canceled anytime. Pick the level that matches what you want to build now.</p>
      </section>

      <section className="inside-wrap" id="inside">
        <div className="inside shell">
          <div className="inside-intro"><p className="eyebrow"><span /> What each level unlocks</p><h2>Know what you pay for<br />before you <em>join.</em></h2><p>Every plan includes community access, courses, and tutorials. Premium and VIP add the resources shown below.</p></div>
          <div className="inclusion-list">{inclusions.map(([title, copy]) => <article key={title}><span className="check">✓</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <ProductTour />

      <section className="creator shell" aria-labelledby="creator-title">
        <p className="eyebrow"><span /> Your community host</p>
        <div><h2 id="creator-title">Created by<br /><em>Mike Holp.</em></h2><p>AI Income Lab is hosted by Mike Holp on Skool. Review the public community listing and current plan details before joining.</p><a href={outboundUrl(skoolCommunityUrl, campaign)} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('creator', 'View Mike and the community on Skool')}>View Mike and the community on Skool ↗</a></div>
      </section>

      <section className="lead-fallback"><div className="shell"><div><p className="eyebrow"><span /> Ready to start building?</p><h2>Join from just<br /><em>$29 per month.</em></h2><p>Choose the membership level that matches what you want to build now, then continue to Skool to create your account.</p></div><a className="button button-primary" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans from $29/month', link_url: '#pricing', placement: 'mid_page', action: 'view_pricing' })}>See plans from $29/month <span>↑</span></a></div></section>

      <section className="faq shell" id="faq"><div className="faq-heading"><p className="eyebrow"><span /> Before you join</p><h2>Clear answers.<br /><em>No guesswork.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} onToggle={event => event.currentTarget.open && trackEvent('FAQ Opened', { question })}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="no-need shell">
        <p className="eyebrow"><span /> Leave these at the door</p>
        <div><span>No technical background</span><span>No coding skills</span><span>No existing audience</span></div>
      </section>

      <section className="join-card shell" id="join">
        <div><p className="eyebrow"><span /> Join AI Income Lab</p><h2>Stop collecting tools.<br /><em>Start building income.</em></h2></div>
        <div className="join-side"><p>Join a private Skool community focused on turning AI tools into practical systems for business and clients.</p><a className="button button-light" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans from $29/month', link_url: '#pricing', placement: 'final', action: 'view_pricing' })}>See plans from $29/month <span>↑</span></a><small>Choose your level above</small></div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><span>AI</span> INCOME LAB</a><p>By Mike Holp · Practical AI systems for real-world income.</p><div className="footer-links"><a href={skoolCommunityUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('CTA Clicked', { button_text: 'Member login', link_url: skoolCommunityUrl, placement: 'footer', action: 'member_login' })}>Member login ↗</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><button type="button" onClick={() => window.dispatchEvent(new Event('open-privacy-choices'))}>Privacy choices</button><a href="#top">Back to top ↑</a></div></footer>
      {mobileCtaVisible && <div className="mobile-cta is-visible"><span><strong>Ready to build?</strong><small>Plans from $29/month</small></span><a href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans', link_url: '#pricing', placement: 'mobile_sticky', action: 'view_pricing' })}>See plans</a></div>}
    </main>
    <ConsentBanner />
    </>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><><App /><Analytics /></></StrictMode>);
