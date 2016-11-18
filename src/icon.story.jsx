import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from './Icon';
import { Annotate, Inverted, TestIconSprite } from './utils/storyComponents';

const ICON_NAME = 'heart-outline';

storiesOf('Icon', module)
	.add('Default', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Icon shape={ICON_NAME} />
		</div>
	))
	.add('Accessible', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Annotate notes='This Icon has an `aria-label` attribute to improve accesibility'>
				<Icon shape={ICON_NAME} aria-label='Go west and seek your fortune' />
			</Annotate>
		</div>
	))
	.add('Inverted', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Inverted>
				<Icon shape={ICON_NAME} inverted />
			</Inverted>
		</div>
	))
	.add('x-Small', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='xs' />
		</div>
	))
	.add('Small', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='s' />
		</div>
	))
	.add('Large', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='l' />
		</div>
	))
	.add('X-Large', () => (
		<div className='margin--center'>
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='xl' />
		</div>
	));

