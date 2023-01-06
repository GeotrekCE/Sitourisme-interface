(function () {
  'use strict';

  angular.module('products').filter('arrayToStr', arrayToStr);

  /* @ngInject */
  function arrayToStr() {
    return function (input) {
      return input ? input.join('; ') : input;
    };
  }
})();
