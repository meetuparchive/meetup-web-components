import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';
import { InfoWrapper } from '../utils/storyComponents';
import Icon from '../media/Icon';
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
	).add('Default Selected', () => (
		<Toggle
			onChange={onChange}
			id='toggleId'
			name='toggleName'
			value='toggle'
			isChecked
		>
			Toggle Pill Label
		</Toggle>
	)).add('custom classes', () => (
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
				reset
				onChange={onChange}
				id='toggleId'
				name='toggleName'
				value='toggle'
				activeClass='custom--active'
				inactiveClass='custom--inactive'
			>
				<span className='display--block align--center'>
					<Icon shape='heart' size='s' />
					<p className='text--small'>Heart</p>
				</span>
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
	)).add('Topic Pill', () => (
		<Toggle
			topic
			onChange={onChange}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
		>
			Toggle Pill Label
		</Toggle>
	));
