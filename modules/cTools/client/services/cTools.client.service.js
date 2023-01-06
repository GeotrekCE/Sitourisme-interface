(function () {
  'use strict';

  angular
    .module('cTools')
    .provider('customToolsService', CustomToolsServiceProvider);

  CustomToolsServiceProvider.$inject = [];

  /* @ngInject */
  function CustomToolsServiceProvider() {
    // Constructor
    this.$get = function () {
      // Return a new instance (singleton) of this class
      return new CustomToolsServiceProvider();
    };

    // Public methods
    this.generateProperties = __generateProperties;
    this.generateProperty = __generateProperty;
    this.generatePrivateProp = __generatePrivateProp;
    this.generatePropWithAccessors = __generatePropWithAccessors;

    this.cloneObj = __cloneObj;
    this.checkUndefinedParamByType = __checkUndefinedParamByType;
    this.tryParseJSON = __tryParseJSON;
    this.isRecursivelyEmpty = __isRecursivelyEmpty;
    this.isImageUrl = __isImageUrl;

    // Private methods
    /**
     * function __generateProperties
     * Method to create recursively a property (private AND public with accessors) into an object
     * @param rootObj
     * @param props
     * @param iterator
     * @private
     */
    function __generateProperties(rootObj, props, iterator) {
      // Define the iterator value
      iterator = iterator || 0;

      // Get the current iteration
      var curItr = props[iterator];

      // Generate property according to given parameter and current iteration
      __generateProperty(rootObj, curItr.name, curItr.value);

      // Increment the iterator
      iterator++;

      // If there is some iteration left
      if (props[iterator] != null) {
        // Restart the function recursively
        __generateProperties(rootObj, props, iterator);
      }
    }

    /**
     * function __generateProperty
     * Method to create a private property AND a public property with accessors
     * @param rootObj
     * @param propName
     * @param defaultVal
     * @private
     */
    function __generateProperty(rootObj, propName, defaultVal) {
      // Define the name of the private variable to create
      var privatePropName = '_' + propName;

      // Create the private ref variable
      __generatePrivateProp(rootObj, privatePropName, defaultVal);

      // Create the getter's & setter's
      __generatePropWithAccessors(rootObj, propName, privatePropName);
    }

    /**
     * function __generatePrivateProp
     * Method to create a private property into an object
     * @param rootObj
     * @param propName
     * @param defaultVal
     * @private
     */
    function __generatePrivateProp(rootObj, propName, defaultVal) {
      // Create a private property into the given root object parameter
      Object.defineProperty(rootObj, propName, {
        // Is not listable when looping through the parent object
        enumerable: false,
        // Is configurable
        configurable: true,
        // Is writable
        writable: true,
        // Default value of the property
        value: defaultVal
      });
    }

    /**
     * function __generatePropWithAccessors
     * Method to create a property with accessors into an object
     * @param rootObj
     * @param propName
     * @param privateRefPropName
     * @private
     */
    function __generatePropWithAccessors(
      rootObj,
      propName,
      privateRefPropName
    ) {
      // Create the getter's & setter's
      Object.defineProperty(rootObj, propName, {
        // It listable when looping through the parent object
        enumerable: true,
        // Is configurable
        configurable: true,
        // Getter
        get: function () {
          return rootObj[privateRefPropName];
        },
        // Setter
        set: function (newVal) {
          rootObj[privateRefPropName] = newVal;
        }
      });
    }

    /** WIP */

    /**
     * function __clone
     * Method to deep clone an object
     * @param obj
     * @returns {{}}
     * @private
     */
    function __cloneObj(obj) {
      // Return the cloned object if given param exist an is an object
      return obj && typeof obj == 'object'
        ? __tryParseJSON(JSON.stringify(obj))
        : {};
    }

    /**
     * function __checkUndefinedParamByType
     * Method to check is a given param is not null and has type matching given type param
     * @param p
     * @param pType
     * @returns {boolean}
     * @private
     */
    function __checkUndefinedParamByType(p, pType) {
      return p != null && pType != null && typeof p === pType;
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
        console.error(e);
        console.log('************************************************');
      }

      // In all case, return the result
      return result;
    }

    /**
     * function __isEmptyObjRecursive
     * @param obj
     * @returns {boolean}
     * @private
     */
    function __isEmptyObjRecursive(obj) {
      var isEmpty = true;

      for (var key in obj) {
        if (!__isRecursivelyEmpty(obj[key])) {
          isEmpty = false;
        }
      }

      return isEmpty;
    }

    /**
     * function __isEmptyArrayRecursive
     * @param arr
     * @returns {boolean}
     * @private
     */
    function __isEmptyArrayRecursive(arr) {
      var isEmpty = true;

      for (var i = 0; i < arr.length; i++) {
        if (!__isRecursivelyEmpty(arr[i])) {
          isEmpty = false;
        }
      }

      return isEmpty;
    }

    /**
     * function __isRecursivelyEmpty
     * @param obj
     * @returns {boolean}
     * @private
     */
    function __isRecursivelyEmpty(obj) {
      var isEmpty = true;

      if (obj) {
        if (angular.isObject(obj)) {
          if (angular.isArray(obj)) {
            isEmpty = __isEmptyArrayRecursive(obj);
          } else {
            isEmpty = __isEmptyObjRecursive(obj);
          }
        } else {
          isEmpty = false;
        }
      }

      return isEmpty;
    }

    /**
     * function __isImageUrl
     * @param url
     * @returns {boolean}
     * @private
     */
    function __isImageUrl(url) {
      var isImageUrl = false;

      if (url && typeof url === 'string') {
        isImageUrl = url.match(
          /^(((http|https|ftp)\:\/{2})|\\\\)(www)?.+\.(png|jpeg|jpg|gif|bmp)$/gi
        )
          ? true
          : false;
      }

      return isImageUrl;
    }
  }
})();
