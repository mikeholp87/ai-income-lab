const embedScript = 'https://app.cal.com/embed/embed.js';

// cal.com's official embed loader, unminified: it queues calls until embed.js arrives, then embed.js replays
// them. Called only when a visitor opens the booking calendar, so cal.com never loads for anyone else.
export function getCal() {
  if (window.Cal) return window.Cal;
  const push = (target, args) => target.q.push(args);
  const cal = window.Cal = function (...args) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement('script')).src = embedScript;
      cal.loaded = true;
    }
    if (args[0] === 'init') {
      const api = function (...apiArgs) { push(api, apiArgs); };
      const namespace = args[1];
      api.q = api.q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace], args);
        push(cal, ['initNamespace', namespace]);
      } else push(cal, args);
      return;
    }
    push(cal, args);
  };
  return cal;
}
