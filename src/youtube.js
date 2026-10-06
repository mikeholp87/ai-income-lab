export const channelUrl = 'https://www.youtube.com/@ai-automation-station';
export const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC8_eYAfJcUgI5BV3hg9U2cw';
// YouTube's hidden "UULF" playlist holds the channel's long-form uploads only (no Shorts).
export const longFormPlaylistId = 'UULF8_eYAfJcUgI5BV3hg9U2cw';

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const decode = text => text.replace(/&(#\d+|\w+);/g, (match, code) => code[0] === '#' ? String.fromCodePoint(Number(code.slice(1))) : entities[code] ?? match);
const tag = (xml, name) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? '';

// First paragraph without links skips the "join the community" and affiliate blocks.
export const summarize = description => description.split(/\n\s*\n/).map(part => part.trim()).find(part => part && !/https?:\/\//.test(part)) ?? '';

// Atom feed of the channel's latest 15 uploads. Shorts only differ by their /shorts/ link.
export function parseFeed(xml) {
  return xml.split('<entry>').slice(1)
    .filter(entry => !entry.includes('youtube.com/shorts/'))
    .map(entry => ({
      id: tag(entry, 'yt:videoId'),
      title: decode(tag(entry, 'title')),
      published: tag(entry, 'published'),
      views: Number(entry.match(/views="(\d+)"/)?.[1] ?? 0),
      summary: summarize(decode(tag(entry, 'media:description'))),
    }))
    .filter(video => video.id);
}

// YouTube Data API responses: playlistItems (snippet) joined with videos (statistics).
export function parseApi(playlist, stats) {
  const views = Object.fromEntries((stats.items ?? []).map(item => [item.id, Number(item.statistics?.viewCount ?? 0)]));
  return (playlist.items ?? []).map(({ snippet }) => ({
    id: snippet.resourceId.videoId,
    title: snippet.title,
    published: snippet.publishedAt,
    views: views[snippet.resourceId.videoId] ?? 0,
    summary: summarize(snippet.description ?? ''),
  }));
}
