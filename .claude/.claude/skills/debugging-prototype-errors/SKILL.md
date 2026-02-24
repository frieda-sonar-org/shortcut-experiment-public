---
name: debugging-prototype-errors
description: Use when page breaks, build fails, or designer reports errors - provides designer-friendly error recovery with plain language explanations
---

# Debugging Prototype Errors

## Overview

Helps designers recover when the prototype page breaks. Translates technical errors into plain language and fixes issues using proper verification workflows.

**Announce at start:** "I'm using the debugging-prototype-errors skill to help fix this issue."

## When to Use This Skill

- Build fails with TypeScript errors
- Runtime error in browser console
- Page shows blank/broken
- Designer reports "it's not working"
- Triggered when other skills detect errors

## The Designer Context

**Remember:**
- Designers don't know how to read error messages
- Designers don't check browser console
- Designers don't understand TypeScript errors
- Broken page = entire app looks broken to them
- They need simple explanations and fixes

## Workflow Checklist

Create these TodoWrite items when debugging:

```markdown
- [ ] Read error message from terminal/console
- [ ] Identify root cause (prop mismatch, import error, etc.)
- [ ] Translate error to plain language
- [ ] Explain what broke and why
- [ ] Fix using proper verification (re-run using-echoes-component if needed)
- [ ] Verify fix works before completing
```

## Common Error Types

### Type 1: Prop Type Errors

**What designer sees:** Blank page, TypeScript errors in terminal

**Technical error:**
```
Error: Type '{ header: string }' is not assignable to type 'CardProps'.
Object literal may only specify known properties, and 'header' does not exist in type 'CardProps'.
```

**Translation to designer:**
```
The Card component doesn't have a 'header' prop. It uses 'titleSlot' instead.

I'll fix this by checking the actual Card component props from the source code.
```

**Fix workflow:**
1. Use `using-echoes-component` skill to read Card source
2. Verify correct prop name is `titleSlot`
3. Update code with correct prop
4. Test page loads

### Type 2: Import Errors

**What designer sees:** Blank page, error in terminal

**Technical error:**
```
Error: Module not found: Can't resolve '@sonarsource/echoes-react'
```

**Translation to designer:**
```
The Echoes component library isn't installed properly.

Let me reinstall the dependencies to fix this.
```

**Fix workflow:**
1. Check if node_modules exists
2. Run `yarn install`
3. Restart dev server
4. Verify page loads

### Type 3: Missing Component

**What designer sees:** Blank page, error in console

**Technical error:**
```
Error: Table is not exported from '@sonarsource/echoes-react'
```

**Translation to designer:**
```
The Table component might not be available in the version of Echoes we're using, or it might have a different name.

Let me check what's actually available and find an alternative.
```

**Fix workflow:**
1. Search echoes-react for available components
2. Find correct component name or alternative
3. Use `using-echoes-component` skill to verify props
4. Implement with verified component

### Type 4: Layout Hierarchy Errors

**What designer sees:** Console errors about component hierarchy

**Technical error:**
```
Warning: ContentGrid received an invalid child. PageGrid should be a direct child of ContentGrid.
```

**Translation to designer:**
```
The page layout structure isn't quite right. ContentGrid needs its children in a specific order.

Let me fix the layout structure using the correct pattern.
```

**Fix workflow:**
1. Use `using-echoes-layout` skill to verify correct hierarchy
2. Check ContentGrid sibling structure
3. Fix hierarchy (make ContentHeader, AsideLeft, PageGrid siblings)
4. Verify layout renders correctly

### Type 5: Design Token Errors

**What designer sees:** Console warnings, styles not working

**Technical error:**
```
Warning: Invalid value for property 'padding': '12px'
```

**Translation to designer:**
```
This component needs to use design system spacing values instead of hardcoded pixels.

Let me update it to use the correct spacing values.
```

**Fix workflow:**
1. Replace hardcoded px values with design tokens
2. Use `var(--echoes-dimension-space-150)` instead of `12px`
3. Verify styles render correctly

## Debugging Process

### Step 1: Gather Error Information

**From terminal:**
```bash
# Look for TypeScript errors
# Look for build errors
# Look for import errors
```

**From browser console:**
```
# Look for runtime errors
# Look for React errors
# Look for component warnings
```

**Ask designer:**
"Can you describe what you're seeing? Is the page blank, showing an error message, or something else?"

### Step 2: Identify Root Cause

**Common root causes:**
- Wrong prop names (most common)
- Incorrect component hierarchy
- Missing imports
- Hardcoded values instead of design tokens
- Component doesn't exist in Echoes

### Step 3: Translate to Plain Language

**Pattern:**
```
[What broke] happened because [why].

I'll fix this by [how].
```

**Examples:**
- "The Card isn't showing because it doesn't have a 'header' prop. I'll fix this by using the correct 'titleSlot' prop instead."
- "The page layout isn't working because the components need to be arranged differently. I'll fix this by putting them as siblings instead of nested."

### Step 4: Fix Using Verification Skills

**For prop errors:**
- Use `using-echoes-component` skill to re-verify props
- Read source code again
- Implement with correct props

**For layout errors:**
- Use `using-echoes-layout` skill to re-verify hierarchy
- Check examples from docs
- Fix hierarchy with verified pattern

**For other errors:**
- Check documentation
- Search for similar examples in docs/
- Ask designer if uncertain about requirements

### Step 5: Verify Fix Works

**Before marking complete:**
1. No TypeScript errors in terminal
2. No errors in browser console
3. Page loads and renders
4. Ask designer to confirm if possible: "Can you refresh the page and confirm it's working now?"

## Communication Patterns

### Good Communication (Plain Language)

✅ "The button isn't showing up because we used the wrong prop name. I'll fix it by checking what the actual prop name should be."

✅ "The page is blank because the layout structure needs to be organized differently. I'll rearrange it using the correct pattern."

✅ "The table isn't loading because we need to install a dependency. I'll run the install command to fix it."

### Bad Communication (Too Technical)

❌ "TypeScript error: Type 'string' is not assignable to type 'ButtonVariety'"

❌ "React hierarchy validation failed for Layout.ContentGrid"

❌ "Module resolution error in webpack compilation"

## Error Prevention Tips

**Share these tips with designers after fixing errors:**

1. **"If you see a blank page, send me a message describing what you wanted vs what you're seeing"**
2. **"The console in your browser (right-click → Inspect → Console) can show me helpful error messages if needed"**
3. **"If something breaks, don't worry - I can always check the actual component code to fix it"**

## Example Usage

**Designer reports:** "The page is blank and not loading"

**TodoWrite items:**
```
☐ Check terminal for TypeScript errors
☐ Check browser console for runtime errors
☐ Identify root cause
☐ Translate error to plain language
☐ Fix using verification skill
☐ Test page loads successfully
```

**Workflow:**

1. **Check terminal:** See TypeScript error about 'header' prop
2. **Identify cause:** Used wrong prop name on Card component
3. **Translate:** "The Card component doesn't have a 'header' prop. It uses 'titleSlot' instead."
4. **Fix:** Use `using-echoes-component` skill to verify Card props
5. **Implement:** Change `header` to `titleSlot`
6. **Test:** Page loads successfully ✓
7. **Communicate:** "Fixed! The page is now loading. I updated the Card to use the correct prop name."

## Key Principles

1. **Plain language always** - No technical jargon
2. **Explain what AND why** - Help designers understand
3. **Use verification skills** - Don't guess the fix
4. **Test before completing** - Confirm page works
5. **Empathize with designer** - Remember they're not technical
6. **Be encouraging** - "This is an easy fix" not "You have an error"
