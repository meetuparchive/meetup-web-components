import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import DropMenuContainer from './DropMenuContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('DropMenuContainer', function() {

	it('exists', function() {
		const dropMenu = intlRender(<DropMenuContainer />);
		const dropMenuNode = ReactDOM.findDOMNode(dropMenu);

		expect(dropMenuNode).not.toBeNull();
	});

});
