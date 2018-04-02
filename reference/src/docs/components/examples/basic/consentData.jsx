import Example from '../example';

const execute =
`window.__cmp('getConsentData', 'vendorConsents', function(result){
	myLogger('getConsentData callback result: ' + result);
});`;

export default class ConsentData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Get Consent Data',
			execute,
		};
	}
}
