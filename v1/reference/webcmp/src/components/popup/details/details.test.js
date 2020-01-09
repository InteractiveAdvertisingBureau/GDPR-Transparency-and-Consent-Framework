/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import Store from '../../../lib/store';
import purposesStyle from './purposes/purposes';

import Details from './details';

describe('Details', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render with purpose panel initially', () => {
		const store = new Store();
		store.isConsentToolShowing = false;
		const details = <Details store={store} />;
		expect(details).to.contain(purposesStyle.purposes);
	});


	it('should switch between panel states', () => {
		const store = new Store();

		let details;
		render(<Details
			store={store}
			ref={ref => details = ref}
		/>, scratch);

		expect(details.state.selectedPanelIndex).to.equal(0);
		details.handleShowVendors();
		expect(details.state.selectedPanelIndex).to.equal(1);
	});

});
