(function () {
  'use strict';

  // Setting up route
  angular.module('cModal').run(cModalTemplate);

  cModalTemplate.$inject = ['$templateCache'];

  /* @ngInject */
  function cModalTemplate($templateCache) {
    // Caching the modal template
    $templateCache.put(
      'cModal.client.template.html',
      '<div class="modal-header">' +
        '<h3 class="modal-title">' +
        '<i class="glyphicon" data-ng-class="vm.titleIcon" data-ng-if="vm.titleIcon"></i>' +
        '{{ vm.title }}' +
        '</h3>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="{{ vm.contentWrapperClass }}">' +
        '{{ vm.content }}' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button data-ng-if="vm.buttons"' +
        'data-ng-repeat="btn in vm.buttons"' +
        'class="btn"' +
        'data-ng-class="btn.class"' +
        'type="button"' +
        'data-ng-click="(btn.click) ? btn.click() : vm.cancel()">' +
        '{{ btn.name }}' +
        '</button>' +
        '</div>'
    );
  }
})();
