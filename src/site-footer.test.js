import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { siteFooterHtml } from './site-footer.js';

test('the shared footer has the homepage structure, the newsletter signup and no Products column', () => {
  const html = siteFooterHtml();
  assert.match(html, /^<footer class="footer site-footer">\n<div class="shell">/);
  assert.match(html, /<form class="notes-signup" method="post" data-subscribe data-placement="footer">/);
  assert.match(html, /name="email" type="email"[^>]*placeholder="Your email"/);
  assert.match(html, /<input class="contact-trap" name="hp"/);
  assert.match(html, /Weekly build notes: new guides and tested builds in one short email\./);
  assert.doesNotMatch(html, /<h2>Products<\/h2>/);
  for (const heading of ['Explore', 'Community', 'Connect']) assert.ok(html.includes(`<h2>${heading}</h2>`), heading);
});

test('every static page carries exactly the shared footer', async () => {
  const { readdir } = await import('node:fs/promises');
  const footer = siteFooterHtml();
  for (const dir of ['public', 'public/guides']) {
    for (const name of (await readdir(dir)).filter(file => file.endsWith('.html'))) {
      const html = await readFile(`${dir}/${name}`, 'utf8');
      if (!/<footer[\s>]/.test(html)) continue;
      assert.ok(html.replace(/\r\n/g, '\n').includes(footer), `${dir}/${name} footer differs from src/site-footer.js; run node scripts/apply-site-footer.mjs`);
    }
  }
});

test('the footer stylesheet block is identical in reading.css and archive.css apart from the display font', async () => {
  const block = css => css.match(/\/\* site-footer:start[\s\S]*?site-footer:end \*\//)[0].replace(/Archivo,'Arial Black',sans-serif|'Archivo Black','Arial Black',sans-serif/g, 'DISPLAY');
  const [reading, archive] = await Promise.all(['public/reading.css', 'public/archive.css'].map(file => readFile(file, 'utf8')));
  assert.equal(block(reading), block(archive));
});
