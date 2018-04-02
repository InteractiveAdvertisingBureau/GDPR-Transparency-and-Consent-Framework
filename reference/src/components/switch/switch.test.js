/* eslint-disable react/jsx-no-bind */
import { h, render } from 'preact';
import { expect } from 'chai';
import style from './switch.less';

import Switch from './switch';

describe('Switch', () => {
	let scratch;

	beforeEach(() => {
		scratch = document.createElement('div');
	});


	it('should render switch component selected', () => {
		const switchComponent = <Switch isSelected />;
		expect(switchComponent).to.contain(style.isSelected);
	});

	it('should render switch component not selected', () => {
		const switchComponent = <Switch isSelected={false} />;
		expect(switchComponent).to.not.contain(style.isSelected);
	});

	it('should handle a click event', (done) => {
		const switchComponent = (<Switch isSelected onClick={() => {
			done();
		}} />);
		const rendered = render(switchComponent, scratch);
		rendered.click();
	});
});
