import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import { TogglePill } from './TogglePill';

const onChange = e => {
	action(`The value of the Toggle Pill clicked is: ${e.target.value}`)(e);
};

storiesOf('Forms/TogglePill', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [TogglePill] } })
	.add('default', () => (
		<div>
			<TogglePill
				onChange={onChange}
				id="togglePillId"
				name="togglePillName"
				value="toggle-pill"
			>
				Toggle Pill Label
			</TogglePill>
		</div>
	))
	.add('Default Selected', () => (
		<TogglePill
			onChange={onChange}
			id="togglePillId"
			name="togglePillName"
			value="toggle-pill"
			isActive
		>
			Toggle Pill Label
		</TogglePill>
	));
