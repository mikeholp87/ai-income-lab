// The /videos search box: filters /video-index.json (rendered live by api/videos.js) as you type and swaps
// the matching cards in place of the archive. Without JavaScript the form submits to /search.html instead.
const form = document.getElementById('video-search');
const input = form.elements.q;
const results = document.getElementById('video-results');
const status = results.querySelector('p');
const list = results.querySelector('ul');
const archive = document.querySelectorAll('[data-archive]');
const esc = text => String(text).replace(/[&<>"']/g, char => `&#${char.charCodeAt(0)};`);
const date = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const number = new Intl.NumberFormat('en');
let index;
const load = () => (index ??= fetch('/video-index.json').then(response => response.ok ? response.json() : null).catch(() => null).then(rows => rows ?? (index = undefined)));
const card = ([id, href, title, description, , published, views, duration]) => `<li><a href="${esc(href)}"${href.startsWith('/') ? '' : ' target="_blank" rel="noreferrer"'}><span class="thumb"><img src="https://i.ytimg.com/vi/${esc(id)}/mqdefault.jpg" alt="" width="320" height="180" loading="lazy" decoding="async">${duration ? `<span class="duration">${esc(duration)}</span>` : ''}</span><p class="meta"><time datetime="${esc(published)}">${date.format(new Date(published))}</time>${views === null ? '' : `<span>${number.format(views)} ${views === 1 ? 'view' : 'views'}</span>`}</p><h3>${esc(title)}</h3><p class="summary">${esc(description)}</p></a></li>`;
const show = searching => { results.hidden = !searching; archive.forEach(element => { element.hidden = searching; }); };
async function run() {
  const typed = input.value.trim();
  const query = typed.toLowerCase();
  const url = new URL(location.href);
  if (query) url.searchParams.set('q', typed); else url.searchParams.delete('q');
  history.replaceState(null, '', url);
  if (!query) return show(false);
  const rows = await load();
  if (input.value.trim() !== typed) return;
  if (!rows) {
    show(false);
    results.hidden = false;
    status.textContent = 'Search is unavailable right now. Browse the videos below instead.';
    list.innerHTML = '';
    return;
  }
  show(true);
  // Every word must appear in the title, description, search title or tools; title matches rank first, then views.
  const words = query.split(/\s+/);
  const hits = rows.map(row => {
    const title = row[2].toLowerCase();
    return words.every(word => `${title} ${row[3]} ${row[4]}`.toLowerCase().includes(word)) && { row, score: words.filter(word => title.includes(word)).length + (row[6] ?? 0) / 1e9 };
  }).filter(Boolean).sort((a, b) => b.score - a.score);
  status.textContent = hits.length ? `${hits.length} ${hits.length === 1 ? 'video matches' : 'videos match'} “${typed}”` : `No videos match “${typed}”. Try fewer words.`;
  list.innerHTML = hits.map(hit => card(hit.row)).join('');
}
input.value = new URLSearchParams(location.search).get('q') ?? '';
input.addEventListener('input', run);
input.addEventListener('focus', load, { once: true });
form.addEventListener('submit', event => { event.preventDefault(); run(); });
if (input.value) run();
