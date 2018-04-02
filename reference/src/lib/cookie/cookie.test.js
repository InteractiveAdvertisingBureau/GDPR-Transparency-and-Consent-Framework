/* eslint-disable max-nested-callbacks */
import { expect } from 'chai';
import customPurposeList from '../../docs/assets/purposes.json';
import config from '../config';

import {
	writeCookie,
	encodeVendorConsentData,
	decodeVendorConsentData,
	encodePublisherConsentData,
	decodePublisherConsentData,
	writeVendorConsentCookie,
	writePublisherConsentCookie,
	readPublisherConsentCookie,
	readVendorConsentCookie,
	PUBLISHER_CONSENT_COOKIE_NAME,
	VENDOR_CONSENT_COOKIE_NAME
} from './cookie';

jest.mock('../portal');
const mockPortal = require('../portal');

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

describe('cookie', () => {

	const aDate = new Date('2018-07-15 PDT');

	beforeEach(() => {
		// Remove all cookies
		const value = document.cookie.split(';');
		value.forEach(cookie => {
			const parts = cookie.trim().split('=');
			if (parts.length === 2) {
				writeCookie(parts[0], '', 0);
			}
		});
		mockPortal.sendPortalCommand = jest.fn().mockImplementation(() => Promise.resolve());
	});

	it('encodes and decodes the vendor cookie object back to original value', () => {
		const vendorConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			maxVendorId: vendorList.vendors[vendorList.vendors.length - 1].id,
			created: aDate,
			lastUpdated: aDate,
			selectedPurposeIds: new Set([1, 2]),
			selectedVendorIds: new Set([1, 2, 4])
		};

		const encodedString = encodeVendorConsentData({ ...vendorConsentData, vendorList });
		const decoded = decodeVendorConsentData(encodedString);

		expect(decoded).to.deep.equal(vendorConsentData);
	});

	it('encodes and decodes the publisher cookie object back to original value', () => {
		const vendorConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			selectedPurposeIds: new Set([1, 2]),
		};

		const publisherConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			publisherPurposeVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			selectedCustomPurposeIds: new Set([2, 3])
		};

		const encodedString = encodePublisherConsentData({
			...vendorConsentData, ...publisherConsentData,
			vendorList,
			customPurposeList
		});
		const decoded = decodePublisherConsentData(encodedString);

		expect(decoded).to.deep.equal({ ...vendorConsentData, ...publisherConsentData });
	});

	it('writes and reads the local cookie when globalConsent = false', () => {
		config.update({
			storeConsentGlobally: false
		});

		const vendorConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			created: aDate,
			lastUpdated: aDate,
		};

		return writeVendorConsentCookie(vendorConsentData).then(() => {
			return readVendorConsentCookie().then(fromCookie => {
				expect(document.cookie).to.contain(VENDOR_CONSENT_COOKIE_NAME);
				expect(fromCookie).to.deep.include(vendorConsentData);
			});
		});
	});

	it('writes the global cookie when globalConsent = true', () => {
		config.update({
			storeConsentGlobally: true
		});

		const vendorConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			created: aDate,
			lastUpdated: aDate,
		};

		return writeVendorConsentCookie(vendorConsentData).then(() => {
			expect(document.cookie).to.not.contain(VENDOR_CONSENT_COOKIE_NAME);
			expect(mockPortal.sendPortalCommand.mock.calls[0][0].command).to.deep.equal('writeVendorConsent');
		});
	});

	it('reads the global cookie when globalConsent = true', () => {
		config.update({
			storeConsentGlobally: true
		});

		const vendorConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			created: aDate,
			lastUpdated: aDate,
		};

		return readVendorConsentCookie(vendorConsentData).then(() => {
			expect(mockPortal.sendPortalCommand.mock.calls[0][0].command).to.deep.equal('readVendorConsent');
		});
	});

	it('writes and reads the publisher consent cookie', () => {
		config.update({
			storeConsentGlobally: false,
			storePublisherData: true
		});

		const publisherConsentData = {
			cookieVersion: 1,
			cmpId: 1,
			vendorListVersion: 1,
			publisherPurposeVersion: 1,
			created: aDate,
			lastUpdated: aDate,
		};

		writePublisherConsentCookie(publisherConsentData);
		const fromCookie = readPublisherConsentCookie();

		expect(document.cookie).to.contain(PUBLISHER_CONSENT_COOKIE_NAME);
		expect(fromCookie).to.deep.include(publisherConsentData);
	});
});
