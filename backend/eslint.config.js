// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'padding-line-between-statements': ['error', { blankLine: 'never', prev: '*', next: '*' }],
    },
  },
];
