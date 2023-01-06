(function () {
  'use strict';

  angular.module('products').provider('gridService', GridServiceProvider);

  GridServiceProvider.$inject = [
    'customToolsServiceProvider',
    'uiGridConstants',
    'uiGridExporterConstants',
    '$injector'
  ];

  /* @ngInject */
  function GridServiceProvider(
    cTools,
    uiGridConstants,
    uiGridExporterConstants,
    $injector
  ) {
    // Private variables

    // Default pagination page sizes value
    var _defaultPaginationPageSizes = [25, 50, 100, 250, 500];

    // Default grid pagination
    var _defaultPagination = {
      // Result to start from
      from: 0,
      // Number of results to find
      size: _defaultPaginationPageSizes[0]
    };

    /** ---------------------------------------- **/
    /**               BE ADVISED !!              **/
    /** ---------------------------------------- **/
    /**       property paginationPageSizes       **/
    /**  HAVE TO be created BEFORE others props  **/
    /**      that may try to access this prop    **/
    /** ---------------------------------------- **/

    // Allowed number of results per page
    cTools.generateProperty(
      this,
      'paginationPageSizes',
      _defaultPaginationPageSizes
    );

    /** ---------------------------------------- **/
    /**               BE ADVISED !!              **/
    /** ---------------------------------------- **/
    /**       property gridApi       **/
    /**  HAVE TO be created BEFORE others props  **/
    /**      that may try to access this prop    **/
    /** ---------------------------------------- **/

    cTools.generateProperty(this, 'gridApi', {});

    // Custom grid menu items to show in the grid menu
    var _customGridMenuItems = [
      {
        // Title of the custom item to show in the UIGrid menu
        title: 'Exporter la sélection au format csv',
        // Action to execute when the item is triggered
        action: function ($event) {
          // @TODO implement a method to inform the user if no data are selected
          this.grid.api.exporter.csvExport(
            uiGridExporterConstants.SELECTED,
            uiGridExporterConstants.VISIBLE
          );
        },
        // Position of the item in the menu
        order: 202
      }
    ];

    // Default gridHandler functions
    var _defaultGridHandler = {
      // On click event
      onClick: function (row) {},
      // On view event
      onView: function (row) {
        __goToTab(row);
      },
      // On edit event
      onEdit: function (row) {
        __goToTab(row, 'edit');
      },
      // On duplicate event
      onDuplicate: function (row) {},
      // On delete event
      onDelete: function (row) {},
      // On double click event
      onDblClick: function (row) {
        __goToTab(row);
      }
    };

    // Default row template for grid options
    var _defaultRowTemplate =
      '<div' +
      ' data-ng-dblclick="grid.appScope.onDblClick(row)" ' +
      'data-ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
      ' class="ui-grid-cell" data-ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell >' +
      '</div>';

    // Default grid options
    var _defaultGridOptions = {
      /** VIRTUALIZATION **/
      // Number of rows to virtualize when virtualization is activated
      virtualizationThreshold: 100,
      // Number of columns to virtualize when virtualization is activated
      columnVirtualizationThreshold: 20,
      // Enable columns virtualization above n columns
      excessColumns: 8,
      // Enable rows virtualization above n rows
      excessRows: 16,

      /** PAGINATION **/
      // Enable server side pagination
      useExternalPagination: true,
      // Enable client side pagination controls
      enablePaginationControls: false,
      // List of allowed 'items per page' options
      paginationPageSizes: this.paginationPageSizes,
      // Number of page per size
      paginationPageSize: this.paginationPageSizes[0],

      /** SORTING **/
      // Enable server side sorting
      useExternalSorting: true,

      /** FILTERING **/
      // Enable columns filtering
      enableFiltering: true,
      // use server side filtering
      useExternalFiltering: true,

      /** PINNING **/
      // Enable cells pinning
      enablePinning: true,

      /** RESIZING **/
      // Enable column's resizing
      enableColumnResizing: true,

      /** SELECTION **/
      // Enable the selection of a row
      enableRowSelection: true,
      // Enable selection by checkbox
      enableRowHeaderSelection: true,
      // Allow selection of multiple rows
      multiSelect: true,
      // Need at least ONE row selected
      noUnselect: false,

      /** TEMPLATES **/
      // Row template override
      rowTemplate: _defaultRowTemplate,

      /** DATA EXPORTER */
      // Enable csv exportation of grid data
      exporterMenuCsv: false,
      // Enable pdf exportation of grid data
      exporterMenuPdf: false,

      /** MISC **/
      // Allow grid menu
      enableGridMenu: true,
      // Show horizontal scrollbar
      enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
      // Define columns params
      columnDefs: [],
      // Custom function accessible inside ui-grid directives
      appScopeProvider: _defaultGridHandler,
      // Custom grid Menu functions
      gridMenuCustomItems: _customGridMenuItems,
      // Define grid language translation
      i18n: 'fr'
    };

    // Array of properties to create dynamically
    var propsToCreate = [
      {
        name: 'gridOptions',
        value: _defaultGridOptions
      },
      {
        name: 'registeredApi',
        value: {}
      },
      {
        name: 'pagination',
        value: _defaultPagination
      },
      {
        name: 'sorts',
        value: ''
      },
      {
        name: 'filters',
        value: null
      }
    ];

    // Generate given properties into the current provider
    cTools.generateProperties(this, propsToCreate);

    // Constructor
    this.$get = function (
      customToolsService,
      uiGridConstants,
      uiGridExporterConstants,
      $injector
    ) {
      // Return a new instance (singleton) of this class
      return new GridServiceProvider(
        customToolsService,
        uiGridConstants,
        uiGridExporterConstants,
        $injector
      );
    };

    // Public methods
    this.setGridTotalItems = __setGridTotalItems;
    this.refreshGrid = __refreshGrid;
    this.intToRange = __intToRange;
    this.sortGrid = __getGridSorts;
    this.getGridFilters = __getGridFilters;
    this.setGridFilters = __setGridFilters;
    this.createColDef = __createColDef;

    // Private methods
    /**
     * function __goToTab
     * Method to handle tab navigation event
     * @param row
     * @private
     */
    function __goToTab(row, action) {
      // Check param
      if (row) {
        // Get the angular root scope through the $injector service
        var rootScope = $injector.get('$rootScope');

        // If the root scope has been successfully retrieved
        if (rootScope) {
          // Emit an event
          rootScope.$emit(
            'goToTab',
            row.entity._id,
            row.entity._source.name || row.entity._id,
            action
          );
        }
      }
    }

    /**
     * function __setGridTotalItems
     * Method that set the total number of results of the grid
     * @param total
     * @private
     */
    function __setGridTotalItems(total) {
      // Check given param
      if (cTools.checkUndefinedParamByType(total, 'number')) {
        // Set the total item into the gridApi
        this.gridApi.grid.options.totalItems = total;
      }
    }

    /**
     * function __refreshGrid
     * Notify a refresh event to the grid
     * @param refreshedConstants
     * @private
     */
    function __refreshGrid(refreshedConstants) {
      // Get the gridApi Core
      var gridCore = this.gridApi.core;

      // Refresh the grid or notify changes if there is gridConstants parameter
      refreshedConstants
        ? gridCore.notifyDataChange(refreshedConstants)
        : gridCore.refresh();
    }

    /**
     * function __getGridSorts
     * Return current grid sorts
     * @param sortCols
     * @param iterator
     * @param sortVal
     * @returns {*}
     * @private
     */
    function __getGridSorts(sortCols, iterator, sortVal) {
      // Check if there is some columns to sort into the grid
      if (sortCols && sortCols[0]) {
        // Set the iterator
        iterator = iterator || 0;

        // Current iterated column
        var curIter = sortCols[iterator],
          // Current iterated column sort value
          sortMode = curIter.sort.direction; // asc, desc or 0 (0===reset to default)

        // If there is a current valid column and sort mode is not 0
        if (curIter && sortMode !== 0) {
          // Set the sort param
          sortVal = curIter.name + '|' + sortMode + (sortVal || '');
        }

        // Increment the iterator
        iterator++;

        // Restart the function or return the result if there isn't any iteration left
        return sortCols[iterator]
          ? __getGridSorts(sortCols, iterator, ';' + sortVal)
          : sortVal;
      }
      // Otherwise, if there is no columns to iterate over
      else {
        // Return an empty result
        return sortCols || '';
      }
    }

    /**
     * function __getGridFilters
     * Return current grid filters
     * @param filtersCols
     * @param iterator
     * @param filtersVal
     * @returns {*}
     * @private
     */
    function __getGridFilters(filtersCols, iterator, filtersVal) {
      // Define the filters columns to iterate over
      filtersCols = filtersCols || this.gridApi.grid.columns;

      // Check if there is something to iterate over
      if (filtersCols && filtersCols[0]) {
        // Set the iterator
        iterator = iterator || 0;

        // Current iterated column
        var curIter = filtersCols[iterator];

        // Check params of current iteration
        if (curIter && curIter.name && curIter.filter && curIter.filter.term) {
          // If filters value is empty, add an '&' at the beginning of itself
          filtersVal = filtersVal ? filtersVal + '&' : '';
          // Add the current filter to the filters value
          filtersVal += curIter.name + '=' + encodeURI(curIter.filter.term);
        }

        // Increment the iterator
        iterator++;

        // Restart function or return result if there isn't any iteration left
        return filtersCols[iterator]
          ? __getGridFilters(filtersCols, iterator, filtersVal)
          : filtersVal;
      }
      // Otherwise, if there is nothing to iterate over
      else {
        // Return an empty result
        return '';
      }
    }

    /**
     * function __setGridFilters
     * Method to set grid filters according to given param
     * @param pFilters
     * @private
     */
    function __setGridFilters(pFilters) {
      // Check if param
      if (pFilters) {
        // Retrieve the grid columns
        var cols = this.gridOptions.columnDefs,
          // Initialize for'in loop current iteration
          curIter,
          // Initialize for'in loop current iteration name
          curIterName;

        // Loop through grid columns
        for (var col in cols) {
          // Set the current iterated column
          curIter = cols[col];

          // Set the current iterated column name
          curIterName = curIter.name;

          // Check if there is a current iteration and a 'filter' field
          if (curIter && curIter.filter) {
            // Check if filters has a property named like current iteration
            if (pFilters.hasOwnProperty(curIterName)) {
              // Remap the filter values into the current filter
              curIter.filter.selectOptions = pFilters[curIterName].buckets.map(
                function (obj) {
                  return {
                    value: obj.key,
                    label: obj.key + ' (' + obj.doc_count + ')'
                  };
                }
              );
            }
          }
        }
      }
    }

    /**
     * function __createColDef
     * Return a new column definition object according to given params
     * @param width
     * @param name
     * @param displayName
     * @param field
     * @param filter
     * @param sorting
     * @param filtering
     * @param visible
     * @param cellTemplate
     * @returns {{}}
     * @private
     */
    function __createColDef(
      width,
      name,
      displayName,
      field,
      filter,
      sorting,
      filtering,
      visible,
      cellTemplate,
      cellFilter,
      cellClass
    ) {
      // Create a new object to hold new column informations
      var col = {};

      // Create width property
      col.width = width ? width : 100;
      // Create name property
      col.name = name ? name : 'nouvelle colonne';
      // Create display name property
      col.displayName = displayName ? displayName : 'nouvelle colonne';

      // Create cell template property if needed
      if (cellTemplate) col.cellTemplate = cellTemplate;
      // Create field property if needed
      if (field){
        col.field = field;
      } 
      // Create filter property if needed
      if (filter) {
        col.filter = __getFilter(filter);
      }
      // Create filtering property if needed
      if (cTools.checkUndefinedParamByType(filtering, 'boolean')) {
        col.enableFiltering = filtering;
      }
      // Create sorting property if needed
      if (cTools.checkUndefinedParamByType(sorting, 'boolean')) {
        col.enableSorting = sorting;
      }
      // Create visible property if needed
      if (cTools.checkUndefinedParamByType(visible, 'boolean')) {
        col.visible = visible;
      }
      // Create cell filter
      if (cellFilter) {
        col.cellFilter = cellFilter;
      }
      // Create cell class
      if (cellClass) {
        col.cellClass = cellClass;
      }

      // Return the created column object
      return col;
    }

    /**
     * function __getFilter
     * Return a UIGrid filter according to the given param
     * @param filterName
     * @returns {{condition: string, placeholder: string}}
     * @private
     */
    function __getFilter(filterName) {
      // Redefine given param
      filterName =
        filterName != null && typeof filterName == 'string'
          ? filterName
          : 'default';

      // Define default place holder
      var _placeHolder = 'Rechercher',
        // Define default filter
        _defaultFilter = {
          // Default filter type
          condition: uiGridConstants.filter.INPUT,
          // Default filter placeholder
          placeholder: _placeHolder
        };

      // Handle filter name
      switch (filterName.toLowerCase()) {
        case 'startswith':
          _defaultFilter.condition = uiGridConstants.filter.STARTS_WITH;
          break;
        case 'greater':
          _defaultFilter.condition =
            uiGridConstants.filter.GREATER_THAN_OR_EQUAL;
          break;
        case 'lower':
            _defaultFilter.condition =
              uiGridConstants.filter.LOWER_THAN_OR_EQUAL;
            break;
        case 'select':
          // SELECT filter structure is different from others filters
          // Redefine default filter value
          _defaultFilter = {
            type: uiGridConstants.filter.SELECT,
            // Array of options to add into the select's html tag
            selectOptions: []
          };
          break;
      }

      // Return the filter
      return _defaultFilter;
    }
  }

  /**
   * function __intToRange
   * Method to create an array with length matching given param
   * @param maxInt
   * @returns {Array}
   * @private
   */
  function __intToRange(maxInt) {
    // If the param is valid
    if (cTools.checkUndefinedParamByType(maxInt, 'number')) {
      // Return a new array with length equal to given int param
      return new Array(maxInt);
    }
  }

  /**
   * function getSelectedRows
   * return the selected rows from the UI Grid component
   **/
  function __getSelectedRows(singleSelection) {
    // Get all selected rows from the grid
    var selection = this.gridApi.selection.getSelectedRows();

    // If param is valid
    if (singleSelection && singleSelection === true) {
      // Return only the first selectedRow
      selection = selection[0];
    }

    // Return the selection
    return selection;
  }
})();
