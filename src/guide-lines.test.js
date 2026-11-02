import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { guideLines, linkedPage, withGuideLine } from '../scripts/guide-lines.mjs';

const line = 'Written guide: 9Router setup: https://www.ai-automation-station.com/guides/9router-setup.html?utm_source=youtube&utm_medium=description&utm_campaign=build-guides&utm_content=miBtL2fVkpg';

test('the description-links doc yields one tagged site line per video, in priority order', async () => {
  const rows = guideLines(await readFile(new URL('../docs/youtube-description-links.md', import.meta.url), 'utf8'));
  assert.ok(rows.length >= 200, `${rows.length} rows`);
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length, 'one line per video');
  for (const { id, line: row } of rows) {
    assert.ok(linkedPage(row), id);
    assert.ok(row.includes(`utm_content=${id}`), id);
    assert.doesNotMatch(row, /[<>]/, id);
  }
});

test('the guide line goes first and everything else in the description is kept', () => {
  const before = 'My video about 9Router.\n\nhttps://www.ai-automation-station.com/?utm_source=youtube&utm_content=miBtL2fVkpg';
  const { description } = withGuideLine(before, line);
  assert.equal(description, `${line}\n\n${before}`);
});

test('a description that already links the page, or would grow too long, is skipped', () => {
  const linked = 'See https://www.ai-automation-station.com/guides/9router-setup.html for the guide.';
  assert.deepEqual(withGuideLine(linked, line), { description: null, reason: 'already links this page' });
  assert.equal(withGuideLine('x'.repeat(4950), line).description, null);
  assert.equal(withGuideLine('', line).description, line);
});
