Scaffold a new Next.js 15 project in the current directory with the following setup:

**Core stack:**
- Next.js 15 with App Router
- TypeScript (strict mode)
- Tailwind CSS v4
- ESLint + Prettier
- `src/` directory structure
- Import alias: `@/*`

**Project structure to create:**
- `src/app/` — App Router pages and layouts
- `src/components/` — Reusable React components (with a `ui/` subfolder for primitives)
- `src/lib/` — Utilities, helpers, and shared logic
- `src/hooks/` — Custom React hooks
- `src/types/` — Shared TypeScript types
- `public/` — Static assets

**Setup steps:**
1. Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack` (skip the interactive prompts)
2. Install dev dependencies: `prettier`, `prettier-plugin-tailwindcss`, `eslint-config-prettier`
3. Create `.prettierrc` with sensible defaults (single quotes, trailing commas, 100 char width, tailwind plugin)
4. Update `.eslintrc.json` to extend `prettier` so it doesn't fight with Prettier
5. Add npm scripts: `format`, `format:check`, `typecheck`
6. Create a clean `src/app/page.tsx` with a minimal landing page (remove the default Next.js boilerplate)
7. Create `src/app/layout.tsx` with proper metadata and font loading (use `next/font` with Inter)
8. Add a `src/lib/utils.ts` with a `cn()` helper (clsx + tailwind-merge)
9. Install `clsx` and `tailwind-merge` for the utility
10. Create a `.env.example` file and add `.env.local` to `.gitignore` (should already be there)
11. Initialize git if not already initialized, and make an initial commit

**Verification:**
- Run `npm run build` to confirm the project builds without errors
- Run `npm run lint` and `npm run typecheck` to confirm no issues
- Report the final directory tree (excluding `node_modules` and `.next`)

Do not add any additional libraries (no shadcn/ui, no state management, no auth, no database) — keep this as a clean foundation I can build on.