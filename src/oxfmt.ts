/**
 * Shared oxfmt options for ClassicalMoser repos.
 * Plain object — no oxfmt dependency required to import this.
 *
 * Consumers: `import { oxfmtConfig } from 'classicalmoser-oxlint-config/oxfmt'`
 * and spread into their local `oxfmt.config.ts` (add ignorePatterns there).
 */
export const oxfmtConfig = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
} as const;
