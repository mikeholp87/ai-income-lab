import assert from 'node:assert/strict';
import test from 'node:test';
import { dotCounts, mediaKit } from './media-kit.js';

test('every media kit tab draws exactly 100 dots, largest share first', () => {
  assert.deepEqual(dotCounts([98.9, 1]), [99, 1]);
  assert.deepEqual(dotCounts([33.3, 33.3, 33.3]), [34, 33, 33]);
  for (const tab of mediaKit.tabs) {
    const counts = dotCounts(tab.rows.map(([, share]) => share));
    assert.equal(counts.reduce((sum, count) => sum + count, 0), 100, tab.label);
    assert.ok(tab.rows.length <= 7, `${tab.label} has more rows than dot colors`);
  }
});
