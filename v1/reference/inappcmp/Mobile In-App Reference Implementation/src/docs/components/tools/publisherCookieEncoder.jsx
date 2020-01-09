import { h, Component } from 'preact';

import {
	publisherVersionMap,
} from '../../../lib/cookie/definitions';
import CookieEncoder from './cookieEncoder';


export default class PublisherCookieEncoder extends Component {

	render() {

		return (
			<CookieEncoder
				title='Encode Publisher Consent Cookie'
				versionMap={publisherVersionMap}/>
		);
	}
}
