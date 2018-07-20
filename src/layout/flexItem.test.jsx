import React from 'react';
import { shallow } from 'enzyme';

import {
	FlexItemComponent,
	FLEX_ITEM_CLASS,
	FLEX_ITEM_SHRINK_CLASS,
	FLEX_ITEM_GROW_CLASS,
	FLEX_GROW_FACTORS,
} from './FlexItem';

describe('FlexItem', function() {
	it('exists', function() {
		const flexItem = shallow(<FlexItemComponent />);
		expect(flexItem).toMatchSnapshot;
	});
	describe('default', () => {
		it(`check that the component has '${FLEX_ITEM_CLASS}' class`, function() {
			const flexItem = shallow(<FlexItemComponent />);
			expect(flexItem.hasClass(FLEX_ITEM_CLASS)).toBe(true);
		});
	});
	describe('shrink', () => {
		it(`check that the component has '${FLEX_ITEM_SHRINK_CLASS}' class`, function() {
			const flexItem = shallow(<FlexItemComponent shrink />);
			expect(flexItem.hasClass(FLEX_ITEM_CLASS)).toBe(true);
			expect(flexItem.hasClass(FLEX_ITEM_SHRINK_CLASS)).toBe(true);
		});
	});
	describe('growFactor', () => {
		it("check that component has correct 'growFactor' class", function() {
			FLEX_GROW_FACTORS.forEach(growFactor => {
				const flexItem = shallow(<FlexItemComponent growFactor={growFactor} />);
				expect(flexItem.hasClass(FLEX_ITEM_CLASS)).toBe(true);
				expect(flexItem.hasClass(`${FLEX_ITEM_GROW_CLASS}${growFactor}`)).toBe(
					true
				);
			});
		});
	});
});
