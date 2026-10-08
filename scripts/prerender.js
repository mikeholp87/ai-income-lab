import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { build } from 'vite';
import { uploads } from '../src/uploads-snapshot.js';
import { renderPageSitemap } from '../src/archive.js';

await build({ build: { ssr: 'src/main.jsx', outDir: 'dist/.ssr', emptyOutDir: false, rollupOptions: { input: 'src/main.jsx', output: { entryFileNames: '[name].js' } } } });
try {
  const { Root } = await import('../dist/.ssr/main.js');
  const path = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(path, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('Cannot find root in built HTML');
  const content = renderToString(createElement(Root));
  if (!content.includes('<h1') || !content.includes('id="latest"') || !content.includes('id="pricing"') || !content.includes('id="faq"') || !content.includes('skool.com/ai-automation-station-7346/about') || !content.includes('href="/watch/')) throw new Error('Pre-rendered page is incomplete');
  await writeFile(path, html.replace(marker, `<div id="root">${content}</div>`));
} finally {
  await rm(new URL('../dist/.ssr', import.meta.url), { recursive: true, force: true });
}

for (const file of ['start-here.html', ...(await readdir('dist/guides')).filter(file => file.endsWith('.html')).map(file => `guides/${file}`)]) {
  const path = `dist/${file}`;
  const html = await readFile(path, 'utf8');
  if (!html.includes('src="/src/reading.js"')) throw new Error(`Missing reading analytics entry: ${file}`);
  await writeFile(path, html.replace('src="/src/reading.js"', 'src="/assets/reading.js"'));
}

await writeFile('dist/sitemap.xml', renderPageSitemap(await readFile('public/sitemap.xml', 'utf8'), uploads));
