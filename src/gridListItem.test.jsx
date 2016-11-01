import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import GridListItemContainer from './GridListItemContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('GridListItemContainer', function() {

	it('exists', function() {
		const gridListItem = intlRender(<GridListItemContainer />);
		const gridListItemNode = ReactDOM.findDOMNode(gridListItem);

		expect(gridListItemNode).not.toBeNull();
	});

});
