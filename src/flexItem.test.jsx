import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import FlexItemContainer from './FlexItemContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('FlexItemContainer', function() {

	it('exists', function() {
		const flexItem = intlRender(<FlexItemContainer />);
		const flexItemNode = ReactDOM.findDOMNode(flexItem);

		expect(flexItemNode).not.toBeNull();
	});

});
