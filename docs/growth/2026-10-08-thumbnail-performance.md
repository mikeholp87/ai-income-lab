# Featured thumbnail optimization

## Evidence and result

The production [PageSpeed Insights report](https://pagespeed.web.dev/analysis/https-www-ai-automation-station-com/wzw7ng2psu?form_factor=mobile), collected October 8 at 19:20 Bangkok time, reports mobile LCP 2.754 seconds, CLS 0, and no eligible CrUX field data. It identifies the 1280×720 hero thumbnail as oversized: 65,792 bytes against a displayed requirement of approximately 662×372 pixels. This is a single production lab sample, not a real-user performance verdict.

Three before and three after runs used the same local production preview (`http://127.0.0.1:4175/`), Lighthouse 13.5.0, Headless Chrome 150, a 412×823 viewport at DPR 1.75, cold browser storage, default undecided consent, simulated slow 4G (150 ms RTT, 1,638.4 Kbps) and 4× CPU slowdown.

| Measurement | Before | After |
|---|---:|---:|
| Selected hero image bytes | 65,792 | 32,246 |
| Selected hero dimensions | 1280×720 | 768×432 |
| LCP median | 2.458 s | 2.494 s |
| LCP range | 2.292–2.607 s | 2.467–2.503 s |
| CLS, all runs | 0 | 0 |
| TBT median | 287 ms | 54.5 ms |

The reliable improvement is **51% fewer hero image bytes**. The LCP ranges overlap and the median did not improve, so this does not establish faster loading. The TBT change is not attributed to image resizing: these local runs can be affected by host CPU activity. The new images also inherit the existing immutable asset cache policy. Production latency and cache effects still need verification after deployment.

## Implementation

- The existing build refresh generates 480, 768, and 1280 pixel candidates only where the source has sufficient resolution. It rejects malformed images and non-widescreen placeholders, preserves aspect ratio, and does not upscale. [Sharp resize documentation](https://sharp.pixelplumbing.com/api-resize/) describes the sizing behavior used here.
- Content hashes change the asset URL when image content changes. The metadata file is replaced atomically after all candidates exist.
- The saved set applies only to its matching video ID. New live uploads retain the current YouTube source selection until another build. Existing JPEG error fallback and eager/high-priority hero loading remain active.
- Tablet `sizes` now accounts for the actual shell margins and player borders.
- Sharp is a build dependency and does not enter the browser bundle. The homepage bundle grows by roughly 0.2 KB compressed for the manifest and selection logic.

## Verification and limits

- All ten test files pass. New checks cover aspect ratio, exact width descriptors, content hashes, rejecting bad input, new-video fallback, and preserving metadata after a failed request.
- Production build and whitespace checks pass. The offline build retains the saved thumbnail successfully.
- Chrome desktop rendering and the Lighthouse mobile screenshot show the correct image. All three mobile runs select the 768-pixel candidate with zero CLS.
- The previous release is verified live: `/index.html` returns 308 to `/`, hashed JavaScript has one-year immutable caching, the four learning paths are present, and the historical membership notice is visible in the watch-page HTML.
- The optional Jev review service could not run because `JEV_API_KEY` is not configured; local code review, tests, build, and browser/lab checks were completed.
- These image changes passed local verification before commit. Deployment verification remains pending. No post-deployment or field speed improvement is claimed. Only the featured build snapshot is optimized; the rest of the YouTube image inventory is unchanged.

Raw paired Lighthouse reports are in `/tmp/ai-income-before-{1,2,3}.json` and `/tmp/ai-income-after-{1,2,3}.json` for this session.
