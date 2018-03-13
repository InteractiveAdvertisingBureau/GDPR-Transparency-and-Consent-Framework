import { getPublisherConsents, getVendorConsents } from '../src/cmp-consent';
import cmpCookie from '../src/cmp-cookie';
import cmpGeo from '../src/cmp-geo';
import cmpInit from '../src/cmp-init';

describe('CMP Consents', function() {
  describe('getPurposeConsent when consents are initialized', function() {
    cmpInit.isInitialized = true;

    var publisherConsents;
    var status;
    var getPurposeConsentCallback = function(_pubilsherConsents, _status) {
      publisherConsents = _pubilsherConsents;
      status = _status;
    };

    var expectedPublisherConsents = { 1: true, 2: false, 3: true, 4: false, 5: true };
    beforeEach(function() {
      spyOn(cmpCookie.consentValues, 'getPurposeConsent').and.callFake(function(purposeId) {
        if (!purposeId) {
          return expectedPublisherConsents;
        } else {
          return expectedPublisherConsents[purposeId];
        }
      });
    });

    it('should not do anything when an invalid callback is sent', function() {
      getPublisherConsents();
      expect(cmpCookie.consentValues.getPurposeConsent).not.toHaveBeenCalled();

      getPublisherConsents(null, 'not a callback');
      expect(cmpCookie.consentValues.getPurposeConsent).not.toHaveBeenCalled();
    });

    it('should return all purpose consents when given purpose ids are undefined or null', function() {
      getPublisherConsents(null, getPurposeConsentCallback);
      expect(publisherConsents).toEqual({
        standardConsents: { 1: true, 2: false, 3: true, 4: false, 5: true }
      });
      expect(status).toBeTruthy();

      getPublisherConsents(undefined, getPurposeConsentCallback);
      expect(publisherConsents).toEqual({
        standardConsents: { 1: true, 2: false, 3: true, 4: false, 5: true }
      });
      expect(status).toBeTruthy();

      getPublisherConsents([], getPurposeConsentCallback);
      expect(publisherConsents).toEqual({
        standardConsents: { 1: true, 2: false, 3: true, 4: false, 5: true }
      });
      expect(status).toBeTruthy();
    });

    it('should return a valid consents object when given a valid array of purpose ids', function() {
      getPublisherConsents([1, 3, 4], getPurposeConsentCallback);
      expect(publisherConsents).toEqual({ standardConsents: { 1: true, 3: true, 4: false } });
      expect(status).toBeTruthy();
    });

    it('should return null consent with false status when given a non array for purpose ids', function() {
      var arrayLikeObject = {
        0: 1,
        1: 3,
        2: 4,
        length: 3
      };
      getPublisherConsents(arrayLikeObject, getPurposeConsentCallback);
      expect(publisherConsents).toEqual({ standardConsents: null });
      expect(status).toBeFalsy();

      getPublisherConsents(1, getPurposeConsentCallback);
      expect(publisherConsents).toEqual({ standardConsents: null });
      expect(status).toBeFalsy();
    });
  });

  describe('getVendorConsents when consents are initialized', function() {
    cmpInit.isInitialized = true;
    cmpCookie.isGlobalScope = true;
    cmpGeo.isUserInEU = true;

    var vendorConsents;
    var status;
    var getVendorConsentsCallback = function(_vendorConsents, _status) {
      vendorConsents = _vendorConsents;
      status = _status;
    };

    var expectedVendorConsents = [undefined, true, false, true, false, true, false, true, false];
    var expectedPublisherConsents = { 1: true, 2: false, 3: true, 4: false, 5: true };

    beforeEach(function() {
      spyOn(cmpCookie.consentValues, 'getVendorConsent').and.callFake(function(vendorId) {
        if (!vendorId) {
          return expectedVendorConsents;
        } else {
          return expectedVendorConsents[vendorId];
        }
      });
      spyOn(cmpCookie.consentValues, 'getPurposeConsent').and.callFake(function(purposeId) {
        if (!purposeId) {
          return expectedPublisherConsents;
        } else {
          return expectedPublisherConsents[purposeId];
        }
      });
    });

    it('should return a valid consents object when given a valid array of vendor ids', function() {
      getVendorConsents([1, 2, 3, 5, 6], getVendorConsentsCallback);
      var expectedResult = {
        metadata: null,
        isUserInEU: true,
        hasGlobalConsent: true,
        purposes: expectedPublisherConsents,
        vendorConsents: { 1: true, 2: false, 3: true, 5: true, 6: false }
      };
      expect(vendorConsents).toEqual(expectedResult);
      expect(status).toBeTruthy();

      getVendorConsents([3, 5], getVendorConsentsCallback);
      expectedResult = {
        metadata: null,
        isUserInEU: true,
        hasGlobalConsent: true,
        purposes: expectedPublisherConsents,
        vendorConsents: { 3: true, 5: true }
      };
      expect(vendorConsents).toEqual(expectedResult);
      expect(status).toBeTruthy();

      getVendorConsents([5], getVendorConsentsCallback);
      expectedResult = {
        metadata: null,
        isUserInEU: true,
        hasGlobalConsent: true,
        purposes: expectedPublisherConsents,
        vendorConsents: { 5: true }
      };
      expect(vendorConsents).toEqual(expectedResult);
      expect(status).toBeTruthy();
    });
  });
});
