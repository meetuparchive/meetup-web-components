import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageHeadContainer from './PageHeadContainer';


describe('PageHeadContainer', function() {

	it('exists', function() {
		const pageHead = TestUtils.renderIntoDocument(<PageHeadContainer />);
		const pageHeadNode = ReactDOM.findDOMNode(pageHead);

		expect(pageHeadNode).not.toBeNull();
	});

});
