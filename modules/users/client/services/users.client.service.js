(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular.module('users').factory('Users', ['$resource', Users]);

  /* @ngInject */
  function Users($resource) {
    return $resource(
      'api/users',
      {},
      {
        update: {
          method: 'PUT'
        }
      }
    );
  }
})();
