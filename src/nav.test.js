import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Nav from './Nav';
import { hasRoleAttribute } from '../utils/testUtils';

describe ('Nav', () => {
	it('exists', () => {
		const nav = TestUtils.renderIntoDocument(<Nav />);
		const navEl = ReactDOM.findDOMNode(nav);
		expect(navEl).not.toBeNull();
	});

	it('creates an HTML nav element', () => {
		const nav = TestUtils.renderIntoDocument(<Nav />);
		const navEl = ReactDOM.findDOMNode(nav);
		expect(navEl.nodeName).toBe('NAV');
	});

	it('has a `navigation` role attribute', () => {
		const nav = TestUtils.renderIntoDocument(<Nav />);
		const navEl = ReactDOM.findDOMNode(nav);
		hasRoleAttribute(navEl, 'navigation');
	});

	it('applies an aria-label attribute', () => {
		const nav = TestUtils.renderIntoDocument(<Nav aria-label='siteNav' />);
		const navEl = ReactDOM.findDOMNode(nav);
		expect(navEl.getAttribute('aria-label')).toBe('siteNav');
	});
});
