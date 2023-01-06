'use strict';

var path = require('path'),
  apiConfig = require(path.resolve('./config/config')).api,
  socAddress = 'http://' + apiConfig.domain + ':' + apiConfig.port,
  ioc = require('socket.io-client'),
  srvClient = ioc.connect(socAddress, {});

// Create the chat configuration
module.exports = function (io, socket) {
  /** SERVER | SOCKET CLIENT **/

  srvClient
    .on('connect', function () {
      // console.log("-------------------------------------------------------------------------------");
      // console.log("SOCKET CLIENT is now connected to SOCKET SERVER " + socAddress);
      // console.log("-------------------------------------------------------------------------------");
    })
    .on('modulesEventResponse', function (msg) {
      // console.log("modulesEventResponse | msg received");
      // console.log(msg);

      if (!msg.idClient || msg.idClient === socket.id) {
        socket.emit('clientModulesEventResponse', msg);
      }
    })
    .on('reportsEventResponse', function (msg) {
      // console.log("reportsEventResponse | msg received");
      // console.log(msg);

      if (!msg.idClient || msg.idClient === socket.id) {
        socket.emit('clientReportsEventResponse', msg);
      }
    })
    .on('logsEventResponse', function (msg) {
      // console.log("logsEventResponse | msg received");
      // console.log(msg);

      if (!msg.idClient || msg.idClient === socket.id) {
        socket.emit('clientLogsEventResponse', msg);
      }
    })
    .on('disconnect', function () {
      // console.log("*****************************");
      // console.log("SERVER CLIENT disconnect EVENT");
      // console.log("*****************************");
    })
    .on('connect_error', function (err) {
      // console.log("SOCKET-CLIENT | connect_error");
      // console.log(err);
    })
    .on('error', function (err) {
      // console.log("SOCKET-CLIENT | error");
      // console.log(err);
    });

  /** SERVER | SOCKET SERVER **/

  socket
    .on('clientModulesEvent', function (msg) {
      // console.log("SOCKET SERVER | clientModulesEvent | client is calling");
      // console.log("SOCKET CLIENT | emitting modulesEvent to API");
      srvClient.emit('modulesEvent', { idClient: socket.id });
    })
    .on('clientReportsEvent', function (msg) {
      // console.log("SOCKET SERVER | clientReportsEvent | client is calling");
      // console.log("SOCKET CLIENT | emitting reportsEvent to API");
      srvClient.emit('reportsEvent', {
        idClient: socket.id,
        module: msg.module
      });
    })
    .on('clientLogsEvent', function (msg) {
      // console.log("SOCKET SERVER | clientLogsEvent | client is calling");
      // console.log("SOCKET CLIENT | emitting logsEvent to API");
      srvClient.emit('logsEvent', {
        idClient: socket.id,
        module: msg.module,
        report: msg.report
      });
    })
    .on('clientReportsEventReceived', function (msg) {
      srvClient.emit('reportsEventReceived', {
        idClient: socket.id,
        module: msg.module
      });
    })
    .on('clientLogsEventReceived', function (msg) {
      srvClient.emit('logsEventReceived', {
        idClient: socket.id,
        module: msg.module,
        report: msg.report
      });
    })
    .on('disconnect', function () {
      // console.log("*****************************");
      // console.log("CLIENT disconnect EVENT");
      // console.log("*****************************");
    })
    .on('error', function (err) {
      // console.log("CLIENT | error");
      // console.log(err);
    });

  /*var modules = {
        'err': null,
        'data': [
            {
                'name': 'Products',
                'creationDate': new Date(),
                'lastUpdateDate': new Date()
            },
            {
                'name': 'Fake 01',
                'creationDate': new Date(),
                'lastUpdateDate': new Date()
            }
        ]
    };

    var reports = {
        'err': null,
        'data': [
            {
                'name': 'Report001',
                'creationDate': new Date(),
                'refModule': 'Products'
            },
            {
                'name': 'Report002',
                'creationDate': new Date(),
                'refModule': 'Products'
            },
            {
                'name': 'Report002',
                'creationDate': new Date(),
                'refModule': 'Products'
            }
        ]
    };

    var logs = {
        'err': null,
        'data': [
            'log 01',
            'log 02',
            'log 03',
            'log 04',
            'log 05',
            'log 06',
            'log 07',
            'log 08',
            'log 09',
            'log 10',
            'All done !'
        ]
    };*/

  /*socket.on('clientReceiveReportsEvent', function(msg) {

        console.log('clientReceiveReportsEvent | msg', msg);

        var response = {};

        if(msg.parent === 'Products') {
            response = reports;
        }

        io.emit('clientSendReportsEvent', response);
    });

    socket.on('clientReceiveLogsEvent', function(msg) {

        console.log('clientReceiveLogsEvent | msg', msg);

        var response = {};

        if(msg.parent === 'Report001') {
            response = logs;
        }

        io.emit('clientSendLogsEvent', response);
    });*/
};
