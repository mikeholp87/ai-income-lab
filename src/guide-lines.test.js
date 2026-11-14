import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { guideLines, linkedPage, resourceLine, withGuideLine } from '../scripts/guide-lines.mjs';

const url = 'https://www.ai-automation-station.com/guides/9router-setup.html?utm_source=youtube&utm_medium=description&utm_campaign=build-guides&utm_content=miBtL2fVkpg';
const line = `Written guide: 9Router setup and update command: ${url}`;
const resources = '🔗 Useful Links & Resources:\nGet started with 9Router → https://9router.com/\nGet TubeAnalytics → https://www.tubeanalytics.net\nWork with me → https://automojic.vercel.app/\n\n🌐 Follow Me on Social Media:\n🧿 Linkedin: http://www.linkedin.com/in/mikeholp';

test('the description-links doc yields one tagged site line per video, in priority order', async () => {
  const rows = guideLines(await readFile(new URL('../docs/youtube-description-links.md', import.meta.url), 'utf8'));
  assert.ok(rows.length >= 200, `${rows.length} rows`);
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length, 'one line per video');
  for (const { id, line: row } of rows) {
    assert.ok(linkedPage(row), id);
    assert.ok(resourceLine(row).endsWith(`utm_content=${id}`), id);
    assert.doesNotMatch(resourceLine(row), /[<>]/, id);
  }
});

test('the link goes directly below "Work with me" in the same "Name → URL" style', () => {
  const before = `Intro.\n\n${resources}`;
  const { description } = withGuideLine(before, line);
  assert.equal(description, before.replace('Work with me → https://automojic.vercel.app/', `Work with me → https://automojic.vercel.app/\nRead the written guide → ${url}`));
  assert.equal(resourceLine(`Notes and chapters: https://www.ai-automation-station.com/watch/abcdefghijk?utm_content=abcdefghijk`), 'Notes and chapters → https://www.ai-automation-station.com/watch/abcdefghijk?utm_content=abcdefghijk');
});

test('already-linked or too-long descriptions are skipped', () => {
  assert.deepEqual(withGuideLine(`See https://www.ai-automation-station.com/guides/9router-setup.html\n${resources}`, line), { description: null, reason: 'already links this page' });
  assert.equal(withGuideLine(`${resources}${'x'.repeat(4900)}`, line).description, null);
});

test('descriptions without a resources anchor keep their text and append the guide', () => {
  assert.deepEqual(withGuideLine('No resources section here.', line), { description: `No resources section here.\n\n${resourceLine(line)}`, reason: null });
  assert.deepEqual(withGuideLine('', line), { description: resourceLine(line), reason: null });
});
