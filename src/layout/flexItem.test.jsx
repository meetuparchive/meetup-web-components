import React from 'react';
import { shallow } from 'enzyme';

import {
	FlexItem,
	FLEX_ITEM_CLASS,
	FLEX_ITEM_SHRINK_CLASS,
	FLEX_ITEM_GROW_CLASS,
	FLEX_GROW_FACTORS,
} from './FlexItem';

const dangerousHTML = '<div>Dangerously setting inner HTML</div>';
const makeDanger = () => ({__html: dangerousHTML});

describe('FlexItem', function() {
	it('exists', function() {
		const flexItem = shallow(<FlexItem />);
		expect(flexItem).toMatchSnapshot;
	});

	it('can handle dangerouslySetInnerHTML', function() {
		const dangerousHTMLComponent = shallow(
			<FlexItem
				dangerouslySetInnerHTML={makeDanger()}
			/>
		);
		expect(dangerousHTMLComponent.html()).toContain(dangerousHTML);
	});

	describe('default', () => {
		it(`check that the component has '${FLEX_ITEM_CLASS}' class`, function() {
			const flexItem = shallow(<FlexItem />);
			expect(flexItem.hasClass(FLEX_ITEM_CLASS)).toBe(true);
		});
	});
	describe('shrink', () => {
		it(`check that the component has '${FLEX_ITEM_SHRINK_CLASS}' class`, function() {
			const flexItem = shallow(<FlexItem shrink />);
			expect(flexItem.hasClass(FLEX_ITEM_CLASS)).toBe(true);
			expect(flexItem.hasClass(FLEX_ITEM_SHRINK_CLASS)).toBe(true);
		});
	});
	describe('growFactor', () => {
		it("check that component has correct 'growFactor' class", function() {
			FLEX_GROW_FACTORS.forEach(growFactor => {
				const flexItem = shallow(
					<FlexItem growFactor={growFactor} />
				);
				expect(flexItem.hasClass(FLEX_ITEM_CLASS)).toBe(true);
				expect(flexItem.hasClass(`${FLEX_ITEM_GROW_CLASS}${growFactor}`)).toBe(true);
			});
		});
	});
});
