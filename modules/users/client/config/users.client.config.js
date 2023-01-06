(function () {
  'use strict';

  // Config HTTP Error Handling
  angular
    .module('users')
    .config(['$httpProvider', Config])
    .run(['$rootScope', '$state', 'Authentication', Run]);

  /* @ngInject */
  function Config($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }

  function Run($rootScope, $state, Authentication) {
    $rootScope.$on('$stateChangeStart', function (e, to) {
      var auth = Authentication;
      if (
        to.data &&
        to.data.adminOnly &&
        !(auth.user && auth.user.roles[0] == 'admin')
      ) {
        e.preventDefault();
        $state.go('authentication.signin');
      }
    });
  }
})();
