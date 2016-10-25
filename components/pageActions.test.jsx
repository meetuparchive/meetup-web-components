import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageActionsContainer from './PageActionsContainer';


describe('PageActionsContainer', function() {

	it('exists', function() {
		const pageActions = TestUtils.renderIntoDocument(<PageActionsContainer />);
		const pageActionsNode = ReactDOM.findDOMNode(pageActions);

		expect(pageActionsNode).not.toBeNull();
	});

});
