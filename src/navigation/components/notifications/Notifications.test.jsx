import React from 'react';
import { shallow } from 'enzyme';

import { MOCK_NOTIFICATION_EVENT } from 'meetup-web-mocks/lib/notifications/api';

import Notification, { getIconShape } from './Notifications';

const MOCK_NOTIF = {
	...MOCK_NOTIFICATION_EVENT,
	formattedTimeSince: 'Thu Mar 30 2017',
};

describe('Notification Icons', () => {
	it('returns messages icon for message-related notifs', () => {
		expect(getIconShape('convo')).toBe('messages');
		expect(getIconShape('mug_comm')).toBe('messages');
		expect(getIconShape('comment')).toBe('messages');
	});
	it('returns event icon for event-related notifs', () => {
		expect(getIconShape('event')).toBe('calendar');
	});
	it('returns default icon for unspecified notif kinds', () => {
		expect(getIconShape('someOtherNotif')).toBe('meetup-m');
	});
});

describe('Notification component', () => {
	const MOCK_HANDLERS = {
		markRead: jest.fn(id => id),
	};

	const component = shallow(
		<Notification
			id={MOCK_NOTIF.id}
			memberId={MOCK_NOTIF.id}
			kind={MOCK_NOTIF.kind}
			isRead={false}
			onMarkReadAction={MOCK_HANDLERS.markRead}
			link={MOCK_NOTIF.link}
			dangerouslySetInnerHTML={{ __html: MOCK_NOTIF.text }}
			photoUrl={MOCK_NOTIF.photo.photo_link}
			formattedTimeSince={MOCK_NOTIF.formattedTimeSince}
			generateClassicUrl={jest.fn()}
		/>
	);

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});
