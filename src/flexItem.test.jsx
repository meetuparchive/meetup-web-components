import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import FlexItem from './FlexItem';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('FlexItem', function() {

	it('exists', function() {
		const flexItem = intlRender(<FlexItem />);
		const flexItemNode = ReactDOM.findDOMNode(flexItem);

		expect(flexItemNode).not.toBeNull();
	});

});
