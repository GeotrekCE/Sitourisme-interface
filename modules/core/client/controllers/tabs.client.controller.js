(function () {
  'use strict';

  angular.module('core').controller('TabsController', TabsController);

  TabsController.$inject = [
    '$rootScope',
    '$state',
    'defaultTab',
    'defaultAddTabValues',
    'Authentication',
    'productService'
  ];

  /* @ngInject */
  function TabsController(
    $rootScope,
    $state,
    defaultTab,
    defaultAddTabValues,
    Authentication,
    productService
  ) {
    // Create the view model
    var vm = this;

    vm.authentication = Authentication;

    // Initialize the tabs
    vm.tabs = [];

    // Hide tabs (default status)
    vm.isVisible = false;

    // Create a default tab according to resolved params
    var fixedTab = createTab(0, defaultTab.title, defaultTab.state, true);

    // Get the view param
    var viewId = $state.params.viewId;

    // Check view param
    if (viewId) {
      var product = productService.getProductNameById(viewId);

      product.then(function (product) {
        var tabName = product.content.data.name,
          tabId = product.content.data._id;

        // Create a tab according to the view param
        createTab(
          tabId,
          tabName,
          buildStateLink({ viewId: viewId }),
          true,
          true
        );
      });
    }

    vm.removeTab = removeTab;
    vm.goToTab = goToTabAction;

    $rootScope.$on('goToTab', function (event, pTabId, pTabName, pAction) {
      goToTabAction(pTabId, pTabName, pAction);
    });

    $rootScope.$on('toggleTabsVisibility', function (event, pVisible) {
      vm.isVisible = pVisible;
    });

    // Listen for switchToDefaultTab event
    $rootScope.$on('switchToDefaultTab', function (event) {
      if (vm.tabs.length > 0) {
        // Set default state as active state
        vm.tabs[0].active = true;
      }
    });

    /**
     * function getTabByParam
     * @param pTabs
     * @param pParam
     * @param pIterator
     * @returns {*}
     */
    function getTabByParam(pTabs, pParam, pIterator) {
      if (pTabs && pParam) {
        pIterator = pIterator || 0;

        var curIterTab = pTabs[pIterator];

        pIterator++;

        var isMatch = curIterTab && curIterTab[pParam.label] === pParam.value;

        if (isMatch) {
          return curIterTab;
        } else {
          return pTabs[pIterator]
            ? getTabByParam(pTabs, pParam, pIterator)
            : null;
        }
      }
    }

    /**
     * function goToTabAction
     * @param pTabId
     */
    function goToTabAction(pTabId, pTabName, pAction) {
      if (pTabId) {
        pAction =
          pAction != null && typeof pAction === 'string' ? pAction : 'view';

        var tab = updateTab(vm.tabs, { label: 'id', value: pTabId }, pAction);

        toggleActiveState(true);

        if (!tab) {
          tab = createTab(
            pTabId,
            pTabName || pTabId,
            buildStateLink(pAction, { viewId: pTabId }),
            true,
            true
          );
        }

        tab.active = true;

        var stateToGo = getStateToGo(tab.state);

        $state.go(stateToGo.state, stateToGo.params);
      }
    }

    /**
     * function updateTab
     * @param pTabs
     * @param pParam
     * @param pAction
     * @returns {*}
     */
    function updateTab(pTabs, pParam, pAction) {
      var tab = getTabByParam(pTabs, pParam);

      if (tab && pTabs && pParam) {
        tab.state = updateState(tab.state, pAction);
        vm.tabs[vm.tabs.indexOf(tab)].state = tab.state;
      }

      return tab;
    }

    function updateState(pState, pAction) {
      return pState && pAction
        ? pState.replace(/^(.+\.)(\w+)/gi, '$1' + pAction)
        : pState;
    }

    /**
     * function buildStateLink
     * @param pParams
     * @returns {string}
     */
    function buildStateLink(pAction, pParams) {
      if (pParams) {
        var baseState = pAction
            ? updateState(defaultAddTabValues.state, pAction)
            : defaultAddTabValues.state,
          baseStateParams = defaultAddTabValues.params,
          baseStateParamsLength = baseStateParams.length,
          stateParamsToReturn = '',
          matchVal = null;

        for (var i = 0; i < baseStateParamsLength; i++) {
          matchVal = pParams[baseStateParams[i]]
            ? pParams[baseStateParams[i]]
            : '';
          stateParamsToReturn +=
            baseStateParams[i] + ':' + "'" + matchVal + "'";

          if (i < baseStateParamsLength - 1) {
            stateParamsToReturn += ',';
          }
        }
      }
      return !pParams ? '' : baseState + '({' + stateParamsToReturn + '})';
    }

    /**
     * function getStateToGo
     * @param pStateString
     * @returns {{state: (*|string), params: ({}|string)}}
     */
    function getStateToGo(pStateString) {
      if (pStateString) {
        var indexOfParenthesis = pStateString.indexOf('(');
        var stateToGo = pStateString;
        var params = {};

        if (indexOfParenthesis !== -1) {
          stateToGo = pStateString.slice(0, indexOfParenthesis);

          var paramsRegex = /(\w+:\s{0,}\'\w+\')/g,
            paramsMatches = pStateString.match(paramsRegex);

          if (paramsMatches) {
            for (var i = 0; i < paramsMatches.length; i++) {
              var splitStr = paramsMatches[i].split(':');

              params[splitStr[0].trim()] = splitStr[1]
                .trim()
                .replace(/\'/g, '');
            }
          }
        }
      }

      return { state: stateToGo || '', params: params || '' };
    }

    /**
     * function toggleActiveState
     * @param activeStatus
     */
    function toggleActiveState(activeStatus) {
      if (activeStatus) {
        var activeTab = getTabByParam(vm.tabs, {
          label: 'active',
          value: activeStatus
        });
        activeTab.active = !activeStatus;
      }
    }

    /**
     * function createTab
     * @param id
     * @param title
     * @param state
     * @param active
     * @param closable
     * @param addlink
     * @returns {{}}
     */
    function createTab(id, title, state, active, closable, addlink) {
      var tabObj = {};

      if (id) tabObj.id = id;
      if (title) tabObj.title = title;
      if (state) tabObj.state = state;
      if (active) tabObj.active = active;
      if (closable) tabObj.closable = closable;
      if (addlink) tabObj.addlink = addlink;

      vm.tabs.push(tabObj);

      return tabObj;
    }

    /**
     * function removeTab
     * @param pTabIdx
     */
    function removeTab(pTabIdx) {
      if (pTabIdx) {
        vm.tabs.splice(pTabIdx, 1);
        $state.go(fixedTab.state);
      }
    }
  }
})();
