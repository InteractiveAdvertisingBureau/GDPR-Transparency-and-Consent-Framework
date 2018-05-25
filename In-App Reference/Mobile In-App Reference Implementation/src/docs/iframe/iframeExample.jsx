import { h, render } from 'preact';
import Example from '../components/examples/example';
import queryString from 'query-string';
import '../style';
import codeStyle from '../../../node_modules/codemirror/lib/codemirror.css'; // eslint-disable-line no-unused-vars


let root;

const commonSetup =
	`function receiveMessage(event) {
	if (event && event.data && event.data.__cmpReturn) {
		myLogger('Received Message:\\n' + JSON.stringify(event.data, null, 2));
	}
}

window.addEventListener('message', receiveMessage);`;

const iframeMap =
	{
		getVendorConsents: {
			title: 'Get Vendor Consent From IFrame',
			message:
				`var message = {
	__cmpCall: {
		callId: 'iframe:' + (++this.callId),
		command: 'getVendorConsents',
		parameter: [0,1,2]
	}
};`
		},
		showConsentTool: {
			title: 'Show Consent Tool From IFrame',
			message:
				`var message = {
	__cmpCall: {
		callId: 'iframe:' + (++this.callId),
		command: 'showConsentTool'
	}
};`
		},
		getConsentData: {
			title: 'Get Consent Data From IFrame',
			message:
				`var message = {
	__cmpCall: {
		callId: 'iframe:' + (++this.callId),
		command: 'getConsentData'
	}
};`
		},
		addEventListeners: {
			title: 'Add Event Listeners From IFrame',
			message:
				`var message = {
	__cmpCall: {
		callId: 'iframe:' + (++this.callId),
		command: 'addEventListener',
		parameter: 'onSubmit'
	}
}`
		}
	};

class App extends Example {
	constructor(props) {
		super(props);
		const search = queryString.parse(window.location.search);
		const { title, message, setup='' } = iframeMap[search.iframeId];

		const execute = message ? `this.callId = this.callId || 0;
${message}
myLogger('Sending Message:\\n' + JSON.stringify(message, null, 2));
window.top.postMessage(message, '*');` : undefined;

		this.state = {
			setup: commonSetup + setup,
			title,
			execute
		};
	}
}

function init() {
	root = render(<App />, document.body, root);
}

init();
