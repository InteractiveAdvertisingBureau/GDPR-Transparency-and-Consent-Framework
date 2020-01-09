import { h, Component } from 'preact';

export default class Iframe extends Component {
	render(props) {
		const {iframeId} = props;
		const url = `./iframeExample.html?iframeId=${iframeId}`;

		return (
			<iframe src={url} />
		);
	}
}
