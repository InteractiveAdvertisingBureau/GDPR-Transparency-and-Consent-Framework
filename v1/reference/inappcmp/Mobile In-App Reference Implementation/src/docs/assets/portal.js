import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import log from "../../lib/log";

const host = (window && window.location && window.location.hostname) || '';
const parts = host.split('.');
const COOKIE_DOMAIN = parts.length > 1 ? `;domain=.${parts.slice(-2).join('.')}` : '';
const COOKIE_MAX_AGE = 33696000;
const COOKIE_NAME = 'euconsent';

const readVendorListPromise = fetch('./vendorlist.json', {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})
	.then(res => res.json())
	.catch(err => {
		log.error(`Failed to load vendor list from vendors.json`, err);
	});

function readCookie(name) {
	const value = '; ' + document.cookie;
	const parts = value.split('; ' + name + '=');
	if (parts.length === 2) {
		return Promise.resolve(parts.pop().split(';').shift());
	}
	return Promise.resolve();
}

function writeCookie({ name, value, path = '/'}) {
	document.cookie = `${name}=${value}${COOKIE_DOMAIN};path=${path};max-age=${COOKIE_MAX_AGE}`;
	return Promise.resolve();
}

const commands = {
	readVendorList: () => readVendorListPromise,

	readVendorConsent: () => {
		return readCookie(COOKIE_NAME);
	},

	writeVendorConsent: ({encodedValue}) => {
		return writeCookie({name: COOKIE_NAME, value: encodedValue});
	}
};

window.addEventListener('message', (event) => {
	const data = event.data.vendorConsent;
	if (data && typeof commands[data.command] === 'function') {
		const { command } = data;
		commands[command](data).then(result => {
			event.source.postMessage({
				vendorConsent: {
					...data,
					result
				}
			}, event.origin);
		});
	}
});
window.parent.postMessage({ vendorConsent: { command: 'isLoaded' } }, '*');
