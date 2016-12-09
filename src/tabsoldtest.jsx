import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import Tabs from './Tabs';

describe('Tabs', function() {
	const tabList = [
		{ name: 'Going', url: `/` },
		{ name: 'Not going', url: `/` },
	];
	const tabs = TestUtils.renderIntoDocument(
		<Tabs tabList={tabList} />
	);

	it('exists', function() {
		const tabsNode = ReactDOM.findDOMNode(tabs);
		expect(tabsNode).not.toBeNull();
	});

});
