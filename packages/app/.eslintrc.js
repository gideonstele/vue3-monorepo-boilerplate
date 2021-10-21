// @ts-check
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['dist', 'node_modules', 'shims-vue.d.ts'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': ['warn'],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
};
