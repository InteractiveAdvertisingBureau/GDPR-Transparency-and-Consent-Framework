import { expect } from 'chai';

import {
	encodeIntToBits,
	encodeBoolToBits,
	encodeDateToBits,
	decodeBitsToInt,
	decodeBitsToDate,
	decodeBitsToBool,
	encodeVendorCookieValue,
	decodeVendorCookieValue,
	encodePublisherCookieValue,
	decodePublisherCookieValue
} from './cookieutils';

describe('cookieutils', () => {

	describe('encodeIntToBits', () => {
		it('encodes an integer to a bit string', () => {
			const bitString = encodeIntToBits(123);
			expect(bitString).to.equal('1111011');
		});
		it('encodes an integer to a bit string with padding', () => {
			const bitString = encodeIntToBits(123, 12);
			expect(bitString).to.equal('000001111011');
		});

	});

	describe('encodeBoolToBits', () => {
		it('encodes a "true" boolean to a bit string', () => {
			const bitString = encodeBoolToBits(true);
			expect(bitString).to.equal('1');
		});
		it('encode a "false" boolean to a bit string', () => {
			const bitString = encodeBoolToBits(false);
			expect(bitString).to.equal('0');
		});
	});

	describe('encodeDateToBits', () => {
		it('encode a date to a bit string', () => {
			const date = new Date(1512661975200);
			const bitString = encodeDateToBits(date);
			expect(bitString).to.equal('1110000101100111011110011001101000');
		});
		it('encode a date to a bit string with padding', () => {
			const date = new Date(1512661975200);
			const bitString = encodeDateToBits(date, 36);
			expect(bitString).to.equal('001110000101100111011110011001101000');
		});
	});

	describe('decodeBitsToInt', () => {
		it('decodes a bit string to original encoded value', () => {
			const bitString = encodeIntToBits(123);
			const decoded = decodeBitsToInt(bitString, 0, bitString.length);
			expect(decoded).to.equal(123);
		});
	});

	describe('decodeBitsToDate', () => {
		it('decodes a bit string to original encoded value', () => {
			const now = new Date('2018-07-15 PDT');
			const bitString = encodeDateToBits(now);
			const decoded = decodeBitsToDate(bitString, 0, bitString.length);
			expect(decoded.getTime()).to.equal(now.getTime());
		});
	});

	describe('decodeBitsToBool', () => {
		it('decodes a bit string to original encoded "true" value', () => {
			const bitString = encodeBoolToBits(true);
			const decoded = decodeBitsToBool(bitString, 0, bitString.length);
			expect(decoded).to.equal(true);
		});
		it('decodes a bit string to original encoded "false" value', () => {
			const bitString = encodeBoolToBits(false);
			const decoded = decodeBitsToBool(bitString, 0, bitString.length);
			expect(decoded).to.equal(false);
		});
	});


	it('fails to encode a cookie version that does not exist', () => {
		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 999,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
		};

		const bitString = encodeVendorCookieValue(consentData);
		expect(bitString).to.be.undefined;
	});

	it('fails to encode an invalid cookie version', () => {
		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 'hello',
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
		};

		const bitString = encodeVendorCookieValue(consentData);
		expect(bitString).to.be.undefined;
	});

	it('fails to decode an invalid cookie version', () => {
		const bitString = encodeIntToBits(999, 6);
		const decoded = decodeVendorCookieValue(bitString);
		expect(decoded).to.be.empty;
	});

	it('encodes and decodes the vendor cookie value with ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
			purposeIdBitString: '111000001010101010001101',
			maxVendorId: 5,
			isRange: true,
			defaultConsent: false,
			numEntries: 2,
			vendorRangeList: [
				{
					isRange: true,
					startVendorId: 2,
					endVendorId: 4
				},
				{
					isRange: false,
					startVendorId: 1
				}
			]
		};

		const bitString = encodeVendorCookieValue(consentData);
		const decoded = decodeVendorCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});

	it('encodes and decodes the vendor cookie value with range ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
			purposeIdBitString: '111000001010101010001101',
			maxVendorId: 5,
			isRange: true,
			defaultConsent: false,
			numEntries: 2,
			vendorRangeList: [
				{
					isRange: false,
					startVendorId: 2
				},
				{
					isRange: false,
					startVendorId: 1
				}
			]
		};

		const bitString = encodeVendorCookieValue(consentData);
		const decoded = decodeVendorCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});

	it('encodes and decodes the vendor cookie value without ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
			purposeIdBitString: '000000001010101010001100',
			maxVendorId: 5,
			isRange: false,
			vendorIdBitString: '10011',
		};

		const bitString = encodeVendorCookieValue(consentData);
		const decoded = decodeVendorCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});


	it('encodes and decodes the publisher cookie value without ranges back to original value', () => {

		const aDate = new Date('2018-07-15 PDT');

		const consentData = {
			cookieVersion: 1,
			created: aDate,
			lastUpdated: aDate,
			cmpId: 1,
			vendorListVersion: 1,
			publisherPurposeVersion: 1,
			numCustomPurposes: 4,
			standardPurposeIdBitString: '000000001010101010001100',
			customPurposeIdBitString: '1011',
		};

		const bitString = encodePublisherCookieValue(consentData);
		const decoded = decodePublisherCookieValue(bitString);

		expect(decoded).to.deep.equal(consentData);
	});
});
