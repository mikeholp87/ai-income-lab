import assert from 'node:assert/strict';
import test from 'node:test';
import { previewDraft } from './workflow.js';

test('changing the enquiry updates the recipient, request and timing without stale data', () => {
  const first = previewDraft('enquiry', 'website');
  const next = previewDraft('enquiry', 'booking');
  assert.match(first.text, /Hi Alex/);
  assert.match(next.text, /Hi Sam/);
  assert.match(next.text, /automation consultation/);
  assert.match(next.text, /next week/);
  assert.doesNotMatch(next.text, /Alex|new website|next month/);
  assert.ok(next.fields.some(([key, value]) => key === 'Name' && value === 'Sam'));
});

test('creator samples produce the matching content draft and reject unavailable samples', () => {
  const draft = previewDraft('content', 'content-review');
  assert.match(draft.text, /independent creators/);
  assert.match(draft.text, /Add your own experience/);
  assert.doesNotMatch(draft.text, /small business owners/);
  assert.throws(() => previewDraft('content', 'website'), /Choose an available sample/);
  assert.throws(() => previewDraft('unknown', 'website'), /Choose an available sample/);
});
