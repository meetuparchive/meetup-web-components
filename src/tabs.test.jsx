import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Tabs, TabsList, TabsListTab, TabsPanel } from './Tabs';

describe('Test correctly composed tabs', function() {
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
	const tabsNode = ReactDOM.findDOMNode(tabs);

	it('exists', function() {
		expect(tabsNode).not.toBeNull();
	});

	it('generates correct ids and aria attributes', function() {
		// TODO: complete stub
		expect(true).toBe(true);
	});

});

describe('Test validation of incorrectly composed tabs', function() {

	it('validates that one panel and one tab are selected', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument(
			<Tabs tabsRef='noSelection'>
				<TabsList>
					<TabsListTab>Tab one</TabsListTab>
					<TabsListTab>Tab two</TabsListTab>
				</TabsList>
				<TabsPanel>panel one</TabsPanel>
				<TabsPanel>panel two</TabsPanel>
			</Tabs>
		);
		const tabsNode = ReactDOM.findDOMNode(tabs);
		expect(true).toBe(true);
	});

	it('validates number of panels match number of tabs', function() {
		// TODO: complete stub
		const tabs = TestUtils.renderIntoDocument(
			<Tabs tabsRef='badPanels'>
				<TabsList>
					<TabsListTab selected>Tab one</TabsListTab>
					<TabsListTab>Tab two</TabsListTab>
				</TabsList>
				<TabsPanel selected>panel one</TabsPanel>
			</Tabs>
		);
		const tabsNode = ReactDOM.findDOMNode(tabs);
		expect(true).toBe(true);
	});

});
