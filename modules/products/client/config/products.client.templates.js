(function () {
  'use strict';

  // Setting up route
  angular.module('products').run(productsToolTipUnsafe);

  productsToolTipUnsafe.$inject = ['$templateCache'];

  /* @ngInject */
  function productsToolTipUnsafe($templateCache) {
    // Caching the modal template
    $templateCache.put(
      'products.tooltip.client.template.html',
      '<img src="{{ ctrl.data }}" alt="{{ ctrl.data }}" class="img-thumbnail"/>'
    );
  }
})();
