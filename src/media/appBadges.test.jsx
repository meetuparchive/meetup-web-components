import React from 'react';
import { shallow } from 'enzyme';

import AppBadges, {
	IOS_DOWNLOAD_LINK,
	ANDROID_DOWNLOAD_LINK,
} from './AppBadges';

const testLanguage = 'fr';

describe('App Badges', () => {
	const appBadgesComponent = shallow(<AppBadges language={testLanguage} />);
	it('exists', () => {
		expect(appBadgesComponent).toMatchSnapshot();
	});
	it('should link to the itunes store', () => {
		const itunesStoreLink = appBadgesComponent.find(
			`a[href="${IOS_DOWNLOAD_LINK}"]`
		);
		expect(itunesStoreLink.exists()).toBe(true);
	});
	it('should link to the google play store', () => {
		const googlePlayStoreLink = appBadgesComponent.find(
			`a[href="${ANDROID_DOWNLOAD_LINK}"]`
		);
		expect(googlePlayStoreLink.exists()).toBe(true);
	});
	it('should render the correct itunes and google play store images based on language', () => {
		const getAppStorePhoto = jest.fn();
		shallow(
			<AppBadges language={testLanguage} getAppStorePhoto={getAppStorePhoto} />
		);
		expect(getAppStorePhoto).toHaveBeenCalledWith('android', testLanguage);
		expect(getAppStorePhoto).toHaveBeenCalledWith('ios', testLanguage);
	});
});
