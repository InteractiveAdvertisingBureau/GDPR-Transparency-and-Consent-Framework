import cmpCookie from './cmp-cookie';
import cmpGeo from './cmp-geo';
import cmpInit from './cmp-init';
import { isArray, logError } from './cmp-utils';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
// *                        Consent UI Functions                       * \\
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 0\\
export const displayConsentUi = function() {
  if (!window.__cmpui) {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = process.env.ASSET_PATH + 'cmpui.js';

    document.head.insertBefore(script, document.head.childNodes[0]);
  } else {
    window.__cmpui('initConsentUi', 1);
  }
};

/**
 * Sets the global consent cookie
 * @param {Object} consentInfo
 * @param {Array<boolean>} consentInfo.purposeConsents - purpose consents
 * @param {Array<boolean>} consentInfo.vendorConsents - vendor consents
 * @param {Object} consentInfo.vendorList - vendor list used to obtain consents
 * @param {callback} callback - callback to be called after a successful cookie set
 */
export var saveConsents = function(consentInfo, callback) {
  var vendorList = consentInfo.vendorList;

  // set purpose consents
  var purposes = vendorList.purposes;
  var purposesLength = purposes.length;
  for (var i = 0; i < purposesLength; i++) {
    cmpCookie.consentValues.setPurposeConsent(consentInfo.purposeConsents[i], purposes[i].id);
  }

  // set vendor consents
  var vendors = vendorList.vendors;
  var vendorsLength = vendors.length;
  cmpCookie.consentValues.setMaxVendorId(vendors[vendorsLength - 1].id);
  for (var i = 0; i < vendorsLength; i++) {
    cmpCookie.consentValues.setVendorConsent(consentInfo.vendorConsents[i], vendors[i].id);
  }

  cmpCookie.setCookie(cmpCookie.consentValues.build(), callback);
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
// *                Publisher Consent Callback Functions               * \\
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
var consentUpdateCallbacks = [];

export const setConsentUiCallback = function(callback) {
  if (typeof callback === 'function') {
    consentUpdateCallbacks.push(callback);
  }
};

export const runConsentUiCallback = function() {
  while (consentUpdateCallbacks.length > 0) {
    consentUpdateCallbacks.shift()();
  }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
// *                     Spec Defined API Functions                    * \\
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
export var callbacksWaitingForConsent = [];

/**
 * For a given set of purpose ids, check if they have consent and
 * call the callback function with a map of the consent keyed by id
 *
 * TODO: customConsents
 */
export var getPublisherConsents = function(purposeIds, callback) {
  // if no proper callback is defined, there is no reason to continue.
  if (typeof callback !== 'function') {
    return;
  }

  if (cmpInit.isInitialized) {
    var standardConsents;
    var status = true;
    if (isArray(purposeIds) && purposeIds.length > 0) {
      standardConsents = {};
      purposeIds.forEach(function(id) {
        standardConsents[id] = cmpCookie.consentValues.getPurposeConsent(id);
      });
    } else if (
      purposeIds === null ||
      purposeIds === undefined ||
      (isArray(purposeIds) && purposeIds.length === 0)
    ) {
      standardConsents = cmpCookie.consentValues.getPurposeConsent();
    } else {
      standardConsents = null;
      status = false;
    }
    callback({ standardConsents: standardConsents }, status);
  } else {
    callbacksWaitingForConsent.push([].slice.apply(['getPublisherConsents', purposeIds, callback]));
  }
};

/**
 * For a given set of vendor ids, check if they have consent and
 * call the callback function with a map of the consent keyed by id
 */
export var getVendorConsents = function(vendorIds, callback) {
  if (cmpInit.isInitialized) {
    cmpGeo.checkUserIsInEU(function(eu) {
      var vendorConsents = {};
      try {
        if (!vendorIds) {
          //no vendor Ids, return the entire list
          var allVendorConsents = cmpCookie.consentValues.getVendorConsent(null);
          if (allVendorConsents) {
            for (var i = 0; i < allVendorConsents.length; i++) {
              if (allVendorConsents[i] !== undefined) {
                vendorConsents[i] = !!allVendorConsents[i];
              }
            }
          }
        } else {
          for (var i = 0; i < vendorIds.length; i++) {
            vendorConsents[vendorIds[i]] = cmpCookie.consentValues.getVendorConsent(vendorIds[i]);
          }
        }
        if (typeof callback === 'function') {
          callback(
            {
              metadata: cmpCookie.consentValues.getMetadata(true),
              isUserInEU: eu,
              hasGlobalConsent: cmpCookie.isGlobalScope,
              purposes: cmpCookie.consentValues.getPurposeConsent(),
              vendorConsents: vendorConsents
            },
            true
          );
        }
      } catch (e) {
        logError(e);
        if (typeof callback === 'function') {
          callback(
            {
              metadata: null,
              isUserInEU: eu,
              hasGlobalConsent: null,
              purposes: null,
              vendorConsents: null
            },
            false
          );
        }
      }
    });
  } else {
    callbacksWaitingForConsent.push([].slice.apply(['getVendorConsents', vendorIds, callback]));
  }
};

export var getConsentData = function(callback) {
  if (cmpInit.isInitialized) {
    cmpGeo.checkUserIsInEU(function(eu) {
      try {
        var cookie = cmpCookie.consentValues.build();
        if (typeof callback === 'function') {
          callback(
            {
              isUserInEU: eu,
              hasGlobalConsent: cmpCookie.isGlobalScope,
              consentData: cookie
            },
            true
          );
        }
      } catch (e) {
        if (typeof callback === 'function') {
          callback({ isUserInEU: eu, hasGlobalConsent: null, consentData: null }, false);
        }
      }
    });
  } else {
    callbacksWaitingForConsent.push([].slice.apply(['getConsentData', callback]));
  }
};
