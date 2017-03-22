import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { withKnobs, boolean } from '@kadira/storybook-addon-knobs';
import { InfoWrapper } from './utils/storyComponents';
import AvatarMember from './AvatarMember.jsx';

storiesOf('AvatarMember', module)
	.addDecorator(withKnobs)
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
			org={boolean('Organizer', true)}
		/>
	))
	.add('facebook friend', () => (
		<AvatarMember
			member={MOCK_MEMBER}
			fbFriend={boolean('Facebook Friend', true)}
		/>
	)).add('no photo', () => {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };  // treat the mock as immutable
		MOCK_MEMBER_NO_PHOTO.photo = {};
		return <AvatarMember member={MOCK_MEMBER_NO_PHOTO}/>;
	});

