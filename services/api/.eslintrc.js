const { join } = require('path');

module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import'
  ],
  rules: {
    'no-underscore-dangle': [ 'error', { allow: ['_id'] } ],
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [join(__dirname, 'package.json'), join(__dirname, '../../package.json')] },
    ],
  },
};