import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from './Footer';
import { hasRoleAttribute } from '../utils/foundationTestUtils';

describe('Footer', () => {
	let footerEl;

	beforeEach(() => {
		const footer = TestUtils.renderIntoDocument(<Footer />);
		footerEl = ReactDOM.findDOMNode(footer);
	});

	afterEach(() => {
		footerEl = null;
	});

	it('exists', () => {
		expect(footerEl).not.toBeNull();
	});

	it('creates an HTML footer element', () => {
		expect(footerEl.nodeName).toBe('FOOTER');
	});

	it('has a `contentinfo` role attribute', () => {
		hasRoleAttribute(footerEl, 'contentinfo');
	});
});
