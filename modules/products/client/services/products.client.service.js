(function () {
  'use strict';

  angular.module('products').factory('productService', productService);

  productService.$inject = [
    '$rootScope',
    '$q',
    '$http',
    'gridService',
    'Authentication'
  ];

  /* @ngInject */
  function productService(
    $rootScope,
    $q,
    $http,
    gridServiceProvider,
    Authentication
  ) {
    var _apiUrl = '/api/products',
      hasAdminRole = function () {
        return Authentication.user.roles.indexOf('admin') !== -1;
      };

    $rootScope.$on('$destroy', function () {
      // Aborts the $http request if it isn't finished.
      $q.defer().resolve();
    });

    return {
      getList: __getList,
      getById: __getById,
      updateProduct: __updateProduct,
      getProductNameById: __getProductNameById,
      exportSelectionToSitra: __exportSelectionToSitra,
      exportSearchToSitra: __exportSearchToSitra
      // removeFromSitra: __removeFromSitra
    };

    /**
     * function getById
     * @param pId
     * @returns {Promise|*}
     */
    function __getById(pId) {
      return __requestor('get', { url: '/' + pId });
    }

    /**
     * function getList
     * @param pParams
     * @returns {Promise|*}
     */
    function __getList() {
      var config = {
        pagination: gridServiceProvider.pagination,
        sorts: gridServiceProvider.sorts,
        filters: gridServiceProvider.getGridFilters()
        // @TODO do a refactoring of filters's getter/setter
        // @TODO to include 'return gridServiceProvider.getGridFilters()'
        // @TODO in the getter
      };

      return __requestor('get', { params: config });
    }

    function __updateProduct(pProduct) {
      if (pProduct) {
        return __requestor('put', {
          url: '/' + pProduct._id,
          data: { product: pProduct }
        });
      }
    }

    function __getProductNameById(pProductId) {
      return __getById(pProductId);
    }

    /**
     * Call to proxy to launch export order of products selected
     * @param dataArr (array of Products)
     * @returns {Promise|*}
     * @private
     */
    function __exportSelectionToSitra(dataArr) {
      return __requestor('post', {
        url: '/export-sitra',
        data: {
          items: dataArr
        }
      });
    }

    /**
     * Call to proxy to launch export order of products found by search filters
     * @param searchFilters
     * @returns {Promise|*}
     * @private
     */
    function __exportSearchToSitra(searchFilters) {
      return __requestor('get', {
        url: '/export-sitra-search',
        params: {
          search: searchFilters
        }
      });
    }

    /**
     * Call to proxy to remove order of products found by search filters
     * @param item
     * @returns {Promise|*}
     * @private
     */
    /* function __removeFromSitra(item) {
			return __requestor('post', {
				'url': '/remove-items-sitra',
				'data': {
					'items': [item.content.data]
				}
			});
		} */

    /**
     * function __requestor
     * @param pMethod
     * @param pOptions
     * @returns {*|Promise}
     * @private
     */
    function __requestor(pMethod, pOptions) {
      var config = {
        method: pMethod ? pMethod.toLowerCase() : 'get',
        url: pOptions && pOptions.url ? _apiUrl + pOptions.url : _apiUrl,
        data: pOptions && pOptions.data ? pOptions.data : {},
        params: pOptions && pOptions.params ? pOptions.params : {}
      };

      var request = $http(config);

      return request.then(__handleSuccess, __handleError);
    }

    /**
     * function __handleError
     * @param response
     * @returns {Promise}
     * @private
     */
    function __handleError(response) {
      var rejectedResponse;

      if (!angular.isObject(response.data) || !response.data._status) {
        rejectedResponse = 'An unknown error has occurred !';
      } else if (hasAdminRole) {
        rejectedResponse = response.data._status;
      } else {
        rejectedResponse =
          response.data._status.errors.message ||
          'An unknown error has occurred !';
      }

      return $q.reject(rejectedResponse);
    }

    /**
     * function __handleSuccess
     * @param response
     * @returns {*}
     * @private
     */
    function __handleSuccess(response) {
      /** WIP */
      var resStatus = response.status;
      var resText = response.statusText;
      var resData = response.data;

      var objToReturn = {
        status: resStatus,
        statusText: resText,
        content: {}
      };

      // If there is some data to process
      if (resData != null) {
        // resData :
        //   export sitra    => [ { data, err, errMessage, name, specialIdSitra } ]
        //   mutiple results => { took, timed_out, shars, hits, aggregations }
        //   single result   => { data, sitraReference }

        // Multiple results
        if (resData.hits) {
          // Set the results from the response into the object to return
          objToReturn.content.data = resData.hits.hits || [];
          // Set the filters from the response into the object to return
          objToReturn.content.filters = resData.aggregations;
          // Set the total results number from the response into the object to return
          objToReturn.content.totalResults = resData.hits.total;
        } else {
          // Single result
          if (resData.data && resData.sitraReference) {
            // Set the single result from the response to the object to return
            objToReturn.content.data = resData.data;
            // Set the total result number from the response to the object to return
            objToReturn.content.totalResults = 1;
            // Set the sitra's references from the response to the object to return
            objToReturn.content.sitraReference = resData.sitraReference;
          }
          // Otherwise
          else {
            // Set the whole object from response
            objToReturn.content = resData;
          }
        }
      }

      return objToReturn;
    }
  }
})();
