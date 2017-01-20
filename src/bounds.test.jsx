import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Bounds from './Bounds';


describe('Bounds', function() {

	it('exists', function() {
		const bounds = TestUtils.renderIntoDocument(<Bounds />);
		const boundsNode = ReactDOM.findDOMNode(bounds);

		expect(boundsNode).not.toBeNull();
	});

});
