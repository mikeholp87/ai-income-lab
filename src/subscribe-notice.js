// The confirmation link in the signup email redirects to /start-here.html?subscribe=<outcome>.
const notices = {
  confirmed: { tone: 'ok', html: '<strong>You’re subscribed.</strong> The weekly build notes will arrive at the address you confirmed.' },
  expired: { tone: 'warn', html: '<strong>That confirmation link has expired or isn’t valid.</strong> <a href="#notes-email">Enter your email below</a> to get a new one.' },
  failed: { tone: 'warn', html: '<strong>We couldn’t confirm your signup.</strong> <a href="#notes-email">Try again below</a> or email <a href="mailto:automojic@proton.me">automojic@proton.me</a>.' },
};

export function subscribeNotice(search) {
  const outcome = new URLSearchParams(search).get('subscribe');
  return Object.hasOwn(notices, outcome) ? { outcome, ...notices[outcome] } : null;
}

export function showSubscribeNotice(doc, location, history) {
  const notice = subscribeNotice(location.search);
  if (!notice) return null;
  const box = doc.createElement('p');
  box.className = `note subscribe-notice subscribe-${notice.tone}`;
  box.setAttribute('role', 'status');
  box.innerHTML = notice.html;
  doc.querySelector('main')?.prepend(box);
  // Drop the parameter so a refresh or a shared link doesn't repeat the message.
  const url = new URL(location.href);
  url.searchParams.delete('subscribe');
  history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
  return notice.outcome;
}
