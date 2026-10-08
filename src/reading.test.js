import assert from 'node:assert/strict';
import test from 'node:test';

for (const [path, eventName] of [['/guides/youtube-feed.html', 'guide_view'], ['/watch/Ip8KBwDixJs', 'video_page_view'], ['/videos/2', 'video_archive_view']]) {
test(`${path} gates tracking across allow, decline and allow`, async () => {
  const values = new Map(), scripts = [], events = [], elements = [];
  const button = value => ({ dataset: { consent: value }, addEventListener(type, fn) { this[type] = fn; }, focus() {} });
  const buttons = [button('denied'), button('granted')];
  const link = { href: 'https://www.skool.com/ai-automation-station-7346/plans', dataset: path.startsWith('/watch/') ? { placement: 'watch_video', videoId: 'Ip8KBwDixJs' } : {}, textContent: 'Compare plans', addEventListener(type, fn) { this[type] = fn; } };
  const youtube = { ...link, href: 'https://www.youtube.com/watch?v=Ip8KBwDixJs', textContent: 'Watch on YouTube' };
  const images = [false, true, false].map((complete, index) => ({
    complete, naturalWidth: index === 2 ? 320 : 0, retries: 0, removed: 0,
    get src() { return 'https://i.ytimg.com/vi/test/mqdefault.jpg'; },
    set src(value) { this.retries++; },
    addEventListener(type, fn) { this[type] = fn; },
  }));
  for (const image of images) image.previousElementSibling = { remove() { image.removed++; image.previousElementSibling = null; } };
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = {
    location: new URL(`https://www.ai-automation-station.com${path}?utm_source=youtube&utm_content=video-a`),
    gtag: (...args) => events.push(args),
    fbq: (...args) => events.push(['meta', ...args]),
  };
  globalThis.document = {
    head: { appendChild: script => scripts.push(script) },
    body: { append: element => elements.push(element) },
    querySelectorAll: selector => selector === 'a[href]' ? [link, youtube] : images,
    querySelector: () => ({ append: element => elements.push(element) }),
    createElement: tag => tag === 'aside' ? { setAttribute() {}, querySelectorAll: () => buttons, querySelector: () => buttons[0], contains: () => false } : button(),
  };
  try {
    await import(`./reading.js?test=${eventName}`);
    assert.equal(images[1].retries, 1, 'already failed WebP retries JPEG');
    assert.equal(images[2].removed, 0, 'loaded images keep their WebP source');
    images[0].error();
    images[0].error();
    assert.equal(images[0].removed, 1);
    assert.equal(images[0].retries, 1, 'a failed JPEG cannot start a retry loop');
    const banner = elements[0];
    assert.equal(banner.hidden, false);
    link.click();
    youtube.click();
    assert.equal(scripts.length, 0);
    assert.equal(events.length, 0);
    buttons[1].click();
    assert.equal(banner.hidden, true);
    assert.equal(scripts.length, 1); // Existing Meta stub; only the Google loader is inserted.
    link.click();
    youtube.click();
    const clicks = events.filter(event => event[0] === 'event' && event[1] === 'skool_outbound_clicked');
    assert.equal(clicks.length, 1);
    const youtubeClicks = events.filter(event => event[0] === 'event' && event[1] === 'youtube_outbound_clicked');
    assert.equal(youtubeClicks.length, 1);
    assert.equal(youtubeClicks[0][2].video_id, 'Ip8KBwDixJs');
    assert.equal(clicks[0][2].content, 'video-a');
    assert.equal(clicks[0][2].placement, path.startsWith('/watch/') ? 'watch_video' : 'written_guide');
    if (path.startsWith('/watch/')) assert.equal(clicks[0][2].video_id, 'Ip8KBwDixJs');
    assert.equal(new URL(link.href).searchParams.get('utm_content'), 'video-a');
    buttons[0].click();
    const afterDecline = events.length;
    link.click();
    youtube.click();
    assert.equal(events.length, afterDecline);
    buttons[1].click();
    assert.equal(events.filter(event => event[0] === 'event' && event[1] === eventName).length, 1);
    assert.equal(events.filter(event => event[0] === 'meta' && event[1] === 'track' && event[2] === 'PageView').length, 2);
    assert.equal(events.some(event => /purchase|lead|signup/i.test(event[1] || '')), false);
  } finally {
    delete globalThis.window; delete globalThis.document; delete globalThis.localStorage;
  }
});
}
