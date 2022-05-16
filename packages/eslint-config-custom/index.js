module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': ['error', 'never'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/no-unused-vars': ['error'],
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-empty-function': 'off',
    'no-void': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
