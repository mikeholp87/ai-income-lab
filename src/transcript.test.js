import assert from 'node:assert/strict';
import { test } from 'node:test';
import { captionText, fixTerms, transcriptParagraphs } from './transcript.js';
import { renderWatch } from './archive.js';
import transcripts from './transcripts.json' with { type: 'json' };

test('caption files become plain text without numbers, timings, tags or rolling repeats', () => {
  const srt = '1\n00:00:00,000 --> 00:00:02,000\nhello <b>there</b>\n\n2\n00:00:02,000 --> 00:00:04,000\nhello there\nwelcome back [Music]\n';
  assert.equal(captionText(srt), 'hello there welcome back');
});

test('paragraphs break near sentence ends and keep every word', () => {
  const text = Array.from({ length: 200 }, (_, index) => index === 79 ? 'end.' : 'word').join(' ');
  const paragraphs = transcriptParagraphs(text);
  assert.ok(paragraphs[0].endsWith('end.'));
  assert.equal(paragraphs.join(' '), text);
});

test('misheard product names are corrected without touching real words', () => {
  assert.equal(fixTerms('I opened codeex and cloud code, deployed on Versal, then joined the school community.'), 'I opened Codex and Claude Code, deployed on Vercel, then joined the Skool community.');
  assert.equal(fixTerms('Export with the H.264 codec from open code'), 'Export with the H.264 codec from OpenCode');
  assert.equal(transcriptParagraphs('chat GPT on superbase')[0], 'ChatGPT on Supabase');
  assert.equal(fixTerms('Use Hey Genen and hijen with 11 labs, then nan and air table in clawed code with cloud opus on grockbot.'), 'Use HeyGen and HeyGen with ElevenLabs, then n8n and Airtable in Claude Code with Claude Opus on GrokBot.');
  assert.equal(fixTerms('Join my school community, I went to school and the cloud server is fine.'), 'Join my Skool community, I went to school and the cloud server is fine.');
});

test('watch pages show a transcript only when one is saved', () => {
  const video = { id: 'abcdefghijk', title: 'T', published: '2026-10-01T00:00:00Z', summary: 'S', duration: 'PT1M', views: 1, chapters: [] };
  assert.doesNotMatch(renderWatch(video), /id="transcript"/);
  transcripts[video.id] = 'Spoken words & more.';
  try { assert.match(renderWatch(video), /<h2 id="transcript">Transcript<\/h2>[\s\S]*<p>Spoken words &amp; more\.<\/p>/); }
  finally { delete transcripts[video.id]; }
});
