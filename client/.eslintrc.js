module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-empty-pattern': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-use-before-define': 'warn'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
};
