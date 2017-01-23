import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import FlexItem, {
	FLEX_ITEM_CLASS,
	FLEX_ITEM_SHRINK_CLASS,
	FLEX_ITEM_GROW_CLASS,
	FLEX_GROW_FACTORS,
} from './FlexItem';

describe('FlexItem', function() {

	it('exists', function() {
		const flexItem = TestUtils.renderIntoDocument(<FlexItem />);
		const flexItemNode = ReactDOM.findDOMNode(flexItem);
		expect(flexItemNode).not.toBeNull();
	});

	describe('default', () => {
		it(`check that the component has '${FLEX_ITEM_CLASS}' class`, function() {
			const flexItem = TestUtils.renderIntoDocument(<FlexItem />);
			const flexItemNode = ReactDOM.findDOMNode(flexItem);
			expect(flexItemNode.classList).toContain(FLEX_ITEM_CLASS);
		});
	});
	describe('shrink', () => {
		it(`check that the component has '${FLEX_ITEM_SHRINK_CLASS}' class`, function() {
			const flexItem = TestUtils.renderIntoDocument(<FlexItem shrink />);
			const flexItemNode = ReactDOM.findDOMNode(flexItem);
			expect(flexItemNode.classList).toContain(FLEX_ITEM_CLASS);
			expect(flexItemNode.classList).toContain(FLEX_ITEM_SHRINK_CLASS);
		});
	});
	describe('growFactor', () => {
		it(`check that component has correct 'growFactor' class`, function() {
			FLEX_GROW_FACTORS.forEach(growFactor => {
				const flexItem = TestUtils.renderIntoDocument(<FlexItem growFactor={growFactor} />);
				const flexItemNode = ReactDOM.findDOMNode(flexItem);
				expect(flexItemNode.classList).toContain(FLEX_ITEM_CLASS);
				expect(flexItemNode.classList).toContain(`${FLEX_ITEM_GROW_CLASS}${growFactor}`);
			});
		});
	});
});
