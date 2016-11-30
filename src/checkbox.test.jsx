import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import CheckboxContainer from './CheckboxContainer';


describe('CheckboxContainer', function() {

	it('exists', function() {
		const checkbox = TestUtils.renderIntoDocument(<CheckboxContainer />);
		const checkboxNode = ReactDOM.findDOMNode(checkbox);

		expect(checkboxNode).not.toBeNull();
	});

});
