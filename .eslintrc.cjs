module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    '@typescript-eslint/no-misused-promises': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'warn',
    'prettier/prettier': ['error'],
    'react/destructuring-assignment': [1, 'always'],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*'],
      },
    ],
  },
};
