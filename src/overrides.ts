import type { OxlintOverride } from 'oxlint';

/**
 * File-glob overlays on top of the global rule set.
 *
 * Global opinions (`off`): `opinions.ts`.
 * Global tuned options: `configuredRules.ts`.
 * Optional boundaries / JSX overlays are added in `createOxlintConfig`.
 */
export const baseOverrides: OxlintOverride[] = [
  {
    // All JS/TS sources: Node callback naming + softer JSDoc signal.
    files: ['**/*.?([cm])[jt]s?(x)'],
    rules: {
      // Default pattern is only `err`; accept `error` as well.
      'node/handle-callback-err': ['error', '^(err|error)$'],
      // Categories put these at error; warn is enough when JSDoc is sparse.
      'jsdoc/check-access': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
    },
  },
  {
    // TypeScript sources: disable JS rules TS already covers, then TS-specific policy.
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    rules: {
      // These flag programs TypeScript rejects as syntax/type errors anyway.
      'constructor-super': 'off',
      'no-class-assign': 'off',
      'no-const-assign': 'off',
      'no-dupe-keys': 'off',
      'no-func-assign': 'off',
      'no-import-assign': 'off',
      'no-new-native-nonconstructor': 'off',
      'no-obj-calls': 'off',
      'no-setter-return': 'off',
      'no-this-before-super': 'off',
      'no-unsafe-negation': 'off',
      'no-with': 'off',
      // Empty constructors are normal when a subclass only sets parameter properties.
      'no-useless-constructor': 'off',

      // Do not treat shadowing of builtins (e.g. `name`, `status`) as redeclare.
      'no-redeclare': [
        'error',
        {
          builtinGlobals: false,
        },
      ],
      // Require const when the whole destructuring is never reassigned.
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
      // Allow function/class hoisting idioms; still flag use-before-define for vars.
      'no-use-before-define': [
        'error',
        {
          classes: false,
          functions: false,
        },
      ],

      // `@ts-expect-error` / `@ts-ignore` / etc. — default options already require descriptions.
      'typescript/ban-ts-comment': 'error',
      // Dynamic delete on maps/records is an accepted pattern here.
      'typescript/no-dynamic-delete': 'off',
      // Empty interfaces are used as extension/branding points.
      'typescript/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'always',
        },
      ],
      // Prefer `import type`, but allow `import('pkg').Type` type annotations.
      'typescript/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
  {
    // Ambient declaration files often look "empty" to import/unambiguous.
    files: ['**/*.d.ts'],
    rules: {
      'import/unambiguous': 'off',
    },
  },
  {
    // Vitest style only — no debt-relief disables (any / non-null stay on).
    files: ['**/*.test.ts'],
    rules: {
      'vitest/consistent-test-it': [
        'error',
        {
          fn: 'it',
        },
      ],
      // Prefer toBe(true)/toBe(false); truthy/falsy also match 0, '', null, etc.
      'vitest/prefer-to-be-truthy': 'off',
      'vitest/prefer-to-be-falsy': 'off',
    },
  },
  {
    // package.json key order used across ClassicalMoser repos (packageManager last).
    files: ['**/package.json'],
    rules: {
      'jsonc/sort-array-values': [
        'error',
        {
          order: {
            type: 'asc',
          },
          pathPattern: '^files$',
        },
      ],
      'jsonc/sort-keys': [
        'error',
        {
          order: [
            'name',
            'version',
            'private',
            'type',
            'description',
            'author',
            'license',
            'homepage',
            'repository',
            'bugs',
            'keywords',
            'exports',
            'main',
            'module',
            'types',
            'files',
            'engines',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
            'publishConfig',
            'volta',
            'packageManager',
          ],
          pathPattern: '^$',
        },
        {
          // Keep dependency maps alphabetized regardless of top-level order.
          order: {
            type: 'asc',
          },
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
        },
        {
          order: ['types', 'import', 'require', 'default'],
          pathPattern: '^exports.*$',
        },
      ],
    },
  },
  {
    // Tooling entry files are exempt from library-facing export/return style.
    files: ['**/*.config.ts'],
    rules: {
      'import/no-default-export': 'off',
      'typescript/explicit-function-return-type': 'off',
    },
  },
];
