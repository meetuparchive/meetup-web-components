import React from 'react';
import ReactDOM from 'react-dom';
import Section from './Section';

describe('Section', function() {

	it('exists', function() {
		const section = intlRender(<Section />);
		const sectionNode = ReactDOM.findDOMNode(section);

		expect(sectionNode).not.toBeNull();
	});

});
