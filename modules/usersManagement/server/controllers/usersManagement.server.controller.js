'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  path = require('path'),
  _ = require('lodash'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'
  )),
  config = require(path.resolve('./config/config'));

exports.read = readAction;
exports.list = listAction;
exports.create = createAction;
exports.update = updateAction;
exports.remove = removeAction;
exports.getUserById = getUserById;

exports.getRoles = getRoles;
exports.getApiKeys = getApiKeys;

/**
 * function readAction
 * Return the current user to manage that was injected in the request
 * @param req
 * @param res
 */
function readAction(req, res) {
  // Return the user object that was injected through the function getUserById() via the route param :userId
  res.json(req.userToManage);
}

/**
 * function listAction
 * List all users of the application stored in the database
 * @param req
 * @param res
 */
function listAction(req, res) {
  // Retrieve params from query if any
  var optParams = req.query || {},
    user = req.user;

  if (user.roles.indexOf('admin') === -1) {
    _.assign(optParams, { username: { $not: /admin/ } });
  }

  //optParams.roles = { $in: getLowerRolesOfRole(req.user.roles[0],true) };

  //console.log("+++++++++++++++++++++++++");
  //console.log(optParams);
  //console.log("+++++++++++++++++++++++++");

  /*console.log("----------------------");
	 console.log(getLowerRolesOfRole(req.user.roles[0],true));
	 console.log("----------------------");*/

  User.find(optParams)
    .sort({ created: 'desc' })
    .exec(function (err, users) {
      handleError(err, users, res);
    });
}

/**
 * function createAction
 * Create a user in database based on request informations
 * @param req
 * @param res
 */
function createAction(req, res) {
  var reqBody = req.body,
    newUser = new User({
      username: reqBody.username,
      password: reqBody.password,
      email: reqBody.email,
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      roles: reqBody.roles,
      apiKeys: reqBody.apiKeys
    });

  newUser.save(function (err, createdUser) {
    handleError(err, createdUser, res);
  });
}

/**
 * function updateAction
 * Update informations of a given user
 * @param req
 * @param res
 */
function updateAction(req, res) {
  // Get the unmodified user from the view
  var user = req.userToManage,
    // Get the new user's informations
    newUserInfos = req.body;

  console.log('===================================================');
  console.log('form', newUserInfos);
  console.log('user', user);
  console.log('test', newUserInfos.hasOwnProperty('password'));
  console.log('===================================================');

  // Check if there is a user to modify
  if (user) {
    // Set the user field
    user.firstName = newUserInfos.hasOwnProperty('firstName')
      ? newUserInfos.firstName
      : user.firstName;
    user.lastName = newUserInfos.hasOwnProperty('lastName')
      ? newUserInfos.lastName
      : user.lastName;
    user.email = newUserInfos.hasOwnProperty('email')
      ? newUserInfos.email
      : user.email;
    user.username = newUserInfos.hasOwnProperty('username')
      ? newUserInfos.username
      : user.username;
    user.roles = newUserInfos.hasOwnProperty('roles')
      ? newUserInfos.roles
      : user.roles;
    user.apiKeys = newUserInfos.hasOwnProperty('apiKeys')
      ? newUserInfos.apiKeys
      : user.apiKeys;

    if (newUserInfos.hasOwnProperty('password')) {
      user.password = newUserInfos.password;
    }

    // Save the user
    user.save(function (err, updatedUser) {
      // Handle error and success response for save callback
      handleError(err, updatedUser, res);
    });
  } else {
    // Handle error and success response
    handleError("Didn't found user to update !", null, res);
  }
}

/**
 * function removeAction
 * Delete a given user from the database
 * @param req
 * @param res
 */
function removeAction(req, res) {
  var user = req.userToManage;

  if (user) {
    user.remove(function (err, removedUser) {
      handleError(err, removedUser, res);
    });
  }
}

/**
 * function handleError
 * generic function to handle callback error from CRUD functions
 * @param err
 * @param results
 * @param res
 */
function handleError(err, results, res) {
  var retMsg = results;

  if (err) {
    res.status(400);
    retMsg = { message: errorHandler.getErrorMessage(err) };
  }

  res.json(retMsg);
}

/**
 * function getUserById
 * Middleware to retrieve param and inject it into the view
 * @param req
 * @param res
 * @param next
 * @param id
 */
function getUserById(req, res, next, id) {
  User.findById(id, { salt: 0, password: 0 }, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load user ' + id));
    req.userToManage = user;
    next();
  });
}

/**
 * function getLowerRolesOfRole
 * @param roleName
 * @param excludeCurrentRole
 * @returns {Array}
 */
function getLowerRolesOfRole(roleName, excludeCurrentRole) {
  // Get all available roles from app config
  var tmpRoles = config.roles,
    tmpRolesLength = tmpRoles.length;

  if (roleName !== undefined) {
    // Check if the passed role exist
    if (tmpRoles.indexOf(roleName) !== -1) {
      // Get all roles bellow passed role in roles hierarchy
      tmpRoles = tmpRoles.slice(
        tmpRoles.indexOf(roleName) + excludeCurrentRole,
        tmpRolesLength
      );
    } else {
      console.log('**********************');
      console.log("Role %s doesn't exist in tmpRoles array", roleName);
      console.log('**********************');
    }
  } else {
    tmpRoles = [];
    console.log(
      'WARNING ! usersManagement.server.controller.js | getLowerRolesOfRole() | roleName is undefined !'
    );
  }

  // Return an array of available roles
  return tmpRoles;
}

/**
 * function getRoles
 * @param req
 * @param res
 */
function getRoles(req, res) {
  // Retrieve params from query if any
  var optParams = req.query || {};
  // Check if a role has been passed and get linked roles
  var tmpRoles = optParams.hasOwnProperty('role')
    ? getLowerRolesOfRole(optParams.role, true)
    : config.roles;

  // Return roles
  res.json(tmpRoles);
}

function getApiKeys(req, res) {
  var apiKeys = config.apiKeys;

  // Return apiKeys
  res.json(apiKeys);
}
