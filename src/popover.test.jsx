import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Popover from './Popover';

describe('Popover', () => {

	describe('is a HTML button element', () => {
		let el;

		beforeEach(() => {
			const popover = TestUtils.renderIntoDocument(<Popover />);
			el = ReactDOM.findDOMNode(popover);
		});

		afterEach(() => {
			el = null;
		});

		it('exists', () => {
			expect(el).not.toBeNull();
		});

	});

});

