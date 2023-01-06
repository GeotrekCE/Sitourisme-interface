(function () {
  'use strict';

  angular
    .module('usersManagement')
    .factory('usersManagementRoles', usersRolesProvider);

  usersRolesProvider.$inject = ['$resource'];

  /* @ngInject */
  function usersRolesProvider($resource) {
    return $resource('api/roles');
  }
})();
