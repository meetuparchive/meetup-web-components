import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageHead from './PageHead';


describe('PageHead', function() {

	it('exists', function() {
		const pageHead = TestUtils.renderIntoDocument(<PageHead />);
		const pageHeadNode = ReactDOM.findDOMNode(pageHead);

		expect(pageHeadNode).not.toBeNull();
	});

});
