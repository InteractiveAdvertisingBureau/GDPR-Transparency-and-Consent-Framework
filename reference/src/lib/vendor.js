import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import config from './config';
import log from './log';
import { sendPortalCommand } from './portal';

/**
 * Attempt to load the vendors list from the global location and
 * fallback to portal location.
 */
function fetchVendorList() {
  const {globalVendorListLocation} = config;
  return (globalVendorListLocation ?
    fetch(globalVendorListLocation) :
    Promise.reject('Missing globalVendorListLocation'))
    .then(res => res.json())
    .catch(() => {
      return sendPortalCommand({command: 'readVendorList'});
    });
}

function fetchPurposeList() {
  if (!config.storePublisherData || !config.publisherPurposeList) {
    return Promise.resolve();
  }

  return Promise.resolve({
    'purposes': config.publisherPurposeList
  });
}

export {
  fetchVendorList,
  fetchPurposeList,
};
