/* eslint-disable no-unused-vars, no-eval */

import { h, Component } from 'preact';
import style from './example.less';
import { Controlled as CodeMirror } from 'react-codemirror2';
import JSCode from 'codemirror/mode/javascript/javascript';
import {js_beautify as beautify} from 'js-beautify';

export default class Example extends Component {

	log = (text) => {
		this.setState({
			logOutput: `[${new Date().toTimeString()}] - ${text}\n${this.state.logOutput || ''}`
		});
	};

	execute = () => {
		const myLogger = this.log;
		const execute = this.formatCode(this.state.execute);
		this.setState({execute});
		eval(execute);
	};

	onChangeSetup = (cm, event, text) => {
		this.setState({ setup: text });
	};

	onChangeExecute = (cm, event, text) => {
		this.setState({ execute: text });
	};

	formatCode = (code) => {
		if (code) {
			return beautify(code.trim());
		}
		return code;
	};

	clearLog = () => {
		this.setState({ logOutput: '' });
	};

	componentWillMount() {
		// Always clear ALL event listeners before setting up the example
		window.__cmp && window.__cmp('removeEventListener');
	}

	componentDidMount() {
		const myLogger = this.log;
		const {setup, execute} = this.state;
		this.setState({
			setup: this.formatCode(setup),
			execute: this.formatCode(execute)
		});

		if (setup) {
			eval(setup);
		}
	}

	render(props, state) {
		const { execute, title, setup, logOutput, hasContent } = state;


		return (
			<div className={style.example}>
				<div className={style.exampleName}>
					{title}
				</div>
				<div className={style.exampleSections}>
					{setup &&
					<div className={style.exampleSection}>
						<span className={style.exampleLabel}>
								Setup
						</span>
						<CodeMirror
							className={style.exampleContent}
							value={setup}
							onBeforeChange={this.onChangeSetup}
							options={{
								lineNumbers: true,
								indentWithTabs: true,
								smartIndent: true,
								tabSize: 2,
								mode: 'javascript',
								readOnly: true
							}} />
					</div>}

					{execute &&
					<div className={style.exampleSection}>
						<span className={style.exampleLabel}>
								Code
							<button className={style.execute} onClick={this.execute}>Execute</button>
						</span>
						<CodeMirror
							className={style.exampleContent}
							value={execute}
							onBeforeChange={this.onChangeExecute}
							options={{
								lineNumbers: true,
								indentWithTabs: true,
								smartIndent: true,
								tabSize: 2,
								mode: 'javascript'
							}} />
					</div>}

					{hasContent &&
					<div className={style.exampleSection}>
						<span className={style.exampleLabel}>My Content Area</span>
						<div id='MyContentArea' className={style.contentArea} />
					</div>}

					<div className={style.exampleSection}>
						<span className={style.exampleLabel}>
							My Logger Output
							<button className={style.execute} onClick={this.clearLog}>Clear</button>
						</span>
						<pre className={style.exampleContent}>{logOutput}</pre>
					</div>
				</div>
			</div>
		);
	}
}
