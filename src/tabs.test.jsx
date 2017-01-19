import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Tabs from './Tabs';

describe('Tabs', function() {

	it('exists', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs
				tabs={[
					<span>First tab</span>,
					<span isSelected>Second tab</span>,
					<span>Third tab</span>,
				]}
			/>
		);
		const tabsNode = ReactDOM.findDOMNode(tabs);
		expect(tabsNode).not.toBeNull();
	});

	it('applies selected tab class correctly', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs
				tabs={[
					<span isSelected>First tab</span>,
					<span>Second tab</span>,
					<span>Third tab</span>,
				]}
			/>
		);
		const selectedTabNodes = TestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tabs-tab--selected');
		const firstTabClass = selectedTabNodes[0].getAttribute('class');

		expect(selectedTabNodes.length).toBe(1);
		expect(firstTabClass.indexOf('tabs-tab--selected') > -1).toBe(true);
	});

	it('applies variant classes correctly', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs
				bordered
				full
				tabs={[
					<span isSelected>First tab</span>,
					<span>Second tab</span>,
					<span>Third tab</span>,
				]}
			/>
		);
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(tabs, 'UL')[0];
		const tabsClass = tabsUlEl.getAttribute('class');

		expect(tabsClass.indexOf('tabs--full')).toBeGreaterThan(-1);
		expect(tabsClass.indexOf('tabs--bordered')).toBeGreaterThan(-1);
	});

	it('only applies variant classes when set by props', function() {
		const tabs = TestUtils.renderIntoDocument(
			<Tabs
				tabs={[
					<span isSelected>First tab</span>,
					<span>Second tab</span>,
					<span>Third tab</span>,
				]}
			/>
		);
		const tabsUlEl = TestUtils.scryRenderedDOMComponentsWithTag(tabs, 'UL')[0];
		const tabsClass = tabsUlEl.getAttribute('class');

		expect(tabsClass.indexOf('tabs--full')).toBe(-1);
		expect(tabsClass.indexOf('tabs--bordered')).toBe(-1);
	});

});
