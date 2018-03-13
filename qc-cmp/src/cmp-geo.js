import { CallbackArray } from './cmp-utils';

var cmpGeo = {
  isUserInEU: null,

  FREE_GEO_IP: 'http://freegeoip.net/json/',

  // country list: https://europa.eu/european-union/about-eu/countries_en#tab-0-0
  // use Object instead of Set since IEs don't support it until IE11.
  EU_COUNTRIES: [
    'AT',
    'BE',
    'BG',
    'CH',
    'CY',
    'CZ',
    'DK',
    'DE',
    'EE',
    'ES',
    'FI',
    'FO',
    'FR',
    'GB',
    'GR',
    'HU',
    'HR',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PO',
    'PT',
    'RO',
    'SE',
    'SI',
    'SK'
  ],

  setUserInEU: function(inEU) {
    this.isUserInEU = inEU;
  },

  fetchIsUserInEU: function(callback) {
    var obj = this;
    var req;

    var isEuCountry = function(code) {
      for (var i = 0; i < obj.EU_COUNTRIES.length; i++) {
        if (obj.EU_COUNTRIES[i] === code) return true;
      }
      return false;
    };

    if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
          var json = JSON.parse(req.response);
          this.isUserInEU = isEuCountry(json.country_code);
          callback(this.isUserInEU);
        }
      };

      req.open('GET', this.FREE_GEO_IP, false);
      req.send();
    } else {
      // for IE 8/9, using XDomainRequest instead of XMLHttpRequest for CORS
      // NOTE: this code path is not tested the api it tries to access (freegeoip.net)
      // doesn't respond with "access-control-allow-origin" header
      req = new window.XDomainRequest();
      req.open('GET', this.FREE_GEO_IP);

      req.onload = function() {
        var json = JSON.parse(req.responseText);
        this.isUserInEU = isEuCountry(json.country_code);
        callback(this.isUserInEU);
      };

      // see the note in example section of
      // https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
      setTimeout(function() {
        req.send();
      }, 0);
    }
  },

  checkUserIsInEUCallbacks: new CallbackArray(),

  checkUserIsInEU: function(callback) {
    if (this.isUserInEU == null) {
      this.checkUserIsInEUCallbacks.push(callback);
      if (this.checkUserIsInEUCallbacks.size() == 1) {
        //call the ip 2 geo api fetchIsUserInEU for the first call
        this.fetchIsUserInEU(function(inEU) {
          cmpGeo.checkUserIsInEUCallbacks.call(inEU);
        });
      }
    } else if (typeof callback === 'function') {
      //isUserInEU already computed
      callback(this.isUserInEU);
    }
  }
};

export default cmpGeo;
