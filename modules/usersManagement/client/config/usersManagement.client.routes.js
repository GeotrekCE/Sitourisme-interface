(function () {
  'use strict';

  // Setting up route
  angular.module('usersManagement').config(statesProvider);

  // Injecting dependencies
  statesProvider.$inject = ['$stateProvider'];

  /* @ngInject */
  function statesProvider($stateProvider) {
    // Define path of the views folder
    var viewsFolder = 'modules/usersManagement/views/',
      viewsSuffix = '.client.view.html';

    // Partners module state routing
    $stateProvider
      .state('usersaccounts', {
        abstract: true,
        url: '/userslist',
        template: '<ui-view/>'
      })
      .state('usersaccounts.list', {
        url: '',
        templateUrl: viewsFolder + 'list-usersaccounts' + viewsSuffix,
        controller: 'UsersManagementController',
        controllerAs: 'vm',
        resolve: {
          currentStateInfos: function () {
            return {
              stateTitlePrefix: 'Liste des',
              icon: 'glyphicon glyphicon-list',
              name: 'utilisateurs'
            };
          },
          usersManagementAccounts: 'usersManagementAccounts',
          usersManagementRoles: 'usersManagementRoles',
          usersManagementApiKeys: 'usersManagementApiKeys',
          $stateParams: '$stateParams',
          Authentication: 'Authentication',
          vmRoles: function (usersManagementRoles, Authentication) {
            var role = '';
            if (Authentication.user.roles.indexOf('manager') >= 0) {
              role = 'manager';
            }
            if (Authentication.user.roles.indexOf('admin') >= 0) {
              role = 'admin';
            }
            return usersManagementRoles.query({ role: role }).$promise;
          },
          vmUser: function (usersManagementAccounts) {
            return usersManagementAccounts.query().$promise;
          },
          vmApiKeys: function (usersManagementApiKeys) {
            return usersManagementApiKeys.query().$promise;
          }
        }
      })
      .state('usersaccounts.view', {
        url: '/view/:userId',
        templateUrl: viewsFolder + 'view-usersaccounts' + viewsSuffix,
        controller: 'UsersManagementController',
        controllerAs: 'vm',
        resolve: {
          currentStateInfos: function () {
            return {
              stateTitlePrefix: "Edition de l'utilisateur",
              icon: 'glyphicon glyphicon-edit'
            };
          },
          usersManagementAccounts: 'usersManagementAccounts',
          usersManagementRoles: 'usersManagementRoles',
          usersManagementApiKeys: 'usersManagementApiKeys',
          $stateParams: '$stateParams',
          Authentication: 'Authentication',
          vmRoles: function (usersManagementRoles, Authentication) {
            var role = '';
            if (Authentication.user.roles.indexOf('manager') >= 0) {
              role = 'manager';
            }
            if (Authentication.user.roles.indexOf('admin') >= 0) {
              role = 'admin';
            }
            return usersManagementRoles.query({ role: role }).$promise;
          },
          vmUser: function (usersManagementAccounts, $stateParams) {
            return usersManagementAccounts.query({ _id: $stateParams.userId })
              .$promise;
          },
          vmApiKeys: function (usersManagementApiKeys) {
            return usersManagementApiKeys.query().$promise;
          }
        }
      })
      .state('usersaccounts.create', {
        url: '/create',
        templateUrl: viewsFolder + 'create-usersaccounts' + viewsSuffix,
        controller: 'UsersManagementController',
        controllerAs: 'vm',
        resolve: {
          currentStateInfos: function () {
            return {
              stateTitlePrefix: "Création d'un nouvel",
              icon: 'glyphicon glyphicon-edit',
              name: 'utilisateur'
            };
          },
          usersManagementAccounts: 'usersManagementAccounts',
          usersManagementRoles: 'usersManagementRoles',
          usersManagementApiKeys: 'usersManagementApiKeys',
          $stateParams: '$stateParams',
          Authentication: 'Authentication',
          vmRoles: function (usersManagementRoles, Authentication) {
            var role = '';
            if (Authentication.user.roles.indexOf('manager') >= 0) {
              role = 'manager';
            }
            if (Authentication.user.roles.indexOf('admin') >= 0) {
              role = 'admin';
            }
            return usersManagementRoles.query({ role: role }).$promise;
          },
          vmUser: function () {
            return {};
          },
          vmApiKeys: function (usersManagementApiKeys) {
            return usersManagementApiKeys.query().$promise;
          }
        }
      })
      .state('usersaccounts.edit', {
        url: '/:userId/edit',
        templateUrl: viewsFolder + 'create-usersaccounts' + viewsSuffix,
        controller: 'UsersManagementController',
        controllerAs: 'vm',
        resolve: {
          currentStateInfos: function () {
            return {
              stateTitlePrefix: "Edition de l'",
              icon: 'glyphicon glyphicon-edit',
              name: 'utilisateur'
            };
          },
          usersManagementAccounts: 'usersManagementAccounts',
          usersManagementRoles: 'usersManagementRoles',
          usersManagementApiKeys: 'usersManagementApiKeys',
          $stateParams: '$stateParams',
          Authentication: 'Authentication',
          vmRoles: function (usersManagementRoles, Authentication) {
            var role = '';
            if (Authentication.user.roles.indexOf('manager') >= 0) {
              role = 'manager';
            }
            if (Authentication.user.roles.indexOf('admin') >= 0) {
              role = 'admin';
            }
            return usersManagementRoles.query({ role: role }).$promise;
          },
          vmUser: function (usersManagementAccounts, $stateParams) {
            return usersManagementAccounts.query({ _id: $stateParams.userId })
              .$promise;
          },
          vmApiKeys: function (usersManagementApiKeys) {
            return usersManagementApiKeys.query().$promise;
          }
        }
      })
      .state('usersaccounts.remove', {
        url: '/:userId/remove',
        templateUrl: viewsFolder + 'delete-usersaccounts' + viewsSuffix,
        controller: 'UsersManagementController',
        controllerAs: 'vm',
        resolve: {
          currentStateInfos: function () {
            return {
              stateTitlePrefix: 'Suppression ',
              icon: 'glyphicon glyphicon-remove',
              name: "d'un utilisateur"
            };
          },
          usersManagementAccounts: 'usersManagementAccounts',
          usersManagementRoles: 'usersManagementRoles',
          usersManagementApiKeys: 'usersManagementApiKeys',
          $stateParams: '$stateParams',
          Authentication: 'Authentication',
          vmRoles: function (usersManagementRoles, Authentication) {
            var role = '';
            if (Authentication.user.roles.indexOf('manager') >= 0) {
              role = 'manager';
            }
            if (Authentication.user.roles.indexOf('admin') >= 0) {
              role = 'admin';
            }
            return usersManagementRoles.query({ role: role }).$promise;
          },
          vmUser: function (usersManagementAccounts, $stateParams) {
            return usersManagementAccounts.query({ _id: $stateParams.userId })
              .$promise;
          },
          vmApiKeys: function (usersManagementApiKeys) {
            return usersManagementApiKeys.query().$promise;
          }
        }
      });
  }
})();
