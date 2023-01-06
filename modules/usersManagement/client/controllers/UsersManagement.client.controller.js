(function () {
  'use strict';

  angular
    .module('usersManagement')
    .controller('UsersManagementController', UsersManagementController);

  UsersManagementController.$inject = [
    'currentStateInfos',
    'vmRoles',
    'vmUser',
    'vmApiKeys',
    '$location',
    'Authentication',
    'usersManagementAccounts',
    '$state',
    '$timeout'
  ];

  /* @ngInject */
  function UsersManagementController(
    currentStateInfos,
    vmRoles,
    vmUser,
    vmApiKeys,
    $location,
    Authentication,
    usersManagementAccounts,
    $state,
    $timeout
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.authentication = Authentication;
    vm.currentModule = currentStateInfos;
    vm.content = {};
    vm.credentials = {};
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    vm.content.user = vmUser;
    vm.content.roles = vmRoles;
    vm.content.apiKeys = vmApiKeys;

    if ($state.is('usersaccounts.edit')) {
      vm.credentials.roles = vmUser[0].roles;
      vm.credentials.apiKeys = vmUser[0].apiKeys;
    } else if ($state.is('usersaccounts.create')) {
      vm.credentials.roles = 'user';
    }

    function create() {
      var newUser = new usersManagementAccounts(vm.credentials);
      newUser.$save(function (response) {
        $location.path('userslist/view/' + response._id);
      }, handleErrorMessage);
    }

    function update() {
      if (vm.content.user && vm.credentials) {
        var userToUpdate = vm.content.user[0];
        var updatedInfos = vm.credentials;
        userToUpdate.firstName = updatedInfos.firstName;
        userToUpdate.lastName = updatedInfos.lastName;
        userToUpdate.email = updatedInfos.email;
        userToUpdate.username = updatedInfos.username;
        userToUpdate.password = updatedInfos.password;
        userToUpdate.roles = updatedInfos.roles;
        userToUpdate.$update(function (response) {
          $location.path('userslist/view/' + response._id);
        }, handleErrorMessage);
      }
    }

    function remove() {
      vm.content.user[0].$remove(function () {
        $location.path('userslist');
      });
    }

    function handleErrorMessage(errorResponse) {
      if (errorResponse) {
        vm.error = errorResponse.data.message;
      }
    }
  }
})();
