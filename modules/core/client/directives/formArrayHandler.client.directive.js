(function () {
  'use strict';

  angular.module('core').directive('formArrayHandler', formArrayHandler);

  /* @ngInject */
  function formArrayHandler() {
    return {
      restrict: 'EA',
      templateUrl: 'modules/core/views/form-array-handler.client.view.html',
      scope: {
        // Reference array to handle
        refArray: '=',
        // Path to acces the value in reference array
        refArrayAccess: '@',
        // New item value to instantiate on 'add' action
        refNewItem: '@',
        // Add button icon
        addBtnIcon: '@',
        // Add button title
        addBtnTitle: '@',
        // Delete button icon
        deleteBtnIcon: '@',
        // Delete button title
        deleteBtnTitle: '@',
        // Type of input to handle
        itemInputType: '@',
        // Placeholder of input to handle
        itemInputPlaceHolder: '@',
        // Placement of 'add-on' (delete button)
        addOnPullRight: '@',
        // Minimum of allowed items
        minItem: '@',
        // Maximum of allowed items
        maxItem: '@',
        // Lang to use for text translation
        lang: '@'
      },
      bindToController: true,
      controller: __formArrayHandlerController,
      controllerAs: 'dvm'
    };
  }

  /* @ngInject */
  function __formArrayHandlerController() {
    var _stringIsObjectRegex = new RegExp(/^{.+}$/);
    var _translation = {
      en: {
        newItem: 'New item',
        add: 'Add',
        emptyArray: 'Field not filled'
      },
      fr: {
        newItem: 'Nouvel item',
        add: 'Ajouter',
        emptyArray: 'Champ non renseigné'
      }
    };

    var dvm = this;

    __setup();

    function __setup() {
      dvm.refArrayAccess = dvm.refArrayAccess || '';
      dvm.refNewItem = dvm.refNewItem || '';
      dvm.itemInputType = dvm.itemInputType || 'text';
      dvm.itemInputPlaceHolder =
        dvm.itemInputPlaceHolder || __translate('newItem');
      dvm.addOnPullRight = dvm.addOnPullRight || false;
      dvm.addButton = {
        title: dvm.addBtnTitle || __translate('add'),
        icon: dvm.addBtnIcon || 'plus'
      };
      dvm.deleteButton = {
        title: dvm.deleteBtnTitle || '',
        icon: dvm.deleteBtnIcon || 'trash'
      };
      dvm.item = {
        add: __addItem,
        remove: __removeItem,
        get: __getItem
      };
      dvm.translate = __translate;
      dvm.minItem = dvm.minItem || 1;
      dvm.maxItem = dvm.maxItem || Number.POSITIVE_INFINITY;

      if (dvm.minItem > dvm.maxItem) {
        dvm.maxItem = dvm.minItem + 1;
      }

      var refArrayLength = dvm.refArray.length;

      if (refArrayLength === 0 || refArrayLength < dvm.minItem) {
        for (var i = 0; i < dvm.minItem; i++) {
          __addItem();
        }
      }
    }

    function __removeItem(pItemIdx) {
      if (pItemIdx != null) {
        if (dvm.refArray.length > dvm.minItem) {
          dvm.refArray.splice(pItemIdx, 1);
        }
      }
    }

    function __addItem() {
      if (dvm.refArray.length < dvm.maxItem) {
        var itemToAdd = '';

        if (dvm.refNewItem != null) {
          if (__stringIsObject(dvm.refNewItem)) {
            var tmpItemToAdd = __tryParseJSON(dvm.refNewItem);

            if (tmpItemToAdd != null) {
              itemToAdd = __recurseItemToAdd(tmpItemToAdd);
            }
          }
        }

        dvm.refArray.push(itemToAdd);
      }
    }

    function __getItem(pItem) {
      return __recurseItemToAdd(pItem);
    }

    function __recurseItemToAdd(pItemToAdd, itemAccess, iterator, finalItem) {
      if (pItemToAdd) {
        var breakFnc = false;
        iterator = iterator || 0;
        itemAccess = itemAccess || dvm.refArrayAccess.split('.');

        if (pItemToAdd[itemAccess[iterator]]) {
          finalItem = pItemToAdd[itemAccess];
          breakFnc = true;
        }

        iterator++;

        if (breakFnc) {
          return finalItem || pItemToAdd;
        } else {
          if (itemAccess[iterator]) {
            return __recurseItemToAdd(pItemToAdd, itemAccess, iterator);
          } else {
            return finalItem || pItemToAdd;
          }
        }
      }
    }

    function __translate(pTxtToTranslate) {
      return pTxtToTranslate
        ? _translation[dvm.lang || 'fr'][pTxtToTranslate]
        : pTxtToTranslate;
    }

    /******-*****/
    /** UTILS **/

    function __stringIsObject(pStr) {
      return pStr ? _stringIsObjectRegex.test(pStr) : false;
    }

    function __tryParseJSON(pStr) {
      var result = null;

      if (pStr) {
        try {
          result = JSON.parse(pStr);
        } catch (e) {
          console.error('__tryParseJSON | Error while parsing %s', pStr);
        }
      }

      return result;
    }
  }
})();
