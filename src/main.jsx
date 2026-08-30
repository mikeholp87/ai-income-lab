import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles.css';

const joinUrl = 'https://www.skool.com/ai-automation-station-7346/plans?src=join';

function trackSkoolLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'AI Income Lab membership' });
  }
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
  { name: 'Standard', price: 9, fit: 'Learn the foundations', description: 'Start with the community, core courses, and practical tutorials.', features: ['Community Access', 'Courses & Tutorials', 'Upgrade To Premium'] },
  { name: 'Premium', price: 49, fit: 'Build with more depth', description: 'Add advanced training when you are ready to build stronger systems.', recommended: true, features: ['Community Access', 'Courses & Tutorials', 'Advanced Training', 'Upgrade To VIP'] },
  { name: 'VIP', price: 89, fit: 'Open the full vault', description: 'Get the deepest resource library for serious implementation work.', features: ['Community Access', 'Courses & Tutorials', 'Advanced Training', 'Curated Software Deals', '6,400+ N8N Templates'] },
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

function App() {
  return (
    <main id="top">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="AI Income Lab home"><span>AI</span> INCOME LAB</a>
        <div className="nav-links"><a href="#outcomes">Who it&apos;s for</a><a href="#inside">What you get</a><a href="#pricing">Pricing</a><a href="#plan">30-day plan</a></div>
        <div className="nav-actions"><ThemeToggle /><a className="nav-login" href="https://www.skool.com/ai-automation-station-7346" target="_blank" rel="noreferrer" onClick={trackSkoolLead}>Log in ↗</a></div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Private Skool community · 3,000+ members</p>
          <h1>Build your first<br /><em>AI income system</em><br />in 30 days.</h1>
          <p className="hero-text">Get the training, ready-to-use templates, and hands-on support to build an AI system for your own business—or sell it to clients.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={joinUrl} onClick={trackSkoolLead}>Join from $9/month <span>↗</span></a>
            <a className="button button-secondary" href="#inside">See what&apos;s inside <span>↓</span></a>
          </div>
          <div className="trust-line"><span><strong>3,000+</strong> members</span><span><strong>600+</strong> curated tools</span><span><strong>Weekly</strong> live coaching</span></div>
        </div>
        <div className="hero-board"><BuildBoard /><p>Built for action—not another folder of saved AI tutorials.</p></div>
      </section>

      <section className="ticker" aria-label="Membership highlights"><div><span>NO CODING REQUIRED</span><i>✦</i><span>READY-TO-USE TEMPLATES</span><i>✦</i><span>WEEKLY LIVE Q&amp;A</span><i>✦</i><span>CANCEL ANYTIME</span><i>✦</i></div></section>

      <section className="outcomes shell" id="outcomes">
        <div className="section-heading"><p className="eyebrow"><span /> Choose your outcome</p><h2>Make AI useful.<br /><em>Then make it pay.</em></h2></div>
        <div className="outcome-grid">
          <article><span className="outcome-icon">↻</span><h3>Automate your business</h3><p>Replace repetitive work with practical systems that save time every week.</p></article>
          <article><span className="outcome-icon">↗</span><h3>Sell AI services</h3><p>Package useful workflows into client-ready offers people understand and buy.</p></article>
          <article><span className="outcome-icon">+</span><h3>Build a new income stream</h3><p>Move from learning about AI to creating something you can use, improve, and sell.</p></article>
        </div>
      </section>

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
        <div className="pricing-assurance" aria-label="Membership details"><span>Monthly membership</span><span>Hosted on Skool</span><span>Three ways to join</span></div>
        <div className="pricing-grid">
          {pricingPlans.map(({ name, price, fit, description, recommended, features }, index) => (
            <article className={`price-card${recommended ? ' price-card-recommended' : ''}`} key={name}>
              <div className="price-card-top">
                <span className="price-level">Level 0{index + 1}</span>
                {recommended && <span className="price-badge">Recommended</span>}
              </div>
              <h3>{name}</h3>
              <p className="price-fit">{fit}</p>
              <p className="price-summary">{description}</p>
              <div className="price-amount"><span>$</span><strong>{price}</strong><small>USD<br />per month</small></div>
              <p className="price-includes">What you get</p>
              <ul aria-label={`${name} plan includes`}>{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <a className={`button ${recommended ? 'button-primary' : 'button-secondary'}`} href={joinUrl} target="_blank" rel="noreferrer" onClick={trackSkoolLead}>Join {name} <span>↗</span></a>
              <small className="price-checkout">Choose this plan on Skool</small>
            </article>
          ))}
        </div>
        <p className="pricing-note">All plans are billed monthly. Pick the level that matches what you want to build now.</p>
      </section>

      <section className="plan shell" id="plan">
        <div className="plan-title"><p className="eyebrow"><span /> Your first 30 days</p><h2>One clear path.<br />One working system.</h2></div>
        <div className="plan-grid">{buildPlan.map(([week, title, copy]) => <article key={week}><span>{week}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="no-need shell">
        <p className="eyebrow"><span /> Leave these at the door</p>
        <div><span>No technical background</span><span>No coding skills</span><span>No expensive software stack</span></div>
      </section>

      <section className="join-card shell" id="join">
        <div><p className="eyebrow"><span /> Join AI Income Lab</p><h2>Stop collecting tools.<br /><em>Start building income.</em></h2></div>
        <div className="join-side"><p>Join 3,000+ members turning leading AI tools into practical systems for business and clients.</p><a className="button button-light" href={joinUrl} onClick={trackSkoolLead}>Build my first system <span>↗</span></a><small>Plans from $9/month</small></div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><span>AI</span> INCOME LAB</a><p>By Mike Holp · Practical AI systems for real-world income.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><><App /><Analytics /></></StrictMode>);
