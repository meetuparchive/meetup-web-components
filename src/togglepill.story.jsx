import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TogglePill from './TogglePill';

const onChange = e => {
	action(`The value of the Toggle Pill clicked is: ${e.target.value}`)(e);
};


storiesOf('TogglePill', module)
	.add('Default', () => (
		<TogglePill
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'>Toggle Pill Label</TogglePill>
	))
	.add('Default Selected', () => (
		<TogglePill
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			checked>Toggle Pill Label</TogglePill>
	))
	.add('Topic Pill', () => (
		<TogglePill
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'>Toggle Pill Label</TogglePill>
	))
	.add('Topic Pill Selected', () => (
		<TogglePill
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			checked>Toggle Pill Label</TogglePill>
	));
