import React from 'react';
import { variantTest } from '../utils/testUtils';
import { shallow } from 'enzyme';

import Card, {CARD_CLASS} from './Card';

const CardJSX = (
	<Card>
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
			'hasHoverShadow',
			'hasShadowPlusHover'
		];

		variantTest(Card, CARD_CLASS, variants);
	});

});
