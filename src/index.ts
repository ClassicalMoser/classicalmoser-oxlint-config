import type { BoundaryConfig } from 'eslint-plugin-import-boundaries';
import type { OxlintConfig, OxlintOverride } from 'oxlint';
import { createBoundariesOverrides } from './boundaries.ts';
import { configuredRules } from './configuredRules.ts';
import { ignorePatterns } from './ignorePatterns.ts';
import { createJsxOverlay } from './jsx.ts';
import { opinions } from './opinions.ts';
import { baseOverrides } from './overrides.ts';
import { regexpJsPlugins, regexpRules } from './regexp.ts';

export interface OxlintStandardOptions {
  /** Enable JSX-related plugins/rules for the given framework. Omit/false for non-UI repos. */
  jsx?: 'solid' | 'react' | false;
  /** Layer dependency DAG for eslint-plugin-import-boundaries, if this repo uses it. */
  boundaries?: BoundaryConfig[];
  /** This repo's real file-naming convention. Defaults to 'off'. */
  filenameCase?: 'kebabCase' | 'camelCase' | false;
}

/** Native oxlint plugins always enabled for every consumer. */
const basePlugins = [
  'import',
  'eslint',
  'unicorn',
  'node',
  'vitest',
  'jsdoc',
  'promise',
  'typescript',
  'oxc',
] as const;

/**
 * JS (eslint-compatible) plugins resolved from the consumer's node_modules.
 * Declared as peerDependencies of this package — oxlint loads them by name.
 */
const baseJsPlugins = [
  'eslint-plugin-command',
  'eslint-plugin-jsonc',
  ...regexpJsPlugins,
];

/**
 * Build the shared ClassicalMoser oxlint config.
 *
 * Philosophy: categories on by default so newly published oxlint rules show up
 * in consumer lint runs. Assess each one when encountered — keep it, tune it in
 * `configuredRules`, or reject it in `opinions`. Missing a helpful rule by never
 * opting in is worse than occasionally triaging a noisy one.
 *
 * Rule surface:
 * - `categories` — on-by-default buckets (restriction + nursery included).
 * - `opinions` — already-assessed rejects.
 * - `configuredRules` — keepers with non-default severity/options.
 * - `overrides` — file-glob exceptions (TS, tests, package.json, …).
 * - optional `boundaries` / `jsx` overlays when requested.
 */
export function createOxlintConfig(
  options: OxlintStandardOptions = {},
): OxlintConfig {
  const { jsx = false, boundaries, filenameCase = false } = options;

  const overrides: OxlintOverride[] = [...baseOverrides];
  const jsxOverlay = jsx ? createJsxOverlay(jsx) : undefined;

  if (boundaries) {
    overrides.push(...createBoundariesOverrides(boundaries));
  }

  if (jsxOverlay) {
    overrides.push(...jsxOverlay.overrides);
  }

  return {
    plugins: jsxOverlay
      ? [...basePlugins, ...jsxOverlay.plugins]
      : [...basePlugins],
    jsPlugins: baseJsPlugins,
    categories: {
      // Broad categories on purpose: new upstream rules appear in CI automatically.
      // Assess each surprise; promote keepers, add rejects to `opinions.ts`.
      correctness: 'error', // Stock oxlint warns; we fail the build.
      suspicious: 'error',
      pedantic: 'warn',
      perf: 'warn',
      style: 'error',
      restriction: 'error', // Noisy bucket — opinions.ts is the assessed allow-list of offs.
      nursery: 'warn', // Unstable rules as warnings until assessed.
    },
    env: {
      builtin: true,
      es2026: true,
      browser: true,
      node: true,
    },
    // Vitest globals so tests need not import { describe, it, expect, vi }.
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
      ...opinions,
      ...configuredRules,
      ...regexpRules,
      'unicorn/filename-case': filenameCase
        ? ['error', { case: filenameCase }]
        : 'off',
    },
    overrides,
  };
}
