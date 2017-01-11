import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Tabs from './Tabs';
import TabsTab from './TabsTab';

describe('Tabs', function() {

	it('exists', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs bordered full>
				<TabsTab isActive
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
		expect(tabsNode).not.toBeNull();
	});

	it('applies selected tab class correctly', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs bordered full>
				<TabsTab isActive
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
		const selectedTabNodes = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-tab--selected');
		const firstTabClass = selectedTabNodes[0].getAttribute('class');

		expect(selectedTabNodes.length).toBe(1);
		expect(firstTabClass.indexOf('tabs-tab--selected') > -1).toBe(true);
	});

	it('applies variant classes correctly', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs bordered full>
				<TabsTab isActive
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
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(tabs, 'UL')[0];
		const tabsClass = tabsUlEl.getAttribute('class');

		expect(tabsClass.indexOf('tabs--full')).toBeGreaterThan(-1);
		expect(tabsClass.indexOf('tabs--bordered')).toBeGreaterThan(-1);
	});

	it('only applies variant classes when set by props', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs>
				<TabsTab isActive
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
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(tabs, 'UL')[0];
		const tabsClass = tabsUlEl.getAttribute('class');

		expect(tabsClass.indexOf('tabs--full')).toBe(-1);
		expect(tabsClass.indexOf('tabs--bordered')).toBe(-1);
	});

	it('should throw an error if tab elements aren\'t of type `TabsTab`', function() {
		expect(TestUtils.renderIntoDocument(
			<Tabs>
				<button>Hello world</button>
			</Tabs>
		)).toThrow();
	});
});
