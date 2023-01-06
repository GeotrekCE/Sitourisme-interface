(function () {
  'use strict';

  angular.module('core').directive('fieldsConstructor', fieldsConstructor);

  /* @ngInject */
  function fieldsConstructor() {
    return {
      restrict: 'EA',
      templateUrl: 'modules/core/views/fieldsConstructor.client.view.html',
      scope: {
        // Fiche data
        ficheData: '=',
        // object with all fields described
        ficheItems: '=',
        // object with subtypes list and label-id reference
        ficheRef: '='
      },
      bindToController: true,
      controller: __fieldsConstructorController,
      controllerAs: 'fvm'
    };
  }

  /* @ngInject */
  function __fieldsConstructorController() {
    var vm = this;
    //vm.isValidFormItem = isValidFormItem;
    vm.isComplexFormItem = isComplexFormItem;

    /**
     * Return true if form item configuration is correct
     * @param key
     * @returns {boolean}
     */
    function isValidFormItem(key) {
      var attrs = vm.ficheItems[key];

      // if hidden , no need of further data
      if (attrs.hidden) {
        return true;
      }
      // if not editable, just need a label (tag is force to input text readonly
      if (attrs.label && !attrs.editable) {
        return true;
      }
      // else just needs label and tag|fields
      return !!(attrs.label && (attrs.tag || attrs.fields));
    }

    /**
     * Return true if form item contains subitems
     * @param key
     * @returns {boolean}
     */
    function isComplexFormItem(key) {
      var attrs = vm.ficheItems[key];

      return !!(isValidFormItem(key) && attrs.label && attrs.fields);
    }
  }
})();
