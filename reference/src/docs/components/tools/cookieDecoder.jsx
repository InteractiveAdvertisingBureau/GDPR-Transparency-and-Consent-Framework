import { h, Component } from 'preact';
import style from './coder.less';
import { Controlled as CodeMirror } from 'react-codemirror2';

import {
	decodeCookieValue,
	decodeCookieBitValue
} from '../../../lib/cookie/cookieutils';

export default class CookieDecoder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bitString: '',
			b64: ''
		};
	}

	decodeB64 = (e) => {
		const input = e.target.value;
		this.setState({
			b64: input,
			decodedB64: decodeCookieValue(input, this.props.versionMap)
		});
	};

	decodeBits = (e) => {
		const input = e.target.value;
		this.setState({
			bitString: input,
			decodedBits: decodeCookieBitValue(input, this.props.versionMap)
		});
	};

	render(props, state) {
		const {title} = props;
		const { bitString, b64, decodedBits, decodedB64 } = state;

		return (
			<div className={style.cookieDecoder}>
				<span className={style.sectionTitle}>{title} Binary Cookie Value</span>
				<textarea
					className={style.encodedInput}
					onKeyUp={this.decodeBits}
				>
					{bitString}
				</textarea>
				{bitString &&
				<CodeMirror
					className={style.decodedContent}
					value={JSON.stringify(decodedBits, null, 2)}
					options={{
						lineNumbers: true,
						indentWithTabs: true,
						smartIndent: true,
						tabSize: 2,
						mode: 'javascript',
						readOnly: true
					}} />
				}

				<span className={style.sectionTitle}>{title} Base64 Cookie Value</span>
				<textarea
					className={style.encodedInput}
					onKeyUp={this.decodeB64}
				>
					{b64}
				</textarea>
				{b64 &&
				<CodeMirror
					className={style.decodedContent}
					value={JSON.stringify(decodedB64, null, 2)}
					options={{
						lineNumbers: true,
						indentWithTabs: true,
						smartIndent: true,
						tabSize: 2,
						mode: 'javascript',
						readOnly: true
					}} />
				}
			</div>
		);
	}
}
