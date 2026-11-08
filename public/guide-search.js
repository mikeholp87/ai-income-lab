// The /guides.html search box and pager. Typing hides guide cards that don't match, along with any topic left
// empty; with no search, 15 cards show per page (?page=N) like /videos. Every card stays in the HTML, so
// crawlers and no-JS readers get the whole list, and without JavaScript the form submits to /search.html.
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
const all = sections.flatMap(section => section.cards);
const perPage = 15;
let page = Number(new URLSearchParams(location.search).get('page')) || 1;
const pager = Object.assign(document.createElement('nav'), { className: 'pager mono' });
pager.setAttribute('aria-label', 'Guide pages');
document.getElementById('next').before(pager);
const pagerLink = (to, label) => `<a href="?page=${to}" data-page="${to}">${label}</a>`;
const esc = text => String(text).replace(/[&<>"']/g, char => `&#${char.charCodeAt(0)};`);

function run() {
  const typed = input.value.trim();
  // Every word must appear somewhere in the card: title, description or paired video.
  const words = typed.toLowerCase().split(/\s+/).filter(Boolean);
  for (const entry of all) entry.miss = !words.every(word => entry.text.includes(word));
  const matches = all.filter(entry => !entry.miss).length;
  paint();
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
  for (const entry of all) entry.miss = !urls.has(entry.card.querySelector('h3 a')?.pathname);
  const shown = all.filter(entry => !entry.miss).length;
  paint();
  if (shown) status.textContent = `No guide titles match “${typed}”, but ${shown === 1 ? 'this guide mentions' : `these ${shown} guides mention`} it:`;
});

// Show this page of the cards that match; a search shows every match on one page.
function paint() {
  const typed = Boolean(input.value.trim());
  const live = all.filter(entry => !entry.miss);
  const pages = typed ? 1 : Math.max(1, Math.ceil(live.length / perPage));
  page = Math.min(Math.max(page, 1), pages);
  const shown = new Set(typed ? live : live.slice((page - 1) * perPage, page * perPage));
  for (const entry of all) entry.card.hidden = !shown.has(entry);
  for (const { parts, cards } of sections) for (const part of parts) part.hidden = !cards.some(entry => shown.has(entry));
  pager.hidden = pages < 2;
  pager.innerHTML = pages < 2 ? '' : [
    page > 1 ? pagerLink(page - 1, '← Previous') : '',
    ...Array.from({ length: pages }, (_, index) => index + 1 === page ? `<span aria-current="page">${page}</span>` : pagerLink(index + 1, index + 1)),
    page < pages ? pagerLink(page + 1, 'Next →') : '',
  ].join('');
  const url = new URL(location.href);
  if (typed) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
  if (page > 1) url.searchParams.set('page', page); else url.searchParams.delete('page');
  history.replaceState(null, '', url);
}

pager.addEventListener('click', event => {
  const link = event.target.closest('a[data-page]');
  if (!link) return;
  event.preventDefault();
  page = Number(link.dataset.page);
  paint();
  form.scrollIntoView();
});

// A topic pill or #hash lands on the page that holds that topic's first guide.
function jumpTo(id) {
  const index = all.indexOf(sections.find(section => section.parts[0].id === id)?.cards[0]);
  if (index < 0) return false;
  page = Math.floor(index / perPage) + 1;
  paint();
  document.getElementById(id).scrollIntoView();
  return true;
}
topics.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link?.hash && link.pathname === location.pathname && jumpTo(link.hash.slice(1))) event.preventDefault();
});

input.value = new URLSearchParams(location.search).get('q') ?? '';
input.addEventListener('input', () => { page = 1; run(); });
form.addEventListener('submit', event => { event.preventDefault(); run(); });
if (input.value) run(); else paint();
if (location.hash) jumpTo(location.hash.slice(1));
