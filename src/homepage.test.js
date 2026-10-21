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
