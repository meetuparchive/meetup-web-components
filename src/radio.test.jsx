import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import RadioContainer from './RadioContainer';


describe('RadioContainer', function() {

	it('exists', function() {
		const radio = TestUtils.renderIntoDocument(<RadioContainer />);
		const radioNode = ReactDOM.findDOMNode(radio);

		expect(radioNode).not.toBeNull();
	});

});
