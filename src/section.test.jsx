import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Section from './Section';

describe('Section', function() {

	it('exists', function() {
		const section = TestUtils.renderIntoDocument(<Section />);
		const sectionNode = ReactDOM.findDOMNode(section);

		expect(sectionNode).not.toBeNull();
	});

});
