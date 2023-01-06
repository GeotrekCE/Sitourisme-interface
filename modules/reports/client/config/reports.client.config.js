(function () {
  'use strict';

  // Configuring the Products module
  angular.module('reports').run(Menus);

  Menus.$inject = ['Menus'];

  /* @ngInject */
  function Menus(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Reports',
      state: 'logs( { "moduleId": "products" } )',
      type: 'item',
      icon: 'glyphicon glyphicon-list-alt'
    });
  }
})();
