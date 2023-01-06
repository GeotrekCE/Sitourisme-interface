(function () {
  'use strict';

  // Configuring the Products module
  angular.module('products').run(Menus);

  Menus.$inject = ['Menus'];

  /* @ngInject */
  function Menus(Menus) {
    // Add the products dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Products',
      state: 'products.list.grid',
      type: 'item',
      icon: 'glyphicon glyphicon-cog'
    });
  }
})();
