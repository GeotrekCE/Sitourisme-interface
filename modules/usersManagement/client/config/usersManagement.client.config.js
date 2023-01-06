(function () {
  'use strict';

  // Configuring the partners module
  angular.module('usersManagement').run(['Menus', ModuleMenus]);

  // Injecting dependencies
  ModuleMenus.$inject = ['Menus'];

  // Referencing menus
  /* @ngInject */
  function ModuleMenus(Menus) {
    var moduleName = 'Utilisateur',
      baseState = 'usersaccounts';

    // Add the partners dropdown item
    Menus.addMenuItem('topbar', {
      title: moduleName + 's',
      state: baseState,
      type: 'dropdown',
      icon: 'glyphicon glyphicon-user',
      roles: ['manager', 'admin']
    });

    //Add the dropdown list item
    Menus.addSubMenuItem('topbar', baseState, {
      title: 'Lister les ' + moduleName.toLowerCase() + 's',
      state: baseState + '.list',
      roles: ['manager', 'admin']
    });

    //Add the dropdown list item
    Menus.addSubMenuItem('topbar', baseState, {
      title: 'Créer un nouvel ' + moduleName.toLowerCase(),
      state: baseState + '.create',
      roles: ['manager', 'admin']
    });
  }
})();
