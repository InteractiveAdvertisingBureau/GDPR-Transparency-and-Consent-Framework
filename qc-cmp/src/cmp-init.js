import cmpConfig from './cmp-config';
import cmpCookie from './cmp-cookie';
import {
  callbacksWaitingForConsent,
  displayConsentUi,
  runConsentUiCallback,
  setConsentUiCallback
} from './cmp-consent';
import cmpGeo from './cmp-geo';
import { logError, executePendingCalls } from './cmp-utils';
import cmpVendorList from './cmp-vendor-list';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
// *                    CMP Initialization Function                    * \\
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
var cmpInit = {
  isInitialized: false,

  initConsentState: function() {
    cmpCookie.getCookie(function(getCookieResponse) {
      if (getCookieResponse.status === 'notfound') {
        displayConsentUi();
      } else if (getCookieResponse.status === 'parsed') {
        try {
          cmpCookie.consentValues.setAll(getCookieResponse.value);
          if (
            cmpVendorList.shouldUpdateVendorList(
              cmpCookie.consentValues.getLastUpdated(),
              cmpConfig.vendorListUpdateFreq
            )
          ) {
            cmpVendorList.checkForNewVendorList(
              cmpCookie.consentValues.getVendorListVersion(),
              function(isNewVendorListAvailable) {
                if (isNewVendorListAvailable) {
                  displayConsentUi();
                } else {
                  //since no UI is displayed run the consentUI call backs.
                  runConsentUiCallback();
                }
              }
            );
          } else {
            runConsentUiCallback();
          }
        } catch (nfe) {
          logError('error parsing cookie', nfe);
          //display the UI and get the consent again
          displayConsentUi();
        }
      } else {
        logError('Get Cookie response is invalid: ', getCookieResponse.status);
      }
    });
  },

  init: function() {
    if (!cmpConfig.vendorListUpdateFreq) {
      cmpConfig.vendorListUpdateFreq = 30; //30 days
    }
    setConsentUiCallback(function() {
      cmpInit.isInitialized = true;
      executePendingCalls(callbacksWaitingForConsent);
    });

    if (cmpConfig.displayUi === 'always') {
      cmpInit.initConsentState();
    } else {
      cmpGeo.checkUserIsInEU(function(isUserInEU) {
        if (isUserInEU) {
          cmpInit.initConsentState();
        } else {
          runConsentUiCallback();
        }
      });
    }
  }
};
export default cmpInit;
