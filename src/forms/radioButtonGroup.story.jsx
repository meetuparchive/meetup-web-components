import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, select, text } from '@kadira/storybook-addon-knobs';
import { action } from '@kadira/storybook-addon-actions';

import RadioButton from './RadioButton';
import TogglePill from './TogglePill';
import RadioButtonGroup from './RadioButtonGroup';

storiesOf('RadioButtonGroup', module)
	.addDecorator(withKnobs)
	.addWithInfo(
		'Basic usage',
		'Renders a group of <RadioButton>s. Demonstrates the basic usage.',
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
					selectedValue={selectedValueKnob} >
					<RadioButton value="one" label="Option 1" />
					<RadioButton value="two" label="Option 2" />
					<RadioButton value="three" label="Option 3" />
				</RadioButtonGroup>
			);
		}
	)
	.add('with Toggle Pill Radios', () => (
		<RadioButtonGroup
			name="option"
			onChange={action('radio button change')}
			onBlur={action('radio button blur')}
			onFocus={action('radio button focus')}
			selectedValue="third"
		>
			<TogglePill
				id='toggle1'
				name='ranking'
				value='first'
				isActive
				useRadio
			>
				First
			</TogglePill>
			<TogglePill
				id='toggle2'
				name='ranking'
				value='second'
				isActive
				useRadio
			>
				I'm Second
			</TogglePill>
			<TogglePill
				id='toggle3'
				name='ranking'
				value='third'
				isActive
				useRadio
			>
				3rd.
			</TogglePill>
		</RadioButtonGroup>
	));
