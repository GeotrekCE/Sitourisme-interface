'use strict';

module.exports = {
  app: {
    title: 'PACA',
    description:
      'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'mongodb, express, angularjs, node.js, mongoose, passport',
    googleAnalyticsTrackingID:
      process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  api: {
    domain: 'paca.sitourisme.fr',
    port: 8444,
    path: '/api/products'
  },
  townApi: {
    domain: 'paca.sitourisme.fr',
    port: 8444,
    path: '/api/towns/search'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'PACA',
  sessionCollection: 'sessions'
};
