import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageActionButtonContainer from './PageActionButtonContainer';


describe('PageActionButtonContainer', function() {

	it('exists', function() {
		const pageActionButton = TestUtils.renderIntoDocument(<PageActionButtonContainer />);
		const pageActionButtonNode = ReactDOM.findDOMNode(pageActionButton);

		expect(pageActionButtonNode).not.toBeNull();
	});

});
