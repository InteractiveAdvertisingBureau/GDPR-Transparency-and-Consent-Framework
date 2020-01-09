/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import { openGlobalVendorPortal, sendPortalCommand } from './portal';

describe('portal', () => {
	const rootWindow = window;

	// Mock the iframe behavior of sending back messages
	openGlobalVendorPortal().then(iframe => {
		iframe.contentWindow.addEventListener('message', event => {
			const data = event.data.vendorConsent;
			const { command } = data;
			if (command === 'readCookie') {
				rootWindow.postMessage({
					vendorConsent: {
						...data,
						result: true
					}
				}, '*');
			}
		});
	});

	// Mock message back from opened iframe
	rootWindow.postMessage({ vendorConsent: { command: 'isLoaded' } }, '*');

	it('openGlobalVendorPortal opens an iframe', (done) => {
		openGlobalVendorPortal().then(iframe => {
			expect(iframe).to.not.be.undefined;
			done();
		});
	});

	it('sendPortalCommand opens an iframe', (done) => {

		sendPortalCommand({ command: 'readCookie' })
			.then(result => {
				expect(result).to.equal(true);
				done();
			});
	});


});
