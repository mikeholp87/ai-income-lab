import { defineConfig } from 'vite';
import { handleOpenPixel } from './src/open-pixel.js';

function attachOpenPixel(server) {
  server.middlewares.use(async (req, res, next) => {
    const path = req.url?.split('?')[0] ?? '';
    if (!path.startsWith('/o/') || !path.toLowerCase().endsWith('.gif')) return next();
    try {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
      const response = await handleOpenPixel(new Request(`http://127.0.0.1${req.url}`, { headers }));
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      console.error('[open-pixel] local middleware failed', error);
      next();
    }
  });
}

export default defineConfig({
  plugins: [{
    name: 'skool-open-pixel',
    configureServer: attachOpenPixel,
    configurePreviewServer: attachOpenPixel,
  }],
});
