import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { MOCK_DATETIME } from 'meetup-web-platform/util/mocks/app';
import { hasChildByClassName } from '../utils/testUtils';
import DateDisplay from './DateDisplay';

describe('DateDisplay', () => {
	let dateDisplayEl;

	beforeEach(() => {
		const dateDisplay = TestUtils.renderIntoDocument(
			<IntlProvider locale='en'>
				<DateDisplay datetime={MOCK_DATETIME}/>
			</IntlProvider>
		);

		dateDisplayEl = ReactDOM.findDOMNode(dateDisplay);
	});

	afterEach(() => {
		dateDisplayEl = null;
	});

	it('exists', () => {
		expect(dateDisplayEl).not.toBeNull();
	});

	it('creates an HTML time element', () => {
		expect(dateDisplayEl.nodeName).toBe('TIME');
	});

	it('has child nodes', () => {
		expect(dateDisplayEl.hasChildNodes()).toBe(true);
	});

	it('creates a SQ2 date element', () => {
		hasChildByClassName(dateDisplayEl, 'dateDisplay-day');
	});

	it('creates a SQ2 month element', () => {
		hasChildByClassName(dateDisplayEl, 'dateDisplay-month');
	});
});
