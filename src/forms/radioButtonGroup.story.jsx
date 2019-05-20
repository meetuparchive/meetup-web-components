import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

import RadioButton from './RadioButton';
import TogglePill from './TogglePill';
import RadioButtonGroup from './RadioButtonGroup';

storiesOf('Forms/RadioButtonGroup', module)
	.addDecorator(withKnobs)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add(
		'Basic usage',
		() => {
			const classNameKnob = text('className', '');
			const directionKnob = select(
				'Direction',
				{ row: 'row', column: 'column' },
				'row'
			);
			const selectedValueKnob = select(
				'Selected',
				{ one: 'one', two: 'two', three: 'three' },
				'one'
			);
			return (
				<RadioButtonGroup
					name="radioButtonGroup"
					onChange={action('radio button change')}
					className={classNameKnob}
					direction={directionKnob}
					selectedValue={selectedValueKnob}
				>
					<RadioButton value="one" label="Option 1" name="radioButton" />
					<RadioButton value="two" label="Option 2" name="radioButton" />
					<RadioButton value="three" label="Option 3" name="radioButton" />
				</RadioButtonGroup>
			);
		},
		{
			info: {
				text: 'Renders a group of <RadioButton>s. Demonstrates the basic usage.',
			},
		}
	)
	.add('with Toggle Pill Radios', () => (
		<RadioButtonGroup
			name="option"
			onChange={action('radio button change')}
			selectedValue="first"
		>
			<TogglePill id="toggle1" name="ranking1" value="first" useRadio>
				First
			</TogglePill>
			<TogglePill id="toggle2" name="ranking2" value="second" useRadio>
				I'm Second
			</TogglePill>
			<TogglePill id="toggle3" name="ranking3" value="third" useRadio>
				3rd.
			</TogglePill>
		</RadioButtonGroup>
	));
