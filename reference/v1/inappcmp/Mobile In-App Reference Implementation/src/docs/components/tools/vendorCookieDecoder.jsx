import { h, Component } from 'preact';
import CookieDecoder from './cookieDecoder';

import {
	vendorVersionMap,
} from '../../../lib/cookie/definitions';

export default class VendorCookieDecoder extends Component {

	render() {

		return (
			<CookieDecoder
				title='Decode Vendor'
				versionMap={vendorVersionMap} />
		);
	}
}
