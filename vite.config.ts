import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// Public repo is served at /shortcut-experiment-public/ (project page).
// Private repo and local dev are served at root.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const base = repo === 'shortcut-experiment-public' ? '/shortcut-experiment-public/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
})
