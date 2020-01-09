import Example from '../example';

const setup = `
myLogger('Add eventListener "onSubmit"');
window.__cmp('addEventListener', 'onSubmit', function(result){
	myLogger('Consent submitted, requesting ad...');
	var adFrame = document.createElement('iframe');
	adFrame.src = 'http://ib.adnxs.com/tt?id=1959558';
	var contentArea = document.getElementById('MyContentArea');
	contentArea.innerHTML = '';
	contentArea.append(adFrame);
});
`;

const execute =
	`
myLogger('Requesting consent');
window.__cmp('showConsentTool');
`;

export default class ConsentData extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Load Ad After Consent',
			setup,
			execute,
			hasContent: true
		};
	}
}
