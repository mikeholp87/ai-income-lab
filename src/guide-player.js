// Click-to-load YouTube player for written guides. Watch pages use the inline script in archive.js.
// The HTML is an <a class="player"> so crawlers and no-JS readers get a YouTube link, not an iframe.

export function youtubeEmbedUrl(raw) {
  try {
    const parsed = new URL(raw, 'https://www.ai-automation-station.com');
    if (parsed.origin !== 'https://www.youtube-nocookie.com') return '';
    if (!/^\/embed\/[\w-]{11}$/.test(parsed.pathname)) return '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.href;
  } catch {
    return '';
  }
}

export function openGuidePlayer(player, createElement) {
  const embed = youtubeEmbedUrl(player.getAttribute('data-embed'));
  if (!embed) return null;
  const frame = createElement('iframe');
  const label = player.getAttribute('aria-label') || '';
  frame.className = 'player';
  frame.title = label.replace(/^Play /, '') || 'Video';
  frame.width = 560;
  frame.height = 315;
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allowFullscreen = true;
  const url = new URL(embed);
  url.searchParams.set('autoplay', '1');
  frame.src = url.href;
  player.replaceWith(frame);
  frame.focus?.();
  return frame;
}

export function bindGuidePlayers(root) {
  for (const player of root.querySelectorAll('figure.video a.player[data-embed]')) {
    player.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openGuidePlayer(player, tag => player.ownerDocument.createElement(tag));
    });
  }
}
