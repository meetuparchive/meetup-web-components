import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { MOCK_MEMBER } from 'meetup-web-platform/lib/util/mocks/api';
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

