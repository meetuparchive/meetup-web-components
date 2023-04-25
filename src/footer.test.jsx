import React from 'react';
import { shallow } from 'enzyme';

import { Footer, FooterCategory, SocialIconsList } from './Footer';

const onLanguageSelect = jest.fn();

const footerLinkSets = [
	{
		header: 'Your Account',
		items: [
			<a href="/register">Settings</a>,
			<a href="/logout">Log out</a>,
			<a href="/help">Help</a>,
		],
	},
	{
		header: 'Discover',
		items: [
			<a href="/groups">Groups</a>,
			<a href="/calendar">Calendar</a>,
			<a href="/topics">Topics</a>,
			<a href="/cities">Cities</a>,
		],
	},
	{
		header: 'Meetup',
		items: [
			<a href="/about">About</a>,
			<a href="/pro">Meetup Pro</a>,
			<a href="/jobs">Careers</a>,
			<a href="/apps">Apps</a>,
			<a href="/blog">Blog</a>,
		],
	},
];

const subFooterLinks = [
	<a href="/terms">Terms</a>,
	<a href="/privacy">Privacy</a>,
	<a href="/cookie_policy">Cookies</a>,
];

const MOCK_DEFAULT_STATE = {
	legalCopy: 'Mock legal copy',
	localeCode: 'en-US',
	linkSets: footerLinkSets,
	onLanguageSelect: onLanguageSelect,
	subFooterLinks: subFooterLinks,
	createMeetup: {
		text: 'Create a Meetup',
		link: '/create/',
	},
	media: { isAtLargeUp: false },
};

describe('Footer', () => {
	const footerComponent = shallow(<Footer {...MOCK_DEFAULT_STATE} />);
	it('exists', () => {
		expect(footerComponent).toMatchSnapshot();
	});
	it('should render social media icon list', () => {
		const socialMediaIconList = footerComponent.find(SocialIconsList);
		expect(socialMediaIconList.exists()).toBe(true);
	});
	it('should render FooterCategory with linkSet', () => {
		const footerCategories = shallow(<FooterCategory {...footerLinkSets[0]} />);
		expect(footerCategories).toMatchSnapshot();
	});
});
