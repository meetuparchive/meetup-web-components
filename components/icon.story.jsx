import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from './Icon';
import { Annotate, Inverted } from './util/storyComponents';


storiesOf('Icon', module)
	.add('Default', () => (
		<Icon shape='chevron-right' />
	))
	.add('Accessible', () => (
		<Annotate notes='This Icon has an `aria-label` attribute to improve accesibility'>
			<Icon shape='chevron-right' aria-label='Go west and seek your fortune' />
		</Annotate>
	))
	.add('Inverted', () => (
		<Inverted>
			<Icon shape='chevron-right' inverted />
		</Inverted>
	))
	.add('x-Small', () => (
		<Icon shape='chevron-right' size='xs' />
	))
	.add('Small', () => (
		<Icon shape='chevron-right' size='s' />
	))
	.add('Large', () => (
		<Icon shape='chevron-right' size='l' />
	))
	.add('X-Large', () => (
		<Icon shape='chevron-right' size='xl' />
	));

