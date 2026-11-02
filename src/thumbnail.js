import thumbnail from './thumbnail-snapshot.json' with { type: 'json' };

// YouTube's 16:9 sizes plus sddefault (640x480, letterboxed; object-fit: cover crops the bars). hqdefault is skipped:
// it is a letterboxed 480px that still looks soft on 2x screens. maxresdefault stays last so dropMissingMaxres can cut it.
export const youtubeSrcSet = (id, folder = 'vi_webp', ext = 'webp') =>
  `https://i.ytimg.com/${folder}/${id}/mqdefault.${ext} 320w, https://i.ytimg.com/${folder}/${id}/sddefault.${ext} 640w, https://i.ytimg.com/${folder}/${id}/maxresdefault.${ext} 1280w`;

// Videos uploaded below 720p have no maxresdefault: YouTube answers 404 with a 120x90 grey image that still "loads".
// naturalWidth is scaled by the srcset density, so spot it by shape: 4:3 instead of 16:9. Drop the 1280w candidate
// (on the <picture> source too) so the browser falls back to sddefault.
export function dropMissingMaxres(image) {
  if (!image.currentSrc?.includes('maxresdefault') || image.naturalWidth / image.naturalHeight > 1.5) return;
  for (const element of [image, image.previousElementSibling]) {
    if (element?.srcset?.includes('maxresdefault')) element.srcset = element.srcset.replace(/,[^,]*maxresdefault[^,]*$/, '');
  }
}

export function featuredThumbnail(id) {
  if (thumbnail.videoId === id) return { src: thumbnail.src, srcSet: thumbnail.srcSet };
  // ponytail: optimize the featured build snapshot; new live uploads use YouTube until the next build.
  return {
    src: `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
    srcSet: `https://i.ytimg.com/vi_webp/${id}/sddefault.webp 640w, https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp 1280w`,
  };
}
