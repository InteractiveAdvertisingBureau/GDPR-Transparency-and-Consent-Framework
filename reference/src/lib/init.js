import { h, render } from 'preact';
import Promise from 'promise-polyfill';
import Store from './store';
import Cmp, { CMP_GLOBAL_NAME } from './cmp';
import { readVendorConsentCookie, readPublisherConsentCookie } from './cookie/cookie';
import { fetchVendorList, fetchPurposeList } from './vendor';
import log from './log';
import pack from '../../package.json';
import config from './config';


export function init(configUpdates) {
	config.update(configUpdates);
	log.debug('Using configuration:', config);

	// Fetch the current vendor consent before initializing
	return readVendorConsentCookie()
		.then(vendorConsentData => {

			// Initialize the store with all of our consent data
			const store = new Store({vendorConsentData, publisherConsentData: readPublisherConsentCookie()});

			// Pull queued command from __cmp stub
			const {commandQueue = []} = window[CMP_GLOBAL_NAME] || {};

			// Replace the __cmp with our implementation
			const cmp = new Cmp(store);

			// Expose `processCommand` as the CMP implementation
			window[CMP_GLOBAL_NAME] = cmp.processCommand;

			// Execute any previously queued command
			commandQueue.forEach(({callId, command, parameter, callback, event}) => {
				// If command is queued with an event we will relay its result via postMessage
				if (event) {
					cmp.processCommand(command, parameter, result =>
						event.source.postMessage({
							[CMP_GLOBAL_NAME]: {
								callId,
								command,
								result
							}
						}, event.origin));
				}
				else {
					cmp.processCommand(command, parameter, callback);
				}
			});

			// Render the UI
			const App = require('../components/app').default;
			render(<App store={store} notify={cmp.notify} />, document.body);

			// Notify listeners that the CMP is loaded
			log.debug(`Successfully loaded CMP version: ${pack.version}`);
			cmp.isLoaded = true;
			cmp.notify('isLoaded');

			// Request lists
			return Promise.all([
				fetchVendorList().then(store.updateVendorList),
				fetchPurposeList().then(store.updateCustomPurposeList)
			]).then(() => {
				cmp.cmpReady = true;
				cmp.notify('cmpReady');
			}).catch(err => {
				log.error('Failed to load lists. CMP not ready', err);
			});
		})
		.catch(err => {
			log.error('Failed to load CMP', err);
		});
}


