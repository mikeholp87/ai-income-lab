import thumbnail from './thumbnail-snapshot.json' with { type: 'json' };

export function featuredThumbnail(id) {
  if (thumbnail.videoId === id) return { src: thumbnail.src, srcSet: thumbnail.srcSet };
  // ponytail: optimize the featured build snapshot; new live uploads use YouTube until the next build.
  return {
    src: `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
    srcSet: `https://i.ytimg.com/vi_webp/${id}/sddefault.webp 640w, https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp 1280w`,
  };
}
