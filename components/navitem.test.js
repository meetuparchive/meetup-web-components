import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Link from 'react-router/lib/Link';
import NavItem from './NavItem';
import { componentHasProperty } from './foundationTestUtils';

describe('NavItem', function() {
	beforeEach(function() {
		this.navItem = TestUtils.renderIntoDocument(<NavItem to='/' />);
		this.itemEl = ReactDOM.findDOMNode(this.navItem);
	});

	it('exists', function() {
		expect(this.itemEl).not.toBeNull();
	});

	it('creates an HTML li element', function() {
		expect(this.itemEl.nodeName).toBe('LI');
	});

	it('has SQ2 row-item styles', function() {
		expect(this.itemEl.classList.contains('row-item')).toBe(true);
	});

	it('creates a Link component using the NavItem `to` attribute', function() {
		const linkItem = TestUtils.findRenderedComponentWithType(this.navItem, Link);
		componentHasProperty(linkItem, 'to', '/');
	});
});
