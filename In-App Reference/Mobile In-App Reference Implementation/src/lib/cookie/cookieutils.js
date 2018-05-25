import log from '../log';
import {
	NUM_BITS_VERSION,
	vendorVersionMap,
	publisherVersionMap
} from './definitions';

const SIX_BIT_ASCII_OFFSET = 65;

function repeat(count, string='0') {
	let padString = '';
	for (let i = 0; i < count; i++) {
		padString += string;
	}
	return padString;
}

function padLeft(string, padding) {
	return repeat(Math.max(0, padding)) + string;
}

function padRight(string, padding) {
	return string + repeat(Math.max(0, padding));
}

function encodeIntToBits(number, numBits) {
	let bitString = '';
	if (typeof number === 'number' && !isNaN(number)) {
		bitString = parseInt(number, 10).toString(2);
	}

	// Pad the string if not filling all bits
	if (numBits >= bitString.length) {
		bitString = padLeft(bitString, numBits - bitString.length);
	}

	// Truncate the string if longer than the number of bits
	if (bitString.length > numBits) {
		bitString = bitString.substring(0, numBits);
	}
	return bitString;
}

/**
 * Encodes each character of a string in 6 bits starting
 * with [aA]=0 through [zZ]=25
 */
function encode6BitCharacters(string, numBits) {
	const encoded = typeof string !== 'string' ? '' : string.split('').map(char => {
		const int = Math.max(0, char.toUpperCase().charCodeAt(0) - SIX_BIT_ASCII_OFFSET);
		return encodeIntToBits(int > 25 ? 0 : int, 6);
	}).join('');
	return padRight(encoded, numBits).substr(0, numBits);
}

function encodeBoolToBits(value) {
	return encodeIntToBits(value === true ? 1 : 0, 1);
}

function encodeDateToBits(date, numBits) {
	if (date instanceof Date) {
		return encodeIntToBits(date.getTime() / 100, numBits);
	}
	return encodeIntToBits(date, numBits);
}

function decodeBitsToInt(bitString, start, length) {
	return parseInt(bitString.substr(start, length), 2);
}

function decodeBitsToDate(bitString, start, length) {
	return new Date(decodeBitsToInt(bitString, start, length) * 100);
}

function decodeBitsToBool(bitString, start) {
	return parseInt(bitString.substr(start, 1), 2) === 1;
}
function decode6BitCharacters(bitString, start, length) {
	let decoded = '';
	let decodeStart = start;
	while (decodeStart < start + length) {
		decoded += String.fromCharCode(SIX_BIT_ASCII_OFFSET + decodeBitsToInt(bitString, decodeStart, 6));
		decodeStart += 6;
	}
	return decoded;
}


function encodeField({ input, field }) {
	const { name, type, numBits, encoder, validator } = field;
	if (typeof validator === 'function') {
		if (!validator(input)) {
			return '';
		}
	}
	if (typeof encoder === 'function') {
		return encoder(input);
	}

	const bitCount = typeof numBits === 'function' ? numBits(input) : numBits;

	const inputValue = input[name];
	const fieldValue = inputValue === null || inputValue === undefined ? '' : inputValue;
	switch (type) {
		case 'int':
			return encodeIntToBits(fieldValue, bitCount);
		case 'bool':
			return encodeBoolToBits(fieldValue);
		case 'date':
			return encodeDateToBits(fieldValue, bitCount);
		case 'bits':
			return padRight(fieldValue, bitCount - fieldValue.length).substring(0, bitCount);
		case '6bitchar':
			return encode6BitCharacters(fieldValue, bitCount);
		case 'list':
			return fieldValue.reduce((acc, listValue) => acc + encodeFields({
				input: listValue,
				fields: field.fields
			}), '');
		default:
			log.warn(`Cookie definition field found without encoder or type: ${name}`);
			return '';
	}
}

function encodeFields({ input, fields }) {
	return fields.reduce((acc, field) => {
		acc += encodeField({ input, field });
		return acc;
	}, '');
}

function decodeField({ input, output, startPosition, field }) {
	const { type, numBits, decoder, validator, listCount } = field;
	if (typeof validator === 'function') {
		if (!validator(output)) {
			// Not decoding this field so make sure we start parsing the next field at
			// the same point
			return {newPosition: startPosition};
		}
	}
	if (typeof decoder === 'function') {
		return decoder(input, output, startPosition);
	}

	const bitCount = typeof numBits === 'function' ? numBits(output) : numBits;
	const listEntryCount = typeof listCount === 'function' ?
		listCount(output) : typeof listCount === 'number' ? listCount : 0;

	switch (type) {
		case 'int':
			return { fieldValue: decodeBitsToInt(input, startPosition, bitCount) };
		case 'bool':
			return { fieldValue: decodeBitsToBool(input, startPosition) };
		case 'date':
			return { fieldValue: decodeBitsToDate(input, startPosition, bitCount) };
		case 'bits':
			return { fieldValue: input.substr(startPosition, bitCount) };
		case '6bitchar':
			return { fieldValue: decode6BitCharacters(input, startPosition, bitCount) };
		case 'list':
			return new Array(listEntryCount).fill().reduce((acc) => {
				const { decodedObject, newPosition } = decodeFields({
					input,
					fields: field.fields,
					startPosition: acc.newPosition
				});
				return {
					fieldValue: [...acc.fieldValue, decodedObject],
					newPosition
				};
			}, { fieldValue: [], newPosition: startPosition });
		default:
			log.warn(`Cookie definition field found without decoder or type: ${name}`);
			return {};
	}
}

function decodeFields({ input, fields, startPosition = 0 }) {
	let position = startPosition;
	const decodedObject = fields.reduce((acc, field) => {
		const { name, numBits } = field;
		const { fieldValue, newPosition } = decodeField({
			input,
			output: acc,
			startPosition: position,
			field
		});
		if (fieldValue !== undefined) {
			acc[name] = fieldValue;
		}
		if (newPosition !== undefined) {
			position = newPosition;
		}
		else if (typeof numBits === 'number') {
			position += numBits;
		}
		return acc;
	}, {});
	return {
		decodedObject,
		newPosition: position
	};
}

/**
 * Encode the data properties to a bit string. Encoding will encode
 * either `selectedVendorIds` or the `vendorRangeList` depending on
 * the value of the `isRange` flag.
 */
function encodeDataToBits(data, definitionMap) {
	const { cookieVersion } = data;

	if (typeof cookieVersion !== 'number') {
		log.error('Could not find cookieVersion to encode');
	}
	else if (!definitionMap[cookieVersion]) {
		log.error(`Could not find definition to encode cookie version ${cookieVersion}`);
	}
	else {
		const cookieFields = definitionMap[cookieVersion].fields;
		return encodeFields({ input: data, fields: cookieFields });
	}
}

/**
 * Take all fields required to encode the cookie and produce the
 * URL safe Base64 encoded value.
 */
function encodeCookieValue(data, definitionMap) {
	const binaryValue = encodeDataToBits(data, definitionMap);
	if (binaryValue) {

		// Pad length to multiple of 8
		const paddedBinaryValue = padRight(binaryValue, 7 - (binaryValue.length + 7) % 8);

		// Encode to bytes
		let bytes = '';
		for (let i = 0; i < paddedBinaryValue.length; i += 8) {
			bytes += String.fromCharCode(parseInt(paddedBinaryValue.substr(i, 8), 2));
		}

		// Make base64 string URL friendly
		return btoa(bytes)
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}
}

function encodeVendorCookieValue(vendorData) {
	return encodeCookieValue(vendorData, vendorVersionMap);
}

function encodePublisherCookieValue(publisherData) {
	return encodeCookieValue(publisherData, publisherVersionMap);
}


/**
 * Decode the (URL safe Base64) value of a cookie into an object.
 */
function decodeCookieValue(cookieValue, definitionMap) {

	// Replace safe characters
	const unsafe = cookieValue
		.replace(/-/g, '+')
		.replace(/_/g, '/') + '=='.substring(0, (3 * cookieValue.length) % 4);

	const bytes = atob(unsafe);

	let inputBits = '';
	for (let i = 0; i < bytes.length; i++) {
		const bitString = bytes.charCodeAt(i).toString(2);
		inputBits += padLeft(bitString, 8 - bitString.length);
	}

	return decodeCookieBitValue(inputBits, definitionMap);
}

function decodeCookieBitValue(bitString, definitionMap) {
	const cookieVersion = decodeBitsToInt(bitString, 0, NUM_BITS_VERSION);
	if (typeof cookieVersion !== 'number') {
		log.error('Could not find cookieVersion to decode');
		return {};
	}
	else if (!vendorVersionMap[cookieVersion]) {
		log.error(`Could not find definition to decode cookie version ${cookieVersion}`);
		return {};
	}
	const cookieFields = definitionMap[cookieVersion].fields;
	const { decodedObject } = decodeFields({ input: bitString, fields: cookieFields });
	return decodedObject;
}


function decodeVendorCookieValue(cookieValue) {
	return decodeCookieValue(cookieValue, vendorVersionMap);
}

function decodePublisherCookieValue(cookieValue) {
	return decodeCookieValue(cookieValue, publisherVersionMap);
}

export {
	padRight,
	padLeft,
	encodeCookieValue,
	encodeField,
	encodeDataToBits,
	encodeIntToBits,
	encodeBoolToBits,
	encodeDateToBits,
	encode6BitCharacters,
	decodeBitsToInt,
	decodeBitsToDate,
	decodeBitsToBool,
	decodeCookieValue,
	decodeCookieBitValue,
	encodeVendorCookieValue,
	decodeVendorCookieValue,
	encodePublisherCookieValue,
	decodePublisherCookieValue,
	decode6BitCharacters
};
