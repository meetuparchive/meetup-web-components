import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Tabs, TabsList, TabsListTab, TabsPanel } from './Tabs';

describe('TabsContainer', function() {

	it('exists', function() {
		const tabs = TestUtils.renderIntoDocument(<TabsContainer />);
		const tabsNode = ReactDOM.findDOMNode(tabs);

		expect(tabsNode).not.toBeNull();
	});

});
