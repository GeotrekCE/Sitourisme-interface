(function () {
  'use strict';

  angular.module('products').filter('cutString', cutString);

  /* @ngInject */
  function cutString() {
    return function (input) {
      if (input.length > 25) {
        return input.substring(0, 25) + '...';
      } else {
        return input;
      }
    };
  }
})();
