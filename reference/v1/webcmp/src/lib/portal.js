import config from "./config";
import Promise from "promise-polyfill";

const PORTAL_LOAD_TIMEOUT_MILLISECONDS = 5000;
const PORTAL_COMMAND_TIMEOUT_MILLISECONDS = 2000;

// Promise resolved with vendor iframe reference
let globalVendorPortal;

// Number of calls to vendor portal
let portalCallCount = 0;

// Map of callId to Promise.resolve to execute on completion
const portalCallMap = {};

/**
 * Open an iframe to a page on the vendor domain that supports
 * two way communication via postMessage
 *
 * @returns Promise resolved with the iframe reference
 */
function openGlobalVendorPortal() {
	// Only ever create a single iframe
	if (!globalVendorPortal) {
		globalVendorPortal = new Promise((resolve, reject) => {
			const url = config.globalConsentLocation;
			const iframe = document.createElement('iframe');
			iframe.setAttribute('style', 'width:1px;height:1px;position:absolute;left:-99px;top:-99px;');
			iframe.setAttribute('src', url);
			document.body.appendChild(iframe);

			let portalTimeout = setTimeout(() => {
				reject(new Error(`Communication could not be established with the vendor domain within ${PORTAL_LOAD_TIMEOUT_MILLISECONDS} milliseconds`));
			}, PORTAL_LOAD_TIMEOUT_MILLISECONDS);

			// Add listener for messages from iframe
			window.addEventListener('message', event => {
				// Only look at messages with the vendorConsent property
				const data = event.data.vendorConsent;
				if (data) {
					// The iframe has loaded
					if (data.command === 'isLoaded' && portalTimeout) {
						clearTimeout(portalTimeout);
						portalTimeout = undefined;
						resolve(iframe);
					}
					else {
						// Resolve the promise mapped by callId
						const queued = portalCallMap[data.callId];
						if (queued) {
							const {resolve, timeout} = queued;
							delete portalCallMap[data.callId];
							clearTimeout(timeout);
							resolve(data.result);
						}
					}
				}
			});
		});
	}
	return globalVendorPortal;
}

/**
 * Send a command via postMessage to our portal on the
 * vendors domain.
 *
 * @returns Promise resolved with postMessage response result
 */
function sendPortalCommand(message) {
	// Increment counter to use as unique callId
	const callId = `vp:${++portalCallCount}`;

	return new Promise((resolve, reject) => {
		// Make sure iframe is loaded
		return openGlobalVendorPortal().then(iframe => {

			let timeout = setTimeout(() => {
				delete portalCallMap[callId];
				reject(new Error(`${message.command} response not received from vendor domain within ${PORTAL_COMMAND_TIMEOUT_MILLISECONDS} milliseconds`));
			}, PORTAL_COMMAND_TIMEOUT_MILLISECONDS);

			// Store the resolve function and timeout in the map
			portalCallMap[callId] = {resolve, timeout};

			// Send the message to the portal
			iframe.contentWindow.postMessage({
				vendorConsent: {
					callId,
					...message
				}
			}, '*');
		}).catch(reject);
	});
}

export {
	openGlobalVendorPortal,
	sendPortalCommand
};
