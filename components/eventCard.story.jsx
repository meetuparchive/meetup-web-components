import React from 'react';
import { storiesOf, linkTo, action } from '@kadira/storybook';
import { IntlProvider } from 'react-intl';
import EventCard from './EventCard';
import { MOCK_EVENT } from 'meetup-web-platform/util/mocks/api';

const MOCK_FEE = {
	amount: 15,
	currency: '$',
	description: 'per person',
};

const onRsvpClick = e => {
	e.preventDefault();
	e.stopPropagation();
	action('RSVP clicked')(e);
	linkTo('EventCard', 'Going')(e);
};

storiesOf('EventCard', module)
	.addDecorator(story => {
		const eventCardProps = story();
		const locale= 'en-US';

		return (
			<IntlProvider locale={locale}>
				<div style={{ width: '480px' }}>{/* rough desktop width standard */}
					<h2>Default</h2>
					<EventCard
						{ ...eventCardProps }
						onRsvpClick={onRsvpClick}
					/>
					<div className='margin--top' style={{ width: '320px' }}>{/* rough desktop width standard */}
						<h2>Narrow</h2>
						<EventCard
							{ ...eventCardProps }
							onRsvpClick={onRsvpClick}
							narrow
						/>
					</div>
				</div>
			</IntlProvider>
		);
	})
	.add('Past', () => {
		const status = 'past';
		const time = new Date();
		time.setMonth(time.getMonth() - 2);
		return { event: { ...MOCK_EVENT, status, time } };
	})
	.add('Far past: over a year ago', () => {
		const status = 'past';
		const time = new Date();
		time.setYear(time.getFullYear() - 1);
		time.setMonth(time.getMonth() - 2);
		return { event: { ...MOCK_EVENT, status, time } };
	})
	.add('Upcoming', () => {
		const status = 'upcoming';
		return { event: { ...MOCK_EVENT, status } };
	})
	.add('Upcoming w/o description', () => {
		const status = 'upcoming';
		const MOCK_EVENT_NO_DESC = { ...MOCK_EVENT };
		delete MOCK_EVENT_NO_DESC.description;
		return { event: { ...MOCK_EVENT_NO_DESC, status } };
	})
	.add('Featured', () => {
		const featured = true;
		return { event: { ...MOCK_EVENT, featured } };
	})
	.add('Draft', () => {
		const status = 'draft';
		return { event: { ...MOCK_EVENT, status } };
	})
	.add('Cancelled', () => {
		const status = 'cancelled';
		return { event: { ...MOCK_EVENT, status } };
	})
	.add('Not allowed to RSVP', () => {
		const self = { actions: [] };
		return { event: { ...MOCK_EVENT, self } };
	})
	.add('Going', () => {
		const self = { ...MOCK_EVENT.self };
		self.rsvp = { response: 'yes' };
		return { event: { ...MOCK_EVENT, self } };
	})
	.add('Not going', () => {
		const self = { ...MOCK_EVENT.self };
		self.rsvp = { response: 'no' };
		return { event: { ...MOCK_EVENT, self } };
	})
	.add('Waitlisted', () => {
		const rsvp_limit = 0;
		const self = { ...MOCK_EVENT.self };
		self.rsvp = { response: 'waitlist' };
		return { event: { ...MOCK_EVENT, self, rsvp_limit } };
	})
	.add('Has price', () => {
		const fee = MOCK_FEE;
		return { event: { ...MOCK_EVENT, fee } };
	})
	.add('Has RSVP deadline', () => {
		const close_time = new Date();
		close_time.setDate(new Date().getDate() + 7);
		const rsvp_rules = {
			close_time,
		};
		return { event: { ...MOCK_EVENT, rsvp_rules } };
	})
	.add('RSVPs not open', () => {
		const open_time = new Date();
		open_time.setDate(new Date().getDate() + 7);
		const rsvp_rules = {
			open_time,
			closed: true,
		};
		return { event: { ...MOCK_EVENT, rsvp_rules } };
	})
	.add('Price + RSVP deadline', () => {
		const fee = MOCK_FEE;
		const close_time = new Date();
		close_time.setDate(new Date().getDate() + 7);
		const rsvp_rules = {
			close_time,
		};
		return { event: { ...MOCK_EVENT, rsvp_rules, fee } };
	})
	.add('RSVP cap: >= 5 spots left', () => {
		const rsvp_limit = MOCK_EVENT.yes_rsvp_count + 50;
		return { event: { ...MOCK_EVENT, rsvp_limit } };
	})
	.add('RSVP cap: < 5 spots left', () => {
		const rsvp_limit = MOCK_EVENT.yes_rsvp_count + 3;
		return { event: { ...MOCK_EVENT, rsvp_limit } };
	})
	.add('RSVP cap: < 5 spots left', () => {
		const rsvp_limit = MOCK_EVENT.yes_rsvp_count + 3;
		return { event: { ...MOCK_EVENT, rsvp_limit } };
	})
	.add('RSVP cap: 0 spots left', () => {
		const rsvp_limit = 0;
		return { event: { ...MOCK_EVENT, rsvp_limit } };
	})
	.add('Has venue', () => {
		const venue = {
			name: 'Joe\'s Tavern',
		};
		return { event: { ...MOCK_EVENT, venue } };
	})
	.add('Long name', () => {
		const name = 'This is an event that has a long name that will start to get crowded';
		return { event: { ...MOCK_EVENT, name } };
	})
	.add('Recurring event', () => {
		const series = {
			description: 'every week on Monday',
		};
		const recurring = [{ ...MOCK_EVENT }, { ...MOCK_EVENT}];
		return { event: { ...MOCK_EVENT, series }, recurring };
	});

