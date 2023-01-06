'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(
  ApplicationConfiguration.applicationModuleName,
  ApplicationConfiguration.applicationModuleVendorDependencies
);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  '$compileProvider',
  function ($locationProvider, $compileProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    // Disabling Debug Data
    // Documention link : https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(false);

    // If you wish to debug an application with this information
    // then you should open up a debug console in the browser then call this method
    // directly in this console:
    // angular.reloadWithDebugInfo();
  }
]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app when google api's launched
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
