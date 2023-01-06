(function () {
  'use strict';

  angular
    .module('core')
    .filter('checkUnfilledField', checkUnfilledField)
    .filter('checkUnfilledFieldNoReturn', checkUnfilledFieldNoReturn)
    .filter('isFieldUnfilled', isFieldUnfilled);

  var _unfilledFieldWarning = 'champ non renseigné';

  /* @ngInject */
  function checkUnfilledField() {
    return function (input) {
      return input != null ? input : _unfilledFieldWarning;
    };
  }

  /* @ngInject */
  function checkUnfilledFieldNoReturn() {
    return function (input) {
      var result = input == null ? _unfilledFieldWarning : '';

      if (angular.isObject(input)) {
        var props = Object.getOwnPropertyNames(input);

        var propsLength = props.length;

        if (propsLength === 0 || (propsLength === 1 && props[0] === 'length')) {
          result = _unfilledFieldWarning;
        }
      }

      return result;
    };
  }

  /* @ngInject */
  function isFieldUnfilled() {
    return function (input) {
      return input == null;
    };
  }
})();
