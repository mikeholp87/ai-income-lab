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

test('product card buttons align at the bottom of each card', () => {
  assert.match(jsx, /<div className="tool-action">\s*\{tool\.note && <p className="fine-print">\{tool\.note\}<\/p>\}\s*<a className="button button-primary"/);
  assert.match(css, /\.tool ul \{[^}]*margin: 4px 0 0;/);
  assert.match(css, /\.tool-action \{ margin-top: auto; padding-top: 24px; \}/);
});

test('the portrait stays beside the About copy on desktop', () => {
  assert.match(css, /\.portrait \{[^}]*position: sticky; top: 96px;/);
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

test('the videos section keeps two buttons, the grid and one guides list', () => {
  assert.equal(count(jsx, 'href="/start-here.html"'), 1);
  assert.doesNotMatch(jsx, /Start your first build|Prefer a recording\?|'video_grid'|Every video on YouTube/);
  // Fixed /watch/ links keep evergreen video pages linked from the homepage for indexing.
  for (const id of ['7v_675nO7nM', 'geKngm3sg3w', 'G8u1-hKEqig']) assert.match(jsx, new RegExp(`href="/watch/${id}"`));
  assert.match(media('(max-width: 640px)'), /\.build-guides ul \{ grid-template-columns: 1fr; \}/);
});

test('the build list shows three projects', () => {
  const start = jsx.indexOf('const repos = [');
  assert.equal(count(jsx.slice(start, jsx.indexOf('];', start)), "{ name: '"), 3);
});

test('the hero relates the two brands and skips the repeated title on desktop', () => {
  assert.match(jsx, /AI Income Lab is the paid community from the AI Automation Station YouTube channel\./);
  assert.match(css, /@media \(min-width: 961px\) \{ \.hero-status \{ display: none; \} \}/);
});

test('Skool buttons share one label and new-tab buttons end with ↗', () => {
  assert.doesNotMatch(jsx, /Explore plans on Skool|Explore the course on Skool/);
  assert.equal(count(jsx, '>Subscribe on YouTube ↗</a>'), 2);
  assert.match(jsx, />\{tool\.cta\} ↗<\/a>/);
  for (const [link] of jsx.matchAll(/<a className="button.*?<\/a>/g)) {
    // The booking button opens an inline calendar; its new-tab target is only the no-JS fallback.
    if (link.includes('target="_blank"') && !link.includes('onClick={openCalendar}')) assert.match(link, /↗<\/a>$/, link);
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
  assert.match(media('(max-width: 640px)'), /\.stats dl \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/);
});

test('prose uses Instrument Sans while labels keep DM Mono', () => {
  assert.match(css, /\.lede,[^{]*\.fine-print,[^{]*\.faq-list details p,[^{]*\{ font-family: var\(--sans\); \}/);
  assert.match(css, /\.eyebrow, \.nav-links, \.text-link, \.button, \.footer-columns h2, \.stats dt \{ font-family: var\(--mono\);/);
});
