import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Chunk, {
	CHUNK_CLASS
} from './Chunk';


describe('Chunk', function() {
	const chunk = TestUtils.renderIntoDocument(<Chunk />);
	const chunkNode = ReactDOM.findDOMNode(chunk);

	it('exists', function() {
		expect(chunkNode).not.toBeNull();
	});

	it(`check that default component has '${CHUNK_CLASS}' class`, function() {
		expect(chunkNode.classList).toContain(CHUNK_CLASS);
	});
});
