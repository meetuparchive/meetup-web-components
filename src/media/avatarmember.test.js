import React from 'react';
import { shallow } from 'enzyme';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import AvatarMember, {
	getPhoto,
	getPhotoSize,
	AVATAR_PERSON_CLASS,
	AVATAR_PERSON_NOPHOTO_CLASS,
} from './AvatarMember';
import Avatar from './Avatar';
import Icon from './Icon';

describe('AvatarMember', function() {
	it('exists', function() {
		const avatarMember = shallow(<AvatarMember member={MOCK_MEMBER} />);
		expect(avatarMember.exists()).toBe(true);
	});

	it('applies avatar--person variant class', function() {
		const avatarMember = shallow(<AvatarMember member={MOCK_MEMBER} />);
		expect(avatarMember.find(`.${AVATAR_PERSON_CLASS}`).exists()).toBe(true);
	});

	it('renders the noPhoto variant only when a photo is not present', function() {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };
		MOCK_MEMBER_NO_PHOTO.photo = {};

		const avatarMember = shallow(<AvatarMember member={MOCK_MEMBER_NO_PHOTO} />);
		expect(avatarMember.find(`.${AVATAR_PERSON_NOPHOTO_CLASS}`).exists()).toBe(true);
	});

	it('should render member photo on large size', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, photo_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} large />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render member highres_link on large size if no photo_link', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { highres_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} large />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render thumbnail photo on regular size', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render thumbnail photo on small size', () => {
		const mockPhoto = 'thumb image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} small />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render member photo on small size if photo size is passed', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, photo_link: mockPhoto },
		};
		const avatarMember = shallow(
			<AvatarMember member={mockMember} small imageSize="big" />
		);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render thumb photo on default size if `default` photo size is passed', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: mockPhoto },
		};
		const avatarMember = shallow(
			<AvatarMember member={mockMember} imageSize="default" />
		);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render member photo on default size if `big` photo size is passed', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, photo_link: mockPhoto },
		};
		const avatarMember = shallow(
			<AvatarMember member={mockMember} imageSize="big" />
		);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render thumb photo on large size if photo size is passed', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: mockPhoto },
		};
		const avatarMember = shallow(
			<AvatarMember member={mockMember} large imageSize="default" />
		);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should *not* render the noPhoto variant only when a photo is present', function() {
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: 'test image' },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} />);
		expect(avatarMember.find(`.${AVATAR_PERSON_NOPHOTO_CLASS}`).exists()).toBe(false);
		expect(avatarMember.find(Icon).exists()).toBe(false);
	});

	it('applies variant classes for each variant prop', function() {
		const variants = ['org', 'fbFriend'];
		variants.forEach(variant => {
			const props = {
				[variant]: true,
				member: MOCK_MEMBER,
			};
			const avatarMember = shallow(<AvatarMember {...props} />);
			expect(avatarMember.find(`.avatar--${variant}`).exists()).toBe(true);
		});
	});

	describe('getPhoto', function() {
		it('returns undefined if member.photo is undefined', function() {
			const member = { ...MOCK_MEMBER, photo: undefined };
			expect(getPhoto(member.photo, 'big')).toBe(undefined);
		});

		it('returns photo_link for member.photo and big size', function() {
			expect(getPhoto(MOCK_MEMBER.photo, 'big')).toBe(MOCK_MEMBER.photo.photo_link);
		});

		it('returns highres_link for member.photo and big size in case photo_link is undefined', function() {
			const member = {
				...MOCK_MEMBER,
				photo: {
					...MOCK_MEMBER.photo,
					highres_link: 'http://placekitten.com/g/500/500',
					photo_link: undefined,
				},
			};
			expect(getPhoto(member.photo, 'big')).toBe(member.photo.highres_link);
		});

		it('returns thumb_link for member.photo and small size', function() {
			expect(getPhoto(MOCK_MEMBER.photo)).toBe(MOCK_MEMBER.photo.thumb_link);
		});
	});

	describe('getPhotoSize', () => {
		it('returns imageSize if passed', () => {
			const mockSize = 'default';
			expect(getPhotoSize(mockSize, true)).toBe(mockSize);
		});
		it('returns `big` if image size is undefined and isBig = true', () => {
			expect(getPhotoSize(undefined, true)).toBe('big');
		});
		it('returns `default` if image size is undefined and isBig = false', () => {
			expect(getPhotoSize(undefined, false)).toBe('default');
		});
	});
});
