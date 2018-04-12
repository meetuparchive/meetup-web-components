import React from 'react';
import { variantTest } from '../utils/testUtils';
import { shallow } from 'enzyme';

import {
	Card,
	CARD_CLASS,
	CARD_HOVER_PLUS_SHADOW_CLASS,
	CARD_FLUSH_CLASS,
	VALID_BREAKPOINTS
} from './Card';

const CardJSX = (
	<Card>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
	</Card>
);

const CardJSX_doubleShadow = (
	<Card hasShadow hasHoverShadow>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
	</Card>
);

describe('Card and variants', function() {
	const cardComponent = shallow(CardJSX);

	it('renders a card', function() {
		expect(cardComponent).toMatchSnapshot();
	});

	it('applies variant classes for each variant prop', () => {
		const variants = [
			'initialHeight',
			'hasShadow',
			'hasHoverShadow'
		];

		variantTest(Card, CARD_CLASS, variants);
	});

	it('applies class name `hasShadowPlusHover` when `hasHoverShadow` AND `hasShadow` props are passed', () => {
		const component = shallow(CardJSX_doubleShadow);

		expect(component.hasClass(CARD_HOVER_PLUS_SHADOW_CLASS)).toBe(true);
	});

});

describe('Card flushUntil', () => {
	it(`check that component has '${CARD_FLUSH_CLASS}' class`, function() {
		Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
			const component = shallow(
				<Card flushUntil={breakpoint}>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
				</Card>
			);

			expect(component.hasClass(CARD_CLASS)).toBe(true);
			expect(component.hasClass(`${VALID_BREAKPOINTS[breakpoint]}_${CARD_FLUSH_CLASS}`)).toBe(true);
		});
	});
});

