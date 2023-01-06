(function () {
  'use strict';

  // Setting up route
  angular.module('products').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  var _viewsPrefix = 'modules/products/views/',
    _viewsSuffix = '.client.view.html';

  /* @ngInject */
  function Routes($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider
      .when('/products', '/products/grid')
      .when('/products/', '/products/grid')
      .when('/products/view', '/products/grid')
      .when('/products/view/', '/products/grid');

    // Products state routing
    $stateProvider
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '',
        templateUrl: __formatViewPath('list-products'),
        controller: 'TabsController',
        controllerAs: 'tabsCtrl',
        abstract: true,
        resolve: {
          defaultTab: function () {
            return {
              title: 'Liste des résultats',
              state: 'products.list.grid'
            };
          },
          defaultAddTabValues: function () {
            return {
              state: 'products.list.view',
              params: ['viewId']
            };
          }
        }
      })
      .state('products.list.grid', {
        url: '/grid',
        templateUrl: __formatViewPath('list-grid-products')
      })
      .state('products.list.view', {
        url: '/view/:viewId',
        templateUrl: __formatViewPath('list-details-product'),
        resolve: {
          resolvedTabName: __getStateName,
          detailsInfos: __getViewDetails,
          formInfos: __getFormDetails
        },
        controller: 'productsDetailsController',
        controllerAs: 'vm'
      })
      .state('products.list.edit', {
        url: '/edit/:viewId',
        templateUrl: __formatViewPath('edit-list-details-product'),
        resolve: {
          resolvedTabName: __getStateName,
          formInfos: __getFormDetails,
          detailsInfos: __getViewDetails
        },
        controller: 'productsDetailsController',
        controllerAs: 'vm'
      });
  }

  __getFormDetails.$inject = ['formService'];

  function __getFormDetails(formService) {
    return formService.getData();
  }

  __getViewDetails.$inject = ['productService', '$stateParams'];

  function __getViewDetails(productService, $stateParams) {
    return productService.getById($stateParams.viewId);
  }

  __getStateName.$inject = ['productService', '$stateParams'];

  function __getStateName(productService, $stateParams) {
    return productService.getProductNameById($stateParams.viewId);
  }

  function __formatViewPath(pTemplateName) {
    return _viewsPrefix + pTemplateName + _viewsSuffix;
  }
})();
