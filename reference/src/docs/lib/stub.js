
function buildScript(config, cmpLocation='../cmp.bundle.js') {
	return `(function(window, document) {
		if (!window.__cmp) {
			window.__cmp = (function() {
				window.addEventListener('message', function(event) {
					window.__cmp.receiveMessage(event);
				});
		
				var commandQueue = [];
				var cmp = function(command, parameter, callback) {
					commandQueue.push({
						command: command,
						parameter: parameter,
						callback: callback
					});
				}
				cmp.commandQueue = commandQueue;
				cmp.receiveMessage = function(event) {
					var data = event && event.data && event.data.__cmp;
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
