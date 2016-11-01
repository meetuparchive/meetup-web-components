import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageActionContainer from './PageActionContainer';


describe('PageActionContainer', function() {

	it('exists', function() {
		const pageAction = TestUtils.renderIntoDocument(<PageActionContainer />);
		const pageActionNode = ReactDOM.findDOMNode(pageAction);

		expect(pageActionNode).not.toBeNull();
	});

});
