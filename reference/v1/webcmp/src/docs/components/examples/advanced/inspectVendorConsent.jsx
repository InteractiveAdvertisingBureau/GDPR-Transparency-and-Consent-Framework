import Example from '../example';

const setup = `
myLogger('Add eventListener "onSubmit"');
window.__cmp('addEventListener', 'onSubmit', function(result){
	myLogger('Consent submitted');
	inspectVendorConsents();
});

function inspectVendorConsents() {
	myLogger('Request vendor consents');
	window.__cmp('getVendorConsents', null, function(result){
		// Determine when the cookie information was first written
		if (result.created) {
			myLogger('Consents first persisted on: ' + result.created);
			var vendors = result.vendorConsents;
			var allowed = 0;
			var total = 0;
			var key;
			for (key in vendors) {
				if (vendors.hasOwnProperty(key)) {
					if (vendors[key] === true) {
						allowed++;
					}
					total++;
				}
			}
			myLogger('Allowed vendor count: ' + allowed + ', Disallowed vendor count: ' + (total - allowed));
		} else {
			myLogger('Consents have never been persisted');
		}
		
		// Determine when the cookie information was last updated
		if (result.lastUpdated) {
			myLogger('Consents last updated on: ' + result.lastUpdated);
		} else {
			myLogger('Consents have never been updated');
		}
		
		// Show the consent tool
		myLogger('Show consent tool');
	});
}
inspectVendorConsents();
`;

const execute =
	`
window.__cmp('showConsentTool');
`;

export default class InspectVendorData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Inspect Existing Vendor Consent Information',
			setup,
			execute
		};
	}
}
