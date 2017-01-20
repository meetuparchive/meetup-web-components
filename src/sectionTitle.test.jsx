import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SectionTitle from './SectionTitle';


describe('SectionTitle', function() {

	it('exists', function() {
		const sectionTitle = TestUtils.renderIntoDocument(<SectionTitle />);
		const sectionTitleNode = ReactDOM.findDOMNode(sectionTitle);

		expect(sectionTitleNode).not.toBeNull();
	});

});
