import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import HScrollContainer from './HScrollContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('HScrollContainer', function() {

	it('exists', function() {
		const hScroll = intlRender(<HScrollContainer />);
		const hScrollNode = ReactDOM.findDOMNode(hScroll);

		expect(hScrollNode).not.toBeNull();
	});

});
