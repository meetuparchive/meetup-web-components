import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NavItem from './NavItem';

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

});
