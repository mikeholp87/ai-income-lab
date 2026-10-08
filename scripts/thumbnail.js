import { createHash } from 'node:crypto';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

export async function thumbnailVariants(input) {
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height || metadata.width / metadata.height < 1.7 || metadata.width / metadata.height > 1.8) throw new Error('Expected a widescreen thumbnail');
  return Promise.all([480, 768, 1280].filter(width => width <= metadata.width).map(async width => {
    const data = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
    return { width, data, filename: `hero-${hash}-${width}.webp` };
  }));
}

export async function refreshThumbnail(video) {
  if (!/^[\w-]{11}$/.test(video?.id ?? '')) throw new Error('Invalid thumbnail video ID');
  const response = await fetch(`https://i.ytimg.com/vi_webp/${video.id}/maxresdefault.webp`, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Thumbnail HTTP ${response.status}`);
  const variants = await thumbnailVariants(Buffer.from(await response.arrayBuffer()));
  if (!variants.length) throw new Error('Thumbnail is too small');
  const folder = new URL('../public/assets/thumbnails/', import.meta.url);
  await mkdir(folder, { recursive: true });
  await Promise.all(variants.map(({ filename, data }) => writeFile(new URL(filename, folder), data)));
  const src = `/assets/thumbnails/${(variants.find(image => image.width === 768) || variants.at(-1)).filename}`;
  const srcSet = variants.map(image => `/assets/thumbnails/${image.filename} ${image.width}w`).join(', ');
  // Publish metadata only after every file exists; failed refreshes retain the previous usable set.
  const snapshot = new URL('../src/thumbnail-snapshot.json', import.meta.url);
  const temporary = new URL(`${snapshot.href}.tmp`);
  await writeFile(temporary, `${JSON.stringify({ videoId: video.id, src, srcSet }, null, 2)}\n`);
  await rename(temporary, snapshot);
}
