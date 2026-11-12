import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { gaBootHead, gaBootScript, gaConsentInline } from './ga-boot-html.js';
import { GA_MEASUREMENT_ID } from './tracking.js';
import { renderToolsPage } from './tools-page.js';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const bootTag = /<script src="\/ga-boot.js" defer><\/script>/;
const blockingBoot = /<script src="\/ga-boot.js"><\/script>/;
const site = 'https://www.ai-automation-station.com';
const themeInline = "try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}";

test('the measurement ID is G-XYRWT4PFN8 in the loader, the HEAD boot script, and nowhere else as a different ID', async () => {
  assert.equal(GA_MEASUREMENT_ID, 'G-XYRWT4PFN8');
  const boot = await read('public/ga-boot.js');
  const tracking = await read('src/tracking.js');
  assert.match(boot, /G-XYRWT4PFN8/);
  assert.match(tracking, /export const GA_MEASUREMENT_ID = 'G-XYRWT4PFN8'/);
  assert.equal((boot.match(/G-[A-Z0-9]+/g) || []).every(id => id === GA_MEASUREMENT_ID), true);
});

test('React pages, watch/archive templates and the tools page defer ga-boot.js after an inline consent snippet', async () => {
  const index = await read('index.html');
  const sponsors = await read('sponsors.html');
  const archive = await read('src/archive.js');
  const tools = renderToolsPage({ uploads: [] });
  const prerender = await read('scripts/prerender.js');
  for (const html of [index, sponsors, tools]) {
    assert.match(html, bootTag);
    assert.doesNotMatch(html, blockingBoot);
    assert.ok(html.includes(gaConsentInline));
    assert.ok(html.includes(themeInline));
    assert.match(html, /<script src="\/theme.js" defer><\/script>/);
  }
  assert.equal((archive.match(/\$\{gaBootHead\}/g) || []).length, 2);
  assert.doesNotMatch(archive, blockingBoot);
  assert.match(prerender, /withGaBoot/);
  assert.match(prerender, /gaBootHead/);
  assert.doesNotMatch(prerender, blockingBoot);
  assert.match(await read('src/reading.js'), /bootGoogleAnalytics\(\)/);
  assert.match(await read('src/main.jsx'), /bootGoogleAnalytics\(\)/);
  assert.equal(gaBootHead, `${gaConsentInline}${gaBootScript}`);
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

test('extensionless and trailing-slash URLs hop once to the www .html canonical', async () => {
  const config = JSON.parse(await read('vercel.json'));
  // trailingSlash:false compiles ahead of redirects, so /guides/ would 308 to /guides first.
  assert.equal(Object.hasOwn(config, 'trailingSlash'), false);
  const { redirects } = config;
  const pages = ['start-here', 'guides', 'about', 'sponsors', 'privacy', 'terms', 'search', 'tools'];
  const slash = redirects.find(rule => rule.source.includes(':page(') && rule.source.endsWith('/'));
  const bare = redirects.find(rule => rule.source.includes(':page(') && !rule.source.endsWith('/'));
  assert.equal(slash.destination, `${site}/:page.html`);
  assert.equal(bare.destination, `${site}/:page.html`);
  assert.equal(slash.permanent && bare.permanent, true);
  const slashPattern = new RegExp(`^${slash.source.replace(':page', '')}$`);
  const barePattern = new RegExp(`^${bare.source.replace(':page', '')}$`);
  for (const page of pages) {
    assert.ok(slashPattern.test(`/${page}/`), page);
    assert.ok(barePattern.test(`/${page}`), page);
  }
  for (const path of ['/guides.html', '/guides/codex-workflow', '/guides/codex-workflow.html', '/search.html', '/about.html']) {
    assert.ok(!slashPattern.test(path), path);
    assert.ok(!barePattern.test(path), path);
  }
  const slugSlash = redirects.find(rule => rule.source.startsWith('/guides/:slug') && rule.source.endsWith('/'));
  const slug = redirects.find(rule => rule.source.startsWith('/guides/:slug') && !rule.source.endsWith('/'));
  assert.equal(slugSlash.destination, `${site}/guides/:slug.html`);
  assert.equal(slug.destination, `${site}/guides/:slug.html`);
  const strip = redirects.find(rule => rule.source === '/:path(.*)/');
  assert.equal(strip.destination, '/:path');
  assert.equal(strip.permanent, true);
  assert.ok(redirects.indexOf(slash) < redirects.indexOf(strip));
  assert.ok(redirects.indexOf(slugSlash) < redirects.indexOf(strip));
});

test('the inline consent snippet captures the landing URL and its UTMs before the deferred loader', () => {
  const landing = 'https://www.ai-automation-station.com/?utm_source=test_src&utm_medium=test_med&utm_campaign=test_camp';
  const dataLayer = [];
  const window = { location: { href: landing }, dataLayer };
  vm.runInNewContext(gaConsentInline.replace(/^<script>|<\/script>$/g, ''), { window, location: window.location });
  assert.equal(window.__landingPageLocation, landing);
  assert.equal(window.__gaConsentDefaulted, true);
  assert.equal(dataLayer[0][1], 'default');
  assert.equal(dataLayer[0][2].analytics_storage, 'denied');
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
