import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import GridList from './GridList';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('GridList', function() {

	it('exists', function() {
		const gridList = intlRender(<GridList />);
		const gridListNode = ReactDOM.findDOMNode(gridList);

		expect(gridListNode).not.toBeNull();
	});

});
