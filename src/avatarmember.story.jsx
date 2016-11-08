import React from 'react';
import AvatarMember from './AvatarMember.jsx';
import { storiesOf } from '@kadira/storybook';
import { MOCK_MEMBER } from 'meetup-web-platform/util/mocks/api';

storiesOf('AvatarMember', module)
	.add('default', () => <AvatarMember member={MOCK_MEMBER}></AvatarMember>)
	.add('organizer', () => <AvatarMember member={MOCK_MEMBER} org></AvatarMember>)
	.add('facebook friend', () => <AvatarMember member={MOCK_MEMBER} fbFriend></AvatarMember>);

