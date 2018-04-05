/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import customPurposeList from '../docs/assets/purposes.json';

import Store from './store';
import Cmp from './cmp';

jest.mock('./log');
const mockLog = require('./log').default;

const vendorList = {
	"version": 1,
	"origin": "http://ib.adnxs.com/vendors.json",
	"purposes": [
		{
			"id": 1,
			"name": "Accessing a Device or Browser"
		},
		{
			"id": 2,
			"name": "Advertising Personalisation"
		},
		{
			"id": 3,
			"name": "Analytics"
		},
		{
			"id": 4,
			"name": "Content Personalisation"
		}
	],
	"vendors": [
		{
			"id": 1,
			"name": "Globex"
		},
		{
			"id": 2,
			"name": "Initech"
		},
		{
			"id": 3,
			"name": "CRS"
		},
		{
			"id": 4,
			"name": "Umbrella"
		},
		{
			"id": 5,
			"name": "Aperture"
		},
		{
			"id": 6,
			"name": "Pierce and Pierce"
		}
	]
};

describe('cmp', () => {

	let cmp;

	beforeEach(() => {
		cmp = new Cmp(new Store({ vendorList, customPurposeList }));
	});

	describe('processCommand', () => {

		it('logs error on invalid command', () => {
			mockLog.error = jest.fn();
			cmp.processCommand('fakeCommand');
			expect(mockLog.error.mock.calls[0][0]).to.contain('Invalid CMP command');
		});

		it('getPublisherConsents executes', (done) => {
			cmp.processCommand('getPublisherConsents', null, data => {
				expect(Object.keys(data.standardPurposes).length).to.equal(vendorList.purposes.length);
				expect(Object.keys(data.customPurposes).length).to.equal(customPurposeList.purposes.length);
				done();
			});
		});

		it('getPublisherConsents returns only persisted data', (done) => {
			cmp.store.selectPurpose(1, true);
			cmp.processCommand('getPublisherConsents', null, data => {
				expect(data.standardPurposes['1']).to.be.false;
				cmp.store.persist();

				cmp.processCommand('getPublisherConsents', null, data => {
					expect(data.standardPurposes['1']).to.be.true;
					done();
				});
			});
		});

		it('getVendorConsents executes', (done) => {
			cmp.processCommand('getVendorConsents', null, data => {
				expect(Object.keys(data.purposes).length).to.equal(vendorList.purposes.length);
				expect(Object.keys(data.vendorConsents).length).to.equal(vendorList.vendors.length);
				done();
			});
		});

		it('getVendorConsents returns only persisted data', (done) => {
			cmp.store.selectVendor(1, true);
			cmp.processCommand('getVendorConsents', null, data => {
				expect(data.vendorConsents['1']).to.be.false;
				cmp.store.persist();

				cmp.processCommand('getVendorConsents', null, data => {
					expect(data.vendorConsents['1']).to.be.true;
					done();
				});
			});
		});

		it('getConsentData executes', (done) => {
			cmp.processCommand('getConsentData', null, data => {
				expect(data).to.be.undefined;
				done();
			});
		});

		it('getConsentData returns persisted data', (done) => {
			cmp.store.persist();
			cmp.processCommand('getConsentData', null, data => {
				expect(typeof data).to.equal('string');
				expect(data).to.not.be.empty;
				done();
			});
		});

		it('getVendorList executes', (done) => {
			cmp.processCommand('getVendorList', null, data => {
				expect(data.purposes).to.deep.equal(vendorList.purposes);
				expect(data.vendors).to.deep.equal(vendorList.vendors);
				done();
			});
		});

		it('showConsentTool executes', (done) => {
			cmp.processCommand('showConsentTool', null, data => {
				expect(data).to.be.true;
				expect(cmp.store.isConsentToolShowing).to.be.true;
				done();
			});
		});

		describe('addEventListener', () => {

			it('only adds the callback instance once', () => {
				const callback = () => {};

				cmp.processCommand('addEventListener', 'isLoaded', callback);
				cmp.processCommand('addEventListener', 'isLoaded', callback);

				expect(cmp.eventListeners.isLoaded.size).to.equal(1);
			});
		});

		describe('removeEventListener', () => {

			it('removes a specific callback instance', () => {
				const callback = () => {};

				cmp.processCommand('addEventListener', 'isLoaded', callback);
				expect(cmp.eventListeners.isLoaded.size).to.equal(1);

				cmp.processCommand('removeEventListener', 'isLoaded', callback);

				expect(cmp.eventListeners.isLoaded.size).to.equal(0);
			});

			it('removes all listeners of specific event', () => {

				cmp.processCommand('addEventListener', 'isLoaded', () => {});
				cmp.processCommand('addEventListener', 'isLoaded', () => {});
				expect(cmp.eventListeners.isLoaded.size).to.equal(2);

				cmp.processCommand('removeEventListener', 'isLoaded');

				expect(cmp.eventListeners.isLoaded.size).to.equal(0);
			});

			it('removes all listeners for all events', () => {

				cmp.processCommand('addEventListener', 'isLoaded', () => {});
				cmp.processCommand('addEventListener', 'onSubmit', () => {});
				expect(cmp.eventListeners.isLoaded.size).to.equal(1);
				expect(cmp.eventListeners.onSubmit.size).to.equal(1);

				cmp.processCommand('removeEventListener');

				expect(cmp.eventListeners).to.deep.equal({});
			});
		});
	});


	it('notify invokes event listeners', (done) => {
		cmp.processCommand('addEventListener', 'isLoaded', () => {
			done();
		});

		cmp.notify('isLoaded');
	});

	it('processes messages from iframes', () => {
		const source = {
			postMessage: jest.fn()
		};
		const processSpy = jest.spyOn(cmp, 'processCommand');
		cmp.receiveMessage({
			data: {
				__cmp: { command: 'showConsentTool' }
			},
			origin: {},
			source
		});

		expect(processSpy.mock.calls[0][0]).to.equal('showConsentTool');
	});

});
