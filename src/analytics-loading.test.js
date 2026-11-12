import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { GA_MEASUREMENT_ID } from './tracking.js';
import { renderToolsPage } from './tools-page.js';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the measurement ID is G-XYRWT4PFN8 in the loader, the HEAD boot script, and nowhere else as a different ID', async () => {
  assert.equal(GA_MEASUREMENT_ID, 'G-XYRWT4PFN8');
  const boot = await read('public/ga-boot.js');
  const tracking = await read('src/tracking.js');
  assert.match(boot, /G-XYRWT4PFN8/);
  assert.match(tracking, /export const GA_MEASUREMENT_ID = 'G-XYRWT4PFN8'/);
  assert.equal((boot.match(/G-[A-Z0-9]+/g) || []).every(id => id === GA_MEASUREMENT_ID), true);
});

test('React pages, watch/archive templates and the tools page include the HEAD GA boot script', async () => {
  assert.match(await read('index.html'), /<script src="\/ga-boot.js"><\/script>/);
  assert.match(await read('sponsors.html'), /<script src="\/ga-boot.js"><\/script>/);
  const archive = await read('src/archive.js');
  assert.equal((archive.match(/<script src="\/ga-boot.js"><\/script>/g) || []).length, 2);
  assert.match(renderToolsPage({ uploads: [] }), /<script src="\/ga-boot.js"><\/script>/);
  assert.match(await read('src/reading.js'), /bootGoogleAnalytics\(\)/);
  assert.match(await read('src/main.jsx'), /bootGoogleAnalytics\(\)/);
  assert.match(await read('scripts/prerender.js'), /withGaBoot/);
});

test('static public HTML pages load reading.js so prerender can inject ga-boot.js', async () => {
  const guides = (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html'));
  for (const path of ['public/guides.html', 'public/start-here.html', 'public/about.html', 'public/search.html', 'public/privacy.html', 'public/terms.html', ...guides.map(file => `public/guides/${file}`)]) {
    assert.match(await read(path), /src="\/src\/reading.js"/, path);
  }
});

test('vercel.json redirects do not put a query string in the destination, so the original query is kept', async () => {
  const { redirects } = JSON.parse(await read('vercel.json'));
  for (const rule of redirects) {
    assert.doesNotMatch(rule.destination, /\?/, rule.source);
  }
});

test('ga-boot.js captures the landing URL and loads gtag.js only after stored consent', async () => {
  const code = await read('public/ga-boot.js');
  const landing = 'https://www.ai-automation-station.com/?utm_source=test_src&utm_medium=test_med&utm_campaign=test_camp';
  const run = consent => {
    const scripts = [];
    const dataLayer = [];
    const window = {
      location: { href: landing },
      dataLayer,
      gtag(...args) { dataLayer.push(args); },
    };
    const context = {
      window,
      document: { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } },
      localStorage: { getItem: () => consent },
    };
    vm.runInNewContext(code, context);
    return { scripts, window };
  };

  const denied = run(null);
  assert.equal(denied.window.__landingPageLocation, landing);
  assert.equal(denied.scripts.length, 0);
  assert.equal(denied.window.dataLayer[0][1], 'default');

  const granted = run('granted');
  assert.equal(granted.scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
  const config = granted.window.dataLayer.find(args => args[0] === 'config');
  assert.equal(config[1], GA_MEASUREMENT_ID);
  assert.equal(config[2].page_location, landing);
});
