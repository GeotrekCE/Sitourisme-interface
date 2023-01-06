(function () {
  'use strict';

  angular
    .module('products')
    .controller('productsDetailsController', productsDetailsController);

  productsDetailsController.$inject = [
    'resolvedTabName',
    'detailsInfos',
    'formInfos',
    'productService',
    '$timeout',
    '$state',
    'toaster',
    '$rootScope'
  ];

  /* @ngInject */
  function productsDetailsController(
    resolvedTabName,
    detailsInfos,
    formInfos,
    productService,
    $timeout,
    $state,
    toaster,
    $rootScope
  ) {
    // Private variables
    var vm = this,
      fieldsToInit = ['address', 'addressReservation'],
      i = 0,
      curIter = null,
      defVal = '';

    // Public variables
    vm.resolvedTabName = resolvedTabName.content.data.name;
    vm.refTools = detailsInfos.content.sitraReference;
    vm.product = detailsInfos.content.data;
    vm.formInfos = formInfos ? formInfos.data : null;

    vm.statusImportLevel = detailsInfos.content.data.statusImport;

    // Public methods
    vm.update = __update;

    $rootScope.$emit('toggleTabsVisibility', true);

    // Check for fields to initialise
    if (fieldsToInit && fieldsToInit.length > 0) {
      // Initialise product fields
      for (i; i < fieldsToInit.length; i++) {
        curIter = vm.product[fieldsToInit[i]];

        // Handle current state
        switch ($state.current.name) {
          case 'products.list.edit':
            var curIterRefCity = null,
              curIterRefZipCode = null;

            if (curIter) {
              curIterRefCity = vm.refTools['town'][curIter.city];
              curIterRefZipCode = curIter.zipcode;

              curIter.location = {
                city: curIter.city || defVal,
                zipcode: curIterRefZipCode || defVal,
                insee: curIter.insee || vm.product.address.insee || defVal,
                name: curIter.city ? curIterRefCity : defVal,
                label: defVal
              };

              if (curIterRefCity && curIterRefZipCode) {
                curIter.location = curIter.location || {};
                curIter.location.label =
                  curIterRefZipCode + ' - ' + curIterRefCity;
              }
            }
            break;
          default:
            curIter = curIter || {};
            curIter.location = defVal;

            if (curIter.zipcode && curIter.city) {
              curIter.location =
                curIter.zipcode + ' - ' + vm.refTools['town'][curIter.city];
            }
            break;
        }
      }
    }

    function __update() {
      if (vm.product) {
        vm.product.subType = vm.product.subType
          ? parseInt(vm.product.subType.id, 10)
          : vm.product.subType; // this is the format waited by the id
        vm.product.ranking = vm.product.ranking
          ? parseInt(vm.product.ranking.id, 10)
          : vm.product.ranking;
        vm.product.statusImport = vm.product.statusImport
          ? parseInt(vm.product.statusImport.id, 10)
          : 0;

        var j = 0,
          k = 0,
          curParent = null,
          curIter = null,
          curChild = null,
          childVal = '',
          fieldsToSet = {
            parents: ['address', 'addressReservation'],
            children: [
              { field: 'zipcode', doParse: false },
              { field: 'city', doParse: false },
              { field: 'insee', doParse: false },
              { field: 'name', doParse: false }
            ]
          };

        for (j; j < fieldsToSet.parents.length; j++) {
          curParent = fieldsToSet.parents[j];
          curIter = vm.product[curParent];

          for (k; k < fieldsToSet.children.length; k++) {
            curChild = fieldsToSet.children[k].field;

            if (curIter && curIter.location) {
              if (fieldsToSet.children[k].doParse === true) {
                childVal = parseInt(curIter.location[curChild]);
              } else {
                childVal = curIter.location[curChild];
              }
            }

            vm.product[curParent][curChild] = childVal;
          }
        }

        if (vm.product.contact && vm.product.contact.length) {
          angular.forEach(vm.product.contact, function (item, key) {
            if (item.civility) {
              vm.product.contact[key].civility = parseInt(item.civility.id, 10);
            }
            if (item.primaryFunction && item.primaryFunction.id) {
              vm.product.contact[key].primaryFunction = parseInt(
                item.primaryFunction.id,
                10
              );
            }
          });
        }

        // Remove temporary fields
        if (vm.product.address) {
          delete vm.product.address.location;
        }
        if (vm.product.addressReservation) {
          delete vm.product.addressReservation.location;
        }

        productService.updateProduct(vm.product).then(
          function (response) {
            if (vm.product._id) {
              $timeout(
                $state.go('products.list.view', { viewId: vm.product._id }),
                300
              );
            }
          },
          function (error) {
            toaster.pop('error', 'Une erreur est survenue', error);
            console.log('===================================================');
            console.log('error', error);
            console.log('===================================================');
          }
        );
      }
    }
  }
})();
