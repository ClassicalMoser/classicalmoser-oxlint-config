import type { BoundaryConfig } from 'eslint-plugin-import-boundaries';
import type { OxlintOverride } from 'oxlint';

/**
 * Opt-in layer import boundaries via eslint-plugin-import-boundaries.
 *
 * For any repo with a clear dependency DAG between folders under `src`.
 * Scoped to `src/**` so config entrypoints outside src need no separate exempt.
 * Test/mock trees load the same boundary table but with `enforceBoundaries: false`
 * so fixtures can import across layers without weakening production rules.
 */
export function createBoundariesOverrides(
  boundaries: BoundaryConfig[],
): OxlintOverride[] {
  return [
    {
      files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx'],
      jsPlugins: ['eslint-plugin-import-boundaries'],
      rules: {
        'import-boundaries/enforce': [
          'error',
          {
            rootDir: 'src',
            boundaries,
          },
        ],
      },
    },
    {
      files: [
        '**/*.test.{ts,js}',
        '**/*.spec.{ts,js}',
        '**/*.mock.{ts,js}',
        '**/__tests__/**',
        '**/__mocks__/**',
      ],
      jsPlugins: ['eslint-plugin-import-boundaries'],
      rules: {
        'import-boundaries/enforce': [
          'error',
          {
            rootDir: 'src',
            boundaries,
            enforceBoundaries: false,
          },
        ],
      },
    },
  ];
}
