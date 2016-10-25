import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import StripeContainer from './StripeContainer';


describe('StripeContainer', function() {

	it('exists', function() {
		const stripe = TestUtils.renderIntoDocument(<StripeContainer />);
		const stripeNode = ReactDOM.findDOMNode(stripe);

		expect(stripeNode).not.toBeNull();
	});

});
