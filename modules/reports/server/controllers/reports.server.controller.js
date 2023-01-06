'use strict';

/**
 * Module dependencies.
 */
/*var server = 'http://paca.sitourisme.fr:8444',
	io = require('socket.io').listen(server);


io.on('reportsEvent', function(data) {
	console.log("reportsEvent");
	console.log(data);
});*/

/*var io = require('socket.io'),
	socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
	console.log("**************************************");
	console.log("**************************************");
	console.log("**************************************");
	console.log("SERVER | SOCKET CLIENT | connect event");
	console.log("**************************************");
	console.log("**************************************");
	console.log("**************************************");
});*/

module.exports = function (io, socket) {
  socket.on('connect', function () {
    console.log('**************************************');
    console.log('**************************************');
    console.log('**************************************');
    console.log('SERVER | SOCKET CLIENT | connect event');
    console.log('**************************************');
    console.log('**************************************');
    console.log('**************************************');
  });
};
