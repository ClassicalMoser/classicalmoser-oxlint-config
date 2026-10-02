/**
 * Shared ignore globs for ClassicalMoser TS/ESM repos (Vite, Vitest, pnpm,
 * optional Stryker / Tauri / Wrangler). Not a kitchen-sink of every framework.
 */
export const ignorePatterns: string[] = [
  // Dependencies & locks
  '**/node_modules/**',
  '**/.pnpm-store/**',
  '**/pnpm-lock.yaml',
  '**/package-lock.json',
  '**/yarn.lock',

  // Build & test output
  '**/dist/**',
  '**/dist-ssr/**',
  '**/coverage/**',
  '**/reports/**',
  '**/.stryker-tmp/**',
  '**/*.tsbuildinfo',
  '**/*.tgz',
  '**/.eslintcache',
  '**/vite.config.*.timestamp-*',

  // Env / secrets (examples stay lintable if ever relevant)
  '**/.env',
  '**/.env.*',
  '!**/.env.example',
  '**/.dev.vars',
  '**/.dev.vars.*',
  '!**/.dev.vars.example',

  // Caches & local tooling
  '**/.cache/**',
  '**/.npm',
  '**/.wrangler/**',

  // Tauri / Rust sidecar (when present)
  '**/src-tauri/target/**',
  '**/src-tauri/gen/**',

  // Editor / OS
  '**/.idea/**',
  '**/.DS_Store',

  // Non-TS sources we do not lint
  '**/*.md',
  '**/*.mdx',
  '**/__snapshots__/**',
];
