import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AccordionPanelGroupContainer from './AccordionPanelGroupContainer';

describe('AccordionPanelGroupContainer', function() {

	it('exists', function() {
		const accordionPanelGroup = TestUtils.renderIntoDocument(<AccordionPanelGroupContainer />);
		const accordionPanelGroupNode = ReactDOM.findDOMNode(accordionPanelGroup);

		expect(accordionPanelGroupNode).not.toBeNull();
	});

});
