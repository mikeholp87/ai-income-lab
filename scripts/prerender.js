import { readFile, rm, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { build } from 'vite';

await build({ build: { ssr: 'src/main.jsx', outDir: 'dist/.ssr', emptyOutDir: false } });
try {
  const { Root } = await import('../dist/.ssr/main.js');
  const path = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(path, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('Cannot find root in built HTML');
  const content = renderToString(createElement(Root));
  if (!content.includes('<h1') || !content.includes('id="pricing"') || !content.includes('id="faq"') || !content.includes('skool.com/ai-automation-station-7346/about')) throw new Error('Pre-rendered page is incomplete');
  await writeFile(path, html.replace(marker, `<div id="root">${content}</div>`));
} finally {
  await rm(new URL('../dist/.ssr', import.meta.url), { recursive: true, force: true });
}
