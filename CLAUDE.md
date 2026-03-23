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

## GitHub Pages Deployment

This project deploys to GitHub Pages via `.github/workflows/deploy.yml` using `actions/deploy-pages`.

**Required: `public/.nojekyll`**
Always ensure `public/.nojekyll` exists. Without it, GitHub Pages runs Jekyll on the site, which causes `.js` assets to be served as `application/octet-stream` instead of `application/javascript` — breaking ES module loading entirely.

- `public/.nojekyll` is already present in this repo
- When copying this template to a new project, verify the file is included
- If you ever see "Failed to load module script… MIME type of application/octet-stream" on the deployed site, check that `public/.nojekyll` exists

**Vite `base` path**
Set `base` in `vite.config.ts` to match where the app is actually served:
- `base: '/'` — for a custom domain or `username.github.io` root (user/org page)
- `base: '/<repo-name>/'` — for a standard project page at `username.github.io/<repo-name>/`

This project is deployed at `frieda-sonar-org.github.io/shortcut-experiment-public/`, so `base: '/shortcut-experiment-public/'`.

## Skills

Before working with Echoes components, read:
- `.claude/skills/echoes-components/SKILL.md` — how to look up correct component props
- `.claude/skills/using-echoes-layout/SKILL.md` — correct Echoes layout hierarchy

Before working on org-level project listing, content slots, or ProjectCard data, read:
- `.claude/skills/org-projects/SKILL.md` — data schema, slot architecture, how to add projects/sections

## Project Structure

```
src/
  App.tsx              — Router, EchoesProvider, Layout shell, sidebar navigation, routes
  main.tsx             — React root mount
  tailwind.css         — Tailwind directives
  styles.css           — Page and component CSS (custom classes using Echoes CSS vars)

  components/
    GlobalNav.tsx           — Global navigation header (top bar, Echoes-based; Upgrade button uses custom SVG)
    SidebarNav.tsx          — Project-level sidebar (Overview, Analysis group, PR/Branches counts)
    OrgSidebarNav.tsx       — Organisation-level sidebar (Projects, Issues, Members, Billing, Settings)
    AccountSidebarNav.tsx   — Account-level sidebar
    PageContentHeader.tsx   — Org-level content header (title, breadcrumbs, plan badge, metadata)
    ProjectCard.tsx         — Project card (quality gate, metrics, star/favourite toggle, org context link)
    ProjectFilters.tsx      — Shared filter panel (Quality Gate, Reliability, Security, Security Review,
                              Maintainability, Coverage, Duplications, Size, Languages, Tags); used by
                              both OrganizationPage and MyProjectsPage
    OrgProjectsContent.tsx  — Renders a list of ProjectCards for an org's projects tab
    PRSidebar.tsx           — PR detail navigation (Overview / Summary / Code Review / Issues)
    PRSelectorDropdown.tsx  — Branch/PR selector dropdown
    PRFileGroups.tsx        — File groups left panel (used in PRFilesView)
    PRFilesContent.tsx      — File diffs right panel (used in PRFilesView)
    AddCommentButton.tsx    — Speech bubble button for inline comments
    CoverageIndicator.tsx   — Donut chart for coverage percentage
    InlineComment.tsx       — Inline comment input row

  context/
    FavouritesContext.tsx   — Shared starred/favourite state (starredIds, toggleStar, isStarred);
                              provided at app root so starring on org page syncs to My Projects

  pages/
    MyProjectsPage.tsx      — Favourited projects only; empty state when nothing starred;
                              uses ProjectFilters + ProjectCard with showOrgContext
    ExplorePage.tsx         — Explore / open source projects
    OrganizationPage.tsx    — Organisation template (OrgSidebarNav + PageContentHeader +
                              ProjectFilters aside + OrgProjectsContent)
    OrgProjectDetailPage.tsx — Project detail placeholder (Overview tab)
    AccountPage.tsx         — Account settings placeholder
    PullRequestsPage.tsx    — PR list (flat table: Title, Quality Gate, Author, Last Updated, Commit ID)
    MyPullRequestsPage.tsx  — My Pull Requests (collapsible inbox sections)
    PROverview.tsx          — PR overview (metrics dashboard, security snapshot)
    PRFilesView.tsx         — Two-column files view (PRSidebar + file groups + diffs)
    NotFound.tsx            — 404 fallback

  data/
    pr-info.ts         — Demo PR data (PRInfo objects, getPRInfo(), getAllPRs())
    orgs.ts            — Org and project data (OrgData, Project, getOrg(), getAllProjects())

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
| `/projects` | `MyProjectsPage` | Favourited projects (empty state when none starred) |
| `/explore` | `ExplorePage` | Explore / open source projects |
| `/pull-requests` | `PullRequestsPage` | PR list table |
| `/my-pull-requests` | `MyPullRequestsPage` | Inbox-style PR list |
| `/overview/:id` | `PROverview` | PR metrics dashboard |
| `/review/:id` | `PRFilesView` | File diffs review view |
| `/organizations/:orgId/*` | `OrganizationPage` | Organisation template (sidebar + filters + content) |
| `/project/*` | `OrgProjectDetailPage` | Project detail (id via `?id=orgId-projectId`) |
| `/account/*` | `AccountPage` | Account settings |

**Sidebar switching:** `App.tsx` renders `OrgSidebarNav` for `/organizations/*`, `SidebarNav` for `/project/*`, and `AccountSidebarNav` for `/account/*`.

## Page Titles

Each page sets `document.title` via `useEffect`. Convention: `Section - Context - SonarQube Cloud`

| Page | Title |
|------|-------|
| My Projects | `Projects - My Account - SonarQube Cloud` |
| Explore | `Open Source Projects - My Account - SonarQube Cloud` |
| Organization | `Projects - {orgId} - SonarQube Cloud` |
| Project detail | `Overview - {projectName} - SonarQube Cloud` |
| Account | `My account - My account - SonarQube Cloud` |

## Favourites

`FavouritesContext` (provided in `App.tsx` outside `ThemeProvider`) holds a `Set<string>` of starred project keys (`${orgId}-${projectId}`). Star buttons on `ProjectCard` call `toggleStar`; `MyProjectsPage` filters `getAllProjects()` by `isStarred`. **Do not place `FavouritesProvider` between `ThemeProvider` and its `asChild` div** — this breaks dark mode.

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

## Echoes-First Styling — MANDATORY

**All styling MUST use Echoes exclusively.** This applies to every component, page, and piece of UI in this project.

### Components
Always use Echoes React components from `@sonarsource/echoes-react`. Check `.claude/skills/echoes-components/reference/` before building a custom element — if an Echoes component exists for the use case, use it.

### Colors
- **Always** use `var(--echoes-color-*)` tokens. Never use hardcoded hex values (`#1a1a1a`), `rgb()`, or named colours.
- **Never** use the `--color-*` intermediary variables defined in `styles.css` `:root` — these do not update correctly with the Echoes theme and will resolve to wrong values.

```tsx
// Correct
style={{ color: 'var(--echoes-color-text-default)' }}
style={{ background: 'var(--echoes-color-surface-default)' }}
style={{ border: '1px solid var(--echoes-color-border-weak)' }}

// Wrong
style={{ color: '#e5e7eb' }}
style={{ background: 'var(--color-bg-secondary)' }}   // ← intermediary var, breaks theme
style={{ color: 'var(--echoes-color-text-subdued)' }} // ← token does not exist
```

### Spacing
Always use `var(--echoes-dimension-space-*)`. Never use hardcoded `px` values.

```tsx
// Correct
style={{ padding: 'var(--echoes-dimension-space-200)' }}
style={{ gap: 'var(--echoes-dimension-space-150)' }}

// Wrong
style={{ padding: '16px' }}
style={{ gap: '12px' }}
```

### Typography
Always use `var(--echoes-font-size-*)` and `var(--echoes-font-weight-*)`. Never hardcode `font-size` in `px`/`rem` or numeric `font-weight` values.

```tsx
// Correct
style={{ fontSize: 'var(--echoes-font-size-30)', fontWeight: 'var(--echoes-font-weight-semi-bold)' }}

// Wrong
style={{ fontSize: '14px', fontWeight: 600 }}
```

### Border radius
Always use `var(--echoes-border-radius-*)`.

```tsx
// Correct
style={{ borderRadius: 'var(--echoes-border-radius-200)' }}

// Wrong
style={{ borderRadius: '8px' }}
```

### Common tokens reference
| Token | Purpose |
|-------|---------|
| `var(--echoes-color-surface-canvas-default)` | Page / canvas background |
| `var(--echoes-color-surface-default)` | Card / panel background |
| `var(--echoes-color-surface-inset)` | Inset / recessed surface |
| `var(--echoes-color-text-default)` | Primary body text |
| `var(--echoes-color-text-subtle)` | Secondary / muted text |
| `var(--echoes-color-text-disabled)` | Disabled-state text only |
| `var(--echoes-color-icon-subtle)` | Secondary icon colour |
| `var(--echoes-color-icon-warning)` | Warning / star-filled icon |
| `var(--echoes-color-border-weak)` | Standard card border |
| `var(--echoes-color-border-bold)` | Prominent border |
| `var(--echoes-dimension-space-50)` | 4px |
| `var(--echoes-dimension-space-75)` | 6px |
| `var(--echoes-dimension-space-100)` | 8px |
| `var(--echoes-dimension-space-150)` | 12px |
| `var(--echoes-dimension-space-200)` | 16px |
| `var(--echoes-dimension-space-300)` | 24px |
| `var(--echoes-dimension-space-400)` | 32px |
| `var(--echoes-border-radius-100)` | Small radius |
| `var(--echoes-border-radius-200)` | Standard card radius |
| `var(--echoes-font-size-10)` | XS |
| `var(--echoes-font-size-20)` | SM |
| `var(--echoes-font-size-30)` | MD (body default) |
| `var(--echoes-font-size-40)` | LG |
| `var(--echoes-font-size-50)` | XL |
| `var(--echoes-font-weight-regular)` | Normal weight |
| `var(--echoes-font-weight-semi-bold)` | Semi-bold |
| `var(--echoes-font-weight-bold)` | Bold |

## Icon System

```tsx
import { getIcon } from './utils/getIcon';

// Tries Echoes IconPullrequest first, then MUI fallback
const PrIcon = getIcon('Pullrequest');

// Or import Echoes icons directly when you know they exist
import { IconPullrequest } from '@sonarsource/echoes-react';
```
