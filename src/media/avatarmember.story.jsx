import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import AvatarMember from './AvatarMember.jsx';
import InlineBlockList from '../layout/InlineBlockList';

storiesOf('AvatarMember', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({info: {propTables: [AvatarMember]}})
	.add(
		'default',
		() => (
			<InlineBlockList
				items={[
					<AvatarMember member={MOCK_MEMBER} />,
					<AvatarMember member={MOCK_MEMBER} large />,
					<AvatarMember member={MOCK_MEMBER} xxlarge />,
				]}
			/>
		),
		{ info: { text: 'This is the basic usage with the component.' } }
	)
	.add('organizer', () => (
		<InlineBlockList
			items={[
				<AvatarMember member={MOCK_MEMBER} org />,
				<AvatarMember member={MOCK_MEMBER} org large />,
				<AvatarMember member={MOCK_MEMBER} org xxlarge />,
			]}
		/>
	))
	.add('facebook friend', () => (
		<InlineBlockList
			items={[
				<AvatarMember member={MOCK_MEMBER} fbFriend />,
				<AvatarMember member={MOCK_MEMBER} fbFriend large />,
				<AvatarMember member={MOCK_MEMBER} fbFriend xxlarge />,
			]}
		/>
	))
	.add('no photo', () => {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER }; // treat the mock as immutable
		MOCK_MEMBER_NO_PHOTO.photo = {};
		return (
			<InlineBlockList
				items={[
					<AvatarMember member={MOCK_MEMBER_NO_PHOTO} />,
					<AvatarMember member={MOCK_MEMBER_NO_PHOTO} large />,
					<AvatarMember member={MOCK_MEMBER_NO_PHOTO} xxlarge />,
				]}
			/>
		);
	});
