import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LabelContainer from './LabelContainer';

describe('LabelContainer', function() {

	it('exists', function() {
		const label = TestUtils.renderIntoDocument(<LabelContainer />);
		const labelNode = ReactDOM.findDOMNode(label);

		expect(labelNode).not.toBeNull();
	});

});
