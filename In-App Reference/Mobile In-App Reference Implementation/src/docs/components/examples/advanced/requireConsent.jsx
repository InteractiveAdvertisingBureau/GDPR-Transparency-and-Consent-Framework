import Example from '../example';

const setup = `
myLogger('Add eventListener "onSubmit"');
window.__cmp('addEventListener', 'onSubmit', function(result){
	myLogger('Consent submitted');
	window.__cmp('getVendorConsents', [0,1,2], function(result){
		if (result.vendorConsents[1] === true) {
			myLogger('Received consent for vendor ID: 1');
		} else {
			myLogger('Did NOT receive consent for vendor ID: 1');
		}
	});
});
`;

const execute =
	`
window.__cmp('getVendorConsents', [0,1,2], function(result){
	// Determine if we want to show the consent tool
	// if (result.vendorConsents[1] === true)
	
	myLogger('Requesting consent');
	window.__cmp('showConsentTool');
});
`;

export default class ConsentData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Require Consent For Vendor',
			setup,
			execute
		};
	}
}
