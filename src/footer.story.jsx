import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import withMatchMedia from './utils/components/withMatchMedia';

import { decorateWithBasics, decorateWithInfo } from './utils/decorators';
import { Footer } from './Footer';

const TestFooter = withMatchMedia(Footer);

const legalCopy = 'Meetup is a wholly owned subsidiary of WeWork Companies, Inc.';

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
			<a href="/meetup_api">API</a>,
		],
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

const DEFAULT_PROPS = {
	legalCopy,
	linkSets: footerLinkSets,
	localeCode: 'en-US',
	onLanguageSelect: action('language changed'),
	subFooterLinks: subFooterLinks,
	createMeetup: {
		text: 'Create a Meetup',
		link: '/create/',
	},
	style: { width: '100%' },
};

storiesOf('Footer', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({info: {propTables: [Footer]}})
	.add(
		'default',
		() => <TestFooter {...DEFAULT_PROPS} />,
		{ info: { text: 'Footer content for a logged out user on replatformed pages' } }
	)
	.add(
		'isLoggedIn',
		() => <TestFooter {...DEFAULT_PROPS} isLoggedIn />,
		{ info: { text: 'Footer content for a logged in user on replatformed pages' } }
	)
	.add(
		'isLight',
		() => <TestFooter {...DEFAULT_PROPS} isLight />,
		{ info: { text: 'This light-colored variant of the footer is rendered on very sparse pages like our 404 page or the standard error page' } }
	);
