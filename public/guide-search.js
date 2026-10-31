// The /guides.html search box: hides guide cards that don't match as you type, along with any topic left
// empty. Without JavaScript the form submits to /search.html instead.
import { afterTyping, searchInside } from '/inside-search.js';

const form = document.getElementById('guide-search');
const input = form.elements.q;
const status = document.getElementById('guide-status');
const topics = document.querySelector('nav.topics');
const sections = [...document.querySelectorAll('ul.guide-list')].map(list => {
  const after = list.nextElementSibling;
  return {
    parts: [list.previousElementSibling, list, after?.matches('p.start') ? after : null].filter(Boolean),
    cards: [...list.querySelectorAll('li.guide')].map(card => ({ card, text: card.textContent.toLowerCase() })),
  };
});
const esc = text => String(text).replace(/[&<>"']/g, char => `&#${char.charCodeAt(0)};`);

function run() {
  const typed = input.value.trim();
  const url = new URL(location.href);
  if (typed) url.searchParams.set('q', typed); else url.searchParams.delete('q');
  history.replaceState(null, '', url);
  // Every word must appear somewhere in the card: title, description or paired video.
  const words = typed.toLowerCase().split(/\s+/).filter(Boolean);
  let matches = 0;
  for (const { parts, cards } of sections) {
    let shown = 0;
    for (const { card, text } of cards) {
      const hit = words.every(word => text.includes(word));
      card.hidden = !hit;
      shown += hit;
    }
    matches += shown;
    for (const part of parts) part.hidden = !shown;
  }
  topics.hidden = Boolean(typed);
  if (typed && !matches) findInside(typed);
  status.hidden = !typed;
  status.innerHTML = !typed ? '' : matches
    ? `${matches} ${matches === 1 ? 'guide matches' : 'guides match'} “${esc(typed)}”`
    : `No guides match “${esc(typed)}”. Try fewer words, or <a href="/videos?q=${encodeURIComponent(typed)}">search the videos</a>.`;
}

// No card text matches: show the guides whose full text mentions it.
const findInside = afterTyping(async typed => {
  const found = await searchInside(typed);
  if (input.value.trim() !== typed || !found) return;
  const urls = new Set(found.filter(row => row[0] === 'guide').map(row => row[2]));
  let shown = 0;
  for (const { parts, cards } of sections) {
    let inSection = 0;
    for (const { card } of cards) {
      const hit = urls.has(card.querySelector('h3 a')?.pathname);
      card.hidden = !hit;
      inSection += hit;
    }
    shown += inSection;
    for (const part of parts) part.hidden = !inSection;
  }
  if (shown) status.textContent = `No guide titles match “${typed}”, but ${shown === 1 ? 'this guide mentions' : `these ${shown} guides mention`} it:`;
});

input.value = new URLSearchParams(location.search).get('q') ?? '';
input.addEventListener('input', run);
form.addEventListener('submit', event => { event.preventDefault(); run(); });
if (input.value) run();
