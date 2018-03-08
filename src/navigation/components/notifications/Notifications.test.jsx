import React from 'react';
import { shallow } from 'enzyme';

import { MOCK_NOTIFICATION_EVENT } from 'meetup-web-mocks/lib/notifications/api';

import Notification, { getIconShape } from './Notifications';

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
			id={MOCK_NOTIFICATION_EVENT.id}
			memberId={MOCK_NOTIFICATION_EVENT.id}
			kind={MOCK_NOTIFICATION_EVENT.kind}
			isRead={false}
			onMarkReadAction={MOCK_HANDLERS.markRead}
			link={MOCK_NOTIFICATION_EVENT.link}
			dangerouslySetInnerHTML={{ __html: MOCK_NOTIFICATION_EVENT.text }}
			photoUrl={MOCK_NOTIFICATION_EVENT.photo.photo_link}
			updated={MOCK_NOTIFICATION_EVENT.updated}
			generateClassicUrl={jest.fn()}
		/>
	);

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});
