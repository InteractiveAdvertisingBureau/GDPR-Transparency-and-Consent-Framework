import { h, Component } from 'preact';
import style from './docs.less';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Link } from 'react-router-dom';
import Url from 'url';
import JSCode from 'codemirror/mode/htmlmixed/htmlmixed'; // eslint-disable-line no-unused-vars

const {host, pathname} = window.location;
const SCRIPT_PATH = Url.resolve(`//${host}${pathname}`, '../cmp.complete.bundle.js');

const basicInclude = `
<html>
	<body>
		<script src="${SCRIPT_PATH}" async></script>
	</body>
</html>
`.trim();

const enableLogging = `
<html>
	<body>
		<script>window.__cmp = {config: {logging: 'debug'}}</script>
		<script src="${SCRIPT_PATH}" async></script>
	</body>
</html>
`.trim();

const manualShow = `
<html>
	<body>
		<button onclick="window.__cmp('showConsentTool')">My Consent Settings</button>
	</body>
</html>
`.trim();

export default class Setup extends Component {

	render(props, state) {

		return (
			<div>
				<section>
					<span className={style.header}>Install the CMP Script</span>
					<p>
						If you only want to ask for consent to comply with the GDPR regulation you can include a single
						script:
					</p>
					<CodeMirror
						value={basicInclude}
						options={{
							lineNumbers: true,
							indentWithTabs: true,
							tabSize: 2,
							mode: 'htmlmixed',
							viewportMargin: Infinity,
							readOnly: true
						}} />
					<p>
						This will do the following:
						<ol>
							<li>Load the CMP script from this site</li>
							<li>Request the global vendor list</li>
							<li>Lookup existing consent data from the consent cookie</li>
							<li>
								Determine if the consent tool should be shown to the user:
								<ul>
									<li>If cookies are disabled: <span class={style.action}>do nothing</span></li>
									<li>If consent data exists and the vendor list version is current: <span class={style.action}>do nothing</span></li>
									<li>If no consent data is found: <span class={style.action}>show the consent tool</span></li>
									<li>If consent data is found and the vendor list version does not match: <span class={style.action}>show the consent tool</span></li>
								</ul>
							</li>
						</ol>
					</p>
					<p>
						If you need more control over how and when the consent tool is shown include the script as described <Link to='/setup'>here</Link>.
					</p>
				</section>
				<section>
					<span className={style.header}>Vendors and Purposes</span>
					<p>
						The consent tool presents the user with lists of purposes and vendors that they
						can individually consent to.  These lists are controlled by a vendors.json file.
						If you would like to customize this list to only include a subset of the master
						list you can add a vendors.json file to your domain at <span class={style.highlight}>/cmp/vendors.json</span>.
						You can generate a file using this <Link to='/tools/vendor-list-builder'>tool</Link>.
					</p>
				</section>
				<section>
					<span className={style.header}>Manually Trigger the Consent Tool</span>
					<p>
						If you need to manually show the consent tool you could add a click event to an element:
					</p>

					<CodeMirror
						value={manualShow}
						options={{
							lineNumbers: true,
							indentWithTabs: true,
							tabSize: 2,
							mode: 'htmlmixed',
							viewportMargin: Infinity,
							readOnly: true
						}} />
					<p>
						This will show the consent tool regardless of existing consent data.
					</p>
				</section>

				<section>
					<span className={style.header}>Troubleshooting</span>
					<p>
						You can enable logging to see what the the CMP is doing by specifying the log level in the
						config object before loading the cmp script:
					</p>
					<CodeMirror
						value={enableLogging}
						options={{
							lineNumbers: true,
							indentWithTabs: true,
							tabSize: 2,
							mode: 'htmlmixed',
							viewportMargin: Infinity,
							readOnly: true
						}} />
					<p>
						Log messages will be output to your browser console.
					</p>
				</section>

				<section>
					<span className={style.header}>Demo</span>
					<p>
						See a demo of how the script functions <a href='complete.html' target='_blank'>here</a>.
					</p>
				</section>
			</div>
		);
	}
}
