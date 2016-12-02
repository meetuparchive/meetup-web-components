import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Tabs, TabsList, TabsListTab, TabsPanel } from './Tabs';

describe('Test tabs', function() {
	const tabs = TestUtils.renderIntoDocument(
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
	);

	it('exists', function() {
		const mainNode = ReactDOM.findDOMNode(tabs);
		expect(mainNode).not.toBeNull();
	});

	it('applies correct selected classes', function() {
		const selectedTabNode = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-tab--selected');
		const panelNodes = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-panel');

		// only one tab should have the selected class
		expect(selectedTabNode.length).toBe(1);

		// only one panel should be visible at a time
		const visiblePanels = panelNodes
			.map(node => node.getAttribute('class'))
			.filter(classes => !classes.includes('display--none'));

		expect(visiblePanels.length).toBe(1);
	});

	it('generates correct ids and aria attributes', function() {
		const tabNodes = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-tab');
		const panelNodes = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-panel');

		tabNodes.forEach((tab, index) => {
			expect(tab.getAttribute('id')).toBe(`fauna_tab_${index}`);
			expect(tab.getAttribute('aria-controls')).toBe(`fauna_panel_${index}`);
		});

		panelNodes.forEach((tab, index) => {
			expect(tab.getAttribute('id')).toBe(`fauna_panel_${index}`);
			expect(tab.getAttribute('aria-labelledby')).toBe(`fauna_tab_${index}`);
		});
	});

});
