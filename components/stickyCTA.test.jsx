import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import StickyCTAContainer from './StickyCTAContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('StickyCTAContainer', function() {

	it('exists', function() {
		const stickyCTA = intlRender(<StickyCTAContainer />);
		const stickyCTANode = ReactDOM.findDOMNode(stickyCTA);

		expect(stickyCTANode).not.toBeNull();
	});

});
