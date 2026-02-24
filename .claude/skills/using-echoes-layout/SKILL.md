---
name: using-echoes-layout
description: Use when creating or modifying page layouts - ensures correct Echoes layout component hierarchy, prevents common layout mistakes
---

# Using Echoes Layout

## Overview

Ensures correct Echoes layout structure for all prototype pages. Prevents common mistakes with ContentGrid hierarchy, PageHeader prop wrapping, and design token usage.

**Announce at start:** "I'm using the using-echoes-layout skill to verify the correct layout structure."

## When to Use This Skill

- Creating a new page
- Modifying existing page layout structure
- When designer requests layout changes
- Triggered by `working-with-prototyper` skill

## Common Layout Mistakes This Prevents

1. **ContentGrid sibling hierarchy** - AsideLeft/ContentHeader/PageGrid must be siblings, not nested
2. **PageHeader title wrapping** - Title must be wrapped in `<Layout.PageHeader.Title>`
3. **Breadcrumbs structure** - Must use `<Layout.PageHeader.Breadcrumbs>` component with items array
4. **Hardcoded spacing** - Must use design tokens, never px values
5. **Incorrect prop names** - Must verify props from source, not assume

## Workflow Checklist

Create these TodoWrite items for layout implementation:

```markdown
- [ ] Identify page layout type (sidebar nav, content grid, simple page)
- [ ] Read layout examples from docs/echoes/guides/
- [ ] Verify correct component hierarchy from examples
- [ ] Implement layout structure with verified hierarchy
- [ ] Use design tokens for all spacing (no hardcoded px)
- [ ] Test layout renders before adding content components
```

## Page Layout Types

### Type 1: Sidebar Navigation + Content Grid

**Use when:** Page has left sidebar navigation and main content area

**Structure:**
```tsx
<Layout.SidebarNavigation>
  <Layout.SidebarNavigation.Body>
    <Layout.SidebarNavigation.Group label="Group Name">
      <Layout.SidebarNavigation.Item Icon={IconComponent} to="/path">
        Item Label
      </Layout.SidebarNavigation.Item>
    </Layout.SidebarNavigation.Group>
  </Layout.SidebarNavigation.Body>
</Layout.SidebarNavigation>

<Layout.ContentGrid>
  <Layout.PageGrid>
    <Layout.PageHeader
      title={<Layout.PageHeader.Title>Page Title</Layout.PageHeader.Title>}
      breadcrumbs={
        <Layout.PageHeader.Breadcrumbs
          items={[
            { linkElement: 'Home', to: '/' },
            { linkElement: 'Current Page', to: '' }
          ]}
        />
      }
    />
    <Layout.PageContent>
      {/* Page content here */}
    </Layout.PageContent>
  </Layout.PageGrid>
</Layout.ContentGrid>
```

### Type 2: Content Grid with Aside (Filters)

**Use when:** Page has filter sidebar and main content area

**CRITICAL:** All three (ContentHeader, AsideLeft, PageGrid) must be direct children of ContentGrid

```tsx
<Layout.ContentGrid>
  <Layout.ContentHeader
    title={<Layout.ContentHeader.Title>Page Title</Layout.ContentHeader.Title>}
    breadcrumbs={
      <Layout.ContentHeader.Breadcrumbs
        items={[
          { linkElement: 'Home', to: '/' },
          { linkElement: 'Current', to: '' }
        ]}
      />
    }
  />
  <Layout.AsideLeft size="medium">
    {/* Filter components */}
  </Layout.AsideLeft>
  <Layout.PageGrid>
    <Layout.PageContent>
      {/* Main content */}
    </Layout.PageContent>
  </Layout.PageGrid>
</Layout.ContentGrid>
```

**Common mistake to avoid:**
```tsx
{/* ❌ WRONG - PageGrid nested inside AsideLeft */}
<Layout.ContentGrid>
  <Layout.ContentHeader />
  <Layout.AsideLeft>
    <Layout.PageGrid /> {/* WRONG - should be sibling */}
  </Layout.AsideLeft>
</Layout.ContentGrid>
```

### Type 3: Simple Page (No sidebar)

**Use when:** Basic page with just content, no sidebar

```tsx
<Layout.PageGrid>
  <Layout.PageHeader
    title={<Layout.PageHeader.Title>Page Title</Layout.PageHeader.Title>}
  />
  <Layout.PageContent>
    {/* Page content */}
  </Layout.PageContent>
</Layout.PageGrid>
```

## Critical Rules

### PageHeader Title Wrapping
```tsx
{/* ✅ CORRECT */}
title={<Layout.PageHeader.Title>My Page</Layout.PageHeader.Title>}

{/* ❌ WRONG */}
title="My Page"
```

### Breadcrumbs Structure
```tsx
{/* ✅ CORRECT */}
breadcrumbs={
  <Layout.PageHeader.Breadcrumbs
    items={[
      { linkElement: 'Home', to: '/' },
      { linkElement: 'Section', to: '/section' },
      { linkElement: 'Current Page', to: '' } // Empty string for current page
    ]}
  />
}

{/* ❌ WRONG - Don't pass array directly */}
breadcrumbs={[
  { label: 'Home', href: '/' } // Wrong prop names
]}
```

### Design Token Usage

**Always use Echoes design tokens for spacing:**

```tsx
{/* ✅ CORRECT */}
<div style={{
  padding: 'var(--echoes-dimension-space-150)',
  gap: 'var(--echoes-dimension-space-100)'
}}>

{/* ❌ WRONG */}
<div style={{
  padding: '12px',
  gap: '8px'
}}>
```

**Common spacing tokens:**
- `var(--echoes-dimension-space-50)` - 4px
- `var(--echoes-dimension-space-100)` - 8px
- `var(--echoes-dimension-space-150)` - 12px
- `var(--echoes-dimension-space-200)` - 16px

## Implementation Process

### Step 1: Read Examples
Before implementing, read layout examples:
- `docs/echoes/guides/component-guide.md` - General layout guidance
- `docs/setup.md` - Project-specific layout patterns

### Step 2: Identify Layout Type
Ask yourself:
- Does page need sidebar navigation? → Type 1
- Does page need filters/aside? → Type 2
- Simple content only? → Type 3

### Step 3: Verify Hierarchy
For Type 2 (ContentGrid with filters):
1. ContentHeader is direct child of ContentGrid ✓
2. AsideLeft is direct child of ContentGrid ✓
3. PageGrid is direct child of ContentGrid ✓
4. All three are siblings, not nested ✓

### Step 4: Implement with Tokens
- Use design tokens for ALL spacing
- Use design tokens for colors, borders, etc.
- Never hardcode pixel values

### Step 5: Test Rendering
Before adding content components:
- Check layout structure renders
- Verify no TypeScript errors
- Confirm visual structure looks correct

## Example Usage

**Designer request:** "Create an issues page with filters on the left"

**TodoWrite items:**
```
☐ Identify layout type (Type 2: ContentGrid with AsideLeft)
☐ Read layout examples from docs
☐ Implement ContentGrid with ContentHeader, AsideLeft, PageGrid as siblings
☐ Verify all spacing uses design tokens
☐ Test layout renders
```

**Implementation:**
1. Identify: Type 2 (has filters)
2. Read: `docs/setup.md` ContentGrid section
3. Implement:
   ```tsx
   <Layout.ContentGrid>
     <Layout.ContentHeader
       title={<Layout.ContentHeader.Title>Issues</Layout.ContentHeader.Title>}
     />
     <Layout.AsideLeft size="medium">
       {/* Filters will go here */}
     </Layout.AsideLeft>
     <Layout.PageGrid>
       <Layout.PageContent>
         {/* Content will go here */}
       </Layout.PageContent>
     </Layout.PageGrid>
   </Layout.ContentGrid>
   ```
4. Verify: All siblings of ContentGrid ✓
5. Test: Layout renders correctly ✓

## Key Principles

1. **Read examples first** - Don't guess hierarchy
2. **Verify sibling structure** - Especially for ContentGrid
3. **Use design tokens always** - Never hardcode spacing
4. **Test before content** - Verify layout structure works
5. **Follow patterns exactly** - Don't improvise variations
