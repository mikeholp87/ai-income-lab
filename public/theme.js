// Light/dark switch. Dark is the default; the choice is kept in localStorage.
(function () {
  var root = document.documentElement;
  var icon = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg>';
  function saved() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function apply(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f4f1' : '#0a0a0a');
    var label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) { button.setAttribute('aria-label', label); button.title = label; });
  }
  apply(saved());
  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-theme-toggle]');
    if (!button) return;
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: the choice lasts for this page only */ }
  });
  document.addEventListener('DOMContentLoaded', function () {
    // The homepage renders its own button; static pages get one added to the header.
    if (document.getElementById('root')) return apply(saved());
    var header = document.querySelector('header');
    if (!header) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('data-theme-toggle', '');
    button.innerHTML = icon;
    var menu = header.querySelector('.nav-mobile');
    header.insertBefore(button, menu);
    // Phones: the header has no room, so the switch also sits at the end of the Menu panel (CSS picks which one shows).
    var panel = menu && menu.querySelector('nav');
    if (panel) panel.insertAdjacentHTML('beforeend', '<button type="button" class="theme-toggle-row" data-theme-toggle><span class="to-light">Light mode</span><span class="to-dark">Dark mode</span></button>');
    apply(saved());
  });
})();
