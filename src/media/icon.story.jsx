import React from 'react';
import { storiesOf } from '@storybook/react';
import { WithNotes } from '@storybook/addon-notes';
import { Inverted } from '../utils/storyComponents';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import Icon from './Icon';

const ICON_NAME = 'heart-outline';

storiesOf('Icon', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => <Icon shape={ICON_NAME} />)
	.add('Accessible', () => (
		<WithNotes notes="This Icon has an `aria-label` attribute to improve accesibility">
			<Icon shape={ICON_NAME} aria-label="Go west and seek your fortune" />
		</WithNotes>
	))
	.add('Inverted', () => (
		<Inverted>
			<Icon shape={ICON_NAME} inverted />
		</Inverted>
	))
	.add('xx-Small', () => <Icon shape={ICON_NAME} size="xxs" />)
	.add('x-Small', () => <Icon shape={ICON_NAME} size="xs" />)
	.add('Small', () => <Icon shape={ICON_NAME} size="s" />)
	.add('Large', () => <Icon shape={ICON_NAME} size="l" />)
	.add('X-Large', () => <Icon shape={ICON_NAME} size="xl" />)
	.add('XX-Large', () => <Icon shape={ICON_NAME} size="xxl" />)
	.add('Passed color', () => <Icon shape={ICON_NAME} color="#F13959" />)
	.addWithInfo(
		'Circled',
		'The boolean prop `circled` adds an enclosing circle around the icon.',
		() => <Icon shape="external-twitter" size="l" circled />
	)
	.addWithInfo(
		'Loading indicator',
		'The `updates` icon is animated by default.',
		() => <Icon shape="updates" size="l" />
	);
