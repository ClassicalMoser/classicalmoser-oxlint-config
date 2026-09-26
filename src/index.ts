import type { BoundaryConfig } from 'eslint-plugin-import-boundaries';
import type { LintPlugins, OxlintConfig, OxlintOverride } from 'oxlint';
import { createBoundariesOverrides } from './boundaries.ts';
import { ignorePatterns } from './ignorePatterns.ts';
import { jestDisableRules } from './jestDisable.ts';
import { createJsxOverlay } from './jsx.ts';
import { baseOverrides } from './overrides.ts';
import { regexpJsPlugins, regexpRules } from './regexp.ts';
import { rules } from './rules.ts';

export type { BoundaryConfig };

export interface OxlintStandardOptions {
  /** Enable JSX-related plugins/rules for the given framework. Omit/false for non-UI repos. */
  jsx?: 'solid' | 'react' | false;
  /** This repo's hexagonal-architecture layer data, if it uses the boundaries plugin. */
  boundaries?: BoundaryConfig[];
  /** This repo's real file-naming convention. Defaults to 'off'. */
  filenameCase?: 'kebabCase' | 'camelCase' | false;
}

const basePlugins: LintPlugins = [
  'import',
  'eslint',
  'unicorn',
  'node',
  'vitest',
  'jsdoc',
  'promise',
  'typescript',
  'oxc',
];

const baseJsPlugins = [
  'eslint-plugin-command',
  'eslint-plugin-jsonc',
  'eslint-plugin-yml',
  ...regexpJsPlugins,
];

export function createOxlintConfig(
  options: OxlintStandardOptions = {},
): OxlintConfig {
  const { jsx = false, boundaries, filenameCase = false } = options;

  const overrides: OxlintOverride[] = [...baseOverrides];
  const plugins: LintPlugins = [...basePlugins];

  if (boundaries) {
    overrides.push(...createBoundariesOverrides(boundaries));
  }

  if (jsx) {
    const jsxOverlay = createJsxOverlay(jsx);
    plugins.push(...jsxOverlay.plugins);
    overrides.push(...jsxOverlay.overrides);
  }

  return {
    plugins,
    jsPlugins: baseJsPlugins,
    categories: {
      correctness: 'error',
      suspicious: 'error',
      pedantic: 'warn',
      perf: 'warn',
      style: 'error',
      restriction: 'error',
      nursery: 'warn',
    },
    env: {
      builtin: true,
      es2026: true,
      browser: true,
      node: true,
    },
    globals: {
      describe: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      vi: 'readonly',
      beforeAll: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
      afterAll: 'readonly',
    },
    ignorePatterns,
    rules: {
      ...rules,
      ...jestDisableRules,
      ...regexpRules,
      'unicorn/filename-case': filenameCase
        ? ['error', { case: filenameCase }]
        : 'off',
    },
    overrides,
  };
}
