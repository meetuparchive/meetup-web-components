import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import FlexItem from './FlexItem';

describe('FlexItem', function() {

	it('exists', function() {
		const flexItem = TestUtils.renderIntoDocument(<FlexItem />);
		const flexItemNode = ReactDOM.findDOMNode(flexItem);

		expect(flexItemNode).not.toBeNull();
	});

});
