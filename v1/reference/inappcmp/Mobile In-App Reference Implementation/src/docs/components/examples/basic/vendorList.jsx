import Example from "../example";

const execute =
	`window.__cmp('getVendorList', null, function(result){
	myLogger('getVendorList callback result:\\n' + JSON.stringify(result, null, 2));
});`;

export default class VendorList extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Get Vendor List',
			execute,
		};
	}
}

