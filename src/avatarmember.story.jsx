import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { InfoWrapper } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import AvatarMember from './AvatarMember.jsx';

storiesOf('AvatarMember', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<AvatarMember
					member={MOCK_MEMBER}
				/>
			</InfoWrapper>
		)
	)
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
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };  // treat the mock as immutable
		MOCK_MEMBER_NO_PHOTO.photo = {};
		return <AvatarMember member={MOCK_MEMBER_NO_PHOTO}/>;
	});

