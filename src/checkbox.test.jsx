import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Checkbox from './Checkbox';


describe('CheckboxContainer', function() {

	it('exists', function() {
		const checkbox = TestUtils.renderIntoDocument(<Checkbox name='hello' id='hello' checked={false} />);
		const checkboxNode = ReactDOM.findDOMNode(checkbox);

		expect(checkboxNode).not.toBeNull();
	});

	it('has a label', function() {});

	it('calls onChange and sets state when clicked', function() {});
});
