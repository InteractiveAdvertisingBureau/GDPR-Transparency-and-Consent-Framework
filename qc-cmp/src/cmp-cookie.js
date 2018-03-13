import { getJson, logError } from './cmp-utils.js';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\
// *                          Cookie Functions                         * \\
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \\

var cookieUrl = 'https://cmp-demo.qccerttest.com/CookieAccess';
var cookieName = 'EuConsent';

// the last status/value from a cookie fetch
var cachedCookie = null;

// when cookie get is in-progress, set to an array of the callbacks
var cookieGetCallbacks = null;

/* TODO set this depending on if the cookie is global or service specific */
var isGlobalScope = true;

var handleSetCookie = function(httpRequest, callback) {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      callback({ status: 'success' });
    } else {
      logError('The set cookie request failed with status', httpRequest.status);
      callback({ status: 'error' });
    }
  }
};

var handleGetCookie = function(httpRequest) {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    var cookie;
    if (httpRequest.status === 200) {
      cookie = cachedCookie = { value: httpRequest.response[cookieName] };
      try {
        consentValues.setAll(cookie.value);
        cookie.status = 'parsed';
      } catch (nfe) {
        logError('Error parsing cookie', nfe);
        cookie.status = 'parse-error';
      }
    } else if (httpRequest.status === 404) {
      cookie = cachedCookie = { status: 'notfound' };
    } else {
      cookie = { status: 'error' };
    }
    for (var i = 0; i < cookieGetCallbacks.length; i++) {
      cookieGetCallbacks[i](cookie);
    }
    cookieGetCallbacks = undefined;
  }
};

var setCookie = function(cookieValue, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    handleSetCookie(httpRequest, callback);
  };
  httpRequest.open('POST', cookieUrl);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.withCredentials = true;
  httpRequest.send(JSON.stringify({ [cookieName]: cookieValue }));
};

// immediately callback with the cached cookie status or
// queue the callback for when the cookie is returned
var getCookie = function(callback) {
  if (cachedCookie) {
    callback(cachedCookie);
  } else if (cookieGetCallbacks) {
    // if there's a pending cookie fetch, queue up the callback
    cookieGetCallbacks.push(callback);
  } else {
    cookieGetCallbacks = [callback];
    getJson({ url: cookieUrl, withCredentials: true }, function(httpRequest) {
      handleGetCookie(httpRequest);
    });
  }
};

var setPurposesCookie = function(purposes) {
  //assuming the purposes are passed as list of id:consent list object
  document.cookie = 'cmp_purposes=' + JSON.stringify(encodeURIComponent(purposes));
};

var getPurposesCookie = function() {
  //cookies might be as xxx=abc;cmp_purposes={1:true, 2:false, advertising:true}
  var purposes = document.cookie
    .split(';')
    .filter(function(s) {
      s.trim().startsWith('cmp_purposes=');
    })
    .substring(13);
  if (purposes !== null) {
    return JSON.parse(decodeURIComponent(purposes));
  }
};

var consentValues = (function() {
  var fieldSize = {
    version: 6,
    created: 36,
    lastUpdated: 36,
    cmpId: 12,
    cmpVersion: 6,
    consentScreen: 6,
    consentLanguage: 12,
    vendorListVersion: 12,
    purposesAllowed: 24,
    maxVendorId: 16,
    encodingType: 1,
    numEntries: 12,
    defaultConsent: 1,
    isRange: 1,
    startVendorId: 16,
    endVendorId: 16
  };
  var Data = (function() {
    var COOKIE_VERSION = 1;
    var CMP_ID = 1;
    var CMP_VERSION = 1;
    var LOWERCASE_START = 'a'.charCodeAt(0);
    var BITFIELD_ENCODING = 0;
    var RANGES_ENCODING = 1;
    // some (fifty) zeros to pad with, since IE doesn't have String.repeat()
    // needs at least as many zeros as the largest binary field (36 bits)
    var PAD_ZEROS = '00000000000000000000000000000000000000000000000000';
    var BinaryField = function() {
      this.binaryStr = '';
      this.addField = function(value, bits, fieldName) {
        var binary = (value + 0 || 0).toString(2);
        if (binary.length < bits) {
          binary = PAD_ZEROS.substr(0, bits - binary.length) + binary;
        } else if (binary.length > bits) {
          throw new Error('Encountered an overflow setting cookie field ' + fieldName);
        }
        this.binaryStr += binary;
      };
    };

    return {
      build: function(fields) {
        fields['version'] = COOKIE_VERSION;
        fields['cmpId'] = CMP_ID;
        fields['cmpVersion'] = CMP_VERSION;

        var binaryStr = Data.encodeBinary(fields);
        var bytes = Data.binaryToBytes(binaryStr);
        return Data.toWebSafeBase64(bytes);
      },
      setAll: function(value) {
        var bytes = Data.fromWebSafeBase64(value);
        var binary = Data.bytesToBinary(bytes);
        return Data.decodeBinary(binary);
      },
      bytesToBinary: function(bytes) {
        var binaryStr = '';
        // optimized binary conversion & loop
        var nibbles = [
          '0000',
          '0001',
          '0010',
          '0011',
          '0100',
          '0101',
          '0110',
          '0111',
          '1000',
          '1001',
          '1010',
          '1011',
          '1100',
          '1101',
          '1110',
          '1111'
        ];
        var binary8 = function(byte) {
          return nibbles[(byte >>> 4) & 0xf] + nibbles[byte & 0xf];
        };
        for (var i = 0; i < bytes.length; i++) {
          binaryStr += binary8(bytes.charCodeAt(i));
        }
        // object that stores a binary string ('010101'), gets integer fields from the string, and keeps track of the current position
        var binary = {
          string: binaryStr,
          atPos: 0,
          // returns the next integer field of size 'bits', advancing the position 'atPos'
          getBits: function(bits) {
            var val = parseInt(this.string.substr(this.atPos, bits), 2);
            this.atPos += bits;
            return val;
          }
        };
        return binary;
      },
      binaryToBytes: function(binary) {
        var bytes = '';
        // pad binary string to multiple of 8 bits
        binary = binary + PAD_ZEROS.substr(0, 7 - (binary.length + 7) % 8);
        for (var i = 0; i < binary.length; i += 8) {
          bytes += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
        }
        return bytes;
      },
      toWebSafeBase64: function(bytes) {
        // TODO: polyfill btoa for IE8/9
        return btoa(bytes)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      },
      fromWebSafeBase64: function(base64) {
        // TODO: polyfill atob for IE8/9
        return atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
      },
      // converts a number to a two-letter language code ("en")
      languageFromCookieValue: function(number) {
        return (
          String.fromCharCode((LOWERCASE_START + number / 64) >>> 0) +
          String.fromCharCode(LOWERCASE_START + number % 64)
        );
      },
      // converts a two-letter language code ("en") to a number
      languageToCookieValue: function(lang) {
        return (lang.charCodeAt(0) - LOWERCASE_START) * 64 + (lang.charCodeAt(1) - LOWERCASE_START);
      },
      dateFromDeciseconds: function(deciseconds) {
        return new Date(deciseconds * 100);
      },
      dateToDeciseconds: function(date) {
        return Math.floor(date.getTime() / 100);
      },
      decodeBinary: function(binary) {
        var version = binary.getBits(fieldSize.version);
        if (version != COOKIE_VERSION) {
          throw new Error('Cookie version ' + version + ' is not supported');
        }
        var fields = {
          version: version,
          created: Data.dateFromDeciseconds(binary.getBits(fieldSize.created)),
          lastUpdated: Data.dateFromDeciseconds(binary.getBits(fieldSize.lastUpdated)),
          cmpId: binary.getBits(fieldSize.cmpId),
          cmpVersion: binary.getBits(fieldSize.cmpVersion),
          consentScreen: binary.getBits(fieldSize.consentScreen),
          consentLanguage: Data.languageFromCookieValue(binary.getBits(fieldSize.consentLanguage)),
          vendorListVersion: binary.getBits(fieldSize.vendorListVersion),
          purposesAllowed: binary.getBits(fieldSize.purposesAllowed),
          maxVendorId: binary.getBits(fieldSize.maxVendorId),
          encodingType: binary.getBits(fieldSize.encodingType)
        };
        var maxVendorId = fields.maxVendorId;
        var vendorConsents = new Array(maxVendorId + 1);
        if (fields.encodingType == BITFIELD_ENCODING) {
          var bitsLeft = binary.string.length - binary.atPos;
          if (bitsLeft < maxVendorId) {
            throw new Error('Incorrect bitfield size: ' + bitsLeft + ' < ' + maxVendorId);
          }
          for (var i = 0; i < maxVendorId; i++) {
            // vendorIds and vendorConsents are 1-based
            vendorConsents[i + 1] = binary.string.charAt(binary.atPos + i) == '1';
          }
        } else {
          // range encoding
          fields.defaultConsent = binary.getBits(fieldSize.defaultConsent) == 1;
          for (var i = 0; i < maxVendorId; i++) {
            vendorConsents[i + 1] = fields.defaultConsent;
          }
          fields.numEntries = binary.getBits(fieldSize.numEntries);
          for (var i = 0; i < fields.numEntries; i++) {
            var isRange = binary.getBits(fieldSize.isRange) == 1;
            var startVendorId = binary.getBits(fieldSize.startVendorId);
            var endVendorId = isRange ? binary.getBits(fieldSize.endVendorId) : startVendorId;
            if (binary.atPos > binary.string.length) {
              throw new Error('Not enough bits for numEntries in ranges');
            }
            if (startVendorId > endVendorId || endVendorId > maxVendorId) {
              throw new Error(
                'Invalid vendorId range: ' +
                  startVendorId +
                  '-' +
                  endVendorId +
                  '. The max valid vendorId is: ' +
                  maxVendorId
              );
            }
            for (var vendorId = startVendorId; vendorId <= endVendorId; vendorId++) {
              vendorConsents[vendorId] = !fields.defaultConsent;
            }
          }
        }
        fields.vendorConsents = vendorConsents;
        return fields;
      },
      /* Helper function for encodeBinary.
           If range encoding shorter than bitfield, returns:
             {binary: BinaryField object, numEntries: num, defaultConsent: 1/0 }
           otherwise, returns null */
      encodeRanges: function(fields) {
        // start with range encoding, stop if it becomes longer than bitfield encoding
        var ranges = new BinaryField();
        var vendorConsents = fields.vendorConsents;
        var extraBits = 13;
        var defaultConsent = !!vendorConsents[1];
        var startRange;
        var endRange;
        var rangeStarted = false;
        var maxVendorId = fields.maxVendorId;
        var numEntries = 0;
        for (var i = 2; i <= maxVendorId; i++) {
          var inRange = !!vendorConsents[i] != !!defaultConsent;
          if (inRange) {
            if (!rangeStarted) {
              startRange = i;
              rangeStarted = true;
            }
            endRange = i;
          }
          // if we've reached the end of a range, record it
          if (rangeStarted && (!inRange || i == maxVendorId)) {
            numEntries++;
            var isRange = endRange > startRange;
            ranges.addField(isRange ? 1 : 0, fieldSize.isRange, 'isRange');
            ranges.addField(startRange, fieldSize.startVendorId, 'startVendorId');
            if (isRange) {
              ranges.addField(endRange, fieldSize.endVendorId, 'endVendorId');
            }
            // if we're longer than bitfield encoding, return null
            if (extraBits + ranges.binaryStr.length > maxVendorId) {
              return null;
            }
            rangeStarted = false;
          }
        }
        return {
          binary: ranges,
          defaultConsent: defaultConsent ? 1 : 0,
          numEntries: numEntries
        };
      },
      encodeBinary: function(fields) {
        var vendorConsents = fields.vendorConsents;
        var binary = new BinaryField();
        if (fields.version != COOKIE_VERSION) {
          throw new Error('version ' + fields.version + ' not supported');
        }
        binary.addField(fields.version, fieldSize.version, 'version');
        binary.addField(Data.dateToDeciseconds(fields.created), fieldSize.created, 'created');
        binary.addField(
          Data.dateToDeciseconds(fields.lastUpdated),
          fieldSize.lastUpdated,
          'lastUpdated'
        );
        binary.addField(fields.cmpId, fieldSize.cmpId, 'cmpId');
        binary.addField(fields.cmpVersion, fieldSize.cmpVersion, 'cmpVersion');
        binary.addField(fields.consentScreen, fieldSize.consentScreen, 'consentScreen');
        binary.addField(
          Data.languageToCookieValue(fields.consentLanguage || 'en'),
          fieldSize.consentLanguage,
          'consentLanguage'
        );
        binary.addField(fields.vendorListVersion, fieldSize.vendorListVersion, 'vendorListVersion');
        binary.addField(fields.purposesAllowed, fieldSize.purposesAllowed, 'purposesAllowed');
        binary.addField(fields.maxVendorId, fieldSize.maxVendorId, 'maxVendorId');

        var ranges = Data.encodeRanges(fields);

        fields.encodingType = ranges ? RANGES_ENCODING : BITFIELD_ENCODING;
        binary.addField(fields.encodingType, fieldSize.encodingType, 'encodingType');
        if (fields.encodingType == BITFIELD_ENCODING) {
          for (var i = 1; i <= fields.maxVendorId; i++) {
            binary.binaryStr += vendorConsents[i] ? '1' : '0';
          }
        } else {
          fields.defaultConsent = ranges.defaultConsent;
          fields.numEntries = ranges.numEntries;
          binary.addField(fields.defaultConsent, fieldSize.defaultConsent, 'defaultConsent');
          binary.addField(fields.numEntries, fieldSize.numEntries, 'numEntries');
          binary.binaryStr += ranges.binary.binaryStr;
        }
        return binary.binaryStr;
      }
    };
  })();

  /* field keys & types
         *=settable, #=fixed, @=code-determined
            # version: 6bit-int
            @ created: Date (stored as 36bit deciseconds)
            @ lastUpdated: Date (stored as 36bit deciseconds)
            # cmpId: 12bit-int
            # cmpVersion: 6bit-int
            * consentScreen: 6bit-int
            * consentLanguage: String ("en") (stored as 12bit encoding)
            * vendorListVersion: 12bit-int
            * purposesAllowed: 24bit-int
            * maxVendorId: 16bit-int
            @ encodingType: 1bit-int
            * vendorConsents: Array(Boolean) (stored as bitfield or range-encoding)
            (if encodingType==1)
             @ defaultConsent: 1bit-int
             @ numEntries: 12bit-int
      */

  var fields = { vendorConsents: [] };

  /* ConsentValues functions. Fields described above. Fields are a singleton */
  return {
    // TODO: include getters, setters for all fields
    setMaxVendorId: function(num) {
      fields.maxVendorId = num;
    },
    /* set vendorId (1-based) to consentState (true/false) */
    setVendorConsent: function(consentState, vendorId) {
      fields.vendorConsents[vendorId] = !!consentState;
    },
    /* get the meta data for this consent object */
    getMetadata: function(compressed) {
      if (compressed) {
        //TODO: return the encoded metadata
      } else {
        //TODO: return the metadata as key:value json list
      }
      return null;
    },
    getLastUpdated: function() {
      return fields.lastUpdated;
    },
    /* get consent state (true/false) from vendorId (1-based) */
    getVendorConsent: function(vendorId) {
      return vendorId ? !!fields.vendorConsents[vendorId] : fields.vendorConsents;
    },
    /* set purposeId (1-based, 1-24) to consentState (true/false) */
    setPurposeConsent: function(consentState, purposeId) {
      var mask = 1 << (fieldSize.purposesAllowed - purposeId);
      fields.purposesAllowed = consentState
        ? fields.purposesAllowed | mask
        : fields.purposesAllowed & ~mask;
    },
    /* get consent state (true/flase) from purposeId (1-based) */
    getPurposeConsent: function(purposeId) {
      //TODO: update purpose consents to match how vendor consents work.
      if (purposeId) {
        var mask = 1 << (fieldSize.purposesAllowed - purposeId);
        return (fields.purposesAllowed & mask) != 0;
      } else {
        var purposeConsents = {};
        for (var i = 1; i < fieldSize.purposesAllowed + 1; i++) {
          var mask = 1 << (fieldSize.purposesAllowed - i);
          purposeConsents[i] = (fields.purposesAllowed & mask) != 0;
        }
        return purposeConsents;
      }
    },
    getVendorListVersion: function() {
      return fields.vendorListVersion;
    },
    /* build the base64-encoded cookie value string from stored 'field' values*/
    build: function() {
      if (!fields.created) fields.created = new Date();
      fields.lastUpdated = new Date();
      // TODO: check that all required fields are set
      return Data.build(fields);
    },
    /* parse a base64-encoded cookie value string into stored 'field' values */
    setAll: function(value) {
      fields = Data.setAll(value);
    }
  };
})();

var cmpCookie = {
  isGlobalScope: isGlobalScope,
  consentValues: consentValues,
  setPurposesCookie: setPurposesCookie,
  getPurposesCookie: getPurposesCookie,
  setCookie: setCookie,
  getCookie: getCookie
};

export default cmpCookie;
