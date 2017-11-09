'use strict';

module.exports = {
  mongoDB: {
    host: 'ds231715.mlab.com:31715',
    name: 'cms_noticias',
    username: '<the username goes here>',
    password: '<the password goes here>',
  },
  session: {
    secret: '<the session secret here>',
  },
  logs: {
    dir: '/logs',
    level: (process.env.NODE_ENV === 'production') ? 'info' : 'debug',
  },
  slack: {
    webhook: 'https://hooks.slack.com/services/T12312312323123123',
    channels: {
      exceptions: '#nodejs_exceptions',
    },
  },
};
