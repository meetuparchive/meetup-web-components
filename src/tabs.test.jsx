import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Tabs, TabsTab } from './Tabs';

describe('Tabs', function() {
	let componentBasic,
		componentWithVariants;

	beforeEach(() => {
		componentBasic = TestUtils.renderIntoDocument(
			<Tabs className='test-class-wrapper-name'>
				<TabsTab className='test-class-name'>First tab</TabsTab>
				<TabsTab isSelected>Second tab</TabsTab>
				<TabsTab>Third tab</TabsTab>
			</Tabs>
		);
		componentWithVariants = TestUtils.renderIntoDocument(
			<Tabs full bordered>
				<TabsTab>First tab</TabsTab>
				<TabsTab isSelected>Second tab</TabsTab>
				<TabsTab>Third tab</TabsTab>
			</Tabs>
		);
	});
	afterEach(() => {
		componentBasic = null;
		componentWithVariants = null;
	});

	it('applies selected tab class correctly', function() {
		const selectedTabNodes = TestUtils.scryRenderedDOMComponentsWithClass(
			componentBasic,
			'tabs-tab--selected'
		);
		const firstTabClass = selectedTabNodes[0].classList;

		expect(selectedTabNodes).toHaveLength(1);
		expect(firstTabClass).toContain('tabs-tab--selected');
	});

	it('applies variant classes correctly', function() {
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(
			componentWithVariants,
			'UL'
		)[0];

		expect(tabsUlEl.classList).toContain('tabs--full');
		expect(tabsUlEl.classList).toContain('tabs--bordered');
	});

	it('should *not* apply variant classes when set by props', function() {
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(
			componentBasic,
			'UL'
		)[0];

		expect(tabsUlEl.classList).not.toContain('tabs--full');
		expect(tabsUlEl.classList).not.toContain('tabs--bordered');
	});

	it('appropriately adds passed prop classname to component `Tabs` component', function() {
		const tab = TestUtils.findRenderedDOMComponentWithClass(componentBasic, 'test-class-wrapper-name');
		expect(() => tab).not.toThrow();
		expect(tab.tagName).toBe('NAV');
	});

	it('appropriately adds passed prop classname to component `TabsTab` component', function() {
		const tabsTab = TestUtils.findRenderedDOMComponentWithClass(componentBasic, 'test-class-name');
		expect(() => tabsTab).not.toThrow();
		expect(tabsTab.classList).toContain('tabs-tab');
	});
});
