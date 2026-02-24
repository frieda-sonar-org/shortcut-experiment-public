# CLAUDE.md — SQC Template

This file provides guidance to Claude Code when working in this repository.

## What This Repository Is

**SQC-Template** is a reusable SonarQube Cloud UI prototype shell. It mirrors the SQC interface — global header and left sidebar — so you can build and test SQC UI concepts without needing access to the real application.

**Tech stack:**
- Vite + React + TypeScript
- `@sonarsource/echoes-react` v1.7.0 (SonarQube design system)
- `react-router-dom` v6 for routing
- `@emotion/react` / `@emotion/styled` for styled components
- Tailwind CSS 3.4.17 (with `sw-` prefix)
- Yarn 4.x with PnP

## Quick Start

```bash
yarn install
yarn dev
# Open http://localhost:5173
```

## How to Use This Template for a New Project

1. Copy this folder: `cp -r SQC-Template your-project-name`
2. Update `"name"` in `package.json`
3. Update `<title>` in `index.html`
4. Run `yarn install` in the new folder (regenerates Yarn PnP state)
5. Edit pages in `src/pages/` or add new ones

For additional pages:
- Add a file to `src/pages/`
- Add a `<Route>` to `src/App.tsx`

## Skills

Before working with Echoes components, read:
- `.claude/skills/echoes-components/SKILL.md` — how to look up correct component props
- `.claude/skills/using-echoes-layout/SKILL.md` — correct Echoes layout hierarchy

## Project Structure

```
src/
  App.tsx              — Router, EchoesProvider, Layout shell, sidebar navigation, routes
  main.tsx             — React root mount
  tailwind.css         — Tailwind directives
  styles.css           — Page and component CSS (custom classes using Echoes CSS vars)

  components/
    GlobalNav.tsx           — Global navigation header (top bar, Echoes-based)
    PRSidebar.tsx           — PR detail navigation (Overview / Summary / Code Review / Issues)
    PRSelectorDropdown.tsx  — Branch/PR selector dropdown
    PRFileGroups.tsx        — File groups left panel (used in PRFilesView)
    PRFilesContent.tsx      — File diffs right panel (used in PRFilesView)
    AddCommentButton.tsx    — Speech bubble button for inline comments
    CoverageIndicator.tsx   — Donut chart for coverage percentage
    InlineComment.tsx       — Inline comment input row

  pages/
    PullRequestsPage.tsx    — PR list (flat table: Title, Quality Gate, Author, Last Updated, Commit ID)
    MyPullRequestsPage.tsx  — My Pull Requests (collapsible inbox sections)
    PROverview.tsx          — PR overview (metrics dashboard, security snapshot)
    PRFilesView.tsx         — Two-column files view (PRSidebar + file groups + diffs)
    NotFound.tsx            — 404 fallback

  data/
    pr-info.ts         — Demo PR data (PRInfo objects, getPRInfo(), getAllPRs())

  types/
    PRFileTypes.ts     — TypeScript types (FileGroup, FileChange, FileChangeDetail, CodeChange)

  utils/
    getIcon.tsx        — Icon helper: tries Echoes icons, falls back to MUI

sandbox/               — Gitignored experimental work (auto-created by postinstall)
  routes.tsx           — ← gitignored, add your routes here
  routes.tsx.template  — Template for routes.tsx (committed)
  index.tsx            — Exports experimentalRoutes (committed)
  pages/               — ← gitignored, add your prototype pages here

scripts/
  postinstall.js       — Creates sandbox/routes.tsx from template after yarn install
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/pull-requests` | `PullRequestsPage` | PR list table |
| `/my-pull-requests` | `MyPullRequestsPage` | Inbox-style PR list |
| `/overview/:id` | `PROverview` | PR metrics dashboard |
| `/review/:id` | `PRFilesView` | File diffs review view |

## Sandbox Workflow

Use the `sandbox/` folder for experimental prototype work. It's gitignored so your work stays local.

**Add an experimental page:**
1. Create `sandbox/pages/MyConcept.tsx`
2. Add a route to `sandbox/routes.tsx`:
   ```tsx
   import MyConcept from './pages/MyConcept';
   export const experimentalRoutes: React.ReactElement[] = [
     <Route key="my-concept" path="/my-concept" element={<MyConcept />} />
   ];
   ```
3. Navigate to `http://localhost:5173/my-concept`

**When a concept is ready to share:**
- Move the component to `src/components/` or `src/pages/`
- Add a permanent `<Route>` to `src/App.tsx`

## Page Layout Pattern

Pages with a PR-level secondary sidebar (Overview, Files view) use `.layout` + `PRSidebar`:

```tsx
import PRSidebar from '../components/PRSidebar';

export default function MyPage() {
  return (
    <div className="layout">
      <PRSidebar prId={prId} activeSection="overview" />
      <main className="main-content">
        {/* page content */}
      </main>
    </div>
  );
}
```

Pages without a secondary sidebar (PR list, My PRs) render just `<main className="main-content">` directly.

**`PRSidebar` activeSection values:** `'overview' | 'review' | 'summary' | 'issues' | 'pull-requests'`

---

## Echoes Layout Rules

All pages must follow the correct Echoes component hierarchy.

**Standard page (sidebar + content):**
```tsx
// In App.tsx — sidebar is placed alongside the <Routes>:
<Layout.SidebarNavigation>
  ...
</Layout.SidebarNavigation>

// In a page component:
<Layout.ContentGrid>
  <Layout.PageGrid>
    <Layout.PageHeader
      title={<Layout.PageHeader.Title>Title</Layout.PageHeader.Title>}
    />
    <Layout.PageContent>
      {/* Your content */}
    </Layout.PageContent>
  </Layout.PageGrid>
</Layout.ContentGrid>
```

**Page with filters aside:**
```tsx
<Layout.ContentGrid>
  <Layout.ContentHeader title={<Layout.ContentHeader.Title>Title</Layout.ContentHeader.Title>} />
  <Layout.AsideLeft size="medium">
    {/* Filters */}
  </Layout.AsideLeft>
  <Layout.PageGrid>
    <Layout.PageContent>
      {/* Main content */}
    </Layout.PageContent>
  </Layout.PageGrid>
</Layout.ContentGrid>
```

**CRITICAL:** `ContentHeader`, `AsideLeft`, and `PageGrid` must be **direct siblings** inside `ContentGrid`. Never nest one inside another.

## Design Tokens

Always use Echoes CSS variables. Never use hardcoded `px` values or colour codes.

```tsx
// Correct
style={{ padding: 'var(--echoes-dimension-space-200)' }}

// Wrong
style={{ padding: '16px' }}
```

Common tokens:
| Token | Value |
|-------|-------|
| `var(--echoes-dimension-space-100)` | 8px |
| `var(--echoes-dimension-space-200)` | 16px |
| `var(--echoes-dimension-space-300)` | 24px |
| `var(--echoes-color-text-subdued)` | muted text colour |
| `var(--echoes-color-border-weak)` | light border colour |
| `var(--echoes-border-radius-200)` | standard corner radius |

## Icon System

```tsx
import { getIcon } from './utils/getIcon';

// Tries Echoes IconPullrequest first, then MUI fallback
const PrIcon = getIcon('Pullrequest');

// Or import Echoes icons directly when you know they exist
import { IconPullrequest } from '@sonarsource/echoes-react';
```
