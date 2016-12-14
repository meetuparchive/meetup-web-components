import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { Tabs, TabsTab } from './Tabs';

describe('Tabs', function() {
	const tabs = TestUtils.renderIntoDocument(
		<Tabs
			bordered={true}
			full={true} >
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
	const tabsNode = ReactDOM.findDOMNode(tabs);

	it('exists', function() {
		expect(tabsNode).not.toBeNull();
	});

	it('applies selected tab class correctly', function() {
		const selectedTabNodes = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-tab--selected');
		const firstTabClass = selectedTabNodes[0].getAttribute('class');

		expect(selectedTabNodes.length).toBe(1);
		expect(firstTabClass.indexOf('tabs-tab--selected') > -1).toBe(true);
	});

	it('applies variant classes correctly', function() {
		const tabsClass = tabsNode.getAttribute('class');
		const hasFullWidthClass = tabsClass.indexOf('tabs--full') > -1;
		const hasBorderedClass = tabsClass.indexOf('tabs--bordered') > -1;

		expect(hasFullWidthClass).toBe(true);
		expect(hasBorderedClass).toBe(true);
	});

});
