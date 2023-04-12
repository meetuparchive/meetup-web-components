import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

export const IOS_DOWNLOAD_LINK = 'https://meetu.ps/2ZhShs';
export const ANDROID_DOWNLOAD_LINK = 'https://meetu.ps/2ZhSyb';
const getAppStoreDownloadPhoto = (platform, language) =>
	// eslint-disable-next-line global-require, import/no-dynamic-require
	require(`../../assets/images/app_download/${platform}/download_${language}.png`);

/**
 * Renders iOS and Android app badges
 * @class AppBadges
 */
const AppBadges = ({
	className,
	language,
	getAppStorePhoto,
	isAndroidDevice,
	isIosDevice,
	isMobile,
	...other
}) => {
	const classNames = cx('getTheApp-downloadLinks', className);

	return (
		<Flex className={classNames} {...other}>
			{(isIosDevice || !isMobile) && (
				<FlexItem className="getTheApp-ios">
					<a href={IOS_DOWNLOAD_LINK} rel="noopener noreferrer" target="_blank">
						<img
							className="getTheApp-downloadImage span--100 margin--center"
							src={getAppStorePhoto('ios', language)}
						/>
					</a>
				</FlexItem>
			)}
			{(isAndroidDevice || !isMobile) && (
				<FlexItem className="getTheApp-android">
					<a
						href={ANDROID_DOWNLOAD_LINK}
						rel="noopener noreferrer"
						target="_blank"
					>
						<img
							className="getTheApp-downloadImage span--100 margin--center"
							src={getAppStorePhoto('android', language)}
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

	/** Checks if the user is using an iOS device*/
	isIosDevice: PropTypes.bool,

	/** Checks if the user is using an Android device*/
	isAndroidDevice: PropTypes.bool,

	/** Checks if the user is using a mobile device*/
	isMobile: PropTypes.bool,
};

export default AppBadges;
