(function () {
  'use strict';

  // Configuring the Products module
  angular.module('core').run(StateInterceptor);

  StateInterceptor.$inject = ['$rootScope', '$state'];

  /* @ngInject */
  function StateInterceptor($rootScope, $state) {
    // Catch the propagated event when there is a change of state
    $rootScope.$on('$stateChangeStart', function (
      event,
      toState,
      toParams,
      fromState,
      fromParams
    ) {
      // Create regex pattern to match 'edit' and 'view' states
      var rgx = /\/(view|edit)\/\:viewId/gi;

      // Check if there are origin and destination states
      if (fromState && toState) {
        // Check if those stats owns url
        if (fromState.url && toState.url) {
          // Check origin and destination states url value
          if (fromState.url.match(rgx) && toState.url === '/grid') {
            $rootScope.$emit('switchToDefaultTab');
          }
        }
      }
    });
  }
})();
