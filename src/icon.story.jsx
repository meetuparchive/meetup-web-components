import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from './Icon';
import { Annotate, Inverted, TestIconSprite } from './utils/storyComponents';

const ICON_NAME = 'heart-outline';

storiesOf('Icon', module)
	.add('Default', () => (
		<div class="chunk">
			<TestIconSprite />
			<Icon shape={ICON_NAME} />
		</div>
	))
	.add('Accessible', () => (
		<div class="chunk">
			<TestIconSprite />
			<Annotate notes='This Icon has an `aria-label` attribute to improve accesibility'>
				<Icon shape={ICON_NAME} aria-label='Go west and seek your fortune' />
			</Annotate>
		</div>
	))
	.add('Inverted', () => (
		<div class="chunk">
			<TestIconSprite />
			<Inverted>
				<Icon shape={ICON_NAME} inverted />
			</Inverted>
		</div>
	))
	.add('x-Small', () => (
		<div class="chunk">
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='xs' />
		</div>
	))
	.add('Small', () => (
		<div class="chunk">
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='s' />
		</div>
	))
	.add('Large', () => (
		<div class="chunk">
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='l' />
		</div>
	))
	.add('X-Large', () => (
		<div class="chunk">
			<TestIconSprite />
			<Icon shape={ICON_NAME} size='xl' />
		</div>
	));

