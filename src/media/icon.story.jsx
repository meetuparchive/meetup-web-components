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
		<WithNotes notes='This Icon has an `aria-label` attribute to improve accesibility'>
			<Icon shape={ICON_NAME} aria-label='Go west and seek your fortune' />
		</WithNotes>
	))
	.add('Inverted', () => (
		<Inverted>
			<Icon shape={ICON_NAME} inverted />
		</Inverted>
	))
	.add('xx-Small', () => (
		<Icon shape={ICON_NAME} size='xxs' />
	))
	.add('x-Small', () => (
		<Icon shape={ICON_NAME} size='xs' />
	))
	.add('Small', () => (
		<Icon shape={ICON_NAME} size='s' />
	))
	.add('Large', () => (
		<Icon shape={ICON_NAME} size='l' />
	))
	.add('X-Large', () => (
		<Icon shape={ICON_NAME} size='xl' />
	))
	.add('XX-Large', () => (
		<Icon shape={ICON_NAME} size='xxl' />
	))
	.addWithInfo(
		'Loading indicator',
		'The `updates` icon is animated by default.',
		() => (
			<Icon shape='updates' size='l' />
		)
	);

