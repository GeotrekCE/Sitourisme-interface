(function () {
  'use strict';

  angular.module('products').filter('addPercentSymbol', addPercentSymbol);

  /* @ngInject */
  function addPercentSymbol() {
    return function (input) {
      return input + '%';
    };
  }
})();
