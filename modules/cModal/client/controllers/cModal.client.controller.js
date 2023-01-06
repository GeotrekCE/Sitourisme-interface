(function () {
  'use strict';

  angular
    .module('cModal')
    .controller('cModalInstanceController', CustomModalInstanceController);

  // Inject dependencies into the controller
  CustomModalInstanceController.$inject = ['$uibModalInstance', 'modalConfig'];

  /* @ngInject */
  function CustomModalInstanceController($uibModalInstance, modalConfig) {
    // Create the view model
    var vm = this;

    var _defautlButtons = [
      {
        class: 'btn-default',
        name: 'Ok',
        click: function () {
          vm.ok();
        }
      },
      {
        class: 'btn-primary',
        name: 'Annuler',
        click: function () {
          vm.cancel();
        }
      }
    ];

    // Set title of modal in the view model
    if (modalConfig.title) vm.title = modalConfig.title;

    // Set the title icon in the view model
    if (modalConfig.titleIcon) vm.titleIcon = modalConfig.titleIcon;

    // Set content wrapper class in the view model
    if (modalConfig.title)
      vm.contentWrapperClass = modalConfig.contentWrapperClass;

    // Set body content of modal in the view model
    if (modalConfig.content) vm.content = modalConfig.content;

    // Set the buttons of the modal footer in the view model
    if (modalConfig.buttons) {
      vm.buttons = modalConfig.buttons;
    }
    // Otherwise
    else {
      // Set default buttons Ok && CANCEL with respective default click action
      vm.buttons = _defautlButtons;
    }

    // Set the OK function for the validation button of the modal
    vm.ok = function () {
      // Close the modal
      $uibModalInstance.close('close');
    };

    // Set the CANCEL function for the cancel button of the modal
    vm.cancel = function () {
      // Close the modal
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
