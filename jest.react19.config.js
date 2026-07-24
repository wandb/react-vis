/*eslint-env node*/
// Temporary config for the React 19 upgrade experiment: runs only the
// enzyme-free smoke test, since the enzyme adapter cannot load under React 19.
const path = require('path');

module.exports = {
  transform: {
    '^.+\\.js$': path.resolve(__dirname, './jestBabelTransform.js')
  },
  setupFiles: ['./jest.polyfills.js'],
  testMatch: ['**/tests/react19-smoke.test.js']
};
