import log from './log';
import Promise from 'promise-polyfill';
import pack from '../../package.json';
import {
	encodeVendorConsentData
} from './cookie/cookie';

const CMP_VERSION = pack.version;
export const CMP_GLOBAL_NAME = '__cmp';

export default class Cmp {
	constructor(store) {
		this.isLoaded = false;
		this.cmpReady = false;
		this.eventListeners = {};
		this.store = store;
		this.processCommand.receiveMessage = this.receiveMessage;
		this.processCommand.VERSION = CMP_VERSION;
	}

	commands = {
		/**
		 * Get all publisher consent data from the data store.
		 */
		getPublisherConsents: (purposeIds, callback = () => {}) => {
			const consent = this.store.getPublisherConsentsObject();
			callback(consent);
			return consent;
		},

		/**
		 * Get all vendor consent data from the data store.
		 * @param {Array} vendorIds Array of vendor IDs to retrieve.  If empty return all vendors.
		 */
		getVendorConsents: (vendorIds, callback = () => {}) => {
			const consent = this.store.getVendorConsentsObject(vendorIds);
			callback(consent);
			return consent;
		},

		/**
		 * Get the encoded vendor consent data value.
		 */
		getConsentData: (_, callback = () => {}) => {
			const {
				persistedVendorConsentData,
				vendorList
			} = this.store;

			const {
				vendors = [],
				purposes = []
			} = vendorList || {};

			const {
				selectedVendorIds = new Set(),
				selectedPurposeIds = new Set()
			} = persistedVendorConsentData || {};

			// Filter consents by values that exist in the current vendorList
			const allowedVendorIds = new Set(vendors.map(({id}) => id));
			const allowedPurposeIds = new Set(purposes.map(({id}) => id));

			// Encode the persisted data
			const consentData = persistedVendorConsentData && encodeVendorConsentData({
				...persistedVendorConsentData,
				selectedVendorIds: new Set(Array.from(selectedVendorIds).filter(id => allowedVendorIds.has(id))),
				selectedPurposeIds: new Set(Array.from(selectedPurposeIds).filter(id => allowedPurposeIds.has(id))),
				vendorList
			});
			callback(consentData);
			return consentData;
		},

		/**
		 * Get the entire vendor list
		 */
		getVendorList: (vendorListVersion, callback = () => {}) => {
			const list = this.store.vendorList;
			callback(list);
			return list;
		},

		/**
		 * Add a callback to be fired on a specific event.
		 * @param {string} event Name of the event
		 */
		addEventListener: (event, callback) => {
			const eventSet = this.eventListeners[event] || new Set();
			eventSet.add(callback);
			this.eventListeners[event] = eventSet;

			// Trigger load events immediately if they have already occurred
			if (event === 'isLoaded' && this.isLoaded) {
				callback({event});
			}
			if (event === 'cmpReady' && this.cmpReady) {
				callback({event});
			}
		},

		/**
		 * Remove a callback for an event.
		 * @param {string} event Name of the event to remove callback from
		 */
		removeEventListener: (event, callback) => {
			// If an event is supplied remove the specific listener
			if (event) {
				const eventSet = this.eventListeners[event] || new Set();
				// If a callback is supplied remove it
				if (callback) {
					eventSet.delete(callback);
				}
				// If no callback is supplied clear all listeners for this event
				else {
					eventSet.clear();
				}
				this.eventListeners[event] = eventSet;
			}
			// If no event is supplied clear ALL listeners
			else {
				this.eventListeners = {};
			}
		},

		/**
		 * Trigger the consent tool UI to be shown
		 */
		showConsentTool: (_, callback = () => {}) => {
			this.store.toggleConsentToolShowing(true);
			callback(true);
			return true;
		}
	};

	/**
	 * Handle a message event sent via postMessage to
	 * call `processCommand`
	 */
	receiveMessage = ({data, origin, source}) => {
		const {[CMP_GLOBAL_NAME]: cmp} = data;
		if (cmp) {
			const {callId, command, parameter} = cmp;
			this.processCommand(command, parameter, result =>
				source.postMessage({[CMP_GLOBAL_NAME]: {callId, command, result}}, origin));
		}
	};

	/**
	 * Call one of the available commands.
	 * @param {string} command Name of the command
	 * @param {*} parameter Expected parameter for command
	 */
	processCommand = (command, parameter, callback) => {
		if (typeof this.commands[command] !== 'function') {
			log.error(`Invalid CMP command "${command}"`);
		}
		else {
			log.info(`Proccess command: ${command}, parameter: ${parameter}`);
			return Promise.resolve(this.commands[command](parameter, callback));
		}
	};

	/**
	 * Trigger all event listener callbacks to be called.
	 * @param {string} event Name of the event being triggered
	 * @param {*} data Data that will be passed to each callback
	 */
	notify = (event, data) => {
		log.info(`Notify event: ${event}`);
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.forEach(listener => {
			listener({event, data});
		});
	};
}
