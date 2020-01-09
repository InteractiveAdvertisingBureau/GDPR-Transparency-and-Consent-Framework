import Example from '../example';

const execute =
`window.__cmp('ping', null, function(result){
	myLogger('ping callback result: ' + JSON.stringify(result,null,2));
});`;

export default class Ping extends Example {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Ping',
			execute,
		};
	}
}
