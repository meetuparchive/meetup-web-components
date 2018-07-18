import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

export const IOS_DOWNLOAD_LINK = 'http://meetu.ps/2ZhShs';
export const ANDROID_DOWNLOAD_LINK = 'http://meetu.ps/2ZhSyb';
const getAppStoreDownloadPhoto = (platform, language) =>
	// eslint-disable-next-line global-require, import/no-dynamic-require
	require(`../../assets/images/app_download/${platform}/download_${language}.png`);

/**
 * Renders iOS and Android app badges
 * @class AppBadges
 */
const AppBadges = ({ className, language, getAppStorePhoto, ...other }) => {
	const classNames = cx('getTheApp-downloadLinks', className);

	return (
		<Flex className={classNames} {...other}>
			<FlexItem className="getTheApp-ios">
				<a href={IOS_DOWNLOAD_LINK} aria-label="Get the iOS app">
					<img
						className="getTheApp-downloadImage span--100 margin--center"
						src={getAppStorePhoto('ios', language)}
						title="iOS App Download"
					/>
				</a>
			</FlexItem>
			<FlexItem className="getTheApp-android">
				<a href={ANDROID_DOWNLOAD_LINK} aria-label="Get the Android app">
					<img
						className="getTheApp-downloadImage span--100 margin--center"
						src={getAppStorePhoto('android', language)}
						title="Android App Download"
					/>
				</a>
			</FlexItem>
		</Flex>
	);
};

AppBadges.defaultProps = {
	getAppStorePhoto: getAppStoreDownloadPhoto,
};

AppBadges.propTypes = {
	getAppStorePhoto: PropTypes.func,
	language: PropTypes.string.isRequired,
};

export default AppBadges;
