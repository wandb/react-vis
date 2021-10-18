/* eslint-env node */
const {resolve} = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          rootMode: 'upward'
        }
      }
    ]
  },
  resolve: {
    alias: {
      react: resolve(__dirname, './node_modules/react')
    }
  }
};
