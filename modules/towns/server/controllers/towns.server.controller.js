'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  http = require('http'),
  config = require(path.resolve('./config/config')),
  _ = require('lodash'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'
  ));

var townApiConfig = config.townApi;

/**
 * Send List of towns
 */
exports.getTowns = function (req, res) {
  var searchTerm = req.query.search,
    urlParams = '?search=' + encodeURIComponent(searchTerm);

  __requestor('GET', urlParams, function (opRes, data) {
    __handleResponse(res, opRes, data);
  });
};

/**
 * function __requestor
 * Method to send http requests
 * @param pMethod
 * @param pPathOptions
 * @param callback
 * @param pData
 * @private
 */
function __requestor(pMethod, pPathOptions, callback, pData) {
  pMethod = pMethod || 'GET';

  console.log(
    'SRV | __REQUESTOR | %s on %s',
    pMethod.toUpperCase(),
    townApiConfig.domain +
      ':' +
      townApiConfig.port +
      townApiConfig.path +
      (pPathOptions ? '/' + pPathOptions : '')
  );

  var options = {
    hostname: townApiConfig.domain,
    port: townApiConfig.port,
    path: townApiConfig.path + (pPathOptions ? '/' + pPathOptions : ''),
    method: pMethod.toUpperCase(),
    headers: {}
  };

  var chunks = '';
  console.log('===================================================');
  console.log('options', options);
  console.log('===================================================');
  var sentRequest = http.request(options, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      chunks += chunk;
    });

    res.on('end', function () {
      //callback(true, chunks);
      callback(chunks);
    });
  });

  sentRequest.on('error', function (e) {
    console.log('problem with request: ' + e.message);
    //callback(false, chunks);
    callback(chunks);
  });

  if (pData) {
    sentRequest.write(pData);
  }

  sentRequest.end();
}

/**
 * function __handleResponse
 * Method to handle __requestor response
 * @param res
 * @param opRes
 * @param data
 * @private
 */
function __handleResponse(res, /*opRes,*/ data) {
  /*console.log("---------------- DEBUG ----------------");

	 console.log("**** RES ****");
	 console.log(res);

	 console.log("**** DATA ****");
	 console.log(data);

	 console.log("---------------- END ----------------");*/

  // If response exist
  if (res) {
    // Default message to return
    var responseObj = { message: 'An error has occured !' };
    // Default response status to return
    var responseStatus = 400;

    // If api call operation succeed
    // Parse received data
    var parsedData = __tryParseJSON(data);

    // If tryParse succeed
    if (parsedData != null) {
      // Redefine content of response
      responseObj = parsedData;
      // Redefine response status
      responseStatus = 200;
    }

    // Send a response with status and content
    res.status(responseStatus).json(responseObj);
  }
}

/**
 * function __tryParseJSON
 * Method to try parsing string data
 * @param pData
 * @returns {*}
 * @private
 */
function __tryParseJSON(pData) {
  // Default result to return
  var result = null;

  // Try
  try {
    // Try to parse the given data
    result = JSON.parse(pData);
  } catch (e) {
    // Otherwise, catch the error
    console.log('************************************************');
    console.log('Error while parsing received data to JSON format');
    console.log('************************************************');
    console.log(e);
    console.log('************************************************');
  }

  // In all case, return the result
  return result;
}
