'use strict';

/**
 * Module dependencies.
 */
var policy = require('../policies/usersManagement.server.policy'),
  api = require('../controllers/usersManagement.server.controller');

module.exports = function (app) {
  app
    .route('/api/userslist')
    .all(policy.isAllowed)
    .get(api.list)
    .post(api.create);

  app
    .route('/api/userslist/:userId')
    .all(policy.isAllowed)
    .get(api.read)
    .put(api.update)
    .delete(api.remove);

  app.param('userId', api.getUserById);

  app.route('/api/roles').get(api.getRoles);

  app.route('/api/apiKeys').get(api.getApiKeys);
};
