'use strict';

module.exports = {
  rules: {
    'prefer-camel-case': require('./lib/rules/prefer-camel-case'),
  },
  configs: {
    recommended: {
      rules: {
        'prefer-camel-case': 'error',
      },
    },
  },
};
