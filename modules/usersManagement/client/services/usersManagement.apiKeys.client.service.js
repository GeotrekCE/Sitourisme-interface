(function () {
  'use strict';

  angular
    .module('usersManagement')
    .factory('usersManagementApiKeys', usersApiKeysProvider);

  usersApiKeysProvider.$inject = ['$resource'];

  /* @ngInject */
  function usersApiKeysProvider($resource) {
    return $resource('api/apiKeys');
  }
})();
