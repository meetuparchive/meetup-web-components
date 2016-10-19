import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from './Header';
import { hasRoleAttribute } from '../utils/foundationTestUtils';

describe ('Header', () => {
	let headerEl;

	beforeEach(() => {
		const header = TestUtils.renderIntoDocument(<Header />);
		headerEl = ReactDOM.findDOMNode(header);
	});

	afterEach(() => {
		headerEl = null;
	});

	it('exists', () => {
		expect(headerEl).not.toBeNull();
	});

	it('creates an HTML header element', () => {
		expect(headerEl.nodeName).toBe('HEADER');
	});

	it('has a `banner` role attribute', () => {
		hasRoleAttribute(headerEl, 'banner');
	});
});
