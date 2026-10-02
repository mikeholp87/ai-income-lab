import { handleOpenPixel } from '../../src/open-pixel.js';

// GET /o/{token}.gif → rewrite → this Edge function.
// Routes Airtable write-back by token prefix (SKOOL-FT-, AFF-, TA-BL-, VS-BL-, POD-, JOB-, INV-).
// Auth: AIRTABLE_API_KEY or AIRTABLE_PAT
// Skool / unknown tokens: AIRTABLE_BASE_ID, AIRTABLE_OPENS_TABLE_ID, AIRTABLE_SENDS_TABLE_ID
// Other bots: AIRTABLE_ROUTE_<AFF|TA_BL|VS_BL|POD|JOB|INV>_BASE_ID / _OPENS_TABLE_ID / _SENDS_TABLE_ID
// Optional JSON map: AIRTABLE_PIXEL_ROUTES
// The 1×1 GIF is always returned even when those env vars are missing.

export const config = { runtime: 'edge' };

export default function handler(request) {
  return handleOpenPixel(request);
}
