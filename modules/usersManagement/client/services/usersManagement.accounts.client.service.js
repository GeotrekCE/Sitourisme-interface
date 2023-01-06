(function () {
  'use strict';

  angular
    .module('usersManagement')
    .factory('usersManagementAccounts', usersAccountsProvider);

  usersAccountsProvider.$inject = ['$resource'];

  /* @ngInject */
  function usersAccountsProvider($resource) {
    return $resource(
      'api/userslist/:userId',
      {
        userId: '@_id'
      },
      {
        update: {
          method: 'PUT'
        }
      }
    );
  }
})();
