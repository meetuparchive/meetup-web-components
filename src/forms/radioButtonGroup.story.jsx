import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

import RadioButton from './RadioButton';
import TogglePill from './TogglePill';
import RadioButtonGroup from './RadioButtonGroup';

storiesOf('RadioButtonGroup', module)
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
				{ one: 'Option 1', two: 'Option 2', three: 'Option 3' },
				'one'
			);
			return (
				<RadioButtonGroup
					name="option"
					onChange={action('radio button change')}
					onBlur={action('radio button blur')}
					onFocus={action('radio button focus')}
					className={classNameKnob}
					direction={directionKnob}
					selectedValue={selectedValueKnob}
				>
					<RadioButton value="one" label="Option 1" />
					<RadioButton value="two" label="Option 2" />
					<RadioButton value="three" label="Option 3" />
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
			onBlur={action('radio button blur')}
			onFocus={action('radio button focus')}
			selectedValue="first"
		>
			<TogglePill id="toggle1" name="ranking" value="first" useRadio>
				First
			</TogglePill>
			<TogglePill id="toggle2" name="ranking" value="second" useRadio>
				I'm Second
			</TogglePill>
			<TogglePill id="toggle3" name="ranking" value="third" useRadio>
				3rd.
			</TogglePill>
		</RadioButtonGroup>
	))
	.add('with column at breakpoint', () => (
		<RadioButtonGroup
			name="option"
			direction="column"
			switchDirection="medium"
			onChange={action('radio button change')}
			onBlur={action('radio button blur')}
			onFocus={action('radio button focus')}
			selectedValue="third"
		>
			<TogglePill
				id="toggle1"
				name="ranking"
				value="first"
				labelClassName="span--100"
				isActive
				useRadio
			>
				Responsive btn
			</TogglePill>
			<TogglePill
				id="toggle2"
				name="ranking"
				value="second"
				labelClassName="span--100"
				isActive
				useRadio
			>
				Me too
			</TogglePill>
			<TogglePill
				id="toggle3"
				name="ranking"
				value="third"
				labelClassName="span--100"
				isActive
				useRadio
			>
				Responsive too
			</TogglePill>
		</RadioButtonGroup>
	));
