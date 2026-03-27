# Shortcut / Global Navigation Experiment

Tests whether renaming navigation items reduces user confusion around global navigation — "Favorited Projects" instead of "My Projects", "Assigned Issues" instead of "My Issues".

Based on [SQC-Template](../SQC-Template).

## Running this experiment

```bash
cd "Shortcut Experiment"
yarn install
yarn dev
```

Open **`http://localhost:5173/experiments`** to see all active experiments and entry links.

To enter the navigation experiment directly: **`http://localhost:5173/snav/projects`**

---

## Experiments

The `sandbox/` folder is gitignored — safe to experiment freely without conflicts when pulling template updates.

### Viewing active experiments

Navigate to **`http://localhost:5173/experiments`** to see a list of all active experiments with links and descriptions.

### Running an experiment

Each experiment runs at its own URL prefix. Example: the Shortcut Navigation experiment lives at `/snav/projects`. Enter it by visiting that URL directly or via the Experiments index. Navigate to any non-prefixed route (e.g. `/projects`) to exit back to the main template.

### Adding a new experiment

1. Create `sandbox/pages/MyConcept.tsx`
2. Add a route in `sandbox/routes.tsx`:
   ```tsx
   import MyConcept from './pages/MyConcept';

   // inside experimentalRoutes array:
   <Route key="my-concept" path="/my-concept" element={<MyConcept />} />,
   ```
3. Register it in the `EXPERIMENTS` array in `sandbox/pages/ExperimentsIndex.tsx` so it appears in the index
4. Navigate to `http://localhost:5173/my-concept`

### Graduating an experiment

When a concept is ready to share:
- Move the component to `src/components/` or `src/pages/`
- Add a permanent `<Route>` in `src/App.tsx`
- Remove the entry from `sandbox/routes.tsx` and `ExperimentsIndex.tsx`

### Current experiments

| Name | Entry URL | Description |
|------|-----------|-------------|
| Shortcut / Global Navigation | `/snav/projects` | Tests whether renaming nav items reduces user confusion around global navigation |

---

## Metrics

Research data supporting the navigation redesign decisions. Live at **`http://localhost:5173/metrics`**.

| Request | Question | Finding |
|---------|----------|---------|
| 1 — Org Distribution | Should we build a global org-switcher? | 97.9% of users belong to exactly 1 org. Switcher is an edge case; org **discovery** is the real gap. |
| 2 — Invisible Users | Are we undercounting our user base? | Yes. 429k projects scanned in 30 days, 0 with user attribution. Active Contributors are ~10x larger than the UI login metric. |
| 3 — Onboarding Funnel | Is the Explore link acting as an onboarding bridge? | No. 96.9% of new users never add a project in their first 7 days. Critical drop-off at the org/project discovery step. |

**Data sources:** `sonar.fct_sc_user_role` (Jan 2025 snapshot), `product_events.user_logged_in`, `product_events.analysis_finished`, `product_events.user_created`, `product_events.project_created`

Raw findings are also saved at `~/Documents/Data/sqc-nav-redesign/sqc_nav_research_findings.md`.

---

## GitHub Pages Setup Guide

This guide covers how to set up a new Vite + React project for GitHub Pages deployment.

---

## First: Which GitHub account are you using?

This determines who can view the deployed page and whether CI needs extra configuration.

| Account type | Example org | Who can view GH Pages | npm in CI | Extra steps? |
|---|---|---|---|---|
| **Sonar internal** | `sonar-cx-testing` | Sonarsourcers only | Standard — just works | No |
| **External / testing** | `frieda-sonar-org` | Anyone (public) | Broken by default (see below) | Yes — see Step 5 |

> **Why does the external account break?** Local `~/.npmrc` routes all npm traffic through an internal JFrog proxy. Any `package-lock.json` generated locally will contain JFrog URLs. GitHub Actions CI doesn't have credentials for that proxy, so `npm ci` fails with `401 Unauthorized`. The fix is in Step 5.

---

## Step 1: Create the project

Copy the SQC-Template folder and follow the Quick Start in its CLAUDE.md. The structure should follow the template pattern — components under `src/components/`, pages under `src/pages/`.

---

## Step 2: Configure `vite.config.ts`

This sets the base URL path for GitHub Pages deployment.

**Deployed at the root of the domain** (e.g. `https://your-org.github.io/`):

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
});
```

**Deployed at a subdirectory** (e.g. `https://your-org.github.io/my-project/`):

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-project/',
});
```

> **Why set `base`?** Without it, Vite assumes assets are at `/`. On a subdirectory deploy, all JS/CSS will 404.

---

## Step 3: Add `.nojekyll` to `public/`

Create an empty file at `public/.nojekyll`:

```sh
touch public/.nojekyll
```

**Why this matters:** GitHub Pages runs Jekyll by default, and Jekyll ignores any file or folder that starts with an underscore. Vite outputs its assets into `_assets/` — without `.nojekyll`, all your JavaScript and CSS will 404 and the site will be a blank page.

The file just needs to exist. It has no content.

---

## Step 4: Create the GitHub Actions workflow

Create `.github/workflows/deploy.yml` in your project. Use the version that matches your account type (see the table at the top).

### For internal Sonar accounts:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### For external / testing accounts:

Same as above, but replace the install step:

```yaml
      - name: Install dependencies
        run: rm package-lock.json && npm install
        env:
          NPM_CONFIG_REGISTRY: https://registry.npmjs.org/
```

This deletes the locally-generated lock file (which contains JFrog URLs) and regenerates it fresh in CI using the public npm registry.

---

## Step 5: Fix `package-lock.json` after every local `npm install`

**This applies to all account types.**

When you run `npm install` on macOS, the generated `package-lock.json` only includes native binaries for macOS. It leaves out the Linux equivalents. Since GitHub Actions runs on Ubuntu, the Linux binaries won't be installed and the build will fail.

Run this script from inside your project directory after any `npm install`:

```python
python3 << 'EOF'
import json

REF_LOCK = '/Users/frieda.handoko/Documents/Projects/code-review-v1/package-lock.json'

with open(REF_LOCK) as f:
    ref = json.load(f)
with open('package-lock.json') as f:
    target = json.load(f)

ref_p = ref['packages']
target_p = target['packages']

keywords = [
    'linux', 'darwin', 'win32', 'musl', 'gnu', 'swc', 'oxide',
    '@img/sharp', '@unrs', '@emnapi', '@napi-rs/wasm-runtime', '@tybys/wasm-util'
]

added = []
for k, v in ref_p.items():
    if any(kw in k for kw in keywords) and k not in target_p:
        target_p[k] = v
        added.append(k)

with open('package-lock.json', 'w') as f:
    json.dump(target, f, indent=2)
    f.write('\n')

print(f"Added {len(added)} platform entries:")
for k in sorted(added):
    print(f"  {k}")
EOF
```

This copies the missing Linux binary entries from a known-good reference lock file into yours.

**For external / testing accounts only — also run this** to replace JFrog URLs with public npm URLs:

```sh
sed -i '' 's|https://repox.jfrog.io/artifactory/api/npm/npm/|https://registry.npmjs.org/|g' package-lock.json
```

Then commit the updated `package-lock.json`.

---

## Step 6: Enable GitHub Pages in the repo settings

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Save

That's it — GitHub will now look for the workflow to handle deployment instead of trying to deploy from a branch directly.

---

## Step 7: Push and verify

Push to `main`. Go to the **Actions** tab in your repo and watch the workflow run. A successful run looks like:

```
✓ build
  ✓ Checkout
  ✓ Setup Node.js
  ✓ Install dependencies
  ✓ Build
  ✓ Upload artifact
✓ deploy
  ✓ Deploy to GitHub Pages
```

The deploy job will print the live URL when it finishes.

---

## Quick checklist

```
[ ] vite.config.ts — correct base path set
[ ] public/.nojekyll — empty file exists
[ ] .github/workflows/deploy.yml — correct version for your account type
[ ] package-lock.json — Linux binaries added (Python script)
[ ] package-lock.json — JFrog URLs replaced (external accounts only)
[ ] GitHub repo Settings → Pages → Source = GitHub Actions
```
