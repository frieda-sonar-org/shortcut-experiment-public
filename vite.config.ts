import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import fs from 'node:fs'
import path from 'node:path'

// Public repo is served at /shortcut-experiment-public/ (project page).
// Private repo and local dev are served at root.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const base = repo === 'shortcut-experiment-public' ? '/shortcut-experiment-public/' : '/';

// segmentCount = number of non-root path segments in base
// '/'                          → 0  (redirect to /?/...)
// '/shortcut-experiment-public/' → 1  (redirect to /shortcut-experiment-public/?/...)
const segmentCount = base === '/' ? 0 : base.split('/').filter(Boolean).length;

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      // Generates 404.html at build time with the correct segmentCount so that
      // GitHub Pages SPA routing works for both root and sub-path deployments.
      name: 'generate-spa-404',
      closeBundle() {
        const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecting...</title>
    <script>
      var segmentCount = ${segmentCount};
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>`;
        fs.writeFileSync(path.resolve('dist/404.html'), html);
      },
    },
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
})
