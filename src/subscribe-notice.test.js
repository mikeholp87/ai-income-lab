import assert from 'node:assert/strict';
import test from 'node:test';
import { showSubscribeNotice, subscribeNotice } from './subscribe-notice.js';

function page(href) {
  const main = { children: [], prepend(node) { this.children.unshift(node); } };
  const doc = {
    createElement: () => ({ attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } }),
    querySelector: selector => (selector === 'main' ? main : null),
  };
  const url = new URL(href);
  const history = { state: null, calls: [], replaceState(...args) { this.calls.push(args); } };
  return { main, doc, history, location: { href: url.href, search: url.search } };
}

test('each confirmation outcome has its own message and anything else shows none', () => {
  assert.equal(subscribeNotice('?subscribe=confirmed').tone, 'ok');
  assert.match(subscribeNotice('?subscribe=expired').html, /expired/);
  assert.match(subscribeNotice('?subscribe=failed').html, /mailto:automojic@proton\.me/);
  for (const search of ['', '?subscribe=', '?subscribe=toString', '?subscribe=__proto__', '?q=confirmed']) assert.equal(subscribeNotice(search), null, search);
});

test('the notice goes at the top of the page as a status and the parameter is removed from the URL', () => {
  const { main, doc, history, location } = page('https://www.ai-automation-station.com/start-here.html?subscribe=confirmed&utm_source=email#paths');
  assert.equal(showSubscribeNotice(doc, location, history), 'confirmed');
  const [box] = main.children;
  assert.equal(box.attributes.role, 'status');
  assert.match(box.className, /\bnote\b.*subscribe-ok/);
  assert.match(box.innerHTML, /You’re subscribed/);
  assert.deepEqual(history.calls, [[null, '', '/start-here.html?utm_source=email#paths']]);
});

test('expired and failed links point back to the signup form on the page', async () => {
  const { readFile } = await import('node:fs/promises');
  assert.match(await readFile('public/start-here.html', 'utf8'), /id="notes-email"/);
  for (const outcome of ['expired', 'failed']) assert.match(subscribeNotice(`?subscribe=${outcome}`).html, /href="#notes-email"/);
});

test('pages without a confirmation outcome are left alone', () => {
  const { main, doc, history, location } = page('https://www.ai-automation-station.com/start-here.html');
  assert.equal(showSubscribeNotice(doc, location, history), null);
  assert.deepEqual(main.children, []);
  assert.deepEqual(history.calls, []);
});
