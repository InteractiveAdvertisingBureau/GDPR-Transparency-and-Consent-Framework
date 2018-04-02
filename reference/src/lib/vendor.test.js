/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import config from './config';


jest.mock('./portal');
const mockPortal = require('./portal');

import { fetchVendorList, fetchPurposeList } from './vendor';

describe('vendor', () => {

	beforeEach(() => {
		mockPortal.sendPortalCommand = jest.fn().mockImplementation(() => Promise.resolve());
		window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => {}}));
	});

	it('fetchVendorList sends requests local vendors.json', (done) => {
		fetchVendorList()
			.then(() => {
				expect(window.fetch.mock.calls.length).to.equal(1);
				done();
			});
	});
	it('fetchVendorList sends a portal command', (done) => {
		window.fetch = jest.fn().mockImplementation(() => Promise.reject());
		fetchVendorList()
			.then(() => {
				expect(mockPortal.sendPortalCommand.mock.calls[0][0]).to.deep.equal({ command: 'readVendorList' });
				done();
			});
	});


	it('fetchPurposeList returns nothing if there is no customPurposeListLocation', (done) => {
		config.update({
			customPurposeListLocation: undefined
		});

		fetchPurposeList().then(() => {
			expect(window.fetch.mock.calls).to.be.empty;
			done();
		});
	});

	it('fetchPurposeList returns nothing if storePublisherData = false', (done) => {
		config.update({
			storePublisherData: true
		});

		fetchPurposeList().then(() => {
			expect(window.fetch.mock.calls).to.be.empty;
			done();
		});
	});


	it('fetchPurposeList fetches the configured URL', (done) => {
		config.update({
			customPurposeListLocation: 'somepath.json'
		});

		fetchPurposeList().then(() => {
			expect(window.fetch.mock.calls[0][0]).to.equal('somepath.json');
			done();
		});
	});
});
