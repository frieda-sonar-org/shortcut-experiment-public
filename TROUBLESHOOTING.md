# GitHub Pages — Troubleshooting

Use this when a build fails or the deployed site isn't working. Find your symptom below.

---

## "401 Unauthorized" during the install step

**What you see in CI logs:**
```
npm error code E401
npm error 401 Unauthorized - GET https://repox.jfrog.io/...
```

**What happened:**

Your `package-lock.json` was generated locally on a machine where `~/.npmrc` routes npm through an internal JFrog proxy. The lock file stores those JFrog URLs. GitHub Actions CI doesn't have credentials for JFrog, so the install fails immediately.

This only happens on projects hosted under `frieda-sonar-org`. Personal and other org accounts don't have this problem.

**How to fix:**

**Option A — Fix the lock file locally** (run this after every `npm install`):
```sh
sed -i '' 's|https://repox.jfrog.io/artifactory/api/npm/npm/|https://registry.npmjs.org/|g' package-lock.json
```
Then commit and push.

**Option B — Fix the workflow** (set it and forget it):

Replace the install step in `deploy.yml` with:
```yaml
- name: Install dependencies
  run: rm package-lock.json && npm install
  env:
    NPM_CONFIG_REGISTRY: https://registry.npmjs.org/
```
This deletes the poisoned lock file in CI and regenerates it fresh using the public registry. You can keep your local lock file as-is.

---

## Build fails with "Cannot find module" or native binary error

**What you see in CI logs:**
```
Error: Cannot find module '@next/swc-linux-x64-gnu'
```
or the build silently fails with no CSS output.

**What happened:**

`package-lock.json` was generated on macOS. npm only records platform-specific native binaries for the machine it runs on — so the lock file has macOS binaries but no Linux ones. When `npm ci` runs on the Ubuntu CI runner, it installs exactly what's in the lock file, and the Linux binaries are never installed. The build then fails because it can't load the native modules it needs.

The packages affected by this stack (Next.js 16 + Tailwind CSS v4):
- `@next/swc-linux-*` — Next.js Rust compiler
- `@tailwindcss/oxide-linux-*` — Tailwind CSS native parser
- `lightningcss-linux-*` — Tailwind CSS processor
- `@unrs/resolver-binding-linux-*` — module resolver
- `@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util` — wasm runtime dependencies

**How to fix:**

Run this script from inside your project directory, then commit the updated `package-lock.json`:

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

This copies the missing Linux binary entries from a known-good reference lock file (`code-review-v1`) into your lock file.

> **Note:** The reference lock file at `code-review-v1` must have the same or compatible package versions as your project. If your project has significantly different dependencies, you may need to update the reference.

---

## Site loads but CSS/JavaScript/images are 404

**What you see:**

The page loads (you get HTML) but it's broken — unstyled, no images, JS errors in the console. The 404 paths in the Network tab look like `/my-project/_next/static/...`.

**What happened:**

Your app is deployed at a subdirectory (e.g. `https://your-org.github.io/my-project/`) but `next.config.ts` doesn't know that. Next.js generates asset paths as if the site is at the root, so the browser looks for `/_next/...` instead of `/my-project/_next/...`.

**How to fix:**

In `next.config.ts`, set `basePath` and `assetPrefix` to match your subdirectory:

```typescript
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: { unoptimized: true },
  basePath: '/my-project',    // must match your repo name / URL path
  assetPrefix: '/my-project', // must be the same as basePath
};
```

Then rebuild and redeploy.

> If your site is at the root of the domain (e.g. `https://your-org.github.io/`), both values should be `''` (empty string).

---

## `_next/` folder gives 404 (blank page after deploy)

**What you see:**

The site is a blank page. In the Network tab, requests to `/_next/static/...` return 404. The HTML is there but nothing loads.

**What happened:**

GitHub Pages runs a static site processor called Jekyll by default. Jekyll ignores any file or folder whose name starts with an underscore — including Next.js's `_next/` output folder. So Jekyll silently drops all your JavaScript and CSS.

**How to fix:**

Add an empty `.nojekyll` file to your `public/` folder:

```sh
touch public/.nojekyll
```

Next.js copies everything in `public/` into the output folder at build time. The `.nojekyll` file tells GitHub Pages to skip Jekyll processing entirely. Rebuild and redeploy.

---

## Old version is still showing after a successful deploy

**What you see:**

The GitHub Actions workflow shows green, the deploy job says it succeeded, but the live site still shows the old version.

**What to try:**

1. **Hard refresh** — `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux). Your browser may have cached the old version.

2. **Wait a minute** — GitHub Pages propagation can take 30–60 seconds after a deploy finishes.

3. **Check the deployment URL** — In the Actions tab, click the deploy job and look for the printed URL. Make sure you're visiting the right address.

4. **Check that Pages source is set to GitHub Actions** — Go to repo Settings → Pages → Source. If it's set to "Deploy from a branch", GitHub will ignore your workflow and deploy from whatever branch it finds. Change it to **GitHub Actions**.

---

## Quick symptom reference

| Symptom | Most likely cause | Section |
|---|---|---|
| `E401` on install step | JFrog URLs in lock file | [401 Unauthorized](#401-unauthorized-during-the-install-step) |
| Build fails, "Cannot find module" | Missing Linux binaries in lock file | [Cannot find module](#build-fails-with-cannot-find-module-or-native-binary-error) |
| CSS/JS/images are 404 | Wrong `basePath`/`assetPrefix` | [Assets are 404](#site-loads-but-cssjavaascriptimages-are-404) |
| Blank page after deploy | Missing `.nojekyll` | [`_next/` gives 404](#_next-folder-gives-404-blank-page-after-deploy) |
| Old version still showing | Cache or Pages source misconfigured | [Old version showing](#old-version-is-still-showing-after-a-successful-deploy) |
