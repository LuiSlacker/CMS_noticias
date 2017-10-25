'use strict';

module.exports = {
  host: (process.env.NODE_ENV === 'production') ? 'math.citeplag.org' : `localhost:${process.env.PORT || '4001'}`,
  slack: {
    webhook: 'https://hooks.slack.com/services/T12312312323123123',
    channels: {
      exceptions: '#nodejs_exceptions',
    },
  },
  logs: {
    dir: '/logs',
    level: (process.env.NODE_ENV === 'production') ? 'info' : 'debug',
  },
};
