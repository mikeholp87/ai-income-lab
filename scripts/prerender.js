import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { build } from 'vite';
import { uploads } from '../src/uploads-snapshot.js';
import { topics } from '../src/topics.js';
import { addGuideVideos, fontPreloads, renderPageSitemap } from '../src/archive.js';
import { archiveCss, consentCss, readingCss } from '../src/asset-version.js';
import { guideMeta, recentUrls, renderFeed, searchIndex } from '../src/feed.js';
import { addToolsLink, renderToolsPage } from '../src/tools-page.js';

const indexNowKey = 'f5acf528749d2b670efeec8c5cd3b8b7'; // also served as public/f5acf528749d2b670efeec8c5cd3b8b7.txt

function withGaBoot(html, file) {
  if (html.includes('src="/ga-boot.js"')) return html;
  if (html.includes('<script src="/theme.js"')) return html.replace('<script src="/theme.js"', '<script src="/ga-boot.js"></script><script src="/theme.js"');
  throw new Error(`Missing GA boot script: ${file}`);
}

await build({ build: { ssr: 'src/main.jsx', outDir: 'dist/.ssr', emptyOutDir: false, rollupOptions: { input: 'src/main.jsx', output: { entryFileNames: '[name].js' } } } });
try {
  const { Root } = await import('../dist/.ssr/main.js');
  const pages = [
    ['index.html', 'home', ['id="latest"', 'id="pricing"', 'id="faq"', 'id="work-together"', 'href="/sponsors.html"', 'skool.com/ai-automation-station-7346/about', 'href="/watch/', 'aria-label="Browse videos by topic"', ...topics.map(topic => `href="/videos/${topic.slug}">${topic.name}</a>`)]],
    ['sponsors.html', 'sponsors', ['id="media-kit"', 'id="services"', 'id="work-together"']],
  ];
  for (const [file, page, required] of pages) {
    const path = new URL(`../dist/${file}`, import.meta.url);
    const html = await readFile(path, 'utf8');
    if (!html.includes('src="/ga-boot.js"')) throw new Error(`Missing GA boot script: ${file}`);
    const marker = '<div id="root"></div>';
    if (!html.includes(marker)) throw new Error(`Cannot find root in built ${file}`);
    const content = renderToString(createElement(Root, { page }));
    if (!content.includes('<h1') || required.some(text => !content.includes(text))) throw new Error(`Pre-rendered ${file} is incomplete`);
    await writeFile(path, html.replace(marker, `<div id="root">${content}</div>`));
  }
} finally {
  await rm(new URL('../dist/.ssr', import.meta.url), { recursive: true, force: true });
}

const guideFiles = (await readdir('dist/guides')).filter(file => file.endsWith('.html')).map(file => `guides/${file}`);
const guideTitles = await Promise.all(guideFiles.map(async file => guideMeta(await readFile(`dist/${file}`, 'utf8'))));
await writeFile('dist/tools.html', renderToolsPage({ uploads, guides: guideTitles }));
const guides = [];
for (const file of ['start-here.html', 'about.html', 'guides.html', 'search.html', 'privacy.html', 'terms.html', 'tools.html', ...guideFiles]) {
  const path = `dist/${file}`;
  const html = withGaBoot(await readFile(path, 'utf8'), file);
  if (!html.includes('src="/src/reading.js"')) throw new Error(`Missing reading analytics entry: ${file}`);
  if (!html.includes('src="/ga-boot.js"')) throw new Error(`Missing GA boot script: ${file}`);
  if (guideFiles.includes(file)) guides.push(guideMeta(html));
  await writeFile(path, (guideFiles.includes(file) ? addGuideVideos(addToolsLink(html), `/${file}`, uploads) : html).replace('src="/src/reading.js"', 'src="/assets/reading.js"').replace(/<link rel="stylesheet" href="\/(?:reading|archive)\.css">/, `${fontPreloads}$&`).replaceAll('href="/reading.css"', `href="${readingCss}"`).replaceAll('href="/consent.css"', `href="${consentCss}"`).replaceAll('href="/archive.css"', `href="${archiveCss}"`));
}
const notFound = withGaBoot(await readFile('dist/404.html', 'utf8'), '404.html');
await writeFile('dist/404.html', notFound.replaceAll('href="/reading.css"', `href="${readingCss}"`).replaceAll('href="/consent.css"', `href="${consentCss}"`));

const sitemap = renderPageSitemap(await readFile('public/sitemap.xml', 'utf8'), uploads);
await writeFile('dist/sitemap.xml', sitemap);
await writeFile('dist/rss.xml', renderFeed(guides, uploads));
await writeFile('dist/search-index.json', JSON.stringify(searchIndex(guides, uploads)));

// Tell Bing (and other IndexNow engines) about pages changed in the last two days. Production only;
// a failed ping never fails the build. ponytail: pings at build time, a minute before the deploy goes live.
if (process.env.VERCEL_ENV === 'production') {
  const urlList = recentUrls(sitemap, uploads);
  if (urlList.length) {
    try {
      const response = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', signal: AbortSignal.timeout(8000), headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: 'www.ai-automation-station.com', key: indexNowKey, keyLocation: `https://www.ai-automation-station.com/${indexNowKey}.txt`, urlList }) });
      console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`);
    } catch (error) {
      console.warn('IndexNow ping failed', error);
    }
  }
}
