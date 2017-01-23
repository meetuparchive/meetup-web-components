import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from './Icon';
import { Annotate, Inverted } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';

const ICON_NAME = 'heart-outline';

storiesOf('Icon', module)
	.addDecorator(decorateWithLocale)
	.add('Default', () => (
		<div className='margin--center'>
			<Icon shape={ICON_NAME} />
		</div>
	))
	.add('Accessible', () => (
		<div className='margin--center'>
			<Annotate notes='This Icon has an `aria-label` attribute to improve accesibility'>
				<Icon shape={ICON_NAME} aria-label='Go west and seek your fortune' />
			</Annotate>
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
	));

