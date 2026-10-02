/**
 * Rules we keep on, but with severity or options that differ from what
 * categories alone would produce.
 *
 * If a rule is fully rejected, it belongs in `opinions.ts` (`'off'`).
 * If it only applies to certain globs, it belongs in `overrides.ts`.
 * This file is the short list of global "yes, but configured like this."
 */
export const configuredRules: Record<string, unknown> = {
  // Pedantic/nursery often warn; we want setter/getter pairing as errors.
  'accessor-pairs': 'error',

  // Default is `always` (=== everywhere). `smart` allows `== null` checks.
  eqeqeq: ['error', 'smart'],

  // `new foo()` is an error; `Foo()` without `new` is allowed.
  // e.g. fastify's export is a capitalized factory (`Fastify()`), not a class.
  'new-cap': [
    'error',
    {
      capIsNew: false,
      newIsCap: true,
      properties: true,
    },
  ],

  // Default allows `if ((x = y))` with extra parens; we ban all assignment-in-condition.
  'no-cond-assign': ['error', 'always'],

  // Allow console.error for fatal/reporting paths; ban log/warn/info/debug.
  'no-console': [
    'error',
    {
      allow: ['error'],
    },
  ],

  // Default allows `x ? x : y`; we want `x || y` (or ??) instead.
  'no-unneeded-ternary': [
    'error',
    {
      defaultAssignment: false,
    },
  ],

  // Permit idiomatic short-circuit / ternary / tagged-template expression statements.
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTaggedTemplates: true,
      allowTernary: true,
    },
  ],

  // Unused args and catch bindings are ignored; `_`-prefixed locals are ignored.
  // (Oxlint has no typescript/no-unused-vars — this rule covers .ts as well.)
  'no-unused-vars': [
    'error',
    {
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      varsIgnorePattern: '^_',
    },
  ],

  // Require `typeof x === "string"` (literal), not `typeof x === someType`.
  // Also catches the classic `typeof x === undefined` (value) bug.
  'valid-typeof': [
    'error',
    {
      requireStringLiterals: true,
    },
  ],

  // Enables the command plugin's `// command` workflow comments.
  'command/command': 'error',
};
