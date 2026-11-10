import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Source checks for the landing page; scripts/prerender.js checks the rendered output.
const jsx = await readFile(new URL('./main.jsx', import.meta.url), 'utf8');
const css = await readFile(new URL('./styles.css', import.meta.url), 'utf8');
const snapshot = await readFile(new URL('./repositories-snapshot.json', import.meta.url), 'utf8');

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

test('plans are three equal cards on desktop and stack on tablets and phones, price on the name row', () => {
  assert.match(css, /\.plan-list \{ display: grid; grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.plan-list > li > div \{ display: contents; \}/);
  assert.match(css, /\.plan-list \.plan-price \{ grid-row: 1; grid-column: 2;/);
  assert.match(media('(max-width: 960px)'), /\.plan-list \{ grid-template-columns: minmax\(0, 1fr\);/);
});

test('product card links align at the bottom of each card without competing with Join buttons', () => {
  assert.match(jsx, /<div className="tool-action">\s*\{tool\.note && <p className="fine-print">\{tool\.note\}<\/p>\}\s*\{tool\.url && <a className="button button-primary" href=\{tool\.url\}/);
  assert.match(jsx, /name: 'TubeAnalytics',\s*url: null/);
  assert.match(jsx, /TubeAnalytics is temporarily unavailable/);
  assert.match(jsx, /<summary aria-label="Site menu">Menu<\/summary>/);
  assert.doesNotMatch(jsx, /\['#tools',/);
  assert.match(css, /\.tool ul \{[^}]*margin: 4px 0 0;/);
  assert.match(css, /\.tool-action \{ margin-top: auto; padding-top: 24px; \}/);
});

test('privacy and terms descriptions use the www host', async () => {
  const privacy = await readFile(new URL('../public/privacy.html', import.meta.url), 'utf8');
  const terms = await readFile(new URL('../public/terms.html', import.meta.url), 'utf8');
  assert.match(privacy, /www\.ai-automation-station\.com handles/);
  assert.match(terms, /www\.ai-automation-station\.com and joining/);
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

test('the plans section has no classroom list or tour video beside it', () => {
  assert.doesNotMatch(jsx, /Inside the classroom|CommunityVideo|hero-video/);
  assert.doesNotMatch(css, /\.community-video|\.course-preview|\.community-grid/);
});

test('the guides section follows videos in the header and page, with one start link', () => {
  assert.match(jsx, /\['#latest', 'Videos'\], \['#guides', 'Guides'\]/);
  const start = jsx.indexOf('id="guides"');
  const guides = jsx.slice(start, jsx.indexOf('</section>', start));
  assert.ok(jsx.indexOf('id="latest"') < start && start < jsx.indexOf('id="tools"'));
  assert.match(guides, /<SectionHead title="Written guides">/);
  assert.equal(count(guides, 'href="/start-here.html"'), 1);
  assert.doesNotMatch(jsx, /Start your first build|Prefer a recording\?|'video_grid'|Every video on YouTube/);
  // Fixed /watch/ links keep evergreen video pages linked from the homepage for indexing.
  for (const id of ['7v_675nO7nM', 'geKngm3sg3w', 'G8u1-hKEqig']) assert.match(jsx, new RegExp(`href="/watch/${id}"`));
  assert.match(media('(max-width: 640px)'), /\.build-guides \.guide-cards \{ grid-template-columns: 1fr; gap: 24px; \}/);
});

test('the latest videos section links every shared video topic', () => {
  const start = jsx.indexOf('id="latest"');
  const latest = jsx.slice(start, jsx.indexOf('</section>', start));
  assert.match(latest, /<nav className="topic-row" aria-label="Browse videos by topic">/);
  assert.match(jsx, /import \{ topics \} from '\.\/topics\.js';/);
  assert.match(latest, /topics\.map\(topic => <a key=\{topic\.slug\} href=\{`\/videos\/\$\{topic\.slug\}`\}>\{topic\.name\}<\/a>\)/);
  assert.match(css, /\.topic-row \{ display: flex; flex-wrap: wrap;/);
  assert.match(css, /\.topic-row a \{ display: inline-flex; align-items: center; min-height: 44px;/);
});

test('the homepage lists GitHub projects in a separate section', () => {
  const start = jsx.indexOf('id="code"');
  const section = jsx.slice(start, jsx.indexOf('</section>', start));
  for (const name of ['Tasky', 'Luma-Launcher', 'Restic-Studio']) assert.match(snapshot, new RegExp(name));
  for (const name of ['solar-business-directory', 'seo-tool', 'mikeholp87.github.io']) assert.doesNotMatch(snapshot, new RegExp(name));
  assert.match(section, /projects\.slice\(0, 9\)\.map\(repo/);
  assert.doesNotMatch(section, /DoStuff-Media/);
  assert.match(section, /<\/ul>\s*<a className="repo-profile"[^>]+>View all on GitHub/);
  assert.match(css, /\.repo-list \{ display: grid;/);
  assert.match(css, /\.open-source\.section \{[^}]*background: var\(--raised\);/);
  assert.match(media('(max-width: 640px)'), /\.open-source-head \{ display: grid;/);
  assert.match(jsx, /fetch\('\/api\/github-repositories'/);
  assert.match(jsx, /if \(validGithubRepositories\(next\)\) setProjects\(next\)/);
});

test('the sponsor strip is an orange-accented card with a primary button', () => {
  const start = jsx.indexOf('id="brands"');
  const strip = jsx.slice(start, jsx.indexOf('</section>', start));
  assert.match(strip, /<h2>Sponsor a build<\/h2>/);
  assert.match(strip, /<a className="button button-primary" href="\/sponsors.html"/);
  assert.match(css, /\.brands-row \{[^}]*border: 1px solid color-mix\(in srgb,var\(--signal\) 35%,transparent\)/);
  assert.match(css, /\.brands-row::before \{[^}]*background: var\(--signal\)/);
});

test('forms post if submitted before hydration, so emails and messages never land in the URL', async () => {
  assert.match(jsx, /<form className="contact-form" method="post" onSubmit=\{send\}/);
  assert.match(jsx, /<form className=\{`notes-signup[^`]*`\} method="post" onSubmit=\{subscribe\}/);
  assert.equal((jsx.match(/<form /g) || []).length, 2);
  const { readdir } = await import('node:fs/promises');
  const pages = ['start-here.html', ...(await readdir(new URL('../public/guides/', import.meta.url))).map(file => `guides/${file}`)];
  for (const page of pages) {
    const html = await readFile(new URL(`../public/${page}`, import.meta.url), 'utf8');
    for (const [form] of html.matchAll(/<form [^>]*data-subscribe[^>]*>/g)) assert.match(form, /method="post"/, page);
  }
});

test('the sponsors header CTA is named by its visible text', () => {
  const link = jsx.match(/\{sponsorsPage \? (<a className="button button-primary nav-join"[^]*?<\/a>)/)[1];
  assert.doesNotMatch(link, /aria-label/);
  assert.match(link, />Send <span className="nav-join-name">a sponsor brief<\/span><\/a>$/);
});

test('the hero relates the two brands without an announcement pill', () => {
  assert.match(jsx, /<strong>Get step-by-step courses and practical help from 2,900\+ members while you build\.<\/strong>/);
  assert.match(jsx, /AI Income Lab is the paid Skool community for AI Automation Station\. The guides and tested builds on this site are free to read\./);
  assert.doesNotMatch(jsx, /hero-status/);
});

test('FAQ questions are not numbered and plan copy skips em dashes', () => {
  assert.doesNotMatch(jsx, /faq-num/);
  const start = jsx.indexOf('const plans = [');
  assert.doesNotMatch(jsx.slice(start, jsx.indexOf('];', start)), /—/);
  assert.doesNotMatch(jsx, /Choose \{plan\.name\} —/);
  assert.doesNotMatch(jsx, /Sending…|Subscribing…/);
});

test('Skool buttons share one label and new-tab buttons end with ↗', () => {
  assert.doesNotMatch(jsx, /Explore plans on Skool|Explore the course on Skool/);
  assert.equal(count(jsx, '>Subscribe on YouTube ↗</a>'), 2);
  assert.match(jsx, />\{tool\.cta\} ↗<\/a>/);
  for (const [link] of jsx.matchAll(/<a className="button.*?<\/a>/g)) {
    if (link.includes('target="_blank"')) assert.match(link, /↗<\/a>$/, link);
  }
});

test('section heads are one plain sentence-case title, with no eyebrow label or accented phrase', () => {
  assert.match(jsx, /\['#community', 'Plans'\]/);
  assert.match(jsx, /<SectionHead title="Choose a plan for your next build">/);
  assert.match(jsx, /<SectionHead title="Latest videos">/);
  assert.doesNotMatch(jsx, /eyebrow|SectionHead[^>]*accent=/);
  assert.doesNotMatch(css, /\.eyebrow|\.section-head h2[^}]*uppercase/);
});

test('channel and member numbers sit just before the plans', () => {
  assert.ok(jsx.indexOf('<section className="stats"') < jsx.indexOf('id="community"'));
  assert.match(jsx, /\['2,900\+', 'community members'\]/);
  assert.match(css, /\.stats dl \{ display: grid; grid-template-columns: repeat\(4, minmax\(0, 1fr\)\); \}/);
  // Full-bleed on phones so the rule between the two rows meets the band's edge-to-edge borders.
  assert.match(media('(max-width: 640px)'), /\.stats dl \{ width: 100%; grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/);
});

test('Instrument Sans is the default face and DM Mono is kept for data', () => {
  assert.match(css, /:root \{[^}]*font-family: var\(--sans\);/);
  assert.match(css, /\.meta-row, \.duration, \.timeline span, [^{]*\{ font-family: var\(--mono\); \}/);
  assert.doesNotMatch(css.replace(/\.hero h1[^}]*\}|\.brand \{[^}]*\}/g, ''), /uppercase/);
});

test('the main Join buttons open the Skool plan picker', () => {
  for (const placement of ['navigation', 'hero', 'footer']) {
    assert.match(jsx, new RegExp(`href=\\{plansUrl\\}[^\\n]*trackCommunityVisit\\('${placement}', 'Join AI Income Lab', plansUrl\\)`), placement);
  }
  assert.match(jsx, /trackCommunityVisit\('footer', 'AI Income Lab'\)/);
  assert.doesNotMatch(jsx, /course-promo|runable-course-title/);
});

test('footer social links show an icon beside each name', () => {
  assert.match(jsx, /socialLinks\.map\(\(\[name, url, icon\]\) => <a key=\{name\} href=\{url\} target="_blank" rel="noreferrer"><svg className="social-icon" viewBox="0 0 16 16" aria-hidden="true"><path d=\{icon\} \/><\/svg>\{name\}<\/a>\)/);
  for (const name of ['YouTube', 'GitHub', 'LinkedIn', 'X']) assert.match(jsx, new RegExp(`\\['${name}', \\w+Url, 'M`), name);
  assert.match(css, /\.social-icon \{ flex: none; width: 16px; height: 16px; fill: currentColor; \}/);
  assert.match(jsx, /<a href="mailto:automojic@proton\.me"><svg className="social-icon" viewBox="0 0 16 16" aria-hidden="true"><path d=\{emailIcon\} \/><\/svg>Email<\/a>/);
  assert.doesNotMatch(jsx, /Sponsor a video \/ book a call/);
});

test('the homepage shows six featured guide cards and links the full guides page', async () => {
  const { readdir, readFile, access } = await import('node:fs/promises');
  const start = jsx.indexOf('id="guides"');
  const section = jsx.slice(start, jsx.indexOf('</section>', start));
  const slugs = [...jsx.matchAll(/\{ slug: '([^']+)'/g)].map(m => m[1]);
  assert.equal(slugs.length, 9);
  assert.match(section, /featuredGuides\.slice\(0, 6\)\.map/);
  for (const slug of slugs) {
    await access(new URL(`../public/guides/${slug}.html`, import.meta.url));
    await access(new URL(`../public/assets/guides/${slug}.webp`, import.meta.url));
    await access(new URL(`../public/assets/guides/sizes/${slug}-640.webp`, import.meta.url));
  }
  assert.match(section, /<a className="guide-card" href=\{`\/guides\/\$\{guide\.slug\}\.html`\}>/);
  assert.match(section, /alt=\{guide\.alt\}/);
  assert.match(section, /<a className="button button-primary" href="\/guides\.html"[^>]*>Continue reading with all guides<\/a>/);
  // The guides hub keeps every written guide linked for crawling.
  const hub = await readFile(new URL('../public/guides.html', import.meta.url), 'utf8');
  const guides = (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html'));
  assert.ok(guides.length >= 9);
  for (const file of guides) assert.match(hub, new RegExp(`href="/guides/${file.replace('.', '\\.')}"`), file);
  // The "New guides" line links real guides that aren't already cards.
  const block = jsx.slice(jsx.indexOf('const newGuides = ['), jsx.indexOf('];', jsx.indexOf('const newGuides = [')));
  const fresh = [...block.matchAll(/\['([a-z0-9-]+)', '[^']+'\]/g)].map(m => m[1]);
  assert.ok(fresh.length >= 3, 'newGuides list');
  for (const slug of fresh) {
    assert.ok(guides.includes(`${slug}.html`), slug);
    assert.ok(!slugs.includes(slug), `${slug} is already a card`);
  }
});

test('the sponsors page holds the media kit, services, sponsored videos and booking, in that order', () => {
  const start = jsx.indexOf('function SponsorsMain(');
  const page = jsx.slice(start, jsx.indexOf('\nfunction ', start + 1));
  const order = ['<h1>', '<MediaKit />', '<Services channel={channel} />', 'id="sponsored"', '<WorkTogether campaign={campaign} sponsors />'].map(text => page.indexOf(text));
  assert.ok(order.every((at, index) => at > 0 && (index === 0 || at > order[index - 1])), order.join());
  assert.match(jsx, /\{sponsorsPage \? <SponsorsMain channel=\{channel\} campaign=\{campaign\} \/> : <>/);
});

test('the homepage keeps the brands strip and the contact section, in that order, above the FAQ', () => {
  const home = jsx.slice(jsx.indexOf('function App('));
  const order = ['id="about"', 'id="brands"', '<WorkTogether campaign={campaign} />', 'id="faq"'].map(text => home.indexOf(text));
  assert.ok(order.every((at, index) => at > 0 && (index === 0 || at > order[index - 1])), order.join());
  assert.doesNotMatch(home, /<MediaKit|<Services/);
});

test('every rate card format has a service card with its price', () => {
  const start = jsx.indexOf('function Services(');
  const services = jsx.slice(start, jsx.indexOf('\nfunction ', start + 1));
  for (const [name, price] of [['Multi-platform campaign', '$2,250'], ['Dedicated video', '$1,500'], ['YouTube Short', '$400'], ['AI Income Lab post', '$300'], ['LinkedIn post', '$350']]) {
    assert.match(services, new RegExp(`<h3>${name}</h3>\\s*<p className="service-price">\\${price}`), name);
  }
});

test('campaign allocations total the actual bundle price and preserve the published standalone rates', () => {
  const services = jsx.slice(jsx.indexOf('function Services('), jsx.indexOf('function MediaKit('));
  const money = value => Number(value.replace(/,/g, ''));
  const allocations = [...services.matchAll(/className="service-saving">In the four-format campaign: <strong>\$([\d,]+)<\/strong> — save \$([\d,]+)/g)];
  assert.equal(allocations.length, 4);
  const allocated = allocations.reduce((sum, match) => sum + money(match[1]), 0);
  const savings = allocations.reduce((sum, match) => sum + money(match[2]), 0);
  const bundle = services.match(/className="service-price">\$([\d,]+) <span>\$([\d,]+) separately/);
  assert.equal(allocated, money(bundle[1]));
  assert.equal(savings, 300);
  assert.equal(allocated + savings, money(bundle[2]));
  assert.match(services, /Campaign allocations apply when booking all four formats together/);
});

test('the homepage header links FAQ, the sponsors page and Contact; old sponsor anchors forward there', () => {
  assert.match(jsx, /\['#guides', 'Guides'\], \['\/search.html', 'Search'\], \['#code', 'Projects'\], \['#about', 'About'\]/);
  assert.match(jsx, /\['#about', 'About'\], \['#faq', 'FAQ'\], \['\/sponsors\.html', 'Sponsors'\], \['#work-together', 'Contact'\]\]/);
  assert.match(jsx, /<section className="section" id="services">/);
  assert.match(jsx, /const sponsorAnchors = \['#media-kit', '#services', '#sponsored'\];/);
  // Links share the bar down to the 961px collapse point; none may wrap to two lines.
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
  assert.match(jsx, /Plans from \$29\/month or \$290\/year\. Cancel anytime\./);
});

test('the hero heading names the community in both variants', () => {
  assert.equal(count(jsx, '<h1><span className="hero-brand">AI Income Lab:</span> '), 2);
  assert.match(css, /\.hero h1 \.hero-brand \{/);
  assert.match(jsx, /Get step-by-step courses and practical help from 2,900\+ members while you build\./);
  assert.match(css, /\.hero \.hero-actions \{ margin-top: 24px; \}/);
});

test('the hero includes build notes signup after reassurance with a privacy link', () => {
  const start = jsx.indexOf('<div className="hero-copy">');
  const hero = jsx.slice(start, jsx.indexOf('<div className="hero-preview', start));
  assert.match(hero, /<p className="fine-print hero-reassurance">[^<]*<\/p>\s*<NotesSignup placement="hero" \/>/);
  const signup = jsx.slice(jsx.indexOf('function NotesSignup('), jsx.indexOf('function App('));
  assert.match(signup, /isHero && <p className="notes-signup-privacy">One email a week\. Unsubscribe anytime\. <a href="\/privacy\.html">Privacy policy<\/a>/);
});

test('every homepage video shows a description, preferring the written summary', async () => {
  const { withSummaries } = await import('./curated-summary.js');
  const { listingSummaries, videoSummaries } = await import('./video-summaries.js');
  const { videoNotes } = await import('./video-notes.js');
  const { watchNotes } = await import('./watch-notes.js');
  const { watchSeo } = await import('./watch-seo.js');
  const snapshot = JSON.parse(await readFile(new URL('./youtube-snapshot.json', import.meta.url), 'utf8'));
  // An empty YouTube description leaves the card blank: add the video to listingSummaries in src/video-summaries.js.
  for (const video of snapshot.videos) assert.ok(video.summary.trim(), `${video.id} "${video.title}" has no description`);
  // A video whose only curated text is its listing summary; videos with a fuller written summary use that instead.
  const listingOnly = Object.keys(listingSummaries).find(id => !videoSummaries[id]?.summary && !videoNotes[id]?.summary && !watchNotes[id]?.summary && !watchSeo[id]?.summary);
  // Every video may now have a fuller summary, so there may be none left to check.
  if (listingOnly) assert.equal(withSummaries({ videos: [{ id: listingOnly, summary: '' }] }).videos[0].summary, listingSummaries[listingOnly]);
  const [full] = withSummaries({ videos: [{ id: 'rMRsVyIsZCU', summary: '' }] }).videos;
  assert.equal(full.summary, videoSummaries.rMRsVyIsZCU.summary);
  assert.match(jsx, /\{video\.summary && <p className="player-summary">\{video\.summary\}<\/p>\}/);
  assert.match(await readFile(new URL('../api/youtube.js', import.meta.url), 'utf8'), /feed: withSummaries\(feed\)/);
});
