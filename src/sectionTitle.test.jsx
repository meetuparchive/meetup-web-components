import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SectionTitleContainer from './SectionTitleContainer';


describe('SectionTitleContainer', function() {

	it('exists', function() {
		const sectionTitle = TestUtils.renderIntoDocument(<SectionTitleContainer />);
		const sectionTitleNode = ReactDOM.findDOMNode(sectionTitle);

		expect(sectionTitleNode).not.toBeNull();
	});

});
