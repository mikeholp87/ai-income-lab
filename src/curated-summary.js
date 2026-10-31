import { videoNotes } from './video-notes.js';
import { listingSummaries, videoSummaries } from './video-summaries.js';
import { watchNotes } from './watch-notes.js';

// Kept apart from archive.js so /api/youtube can use it without loading the transcripts.
export const curatedSummary = video => watchNotes[video.id]?.summary || videoNotes[video.id]?.summary || videoSummaries[video.id]?.summary || listingSummaries[video.id];

// The homepage feed shows a description for every video: the written one first, then YouTube's.
export const withSummaries = feed => ({ ...feed, videos: feed.videos.map(video => ({ ...video, summary: curatedSummary(video) || video.summary })) });
