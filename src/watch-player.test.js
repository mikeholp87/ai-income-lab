import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { renderWatch } from './archive.js';
import { uploads } from './uploads-snapshot.js';

const video = { id: 'aaaaaaaaaaa', title: 'A recorded build', published: '2026-11-01T00:00:00Z', duration: 'PT2M', chapters: [{ seconds: 0, label: 'Intro' }, { seconds: 30, label: 'Build' }, { seconds: 60, label: 'Check' }] };

function setup({ start = 0, hash = '' } = {}) {
  const html = renderWatch(video, { start });
  const script = [...html.matchAll(/<script>(.*?)<\/script>/gs)].map(m => m[1]).find(code => code.includes('.chapters'));
  const player = { src: html.match(/<iframe[^>]*src="([^"]+)"/)[1], focus() { this.focused = true; }, scrollIntoView() { this.scrolled = true; } };
  const chapters = { addEventListener(type, handler) { this[type] = handler; } };
  const handlers = {};
  const location = { hash };
  const history = { replaceState(_state, _title, hash) { location.hash = hash; } };
  vm.runInNewContext(script, { URL, location, history, document: { querySelector: selector => selector === 'iframe.player' ? player : chapters }, addEventListener(type, handler) { handlers[type] = handler; } });
  const click = (hash, modifier = {}) => {
    const event = { button: 0, target: { closest: () => ({ hash }) }, preventDefault() { this.prevented = true; }, ...modifier };
    chapters.click(event);
    return event;
  };
  return { player, click, location, handlers };
}

test('every saved watch page exposes one matching player before scripts run', () => {
  for (const upload of uploads) {
    const html = renderWatch(upload);
    const frames = [...html.matchAll(/<iframe[^>]+src="([^"]+)"[^>]*><\/iframe>/g)];
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(frames.length, 1, upload.id);
    assert.equal(frames[0][1], schema.embedUrl, upload.id);
    assert.doesNotMatch(frames[0][0], /autoplay=|loading="lazy"|srcdoc=/, upload.id);
  }
});

test('initial query and shared fragment cue the player without autoplay', () => {
  assert.equal(setup({ start: 30 }).player.src, 'https://www.youtube-nocookie.com/embed/aaaaaaaaaaa?start=30');
  assert.equal(setup({ start: 30, hash: '#t=60' }).player.src, 'https://www.youtube-nocookie.com/embed/aaaaaaaaaaa?start=60');
  assert.equal(setup({ start: 30, hash: '#t=0' }).player.src, 'https://www.youtube-nocookie.com/embed/aaaaaaaaaaa?start=0');
});

test('chapter navigation plays the requested time and can return to zero', () => {
  const { player, click, location } = setup();
  assert.equal(click('#t=60').prevented, true);
  assert.equal(new URL(player.src).searchParams.get('start'), '60');
  assert.equal(new URL(player.src).searchParams.get('autoplay'), '1');
  assert.equal(click('#t=0').prevented, true);
  assert.equal(new URL(player.src).searchParams.get('start'), '0');
  assert.equal(location.hash, '#t=0');
  assert.equal(player.focused, true);
  assert.equal(player.scrolled, true);
});

test('modified chapter clicks keep native navigation and invalid fragments do nothing', () => {
  const { player, click } = setup();
  const before = player.src;
  for (const modifier of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    assert.equal(click('#t=60', modifier).prevented, undefined);
    assert.equal(player.src, before);
  }
  assert.equal(click('#t=oops').prevented, undefined);
  assert.equal(player.src, before);
});

test('fragment changes from other timestamp links re-cue the existing player', () => {
  const { player, location, handlers } = setup();
  location.hash = '#t=30';
  handlers.hashchange();
  assert.equal(new URL(player.src).searchParams.get('start'), '30');
  assert.equal(new URL(player.src).searchParams.get('autoplay'), '1');
});
