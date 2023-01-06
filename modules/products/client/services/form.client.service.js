(function () {
  'use strict';

  angular.module('products').factory('formService', formService);

  formService.$inject = ['$rootScope', '$q', '$http'];

  /* @ngInject */
  function formService($rootScope, $q, $http) {
    $rootScope.$on('$destroy', function () {
      // Aborts the $http request if it isn't finished.
      $q.defer().resolve();
    });

    return {
      getData: getData,
      getTowns: getTowns
    };

    function getData() {
      var deferred = $q.defer();

      $http
        .get('/api/product-form', { timeout: deferred.promise })
        .success(function (data) {
          deferred.resolve({
            data: data
          });
        })
        .error(function (error) {
          console.log('===================================================');
          console.log('error service', arguments);
          console.log('===================================================');
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function getTowns(val) {
      return $http
        .get('/api/towns', {
          params: {
            search: val
          }
        })
        .then(function (response) {
          return response.data.hits.hits.map(function (item) {
            return {
              // SITRA ID
              city: item._source.sitraId,
              // Name of the city
              name: item._source.name,
              // Zipcode of the city
              zipcode: item._source.zipcode,
              // INSEE ID of the city
              insee: item._source.insee,
              // Label to show
              label: item._source.zipcode + ' - ' + item._source.name
            };
          });
        });
    }
  }
})();
