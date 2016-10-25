import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import UnevenGridContainer from './UnevenGridContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('UnevenGridContainer', function() {

	it('exists', function() {
		const unevenGrid = intlRender(<UnevenGridContainer />);
		const unevenGridNode = ReactDOM.findDOMNode(unevenGrid);

		expect(unevenGridNode).not.toBeNull();
	});

});
