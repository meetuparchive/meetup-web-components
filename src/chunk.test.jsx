import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Chunk from './Chunk';


describe('Chunk', function() {

	it('exists', function() {
		const chunk = TestUtils.renderIntoDocument(<Chunk />);
		const chunkNode = ReactDOM.findDOMNode(chunk);

		expect(chunkNode).not.toBeNull();
	});

});
