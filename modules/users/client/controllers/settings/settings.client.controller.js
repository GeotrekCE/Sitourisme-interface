(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', [
      '$scope',
      '$http',
      '$location',
      'Users',
      'Authentication',
      SettingsController
    ]);

  /* @ngInject */
  function SettingsController($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // If user is not signed in then redirect back home
    if (!$scope.user) $location.path('/');
  }
})();
