import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Source checks for the landing page; scripts/prerender.js checks the rendered output.
const jsx = await readFile(new URL('./main.jsx', import.meta.url), 'utf8');
const css = await readFile(new URL('./styles.css', import.meta.url), 'utf8');

function media(query) {
  const start = css.indexOf(`@media ${query} {`);
  assert.ok(start >= 0, `missing @media ${query}`);
  let depth = 0;
  for (let index = css.indexOf('{', start); index < css.length; index++) {
    if (css[index] === '{') depth++;
    else if (css[index] === '}' && --depth === 0) return css.slice(start, index + 1);
  }
  assert.fail(`unclosed @media ${query}`);
}

test('phones put each plan price on the plan name row', () => {
  const phone = media('(max-width: 640px)');
  assert.match(phone, /\.plan-list > li > div \{ display: contents; \}/);
  assert.match(phone, /\.plan-list \.plan-price \{ grid-row: 1; grid-column: 2; \}/);
});

test('product card links align at the bottom of each card without competing with Join buttons', () => {
  assert.match(jsx, /<div className="tool-action">\s*\{tool\.note && <p className="fine-print">\{tool\.note\}<\/p>\}\s*<a className="tool-link"/);
  assert.doesNotMatch(jsx, /\['#tools',/);
  assert.match(css, /\.tool ul \{[^}]*margin: 4px 0 0;/);
  assert.match(css, /\.tool-action \{ margin-top: auto; padding-top: 24px; \}/);
});

test('the portrait stays beside the About copy on desktop', () => {
  assert.match(css, /\.portrait \{[^}]*position: sticky; top: 96px;/);
  // One column: sticky would pin the photo over the bio, since it sticks within the whole grid.
  assert.match(media('(max-width: 960px)'), /\.portrait \{[^}]*position: static;[^}]*justify-self: center;/);
});

const count = (text, needle) => text.split(needle).length - 1;

test('each claim and note appears once at most', () => {
  assert.equal(count(jsx, 'leave the mistakes in'), 1);
  assert.equal(count(jsx, 'Course access varies by plan'), 0);
  assert.doesNotMatch(jsx, /press play\./);
  assert.doesNotMatch(jsx, /Can I try TubeAnalytics or VisiScan for free\?/);
  assert.doesNotMatch(css, /\.booking-note|\.player-note/);
});

test('pricing ends with one billing note and one help line', () => {
  assert.doesNotMatch(jsx, /View plans from \$29\/month/);
  assert.doesNotMatch(jsx, /Open the classroom \(member login\)/);
  assert.doesNotMatch(jsx, /Start a free build/);
  assert.match(jsx, /Levels are your Skool community level\./);
});

test('the classroom list names courses without repeating plan access', () => {
  const start = jsx.indexOf('<h3>Inside the classroom</h3>');
  const classroom = jsx.slice(start, jsx.indexOf('</ul>', start));
  assert.ok(start >= 0);
  assert.doesNotMatch(classroom, /level|Premium|VIP|Included with/i);
});

test('the guides section follows videos in the header and page, with one start link', () => {
  assert.match(jsx, /\['#latest', 'Videos'\], \['#guides', 'Guides'\]/);
  const start = jsx.indexOf('id="guides"');
  const guides = jsx.slice(start, jsx.indexOf('</section>', start));
  assert.ok(jsx.indexOf('id="latest"') < start && start < jsx.indexOf('id="tools"'));
  assert.match(guides, /<SectionHead eyebrow="Guides" /);
  assert.equal(count(guides, 'href="/start-here.html"'), 1);
  assert.doesNotMatch(jsx, /Start your first build|Prefer a recording\?|'video_grid'|Every video on YouTube/);
  // Fixed /watch/ links keep evergreen video pages linked from the homepage for indexing.
  for (const id of ['7v_675nO7nM', 'geKngm3sg3w', 'G8u1-hKEqig']) assert.match(jsx, new RegExp(`href="/watch/${id}"`));
  assert.match(media('(max-width: 640px)'), /\.build-guides ul \{ grid-template-columns: 1fr; \}/);
});

test('the build list shows three projects', () => {
  const start = jsx.indexOf('const repos = [');
  assert.equal(count(jsx.slice(start, jsx.indexOf('];', start)), "{ name: '"), 3);
});

test('the hero relates the two brands without an announcement pill', () => {
  assert.match(jsx, /AI Income Lab is Mike Holp.*paid learning community from the AI Automation Station YouTube channel\./);
  assert.doesNotMatch(jsx, /hero-status/);
});

test('FAQ questions are not numbered and plan copy skips em dashes', () => {
  assert.doesNotMatch(jsx, /faq-num/);
  const start = jsx.indexOf('const plans = [');
  assert.doesNotMatch(jsx.slice(start, jsx.indexOf('];', start)), /—/);
  assert.doesNotMatch(jsx, /Choose \{plan\.name\} —/);
});

test('Skool buttons share one label and new-tab buttons end with ↗', () => {
  assert.doesNotMatch(jsx, /Explore plans on Skool|Explore the course on Skool/);
  assert.equal(count(jsx, '>Subscribe on YouTube ↗</a>'), 2);
  assert.match(jsx, />\{tool\.cta\} ↗<\/a>/);
  for (const [link] of jsx.matchAll(/<a className="button.*?<\/a>/g)) {
    if (link.includes('target="_blank"')) assert.match(link, /↗<\/a>$/, link);
  }
});

test('the nav names the plans and section labels say what follows', () => {
  assert.match(jsx, /\['#community', 'Plans'\]/);
  assert.match(jsx, /eyebrow="Plans" title="Your next build,"/);
  assert.match(jsx, /eyebrow="Latest videos"/);
});

test('channel and member numbers sit just before the plans', () => {
  assert.ok(jsx.indexOf('<section className="stats"') < jsx.indexOf('id="community"'));
  assert.match(jsx, /\['2,900\+', 'community members'\]/);
  assert.match(css, /\.stats dl \{ display: grid; grid-template-columns: repeat\(4, minmax\(0, 1fr\)\); \}/);
  // Full-bleed on phones so the rule between the two rows meets the band's edge-to-edge borders.
  assert.match(media('(max-width: 640px)'), /\.stats dl \{ width: 100%; grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/);
});

test('prose uses Instrument Sans while labels keep DM Mono', () => {
  assert.match(css, /\.lede,[^{]*\.fine-print,[^{]*\.faq-list details p,[^{]*\{ font-family: var\(--sans\); \}/);
  assert.match(css, /\.eyebrow, \.nav-links, \.text-link, \.button, \.footer-columns h2, \.stats dt \{ font-family: var\(--mono\);/);
});

test('the main Join buttons open the Skool plan picker', () => {
  for (const placement of ['navigation', 'hero', 'runable_course', 'footer']) {
    assert.match(jsx, new RegExp(`href=\\{plansUrl\\}[^\\n]*trackCommunityVisit\\('${placement}', 'Join AI Income Lab', plansUrl\\)`), placement);
  }
  assert.match(jsx, /trackCommunityVisit\('footer', 'AI Income Lab'\)/);
});

test('footer social links show an icon beside each name', () => {
  assert.match(jsx, /socialLinks\.map\(\(\[name, url, icon\]\) => <a key=\{name\} href=\{url\} target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 16 16" aria-hidden="true"><path d=\{icon\} \/><\/svg>\{name\}<\/a>\)/);
  for (const name of ['YouTube', 'GitHub', 'LinkedIn', 'X']) assert.match(jsx, new RegExp(`\\['${name}', \\w+Url, 'M`), name);
  assert.match(css, /\.social-icon \{ flex: none; width: 16px; height: 16px; fill: currentColor; \}/);
  assert.match(jsx, /<a href="mailto:automojic@proton\.me"><svg className="social-icon" viewBox="0 0 16 16" aria-hidden="true"><path d=\{emailIcon\} \/><\/svg>Email<\/a>/);
  assert.doesNotMatch(jsx, /Sponsor a video \/ book a call/);
});

test('the homepage links every written guide so new guides are found and crawled', async () => {
  const { readdir } = await import('node:fs/promises');
  const guides = (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html'));
  assert.ok(guides.length >= 9);
  for (const file of guides) assert.match(jsx, new RegExp(`<a href="/guides/${file.replace('.', '\\.')}">`), file);
});

test('sponsored videos sit directly above the booking section', () => {
  assert.match(jsx, /<section className="section" id="sponsored">[\s\S]*?<\/section>\s*<\/>\}\s*<div className="divider reveal" aria-hidden="true" \/>\s*<section className="section" id="work-together">/);
});

test('the media kit follows About, then services, before sponsored videos and booking', () => {
  assert.match(jsx, /<section className="section band" id="about">[\s\S]*?<\/section>\s*<div className="divider reveal" aria-hidden="true" \/>\s*<MediaKit \/>\s*<div className="divider reveal" aria-hidden="true" \/>\s*<Services channel=\{channel\} \/>\s*\{sponsoredVideos\.length > 0/);
});

test('every rate card format has a service card with its price', () => {
  const start = jsx.indexOf('function Services(');
  const services = jsx.slice(start, jsx.indexOf('\nfunction ', start + 1));
  for (const [name, price] of [['Multi-platform campaign', '$2,250'], ['Dedicated video', '$1,500'], ['YouTube Short', '$400'], ['AI Income Lab post', '$300'], ['LinkedIn post', '$350']]) {
    assert.match(services, new RegExp(`<h3>${name}</h3>\\s*<p className="service-price">\\${price}`), name);
  }
});

test('the header links to FAQ and sponsor packages between About and Contact', () => {
  assert.match(jsx, /\['#about', 'About'\], \['#faq', 'FAQ'\], \['#services', 'Sponsors'\], \['#work-together', 'Contact'\]/);
  assert.match(jsx, /<section className="section" id="services">/);
  // Seven links share the bar down to the 961px collapse point; none may wrap to two lines.
  assert.match(css, /\.nav-links a \{[^}]*white-space: nowrap;/);
});

test('every service card preselects a package the contact form offers', () => {
  const packages = jsx.match(/const packages = (\[.*\]);/)[1];
  const choices = [...jsx.matchAll(/onClick=\{ask\('[^']+', '([^']+)'\)\}/g)].map(match => match[1]);
  assert.equal(choices.length, 6);
  for (const choice of choices) assert.ok(packages.includes(`['${choice}'`), choice);
  assert.match(jsx, /<select name="topic" required value=\{topic\}/);
});

test('plan cards show the verified monthly and annual prices and report the chosen plan', () => {
  for (const [name, monthly, annual] of [['Standard', 29, 290], ['Premium', 49, 490], ['VIP', 89, 890]]) {
    assert.match(jsx, new RegExp(`\\{ name: '${name}', price: ${monthly}, annual: ${annual},`), name);
  }
  assert.match(jsx, /or \$\{plan\.annual\} a year/);
  assert.match(jsx, /plan_name: plan\.name, plan_price: plan\.price/);
  assert.match(jsx, /From \$29 a month or \$290 a year\. You pick a plan on Skool and can cancel anytime\./);
});

test('the hero heading names the community in both variants', () => {
  assert.equal(count(jsx, '<h1><span className="hero-brand">AI Income Lab:</span> '), 2);
  assert.match(css, /\.hero h1 \.hero-brand \{/);
});
