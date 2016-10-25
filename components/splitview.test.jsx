import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SplitviewContainer from './SplitviewContainer';


describe('SplitviewContainer', function() {

	it('exists', function() {
		const splitview = TestUtils.renderIntoDocument(<SplitviewContainer />);
		const splitviewNode = ReactDOM.findDOMNode(splitview);

		expect(splitviewNode).not.toBeNull();
	});

});
