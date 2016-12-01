import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Tabs, TabsList, TabsListTab, TabsPanel } from './Tabs';

const workingTabsJSX = (
	<Tabs tabsRef='fauna'>
		<TabsList>
			<TabsListTab selected>Badger</TabsListTab>
			<TabsListTab>Mushroom</TabsListTab>
			<TabsListTab>Snake</TabsListTab>
		</TabsList>

		<TabsPanel selected>
			<p className='text--bold'>Badger content</p>
		</TabsPanel>
		<TabsPanel>
			<p className='text--bold'>Mushroom content</p>
		</TabsPanel>
		<TabsPanel>
			<p className='text--bold'>Snake content</p>
		</TabsPanel>
	</Tabs>
)

const wrongChildrenJSX = (
	<Tabs tabsRef='badKids'>
		<TabsList>
			<TabsPanel selected>This is wrong and should fail with an error.</TabsPanel>
		</TabsList>
		<TabsPanel selected>lol</TabsPanel>
	</Tabs>
)

const noneSelectedJSX = (
	<Tabs tabsRef='noSelection'>
		<TabsList>
			<TabsPanel>Tab one</TabsPanel>
			<TabsPanel>Tab two</TabsPanel>
		</TabsList>
		<TabsPanel>panel one</TabsPanel>
		<TabsPanel>panel two</TabsPanel>
	</Tabs>
)

const mismatchedPanelsJSX = (
	<Tabs tabsRef='badPanels'>
		<TabsList>
			<TabsPanel>Tab one</TabsPanel>
			<TabsPanel>Tab two</TabsPanel>
		</TabsList>
		<TabsPanel>panel one</TabsPanel>
	</Tabs>
)

const mismatchedTabsJSX = (
	<Tabs tabsRef='badTabs'>
		<TabsList>
			<TabsPanel>Tab one</TabsPanel>
			<TabsPanel>Tab two</TabsPanel>
		</TabsList>
		<TabsPanel>panel one</TabsPanel>
	</Tabs>
)

describe('TabsContainer', function() {

	it('exists', function() {
		const tabs = TestUtils.renderIntoDocument({workingTabsJSX});
		const tabsNode = ReactDOM.findDOMNode(tabs);

		expect(tabsNode).not.toBeNull();
	});

	it('generates correct ids and aria attributes', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument({workingTabsJSX});
		expect(true).toBe(true);
	});

	it('validates children of TabsList correctly', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument({wrongChildrenJSX});
		expect(true).toBe(true);
	});

	it('validates that one panel and one tab are selected', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument({noneSelectedJSX});
		expect(true).toBe(true);
	});

	it('validates number of panels match number of tabs', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument({mismatchedPanelsJSX});
		expect(true).toBe(true);
	});

	it('validates number of tabs match number of panels', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument({mismatchedTabsJSX});
		expect(true).toBe(true);
	});

});
