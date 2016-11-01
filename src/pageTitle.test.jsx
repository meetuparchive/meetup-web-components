import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageTitleContainer from './PageTitleContainer';


describe('PageTitleContainer', function() {

	it('exists', function() {
		const pageTitle = TestUtils.renderIntoDocument(<PageTitleContainer />);
		const pageTitleNode = ReactDOM.findDOMNode(pageTitle);

		expect(pageTitleNode).not.toBeNull();
	});

});
