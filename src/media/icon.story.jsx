import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { InfoWrapper, Inverted } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';
import Icon from './Icon';

const ICON_NAME = 'heart-outline';

storiesOf('Icon', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Icon shape={ICON_NAME} />
			</InfoWrapper>
		)
	)
	.add('Accessible', () => (
		<div className='margin--center'>
			<WithNotes notes='This Icon has an `aria-label` attribute to improve accesibility'>
				<Icon shape={ICON_NAME} aria-label='Go west and seek your fortune' />
			</WithNotes>
		</div>
	))
	.add('Inverted', () => (
		<div className='margin--center'>
			<Inverted>
				<Icon shape={ICON_NAME} inverted />
			</Inverted>
		</div>
	))
	.add('x-Small', () => (
		<div className='margin--center'>
			<Icon shape={ICON_NAME} size='xs' />
		</div>
	))
	.add('Small', () => (
		<div className='margin--center'>
			<Icon shape={ICON_NAME} size='s' />
		</div>
	))
	.add('Large', () => (
		<div className='margin--center'>
			<Icon shape={ICON_NAME} size='l' />
		</div>
	))
	.add('X-Large', () => (
		<div className='margin--center'>
			<Icon shape={ICON_NAME} size='xl' />
		</div>
	))
	.addWithInfo(
		'Loading indicator',
		'The `updates` icon is animated by default.',
		() => (
			<div className='margin--center padding--all'>
				<Icon shape='updates' size='l' />
			</div>
		)
	);

