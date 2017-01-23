import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import PageTitle from './PageTitle';


describe('PageTitle', function() {

	it('exists', function() {
		const pageTitle = TestUtils.renderIntoDocument(<PageTitle />);
		const pageTitleNode = ReactDOM.findDOMNode(pageTitle);

		expect(pageTitleNode).not.toBeNull();
	});

});
