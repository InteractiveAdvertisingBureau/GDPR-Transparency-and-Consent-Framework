import cmpCookie from '../src/cmp-cookie.js';

describe('Test consentValues.js', function() {
  var consentValues = cmpCookie.consentValues;

  it('alternating consent pattern round-trips', function() {
    consentValues.setMaxVendorId(5);
    consentValues.setVendorConsent(true, 1);
    consentValues.setVendorConsent(false, 2);
    consentValues.setVendorConsent(true, 3);
    consentValues.setVendorConsent(false, 4);
    consentValues.setVendorConsent(true, 5);

    var cookieValue = consentValues.build();
    // change the consent values to the opposite
    consentValues.setVendorConsent(false, 1);
    consentValues.setVendorConsent(true, 2);
    consentValues.setVendorConsent(false, 3);
    consentValues.setVendorConsent(true, 4);
    consentValues.setVendorConsent(false, 5);

    // restore the consent values using the encoded string value
    consentValues.setAll(cookieValue);

    expect(consentValues.getVendorConsent(1)).toBe(true);
    expect(consentValues.getVendorConsent(2)).toBe(false);
    expect(consentValues.getVendorConsent(3)).toBe(true);
    expect(consentValues.getVendorConsent(4)).toBe(false);
    expect(consentValues.getVendorConsent(5)).toBe(true);
  });
});
