export const channelUrl = 'https://www.youtube.com/@ai-automation-station';
export const channelId = 'UC8_eYAfJcUgI5BV3hg9U2cw';
export const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
// YouTube's hidden "UULF" playlist holds the channel's long-form uploads only (no Shorts).
export const longFormPlaylistId = `UULF${channelId.slice(2)}`;

// Validate the public feed before it becomes rendered content or a persisted build snapshot.
export function validFeed(feed) {
  return Array.isArray(feed?.videos) && feed.videos.length > 0 && feed.videos.length <= 7
    && feed.videos.every(video => video && /^[\w-]{11}$/.test(video.id) && typeof video.title === 'string'
      && typeof video.summary === 'string' && Number.isFinite(Date.parse(video.published))
      && Number.isFinite(video.views) && video.views >= 0
      && (video.duration == null || typeof video.duration === 'string'));
}

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

// ISO 8601 duration from the Data API ("PT1H2M3S") → 3723 seconds. 0 for missing or unparseable lengths.
export function durationSeconds(iso) {
  const match = iso?.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  return match ? match.slice(1).reduce((total, part, index) => total + Number(part ?? 0) * [3600, 60, 1][index], 0) : 0;
}

// 3723 → "1:02:03", 98 → "1:38".
export function clock(total) {
  const pad = number => String(number).padStart(2, '0');
  const hours = Math.floor(total / 3600), minutes = Math.floor(total / 60) % 60, seconds = total % 60;
  return hours ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

// "PT1H2M3S" → "1:02:03". Empty for missing or zero lengths.
export const formatDuration = iso => durationSeconds(iso) ? clock(durationSeconds(iso)) : '';

// Description lines like "01:38 - Speaker Pitch Emails" → [{ seconds: 98, label }]. Same rule YouTube
// uses to show chapters: at least three, starting at 0:00; anything else is just a time in the text.
export function parseChapters(description) {
  const chapters = description.split('\n')
    .map(line => line.trim().match(/^\(?((?:\d{1,2}:)?\d{1,2}:\d{2})\)?\s*[-–—:|]?\s+(\S.*)$/))
    .filter(Boolean)
    .map(([, time, label]) => ({ seconds: time.split(':').reduce((total, part) => total * 60 + Number(part), 0), label: label.trim() }));
  return validChapters(chapters);
}

// Saved snapshots need the same checks as newly parsed descriptions.
export function validChapters(chapters, seconds = 0) {
  return Array.isArray(chapters) && chapters.length >= 3 && chapters[0]?.seconds === 0
    && chapters.every((chapter, index) => Number.isInteger(chapter?.seconds) && chapter.seconds >= 0
      && typeof chapter.label === 'string' && chapter.label.trim()
      && (index === 0 || chapter.seconds - chapters[index - 1].seconds >= 10)
      && (!seconds || seconds - chapter.seconds >= 10)) ? chapters : [];
}

// YouTube Data API responses: playlistItems (snippet) joined with videos (statistics, contentDetails, status).
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
      // Undefined when the details call failed; the page then still links the on-site watch page.
      embeddable: item?.status?.embeddable,
    };
  });
}
