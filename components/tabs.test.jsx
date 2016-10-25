import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import TabsContainer from './TabsContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('TabsContainer', function() {

	it('exists', function() {
		const tabs = intlRender(<TabsContainer />);
		const tabsNode = ReactDOM.findDOMNode(tabs);

		expect(tabsNode).not.toBeNull();
	});

});
