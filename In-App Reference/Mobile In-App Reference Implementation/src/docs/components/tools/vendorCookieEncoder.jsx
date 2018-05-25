import { h, Component } from 'preact';

import {
	vendorVersionMap,
} from '../../../lib/cookie/definitions';
import CookieEncoder from './cookieEncoder';


export default class VendorCookieEncoder extends Component {

	render() {
		return (
			<CookieEncoder
				title='Encode Vendor Consent Cookie'
				versionMap={vendorVersionMap}/>
		);
	}
}
