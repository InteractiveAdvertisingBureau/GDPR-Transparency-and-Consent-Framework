import { expect } from 'chai';

import config from './config';
import log from './log';

describe('log', () => {

	beforeEach(() => {
		window.console.log = jest.fn();
		window.console.info = jest.fn();
		window.console.warn = jest.fn();
		window.console.error = jest.fn();
	});

	it('defaults to not logging', () => {

		log.debug('debug');
		log.info('info');
		log.warn('warn');
		log.error('error');

		expect(window.console.log.mock.calls).to.be.empty;
		expect(window.console.info.mock.calls).to.be.empty;
		expect(window.console.warn.mock.calls).to.be.empty;
		expect(window.console.error.mock.calls).to.be.empty;
	});

	it('use console.log for "debug"', () => {
		config.update({
			logging: 'debug'
		});

		log.debug('debug');

		expect(window.console.log.mock.calls).to.have.length(1);
	});

	it('respects logging level "error"', () => {
		config.update({
			logging: 'error'
		});

		log.debug('debug');
		log.info('info');
		log.warn('warn');
		log.error('error');

		expect(window.console.log.mock.calls).to.be.empty;
		expect(window.console.info.mock.calls).to.be.empty;
		expect(window.console.warn.mock.calls).to.be.empty;
		expect(window.console.error.mock.calls).to.have.length(1);
	});
});
