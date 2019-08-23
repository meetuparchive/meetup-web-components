import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import locales from 'mwp-config/locales';

import localizedLanguageMap from 'mwp-i18n/lib/localizedLanguageMap';

import AppBadges from './media/AppBadges';
import Bounds from './layout/Bounds';
import Chunk from './layout/Chunk';
import Flex from './layout/Flex';
import FlexItem from './layout/FlexItem';
import InlineBlockList from './layout/InlineBlockList';
import GridList from './layout/GridList';
import Icon from './media/Icon';
import Section from './layout/Section';
import SelectInput from './forms/SelectInput';
import Stripe from './layout/Stripe';
import withMatchMedia from './utils/components/withMatchMedia';

import { getSocialLinks } from './utils/getSocialLinks';

export const FooterCategory = props => (
	<Chunk>
		<h4 className="text--bold margin--bottom">{props.header}</h4>
		<GridList
			columns={{
				default: 2,
				medium: 1,
			}}
			className="text--secondary text--small"
			itemClassNames="footer-item"
			items={props.items}
		/>
	</Chunk>
);

export const SocialIconsList = ({ localeCode }) => {
	const socialLinks = getSocialLinks(localeCode);
	const socialIcons = [
		<a href={socialLinks.facebook}>
			<Icon shape="external-facebookboxed" size="s" />
		</a>,
		<a href={socialLinks.twitter}>
			<Icon className="margin--left" shape="external-twitter" size="s" />
		</a>,
		<a href={socialLinks.youtube}>
			<Icon className="margin--left" shape="external-youtube" size="s" />
		</a>,
		<a href={socialLinks.instagram}>
			<Icon className="margin--left" shape="external-instagram" size="s" />
		</a>,
		<a href={socialLinks.medium}>
			<Icon className="margin--left" shape="external-medium" size="s" />
		</a>,
	];

	return <InlineBlockList items={socialIcons} />;
};

export const LanguageSelectInput = props => (
	<SelectInput
		onChange={props.onChange}
		options={locales.map(language => ({
			label: localizedLanguageMap[language],
			value: language,
		}))}
		name="languagePicker"
		value={props.currentLocaleCode}
		label="Language"
		labelClassName="visibility--a11yHide"
	/>
);

export const Footer = ({
	className,
	createMeetup,
	isLight,
	isLoggedIn,
	legalCopy,
	localeCode,
	linkSets,
	media,
	onLanguageSelect,
	socialHeader,
	subFooterLinks,
	...other
}) => {
	const classNames = cx('column-item', 'column-item--shrink', className);
	const languageShort = localeCode.split('-')[0];

	return (
		<footer id="mupFooter" className={classNames} {...other}>
			<Stripe
				inverted={!isLight}
				className={cx('footerStripe-main', {
					'footerStripe-main--isLight': isLight,
				})}
			>
				<Bounds narrow className="bounds--footer">
					<Section hasSeparator>
						<Chunk>
							<a
								href={createMeetup.link}
								className={cx(
									'link',
									'link--white',
									createMeetup.gmtTracker,
									createMeetup.e2eTracker
								)}
							>
								{createMeetup.text}
							</a>
						</Chunk>
					</Section>
					<Section hasSeparator className="border--none">
						<Flex direction="column" switchDirection="large">
							<FlexItem className="margin--bottom">
								<Flex direction="column" switchDirection="medium">
									{linkSets.map((linkSet, i) => (
										<FlexItem key={`linkSet-${i}`}>
											<FooterCategory {...linkSet} />
										</FlexItem>
									))}
								</Flex>
							</FlexItem>
							<FlexItem shrink>
								<Flex noGutters direction="column">
									<FlexItem shrink>
										<Chunk className="align--center atMedium_align--left">
											<h4 className="text--bold margin--bottom">
												{socialHeader}
											</h4>
											<SocialIconsList localeCode={localeCode} />
										</Chunk>
									</FlexItem>
									<FlexItem>
										<Flex
											direction={
												!media.isAtMediumUp || media.isAtLargeUp
													? 'column'
													: 'row'
											}
											rowReverse={
												media.isAtMediumUp &&
												!media.isAtLargeUp &&
												!isLoggedIn
											}
											justify={
												media.isAtMediumUp &&
												!media.isAtLargeUp &&
												!isLoggedIn
													? 'spaceBetween'
													: null
											}
										>
											{!isLoggedIn && (
												<FlexItem shrink className="margin--top">
													<Chunk>
														<LanguageSelectInput
															currentLocaleCode={localeCode}
															onChange={onLanguageSelect}
														/>
													</Chunk>
												</FlexItem>
											)}
											<FlexItem shrink>
												<Chunk className="align--center atMedium_align--left margin--top">
													<AppBadges language={languageShort} />
												</Chunk>
											</FlexItem>
										</Flex>
									</FlexItem>
								</Flex>
							</FlexItem>
						</Flex>
					</Section>
				</Bounds>
			</Stripe>
			<Stripe
				inverted={!isLight}
				className={cx('footerStripe-legal border--none', {
					'footerStripe-legal--isLight': isLight,
				})}
			>
				<Bounds>
					<div className="padding--all">
						<InlineBlockList
							className="text--small align--center atMedium_align--left footerList-legal"
							separator="·"
							items={[
								<span>{`© Meetup ${new Date().getFullYear()}`}</span>,
								legalCopy && <span>{legalCopy}</span>,
							].filter(item => item)}
						/>
						<InlineBlockList
							className="text--small align--center atMedium_align--left margin--top"
							separator="·"
							items={[...subFooterLinks]}
						/>
					</div>
				</Bounds>
			</Stripe>
		</footer>
	);
};

Footer.defaultProps = {
	createMeetup: {
		text: 'Create a Meetup',
		link: '/create/',
	},
	linkSets: [
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
	],
	localeCode: 'en-US',
	subFooterLinks: [
		<a href="/terms">Terms of Service</a>,
		<a href="/privacy">Privacy Policy</a>,
		<a href="/cookie_policy">Cookie Policy</a>,
	],
	socialHeader: 'Follow Us',
};

Footer.propTypes = {
	/** Additional class name/s to add to the `<footer/>` element  */
	className: PropTypes.string,

	/** Takes a URL and a text label to render the link to create a new Meetup group  */
	createMeetup: PropTypes.shape({
		link: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		gmtTracker: PropTypes.string,
		e2eTracker: PropTypes.string,
	}).isRequired,

	/** Renders a light footer background instead of dark. Used for 404's and error pages  */
	isLight: PropTypes.bool,

	/** Used to decide which content to render based on whether user is logged into their Meetup account  */
	isLoggedIn: PropTypes.bool,

	/** Fine print required by Meetup's legal team */
	legalCopy: PropTypes.string,

	/** The current user's locale code, which is used to render the correct social media links and language dropdown */
	localeCode: PropTypes.string.isRequired,

	/** Collections of links to render in the footer. For example: "Your Account" links, "Discovery" links, and Meetup-specific links */
	linkSets: PropTypes.arrayOf(
		PropTypes.shape({
			header: PropTypes.string.isRequired,
			items: PropTypes.arrayOf(PropTypes.element).isRequired,
		})
	).isRequired,

	/** Function to call when a user selects a language */
	onLanguageSelect: PropTypes.func.isRequired,

	/** Label for our social media links. e.g.: "Follow us" */
	socialHeader: PropTypes.string,

	/** Small-print links. e.g.: "Terms of Servuce" */
	subFooterLinks: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withMatchMedia(Footer);
