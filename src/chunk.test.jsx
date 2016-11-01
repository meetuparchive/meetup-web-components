import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ChunkContainer from './ChunkContainer';


describe('ChunkContainer', function() {

	it('exists', function() {
		const chunk = TestUtils.renderIntoDocument(<ChunkContainer />);
		const chunkNode = ReactDOM.findDOMNode(chunk);

		expect(chunkNode).not.toBeNull();
	});

});
