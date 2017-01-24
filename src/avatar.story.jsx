import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { Annotate } from './utils/storyComponents';
import { InfoWrapper } from './utils/storyComponents';
import Avatar from './Avatar.jsx';

const MOCK_IMAGE_SRC = 'http://placekitten.com/g/400/400';

storiesOf('Avatar', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
        <Avatar src={MOCK_IMAGE_SRC}></Avatar>
			</InfoWrapper>
		)
	)
	.add('small', () => <Avatar src={MOCK_IMAGE_SRC} small></Avatar>)
	.add('big', () => <Avatar src={MOCK_IMAGE_SRC} big></Avatar>)
	.add('link to external URL', () => (
		<Annotate notes='To link within the app, supply a `to` prop instead of `href`'>
			<Avatar
				href='http://google.com'
				onClick={(e) => {
					e.preventDefault();
					return action('go to http://google.com')(e);
				}}
				src={MOCK_IMAGE_SRC}>
			</Avatar>
		</Annotate>
	))
	.add('no photo', () => {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };  // treat the mock as immutable
		MOCK_MEMBER_NO_PHOTO.photo = {};
		return <Avatar></Avatar>;
	});

