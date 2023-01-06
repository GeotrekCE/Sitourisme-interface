'use strict';

/**
 * Module dependencies.
 */
var townsPolicy = require('../policies/towns.server.policy'),
  towns = require('../controllers/towns.server.controller');

module.exports = function (app) {
  // getTowns configuration route
  app
    .route('/api/towns') //.all(townsPolicy.isAllowed)
    .get(towns.getTowns);
};
