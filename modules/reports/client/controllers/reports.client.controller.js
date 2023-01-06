(function () {
  'use strict';

  angular.module('reports').controller('reportsController', ReportsController);

  // Injection dependencies into the controller
  ReportsController.$inject = [
    '$scope',
    '$state',
    'Socket',
    '$timeout',
    'toaster',
    'customModalFactory',
    '$http'
  ];

  /* @ngInject */
  function ReportsController(
    $scope,
    $state,
    Socket,
    $timeout,
    toaster,
    cModal,
    $http
  ) {
    // Create the view model
    var vm = this;

    // Initialize variables to store timeout timers
    var reportsTimer = null,
      logsTimer = null,
      // Timers default duration
      timerTimeOut = 25000;

    // Module id passed into the state param
    vm.moduleId = $state.params.moduleId;
    // Report id passed into the state param
    vm.reportId = $state.params.reportId;

    // Initialize reports
    vm.reports = {
      list: [],
      selected: null,
      lastUpdate: null,
      isUpdating: false,
      hasUpdateError: false,
      isTimedOut: false,
      pagination: {
        // Total items to paginate
        totalItems: 0, // initialize at 0 and set it later when receiving reports
        // Current page shown
        currentPage: 1,
        // Number of results shown in current Page
        itemsPerPage: 10,
        // Number of pages shown in the pager
        maxSize: 3,
        // Slicer function to slice reports list for pager
        slicer: function () {
          var startPoint =
            (vm.reports.pagination.currentPage - 1) *
            vm.reports.pagination.itemsPerPage;
          var endPoint =
            vm.reports.pagination.currentPage *
            vm.reports.pagination.itemsPerPage;

          return vm.reports.list.slice(startPoint, endPoint);
        }
      }
    };

    // Initialize logs
    vm.logs = {
      valueFilter: '',
      list: [],
      total: 0,
      totalShown: 0,
      lastUpdate: null,
      isUpdating: false,
      hasUpdateError: false,
      isTimedOut: false,
      pagination: {
        // Total items to paginate
        totalItems: 0, // initialize at 0 and set it later when receiving logs
        // Current page shown
        currentPage: 1,
        // Number of results shown in current Page
        itemsPerPage: 25,
        // Number of pages shown in the pager
        maxSize: 5,
        // Slicer function to slice reports list for pager
        slicer: function () {
          // Filter logs based on selected filter
          var filteredLogs = vm.logs.list
            .filter(function (log) {
              switch (vm.radioModel) {
                case 'Success':
                  return log[3] && log[3].includes('SKIPPED') && !log[5];
                case 'Error':
                  return !log[3] && log[5];
                case 'Warning':
                  return log[3] && log[3].includes('ASKED');
                case 'All':
                default:
                  return log != null;
              }
            })
            .filter(function (log) {
              switch (vm.radioTypeAction) {
                case 'Creation':
                  return (
                    log[3] === 'CREATION_VALIDATION_SKIPPED' ||
                    log[12] === 'CREATION' ||
                    log[12] === 'CREATION/MODIFICATION'
                  );
                  break;
                case 'Modification':
                  return (
                    log[3] === 'MODIFICATION_VALIDATION_SKIPPED' ||
                    log[12] === 'MODIFICATION' ||
                    log[12] === 'CREATION/MODIFICATION'
                  );
                  break;
                case 'Suppression':
                  return (
                    log[3] === 'SUPPRESSION_VALIDATION_SKIPPED' ||
                    log[12] === 'SUPPRESSION'
                  );
                  break;
                case 'All':
                default:
                  return log != null;
                  break;
              }
            })
            .filter(function (log) {
              var filter = vm.logs.valueFilter;
              return log[2].toLowerCase().includes(filter.toLowerCase());
            });

          // Set the total items to paginate
          vm.logs.pagination.totalItems = filteredLogs.length;

          // Set the index to start the slice function
          var startIndex =
            (vm.logs.pagination.currentPage - 1) *
            vm.logs.pagination.itemsPerPage;
          // Set the end to stop the slice function
          var endIndex =
            vm.logs.pagination.currentPage * vm.logs.pagination.itemsPerPage;

          // Return the filtered logs
          return filteredLogs.slice(startIndex, endIndex);
        }
      }
    };

    // Initialize variable to store the logs buttons filters state
    // Available values : All, Success, Error
    vm.radioModel = 'All';

    // filter by action type (creation, modification, suppression)
    vm.radioTypeAction = 'All';

    // Function to create a new modal from view model
    vm.openModal = __openModal;

    // Function to load a report from view model
    vm.loadReport = __loadReport;

    // fix apidae error
    vm.fixError = __fixError;

    // Check is there is a current socket available
    if (!Socket.socket) {
      // If not, start the connection process
      Socket.connect();
    }

    // Start loading reports
    __loadReports();

    // Add an event listener to the listen for reports response event
    Socket.on('clientReportsEventResponse', function (msg) {
      // Handle reports event response
      __handleReportsResponse(msg);
    });

    // Add an event listener to the listen for reports response event
    Socket.on('clientLogsEventResponse', function (msg) {
      // Handle logs event response
      __handleLogsResponse(msg);
    });

    // Add an event listener to listen for an error on the socket
    Socket.on('error', function (err) {
      // Notify the user that an error has occured
      toaster.pop('error', 'Une erreur est survenue', err);

      // Log the error
      console.error(err);
    });

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      // Remove socket listener for reports
      Socket.removeListener('clientReportsEventResponse');

      // Remove socket listener for logs
      Socket.removeListener('clientLogsEventResponse');

      // Cancel reports timeout timer
      __cancelTimer(reportsTimer);

      // Cancel logs timeout timer
      __cancelTimer(logsTimer);
    });

    function __cancelTimer(timer) {
      if (timer) {
        $timeout.cancel(timer);
      }
    }

    function __openModal(title, err) {
      // Define modal configuration
      var modalConfig = {
        // Title of the modal
        title: title,
        // Body content of the modal
        content: err,
        // Footer buttons of the modal
        buttons: [{ class: 'btn-primary', name: 'Ok' }]
      };

      // Create a new modal from service
      cModal.createModal(modalConfig);
    }

    /**
     * function __loadReports
     * Method to load reports
     * @private
     */
    function __loadReports() {
      if (vm.moduleId) {
        // Update reports updating status
        vm.reports.isUpdating = true;

        // Emit clientReportsEvent
        Socket.emit('clientReportsEvent', { module: vm.moduleId });

        // Start a timer to handle reports loading timeout
        reportsTimer = $timeout(function () {
          // Update reports timeout status
          vm.reports.isTimedOut = true;

          // Update reports updating status
          vm.reports.isUpdating = false;

          // Update reports updating status
          vm.reports.hasUpdateError = false;

          // Log the timed out error
          console.error('Error : Reports request timed out');

          // Notify the user that an error has occured
          toaster.pop('error', 'Reports', 'Request has failed (timed out) !');
        }, timerTimeOut);
      }
    }

    /**
     * function __loadReport
     * Method to load a specified report
     * @param reportId
     * @private
     */
    function __loadReport(reportId) {
      if (reportId !== vm.reports.selected) {
        if (reportId) {
          // Update logs updating status
          vm.logs.isUpdating = true;

          // Emit clientLogsEvent
          Socket.emit('clientLogsEvent', {
            module: vm.moduleId,
            report: reportId
          });

          // Start a timer to handle logs loading timeout
          logsTimer = $timeout(function () {
            // Update reports timeout status
            vm.logs.isTimedOut = true;

            // Update reports updating status
            vm.logs.isUpdating = false;

            // Update reports updating status
            vm.logs.hasUpdateError = false;

            // Log the timed out error
            console.error('Error : Logs request timed out');

            // Notify the user that an error has occured
            toaster.pop('error', 'Logs', 'Request has failed (timed out) !');
          }, timerTimeOut);

          // Set the selected report
          vm.reports.selected = reportId;

          // Loop through the reports
          for (var o in vm.reports.list) {
            // Check if the current iterated report id is the same as given param
            if (vm.reports.list[o].id === reportId) {
              // Update the total number of logs
              vm.logs.total = vm.reports.list[o].total;

              // Break out of the loop
              break;
            }
          }
        }
      }
    }

    /**
     * function __handleReportsResponse
     * Method to process reports event response from proxy
     * @param msg
     * @private
     */
    function __handleReportsResponse(msg) {
      // Check param
      if (msg) {
        // Cancel the reports timeout timer
        __cancelTimer(reportsTimer);

        // Check error from the received message
        if (!msg.err) {
          // Check if there is actually no reports in the view
          // OR if there are new reports to send to the view
          if (!vm.reports.list || vm.reports.list.length !== msg.data.length) {
            // Update the reports
            vm.reports.list = msg.data;

            // Update reports last update date
            vm.reports.lastUpdate = new Date();

            // Update reports pagination total items
            vm.reports.pagination.totalItems = vm.reports.list.length;

            // Check if there is some reports
            if (vm.reports.list.length > 0) {
              // Check type of the id param in current report
              if (typeof vm.reports.list[0].id === 'string') {
                // Load related logs
                __loadReport(vm.reports.list[0].id);
              }
            }
          }
        }
        // Otherwise
        else {
          // Update the reports update error status
          vm.reports.hasUpdateError = true;

          // Notify the user of the error
          toaster.pop('error', 'Une erreur est survenue', msg.err);
        }

        // Update reports updating status
        vm.reports.isUpdating = false;

        // Emit logsEventReceived
        Socket.emit('clientReportsEventReceived', { module: msg.module });
      }
    }

    function __handleLogsResponse(msg) {
      // Check param
      if (msg) {
        // Cancel the reports timeout timer
        __cancelTimer(logsTimer);

        // Check error from the received message
        if (!msg.err) {
          // Check if there is actually no logs in the view
          // OR if there are new logs to send to the view
          if (
            !vm.logs.list ||
            vm.reportId !== msg.report ||
            vm.logs.list.length !== msg.data.length
          ) {
            // Update the logs
            vm.logs.list = msg.data;

            // hack for bypass error
            vm.logs.list.forEach((log) => {
              if (log[5] === 'UNKNOWN ERROR') {
                log[5] = '';
              } else if (log[6].includes('VerrouilleException')) {
                log[5] = 'OBJET VERROUILLE';
              } else if (log[6].includes('Java')) {
                log[5] = 'ERREUR CODE APIDAE';
              }
            });

            // Update logs last update date
            vm.logs.lastUpdate = new Date();

            // Update logs pagination total items
            vm.logs.pagination.totalItems = vm.logs.list.length;
          }
        }
        // Otherwise
        else {
          // Update the reports update error status
          vm.logs.hasUpdateError = true;

          // Notify the user of the error
          toaster.pop('error', 'Une erreur est survenue', msg.err);
        }

        // Update reports updating status
        vm.logs.isUpdating = false;

        // Emit clientLogsEventReceived
        Socket.emit('clientLogsEventReceived', {
          module: msg.module,
          report: msg.report
        });
      }
    }

    function __fixError() {
      return __requestor('get', {
        url: '/fix-error'
      });
    }

    /**
     * function __requestor
     * @param pMethod
     * @param pOptions
     * @returns {*|Promise}
     * @private
     */
    function __requestor(pMethod, pOptions) {
      var config = {
        method: pMethod ? pMethod.toLowerCase() : 'get',
        url: pOptions && pOptions.url ? 'api' + pOptions.url : 'api',
        data: pOptions && pOptions.data ? pOptions.data : {},
        params: pOptions && pOptions.params ? pOptions.params : {}
      };

      var request = $http(config);

      console.log(config);

      return request.then(() => console.log('success'));
    }
  }
})();
