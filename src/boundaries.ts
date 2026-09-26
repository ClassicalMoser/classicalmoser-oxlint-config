import type { BoundaryConfig } from 'eslint-plugin-import-boundaries';
import type { OxlintOverride } from 'oxlint';

/**
 * The repeated shape of the import-boundaries override, standardized on the
 * `src/**` glob (previously some repos scoped to `src/**` and others left it
 * unscoped, which forced them to separately exempt `**.config.ts`).
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
