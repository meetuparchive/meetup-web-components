import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import FlexContainer from './FlexContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('FlexContainer', function() {

	it('exists', function() {
		const flex = intlRender(<FlexContainer />);
		const flexNode = ReactDOM.findDOMNode(flex);

		expect(flexNode).not.toBeNull();
	});

});
