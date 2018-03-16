import React from 'react';
import { shallow } from 'enzyme';

import {
	MOCK_NOTIFICATION_COMMENT,
	MOCK_NOTIFICATIONS_LIST,
} from 'meetup-web-mocks/lib/notifications/api';

import { NotificationsDropdownComponent } from './NotificationsDropdown';

const notifs = [
	...MOCK_NOTIFICATIONS_LIST,
	{
		...MOCK_NOTIFICATION_COMMENT,
		photo: null,
	},
];

describe('Notifications Dropdown', () => {
	const wrapper = (props = {}) =>
		shallow(
			<NotificationsDropdownComponent
				self={{ id: '1234' }}
				notifications={notifs}
				{...props}
			/>
		);

	it('should match the snapshot with notifications ', () => {
		expect(wrapper()).toMatchSnapshot();
	});
	it('should match the snapshot with an empty notifications', () => {
		expect(wrapper({ notifications: [] })).toMatchSnapshot();
	});
});
