import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageActionButton from './PageActionButton';


describe('PageActionButton', function() {

	it('exists', function() {
		const pageActionButton = TestUtils.renderIntoDocument(<PageActionButton />);
		const pageActionButtonNode = ReactDOM.findDOMNode(pageActionButton);

		expect(pageActionButtonNode).not.toBeNull();
	});

});
