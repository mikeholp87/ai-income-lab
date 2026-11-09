import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const page = await readFile(new URL('../public/search.html', import.meta.url), 'utf8');
const script = page.match(/<script type="module">([\s\S]*?)<\/script>/)[1].replace(/^import .*;$/m, '');

async function search(query, rows, duringLoad) {
  const elements = Object.fromEntries(['q', 'search-status', 'search-results', 'search-more', 'search-inside', 'inside-results'].map(id => [id, { value: '', addEventListener(type, fn) { this[type] = fn; } }]));
  elements.q.form = { addEventListener() {} };
  await vm.runInNewContext(`(async()=>{${script}})()`, {
    document: { getElementById: id => elements[id] },
    location: { search: `?q=${encodeURIComponent(query)}`, pathname: '/search.html' },
    history: { replaceState() {} }, URLSearchParams,
    fetch: async () => {
      duringLoad?.(elements.q);
      return { ok: true, json: async () => rows };
    },
    afterTyping: () => () => {}, searchInside() {},
  });
  return elements;
}

test('Make.com tool matches rank ahead of the verb make while retaining other results', async () => {
  const rows = [
    ['guide', 'Codex: make a code change', '/codex', 'Make a change'],
    ['video', 'Make.com first workflow', '/make-video', 'Automation'],
    ['guide', 'Make.com Google Sheets tutorial', '/make-guide', 'Automation'],
  ];
  const elements = await search(' MAKE ', rows);
  assert.match(elements['search-status'].textContent, /3 results/);
  const html = elements['search-results'].innerHTML;
  assert.ok(html.indexOf('/make-guide') < html.indexOf('/make-video'));
  assert.ok(html.indexOf('/make-video') < html.indexOf('/codex'));
  const codex = await search('codex', rows);
  assert.match(codex['search-status'].textContent, /1 result/);
  assert.doesNotMatch(codex['search-results'].innerHTML, /make-guide/);
});

test('search preserves typing during index loading and handles empty and unmatched queries', async () => {
  const rows = [['guide', 'n8n setup', '/n8n', 'Automate a task']];
  const typed = await search('', rows, input => { input.value = 'n8n'; });
  assert.match(typed['search-status'].textContent, /1 result for “n8n”/);
  const empty = await search('', rows);
  assert.match(empty['search-status'].textContent, /Latest guides and videos/);
  const none = await search('unfindable', rows);
  assert.match(none['search-status'].textContent, /Nothing matches/);
  assert.equal(none['search-results'].innerHTML, '');
});
