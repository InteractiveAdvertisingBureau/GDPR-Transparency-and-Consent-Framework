import { h, render } from 'preact';
import Store from './store';
import Cmp, {CMP_GLOBAL_NAME} from './cmp';
import log from './log';
import config from './config';
import {getColorCSS} from './customizeColor';
import { fetchVendorList, fetchPurposeList } from './vendor';

const CMP_VERSION = 1;
const CMP_ID = 1;
const COOKIE_VERSION = 1;

export function preview() {
  log.debug('Using configuration:', config);

  const store = new Store({
    cmpVersion: CMP_VERSION,
    cmpID: CMP_ID,
    color: config.color,
    cookieVersion: COOKIE_VERSION,
    forceShowUI: config.forceShowUI,
    publisherName: config.publisherName,
  });

  // customize color if configured
  if (store.color && store.color != "#2e7d32") {
    var css = getColorCSS(store.color);
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    if (styleNode.styleSheet){
      styleNode.styleSheet.cssText = css;
    } else {
      styleNode.appendChild(document.createTextNode(css));
    }
    document.head.append(styleNode);
  }

  // Replace the __cmp with our implementation
  const cmp = new Cmp(store);

  // Render the UI
  const App = require('../components/app').default;
  render(<App store={store} notify={cmp.notify} />, document.body);

  return Promise.all([
    fetchVendorList().then(store.updateVendorList),
    fetchPurposeList().then(store.updateCustomPurposeList)
  ]).then(() => {
    cmp.cmpReady = true;
    cmp.notify('cmpReady');
  }).catch(err => {
    log.error('Failed to load lists. CMP not ready', err);
  });
}
