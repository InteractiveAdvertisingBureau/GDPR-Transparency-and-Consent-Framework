describe('CMP iframe API', function() {
  var result;

  beforeAll(function(done) {
    // publisher should copy/paste iframeAdMsgHandler() and the if/else below to the publisher site

    var iframeAdMsgHandler = function(event) {
      var origin = event.origin;
      if (!window.__cmp) {
        setTimeout(function() {
          this.postMessage(event.data, origin);
        }, 50);
        return;
      }

      var json;
      if (typeof event.data === 'string') {
        // cannot postMessage a json object in IE.
        json = JSON.parse(event.data);
      } else {
        json = event.data;
      }

      if (json.__cmpCall) {
        var obj = json.__cmpCall;

        var iframeCallback = function(data, status) {
          if (window.addEventListener == undefined) {
            // for IE
            data = JSON.stringify(data);
          }
          var result = {
            __cmpReturn: {
              returnValue: data,
              success: status,
              callId: obj.callId
            }
          };
          event.source.postMessage(result, origin);
        };

        __cmp(obj.command, obj.parameter, iframeCallback);
      }
    };

    if (window.addEventListener == undefined) {
      window.attachEvent('onmessage', iframeAdMsgHandler); // for IE
    } else {
      window.addEventListener('message', iframeAdMsgHandler, false);
    }
    // -------------------------------------------------------------------------------------------------

    jasmine.addMatchers(DOMCustomMatchers);
    if (karmaHTML.iframeContent.ready) {
      karmaHTML.iframeContent.reload();
    } else {
      karmaHTML.iframeContent.open();
    }

    var consentInfo = {
      vendorConsents: [true, true, true, false, true],
      purposeConsents: [true, false, true, true],
      vendorList: {
        purposes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }],
        vendors: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }]
      }
    };

    __cmp('saveConsents', consentInfo, function() {});

    karmaHTML.iframeContent.onstatechange = function(ready) {
      if (ready) {
        var fetchResultInterval = window.setInterval(function() {
          var _document = karmaHTML.iframeContent.document;
          result = _document.getElementById('msgDisplay').innerHTML;
          if (result) done();
        }, 100);
      }
    };
  });

  it('should receive the correct consents info', function() {
    var expected = JSON.stringify({
      __cmpReturn: {
        returnValue: {
          metadata: null,
          isUserInEU: false,
          hasGlobalConsent: true,
          purposes: {
            1: true,
            2: false,
            3: true,
            4: false,
            5: true,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
            20: false,
            21: false,
            22: false,
            23: false,
            24: false
          },
          vendorConsents: { 1: true, 2: true, 3: true, 5: false, 6: true }
        },
        success: true,
        callId: 1
      }
    });
    expect(result).toBe(expected);
  });
});
