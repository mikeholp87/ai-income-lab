import assert from 'node:assert/strict';
import test from 'node:test';
import { topicBySlug, topics } from './topics.js';
import { uploads } from './uploads-snapshot.js';
import { GET } from '../api/videos.js';

test('every topic has a readable slug, an intro and enough videos to stand alone', () => {
  assert.equal(topics.length, 10);
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
  assert.deepEqual(slugs('Here\'s Why I Decided To Escape The Rat Race'), ['make-money']);
  assert.deepEqual(slugs('I Built an AI Tool to Find Website Clients (It Actually Works!)'), ['make-money', 'ai-website-builders']);
  assert.deepEqual(slugs('Ghostty: The Only Linux Terminal You Need!'), []);
  // "llama" is a whole word, so Ollama (a local model runner) is not a model release.
  assert.deepEqual(slugs('Private AI Made Simple: A Beginner\'s Guide to Ollama'), []);
  assert.deepEqual(slugs('Llama 5 Is Here'), ['new-models']);
});

test('topic pages are served at /videos/<slug> next to the numbered pages', async () => {
  const get = path => GET(new Request(`https://www.ai-automation-station.com${path}`));
  const topic = await get('/videos/claude-code');
  assert.equal(topic.status, 200);
  assert.match(await topic.text(), /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/videos\/claude-code">/);
  assert.equal((await get('/api/videos?page=n8n')).status, 200);
  assert.equal((await get('/videos/not-a-topic')).status, 404);
  assert.equal((await get('/videos/2')).status, 200);
  assert.equal((await get('/videos/1')).status, 308);
});
