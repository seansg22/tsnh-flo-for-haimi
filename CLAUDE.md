# Project instructions

## After every code change

Run lint fix then build to verify no errors before reporting done:

```
pnpm lint --fix && pnpm build
```

`pnpm lint --fix` auto-fixes style issues. `pnpm build` runs `tsc -b && vite build` — catches type errors and unused variables that `tsc --noEmit` misses.

## Adding a new page

1. **`src/types/index.ts`** — add the page name to the `Page` union type.
2. **`src/components/layout/BottomNav.tsx`** — add `{ page, icon, label }` to `homeOptions` or `progressOptions`. Add the page to `isHomeActive` or `isProgressActive` if needed.
3. **`src/screens/`** — create the screen component. Root div must use `fade-in` class and `px-4 pt-6` padding. Title: `text-2xl font-extrabold text-app-text`. Subtitle: `text-sm text-textMuted mt-1`.
4. **`src/App.tsx`** — import the screen and add it to the `pages` record.
