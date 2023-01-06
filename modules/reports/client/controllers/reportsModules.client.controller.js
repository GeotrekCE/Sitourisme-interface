(function () {
  'use strict';

  angular
    .module('reports')
    .controller('reportsModulesController', ReportsModulesController);

  ReportsModulesController.$inject = ['$scope', 'Socket', '$timeout'];

  /* @ngInject */
  function ReportsModulesController($scope, Socket, $timeout) {
    var vm = this;

    vm.modules = [];
    vm.isUpdating = true;
    vm.isUpdateError = false;
    vm.modulesTimeOut = false;

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    console.log('CLIENT | emitting clientModulesEvent');
    Socket.emit('clientModulesEvent', null);
    var modulesTimer = $timeout(function () {
      console.log('modules timed out');
      vm.modulesTimeOut = true;
    }, 25000);

    // Add an event listener to the event
    Socket.on('clientModulesEventResponse', function (message) {
      console.log(
        'CLIENT | clientModulesEventResponse | message received from proxy'
      );

      if (modulesTimer) $timeout.cancel(modulesTimer);

      if (!message.err) {
        console.info('NO ERRORS DETECTED :)');
        console.log('message.data', message.data);
        vm.modules = message.data;
        vm.modulesLastUpdate = new Date();
        vm.isUpdating = false;
      }
    });

    Socket.on('error', function (err) {
      console.error(err);
      vm.isUpdateError = true;
    });

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      console.log('$destroy clientModulesEventResponse');
      Socket.removeListener('clientModulesEventResponse');
      if (modulesTimer) $timeout.cancel(modulesTimer);
    });
  }
})();
