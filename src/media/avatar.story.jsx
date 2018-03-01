import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { WithNotes } from '@storybook/addon-notes';
import {
	decorateWithBasics,
	decorateWithInfo
} from '../utils/decorators';
import Avatar from './Avatar.jsx';

const MOCK_IMAGE_SRC = 'http://placekitten.com/g/400/400';

storiesOf('Avatar', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<Avatar src={MOCK_IMAGE_SRC}></Avatar>
		)
	)
	.addDecorator(decorateWithInfo)
	.add('small', () => <Avatar src={MOCK_IMAGE_SRC} small></Avatar>)
	.add('large', () => <Avatar src={MOCK_IMAGE_SRC} large></Avatar>)
	.add('xxlarge', () => <Avatar src={MOCK_IMAGE_SRC} xxlarge></Avatar>)
	.add('link to external URL', () => (
		<WithNotes notes='To link within the app, supply a `to` prop instead of `href`'>
			<Avatar
				href='http://google.com'
				onClick={(e) => {
					e.preventDefault();
					return action('go to http://google.com')(e);
				}}
				src={MOCK_IMAGE_SRC}>
			</Avatar>
		</WithNotes>
	))
	.add('no photo', () => (
		<Avatar></Avatar>
	));

