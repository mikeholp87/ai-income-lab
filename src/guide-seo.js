// Build-time search and preview tags for the static pages, applied by scripts/prerender.js so every guide gets them
// without editing 90 files, and new guides get them by default.

const site = 'https://www.ai-automation-station.com';

// Indexable pages let Google show large image previews (Discover and web results) and full-length snippets.
// noindex pages are left as they are.
export const previewRobots = html => html.replace('<meta name="robots" content="index,follow">',
  '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">');

// Guide cards are rendered at 1200x630 by scripts/guide-cards.mjs, so the share image's size is known. The alt text
// is the page's own hero image alt, which describes the same card.
export function socialImageMeta(html) {
  const card = html.match(/<meta property="og:image" content="(https:\/\/www\.ai-automation-station\.com\/assets\/guides\/[a-z0-9-]+\.webp)">/);
  const alt = html.match(/<figure><img src="\/assets\/guides\/[a-z0-9-]+\.webp"[^>]* alt="([^"]+)"/)?.[1];
  if (!card || !alt || html.includes('og:image:width')) return html;
  return html.replace(card[0], `${card[0]}\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="${alt}">`)
    .replace(/(<meta name="twitter:image" content="[^"]+">)/, `$1\n<meta name="twitter:image:alt" content="${alt}">`);
}

// Article structured data names the share image with its size, which Google's Article guidelines ask for.
export function articleImageObject(html) {
  return html.replace(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"Article".*?)<\/script>/s, (block, json) => {
    const article = JSON.parse(json);
    if (typeof article.image !== 'string' || !article.image.startsWith(`${site}/assets/guides/`)) return block;
    article.image = { '@type': 'ImageObject', url: article.image, width: 1200, height: 630 };
    return `<script type="application/ld+json">${JSON.stringify(article).replace(/</g, '\\u003c')}</script>`;
  });
}

// A short byline note before "Keep going": who wrote the guide and why to trust it, linked to the About page.
// Every claim matches public/about.html.
export const authorNote = `<p class="meta author-note"><strong>Written by <a href="/about.html" rel="author">Mike Holp</a>.</strong> I’ve shipped software since 2013 and test AI tools on real builds for the <a href="https://www.youtube.com/@ai-automation-station">AI Automation Station YouTube channel</a>. Each guide shows the date it was last updated and lists the sources it relies on.</p>\n`;
export function addAuthorNote(html) {
  if (html.includes('class="meta author-note"')) return html;
  const at = html.indexOf('<aside class="note next-steps"');
  return at === -1 ? html : html.slice(0, at) + authorNote + html.slice(at);
}

export const optimizeGuide = html => addAuthorNote(articleImageObject(socialImageMeta(previewRobots(html))));
