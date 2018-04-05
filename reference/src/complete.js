import 'core-js/fn/array/reduce';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/map';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/filter';
import Promise from 'promise-polyfill';
import log from './lib/log';
import { init } from './lib/init';
import { CMP_GLOBAL_NAME } from "./lib/cmp";

function checkConsent() {
	const cmp = window.__cmp;
	if (!cmp) {
		log.error('CMP failed to load');
	}
	else if (!window.navigator.cookieEnabled) {
		log.warn('Cookies are disabled. Ignoring CMP consent check');
	}
	else {
		Promise.all([
			cmp('getVendorConsents'),
			cmp('getVendorList')
		]).then(([{created, vendorListVersion}, {version}]) => {
			if (!created) {
				log.debug('No consent data found. Showing consent tool');
				cmp('showConsentTool');
			}
			else if (vendorListVersion !== version) {
				log.debug(`Consent found for version ${vendorListVersion}, but received vendor list version ${version}. Showing consent tool`);
				cmp('showConsentTool');
			}
			else {
				log.debug('Consent found. Not showing consent tool');
			}
		});
	}
}

const {config} = window[CMP_GLOBAL_NAME] || {};
const configUpdates = {
	globalConsentLocation: '//acdn.adnxs.com/cmp/docs/portal.html',
	...config
};
init(configUpdates).then(checkConsent);
