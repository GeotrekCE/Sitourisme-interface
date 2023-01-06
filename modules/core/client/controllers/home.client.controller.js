(function () {
  'use strict';

  angular.module('core').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Authentication', '$timeout', '$window'];

  /* @ngInject */
  function HomeController($scope, Authentication, $timeout, $window) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $timeout(function () {
      $window.location.href = !$scope.authentication.user
        ? '/authentication/signin'
        : '/products/grid';
    }, 1);
  }
})();
