import Example from '../example';

const execute =
`window.__cmp('getPublisherConsents', null, function(result){
	myLogger('getPublisherConsents callback result:\\n' + JSON.stringify(result, null, 2));
});`;

export default class PublisherPurposes extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Get Publisher Consents',
			execute,
		};
	}
}
