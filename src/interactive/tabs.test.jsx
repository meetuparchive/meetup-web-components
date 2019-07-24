import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Tabs, TabsTab } from './Tabs';

describe('Tabs', function() {
	let componentBasic, componentWithVariants;

	const TEST_TAB_CLASS = 'test-tab-class';
	const TEST_TABSTAB_CLASS = 'test-tabstab-class';

	beforeEach(() => {
		componentBasic = TestUtils.renderIntoDocument(
			<Tabs className={TEST_TAB_CLASS}>
				<TabsTab className={TEST_TABSTAB_CLASS}>First tab</TabsTab>
				<TabsTab isSelected>Second tab</TabsTab>
				<TabsTab>Third tab</TabsTab>
				<TabsTab isSelected isLeftSelectorLayout>
					Forth tab
				</TabsTab>
			</Tabs>
		);
		componentWithVariants = TestUtils.renderIntoDocument(
			<Tabs full noBorder>
				<TabsTab>First tab</TabsTab>
				<TabsTab isSelected>Second tab</TabsTab>
				<TabsTab>Third tab</TabsTab>
				<TabsTab isSelected isLeftSelectorLayout>
					Forth tab
				</TabsTab>
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

	it('applies selected tab class correctly for left selector layout', function() {
		const selectedTabNodes = TestUtils.scryRenderedDOMComponentsWithClass(
			componentBasic,
			'tabs-tab--selectedLeft'
		);
		const firstTabClass = selectedTabNodes[0].classList;

		expect(selectedTabNodes).toHaveLength(1);
		expect(firstTabClass).toContain('tabs-tab--selectedLeft');
	});

	it('applies variant classes correctly', function() {
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(
			componentWithVariants,
			'UL'
		)[0];

		expect(tabsUlEl.classList).toContain('tabs--full');
		expect(tabsUlEl.classList).toContain('tabs--noBorder');
	});

	it('should *not* apply variant classes when *not* set by props', function() {
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(
			componentBasic,
			'UL'
		)[0];

		expect(tabsUlEl.classList).not.toContain('tabs--full');
		expect(tabsUlEl.classList).not.toContain('tabs--noBorder');
	});

	it('appropriately adds passed prop classname to component `Tabs` component', function() {
		const tab = TestUtils.findRenderedDOMComponentWithClass(
			componentBasic,
			TEST_TAB_CLASS
		);
		expect(() => tab).not.toThrow();
		expect(tab.tagName).toBe('NAV');
	});

	it('appropriately adds passed prop classname to component `TabsTab` component', function() {
		const tabsTab = TestUtils.findRenderedDOMComponentWithClass(
			componentBasic,
			TEST_TABSTAB_CLASS
		);
		expect(() => tabsTab).not.toThrow();
		expect(tabsTab.classList).toContain('tabs-tab');
	});
});
