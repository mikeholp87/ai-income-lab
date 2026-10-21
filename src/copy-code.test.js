import assert from 'node:assert/strict';
import test from 'node:test';
import { addCopyButtons } from './copy-code.js';

const fakeDocument = blocks => ({
  querySelectorAll: selector => selector === 'main pre' ? blocks : [],
  createElement: () => ({ setAttribute(name, value) { this[name] = value; }, addEventListener(type, listener) { this[type] = listener; } }),
});

test('each command block gets a button that copies its text and says so', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const inserted = [];
  const block = { textContent: 'node public/examples/first-api-request.mjs', before: element => inserted.push(element) };
  const copied = [];
  addCopyButtons(fakeDocument([block]), { writeText: async text => { copied.push(text); } });
  const [button] = inserted;
  assert.equal(button.type, 'button');
  assert.equal(button.textContent, 'Copy');
  assert.equal(button['aria-live'], 'polite');
  await button.click();
  assert.deepEqual(copied, ['node public/examples/first-api-request.mjs']);
  assert.equal(button.textContent, 'Copied');
  t.mock.timers.tick(2000);
  assert.equal(button.textContent, 'Copy');
});

test('a blocked clipboard tells the reader to select the text', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const inserted = [];
  addCopyButtons(fakeDocument([{ textContent: 'x', before: element => inserted.push(element) }]), { writeText: async () => { throw new Error('denied'); } });
  await inserted[0].click();
  assert.equal(inserted[0].textContent, 'Copy failed: select the text');
});
