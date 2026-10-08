# Video watch pages

The archive now links each public, embeddable long-form upload to `/watch/<video-id>`. Each server-rendered page has one prominent YouTube privacy-enhanced player, its original title and summary, a self-canonical, and matching VideoObject metadata. The player is present without a click and does not autoplay. The privacy notice describes this loading behavior.

`/video-sitemap.xml` lists eligible watch pages with video metadata and is advertised in robots.txt. Archive, watch pages and sitemap reuse the existing daily upload cache. YouTube video status is checked in batches of 50; public videos that prohibit embedding retain their external links. Private or missing videos are omitted on refresh. Unknown watch URLs return 404; missing upstream data returns 503 instead of an empty indexable page. Existing last-good-cache behavior is retained on API errors. Status changes can take the existing cache intervals to propagate.

Validation: all eight test files and production build pass. Real public API metadata yielded 213 eligible watch pages; all 213 passed local HTTP 200, self-canonical, single-player and structured-data checks. Malformed and unknown video IDs returned 404. Browser layout/playback verification and Search Console submission remain pending while Chrome is disconnected.

Google decides whether to index a page and its video separately. These changes establish watch pages; they do not guarantee video results. Guidance: https://developers.google.com/search/docs/appearance/video
