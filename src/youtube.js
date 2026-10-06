export const channelUrl = 'https://www.youtube.com/@ai-automation-station';
export const channelId = 'UC8_eYAfJcUgI5BV3hg9U2cw';
export const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
// YouTube's hidden "UULF" playlist holds the channel's long-form uploads only (no Shorts).
export const longFormPlaylistId = `UULF${channelId.slice(2)}`;

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

// channels.list statistics → counts, leaving out any YouTube hides so the page keeps its built-in numbers.
export function parseChannel(data) {
  const statistics = data?.items?.[0]?.statistics;
  if (!statistics) return null;
  const count = value => value === undefined ? undefined : Number(value);
  return {
    subscribers: statistics.hiddenSubscriberCount ? undefined : count(statistics.subscriberCount),
    views: count(statistics.viewCount),
    videos: count(statistics.videoCount),
  };
}

// ISO 8601 duration from the Data API ("PT1H2M3S") → "1:02:03". Empty for missing or zero lengths.
export function formatDuration(iso) {
  const match = iso?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return '';
  const [hours, minutes, seconds] = match.slice(1).map(part => Number(part ?? 0));
  if (!hours && !minutes && !seconds) return '';
  const pad = number => String(number).padStart(2, '0');
  return hours ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

// YouTube Data API responses: playlistItems (snippet) joined with videos (statistics, contentDetails).
export function parseApi(playlist, details) {
  const byId = Object.fromEntries((details.items ?? []).map(item => [item.id, item]));
  return (playlist.items ?? []).map(({ snippet }) => {
    const item = byId[snippet.resourceId.videoId];
    return {
      id: snippet.resourceId.videoId,
      title: snippet.title,
      published: snippet.publishedAt,
      views: Number(item?.statistics?.viewCount ?? 0),
      duration: formatDuration(item?.contentDetails?.duration),
      summary: summarize(snippet.description ?? ''),
    };
  });
}
