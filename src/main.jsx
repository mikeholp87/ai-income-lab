import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics, track } from '@vercel/analytics/react';
import { getCampaign, nextTabIndex, outboundUrl } from './funnel.js';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent } from './tracking.js';
import './fonts.css';
import './styles.css';

const skoolPlansUrl = 'https://www.skool.com/ai-automation-station-7346/plans?src=join';
const skoolCommunityUrl = 'https://www.skool.com/ai-automation-station-7346';
const campaignMessages = {
  agency: { eyebrow: 'For AI freelancers and agency builders', headline: <>Build an AI system<br />you can <em>sell to clients.</em></>, text: 'Follow a practical 30-day path from useful workflow to a client-ready offer—with templates and support when you get stuck.' },
  business: { eyebrow: 'For business owners buried in repetitive work', headline: <>Automate one expensive<br /><em>workflow in 30 days.</em></>, text: 'Turn repetitive work into a practical AI system using guided training, ready-to-use templates, and weekly support.' },
  creator: { eyebrow: 'For creators ready to turn AI into output', headline: <>Build an AI system<br />that <em>creates leverage.</em></>, text: 'Use practical workflows to produce more, package what works, and create a system you can use—or sell.' },
  default: { eyebrow: 'Private Skool community · 3,000+ members', headline: <>Build an AI system<br />you can <em>use—or sell</em><br />in 30 days.</>, text: 'Get guided training and hands-on support to build an AI system for your own business—or sell it to clients. Upgrade when you want advanced training, software deals, and the full template vault.' },
};

const googleEventNames = {
  'CTA Clicked': 'cta_click',
  Lead: 'generate_lead',
};

function trackEvent(name, properties = {}) {
  track(name, properties);
  trackGoogleEvent(googleEventNames[name] || name.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase(), properties);
}

function trackCheckout(plan, price, placement) {
  const properties = { content_name: `${plan} membership`, content_category: 'membership', button_text: 'Continue to Skool plans', link_url: skoolPlansUrl, value: price, currency: 'USD', plan, placement };
  trackEvent('CTA Clicked', { ...properties, action: 'choose_plan' });
  track('InitiateCheckout', properties);
  trackGoogleEvent('begin_checkout', { ...properties, items: [{ item_id: plan.toLowerCase(), item_name: `${plan} membership`, item_category: 'membership', price, quantity: 1 }] });
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', properties);
    window.fbq('track', 'InitiateCheckout', properties);
  }
}

function trackSkoolLead(placement, buttonText) {
  const properties = { content_name: 'AI Income Lab membership', content_category: 'membership', button_text: buttonText, link_url: skoolCommunityUrl, placement };
  trackEvent('CTA Clicked', { ...properties, action: 'visit_skool' });
  if (placement !== 'navigation') trackEvent('Lead', properties);
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('track', 'Lead', properties);
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
  ['Playbooks', 'Step-by-step tutorials and courses that move you from idea to working system.'],
  ['Templates', 'Ready-to-use resources you can customize, reuse, and sell.'],
  ['Tool library', '600+ curated AI tools and software deals, organized to save you hours.'],
  ['Live support', 'Weekly Q&A and coaching sessions when you need a second set of eyes.'],
  ['Community', 'A growing group of builders learning, testing, and sharing what works.'],
  ['Advanced workflows', 'Client-ready systems and deeper training when you are ready to level up.'],
];

const pricingPlans = [
  { name: 'Standard', price: 9, fit: 'Learn the foundations', bestFor: 'Best for learning and building your first workflow', description: 'Start with the community, core courses, and practical tutorials.', features: ['Community Access', 'Courses & Tutorials', 'Upgrade To Premium'] },
  { name: 'Premium', price: 49, fit: 'Build with more depth', bestFor: 'Best for active builders who want advanced training', description: 'Add advanced training when you are ready to build stronger systems.', recommended: true, features: ['Community Access', 'Courses & Tutorials', 'Advanced Training', 'Upgrade To VIP'] },
  { name: 'VIP', price: 89, fit: 'Open the full vault', bestFor: 'Best for serious implementation and template access', description: 'Get the deepest resource library for serious implementation work.', features: ['Community Access', 'Courses & Tutorials', 'Advanced Training', 'Curated Software Deals', '6,400+ N8N Templates'] },
];

const tourSteps = [
  { label: 'Learn', title: 'Start with one useful problem', copy: 'Follow a focused course or tutorial instead of guessing which AI tool to learn next.', visual: ['PROBLEM SELECTED', 'Repetitive lead follow-up', 'TARGET: save 5+ hours/week'] },
  { label: 'Build', title: 'Adapt a working template', copy: 'Use guided workflows and templates as your starting point, then customize the pieces that matter.', visual: ['WORKFLOW ACTIVE', 'Trigger → AI step → action', 'STATUS: ready to test'] },
  { label: 'Support', title: 'Get unstuck with real support', copy: 'Bring blockers to the community and weekly live coaching so a small issue does not stop the build.', visual: ['SUPPORT QUEUE', 'Question posted', 'NEXT: weekly live Q&A'] },
  { label: 'Ship', title: 'Put the system to work', copy: 'Use the finished workflow inside your business or package the outcome as a client-ready service.', visual: ['SYSTEM OUTPUT', 'Repeatable AI workflow', 'READY TO USE / SELL'] },
];

const faqs = [
  ['Do I need coding experience?', 'No. The training is designed around practical AI and no-code automation workflows. You can start with guided tutorials and ready-to-use templates.'],
  ['Which plan should I choose?', 'Choose Standard for the foundations, Premium for advanced training, or VIP when you want the complete software-deal and N8N template vault. You can upgrade later as your needs grow.'],
  ['How much time should I set aside?', 'The 30-day path is designed for steady progress. A few focused hours each week is enough to choose a problem, build a first version, and put it to work.'],
  ['What happens after I join?', 'Skool gives you immediate access to the community and everything included in your selected plan. Start with the foundational material and introduce yourself so you can get directed to the right resources.'],
  ['Can I upgrade later?', 'Yes. Standard and Premium both include a clear upgrade path, so you can start at the level you need today.'],
  ['Can I cancel anytime?', 'Yes. Plans are billed monthly, and you can cancel your membership before the next billing period from your Skool account.'],
  ['What tools will I need?', 'Start with the tools used in the tutorial you choose. You do not need an expensive software stack upfront, and the curated tool library helps you compare options.'],
];

function BuildBoard() {
  return (
    <div className="build-board" aria-label="A four-week plan to build an AI income system">
      <div className="board-head">
        <span>30-DAY BUILD PLAN</span>
        <span className="board-status"><i /> SYSTEM ONLINE</span>
      </div>
      <div className="board-track" aria-hidden="true"><span /></div>
      <div className="board-steps">
        {buildPlan.map(([week, title], index) => (
          <div className="board-step" key={week}>
            <span className="step-check">{index === 3 ? '↗' : '✓'}</span>
            <div><small>{week}</small><strong>{title}</strong></div>
          </div>
        ))}
      </div>
      <div className="board-output">
        <span>OUTPUT</span>
        <strong>ONE WORKING AI<br />INCOME SYSTEM</strong>
        <span className="output-tag">READY TO USE / SELL</span>
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
        <div className="tour-heading"><div><p className="eyebrow"><span /> 60-second product tour</p><h2>See how an idea<br />becomes a <em>system.</em></h2></div><p>Explore the four parts of the membership before you choose a plan.</p></div>
        <div className="tour-console">
          <div className="tour-tabs" role="tablist" aria-label="Product tour chapters">
            {tourSteps.map((item, index) => <button id={`tour-tab-${index}`} key={item.label} ref={element => { tabs.current[index] = element; }} role="tab" aria-selected={step === index} aria-controls="tour-panel" tabIndex={step === index ? 0 : -1} type="button" onClick={() => selectStep(index)} onKeyDown={event => handleTabKey(event, index)}><span>0{index + 1}</span>{item.label}</button>)}
          </div>
          <div className="tour-panel" id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${step}`}>
            <div className="tour-copy"><span className="tour-kicker">CHAPTER 0{step + 1} / 04</span><h3>{active.title}</h3><p>{active.copy}</p><button type="button" className="tour-next" onClick={() => selectStep((step + 1) % tourSteps.length)}>{step === tourSteps.length - 1 ? 'Replay tour' : 'Next chapter'} <span>→</span></button></div>
            <div className="tour-screen" aria-label={`${active.label} example`}><div className="screen-bar"><i /><i /><i /><span>AI INCOME LAB / {active.label.toUpperCase()}</span></div><div className="screen-content"><small>{active.visual[0]}</small><strong>{active.visual[1]}</strong><span>{active.visual[2]}</span><div className="screen-progress"><i style={{ width: `${(step + 1) * 25}%` }} /></div></div></div>
          </div>
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
          <div className="hero-actions">
            <a className="button button-primary" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans from $9', link_url: '#pricing', placement: 'hero', action: 'view_pricing', angle: campaign.angle })}>See plans from $9 <span>↓</span></a>
            <a className="button button-secondary" href="#tour" onClick={() => trackEvent('CTA Clicked', { button_text: 'Take the 60-second tour', link_url: '#tour', placement: 'hero', action: 'view_tour', angle: campaign.angle })}>Take the 60-second tour <span>→</span></a>
          </div>
          <p className="cta-note">Monthly plans · Hosted on Skool · Start at your level</p>
          <div className="trust-line"><span><strong>3,000+</strong> members</span><span><strong>600+</strong> curated tools</span><span><strong>Weekly</strong> live coaching</span></div>
        </div>
        <div className="hero-board"><BuildBoard /><p>Built for action—not another folder of saved AI tutorials.</p></div>
      </section>

      <section className="proof-strip" aria-label="Membership proof"><div className="shell"><div><strong>3,000+</strong><span>builders in the community</span></div><div><strong>6,400+</strong><span>N8N templates in VIP</span></div><div><strong>Weekly</strong><span>live Q&amp;A and coaching</span></div><a href={outboundUrl(skoolCommunityUrl, campaign)} target="_blank" rel="noreferrer" onClick={() => trackSkoolLead('proof_strip', 'Verify on Skool')}>Verify on Skool ↗</a></div></section>

      <section className="ticker" aria-label="Membership highlights"><div><span>NO CODING REQUIRED</span><i>✦</i><span>READY-TO-USE TEMPLATES</span><i>✦</i><span>WEEKLY LIVE Q&amp;A</span><i>✦</i><span>CANCEL ANYTIME</span><i>✦</i></div></section>

      <section className="outcomes shell" id="outcomes">
        <div className="section-heading"><p className="eyebrow"><span /> Choose your outcome</p><h2>Make AI useful.<br /><em>Then make it pay.</em></h2></div>
        <div className="outcome-grid">
          <article><span className="outcome-icon">↻</span><h3>Automate your business</h3><p>Replace repetitive work with practical systems that save time every week.</p></article>
          <article><span className="outcome-icon">↗</span><h3>Sell AI services</h3><p>Package useful workflows into client-ready offers people understand and buy.</p></article>
          <article><span className="outcome-icon">+</span><h3>Build a new income stream</h3><p>Move from learning about AI to creating something you can use, improve, and sell.</p></article>
        </div>
      </section>

      <ProductTour />

      <section className="inside-wrap" id="inside">
        <div className="inside shell">
          <div className="inside-intro"><p className="eyebrow"><span /> Your membership</p><h2>Everything you need<br />to start <em>building.</em></h2><p>Skip the tool overload. Follow practical examples, start with proven resources, and get help when you get stuck.</p></div>
          <div className="inclusion-list">{inclusions.map(([title, copy]) => <article key={title}><span className="check">✓</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
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
                {recommended && <span className="price-badge">Most popular</span>}
              </div>
              <h3>{name}</h3>
              <p className="price-fit">{fit}</p>
              <p className="price-best">{bestFor}</p>
              <p className="price-summary">{description}</p>
              <div className="price-amount"><span>$</span><strong>{price}</strong><small>USD<br />per month</small></div>
              <p className="price-includes">What you get</p>
              <ul aria-label={`${name} plan includes`}>{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <a className={`button ${recommended ? 'button-primary' : 'button-secondary'}`} href={outboundUrl(plansUrl, campaign, { utm_content: name.toLowerCase() })} target="_blank" rel="noreferrer" onClick={() => trackCheckout(name, price, 'pricing_card')}>Continue to Skool plans <span>↗</span></a>
              <small className="price-checkout">Choose and confirm your plan securely on Skool</small>
            </article>
          ))}
        </div>
        <p className="pricing-note">All plans are billed monthly and can be canceled anytime. Pick the level that matches what you want to build now.</p>
      </section>

      <section className="plan shell" id="plan">
        <div className="plan-title"><p className="eyebrow"><span /> Your first 30 days</p><h2>One clear path.<br />One working system.</h2></div>
        <div className="plan-grid">{buildPlan.map(([week, title, copy]) => <article key={week}><span>{week}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="lead-fallback"><div className="shell"><div><p className="eyebrow"><span /> Ready to start building?</p><h2>Join from just<br /><em>$9 per month.</em></h2><p>Choose the membership level that matches what you want to build now, then upgrade when you need more depth.</p></div><a className="button button-primary" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans from $9', link_url: '#pricing', placement: 'mid_page', action: 'view_pricing' })}>See plans from $9 <span>↑</span></a></div></section>

      <section className="faq shell" id="faq"><div className="faq-heading"><p className="eyebrow"><span /> Before you join</p><h2>Clear answers.<br /><em>No guesswork.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} onToggle={event => event.currentTarget.open && trackEvent('FAQ Opened', { question })}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="no-need shell">
        <p className="eyebrow"><span /> Leave these at the door</p>
        <div><span>No technical background</span><span>No coding skills</span><span>No expensive software stack</span></div>
      </section>

      <section className="join-card shell" id="join">
        <div><p className="eyebrow"><span /> Join AI Income Lab</p><h2>Stop collecting tools.<br /><em>Start building income.</em></h2></div>
        <div className="join-side"><p>Join 3,000+ members turning leading AI tools into practical systems for business and clients.</p><a className="button button-light" href="#pricing" onClick={() => trackEvent('CTA Clicked', { button_text: 'See plans from $9', link_url: '#pricing', placement: 'final', action: 'view_pricing' })}>See plans from $9 <span>↑</span></a><small>Choose your level above</small></div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><span>AI</span> INCOME LAB</a><p>By Mike Holp · Practical AI systems for real-world income.</p><div className="footer-links"><a href={skoolCommunityUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('CTA Clicked', { button_text: 'Member login', link_url: skoolCommunityUrl, placement: 'footer', action: 'member_login' })}>Member login ↗</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><button type="button" onClick={() => window.dispatchEvent(new Event('open-privacy-choices'))}>Privacy choices</button><a href="#top">Back to top ↑</a></div></footer>
      {mobileCtaVisible && <div className="mobile-cta is-visible"><span><strong>Ready to build?</strong><small>Plans from $9/month</small></span><a href="#pricing" aria-label="See membership plans" onClick={() => trackEvent('CTA Clicked', { button_text: 'See membership plans', link_url: '#pricing', placement: 'mobile_sticky', action: 'view_pricing' })}>↓</a></div>}
    </main>
    <ConsentBanner />
    </>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><><App /><Analytics /></></StrictMode>);
