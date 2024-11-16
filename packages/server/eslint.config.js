const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      // Add any server-specific plugins if needed
    },
    rules: {
      ...js.configs.recommended.rules,
      // Add or modify rules specific to your server-side code
    },
  },
];
