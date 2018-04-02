import Example from '../example';

const execute =
`window.__cmp('showConsentTool', null, function(result){
	myLogger('showConsentTool callback');
});`;

export default class ShowConsent extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Show Consent Tool',
			execute,
		};
	}
}
