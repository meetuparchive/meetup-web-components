import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageAction from './PageAction';


describe('PageAction', function() {

	it('exists', function() {
		const pageAction = TestUtils.renderIntoDocument(<PageAction />);
		const pageActionNode = ReactDOM.findDOMNode(pageAction);

		expect(pageActionNode).not.toBeNull();
	});

});
