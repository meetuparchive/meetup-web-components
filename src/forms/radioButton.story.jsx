import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import RadioButton from './RadioButton';

storiesOf('RadioButton', module)
	.addDecorator(withKnobs)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add(
		'Basic usage',
		() => (
			<RadioButton
				name="option"
				value="1"
				checked={boolean('checked', true)}
				className={text('className', '')}
				label={text('label', 'This is a radio')}
			/>
		),
		{
			info: {
				text: 'A single radio input with a label. Demonstrates the basic usage',
			},
		}
	);
