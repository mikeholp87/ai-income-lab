import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { archiveCss, consentCss, readingCss } from './asset-version.js';

test('stylesheet versions match the files, so a CSS change always reaches visitors', async () => {
  for (const url of [readingCss, consentCss, archiveCss]) {
    const [path, version] = url.split('?v=');
    const hash = createHash('sha256').update(await readFile(`public${path}`)).digest('hex').slice(0, 8);
    assert.equal(version, hash, `${path} changed: set its version in src/asset-version.js to ${hash}`);
  }
});
