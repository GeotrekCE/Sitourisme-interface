/**
 * Module dependencies.
 */
const path = require('path');
const http = require('http');
const config = require(path.resolve('./config/config'));
const _ = require('lodash');
//errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

const { api: apiConfig } = require(path.resolve('./config/config'));

/**
 * Create a product
 */
exports.create = function (req, res) {
  console.log('************ CREATE ************');
  //console.log(req.body);
  console.log('********************************');
  res.json('@TODO create');
};

/**
 * Show the current product
 */
exports.read = function (req, res) {
  console.log('************ READ ************');
  //console.log(req.params);
  console.log('********************************');

  __requestor('GET', req.params.productId, function (error, result) {
    __handleResponse(res, error, result);
  });
};

/**
 * Update a product
 */
exports.update = function (req, res) {
  console.log('************ UPDATE ************');
  //console.log(req.body);
  console.log('********************************');
  var product = req.body.product,
    type = {
      importType: product.importType,
      importSubType: product.importSubType
    };

  if (!__isAuthorized(req.user, type)) {
    res.status(403).json({ msg: 'unauthorized operation' });
  }

  __formatProduct(product, function (productFormatted) {
    var productStr = JSON.stringify(productFormatted);

    __requestor(
      'PUT',
      req.params.productId,
      function (error, result) {
        __handleResponse(res, error, result);
      },
      productStr
    );
  });
};

/**
 * remove null from object recursively
 * @param obj
 * @param cb
 * @private
 */
function __formatProduct(obj, cb) {
  _.forEach(obj, function (item, key) {
    if (_.isPlainObject(item)) {
      __formatProduct(item);
    } else if (_.isArray(item)) {
      console.log('before', item);
      _.remove(item, function (n) {
        return !n;
      });
      console.log('after', item);

      __formatProduct(item);
    }
  });

  if (cb) {
    cb(obj);
  }
}

/* exports.removeFromSitra = function(req, res) {
  console.log("************ REMOVE FROM SITRA ************");
  console.log("*******************************************");
  // code degueulasse : a faire évoluer en tableau et avec un meilleur passage de paramètre (pour toi nelly)
  __requestor(
    "GET",
    encodeURI(
      "remove-items-sitra?id=" +
        req.body.items[0]._id +
        "&specialIdSitra=" +
        req.body.items[0].specialIdSitra +
        "&specialId=" +
        req.body.items[0].specialId +
        "&name=" +
        req.body.items[0].name +
        "&member=" +
        req.body.items[0].member
    ),
    function(error, result) {
      __handleResponse(res, error, result);
    }
  );
}; */

/**
 * Delete a product
 */
exports.delete = function (req, res) {
  console.log('************ DELETE ************');
  console.log('********************************');

  __requestor('DELETE', req.params.productId, function (error, result) {
    console.log('--------------------------');
    console.log('error', error);
    console.log('result', result);
    console.log('--------------------------');

    res.json(result);
  });
};

/**
 * List of Products
 */
exports.list = function (req, res) {
  console.log('************ LIST ************');
  //console.log(req);
  //console.log(req.query);
  console.log('********************************');

  var queryContent = req.query;
  var urlParams = '';

  // Check if there is some pagination options (default)
  if (queryContent.pagination) {
    var parsedParams = __tryParseJSON(queryContent.pagination);

    if (parsedParams != null) {
      urlParams += __buildPaginationParam(parsedParams.from, parsedParams.size);
    }
  }

  // Check if there is some pagination options (raw url request)
  if (queryContent.from && queryContent.size) {
    urlParams += __buildPaginationParam(queryContent.from, queryContent.size);
  }

  // Check if there is some filtering options
  if (queryContent.filters && queryContent.filters.length > 0) {
    urlParams += '&' + queryContent.filters;
  }

  // Check if there is some sorting options
  if (queryContent.sorts && queryContent.sorts.length > 0) {
    urlParams += '&sort=' + queryContent.sorts;
  }

  // Check apiKeys
  var check = false;
  if (req.user && req.user.roles.indexOf('admin') === -1 && req.user.apiKeys) {
    if (req.user.apiKeys.length > 0) {
      var configRequest = config.apiKeysRequest,
        importTypes = [],
        importSubTypes = [];

      check = true;

      req.user.apiKeys.forEach(function (apiKey) {
        if (configRequest[apiKey] && configRequest[apiKey].importType) {
          importTypes.push(configRequest[apiKey].importType);
        }
        if (configRequest[apiKey] && configRequest[apiKey].importSubType) {
          importSubTypes.push(configRequest[apiKey].importSubType);
        }
      });

      urlParams += '&importType=' + importTypes.join(';');
      urlParams += importSubTypes.length
        ? '&importSubType=' + importSubTypes.join(';')
        : '';
    } else {
      res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à visualiser cette liste" });
    }
  } else if (req.user.roles.indexOf('admin') !== -1) {
    check = true;
  }

  if (check) {
    urlParams = urlParams.length > 0 ? 'search?' + urlParams : null;

    __requestor('GET', urlParams, function (error, result) {
      __handleResponse(res, error, result);
    });
  }
};

exports.fixError = (req, res) => {
  __requestor('GET', {}, function (error, result) {
    __handleResponse(res, error, result);
  });
};

/**
 * Build Pagination parameters
 * @param pFrom
 * @param pSize
 * @returns {string}
 * @private
 */
function __buildPaginationParam(pFrom, pSize) {
  return '&from=' + pFrom + '&size=' + pSize;
}

/**
 * send JSON configuration of form product and labels
 * @param req
 * @param res
 */
exports.getFormConfig = function (req, res) {
  res.json(config.productForm);
};

/**
 * function exportSelectionSitra
 * Method to export SITRA's ids
 * @param req
 * @param res
 */
exports.exportSelectionSitra = function (req, res) {
  console.log('************ EXPORT SELECTION SITRA ************');
  console.log(req.body);
  console.log('********************************');

  var dataArr = req.body.items,
    authorizedArr = _.filter(dataArr, function (item) {
      return __isAuthorized(req.user, item.type);
    }),
    idsArr = _.map(authorizedArr, function (item) {
      return item.id;
    }),
    idsStr = idsArr.toString();

  __requestor(
    'POST',
    'export-sitra',
    function (error, result) {
      __handleResponse(res, error, result);
    },
    idsStr
  );
};

/**
 * function exportSearchSitra
 * Method to export SITRA's cards by search filters
 * @param req
 * @param res
 */
exports.exportSearchSitra = function (req, res) {
  console.log('************ EXPORT SEARCH SITRA ************');
  //console.log(req.query);
  //console.log(req.query.search);
  console.log('********************************');

  var urlParams = req.query.search;

  // Check apiKeys
  var isAuthorized = false;
  if (req.user && req.user.roles.indexOf('admin') === -1 && req.user.apiKeys) {
    if (req.user.apiKeys.length > 0) {
      var configRequest = config.apiKeysRequest,
        importTypes = [],
        importSubTypes = [];

      isAuthorized = true;

      req.user.apiKeys.forEach(function (apiKey) {
        if (configRequest[apiKey] && configRequest[apiKey].importType) {
          importTypes.push(configRequest[apiKey].importType);
        }
        if (configRequest[apiKey] && configRequest[apiKey].importSubType) {
          importSubTypes.push(configRequest[apiKey].importSubType);
        }
      });

      urlParams += '&importType=' + importTypes.join(';');
      urlParams += importSubTypes.length
        ? '&importSubType=' + importSubTypes.join(';')
        : '';
    } else {
      res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé exporter cette liste" });
    }
  } else if (req.user.roles.indexOf('admin') !== -1) {
    isAuthorized = true;
  }

  if (isAuthorized) {
    __requestor(
      'GET',
      'export-sitra-search?' + urlParams,
      function (error, result) {
        __handleResponse(res, error, result);
      }
    );
  } else {
    res
      .status(403)
      .json({ message: "Vous n'êtes pas autorisé exporter cette liste" });
  }
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
    apiConfig.domain +
      (apiConfig.port ? ':' + apiConfig.port : '') +
      apiConfig.path +
      (pPathOptions ? '/' + pPathOptions : '')
  );

  var options = {
    hostname: apiConfig.domain,
    port: apiConfig.port,
    path: apiConfig.path + (pPathOptions ? '/' + pPathOptions : ''),
    method: pMethod.toUpperCase(),
    headers: {}
  };

  var chunks = '';

  var sentRequest = http.request(options, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      chunks += chunk;
    });

    res.on('end', function () {
      //callback(true, chunks);
      callback(null, chunks);
    });
  });

  sentRequest.on('error', function (e) {
    console.log('problem with request: ' + e.message);
    callback(e, chunks);
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
 * @param {Object|null} error
 * @param {String} data
 * @private
 */
function __handleResponse(res, error, data) {
  // If response exist
  if (res) {
    var responseObj = {},
      responseStatus = 400;

    if (!error) {
      // Parse received data
      var parsedData = __tryParseJSON(data);

      // If tryParse succeed
      if (parsedData !== null) {
        if (!parsedData.message) {
          // Redefine response status
          responseStatus = 200;
          // Redefine content of response
          responseObj = parsedData;
        } else {
          responseObj._status = parsedData.message;
        }
      }
    } else {
      responseObj._status = {
        error: error
      };
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

/**
 * return true if user has authorization for method on that type of data
 * Compare user.apiKeys items to type variable
 * @param user
 * @param method
 * @param type
 * @returns {boolean}
 * @private
 */
function __isAuthorized(user, { importType }) {
  if (!user || !importType) {
    return false;
    // all is authorized for admin
  } else if (user.roles.indexOf('admin') !== -1) {
    return true;
  }
  let isAuthorized = false;
  // if apiKeys is authorized return true
  user.apiKeys.forEach((apiKey) => {
    if (apiKey.toLowerCase() === importType.toLowerCase()) {
      isAuthorized = true;
    }
  });

  return isAuthorized;
}
