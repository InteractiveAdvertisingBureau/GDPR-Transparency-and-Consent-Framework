
function buildScript(config, cmpLocation='../cmp.bundle.js') {
	return `(function(window, document) {
		if (!window.__cmp) {
			window.__cmp = (function() {
				var listen = window.attachEvent || window.addEventListener;
				listen('message', function(event) {
					window.__cmp.receiveMessage(event);
				}, false);
				
				function addLocatorFrame() {
					if (!window.frames['__cmpLocator']) {
						if (document.body) {
							var frame = document.createElement('iframe');
							frame.style.display = 'none';
							frame.name = '__cmpLocator';
							document.body.appendChild(frame);
						}
						else {
							setTimeout(addLocatorFrame, 5);
						}
					}
				}
				addLocatorFrame();
				
				var commandQueue = [];
				var cmp = function(command, parameter, callback) {
					if (command === 'ping') {
						if (callback) {
							callback({
								gdprAppliesGlobally: !!(window.__cmp && window.__cmp.config && window.__cmp.config.storeConsentGlobally),
								cmpLoaded: false
							}); 
						}
					}
					else {
						commandQueue.push({
							command: command,
							parameter: parameter,
							callback: callback
						});
					}
				}
				cmp.commandQueue = commandQueue;
				cmp.receiveMessage = function(event) {
					var data = event && event.data && event.data.__cmpCall;
					if (data) {
						commandQueue.push({
							callId: data.callId,
							command: data.command,
							parameter: data.parameter,
							event: event
						});
					}
				};
				cmp.config = ${config ? JSON.stringify(config) : `{
					//
					// Modify config values here
					//
					// globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
					// customPurposeListLocation: './purposes.json',
					// globalConsentLocation: './portal.html',
					// storeConsentGlobally: false,
					// storePublisherData: false,
					// logging: 'debug',
					// localization: {},
					// forceLocale: 'en-us'
				}`}
				return cmp;
			}());
			var t = document.createElement('script');
			t.async = false;
			t.src = '${cmpLocation}';
			var tag = document.getElementsByTagName('head')[0];
			tag.append(t);
		}
	})(window, document);`;
}

export {
	buildScript,
};
