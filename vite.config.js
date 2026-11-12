import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'whatsapp-crawler-proxy',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const ua = req.headers['user-agent'] || '';
          const isCrawler = /whatsapp|facebookexternalhit|facebot|twitterbot|linkedinbot|telegrambot|slackbot|discordbot/i.test(ua);
          if (isCrawler && req.url && (req.url.startsWith('/preview/') || req.url.startsWith('/p/'))) {
            // Forward crawler requests directly to the local backend on port 3000
            const backendTarget = `http://localhost:3000${req.url}`;
            fetch(backendTarget)
              .then(async (bRes) => {
                res.writeHead(bRes.status, {
                  'Content-Type': bRes.headers.get('content-type') || 'text/html; charset=utf-8',
                });
                const buffer = Buffer.from(await bRes.arrayBuffer());
                res.end(buffer);
              })
              .catch((err) => {
                console.warn('[Vite Crawler Proxy] Backend on port 3000 not reachable:', err.message);
                next();
              });
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    host: '0.0.0.0', // listen on all interfaces
    port: 5173, // ensure it's port 5173
  },
})
