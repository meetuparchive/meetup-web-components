import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import Tabs from './Tabs';

describe('Tabs', function() {
	const tabs = TestUtils.renderIntoDocument(
		<Tabs>
			<TabsTab
				isActive={true}
				url='/foo'
				label='First Tab' />
			<TabsTab
				url='/bar'
				label='Second Tab' />
			<TabsTab
				url='/bar'
				label='Third Tab' />
		</Tabs>
	);

	it('exists', function() {
		const tabsNode = ReactDOM.findDOMNode(tabs);
		expect(tabsNode).not.toBeNull();
	});

});
