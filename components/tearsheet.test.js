import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { MOCK_DATETIME } from 'meetup-web-platform/util/mocks/app';
import { hasChildByClassName } from '../utils/foundationTestUtils';
import TearSheet from './TearSheet';

describe('TearSheet', () => {
	let tearsheetEl;

	beforeEach(() => {
		const tearsheet = TestUtils.renderIntoDocument(
			<IntlProvider locale='en'>
				<TearSheet datetime={MOCK_DATETIME}/>
			</IntlProvider>
		);

		tearsheetEl = ReactDOM.findDOMNode(tearsheet);
	});

	afterEach(() => {
		tearsheetEl = null;
	});

	it('exists', () => {
		expect(tearsheetEl).not.toBeNull();
	});

	it('creates an HTML time element', () => {
		expect(tearsheetEl.nodeName).toBe('TIME');
	});

	it('has child nodes', () => {
		expect(tearsheetEl.hasChildNodes()).toBe(true);
	});

	it('creates a SQ2 date element', () => {
		hasChildByClassName(tearsheetEl, 'tearsheet-date');
	});

	it('creates a SQ2 month element', () => {
		hasChildByClassName(tearsheetEl, 'tearsheet-month');
	});
});
