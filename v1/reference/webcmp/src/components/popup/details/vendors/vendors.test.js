/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './vendors.less';

import Vendors from './vendors';

describe('Vendors', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('should render the vendor list', () => {
		const vendors = render(<Vendors
			vendors={[
				{id: 1, name: 'Vendor 1'},
				{id: 2, name: 'Vendor 2'},
				{id: 3, name: 'Vendor 3'},
				{id: 4, name: 'Vendor 4'}
			]}
		/>, scratch);

		const vendorRows = vendors.querySelectorAll(`.${style.vendorContent} tr`);
		expect(vendorRows.length).to.equal(4);
	});

	it('should handle selecting a vendor', () => {
		const selectVendor = jest.fn();

		let vendors;
		render(<Vendors
			ref={ref => vendors = ref}
			vendors={[
				{id: 1, name: 'Vendor 1'},
				{id: 2, name: 'Vendor 2'},
				{id: 3, name: 'Vendor 3'},
				{id: 4, name: 'Vendor 4'}
			]}
			selectVendor={selectVendor}
		/>, scratch);

		vendors.handleSelectVendor({dataId: 2, isSelected: true});
		expect(selectVendor.mock.calls[0][0]).to.equal(2);
		expect(selectVendor.mock.calls[0][1]).to.equal(true);
	});

	it('should handle accepting all vendors', () => {
		const selectAllVendors = jest.fn();

		let vendors;
		render(<Vendors
			ref={ref => vendors = ref}
			vendors={[
				{id: 1, name: 'Vendor 1'},
				{id: 2, name: 'Vendor 2'},
				{id: 3, name: 'Vendor 3'},
				{id: 4, name: 'Vendor 4'}
			]}
			selectAllVendors={selectAllVendors}
		/>, scratch);

		vendors.handleAcceptAll();
		expect(selectAllVendors.mock.calls[0][0]).to.equal(true);
	});

	it('should handle rejecting all vendors', () => {
		const selectAllVendors = jest.fn();

		let vendors;
		render(<Vendors
			ref={ref => vendors = ref}
			vendors={[
				{id: 1, name: 'Vendor 1'},
				{id: 2, name: 'Vendor 2'},
				{id: 3, name: 'Vendor 3'},
				{id: 4, name: 'Vendor 4'}
			]}
			selectAllVendors={selectAllVendors}
		/>, scratch);

		vendors.handleRejectAll();
		expect(selectAllVendors.mock.calls[0][0]).to.equal(false);
	});
});
