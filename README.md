# Rachit Dev Web Service — Fixed Next.js Portfolio

Responsive cream/white/black portfolio with Next.js App Router, React, TypeScript, Tailwind CSS v4, Lucide icons, and Motion animations.

## Run locally (Windows PowerShell or other terminal)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Verify

```bash
npm run typecheck
npm run lint
npm run build
```

## Important

- Components are in the **root `components/`** directory, imported via `@/components/...`.
- Every component uses a single default export.
- Motion animation library is included (`motion/react`).
- The inquiry form validates fields and prepares an email draft. Before using it, replace the empty `recipient` string in `components/Contact.tsx` with your real business email. It does not submit to a server.
- Project previews and social links should be reviewed and updated with your own URLs.
- No `node_modules` or `.next` cache is included in the ZIP.
