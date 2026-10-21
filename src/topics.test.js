import assert from 'node:assert/strict';
import test from 'node:test';
import { topicBySlug, topics } from './topics.js';
import { uploads } from './uploads-snapshot.js';

test('every topic has a readable slug, an intro and enough videos to stand alone', () => {
  assert.equal(topics.length, 8);
  assert.equal(new Set(topics.map(topic => topic.slug)).size, topics.length);
  for (const topic of topics) {
    // Starts with a letter, so it can never be mistaken for an archive page number.
    assert.match(topic.slug, /^[a-z][a-z0-9-]*$/, topic.slug);
    assert.equal(topic.pattern.global, false, topic.slug);
    assert.match(topic.intro, /^[A-Z].*\.$/, topic.slug);
    assert.ok(uploads.filter(video => topic.pattern.test(video.title)).length >= 6, `${topic.slug} has fewer than 6 videos`);
  }
  assert.equal(topicBySlug('claude-code').name, 'Claude Code');
  assert.equal(topicBySlug('2'), undefined);
  assert.equal(topicBySlug('not-a-topic'), undefined);
});

test('topic patterns sort familiar titles', () => {
  const slugs = title => topics.filter(topic => topic.pattern.test(title)).map(topic => topic.slug);
  assert.deepEqual(slugs('This Claude Code Hack Saves Token Usage'), ['claude-code']);
  assert.deepEqual(slugs('Claude Opus 5.5 Is Better And 40% Cheaper!'), ['new-models']);
  assert.deepEqual(slugs('Make.com AI Automations Without Code'), ['make-com']);
  assert.deepEqual(slugs('Here\'s Why I Decided To Escape The Rat Race'), []);
});
