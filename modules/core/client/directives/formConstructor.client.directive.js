(function () {
  'use strict';

  angular.module('core').directive('formConstructor', formConstructor);

  /* @ngInject */
  function formConstructor() {
    return {
      restrict: 'EA',
      templateUrl: 'modules/core/views/formConstructor.client.view.html',
      scope: {
        // name attribut of the form
        formName: '@',
        // object with all fields described
        formInfos: '=',
        // object with all values for the form
        formData: '=',
        // object with subtypes list and label-id reference
        formRef: '=',
        // method to call on submission
        submitMethod: '&'
      },
      bindToController: true,
      controller: __formConstructorController,
      controllerAs: 'fvm'
    };
  }

  /* @ngInject */
  function __formConstructorController() {
    var vm = this;

    vm.formName = vm.formName || 'form';

    vm.isValidFormItem = isValidFormItem;
    vm.isComplexFormItem = isComplexFormItem;

    /**
     * Return true if form item configuration is correct
     * @param key
     * @returns {boolean}
     */
    function isValidFormItem(key) {
      var attrs = vm.formInfos[key];

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
      var attrs = vm.formInfos[key];

      return !!(isValidFormItem(key) && attrs.label && attrs.fields);
    }
  }
})();
