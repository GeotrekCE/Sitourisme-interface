(function () {
  'use strict';

  // Setting up route
  angular.module('reports').config(Routes);

  Routes.$inject = ['$stateProvider'];

  var _viewsPrefix = 'modules/reports/views/',
    _viewsSuffix = '.client.view.html';

  /* @ngInject */
  function Routes($stateProvider) {
    // Products state routing
    $stateProvider
      .state('reports', {
        url: '/reports/modules',
        templateUrl: __formatViewPath('list-modules'),
        controller: 'reportsModulesController',
        controllerAs: 'vm'
      })
      .state('logs', {
        url: '/reports/modules/:moduleId/:reportId',
        templateUrl: __formatViewPath('list-reports'),
        controller: 'reportsController',
        controllerAs: 'vm'
      });
  }

  function __formatViewPath(pTemplateName) {
    return _viewsPrefix + pTemplateName + _viewsSuffix;
  }
})();
