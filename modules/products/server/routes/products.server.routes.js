'use strict';

/**
 * Module dependencies.
 */
var productsPolicy = require('../policies/products.server.policy'),
  products = require('../controllers/products.server.controller');

module.exports = function (app) {
  // Products collection routes
  app
    .route('/api/products')
    .all(productsPolicy.isAllowed)
    .get(products.list)
    .post(products.create);

  app
    .route('/api/products/export-sitra-search')
    .all(productsPolicy.isAllowed)
    .get(products.exportSearchSitra);

  app
    .route('/api/products/export-sitra')
    .all(productsPolicy.isAllowed)
    .post(products.exportSelectionSitra);

  // Single product routes
  app
    .route('/api/products/:productId')
    .all(productsPolicy.isAllowed)
    .get(products.read)
    .put(products.update)
    .delete(products.delete);
  //.post(products.removeFromSitra);

  // productForm configuration route
  app
    .route('/api/product-form')
    .all(productsPolicy.isAllowed)
    .get(products.getFormConfig);

  app.route('/api/products/fix-error').get(products.fixError);

  // Finish by binding the product middleware
  //app.param('productId', products.productByID);
};
