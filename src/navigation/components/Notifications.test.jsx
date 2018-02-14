
import { getIconShape } from './Notification';

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
