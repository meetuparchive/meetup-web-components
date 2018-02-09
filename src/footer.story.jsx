import React from 'react';
import { storiesOf, action } from '@storybook/react';

import Flex from './layout/Flex';
import FlexItem from './layout/FlexItem';
import withMatchMedia from './utils/components/withMatchMedia';

import { decorateWithLocale } from './utils/decorators';
import { Footer } from './Footer';

const TestFooter = withMatchMedia(Footer);

const footerLinkSets = [
	{
		header: 'Your Account',
		items: [
			<a href='/register'>Settings</a>,
			<a href="/logout">Log out</a>,
			<a href="/help">Help</a>
		]
	},
	{
		header: 'Discover',
		items: [
			<a href='/groups'>Groups</a>,
			<a href="/calendar">Calendar</a>,
			<a href="/topics">Topics</a>,
			<a href="/cities">Cities</a>
		]
	},
	{
		header: 'Meetup',
		items: [
			<a href='/about'>About</a>,
			<a href="/pro">Meetup Pro</a>,
			<a href="/jobs">Careers</a>,
			<a href="/apps">Apps</a>,
			<a href="/meetup_api">API</a>
		]
	},
];

const subFooterLinks = [
	<a href="/terms">
		<span className="atMedium_display--none">Terms</span>
		<span className="display--none atMedium_display--inline">Terms of Service</span>
	</a>,
	<a href="/privacy">
		<span className="atMedium_display--none">Privacy</span>
		<span className="display--none atMedium_display--inline">Privacy Policy</span>
	</a>,
	<a href="/cookie_policy">
		<span className="atMedium_display--none">Cookies</span>
		<span className="display--none atMedium_display--inline">Cookie Policy</span>
	</a>,
];

const AppBadges = () => (
	<Flex>
		<FlexItem>
			<a href="http://meetu.ps/2ZhShs">
				<img
					className="span--100 margin--center"
					src='https://devimages-cdn.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg'
					style={{maxWidth: '160px'}}
				/>
			</a>
		</FlexItem>
		<FlexItem>
			<a href="http://meetu.ps/2ZhSyb">
				<img
					className="span--100 margin--center"
					src="https://vignette.wikia.nocookie.net/shallwedate/images/6/66/Google_Play_Banner.png"
					style={{maxWidth: '160px'}}
				/>
			</a>
		</FlexItem>
	</Flex>
);

const DEFAULT_PROPS = {
	linkSets: footerLinkSets,
	localeCode: "en-US",
	onLanguageSelect: action('language changed'),
	subFooterLinks: subFooterLinks,
	appBadges: <AppBadges />,
	createMeetup: {
		text: 'Create a Meetup',
		link: '/create/'
	},
	style: {width: '100%'}
};

storiesOf('Footer', module)
	.addDecorator(decorateWithLocale)
	.add('default', () => <TestFooter {...DEFAULT_PROPS} />)
	.add('isLoggedIn', () => <TestFooter {...DEFAULT_PROPS} isLoggedIn />)
	.add('isLight', () => <TestFooter {...DEFAULT_PROPS} isLight />);
