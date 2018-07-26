import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import Avatar from './Avatar.jsx';

const MOCK_IMAGE_SRC = 'http://placekitten.com/g/400/400';

storiesOf('Media/Avatar', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => <Avatar src={MOCK_IMAGE_SRC} />, {
		info: { text: 'This is the basic usage with the component.' },
	})
	.add('small', () => <Avatar src={MOCK_IMAGE_SRC} small />)
	.add('large', () => <Avatar src={MOCK_IMAGE_SRC} large />)
	.add('xxlarge', () => <Avatar src={MOCK_IMAGE_SRC} xxlarge />)
	.add(
		'link to external URL',
		() => (
			<Avatar
				href="http://google.com"
				onClick={e => {
					e.preventDefault();
					return action('go to http://google.com')(e);
				}}
				src={MOCK_IMAGE_SRC}
			/>
		),
		{ info: { text: 'To link within the app, supply a `to` prop instead of `href`' } }
	)
	.add('no photo', () => <Avatar />);
