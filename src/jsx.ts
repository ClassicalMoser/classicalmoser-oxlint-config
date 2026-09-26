import type { LintPlugins, OxlintOverride } from 'oxlint';

export interface JsxOverlay {
  plugins: LintPlugins;
  overrides: OxlintOverride[];
}

/**
 * JSX correctness/accessibility, run through oxlint's native `jsx-a11y` plugin
 * plus a framework-specific reactivity overlay. Centralized here so a new
 * client repo only needs to pass `jsx: 'solid' | 'react'` instead of
 * re-authoring its own overlay file.
 */
export function createJsxOverlay(framework: 'solid' | 'react'): JsxOverlay {
  if (framework === 'react') {
    return {
      plugins: ['jsx-a11y', 'react'],
      overrides: [],
    };
  }

  return {
    plugins: ['jsx-a11y'],
    overrides: [
      {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        jsPlugins: ['eslint-plugin-solid'],
        rules: {
          /* High-signal correctness/reactivity rules: these fail the build. */
          'solid/no-destructure': 'error',
          'solid/jsx-no-duplicate-props': 'error',
          'solid/jsx-no-undef': ['error', { typescriptEnabled: true }],
          'solid/no-innerhtml': 'error',
          'solid/prefer-for': 'error',
          'solid/no-react-specific-props': 'error',
          'solid/style-prop': 'error',
          'solid/self-closing-comp': 'error',

          /*
           * Reactivity analysis is valuable but noisy, so it starts as a warning.
           * Ratchet to 'error' once the codebase is clean and any project-specific
           * tracked-scope helpers are declared via the rule's customReactiveFunctions.
           */
          'solid/reactivity': 'warn',
          'solid/components-return-once': 'warn',
          'solid/event-handlers': 'warn',

          /*
           * Oxlint handles unused-variable detection natively; this rule relies on
           * context.markVariableAsUsed, which oxlint does not implement.
           */
          'solid/jsx-uses-vars': 'off',
        },
      },
    ],
  };
}
