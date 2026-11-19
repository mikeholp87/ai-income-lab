import assert from 'node:assert/strict';
import test from 'node:test';
import { bindGuidePlayers, openGuidePlayer, shouldOpenGuidePlayer, youtubeEmbedUrl } from './guide-player.js';

test('only privacy-enhanced YouTube embed URLs with an 11-character id are accepted', () => {
  assert.equal(youtubeEmbedUrl('https://www.youtube-nocookie.com/embed/NH6t9M2vFrk'), 'https://www.youtube-nocookie.com/embed/NH6t9M2vFrk');
  assert.equal(youtubeEmbedUrl('https://www.youtube-nocookie.com/embed/NH6t9M2vFrk?autoplay=1#t'), 'https://www.youtube-nocookie.com/embed/NH6t9M2vFrk');
  assert.equal(youtubeEmbedUrl('https://www.youtube.com/embed/NH6t9M2vFrk'), '');
  assert.equal(youtubeEmbedUrl('https://www.youtube-nocookie.com/embed/not-an-id'), '');
  assert.equal(youtubeEmbedUrl('https://evil.example/embed/NH6t9M2vFrk'), '');
});

test('pressing play replaces the guide thumbnail link with an autoplaying iframe', () => {
  const created = [];
  const player = {
    getAttribute: name => ({ 'data-embed': 'https://www.youtube-nocookie.com/embed/NH6t9M2vFrk', 'aria-label': 'Play Claude Opus 5.5 Is Better And 40% Cheaper!' }[name]),
    replaceWith(node) { this.replaced = node; },
  };
  const frame = openGuidePlayer(player, tag => {
    const node = { tagName: tag, attributes: {}, setAttribute(name, value) { this.attributes[name] = value; }, focus() { this.focused = true; } };
    created.push(node);
    return node;
  });
  assert.equal(created.length, 1);
  assert.equal(frame.tagName, 'iframe');
  assert.equal(frame.className, 'player');
  assert.equal(frame.title, 'Claude Opus 5.5 Is Better And 40% Cheaper!');
  assert.equal(frame.src, 'https://www.youtube-nocookie.com/embed/NH6t9M2vFrk?autoplay=1');
  assert.equal(frame.allowFullscreen, true);
  assert.equal(player.replaced, frame);
  assert.equal(frame.focused, true);
});

test('a modified embed URL is ignored, so the link still goes to YouTube', () => {
  const player = {
    getAttribute: () => 'https://example.com/embed/NH6t9M2vFrk',
    replaceWith() { assert.fail('must not replace'); },
  };
  assert.equal(openGuidePlayer(player, () => assert.fail('must not create')), null);
});

test('plain clicks load the player and modified clicks keep the YouTube link', () => {
  const clicks = [];
  const player = {
    addEventListener(type, fn) { this[type] = fn; },
    getAttribute: name => (name === 'data-embed' ? 'https://www.youtube-nocookie.com/embed/NH6t9M2vFrk' : 'Play demo'),
    ownerDocument: { createElement: tag => ({ tagName: tag, focus() {} }) },
    replaceWith(node) { this.replaced = node; },
  };
  bindGuidePlayers({ querySelectorAll: () => [player] });
  player.click({ type: 'click', ctrlKey: true, button: 0, preventDefault() { clicks.push('prevent'); } });
  assert.equal(player.replaced, undefined);
  assert.deepEqual(clicks, []);
  player.click({ type: 'click', button: 0, preventDefault() { clicks.push('prevent'); } });
  assert.equal(clicks[0], 'prevent');
  assert.equal(player.replaced.tagName, 'iframe');
});

test('Space on the play control loads the player, Enter stays a native link activation', () => {
  assert.equal(shouldOpenGuidePlayer({ type: 'keydown', key: ' ' }), true);
  assert.equal(shouldOpenGuidePlayer({ type: 'keydown', key: 'Enter' }), false);
  assert.equal(shouldOpenGuidePlayer({ type: 'keydown', key: ' ', ctrlKey: true }), false);
  const player = {
    addEventListener(type, fn) { this[type] = fn; },
    getAttribute: name => (name === 'data-embed' ? 'https://www.youtube-nocookie.com/embed/NH6t9M2vFrk' : 'Play demo'),
    ownerDocument: { createElement: tag => ({ tagName: tag, focus() {} }) },
    replaceWith(node) { this.replaced = node; },
  };
  bindGuidePlayers({ querySelectorAll: () => [player] });
  const keys = [];
  player.keydown({ type: 'keydown', key: 'Enter', preventDefault() { keys.push('enter'); } });
  assert.equal(player.replaced, undefined);
  player.keydown({ type: 'keydown', key: ' ', preventDefault() { keys.push('space'); } });
  assert.deepEqual(keys, ['space']);
  assert.equal(player.replaced.tagName, 'iframe');
});
