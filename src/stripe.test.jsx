import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Stripe from './Stripe';


describe('Stripe', function() {

	it('exists', function() {
		const stripe = TestUtils.renderIntoDocument(<Stripe />);
		const stripeNode = ReactDOM.findDOMNode(stripe);

		expect(stripeNode).not.toBeNull();
	});

});
