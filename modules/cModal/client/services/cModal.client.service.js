(function () {
  'use strict';

  angular.module('cModal').factory('customModalFactory', CustomModalFactory);

  CustomModalFactory.$inject = ['$uibModal'];

  /* @ngInject */
  function CustomModalFactory($uibModal) {
    var _defaultCfg = {
      templateUrl: 'cModal.client.template.html',
      modalController: 'cModalInstanceController',
      modalControllerAlias: 'vm'
    };

    /**
     * function __dynamicResolver
     * Method to dynamically create a resolved object to pass to the modal instance
     * @param objToResolve
     * @returns {{}}
     * @private
     */
    function __dynamicResolver(objToResolve) {
      var resolved = {};

      if (objToResolve && angular.isObject(objToResolve)) {
        angular.forEach(
          objToResolve,
          function (value, key) {
            this[key] = value;
          },
          resolved
        );
      }

      return resolved;
    }

    /**
     * function createModal
     * Method to create/show a new modal window
     * @param modalConfig
     * @returns {*}
     * @private
     */
    function __createModal(modalConfig) {
      // Create new modal instance
      var modalInstance = $uibModal.open({
        // Url path where to find this modalInstance template to use for modal
        templateUrl: _defaultCfg.templateUrl,
        // Controller to attach to this modalInstance
        controller: _defaultCfg.modalController,
        // Alias for the controller attach to this modalInstance
        controllerAs: _defaultCfg.modalControllerAlias,
        // Datas to resolve and inject into this modalInstance
        resolve: {
          modalConfig: __dynamicResolver(modalConfig)
        }
      });

      // Return the created modal
      return modalInstance;
    }

    return {
      createModal: __createModal
    };
  }
})();
