import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

import withMatchMedia from '../utils/components/withMatchMedia';

export const IOS_DOWNLOAD_LINK = 'https://meetu.ps/2ZhShs';
export const ANDROID_DOWNLOAD_LINK = 'https://meetu.ps/2ZhSyb';
const getAppStoreDownloadPhoto = (platform, language) =>
	// eslint-disable-next-line global-require, import/no-dynamic-require
	require(`../../assets/images/app_download/${platform}/download_${language}.png`);

/**
 * Renders iOS and Android app badges
 * @class AppBadges
 */
const AppBadges = ({ className, language, getAppStorePhoto, media, ...other }) => {
	const classNames = cx('getTheApp-downloadLinks', className);
	const isMobile = Boolean(!media.isAtMediumUp);
	const isIos = /ipad|iphone|ipod/i.test(navigator.userAgent);
	const isAndroid = /android/i.test(navigator.userAgent);
	const isIosPhone = Boolean(isIos && isMobile);
	const isAndroidPhone = Boolean(isAndroid && isMobile);

	return (
		<Flex className={classNames} {...other}>
			{(isIosPhone || !isMobile) && (
				<FlexItem className="getTheApp-ios">
					<a href={IOS_DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer">
						<img
							className="getTheApp-downloadImage span--100 margin--center"
							src={getAppStorePhoto('ios', language)}
							alt="Meetup iOS App Download"
						/>
					</a>
				</FlexItem>
			)}
			{(isAndroidPhone || !isMobile) && (
				<FlexItem className="getTheApp-android">
					<a
						href={ANDROID_DOWNLOAD_LINK}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="getTheApp-downloadImage span--100 margin--center"
							src={getAppStorePhoto('android', language)}
							alt="Meetup Android App Download"
						/>
					</a>
				</FlexItem>
			)}
		</Flex>
	);
};

AppBadges.defaultProps = {
	getAppStorePhoto: getAppStoreDownloadPhoto,
};

AppBadges.propTypes = {
	/** A function to load the app badge images - will likely take language and platform parameters */
	getAppStorePhoto: PropTypes.func,

	/** The language the badge image is in */
	language: PropTypes.string.isRequired,

	/** Info about viewport size */
	media: PropTypes.object,
};

export default withMatchMedia(AppBadges);
