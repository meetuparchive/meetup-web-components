import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import {
	decorateWithLocale,
	decorateWithInfo,
} from '../utils/decorators';
import AvatarMember from './AvatarMember.jsx';

storiesOf('AvatarMember', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<AvatarMember
				member={MOCK_MEMBER}
			/>
		)
	)
	.addDecorator(decorateWithInfo)
	.add('organizer', () => (
		<AvatarMember
			member={MOCK_MEMBER}
			org
		/>
	))
	.add('facebook friend', () => (
		<AvatarMember
			member={MOCK_MEMBER}
			fbFriend
		/>
	)).add('no photo', () => {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER }; // treat the mock as immutable
		MOCK_MEMBER_NO_PHOTO.photo = {};
		return <AvatarMember member={MOCK_MEMBER_NO_PHOTO}/>;
	});

