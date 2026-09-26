/**
 * The strict, framework-agnostic rule set shared by every consumer.
 * Adapted from prevail-rules' oxlint config, the one repo of the original
 * four that carried zero debt-relief exceptions and already lints clean.
 */
export const rules: Record<string, unknown> = {
  // These are irrelevant to modern typescript codebases
  'no-async-await': 'off',
  'no-undefined': 'off',
  'no-ternary': 'off',
  'no-plusplus': 'off',
  'no-negated-condition': 'off',
  'no-optional-chaining': 'off',
  'no-rest-spread-properties': 'off',
  'require-await': 'off',
  'import/no-unassigned-import': 'off',
  'jsdoc/require-param': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-returns-type': 'off',
  'unicorn/no-negated-condition': 'off',

  // Rules with opinions the codebase disagrees with
  // These have specific reasons for being disabled
  complexity: 'off', // Consider changing if team size increases and arbitrary limits are needed.
  'id-length': 'off', // Good idea but too strict to be practical.
  'max-dependencies': 'off', // Consider changing if team size increases and arbitrary limits are needed.
  'max-statements': 'off', // Consider changing if team size increases and arbitrary limits are needed.
  'max-lines': 'off', // Consider changing if team size increases and arbitrary limits are needed.
  'max-lines-per-function': 'off', // Consider changing if team size increases and arbitrary limits are needed.
  'no-duplicate-imports': 'off', // Superseded by import/no-duplicates
  'no-loop-func': 'off', // The use of "var" is prohibited, so this rule is mostly extraneous.
  'no-await-in-loop': 'off', // Await is often entirely reasonable in a loop, especially for dependent logic in a closure.
  'no-magic-numbers': 'off', // Ad-hoc numbers are allowed, particularly in tests.
  'no-useless-assignment': 'off', // Often used for type assertion checks
  'no-underscore-dangle': 'off', // Internally allowed for unused variables
  'sort-imports': 'off', // Superseded by import/sort
  'func-style': 'off', // Declaration methods have different semantics that function differently in TypeScript.
  'typescript/no-inferrable-types': 'off', // Excessive clarity is preferable to ambiguity
  'import/no-nodejs-modules': 'off', // Codebase is designed only for NPM-compatible environments
  'unicorn/no-array-reduce': 'off', // Reduce is often ideal for this idiom.
  'vitest/require-hook': 'off', // Vitest hooks are not required for tests
  'vitest/no-hooks': 'off', // Vitest hooks can be used for setup and teardown where sensible
  'vitest/prefer-called-once': 'off', // Called times for consistency

  // These are styling preferences
  'capitalized-comments': 'off', // Function and variable references will not match if capitalized.
  'no-inline-comments': 'off', // Inline comments allowed for short clarifications
  'no-warning-comments': 'off', // Warning comments allowed for future reference
  'no-named-export': 'off', // Named exports are preferred for readability
  'no-immediate-mutation': 'off', // Immutable updates are preferred for readability
  'no-array-for-each': 'off', // ForEach is often the best option for readability.
  'prefer-destructuring': 'off', // Destructuring is not always the best option for readability
  'prefer-ternary': 'off', // Ternary is not always the best option for readability
  'sort-keys': 'off', // Keys are ordered by definition order, not alphabetically.
  'import/no-relative-parent-imports': 'off', // Stricter rules are delegated to the boundary plugin
  'import/prefer-default-export': 'off', // Named exports are preferred for readability
  'vitest/prefer-importing-vitest-globals': 'off', // No reason to require explicit vitest global imports.

  // Rules that require some configuration
  'accessor-pairs': [
    'error',
    {
      enforceForClassMembers: true,
      setWithoutGet: true,
    },
  ],
  eqeqeq: ['error', 'smart'],
  'new-cap': [
    'error',
    {
      capIsNew: false,
      newIsCap: true,
      properties: true,
    },
  ],
  'no-cond-assign': ['error', 'always'],
  'no-console': [
    'error',
    {
      allow: ['error'],
    },
  ],
  'no-labels': [
    'error',
    {
      allowLoop: false,
      allowSwitch: false,
    },
  ],
  'no-unneeded-ternary': [
    'error',
    {
      defaultAssignment: false,
    },
  ],
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTaggedTemplates: true,
      allowTernary: true,
    },
  ],
  'no-unused-vars': [
    'error',
    {
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true,
      vars: 'all',
      varsIgnorePattern: '^_',
    },
  ],
  'unicode-bom': ['error', 'never'],
  'typescript/no-unused-vars': [
    'error',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      vars: 'all',
      varsIgnorePattern: '^_',
    },
  ],
  'valid-typeof': [
    'error',
    {
      requireStringLiterals: true,
    },
  ],
  yoda: ['error', 'never'],
  'command/command': 'error',
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import/no-duplicates': [
    'error',
    {
      preferInline: false,
    },
  ],
};
