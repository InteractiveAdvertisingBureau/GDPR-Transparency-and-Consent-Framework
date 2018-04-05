import { h, Component } from 'preact';
import style from './closebutton.less';

export default class CloseButton extends Component {

	static defaultProps = {
		onClick: () => {},
		width: 30,
		height: 30,
		hasBorder: true
	};

	render(props) {
		const {
			onClick,
			hasBorder,
			width,
			height
		} = props;

		return (
			<span
				class={[style.closeButton, hasBorder ? style.hasBorder : '', props.class].join(' ')}
				onClick={onClick}>
				<svg width={width} height={height} viewBox='0 0 16 16' preserveAspectRatio='xMidYMid meet'>
					<path d='M6.837 8l-2.45-2.464 1.17-1.17 2.45 2.464 2.465-2.465 1.17 1.17L9.162 8l2.48 2.464-1.167 1.17-2.467-2.48-2.48 2.48-1.17-1.17L6.838 8z'></path>
				</svg>
			</span>
		);
	}
}
