'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
  path = require('path'),
  _ = require('lodash');

/**
 * Create a file with a console.log of data at root path
 * @param filename
 * @param data
 * @private
 */
exports.consoleInFile = function (filename, data) {
  /* check if ".log" folder exists else create it */
  var dir = '../.log',
    filePath = path.resolve(dir, filename),
    dataStr = JSON.stringify(data);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFile(filePath, dataStr, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('data saved in ' + filePath + '.');
  });
};

/**
 * Merge properties of every objects passed in arguments
 * and concatenate properties value with separator ';'
 *
 * @return {Object}  merged object
 */
exports.mergeObjects = function () {
  // create object with properties definition of apiRequest and confSIT
  var obj = {};

  _.forEach(arguments, (item) => {
    _.forEach(item, (value, key) => {
      if (key in obj) {
        // if property is defined
        if (!!obj[key] && !!value) {
          obj[key] = obj[key] + ';' + value;
        } else if (!obj[key] && !!value) {
          obj[key] = value;
        }
      } else {
        obj[key] = value;
      }
    });
  });

  return obj;
};

/**
 * Bunch of methods that's format data :
 * 	- numberSpace -> add space every 3 characters
 * @param method
 * @param data
 * @returns {string}
 * @private
 */
exports.formatData = function (method, data) {
  switch (method) {
    case 'numberSpace':
      data += '';
      var sep = ' ';
      var reg = /(\d+)(\d{3})/;
      while (reg.test(data)) {
        data = data.replace(reg, '$1' + sep + '$2');
      }
      return data;
    default:
      return data;
  }
};
