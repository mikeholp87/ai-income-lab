import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { thumbnailVariants, refreshThumbnail } from '../scripts/thumbnail.js';
import { featuredThumbnail } from './thumbnail.js';
import snapshot from './thumbnail-snapshot.json' with { type: 'json' };
import { readFile } from 'node:fs/promises';

test('thumbnail candidates preserve aspect ratio and never upscale', async () => {
  const input = await sharp({ create: { width: 960, height: 540, channels: 3, background: '#ff6846' } }).png().toBuffer();
  const variants = await thumbnailVariants(input);
  assert.deepEqual(variants.map(image => image.width), [480, 768]);
  for (const image of variants) {
    const metadata = await sharp(image.data).metadata();
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.width * 9 / 16);
    assert.equal(metadata.format, 'webp');
    assert.match(image.filename, /^hero-[a-f0-9]{12}-\d+\.webp$/);
  }
  assert.deepEqual((await thumbnailVariants(input)).map(image => image.filename), variants.map(image => image.filename));
  await assert.rejects(thumbnailVariants(Buffer.from('not an image')));
  const placeholder = await sharp({ create: { width: 120, height: 90, channels: 3, background: '#000' } }).png().toBuffer();
  await assert.rejects(thumbnailVariants(placeholder), /widescreen/);
});

test('new uploads use YouTube until a matching local thumbnail exists', () => {
  const image = featuredThumbnail('aaaaaaaaaaa');
  assert.equal(image.src, 'https://i.ytimg.com/vi_webp/aaaaaaaaaaa/maxresdefault.webp');
  assert.match(image.srcSet, /sddefault.webp 640w/);
  assert.doesNotMatch(image.srcSet, /assets/);
});

test('saved hero candidates exist and their width descriptors match the files', async () => {
  if (!snapshot.videoId) return;
  assert.deepEqual(featuredThumbnail(snapshot.videoId), { src: snapshot.src, srcSet: snapshot.srcSet });
  for (const candidate of snapshot.srcSet.split(', ')) {
    const [url, width] = candidate.split(' ');
    const metadata = await sharp(await readFile(new URL(`../public${url}`, import.meta.url))).metadata();
    assert.equal(metadata.width, Number(width.slice(0, -1)));
  }
});

test('failed thumbnail refresh does not publish replacement metadata', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('Missing', { status: 404 }));
  const path = new URL('./thumbnail-snapshot.json', import.meta.url);
  const before = await readFile(path, 'utf8');
  await assert.rejects(refreshThumbnail({ id: 'aaaaaaaaaaa' }), /HTTP 404/);
  assert.equal(await readFile(path, 'utf8'), before);
  await assert.rejects(refreshThumbnail({ id: '../bad' }), /Invalid/);
});
