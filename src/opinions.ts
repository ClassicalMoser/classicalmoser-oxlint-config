/**
 * Category-enabled rules this standard turns off.
 *
 * Categories stay on by default (including `restriction` and `nursery`) so new
 * oxlint rules surface in consumer CI as they ship. Prefer discovering a useful
 * rule by hitting it over missing one that never got opted into. Each entry
 * here is a rule we have already assessed and rejected for this standard.
 *
 * Tuned severity/options (keep the rule, change how it behaves): `configuredRules.ts`.
 * Per-glob layering: `overrides.ts`.
 */
export const opinions: Record<string, 'off'> = {
  /*
   * Language / ecosystem features that restriction-category rules still ban.
   * These are normal in TS+ESM codebases; leaving them on is pure noise.
   */
  'no-async-await': 'off',
  'no-undefined': 'off',
  'no-ternary': 'off',
  'no-plusplus': 'off',
  'no-negated-condition': 'off',
  'no-optional-chaining': 'off',
  'no-rest-spread-properties': 'off',
  // Combined `var a, b` declarations; hostile to const/let-per-binding.
  'one-var': 'off',
  'require-await': 'off',
  // Top-level await is intentional in ESM entrypoints and scripts.
  'node/no-top-level-await': 'off',
  // Side-effect imports (CSS, polyfills, register hooks) are legitimate.
  'import/no-unassigned-import': 'off',
  // Types come from TypeScript; JSDoc param/return requirements are redundant.
  'jsdoc/require-param': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/require-throws-type': 'off',
  // Unadulterated nonsense.
  'unicorn/no-negated-condition': 'off',

  /*
   * Metrics and patterns we reject as too blunt for this codebase shape.
   * Several "max-*" rules are worth revisiting only if team size demands
   * hard caps; nested-call limits clash with closure-based composition.
   */
  complexity: 'off',
  'id-length': 'off', // Sound in theory; too strict in practice (i, x, _).
  // Values are too arbitrary. Potentially worth revisiting in the future.
  'max-dependencies': 'off',
  'max-nested-callbacks': 'off',
  'max-statements': 'off',
  'max-lines': 'off',
  'max-lines-per-function': 'off',
  'max-params': 'off',
  'max-depth': 'off',
  'unicorn/max-nested-calls': 'off',
  // Core rule superseded by the import plugin's version.
  'no-duplicate-imports': 'off',
  // Intentional fallthrough avoids repeating shared case bodies.
  'no-fallthrough': 'off',
  // Aimed at `var` capture bugs; we do not use var.
  'no-loop-func': 'off',
  // Sequential awaits in a loop are often correct for dependent work.
  'no-await-in-loop': 'off',
  // Ad-hoc numbers (especially in tests) beat forced named constants.
  'no-magic-numbers': 'off',
  // Assign-then-assert patterns show up in type-narrowing checks.
  'no-useless-assignment': 'off',
  // Leading `_` marks unused bindings; see also no-unused-vars ignore pattern.
  'no-underscore-dangle': 'off',
  'sort-imports': 'off',
  // Function declarations vs expressions have real TS semantic differences.
  'func-style': 'off',
  // Explicit `: boolean = false` is clearer than relying on inference.
  'typescript/no-inferrable-types': 'off',
  // Libraries and apps here target Node/NPM-compatible runtimes.
  'import/no-nodejs-modules': 'off',
  'unicorn/no-array-reduce': 'off',
  // Null means deliberately empty; undefined means never set.
  'unicorn/no-null': 'off',
  // Hooks are optional; when used, both setup and teardown are fine.
  'vitest/require-hook': 'off',
  'vitest/no-hooks': 'off',
  // Prefer toHaveBeenCalledTimes(n) over once-vs-times inconsistency.
  'vitest/prefer-called-once': 'off',

  /*
   * Pure style nags that fight how we write comments, exports, and iteration.
   * Prefer named exports; keep comment casing free; order keys by domain.
   */
  'capitalized-comments': 'off',
  'no-inline-comments': 'off',
  'no-warning-comments': 'off',
  'no-named-export': 'off',
  'no-immediate-mutation': 'off',
  'no-array-for-each': 'off',
  // Early-continue guards beat deep nesting in loops.
  'no-continue': 'off',
  'prefer-destructuring': 'off',
  // Import-then-export is fine for barrels that also use the binding.
  'unicorn/prefer-export-from': 'off',
  // Keep `Number.parseInt` / `parseFloat`; do not force `Number()` / `Math.trunc`.
  'unicorn/prefer-number-coercion': 'off',
  'prefer-ternary': 'off',
  'sort-keys': 'off',
  // Import layering is enforced by eslint-plugin-import-boundaries when opted in.
  'import/no-relative-parent-imports': 'off',
  'import/prefer-default-export': 'off',
  // Vitest globals are provided via env/globals in createOxlintConfig.
  'vitest/prefer-importing-vitest-globals': 'off',
};
