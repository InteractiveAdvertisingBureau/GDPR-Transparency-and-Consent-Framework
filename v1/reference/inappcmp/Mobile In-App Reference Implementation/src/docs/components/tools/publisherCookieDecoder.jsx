import { h, Component } from 'preact';
import CookieDecoder from './cookieDecoder';

import {
	publisherVersionMap,
} from '../../../lib/cookie/definitions';

export default class PublisherCookieDecoder extends Component {

	render() {

		return (
			<CookieDecoder
				title='Decode Publisher'
				versionMap={publisherVersionMap} />
		);
	}
}
