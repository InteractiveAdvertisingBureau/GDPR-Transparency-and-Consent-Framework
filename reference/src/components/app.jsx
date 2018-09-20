import { h, Component } from 'preact';
import style from './app.less';

import Popup from './popup/popup';
import Footer from './footer/footer';

export default class App extends Component {
	state = {
		store: this.props.store,
		theme: 'family'
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
	};


	updateState = (store) => {
		this.setState({ store });
	};

	setTheme = () => {
		let wdgNode = document.getElementById('wdg_iab_container'),
			attrTheme = wdgNode.getAttribute("data-theme"),
			themeVal = 'family';
		
		if(themeVal.length) {
			themeVal = attrTheme;
		}
		this.setState({
			theme: themeVal
		});
	};

	componentWillMount() {
		this.setTheme();
		const { store } = this.props;
		store.subscribe(this.updateState);
	}

	render(props, state) {

		const {
			store,
			theme
		} = state;

		return (
			<div class={style.gdpr} data-theme={theme}>
				<Popup store={store}
					   onSave={this.onSave}
				/>
				<Footer store={store} />
			</div>
		);
	}
}
