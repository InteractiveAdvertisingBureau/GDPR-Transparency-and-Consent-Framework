import { h, Component } from 'preact';
import {Localize} from '../../lib/localize';

const lookup = new Localize().lookup;

export default class Label extends Component {
	static defaultProps = {
		prefix: ''
	};

	render(props, state) {
		const { prefix, localizeKey, className, children } = props;
		const key = prefix ? `${prefix}.${localizeKey}` : localizeKey;
		const localizedContent = lookup(key);

		return (
			<span
				class={props.class || className}
				dangerouslySetInnerHTML={localizedContent && {__html: localizedContent}}>
				{!localizedContent && children}
			</span>
		);
	}
}
