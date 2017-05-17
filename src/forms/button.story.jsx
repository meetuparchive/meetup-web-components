import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { decorateWithLocale } from '../utils/decorators';
import {
	InfoWrapper,
	Inverted,
} from '../utils/storyComponents';

import Button from './Button';
import Icon from '../media/Icon';

storiesOf('Button', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
        <Button onClick={action('clicked')}>Button Label</Button>
			</InfoWrapper>
		)
	)
	// .add('Contrast', () => (
	// 	<Button onClick={action('clicked')} contrast>Button Label</Button>
	// ))
	.add('Disabled', () => (
		<Button onClick={action('clicked')} disabled>Button Label</Button>
	))
	.add('Default - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} contrast>Button Label</Button>
		</Inverted>
	))
	.add('Primary - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')}primary contrast>Button Label</Button>
		</Inverted>
	))
	// .add('Contrast - inverted', () => (
	// 	<Inverted>
	// 		<Button onClick={action('clicked')} contrast>Button Label</Button>
	// 	</Inverted>
	// ))
	.add('Disabled - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} disabled contrast>Button Label</Button>
		</Inverted>
	))
	.add('Reset', () => (
		<Button onClick={action('clicked')} reset>Button Label</Button>
	))
	.add('Reset - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} reset>Button Label</Button>
		</Inverted>
	))
	.add('Reset - Disabled', () => (
		<Button onClick={action('clicked')} reset disabled>Button Label</Button>
	))
	.add('Full Width', () => (
		<Button onClick={action('clicked')} fullWidth>Button Label</Button>
	))
	.add('Primary', () => (
		<Button onClick={action('clicked')} primary>Button Label</Button>
	))
	.add('Small', () => (
		<Button onClick={action('clicked')} small>Button Label</Button>
	))
	.add('Icon', () => (
		<Button onClick={action('clicked')} icon={<Icon shape='search' size='s' />}>Button Label</Button>
	))
	.add('Icon - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} icon={<Icon shape='search' size='s' />} contrast>Button Label</Button>
		</Inverted>
	))
	.add('Icon Right', () => (
		<Button onClick={action('clicked')} icon={<Icon shape='search' size='s' />} right>Button Label</Button>
	))
	.add('No Label', () => (
		<Button></Button>
	));
