(function () {
  'use strict';

  // Setting up route
  angular.module('core').run(tabsOverride).config(decorate);

  tabsOverride.$inject = ['$templateCache'];

  /* @ngInject */
  function tabsOverride($templateCache) {
    $templateCache.put(
      'uibTabsOverride.tpl.html',
      '<li data-ng-class="{active: active, disabled: disabled}">\n' +
        '  <a data-ng-click="select()">\n' +
        '    <span data-ng-if="!addlink" data-ng-class="{ closable : \'text-danger\' }" uib-tab-heading-transclude data-ng-bind-html="heading"></span>\n' +
        '    <span data-ng-if="!!addlink"><i class="glyphicon glyphicon-plus"></i></span>\n' +
        '    <span data-ng-if="!!closable && !addlink" data-ng-click="notifyParent()" class="close-action"><i class="glyphicon glyphicon-remove"></i></span>\n' +
        '  </a>\n' +
        '</li>\n'
    );
  }

  decorate.$inject = ['$provide'];

  /* @ngInject */
  function decorate($provide) {
    /**************** WARNING ****************/
    /** tabDirective deprecated in v0.14    **/
    /** use uibTabDirective instead         **/
    /******************  *********************/

    $provide.decorator('uibTabDirective', delegue); // >= angular-bootstrap v0.14
    //$provide.decorator('tabDirective', delegue); // <= angular-bootstrap v0.13
  }

  delegue.$inject = ['$delegate'];

  /* @ngInject */
  function delegue($delegate) {
    var directive = $delegate[0];

    directive.templateUrl = 'uibTabsOverride.tpl.html';

    directive.$$isolateBindings['closable'] = {
      attrName: 'closable',
      mode: '=',
      optional: true
    };
    directive.$$isolateBindings['notifyParent'] = {
      attrName: 'close',
      mode: '&',
      optional: true
    };
    directive.$$isolateBindings['addlink'] = {
      attrName: 'addlink',
      mode: '=',
      optional: true
    };

    return $delegate;
  }
})();
