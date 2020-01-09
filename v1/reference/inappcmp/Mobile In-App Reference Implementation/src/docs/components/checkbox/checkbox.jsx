import { h, Component } from 'preact';

export default class Checkbox extends Component {

	static defaultProps = {
		onChange: () => {}
	};


	render(props) {
		const {
			children,
			onChange,
			isSelected,
			isDisabled
		} = props;

		return (
			<label
				class={props.class}
			>
				<input
					type='checkbox'
					disabled={isDisabled}
					checked={isSelected}
					onChange={onChange}
				/>
				<span>
					{children}
				</span>
			</label>
		);
	}
}
