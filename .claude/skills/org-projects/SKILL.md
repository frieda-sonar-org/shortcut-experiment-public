# Skill: Org Projects Content Slots

Use this skill whenever working on Organization-level project listing, content slots,
or project card data in the SQC-Template.

---

## Content Slot Architecture

`OrganizationPage` routes sections to dedicated content components:

```
OrganizationPage
├── section === 'projects' → OrgProjectsContent  (src/components/OrgProjectsContent.tsx)
├── section === 'issues'   → [create OrgIssuesContent.tsx when needed]
├── section === 'members'  → [create OrgMembersContent.tsx when needed]
└── anything else          → ContentPlaceholder
```

### To add content for a new section

1. Create `src/components/Org[Section]Content.tsx`
2. Add the import to `src/pages/OrganizationPage.tsx`
3. Add a branch in the slot routing comment block inside `<Layout.PageContent>`:
   ```tsx
   {section === 'issues' && orgData
     ? <OrgIssuesContent projects={orgData.projects} />
     : section === 'projects' && orgData
     ? <OrgProjectsContent projects={orgData.projects} />
     : <ContentPlaceholder />
   }
   ```

---

## Project Data — `src/data/orgs.ts`

### To add a project to an org

Find the org's `projects` array in `ORGS` and add a new entry:

```ts
{
  id: 'my-new-project',       // URL-safe, used in /project/overview?id=orgId-projectId
  name: 'my-new-project',     // Display name
  orgId: 'product-design-ux-org',
  visibility: 'private',      // 'public' | 'private'
  starred: true,              // optional — shows gold star
  tags: ['new'],              // optional — 'new' | 'ai_code_detected'
  lastAnalysis: '18/03/2026, 10:42',
  linesOfCode: '5.8k',
  languages: ['TypeScript', 'CSS'],
  qualityGate: 'not_computed', // 'passed' | 'failed' | 'not_computed'
  metrics: {
    security:        { rating: 'A', value: '0' },
    reliability:     { rating: 'A', value: '0' },
    maintainability: { rating: 'A', value: '0' },
    hotspots:        { rating: 'A', value: '100%' },
    dependencyRisks: null,   // null = show "—"; omit key = hide column
    duplications:    { percentage: 0 },
  },
}
```

**No analysis yet** (shows "Your default branch has not been analyzed yet."):
```ts
{ id: 'draft', name: 'draft', orgId: 'lisa-lee-sonar', visibility: 'private' }
```

### Rating values: `'A' | 'B' | 'C' | 'D' | 'E'`

---

## ProjectCard Component

**File:** `src/components/ProjectCard.tsx`

**Props:** `{ project: Project }` — takes a `Project` from `orgs.ts`.

**Sub-components (internal, not exported):**
- `QualityGateBadge` — renders Passed / Not computed / Failed badge
- `MetricCell` — rating badge + value + label column
- `DependencyRisksCell` — shows "—" RatingBadge + label
- `DuplicationsCell` — CoverageIndicator (inverted) + percentage

**Echoes components used:**
- `RatingBadge` with `size="sm"` and `rating="A"…"E"` (or no `rating` prop = "—")
- `Badge` for visibility, tags, and quality gate
- `ButtonIcon` with `IconStar` for the favourite toggle
- `CoverageIndicator` (custom, in-repo) with `inverted` for duplications

**Project URL:** `/project/overview?id={orgId}-{projectId}`

---

## OrgProjectsContent Slot

**File:** `src/components/OrgProjectsContent.tsx`

**Props:** `{ projects: Project[] }`

This is the content slot wired to `section === 'projects'` in `OrganizationPage`.
To add controls above the card list (search, sort, count) — add them inside
`OrgProjectsContent` above the `.map(...)` call.

---

## Filters Slot (AsideLeft)

The filters sidebar is currently a placeholder in `OrganizationPage.tsx` (`Filters` component).
It only renders for `section === 'projects'`.

To replace with real filters: edit the `Filters` function in `OrganizationPage.tsx`
or extract it to `src/components/OrgProjectsFilters.tsx` and import it.
