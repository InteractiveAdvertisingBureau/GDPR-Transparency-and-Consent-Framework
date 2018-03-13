export var MILLISEC_DAY = 86400000; //60 * 60 * 24 * 1000

export var getJson = function(params, requestHandler) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    requestHandler(httpRequest);
  };
  httpRequest.open('GET', params.url);
  httpRequest.withCredentials = !!params.withCredentials;
  httpRequest.responseType = 'json';
  httpRequest.send();
};

export var logError = function(msg, error) {
  console.error(msg + ': ' + error + (error && error.stack ? '\n' + error.stack : ''));
};

export var CallbackArray = function() {
  var obj = {
    cbArray: [],
    push: function(func, arg) {
      if (typeof func === 'function') {
        this.cbArray.push({ func: func, arg: arg });
      } else {
        throw 'Should push only functions into Callback array. Trying to push ' + typeof func;
      }
    },
    call: function(val) {
      while (this.cbArray.length > 0) {
        var callback = this.cbArray.shift();
        if (callback.arg) {
          callback.func(callback.arg, val);
        } else {
          callback.func(val);
        }
      }
      this.cbArray = [];
    },
    size: function() {
      return this.cbArray.length;
    }
  };
  return obj;
};

export const executePendingCalls = function(pendingCallbacks) {
  // run any pending calls
  while (pendingCallbacks.length > 0) {
    try {
      var cmd = pendingCallbacks.shift();
      if (!cmd || cmd[0] === 'init') {
        // We already initialized! Do not init again!
        continue;
      }
      window.__cmp.apply(null, cmd);
    } catch (nfe) {
      logError('Error running pending call', nfe);
    }
  }
};

export const isArray = function(value) {
  return value && typeof value === 'object' && value.constructor === Array;
};
