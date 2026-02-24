---
name: working-with-prototyper
description: Use when starting any prototyping session - establishes sandbox isolation, safe git workflow, and triggers sub-skills for layout and component verification
---

# Working with Prototyper

## Overview

Master workflow skill for designers building SonarQube UI prototypes. Establishes sandbox isolation to avoid merge conflicts when pulling upstream updates, ensures safe git practices, and orchestrates sub-skills for component verification.

**Announce at start:** "I'm using the working-with-prototyper skill to set up your prototyping workflow."

## When to Use This Skill

- At the start of ANY designer prototyping session
- When designer requests to create a new page or feature
- When starting work on an existing prototype

## Critical Rules

### Sandbox Isolation
- ✅ Create all designer work in `src/pages/sandbox/` directory
- ✅ Use branches for all designer work (never work directly on main)
- ❌ NEVER modify core files without explicit designer permission
- ✅ Core files that may need careful updates:
  - Routing configuration
  - Shared components in `src/components/`
  - Main layout files

### Git Workflow
- Check current branch before starting work
- If on main branch, suggest creating a feature branch: `feature/[descriptive-name]`
- Explain to designer: "Working on a branch keeps your experiments isolated and makes it easy to pull updates from the main repo"

### Sub-Skill Orchestration
- When creating page structure → Trigger `using-echoes-layout` skill
- When using ANY Echoes component → Trigger `using-echoes-component` skill
- When errors occur → Trigger `debugging-prototype-errors` skill

## Workflow Checklist

Every time designer starts work, create these TodoWrite items:

```markdown
- [ ] Check current git branch
- [ ] Suggest feature branch if on main (format: feature/[name])
- [ ] Confirm sandbox directory exists (src/pages/sandbox/)
- [ ] Create/verify page file in sandbox directory
- [ ] Use using-echoes-layout skill for page structure
- [ ] Use using-echoes-component skill for each component
- [ ] Verify page loads successfully before completing
```

## Implementation Pattern

### When Designer Says: "Create a new [page name] page"

**Response flow:**

1. **Create TodoWrite checklist** (using the checklist above)

2. **Check git branch:**
   ```bash
   git branch --show-current
   ```

3. **If on main, suggest branch:**
   ```
   You're currently on the main branch. I recommend creating a feature branch for this work:

   Suggested branch name: feature/[page-name]

   Would you like me to create this branch? (y/n)
   ```

4. **If designer confirms, create branch:**
   ```bash
   git checkout -b feature/[page-name]
   ```

5. **Verify sandbox directory:**
   ```bash
   ls -la src/pages/sandbox/ || mkdir -p src/pages/sandbox/
   ```

6. **Create page file:** `src/pages/sandbox/[PageName].tsx`

7. **Announce sub-skill usage:**
   "I'm using the using-echoes-layout skill to create the correct page structure."

8. **After layout complete, for each component:**
   "I'm using the using-echoes-component skill to verify [ComponentName] props."

9. **Before marking complete, verify:**
   - Page file created in sandbox
   - No TypeScript errors
   - Page included in sandbox routing (if applicable)
   - Page loads in browser (ask designer to confirm if possible)

## Communication with Designers

### Use Plain Language
- ❌ "I'll scaffold the component hierarchy"
- ✅ "I'll create the page structure"

### Explain Why
When suggesting branches or sandbox:
- "Working in sandbox/ keeps your experiments separate from the core files"
- "Using a branch makes it easy to pull updates from main without conflicts"

### Progressive Disclosure
- Work silently by default
- Include collapsible "Technical Details" if relevant
- Ask for clarification when designer requests unclear component mappings

## Error Prevention

### Before Creating Any Component
- MUST trigger `using-echoes-component` skill
- NEVER guess component props
- NEVER assume prop names

### Before Creating Page Layout
- MUST trigger `using-echoes-layout` skill
- NEVER guess layout hierarchy
- ALWAYS verify ContentGrid sibling structure

## Example Usage

**Designer request:** "Create a new issues page with a table"

**TodoWrite items created:**
```
☐ Check current git branch
☐ Create feature/issues-page branch
☐ Create sandbox/IssuesPage.tsx file
☐ Use using-echoes-layout skill for page structure
☐ Use using-echoes-component skill for Table component
☐ Add mock data for table
☐ Verify page loads successfully
```

**Workflow:**
1. Check branch (on main) → suggest feature/issues-page
2. Create branch after designer confirms
3. Create src/pages/sandbox/IssuesPage.tsx
4. Trigger using-echoes-layout skill → implement ContentGrid structure
5. Trigger using-echoes-component skill for Table → verify props from source
6. Implement table with verified props
7. Test page loads
8. Mark all todos complete

## Key Principles

1. **Sandbox isolation is mandatory** - Designer work stays isolated
2. **Branch workflow is mandatory** - Avoid merge conflicts with upstream
3. **Sub-skills are mandatory** - Never skip verification steps
4. **TodoWrite tracking is mandatory** - All checklists become todos
5. **Plain language communication** - Assume no technical knowledge
