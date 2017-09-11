import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';
import { InfoWrapper } from '../utils/storyComponents';
import TogglePill from './TogglePill';

const onChange = e => {
	action(`The value of the Toggle Pill clicked is: ${e.target.value}`)(e);
};

storiesOf('TogglePill', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<TogglePill
					onChange={onChange}
					id='togglePillId'
					name='togglePillName'
					value='toggle-pill'
				>
					Toggle Pill Label
				</TogglePill>
			</InfoWrapper>
		)
	)
	.add('Default Selected', () => (
		<TogglePill
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			isActive
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Topic Pill', () => (
		<TogglePill
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Topic Pill Selected', () => (
		<TogglePill
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			isActive
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Toggle Pill Radio Button', () => (
		<div>
			<TogglePill
				onChange={onChange}
				id='togglePill1'
				name='pills'
				value='toggle-pill'
				isActive
				useRadio
			>
				Toggle Pill A
			</TogglePill>
			<TogglePill
				onChange={onChange}
				id='togglePill2'
				name='pills'
				value='toggle-pill'
				isActive
				useRadio
			>
				Toggle Pill B
			</TogglePill>
		</div>
	));
