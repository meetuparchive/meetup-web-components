import React from 'react';
import { variantTest } from '../utils/testUtils';
import { shallow } from 'enzyme';

import Card, {CARD_CLASS, CARD_HOVER_PLUS_SHADOW_CLASS} from './Card';

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


describe('Card', function() {
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
