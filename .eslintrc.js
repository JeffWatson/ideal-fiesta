var path = require('path');

module.exports = {
  'globals': {
    'document': true,
    'window': true,
    'naviagtor': true,
    'navigator': true,
    'URL': true,
    'fetch': true,

    // tests
    'it': true,
    'describe': true,
    'expect': true,
    'jest': true,
  },
  'extends': 'airbnb',
  'plugins': ['import'],
  'rules': {
    'react/jsx-filename-extension': 0,
    indent: ['error', 2],
    'quote-props': [2, 'as-needed'],
    quotes: [2, 'single'],
    'linebreak-style': 0,
    'max-len': [2, 200, {'ignoreComments': true}]
  },
  'settings': {
    'import/resolver': 'webpack'
  },
};