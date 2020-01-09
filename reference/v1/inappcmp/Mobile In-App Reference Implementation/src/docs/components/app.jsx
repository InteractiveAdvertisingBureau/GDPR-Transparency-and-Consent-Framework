import { h, Component } from 'preact';
import classnames from 'classnames';
import Nav, {navItems} from './nav/nav';
import style from './app.less';

import {
	HashRouter as Router,
	Route,
} from 'react-router-dom';

function buildRoute(item) {
	return <Route exact={item.to === '/'} key={item.to} path={item.to} component={item.component} />;
}

export default class App extends Component {
	state = {
		menuExpanded: false
	};

	toggleMenu = (isExpanded) => {
		this.setState({
			menuExpanded: typeof isExpanded === 'boolean' ? isExpanded : !this.state.menuExpanded
		});
	};


	render(props, state) {

		const {menuExpanded} = state;
		const routes = navItems.reduce((acc, navItem) => acc.concat(navItem.items.map(buildRoute)), []);

		return (
			<Router>
				<div className={classnames(style.app, {[style.menuExpanded]: menuExpanded})}>
					<section className={style.nav}>
						<Nav toggleMenu={this.toggleMenu} menuExpanded={menuExpanded} />
					</section>
					<section className={style.main}>
						{routes}
					</section>
				</div>
			</Router>
		);
	}
}
