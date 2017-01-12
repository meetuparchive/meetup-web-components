import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Bounds, {
	BOUNDS_CLASS
} from './Bounds';

describe('Bounds', function() {
	const bounds = TestUtils.renderIntoDocument(<Bounds />);
	const boundsNode = ReactDOM.findDOMNode(bounds);

	it('exists', function() {
		expect(boundsNode).not.toBeNull();
	});
	it(`check that default component has '${BOUNDS_CLASS}' class`, function() {
		expect(boundsNode.classList).toContain(BOUNDS_CLASS);
	});

});
