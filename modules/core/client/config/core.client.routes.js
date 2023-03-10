(function () {
  'use strict';

  // Setting up route
  angular.module('core').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  /* @ngInject */
  function Routes($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
})();
