import React from 'react';
import { storiesOf } from '@storybook/react';
import { Inverted } from '../utils/storyComponents';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import Icon from './Icon';

const ICON_NAME = 'heart-outline';

storiesOf('Media/Icon', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => <Icon shape={ICON_NAME} />)
	.add(
		'Accessible',
		() => <Icon shape={ICON_NAME} aria-label="Go west and seek your fortune" />,
		{
			info: {
				text: 'This Icon has an `aria-label` attribute to improve accesibility',
			},
		}
	)
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
	.add('Circled', () => <Icon shape="external-twitter" size="l" circled />, {
		info: {
			text: 'The boolean prop `circled` adds an enclosing circle around the icon.',
		},
	})
	.add('Loading indicator', () => <Icon shape="updates" size="l" />, {
		info: { text: 'The `updates` icon is animated by default.' },
	});
