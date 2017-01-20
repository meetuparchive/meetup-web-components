import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageActions from './PageActions';


describe('PageActions', function() {

	it('exists', function() {
		const pageActions = TestUtils.renderIntoDocument(<PageActions />);
		const pageActionsNode = ReactDOM.findDOMNode(pageActions);

		expect(pageActionsNode).not.toBeNull();
	});

});
