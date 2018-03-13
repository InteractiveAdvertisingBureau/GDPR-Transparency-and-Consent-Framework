import { getJson, MILLISEC_DAY } from './cmp-utils.js';

var cmpVendorList = {
  latestVendorListUrl: 'https://vendorlist.consensu.org/vendorlist-dev.json',
  vendorListVersionUrl: 'https://vendorlist.consensu.org/{version}/vendorlist-dev.json',

  // cache of vendor list fetched values (keyed by version num or 'LATEST')
  cachedVendorLists: {},

  /**
   * @callback vendorListCallback
   * @param {Object} response - either the vendor list or the error message
   */

  // arrays of callbacks for pending vendor list fetches (keyed by version num or 'LATEST')
  // array is created when fetch is started
  vendorListCallbacks: {},

  /**
   * Handles the vendor list response and calls all the pending callbacks
   * @param {Object} httpRequest
   * @param {number|string="LATEST"} version - the version of the vendor list.
   */
  handleGetVendorList: function(httpRequest, version) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      var response;
      var success = true;
      if (httpRequest.status === 200) {
        response = cmpVendorList.cachedVendorLists[version] = httpRequest.response;
      } else {
        response = { status: 'error' };
        success = false;
      }
      var callbackArray = cmpVendorList.vendorListCallbacks[version];
      for (var i = 0; i < callbackArray.length; i++) {
        callbackArray[i](response, success);
      }
      cmpVendorList.vendorListCallbacks[version] = undefined;
    }
  },

  /**
   * Gets the version specified vendor list from either the cache or the server
   * @param {number|string="LATEST"} version - the version of the vendor list.
   * @param {vendorListCallback} callback - the callback that handles the response.
   */
  retrieveVendorList: function(version, callback) {
    if (this.cachedVendorLists[version]) {
      callback(this.cachedVendorLists[version]);
    } else {
      if (this.vendorListCallbacks[version] instanceof Array) {
        // if there's a pending fetch for this vendor list, queue up a callback
        this.vendorListCallbacks[version].push(callback);
      } else {
        this.vendorListCallbacks[version] = [callback];
        var url =
          version === 'LATEST'
            ? this.latestVendorListUrl
            : this.vendorListVersionUrl.replace('{version}', version);

        getJson({ url: url }, function(httpRequest) {
          cmpVendorList.handleGetVendorList(httpRequest, version);
        });
      }
    }
  },

  /**
   * Gets the version specified vendor list. If no version is specified, it will get the vendor list
   * version specified in the cookie if available, otherwise it will get the latest version.
   * @param {number|string="LATEST"} version - the version of the vendor list.
   * @param {callback} callback - the callback that handles the response.
   */
  getVendorList: function(version, callback) {
    if (version === null || version === undefined) {
      // use the vendor list version from the cookie
      getCookie(function(cookie) {
        if (cookie.status === 'parsed') {
          cmpVendorList.retrieveVendorList(consentValues.getVendorListVersion(), callback);
        } else {
          cmpVendorList.retrieveVendorList('LATEST', callback);
        }
      });
    } else if (typeof version === 'number' || version === 'LATEST') {
      cmpVendorList.retrieveVendorList(version, callback);
    } else {
      //pass back success = false;
      callback({ error: 'Requesting invalid version: ' + version }, false);
    }
  },

  checkForNewVendorList: function(version, callback) {
    var hasNewerVendorList = false;
    // get the latest vendor list and check if the version is updated (and is a major update).
    // TODO: Make versions as Major update.Minor update,
    // otherwise need to check if there are any new vendors added and then prompt user for consent again
    cmpVendorList.getVendorList('LATEST', function(latestVendorList) {
      if (latestVendorList.status !== 'error' && latestVendorList.version > version) {
        hasNewerVendorList = true;
      }
      if (typeof callback === 'function') {
        callback(hasNewerVendorList);
      }
    });
  },

  shouldUpdateVendorList: function(lastUpdated, vendorListUpdateFreq) {
    return Date.now() - lastUpdated > vendorListUpdateFreq * MILLISEC_DAY;
  }
};

export default cmpVendorList;
