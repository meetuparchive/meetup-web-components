import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import AvatarMember from './AvatarMember';

describe('AvatarMember', function() {
	it('exists', function() {
		const avatarMember = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER} />);
		const avatarMemberNode = ReactDOM.findDOMNode(avatarMember);
		expect(avatarMemberNode).not.toBeNull();
	});

	it('applies avatar--person variant class', function() {
		const avatarMember = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER} />);
		const avatarMemberNode = ReactDOM.findDOMNode(avatarMember);
		expect(avatarMemberNode.classList.contains('avatar--person')).toBe(true);
	});

	it('renders the noPhoto variant only when a photo is not present', function() {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };
		MOCK_MEMBER_NO_PHOTO.photo = {};

		const avatar = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER_NO_PHOTO} />);
		const avatarNode = ReactDOM.findDOMNode(avatar);
		expect(avatarNode.classList.contains('avatar--noPhoto')).toBe(true);

		const avatarWithSrc = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER} />);
		const avatarWithSrcNode = ReactDOM.findDOMNode(avatarWithSrc);
		expect(avatarWithSrcNode.classList.contains('avatar--noPhoto')).toBe(false);
	});

	it('applies variant classes for each variant prop', function() {
		const variants = [
			'org',
			'fbFriend',
		];
		variants.forEach(variant => {
			const props = {
				[variant]: true,
				member: MOCK_MEMBER,
			};
			const avatarMember = TestUtils.renderIntoDocument(<AvatarMember {...props} />);
			const avatarMemberNode = ReactDOM.findDOMNode(avatarMember);
			expect(avatarMemberNode.classList.contains(`avatar--${variant}`)).toBe(true);
		});
	});
});

