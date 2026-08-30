import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import './styles.css';

const joinUrl = 'https://www.skool.com/ai-automation-station-7346/plans?src=join';

function trackSkoolLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'AI Income Lab membership' });
  }
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
        <a className="nav-login" href="https://www.skool.com/ai-automation-station-7346" target="_blank" rel="noreferrer" onClick={trackSkoolLead}>Log in ↗</a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Private Skool community · 3,000+ members</p>
          <h1>Build your first<br /><em>AI income system</em><br />in 30 days.</h1>
          <p className="hero-text">Get the training, ready-to-use templates, and hands-on support to build an AI system for your own business—or sell it to clients.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={joinUrl} onClick={trackSkoolLead}>Join for $9/month <span>↗</span></a>
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
          <p className="eyebrow"><span /> Choose your starting point</p>
          <h2>Join free.<br /><em>Build faster.</em></h2>
          <p>Start inside the community, then unlock the systems and support that turn AI curiosity into useful work.</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card">
            <div className="price-card-head"><span className="price-label">01 / Community</span><strong>Free</strong></div>
            <p>Get inside AI Income Lab and start learning alongside people building with AI.</p>
            <ul><li>Private community access</li><li>Practical AI systems conversations</li><li>Updates, ideas, and peer support</li></ul>
            <a className="button button-secondary" href={joinUrl} target="_blank" rel="noreferrer">Join free <span>↗</span></a>
          </article>
          <article className="price-card price-card-featured">
            <div className="price-card-head"><span className="price-label">02 / Premium</span><strong>$9<small>/ month</small></strong></div>
            <p>Skip the guesswork with the resources and guidance to build systems you can use or sell.</p>
            <ul><li>Done-for-you templates</li><li>Full-length courses and tutorials</li><li>Supportive network and practical guidance</li></ul>
            <a className="button button-light" href={joinUrl} onClick={trackSkoolLead}>Get Premium <span>↗</span></a>
            <span className="price-note">Cancel anytime</span>
          </article>
        </div>
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
        <div className="join-side"><p>Join 3,000+ members turning leading AI tools into practical systems for business and clients.</p><a className="button button-light" href={joinUrl} onClick={trackSkoolLead}>Build my first system <span>↗</span></a><small>$9/month · Cancel anytime</small></div>
      </section>

      <footer className="footer shell"><a className="brand" href="#top"><span>AI</span> INCOME LAB</a><p>By Mike Holp · Practical AI systems for real-world income.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<StrictMode><><App /><Analytics /></></StrictMode>);
