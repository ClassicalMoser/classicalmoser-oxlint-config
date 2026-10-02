import { oxfmtConfig } from './src/oxfmt.ts';

export default {
  ...oxfmtConfig,
  ignorePatterns: ['node_modules/', 'pnpm-lock.yaml'],
};
