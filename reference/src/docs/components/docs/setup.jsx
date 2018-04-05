import { h, Component } from 'preact';
import {buildScript} from '../../../docs/lib/stub';
import style from './docs.less';
import { Controlled as CodeMirror } from 'react-codemirror2';
import JSCode from 'codemirror/mode/htmlmixed/htmlmixed'; // eslint-disable-line no-unused-vars
import {html_beautify as beautify} from 'js-beautify';

const {host, pathname} = window.location;
const CURRENT_LOCATION = host + pathname;

export default class Setup extends Component {
	constructor(props) {
		super(props);

		const config = {
			globalConsentLocation: `//${CURRENT_LOCATION}portal.html`,
			storeConsentGlobally: true,
			storePublisherData: false
		};

		const bookmarkScript = `javascript:(function(){
			${buildScript(config, `//${CURRENT_LOCATION}../cmp.bundle.js`)}
			window.__cmp('showConsentTool');
		}());`.replace(/}\n/g, '};');

		this.setState({
			bookmarklet: bookmarkScript,
			tag: beautify(`<head><script>${buildScript()}</script></head>`),
		});
	}

	render(props, state) {

		const { tag, bookmarklet} = state;

		return (
			<div>
				<span className={style.header}>Adding the script to your site</span>
				<p>
					The consent tool script should be added to the header of your page. All commands can be be called
					immediately after the script include. When the full implementation is loaded any queued commands
					will be executed in the order they were received.
				</p>
				<div class={style.bookmarklet}>
					Run this on any site by creating a bookmark of <a href={bookmarklet}>this link</a>
				</div>
				<CodeMirror
					className={style.code}
					value={tag}
					style={{height: 'auto'}}
					options={{
						lineNumbers: true,
						indentWithTabs: true,
						tabSize: 2,
						mode: 'htmlmixed',
						viewportMargin: Infinity,
						readOnly: true
					}} />
			</div>
		);
	}
}
