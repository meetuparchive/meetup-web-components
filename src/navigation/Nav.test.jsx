import React from 'react';
import { shallow } from 'enzyme';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';

import { Nav } from './Nav';
import { navItemsFactory } from './nav.story';

let navItems;
let mockProps;
let wrapper;

describe('Nav', () => {
	beforeEach(() => {
		navItems = navItemsFactory();
		mockProps = {
			navItems,
			media: {
				isAtSmallUp: false,
				isAtMediumUp: false,
				isAtLargeUp: false,
			},
			self: { status: 'prereg' },
			groups: {
				link: 'meetup.com/groups',
				label: 'Groups',
				list: [
					{ urlname: '/mason-mocks', name: 'Mason Mocks' },
					{ urlname: '/chicken-scratch', name: 'Chicken Scratch' },
				],
			},
		};
		wrapper = props => shallow(<Nav {...mockProps} {...props} />);
	});

	it('should match the snapshot for unauthenticated small screens', () => {
		expect(wrapper()).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated medium screens', () => {
		expect(
			wrapper({
				self: MOCK_MEMBER,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for groups loading state', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				groups: {
					link: 'meetup.com/groups',
					label: 'Groups',
					list: undefined,
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for notifications loading state', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				notifications: {
					link: 'meetup.com/notifications',
					label: 'Notifications',
					unreadNotifications: 0,
					list: undefined,
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unread notifications', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				notifications: {
					link: 'meetup.com/notifications',
					label: 'Notifications',
					unreadNotifications: 3,
					list: [],
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated medium screens', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for unauthenticated large screens', () => {
		expect(wrapper({ media: { isAtLargeUp: true } })).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated large screens', () => {
		expect(
			wrapper({
				media: { isAtLargeUp: true },
				self: MOCK_MEMBER,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot with logo photo', () => {
		expect(
			wrapper({
				self: MOCK_MEMBER,
				navItems: {
					...navItems,
					proDashboard: {
						mainAccount: {
							urlname: '/mason-mocks',
							name: 'Mason Mocks',
							group_photo: {
								thumb_link: 'https://placeimg.com/640/480/any',
							},
						},
					},
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot without a logo photo', () => {
		expect(
			wrapper({
				self: MOCK_MEMBER,
				navItems: {
					...navItems,
					mainAccount: {
						urlname: '/mason-mocks',
						name: 'Mason Mocks',
						group_photo: {},
					},
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated pro admins', () => {
		expect(
			wrapper({
				self: { ...MOCK_MEMBER, is_pro_admin: true },
				navItems: {
					...navItems,
					proDashboard: {
						mainAccount: {
							urlname: '/mason-mocks',
							name: 'Mason Mocks',
							group_photo: {
								thumb_link: 'https://placeimg.com/640/480/any',
							},
						},
					},
				},
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated medium screens and new nav', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: true },
				self: MOCK_MEMBER,
				isNewNavActive: true,
			})
		).toMatchSnapshot();
	});

	it('should match the snapshot for authenticated small screens and new nav', () => {
		expect(
			wrapper({
				media: { isAtMediumUp: false },
				self: MOCK_MEMBER,
				isNewNavActive: true,
			})
		).toMatchSnapshot();
	});

	describe('uxCapture', () => {
		it('renders the uxCapture markup when supplied prop', () => {
			expect(
				wrapper({
					uxCapture: true,
				})
			).toMatchSnapshot();
		});
	});

	describe('signUp Modal', () => {
		it('passes clickHandlers for every signup Provider', () => {
			const navObject = wrapper();
			navObject.setState({ isSignupModalOpen: true });

			expect(navObject.find('SignupModal').props()).toEqual(
				expect.objectContaining({
					googleOnClick: expect.any(Function),
					facebookOnClick: expect.any(Function),
					emailOnClick: expect.any(Function),
					appleOnClick: expect.any(Function),
				})
			);
		});

		it('calls onOpen handler when modal is open', () => {
			const mockOnOpen = jest.fn();
			mockProps.navItems.signup.signupModal.onOpen = mockOnOpen;
			const navObject = wrapper(mockProps);

			navObject.instance().onClickSignupAction();

			expect(mockOnOpen).toHaveBeenCalled();
		});
	});

	describe('NavSearch', () => {
		const searchItem = {
			icon: 'icon',
			className: 'class',
		};

		it('renders search input for desktop', () => {
			const component = wrapper({
				isSearchEnabled: true,
				media: { isAtMediumUp: true },
				navItems: {
					...navItems,
					search: searchItem,
				},
			});

			expect(component).toMatchSnapshot();
		});

		it('renders search icon for mobile', () => {
			const component = wrapper({
				isSearchEnabled: true,
				media: { isAtMediumUp: false },
				navItems: {
					...navItems,
					search: searchItem,
				},
			});

			expect(component).toMatchSnapshot();
		});

		it('onSearchIconClick changes state', () => {
			const component = wrapper({
				isSearchEnabled: true,
				navItems: {
					...navItems,
					search: searchItem,
				},
			});

			component.instance().onSearchIconClick();
			expect(component.state('isSearchOpened')).toBe(true);
		});
	});
});
