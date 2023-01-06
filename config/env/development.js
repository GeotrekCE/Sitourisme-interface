'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/paca-dev',
  app: {
    title: 'PACA - Development Environment'
  },
  api: {
    domain: 'localhost',
    port: 3003,
    path: '/api/products'
  },
  townApi: {
    domain: 'localhost',
    port: 3003,
    path: '/api/towns/search'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
