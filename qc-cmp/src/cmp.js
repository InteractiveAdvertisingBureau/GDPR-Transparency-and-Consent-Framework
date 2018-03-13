import * as cmpConsent from './cmp-consent';
import cmpCookie from './cmp-cookie';
import cmpInit from './cmp-init';
import cmpVendorList from './cmp-vendor-list';
import { logError, executePendingCalls } from './cmp-utils';

/**
 * Quantcast's Reference Consent Manager Implementation
 */
var pendingCalls = [];

window.__cmp = new function(win) {
  //pendingCalls = [];

  if (win.__cmp) {
    try {
      // if the api was already loaded, then use it
      if (win.__cmp('__cmp')) {
        return win.__cmp;
      } else {
        // otherwise we still have the tag's __cmp. Making a call to __cmp
        // with no arguments will return the pending calls;
        pendingCalls = __cmp() || [];
      }
    } catch (nfe) {
      return win.__cmp;
    }
  }

  var api = function(cmd) {
    return {
      init: cmpInit.init,
      displayConsentUi: cmpConsent.displayConsentUi,
      getPublisherConsents: cmpConsent.getPublisherConsents,
      getVendorConsents: cmpConsent.getVendorConsents,
      getConsentData: cmpConsent.getConsentData,
      getVendorList: cmpVendorList.getVendorList,
      runConsentUiCallback: cmpConsent.runConsentUiCallback,
      saveConsents: cmpConsent.saveConsents,
      setConsentUiCallback: cmpConsent.setConsentUiCallback,
      __cmp: function() {
        return true;
      }
    }[cmd].apply(null, [].slice.call(arguments, 1));
  };

  return api;
}(window);

executePendingCalls(pendingCalls);
__cmp('init');
