import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import Flex from './Flex';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('Flex', function() {

	it('exists', function() {
		const flex = intlRender(<Flex />);
		const flexNode = ReactDOM.findDOMNode(flex);

		expect(flexNode).not.toBeNull();
	});

});
