import React from 'react';
import AvatarMember from './AvatarMember.jsx';
import { storiesOf } from '@kadira/storybook';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { withKnobs, boolean } from '@kadira/storybook-addon-knobs';

storiesOf('AvatarMember', module)
	.addDecorator(withKnobs)
	.add('default', () => (
		<AvatarMember
			member={MOCK_MEMBER}
		/>
	))
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
	));

