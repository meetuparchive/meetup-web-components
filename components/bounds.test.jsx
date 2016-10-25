import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import BoundsContainer from './BoundsContainer';


describe('BoundsContainer', function() {

	it('exists', function() {
		const bounds = TestUtils.renderIntoDocument(<BoundsContainer />);
		const boundsNode = ReactDOM.findDOMNode(bounds);

		expect(boundsNode).not.toBeNull();
	});

});
