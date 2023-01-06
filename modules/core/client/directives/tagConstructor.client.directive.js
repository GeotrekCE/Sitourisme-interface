(function () {
  'use strict';

  angular.module('core').directive('tagConstructor', tagConstructor);

  tagConstructor.$inject = ['$compile', '$timeout', 'formService'];

  /* @ngInject */
  function tagConstructor($compile, $timeout, formService) {
    return {
      restrict: 'EA',
      templateUrl: 'modules/core/views/tagConstructor.client.view.html',
      scope: {
        // attributs of form item
        formAttrs: '=',
        // values for the form item
        data: '=',
        // // object with id, town and subtypes ref table
        formRef: '=',
        // index for form item
        index: '@'
      },
      bindToController: true,
      controller: __tagConstructorController,
      controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
        // Complex form item
        if (scope.ctrl.formAttrs.fields) {
          scope.ctrl.isComplexFormItem = true;

          var tagConstructor = '';

          if (
            scope.ctrl.formAttrs.array &&
            scope.ctrl.data &&
            scope.ctrl.data.length
          ) {
            angular.forEach(
              scope.ctrl.data,
              function (value, idx) {
                tagConstructor += __buildHtmlTagConstructor(idx);
              },
              0
            );
          } else if (!scope.ctrl.formAttrs.array) {
            tagConstructor = __buildHtmlTagConstructor();
          }

          $timeout(function () {
            $compile(tagConstructor)(scope, function (cloned, scope) {
              element.find('fieldset').find('div').append(cloned);
            });
          });
        }
      }
    };
  }

  function __buildHtmlTagConstructor(complexIdx) {
    return (
      '<tag-constructor data-ng-repeat="(key, attr) in ctrl.formAttrs.fields" form-attrs="attr"' +
      ' form-ref="ctrl.formRef" data="ctrl.data' +
      (complexIdx !== undefined ? '[' + complexIdx + ']' : '') +
      '[key]" index="{{$index}}"></tag-constructor>'
    );
  }

  __tagConstructorController.$inject = ['customToolsService', 'formService'];

  /* @ngInject */
  function __tagConstructorController(cTools, formService) {
    var vm = this;

    vm.editable = vm.formAttrs.editable || false;
    vm.tag = vm.formAttrs.tag || null;
    vm.type = vm.formAttrs.type || null;
    vm.label = vm.formAttrs.label || null;
    vm.class = vm.formAttrs.class || '';
    vm.hidden = vm.formAttrs.hidden || false;
    vm.isArray = vm.formAttrs.array || false;
    vm.isComplexFormItem = vm.isComplexFormItem || false;
    vm.index = vm.index || '';
    vm.data = vm.data || null;
    vm.options = vm.formAttrs.options || null;
    vm.virtualData = []; // used for checkboxes
    vm.ref = vm.formAttrs.tableRef || null;

    vm.isEmpty = cTools.isRecursivelyEmpty;

    //vm.getTown = formService.getTown;
    vm.getTown = function (val) {
      return formService.getTowns(val);
    };

    if (vm.ref) {
      __dataFormat(vm.ref);
    }

    /**
     * check if the displayed data need to be changed
     * available for checkboxes, select tag (set options)
     * and id reference in order to display a label
     * @param ref (is coming from the config form file)
     * @private
     */
    function __dataFormat(ref) {
      if (vm.isArray && vm.tag !== 'checkbox') {
        angular.forEach(vm.data, function (value, key) {
          vm.data[key] = vm.formRef[ref][value];
        });
      } else if (
        vm.isArray &&
        vm.tag === 'checkbox' &&
        vm.data &&
        vm.data.length
      ) {
        angular.forEach(vm.data, function (value, key) {
          vm.virtualData[key] = {
            label: vm.formRef[ref][value],
            val: vm.data[key]
          };
        });
      } else if (vm.tag === 'select') {
        // set select options
        if (!vm.options) {
          var options = [];
          angular.forEach(vm.formRef[ref], function (value, key) {
            options.push({ id: key, name: value });
            if (vm.data == key) {
              // need to change data format 'id' to object according to options format
              vm.data = { id: key, name: value };
            }
          });
          vm.options = options;
        }
      } else {
        vm.data = vm.formRef[ref][vm.data];
      }
    }
  }
})();
