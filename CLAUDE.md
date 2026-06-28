# Project instructions

## After every code change

Run lint fix then build to verify no errors before reporting done:

```
pnpm lint --fix && pnpm build
```

`pnpm lint --fix` auto-fixes style issues. `pnpm build` runs `tsc -b && vite build` — catches type errors and unused variables that `tsc --noEmit` misses.
