/**
 * Tests fpr the core cmp-int apis
 */
import cmpConfig from '../src/cmp-config';
import * as cmpConsent from '../src/cmp-consent';
import cmpCookie from '../src/cmp-cookie';
import cmpVendorList from '../src/cmp-vendor-list';
import cmpGeo from '../src/cmp-geo';
import cmpInit from '../src/cmp-init';
import * as cmpUtils from '../src/cmp-utils';

describe('Testing cmp-init', function() {
  var timer;
  beforeEach(function() {
    timer = jasmine.createSpy('timer');
    jasmine.clock().install();
    cmpConfig.vendorListUpdateFreq = 30; //days

    //common spies
    spyOn(cmpCookie.consentValues, 'setAll');
    spyOn(cmpVendorList, 'getVendorList').and.callFake(function(ver, cb, arg) {
      cb({ status: 'parsed', version: 2 });
    });
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    cmpGeo.isUserInEU = null;
  });

  describe('Testing initConsentState with no cookie', function() {
    var cb1 = jasmine.createSpy('callback 1');

    beforeEach(function() {
      spyOn(cmpConsent, 'displayConsentUi').and.callFake(function(cb) {
        setTimeout(function() {
          if (typeof cb === 'function') {
            cb();
          }
          cmpConsent.runConsentUiCallback();
        }, 200);
      });
      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'notfound' });
        }, 200);
      });
      cmpConsent.setConsentUiCallback(cb1);
    });

    it('calls the callback in the correct order', function() {
      //call the function with callback1
      cmpGeo.isUserInEU = true;
      cmpInit.initConsentState();
      expect(cmpConsent.displayConsentUi.calls.count()).toEqual(0);
      jasmine.clock().tick(101);
      expect(cb1).not.toHaveBeenCalled();

      jasmine.clock().tick(401);
      //its past 200ms. This should've called the fake displayConsentUi and set isUserInEU
      expect(cmpCookie.getCookie).toHaveBeenCalled();

      jasmine.clock().tick(201);
      expect(cmpConsent.displayConsentUi.calls.count()).toEqual(1);
      jasmine.clock().tick(201);
      expect(cb1).toHaveBeenCalled();
    });
  });

  describe('Testing initConsentState with parsed cookie', function() {
    var cb1 = jasmine.createSpy('callback 1');

    beforeEach(function() {
      spyOn(cmpConsent, 'displayConsentUi').and.callFake(function(cb) {
        setTimeout(function() {
          if (typeof cb === 'function') {
            cb();
          }
          cmpConsent.runConsentUiCallback();
        }, 200);
      });

      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'parsed' });
        }, 200);
      });

      //set this to verigy that cb1 gets called wether ui is diplayed or not
      cmpConsent.setConsentUiCallback(cb1);
    });

    afterEach(function() {
      cb1.calls.reset();
    });

    it('calls callback but not display UI since not later than 30days', function() {
      spyOn(cmpCookie.consentValues, 'getLastUpdated').and.callFake(function() {
        return new Date(Date.now() - 29 * 86400000);
      });
      //call the function with callback1
      cmpInit.initConsentState();
      expect(cmpConsent.displayConsentUi.calls.count()).toEqual(0);
      jasmine.clock().tick(101);
      expect(cb1).not.toHaveBeenCalled();

      jasmine.clock().tick(401);
      //its past 400ms.
      expect(cmpCookie.getCookie).toHaveBeenCalled();
      expect(cmpVendorList.getVendorList).not.toHaveBeenCalled();
      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cb1).toHaveBeenCalled();
    });

    it('calls callback after displaying UI since later than 30days', function() {
      spyOn(cmpCookie.consentValues, 'getLastUpdated').and.callFake(function() {
        return new Date(Date.now() - 31 * 86400000);
      });
      spyOn(cmpCookie.consentValues, 'getVendorListVersion').and.callFake(function() {
        return 1;
      });

      //call the function with callback1
      cmpInit.initConsentState();
      expect(cmpConsent.displayConsentUi.calls.count()).toEqual(0);
      jasmine.clock().tick(101);
      expect(cb1).not.toHaveBeenCalled();

      jasmine.clock().tick(401);
      expect(cmpCookie.getCookie).toHaveBeenCalled();
      expect(cmpVendorList.getVendorList).toHaveBeenCalled();
      expect(cmpConsent.displayConsentUi).toHaveBeenCalled();
      jasmine.clock().tick(201);
      expect(cb1).toHaveBeenCalled();
    });

    it('calls callback after not displaying UI since later than 30days, but no new vendor list version', function() {
      spyOn(cmpCookie.consentValues, 'getLastUpdated').and.callFake(function() {
        return new Date(Date.now() - 31 * 86400000);
      });
      spyOn(cmpCookie.consentValues, 'getVendorListVersion').and.callFake(function() {
        return 2;
      });
      //call the function with callback1
      cmpInit.initConsentState();
      expect(cmpConsent.displayConsentUi.calls.count()).toEqual(0);
      jasmine.clock().tick(101);
      expect(cb1).not.toHaveBeenCalled();

      jasmine.clock().tick(401);
      expect(cmpCookie.getCookie).toHaveBeenCalled();
      expect(cmpVendorList.getVendorList).toHaveBeenCalled();
      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cb1).toHaveBeenCalled();
    });
  });

  describe('Testing init', function() {
    var cb1 = jasmine.createSpy('callback 1');

    beforeEach(function() {
      spyOn(cmpConsent, 'displayConsentUi').and.callFake(function(cb) {
        setTimeout(function() {
          if (typeof cp === 'function') {
            cb();
          }
          cmpConsent.runConsentUiCallback();
        }, 200);
      });

      spyOn(cmpUtils, 'executePendingCalls').and.callThrough();
      spyOn(cmpVendorList, 'checkForNewVendorList').and.callThrough();
      spyOn(cmpInit, 'initConsentState').and.callThrough();
      spyOn(cmpGeo, 'checkUserIsInEU').and.callThrough();
    });

    it(' with no cookie, config.display = always, displays UI and calls executePendingCalls', function() {
      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'notfound' });
        }, 200);
      });

      cmpConfig.displayUi = 'always';
      cmpInit.init();

      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).not.toHaveBeenCalled();
      expect(cmpInit.initConsentState).toHaveBeenCalled();
      expect(cmpCookie.getCookie).toHaveBeenCalled();

      jasmine.clock().tick(201);
      //its past 200ms.
      expect(cmpVendorList.getVendorList).not.toHaveBeenCalled(); //this will be called by displayUi
      expect(cmpConsent.displayConsentUi).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();
      jasmine.clock().tick(201);
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );
    });

    it(' with no cookie, config.display = null, user in eu, displays UI and calls executePendingCalls', function() {
      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'notfound' });
        }, 200);
      });

      cmpGeo.isUserInEU = true;
      cmpConfig.displayUi = null;
      cmpInit.init();

      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).toHaveBeenCalled();
      expect(cmpInit.initConsentState).toHaveBeenCalled();
      expect(cmpCookie.getCookie).toHaveBeenCalled();

      jasmine.clock().tick(201);
      //its past 200ms.
      expect(cmpVendorList.getVendorList).not.toHaveBeenCalled(); //this will be called by displayUi
      expect(cmpConsent.displayConsentUi).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();

      jasmine.clock().tick(201);
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );
    });

    it(' with no cookie, config.display = null, user is not in eu, does not display UI, but calls executePendingCalls', function() {
      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'notfound' });
        }, 200);
      });

      spyOn(cmpGeo, 'fetchIsUserInEU').and.callFake(function(callback) {
        cmpGeo.isUserInEU = false;
        callback(false);
      });

      cmpConfig.displayUi = null;
      cmpInit.init();

      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).toHaveBeenCalled();
      expect(cmpInit.initConsentState).not.toHaveBeenCalled();
      expect(cmpCookie.getCookie).not.toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );

      jasmine.clock().tick(201);
      //its past 200ms.
      expect(cmpVendorList.getVendorList).not.toHaveBeenCalled(); //this will be called by displayUi
      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
    });

    it(' with cookie, config.display = always, new vendor list, but not yet 30 days', function() {
      spyOn(cmpCookie.consentValues, 'getLastUpdated').and.callFake(function() {
        return new Date(Date.now() - 29 * 86400000);
      });
      spyOn(cmpCookie.consentValues, 'getVendorListVersion').and.callFake(function() {
        return 1;
      });

      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({
            status: 'parsed'
          });
        }, 200);
      });

      cmpConfig.displayUi = 'always';
      cmpConfig.vendorListUpdateFreq = 30;
      cmpInit.init();

      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).not.toHaveBeenCalled();
      expect(cmpInit.initConsentState).toHaveBeenCalled();
      expect(cmpCookie.getCookie).toHaveBeenCalled();

      jasmine.clock().tick(201);
      //its past 200ms.
      //its not 30days yet.. so no need to check

      expect(cmpVendorList.checkForNewVendorList).not.toHaveBeenCalled();
      expect(cmpVendorList.getVendorList).not.toHaveBeenCalled();
      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );
    });

    it(' with cookie, config.display = always, no new vendor list', function() {
      spyOn(cmpCookie.consentValues, 'getLastUpdated').and.callFake(function() {
        return new Date(Date.now() - 31 * 86400000);
      });
      spyOn(cmpCookie.consentValues, 'getVendorListVersion').and.callFake(function() {
        return 2;
      });

      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'parsed' });
        }, 200);
      });

      cmpConfig.displayUi = 'always';
      cmpConfig.vendorListUpdateFreq = 30;
      cmpInit.init();

      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).not.toHaveBeenCalled();
      expect(cmpInit.initConsentState).toHaveBeenCalled();
      expect(cmpCookie.getCookie).toHaveBeenCalled();

      jasmine.clock().tick(201);
      //its past 200ms.
      expect(cmpVendorList.checkForNewVendorList).toHaveBeenCalled();
      expect(cmpVendorList.getVendorList).toHaveBeenCalled();

      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );
    });

    it(' with cookie, config.display = always, new vendor list', function() {
      spyOn(cmpCookie.consentValues, 'getLastUpdated').and.callFake(function() {
        return new Date(Date.now() - 31 * 86400000);
      });
      spyOn(cmpCookie.consentValues, 'getVendorListVersion').and.callFake(function() {
        return 1;
      });

      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'parsed' });
        }, 200);
      });

      cmpConfig.displayUi = 'always';
      cmpConfig.vendorListUpdateFreq = 30;
      cmpInit.init();

      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).not.toHaveBeenCalled();
      expect(cmpInit.initConsentState).toHaveBeenCalled();
      expect(cmpCookie.getCookie).toHaveBeenCalled();

      jasmine.clock().tick(201);
      //its past 200ms.
      expect(cmpVendorList.checkForNewVendorList).toHaveBeenCalled();
      expect(cmpVendorList.getVendorList).toHaveBeenCalled();

      expect(cmpConsent.displayConsentUi).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).not.toHaveBeenCalled(); //display is still on..
      jasmine.clock().tick(201);
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );
    });

    it(' with cookie, config.display = null, user is in not eu, does not display UI, but calls executePendingCalls', function() {
      spyOn(cmpCookie, 'getCookie').and.callFake(function(cb) {
        setTimeout(function() {
          cb({ status: 'parsed' });
        }, 200);
      });

      spyOn(cmpGeo, 'fetchIsUserInEU').and.callFake(function(callback) {
        cmpGeo.isUserInEU = false;
        callback(false);
      });

      cmpConfig.displayUi = null;
      cmpInit.init();

      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
      expect(cmpGeo.checkUserIsInEU).toHaveBeenCalled();
      expect(cmpInit.initConsentState).not.toHaveBeenCalled();
      expect(cmpCookie.getCookie).not.toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalled();
      expect(cmpUtils.executePendingCalls).toHaveBeenCalledWith(
        cmpConsent.callbacksWaitingForConsent
      );

      jasmine.clock().tick(201);
      //its past 200ms.
      expect(cmpVendorList.getVendorList).not.toHaveBeenCalled(); //this will be called by displayUi
      expect(cmpConsent.displayConsentUi).not.toHaveBeenCalled();
    });
  });
});
