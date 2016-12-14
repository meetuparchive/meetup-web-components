import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import CardContainer from './CardContainer';


describe('CardContainer', function() {

	it('exists', function() {
		const card = TestUtils.renderIntoDocument(<CardContainer />);
		const cardNode = ReactDOM.findDOMNode(card);

		expect(cardNode).not.toBeNull();
	});

});
