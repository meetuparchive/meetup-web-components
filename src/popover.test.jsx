import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import PopoverContainer from './PopoverContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('PopoverContainer', function() {

	it('exists', function() {
		const popover = intlRender(<PopoverContainer />);
		const popoverNode = ReactDOM.findDOMNode(popover);

		expect(popoverNode).not.toBeNull();
	});

});
