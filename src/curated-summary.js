import { watchSeo } from './watch-seo.js';
import { videoNotes } from './video-notes.js';
import { listingSummaries, videoSummaries } from './video-summaries.js';
import { watchNotes } from './watch-notes.js';
import { watchPageCopy } from './watch-page-copy.js';
import { watchHeading } from './watch-title.js';

// Kept apart from archive.js so /api/youtube can use it without loading the transcripts.
export const curatedSummary = video => watchNotes[video.id]?.summary || watchSeo[video.id]?.summary || videoNotes[video.id]?.summary || videoSummaries[video.id]?.summary || listingSummaries[video.id];

export const searchTitle = video => watchPageCopy[video.id]?.title || watchNotes[video.id]?.searchTitle || videoNotes[video.id]?.searchTitle || videoSummaries[video.id]?.searchTitle || watchSeo[video.id]?.title;

// The heading a video gets everywhere on the site, so homepage links match the watch page H1.
export const videoHeading = video => searchTitle(video) || watchHeading(video.title);

// The homepage feed shows a description for every video: the written one first, then YouTube's.
export const withSummaries = feed => ({ ...feed, videos: feed.videos.map(video => ({ ...video, heading: videoHeading(video), summary: curatedSummary(video) || video.summary })) });
