import { h, Component } from 'preact';


export default class Panel extends Component {

	render(props) {
		const { children=[], selectedIndex } = props;
		const section = children.length && selectedIndex < children.length ? children[selectedIndex] : null;

		return (
			section
		);
	}
}

