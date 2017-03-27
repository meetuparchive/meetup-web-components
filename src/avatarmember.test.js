import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import AvatarMember, { AVATAR_PERSON_CLASS, AVATAR_PERSON_NOPHOTO_CLASS} from './AvatarMember';
import Icon from './Icon';

describe('AvatarMember', function() {
	it('exists', function() {
		const avatarMember = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER} />);
		expect(() => TestUtils.findRenderedComponentWithType(avatarMember, AvatarMember)).not.toThrow();
	});

	it('applies avatar--person variant class', function() {
		const avatarMember = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER} />);
		expect(() => TestUtils.findRenderedDOMComponentWithClass(avatarMember, AVATAR_PERSON_CLASS)).not.toThrow();
	});

	it('renders the noPhoto variant only when a photo is not present', function() {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };
		MOCK_MEMBER_NO_PHOTO.photo = {};

		const avatarMember = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER_NO_PHOTO} />);
		expect(() => TestUtils.findRenderedDOMComponentWithClass(avatarMember, AVATAR_PERSON_NOPHOTO_CLASS)).not.toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(avatarMember, Icon)).not.toThrow();
	});

	it('should *not* render the noPhoto variant only when a photo is present', function() {
		const avatarMember = TestUtils.renderIntoDocument(<AvatarMember member={MOCK_MEMBER} />);
		expect(() => TestUtils.findRenderedDOMComponentWithClass(avatarMember, AVATAR_PERSON_NOPHOTO_CLASS)).toThrow();
		expect(() => TestUtils.findRenderedComponentWithType(avatarMember, Icon)).toThrow();
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
			expect(() => TestUtils.findRenderedDOMComponentWithClass(avatarMember, `avatar--${variant}`)).not.toThrow();
		});
	});
});

