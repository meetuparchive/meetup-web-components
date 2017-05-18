import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ToggleContainer from './ToggleContainer';

describe('ToggleContainer', function() {

	it('exists', function() {
		const toggle = TestUtils.renderIntoDocument(<ToggleContainer />);
		const toggleNode = ReactDOM.findDOMNode(toggle);

		expect(toggleNode).not.toBeNull();
	});

});
