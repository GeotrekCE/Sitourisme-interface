(function () {
  'use strict';

  angular
    .module('products')
    .controller('productsController', productsController);

  productsController.$inject = [
    '$rootScope',
    '$scope',
    'productService',
    '$interval',
    'gridService',
    'toaster',
    '$state',
    '$timeout'
  ];

  /* @ngInject */
  function productsController(
    $rootScope,
    $scope,
    productService,
    $interval,
    gsp,
    toaster,
    $state,
    $timeout
  ) {
    // Private variables
    // Register the registerApi function
    gsp.registerApiFnc = registerGridApi;

    // Is the user doing action on columns filters
    var seizureInProgress = false;

    // Filters interval to check user inputs in filters
    var startedInterval = null;

    var isFirstLoad = true;

    // Custom cell template for first column to show icons and handle onclick actions
    var actionsCellTemplate =
      '<div class="ui-grid-cell-contents">' +
      '<a href="#" data-ng-click="grid.appScope.onView(row)" ' +
      'tooltip-append-to-body="true" tooltip-placement="top" uib-tooltip="Voir">' +
      '<i class="glyphicon glyphicon-eye-open"></i></a>' +
      '  <a href="#" data-ng-click="grid.appScope.onEdit(row)" tooltip-append-to-body="true" ' +
      'tooltip-placement="top" uib-tooltip="Editer"><i class="glyphicon glyphicon-edit"></i></a>'; //+
    //'  <a href="#" data-ng-click=\"grid.appScope.onDuplicate(row)\" tooltip-append-to-body="true"' +
    //' tooltip-placement="top" tooltip="Dupliquer"><i class="glyphicon glyphicon-duplicate"></i></a>' +
    //'  <a href="#" data-ng-click=\"grid.appScope.onDelete(row)\" tooltip-append-to-body="true" ' +
    //'tooltip-placement="top" tooltip="Supprimer"><i class="glyphicon glyphicon-trash text-danger">' +
    //'</i></a></div>';

    // Public $scope variables
    // UIGrid options
    $scope.gridOptions = gsp.gridOptions;

    // UIGrid initializing function
    $scope.gridOptions.onRegisterApi = registerGridApi;

    // Grid visibility status
    $scope.hideGrid = true;
    // Loader visibility status
    $scope.isLoading = true;

    // Public $scope methods
    // Method to create a range (array) from an int
    $scope.intToRange = gsp.intToRange;

    // Private methods
    /**
     * function registerGridApi
     * Method to link into UIGrid through gridOptions.onRegisterApi param
     * This is the function execute to initialize the grid
     * @param gridApi
     */
    function registerGridApi(gridApi) {
      if (gridApi) {
        // Grid event - a filter has been modified
        gridApi.core.on.filterChanged($scope, onFilterChanged);

        // Grid event - pagination has been modified
        gridApi.pagination.on.paginationChanged($scope, onPaginationChanged);

        // Grid event - sort has been modified
        gridApi.core.on.sortChanged($scope, onSortChanged);

        // If no columns are defined
        if (
          gsp.gridOptions.columnDefs &&
          gsp.gridOptions.columnDefs.length == 0
        ) {
          // Create all columns
          gsp.gridOptions.columnDefs = [
            gsp.createColDef(
              60,
              'actions',
              'Actions',
              null,
              null,
              false,
              false,
              true,
              actionsCellTemplate
            ),
            gsp.createColDef(
              150,
              'statusImport',
              'Status import',
              '_source.statusImport',
              'select',
              true,
              true,
              true,
              null,
              null,
              formatImportStatusCellClass
            ),
            gsp.createColDef(
              100,
              'specialIdSitra',
              'Id apidae',
              '_source.specialIdSitra',
              'input'
            ),
            gsp.createColDef(300, 'name', 'Titre', '_source.name', 'input'),
            gsp.createColDef(200, 'type', 'Type', '_source.type', 'select'),
            gsp.createColDef(
              225,
              'subType',
              'Sous type',
              '_source.subType',
              'select'
            ),
            gsp.createColDef(
              100,
              'alert',
              'Alertes',
              '_source.alert',
              'select',
              true,
              true,
              true,
              null,
              'arrayToStr'
            ),
            gsp.createColDef(
              150,
              'territory',
              'Territoire',
              '_source.territory',
              'select',
              false,
              null,
              false
            ),
            gsp.createColDef(
              150,
              'latitude',
              'Latitude',
              '_source.localization.lat',
              'startswith',
              null,
              null,
              false
            ),
            gsp.createColDef(
              150,
              'longitude',
              'Longitude',
              '_source.localization.lon',
              'startswith',
              null,
              null,
              false
            ),
            gsp.createColDef(
              100,
              'capacity',
              'Capacité',
              '_source.capacity',
              'greater',
              null,
              null,
              false
            ),
            gsp.createColDef(
              100,
              'imagesUrl',
              'Images',
              '_source.image.url',
              'greater',
              null,
              null,
              false
            ),
            gsp.createColDef(
              80,
              'insee',
              'INSEE',
              '_source.address.insee',
              'input'
            ),
            gsp.createColDef(
              80,
              'postalCode',
              'Code Postal',
              '_source.address.zipcode',
              'input'
            ),
            gsp.createColDef(
              200,
              'city',
              'Ville',
              '_source.address.city',
              'input'
            ),
            gsp.createColDef(
              200,
              'member',
              'Membre',
              '_source.member',
              'select',
              false,
              null,
              true
            ),
            gsp.createColDef(
              100,
              'specialId',
              'specialId',
              '_source.specialId',
              'input'
            ),
            gsp.createColDef(
              200,
              'supplierId',
              'Id fournisseur',
              '_source.supplierId',
              'input'
            ),
            gsp.createColDef(
              200,
              'supplierName',
              'Nom fournisseur',
              '_source.supplierName',
              'input'
            ),
            gsp.createColDef(
              200,
              'displayForUser',
              'category_ids',
              '_source.displayForUser',
              'input'
            ),
            /*gsp.createColDef(
              150,
              'lastUpdateFromClientGreather',
              'date maj (+ grand que)',
              '_source.lastUpdateFromClient',
              'greater',
              true,
              true,
              true
            ),
            gsp.createColDef(
              150,
              'lastUpdateFromClientLower',
              'date maj (+ petit que)',
              '_source.lastUpdateFromClient',
              'lower',
              true,
              true,
              true
            ), */
            gsp.createColDef(
              200,
              'phone',
              'Téléphone',
              '_source.phone',
              'input',
              false,
              null,
              false,
              null,
              'arrayToStr'
            ),
            gsp.createColDef(
              200,
              'mail',
              'Adresse e-mail',
              '_source.email',
              'input',
              false,
              null,
              false,
              null,
              'arrayToStr'
            )
            // gsp.createColDef(250,'filename','Fichier','_source.filename','input'),
            // gsp.createColDef(150,'completion','Complétion','_source.rateCompletion','greater',true,true,true,null,"addPercentSymbol")
          ];

          gsp.gridOptions.gridMenuCustomItems.push({
            // Title of the custom item to show in the UIGrid menu
            title: 'Exporter la selection vers APIDAE',
            // Action to execute when the item is triggered
            action: function ($event) {
              var dataArr = setDataArrSelectedRows(
                this.grid.api.selection.getSelectedRows()
              );
              if (dataArr && dataArr.length > 0) {
                productService
                  .exportSelectionToSitra(dataArr)
                  .then(
                    function (resp) {
                      if (!resp.err) {
                        toaster.pop(
                          'success',
                          'Export en cours de traitement',
                          'Vous allez être redirigé vers la page de rapports'
                        );

                        $timeout(function () {
                          $state.go('logs', {
                            moduleId: resp.content.data.module,
                            reportId: resp.content.data.report
                          });
                        }, 3000);
                      } else {
                        toaster.pop('error', 'Erreur de traitement', resp.err);
                      }
                    },
                    function (err) {
                      toaster.pop('error', 'Erreur', err);
                    }
                  )
                  .catch(function (err) {
                    toaster.pop('error', 'Erreur de traitement', err);
                  });
              } else {
                toaster.pop(
                  'warning',
                  "Erreur lors de l'export",
                  'Aucune sélection effectuée'
                );
              }
            },
            // Position of the item in the menu
            order: 202
          });

          gsp.gridOptions.gridMenuCustomItems.push({
            // Title of the custom item to show in the UIGrid menu
            title: 'Exporter la recherche vers APIDAE',
            // Action to execute when the item is triggered
            action: function ($event) {
              if (
                window.confirm(
                  'Etes vous sûr de vouloir exporter les ' +
                    gsp.gridOptions.totalItems +
                    ' résultats de la recherche ?'
                )
              ) {
                var filters = gsp.getGridFilters();

                if (filters && filters.length > 0) {
                  productService.exportSearchToSitra(filters).then(
                    function (resp) {
                      if (resp.content && !resp.content.err) {
                        toaster.pop(
                          'success',
                          'Export en cours de traitement',
                          'Vous allez être redirigé vers la page de rapports'
                        );

                        $timeout(function () {
                          $state.go('logs', {
                            moduleId: resp.content.data.module,
                            reportId: resp.content.data.report
                          });
                        }, 3000);
                      } else {
                        toaster.pop(
                          'error',
                          'Erreur de traitement',
                          resp.content.err
                        );
                      }
                    },
                    function (err) {
                      toaster.pop('error', 'Erreur', err);
                    }
                  );
                } else {
                  toaster.pop(
                    'warning',
                    "Erreur lors de l'export",
                    'Aucune recherche effectuée'
                  );
                }
              } else {
                toaster.pop('warning', 'Export APIDAE annulé');
              }
            },
            // Position of the item in the menu
            order: 203
          });

          /*gsp.gridOptions.gridMenuCustomItems.push({
						// Title of the custom item to show in the UIGrid menu
						title: 'Supprimer la sélection chez APIDAE',
						// Action to execute when the item is triggered
						action: function ($event) {
								var dataArr = setDataArrSelectedRows(this.grid.api.selection.getSelectedRows());

								if(dataArr && dataArr.length > 0) {
									productService
										.getById(dataArr[0].id).then(result => productService.removeFromSitra(result))
										.then(function(resp) {
											if(!resp.err) {
												toaster.pop('success', "Suppression en cours de traitement", "Vous allez être redirigé vers la page de rapports");
	
												$timeout( function() {
													$state.go('logs', {'moduleId': resp.content.data.module, 'reportId': resp.content.data.report});
												}, 3000);
											} else {
												toaster.pop('error', "Erreur de traitement", data.err);
											}
										}, function(err) {
											toaster.pop('error', "Erreur", err);
										})
										.catch(function(err) {
											toaster.pop('error', "Erreur de traitement", err);
										});
								} else {
									toaster.pop('warning', "Erreur lors de la suppression", "Aucune sélection effectuée");
								}

						},
						// Position of the item in the menu
						order: 203
					});*/

          // Set gridApi
          gsp.gridApi = gridApi;

          $scope.pagination = gsp.gridApi.pagination;
        }

        // Update the grid automatically when the grid api is ready
        updateGrid();
      }
    }

    /**
     * function onFilterChanged
     * Method to handle the UIGrid onFilterChanged event
     */
    function onFilterChanged() {
      // Does user doing some action on SelectBox or Inputs filters ?
      seizureInProgress = true;

      // Wait for user input
      waitForInput();
    }

    /**
     * function onPaginationChanged
     * Method to handle the UIGrid onPaginationChanged event
     * @param newPage
     * @param pageSize
     */
    function onPaginationChanged(newPage, pageSize) {
      // Set the new pagination parameters into the grid service
      gsp.pagination = {
        // Result index to start from
        from: (newPage - 1) * pageSize,
        // Number of results to get from 'from' index
        size: pageSize
      };

      // Update grid
      updateGrid();
    }

    /**
     * function onSortChanged
     * Method to handle the UIGrid onSortChanged event
     * @param grid
     * @param sortsColumns
     */
    function onSortChanged(grid, sortsColumns) {
      // Set the new sorts parameters into the grid service
      gsp.sorts = gsp.sortGrid(sortsColumns);

      // Update grid
      updateGrid();
    }

    /**
     * function updateGrid
     * Method to update the grid with new results
     * @param config
     */
    function updateGrid(config) {
      // Show loader
      toggleLoader(true);

      // Show nav tabs
      if (isFirstLoad) {
        $rootScope.$emit('toggleTabsVisibility', true);
        isFirstLoad = false;
      }

      // Call the product service
      productService
        // Request results from service
        .getList(config)
        // Handle response
        .then(
          function (response) {
            // Get response content
            var responseContent = response.content;

            // Set the grid filters into the grid service
            gsp.setGridFilters(responseContent.filters);

            // Set received data into the grid
            gsp.gridOptions.data = responseContent.data;

            // Refresh whole grid
            gsp.refreshGrid();

            // Set the total results
            gsp.setGridTotalItems(responseContent.totalResults);

            // Delay grid rendering
            $timeout(function () {
              // Hide the loader
              toggleLoader(false);
            }, 300);
          },
          function (error) {
            toaster.pop('error', 'Une erreur est survenue', error);
          }
        );
    }

    /**
     * function waitForInput
     * Recursive method to handle user's input seizure
     */
    function waitForInput() {
      // If the user has seize some characters into any input's filter
      if (seizureInProgress) {
        // Reinitialize
        seizureInProgress = false;

        // If there isn't already a started $interval
        if (!startedInterval) {
          // Create a new interval
          startedInterval = $interval(waitForInput, 800);
        }
      }
      // Otherwise, assuming the user has ended seizure
      else {
        // Cancel the $interval function
        $interval.cancel(startedInterval);
        // Reinitialize the value of stored interval
        startedInterval = null;

        // Update grid
        updateGrid();
      }
    }

    /**
     * function toggleLoader
     * Method to define loader visibility status
     */
    function toggleLoader(isVisible) {
      // Define loader status
      $scope.isLoading = isVisible;
    }

    /**
     * function setDataArrSelectedRows
     * return a string of selected rows id's
     * @param selectedRowsArr
     * @returns {Array}
     */
    function setDataArrSelectedRows(selectedRowsArr) {
      var dataArr = [];

      angular.forEach(selectedRowsArr, function (obj, index) {
        dataArr.push({
          id: obj._id,
          type: {
            importType: obj._source.importType,
            importSubType: obj._source.importSubType
          }
        });
      });

      return dataArr;
    }

    /**
     * function formatImportStatusCellClass
     * UIGrid cellClass formatter
     * @param grid
     * @param row
     * @param col
     * @param rowRenderIndex
     * @param colRenderIndex
     * @returns {*}
     */
    function formatImportStatusCellClass(
      grid,
      row,
      col,
      rowRenderIndex,
      colRenderIndex
    ) {
      switch (grid.getCellValue(row, col).toLowerCase()) {
        case '0':
        case 0:
        case 'non importable':
          return 'text-danger';
        case '1':
        case 1:
        case 'importable':
          return 'text-info';
        case '2':
        case 2:
        case 'importé':
          return 'text-success';
        default:
          return 'text-warning';
      }
    }
  }
})();
