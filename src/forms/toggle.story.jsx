import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';
import { InfoWrapper } from '../utils/storyComponents';
import Toggle from './Toggle';

const onChange = e => {
	action(`The value of the Toggle Pill clicked is: ${e.target.value}`)(e);
};

storiesOf('Toggle', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Toggle
					id='toggleId'
					name='toggleName'
					value='toggle'
					onChange={onChange}
				>
					Toggle Label
				</Toggle>
			</InfoWrapper>
		)
	).add('custom classes', () => (
		<Toggle
			onChange={onChange}
			id='toggleId'
			name='toggleName'
			value='toggle'
			activeClass='custom--active'
			inactiveClass='custom--inactive'
		>
			Toggle Label
		</Toggle>
	)).add('custom children', () => (
		<div>
			{/* Like button */}
			<Toggle
				onChange={onChange}
				id='toggleId'
				name='toggleName'
				value='toggle'
				activeClass='custom--active'
				inactiveClass='custom--inactive'
			>
				Toggle Label
			</Toggle>

			{/* "Interested" button */}
			<Toggle
				onChange={onChange}
				id='toggleId'
				name='toggleName'
				value='toggle'
				activeClass='custom--active'
				inactiveClass='custom--inactive'
			>
				Toggle Label
			</Toggle>
		</div>
	));
