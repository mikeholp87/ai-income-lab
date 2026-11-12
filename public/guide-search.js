// The /guides.html search box and pager. Typing hides guide cards that don't match, along with any topic left
// empty; with no search, 15 cards show per page (?page=N) like /videos. A topic pill filters to that topic
// (?topic=id), paged the same way. "Newest" and "Oldest" (?sort=) list the cards by the publish date the build
// stamps on them (data-published), across topics. Every card stays in the HTML, so
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
for (const entry of all) Object.assign(entry, { home: entry.card.parentElement, published: entry.card.dataset.published ?? '' });
const perPage = 15;
const params = new URLSearchParams(location.search);
let page = Number(params.get('page')) || 1;
// "By topic" keeps the topic sections; "Newest" and "Oldest" move every card into one list ordered by publish date.
const sorts = { topic: 'By topic', newest: 'Newest', oldest: 'Oldest' };
let sort = Object.hasOwn(sorts, params.get('sort')) ? params.get('sort') : 'topic';
const sortNav = Object.assign(document.createElement('nav'), { className: 'sort' });
sortNav.setAttribute('aria-label', 'Sort guides');
sortNav.innerHTML = Object.entries(sorts).map(([key, label]) => `<a href="?${key === 'topic' ? '' : `sort=${key}`}" data-sort="${key}" rel="nofollow">${label}</a>`).join('');
form.after(sortNav);
const dated = Object.assign(document.createElement('ul'), { className: 'guide-list by-date', hidden: true });
sections[0].parts[0].before(dated);
const byDate = (a, b) => sort === 'oldest' ? a.published.localeCompare(b.published) : b.published.localeCompare(a.published);
function arrange() {
  if (sort === 'topic') for (const entry of all) entry.home.append(entry.card);
  else for (const entry of [...all].sort(byDate)) dated.append(entry.card);
}
// Topic id from ?topic= or an old #hash link; null shows every guide.
const idOf = section => section.parts[0].id;
let topic = [params.get('topic'), location.hash.slice(1)].find(id => sections.some(section => idOf(section) === id)) ?? null;
const allLink = Object.assign(document.createElement('a'), { href: '?', textContent: 'All guides ' });
allLink.append(Object.assign(document.createElement('span'), { className: 'pill-count', textContent: all.length }));
allLink.setAttribute('aria-label', `All guides (${all.length})`);
topics.prepend(allLink);
const pager = Object.assign(document.createElement('nav'), { className: 'pager mono' });
pager.setAttribute('aria-label', 'Guide pages');
document.getElementById('next').before(pager);
const pagerLink = (to, label) => `<a href="?${new URLSearchParams({ ...(topic && { topic }), ...(sort !== 'topic' && { sort }), page: to })}" data-page="${to}">${label}</a>`;
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
  // A search covers every guide; otherwise only the chosen topic's.
  const scope = typed || !topic ? all : sections.find(section => idOf(section) === topic).cards;
  const live = scope.filter(entry => !entry.miss);
  if (sort !== 'topic') live.sort(byDate);
  const pages = typed ? 1 : Math.max(1, Math.ceil(live.length / perPage));
  page = Math.min(Math.max(page, 1), pages);
  const shown = new Set(typed ? live : live.slice((page - 1) * perPage, page * perPage));
  for (const entry of all) entry.card.hidden = !shown.has(entry);
  for (const { parts, cards } of sections) for (const part of parts) part.hidden = sort !== 'topic' || !cards.some(entry => shown.has(entry));
  dated.hidden = sort === 'topic' || !shown.size;
  for (const link of topics.children) link.toggleAttribute('aria-current', (link.hash.slice(1) || null) === topic);
  for (const link of sortNav.children) link.toggleAttribute('aria-current', link.dataset.sort === sort);
  pager.hidden = pages < 2;
  pager.innerHTML = pages < 2 ? '' : [
    page > 1 ? pagerLink(page - 1, '← Previous') : '',
    ...Array.from({ length: pages }, (_, index) => index + 1 === page ? `<span aria-current="page">${page}</span>` : pagerLink(index + 1, index + 1)),
    page < pages ? pagerLink(page + 1, 'Next →') : '',
  ].join('');
  const url = new URL(location.href);
  if (typed) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
  if (page > 1) url.searchParams.set('page', page); else url.searchParams.delete('page');
  if (topic) url.searchParams.set('topic', topic); else url.searchParams.delete('topic');
  if (sort !== 'topic') url.searchParams.set('sort', sort); else url.searchParams.delete('sort');
  url.hash = '';
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

// A topic pill shows that topic's guides from page 1 ("All guides" clears it).
topics.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || link.pathname !== location.pathname) return;
  event.preventDefault();
  topic = link.hash.slice(1) || null;
  page = 1;
  paint();
  form.scrollIntoView();
});

// A sort keeps the search and topic and starts again from page 1.
sortNav.addEventListener('click', event => {
  const link = event.target.closest('a[data-sort]');
  if (!link) return;
  event.preventDefault();
  sort = link.dataset.sort;
  page = 1;
  arrange();
  if (input.value.trim()) run(); else paint();
});

arrange();
input.value = new URLSearchParams(location.search).get('q') ?? '';
input.addEventListener('input', () => { page = 1; run(); });
form.addEventListener('submit', event => { event.preventDefault(); run(); });
if (input.value) run(); else paint();
