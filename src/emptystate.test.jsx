import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import EmptyContainer from './EmptyContainer';

describe('EmptyContainer', function() {

	it('exists', function() {
		const emptyState = TestUtils.renderIntoDocument(<EmptyContainer />);
		const emptyNode = ReactDOM.findDOMNode(emptyState);

		expect(emptyNode).not.toBeNull();
	});

});
