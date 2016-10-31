import React from 'react';
import Button from './Button';
import Icon from './Icon';
import { storiesOf, action } from '@kadira/storybook';
import { Inverted } from '../utils/storyComponents';


storiesOf('Button', module)
	.add('Simple', () => (
		<Button onClick={action('clicked')}>Button Label</Button>
	))
	.add('Contrast', () => (
		<Button onClick={action('clicked')} contrast>Button Label</Button>
	))
	.add('Disabled', () => (
		<Button onClick={action('clicked')} disabled>Button Label</Button>
	))
	.add('Simple - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')}>Button Label</Button>
		</Inverted>
	))
	.add('Contrast - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} contrast>Button Label</Button>
		</Inverted>
	))
	.add('Disabled - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} disabled>Button Label</Button>
		</Inverted>
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
		<Button onClick={action('clicked')} icon={<Icon shape='chevron-left' size='s' />}>Button Label</Button>
	))
	.add('Icon Right', () => (
		<Button onClick={action('clicked')} icon={<Icon shape='chevron-right' size='s' />} right>Button Label</Button>
	))
	.add('No Label', () => (
		<Button></Button>
	));
