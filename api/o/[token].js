import { handleOpenPixel } from '../../src/open-pixel.js';

// GET /o/{token}.gif → rewrite → this Edge function.
// Requires AIRTABLE_API_KEY or AIRTABLE_PAT on Vercel for Airtable write-back.
// The 1×1 GIF is always returned even when those env vars are missing.

export const config = { runtime: 'edge' };

export default function handler(request) {
  return handleOpenPixel(request);
}
