import { handleOpenPixel } from '../../src/open-pixel.js';

// GET /o/{token}.gif → rewrite → this Edge function.
// Auth: AIRTABLE_API_KEY or AIRTABLE_PAT
// Optional overrides (defaults = Free Members 3):
//   AIRTABLE_BASE_ID=appK4Nu5Dy4imXrDp
//   AIRTABLE_OPENS_TABLE_ID=tblFS59vmxGSrLCPJ
//   AIRTABLE_SENDS_TABLE_ID=tblsb6CJxqWZ93w74
// The 1×1 GIF is always returned even when those env vars are missing.

export const config = { runtime: 'edge' };

export default function handler(request) {
  return handleOpenPixel(request);
}
