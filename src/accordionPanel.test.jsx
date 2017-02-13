import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AccordionPanel from './AccordionPanel';

describe('AccordionPanel', function() {

	it('exists', function() {
		const accordion = TestUtils.renderIntoDocument(<AccordionPanel />);
		const accordionNode = ReactDOM.findDOMNode(accordion);

		expect(accordionNode).not.toBeNull();
	});

});
