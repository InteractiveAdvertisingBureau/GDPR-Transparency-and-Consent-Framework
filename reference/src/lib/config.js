import log from './log';

const defaultConfig = {
	customPurposeListLocation: 'http://c.sharethis.mgr.consensu.org/v1.0/cmp/purposes.json',
	globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
	globalConsentLocation: './portal.html',
	storeConsentGlobally: true,
	storePublisherData: true,
	logging: false,
	localization: {},
	forceLocale: null,
	gdprApplies: true
};

class Config {
	constructor() {
		this.update(defaultConfig);
	}

	update = (updates) => {
		if (updates && typeof updates === 'object') {
			const validKeys = Object.keys(defaultConfig);
			const { validUpdates, invalidKeys } = Object.keys(updates).reduce((acc, key) => {
				if (validKeys.indexOf(key) > -1) {
					acc.validUpdates = {
						...acc.validUpdates,
						[key]: updates[key]
					};
				}
				else {
					acc.invalidKeys.push(key);
				}
				return acc;
			}, { validUpdates: {}, invalidKeys: [] });

			Object.assign(this, validUpdates);
			if (invalidKeys.length) {
				log.warn(`Invalid CMP config values not applied: ${invalidKeys.join(', ')}`);
			}

		}
	};
}

export default new Config();
