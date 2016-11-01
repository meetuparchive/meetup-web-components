import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import GridListContainer from './GridListContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('GridListContainer', function() {

	it('exists', function() {
		const gridList = intlRender(<GridListContainer />);
		const gridListNode = ReactDOM.findDOMNode(gridList);

		expect(gridListNode).not.toBeNull();
	});

});
