import assert from 'node:assert/strict';
import { test } from 'node:test';
import { welcome } from '../api/subscribe.js';

const links = [
  'https://www.ai-automation-station.com/start-here.html',
  'https://www.ai-automation-station.com/guides.html',
  'https://www.youtube.com/@ai-automation-station',
  'https://www.ai-automation-station.com/#community',
];
const visibleHtml = welcome.html.replace(/<[^>]*>/g, '');

test('welcome identifies AI Automation Station and provides all four next steps', () => {
  assert.match(welcome.subject, /AI Automation Station/);
  for (const link of links) {
    assert.ok(welcome.text.split('\n').includes(link), `text link on its own line: ${link}`);
    assert.ok(welcome.html.includes(`href="${link}"`), `HTML link: ${link}`);
  }
});

test('welcome copy uses plain punctuation and avoids maps links', () => {
  for (const copy of [welcome.subject, welcome.text, visibleHtml]) {
    assert.doesNotMatch(copy, /[—–;…]|\.\.\./);
  }
  assert.doesNotMatch(welcome.text + welcome.html, /(?:google\.[^\s"<>]*\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps)/i);
});

test('welcome keeps reply unsubscribe instructions and the plain website footer link', () => {
  assert.match(welcome.text, /Reply "unsubscribe" and I'll take you off the list\./);
  const footer = welcome.html.match(/<footer>([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer);
  assert.match(footer, /Reply "unsubscribe" and I'll take you off the list\./);
  assert.ok(footer.includes('<a href="https://www.ai-automation-station.com" style="color:inherit;text-decoration:none">'));
});
