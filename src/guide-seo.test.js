import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import test from 'node:test';

const site = 'https://www.ai-automation-station.com';
const read = path => readFile(new URL(`../public/${path}`, import.meta.url), 'utf8');
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
const files = (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html'));
const pages = await Promise.all(files.map(async file => ({ file, html: await read(`guides/${file}`) })));
const meta = (html, key) => decode(html.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)">`))?.[1] ?? '');

test('every article has unique metadata, a canonical URL and a real social image', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const { file, html } of pages) {
    const title = decode(html.match(/<title>(.*?)<\/title>/)[1]);
    const description = meta(html, 'description');
    const url = `${site}/guides/${file}`;
    assert.ok(title && !titles.has(title), `${file}: duplicate or empty title`);
    assert.ok(description && !descriptions.has(description), `${file}: duplicate or empty description`);
    titles.add(title);
    descriptions.add(description);
    assert.equal([...html.matchAll(/<h1>/g)].length, 1, file);
    assert.equal([...html.matchAll(/<link rel="canonical"/g)].length, 1, file);
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`), file);
    assert.equal(meta(html, 'robots'), 'index,follow', file);
    assert.equal(meta(html, 'og:type'), 'article', file);
    assert.equal(meta(html, 'og:url'), url, file);
    assert.equal(meta(html, 'og:title'), title.replace(/ \| Mike Holp$/, ''), file);
    assert.equal(meta(html, 'og:description'), description, file);
    assert.equal(meta(html, 'twitter:title'), meta(html, 'og:title'), file);
    assert.equal(meta(html, 'twitter:description'), description, file);
    assert.equal(meta(html, 'twitter:card'), 'summary_large_image', file);
    assert.equal(meta(html, 'twitter:image'), meta(html, 'og:image'), file);
    const image = new URL(meta(html, 'og:image'));
    assert.equal(image.origin, site, file);
    assert.ok((await stat(new URL(`../public${image.pathname}`, import.meta.url))).size > 0, file);
  }
});

test('every guide hero image describes its diagram in alt text', () => {
  for (const { file, html } of pages) {
    for (const [, alt] of html.matchAll(/<figure><img src="\/assets\/guides\/[^"]+" alt="([^"]*)"/g)) {
      assert.ok(alt.length >= 20, `${file}: hero alt text is missing or too short`);
    }
  }
});

test('article and breadcrumb schema agree with visible headings, author and dates', async () => {
  const sitemap = await read('sitemap.xml');
  for (const { file, html } of pages) {
    const data = schemas(html);
    const articles = data.filter(item => item['@type'] === 'Article');
    const trails = data.filter(item => item['@type'] === 'BreadcrumbList');
    assert.equal(articles.length, 1, file);
    assert.equal(trails.length, 1, file);
    const [article] = articles;
    assert.equal(article.headline, decode(html.match(/<h1>(.*?)<\/h1>/)[1]), file);
    assert.equal(article.description, meta(html, 'description'), file);
    assert.equal(article.url, `${site}/guides/${file}`, file);
    assert.equal(article.mainEntityOfPage, article.url, file);
    assert.equal(article.image, meta(html, 'og:image'), file);
    assert.equal(article.author.name, 'Mike Holp', file);
    assert.equal(article.author.url, `${site}/about.html`, file);
    assert.equal(article.publisher['@type'], 'Organization', file);
    assert.equal(article.publisher.name, 'AI Automation Station', file);
    assert.equal(article.publisher.url, `${site}/`, file);
    assert.equal(article.isPartOf['@type'], 'WebSite', file);
    assert.equal(article.inLanguage, 'en', file);
    assert.ok(article.datePublished <= article.dateModified, file);
    assert.ok(html.includes(`Updated <time datetime="${article.dateModified}">`), file);
    assert.equal(meta(html, 'article:published_time'), article.datePublished, file);
    assert.equal(meta(html, 'article:modified_time'), article.dateModified, file);
    assert.ok(sitemap.includes(`<loc>${article.url}</loc><lastmod>${article.dateModified}</lastmod>`), file);
    assert.deepEqual(trails[0].itemListElement.map(item => [item.position, item.item]), [
      [1, `${site}/`], [2, `${site}/guides.html`], [3, article.url],
    ], file);
    assert.equal(trails[0].itemListElement[2].name, article.headline, file);
    assert.match(html, /<nav class="breadcrumbs" aria-label="Breadcrumb">/, file);
    assert.ok(html.includes(`<span aria-current="page">${html.match(/<h1>(.*?)<\/h1>/)[1]}</span>`), file);
  }
});

test('contents and cross-guide links reach real sections, with no isolated article', () => {
  const incoming = new Set();
  const byPath = new Map(pages.map(page => [`/guides/${page.file}`, page.html]));
  for (const { file, html } of pages) {
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
    const toc = html.match(/<nav class="toc" aria-label="On this page">(.*?)<\/nav>/s)?.[1];
    assert.ok(toc, `${file}: missing contents`);
    assert.ok([...toc.matchAll(/href="#([^"]+)"/g)].length >= 4, file);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      const [path, id] = href.split('#');
      if (!href.startsWith('#') && !path.startsWith('/guides/')) continue;
      const target = path ? byPath.get(path) : html;
      assert.ok(target, `${file}: missing ${href}`);
      if (id) assert.ok(target.includes(`id="${id}"`), `${file}: missing ${href}`);
      if (path && path !== `/guides/${file}`) incoming.add(path);
    }
  }
  for (const file of files) assert.ok(incoming.has(`/guides/${file}`), `${file}: no incoming article link`);
});

test('the hub describes its full collection and shares complete social metadata', async () => {
  const html = await read('guides.html');
  const collection = schemas(html).find(item => item['@type'] === 'CollectionPage');
  assert.equal(collection.mainEntity.numberOfItems, pages.length);
  assert.equal(collection.mainEntity.itemListElement.length, pages.length);
  assert.equal(meta(html, 'twitter:description'), meta(html, 'description'));
  assert.equal(meta(html, 'twitter:image'), meta(html, 'og:image'));
  assert.ok(html.includes(`Updated <time datetime="${collection.dateModified}">`));
  assert.ok((await read('sitemap.xml')).includes(`<loc>${site}/guides.html</loc><lastmod>${collection.dateModified}</lastmod>`));
  for (const { file } of pages) {
    const item = collection.mainEntity.itemListElement.find(item => item.url === `${site}/guides/${file}`);
    const label = html.match(new RegExp(`<h3><a href="/guides/${file.replace('.', '\\.')}">(.*?)</a></h3>`))?.[1];
    assert.ok(label, file);
    assert.equal(item?.name, decode(label), file);
  }
});
