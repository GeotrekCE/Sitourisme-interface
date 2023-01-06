(function () {
  'use strict';

  angular.module('core').directive('fieldConstructor', fieldConstructor);

  fieldConstructor.$inject = ['$compile', '$timeout'];

  /* @ngInject */
  function fieldConstructor($compile, $timeout) {
    return {
      restrict: 'EA',
      templateUrl: 'modules/core/views/fieldConstructor.client.view.html',
      scope: {
        // attributs of form item
        attrs: '=',
        // values for the form item
        data: '=',
        // index for form item
        index: '@',
        // object with id, town and subtypes ref table
        tablesRef: '='
      },
      bindToController: true,
      controller: __fieldConstructorController,
      controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
        // Complex form item
        if (scope.ctrl.attrs.fields) {
          var content = '';
          scope.ctrl.isComplexFormItem = true;

          if (
            scope.ctrl.attrs.array &&
            scope.ctrl.data &&
            scope.ctrl.data.length
          ) {
            angular.forEach(scope.ctrl.data, function (value, idx) {
              content +=
                '<field-constructor data-ng-repeat="(key, attr) in ctrl.attrs.fields"  ' +
                'attrs="attr" ' +
                'data="ctrl.data[' +
                idx +
                '][key]" ' +
                'tables-ref="ctrl.tablesRef" ' +
                'index="{{$index}}"></field-constructor>';
            });
          } else {
            content =
              '<field-constructor data-ng-repeat="(key, attr) in ctrl.attrs.fields" ' +
              'attrs="attr" ' +
              'data="ctrl.data[key]" ' +
              'tables-ref="ctrl.tablesRef" ' +
              'index="{{$index}}"></field-constructor>';
          }

          if (content.length > 0) {
            $timeout(function () {
              $compile(content)(scope, function (cloned, scope) {
                element.find('section').append(cloned);
              });
            }, 0);
          }
        }
      }
    };
  }

  __fieldConstructorController.$inject = ['customToolsService'];

  /* @ngInject */
  function __fieldConstructorController(cTools) {
    var vm = this;

    vm.tag = vm.attrs.tag || null;
    vm.type = vm.attrs.type || null;
    vm.label = vm.attrs.label || null;
    vm.class = vm.attrs.class || '';
    vm.hidden = vm.attrs.hidden || false;
    vm.isComplexFormItem = vm.isComplexFormItem || false;
    vm.isArray = vm.attrs.array || false;
    vm.index = vm.index || '';
    vm.tableRef = vm.attrs.tableRef || null;

    vm.isEmpty = cTools.isRecursivelyEmpty;
    vm.isImageUrl = cTools.isImageUrl;

    if (vm.tableRef) {
      __dataFormat(vm.tableRef);
    }

    function __dataFormat(ref) {
      var tableRef = vm.tablesRef[ref];

      if (vm.isArray) {
        angular.forEach(vm.data, function (value, key) {
          vm.data[key] = tableRef[value];
        });
      } else {
        vm.data = vm.tablesRef[ref][vm.data];
      }
    }
  }
})();
