'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Users Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([
    {
      roles: ['admin'],
      allows: [
        {
          resources: '/api/userslist',
          permissions: ['get', 'post']
        },
        {
          resources: '/api/userslist/:userId',
          permissions: ['get', 'post', 'put', 'delete']
        }
      ]
    },
    {
      roles: ['manager'],
      allows: [
        {
          resources: '/api/userslist',
          permissions: ['get', 'post']
        },
        {
          resources: '/api/userslist/:userId',
          permissions: ['get', 'post', 'put', 'delete']
        }
      ]
    },
    {
      roles: ['user'],
      allows: []
    },
    {
      roles: ['guest'],
      allows: []
    }
  ]);
};

/**
 * Check If Users Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = req.user ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(
    roles,
    req.route.path,
    req.method.toLowerCase(),
    function (err, isAllowed) {
      if (err) {
        // An authorization error occurred.
        return res.status(500).send('Unexpected authorization error');
      } else {
        if (isAllowed) {
          // Access granted! Invoke next middleware
          return next();
        } else {
          return res.status(403).json({
            message: 'User is not authorized'
          });
        }
      }
    }
  );
};
