(function () {
  'use strict';

  angular.module('core').filter('formatTelTo', formatTelTo);

  var countryPhoneToConfig = {
    countryId: 33,
    phoneLength: 10
  };

  /* @ngInject */
  function formatTelTo() {
    return function (input) {
      input = input.replace(/\s/g, '');
      var result = input;

      var inputLength = result.length;

      if (inputLength === countryPhoneToConfig.phoneLength) {
        result =
          '+' + countryPhoneToConfig.countryId + input.slice(1, inputLength);
      }

      return result;
    };
  }
})();
