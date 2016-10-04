import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import EventCard, { MAX_DESC_LEN, MAX_RECURRING_LIST } from './EventCard';
import RsvpBox from './RsvpBox';

import { MOCK_EVENT } from 'meetup-web-platform/util/mocks/api';

const MOCK_FEE = {
	amount: 15,
	currency: '$',
	description: 'per person',
};

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('EventCard', function() {

	it('exists', function() {
		const eventcard = intlRender(<EventCard event={MOCK_EVENT} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);

		expect(eventcardNode).not.toBeNull();
	});
	it('render event without description', function() {
		const MOCK_EVENT_NO_DESC = { ...MOCK_EVENT };
		delete MOCK_EVENT_NO_DESC.description;

		const eventcard = intlRender(<EventCard event={MOCK_EVENT_NO_DESC} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);

		expect(eventcardNode).not.toBeNull();
	});

	it('Shows the date of the event (renders tearsheet)', () => {
		const eventcard = intlRender(<EventCard event={MOCK_EVENT} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);

		expect(eventcardNode.querySelector('.tearsheet')).not.toBeNull();
	});
	it('Shows the time of the event', () => {
		const eventcard = intlRender(<EventCard event={MOCK_EVENT} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);

		// lots of formatting happens - no need to test for exact string
		expect(eventcardNode.querySelector('.event-time')).not.toBeNull();
	});
	it('Shows the name of the event', () => {
		const name = 'Heaven forbid';
		const eventcard = intlRender(<EventCard event={{ ...MOCK_EVENT, name }} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const eventNameNode = eventcardNode.querySelector('.event-name');

		expect(eventNameNode).not.toBeNull();
		expect(eventNameNode.textContent).toEqual(name);
	});
	it('Shows the venue name when provided', () => {
		const venue = { name: 'Joe\'s tavern' };
		const eventcard = intlRender(<EventCard event={{ ...MOCK_EVENT, venue }} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const eventVenueNode = eventcardNode.querySelector('.event-venue');

		expect(eventVenueNode).not.toBeNull();
		expect(eventVenueNode.textContent).toEqual(venue.name);
	});
	it('Does not display the description for past events', () => {
		const description = 'Do not show me';
		const status = 'past';
		const eventcard = intlRender(<EventCard event={{ ...MOCK_EVENT, description, status }} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);

		expect(eventcardNode.querySelector('.event-description')).toBeNull();
	});
	it('Displays the (truncated) event description on non-past events', () => {
		const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
			sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad 😊 minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
			ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
			sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.`;
		// quick test of the test setup - if this fails just make the mock description longer
		expect(description.length).toBeGreaterThan(MAX_DESC_LEN);
		const eventcard = intlRender(<EventCard event={{ ...MOCK_EVENT, description }} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const truncatedDescNode = eventcardNode.querySelector('.event-description');

		expect(truncatedDescNode).not.toBeNull();
		// description gets an ellipsis character appended, so `+ 1` length here
		expect(truncatedDescNode.textContent.length).toBe(MAX_DESC_LEN + 1);
	});
	it('Indicates Draft status', () => {
		const status = 'draft';
		const event = { ...MOCK_EVENT, status };
		const eventcard = intlRender(<EventCard event={event} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const statusText = eventcardNode.querySelector('.event-status').textContent;
		expect(statusText).toEqual('Draft');
	});
	it('Indicates Cancelled status', () => {
		const status = 'cancelled';
		const event = { ...MOCK_EVENT, status };
		const eventcard = intlRender(<EventCard event={event} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const statusText = eventcardNode.querySelector('.event-status').textContent;
		expect(statusText).toEqual('Cancelled');
	});
	it('Indicates Featured status', () => {
		const featured = true;
		const event = { ...MOCK_EVENT, featured };
		const eventcard = intlRender(<EventCard event={event} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const statusText = eventcardNode.querySelector('.event-status').textContent;
		expect(statusText).toEqual('Featured');
	});
	it('Shows repeating event dates/times', () => {
		const series = {
			description: 'every week on Monday',
		};
		const recurring = [
			{ ...MOCK_EVENT },
			{ ...MOCK_EVENT}
		];
		const event = { ...MOCK_EVENT, series };
		const eventcard = intlRender(<EventCard event={event} recurring={recurring} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const listNode = eventcardNode.querySelector('.recurringList');
		const listItems = eventcardNode.querySelectorAll('.recurringList-item');

		expect(listNode).not.toBeNull();
		expect(listItems.length).toBe(Math.min(recurring.length, MAX_RECURRING_LIST));
	});
	it(`Shows a maximum of ${MAX_RECURRING_LIST} recurrences`, () => {
		const series = {
			description: 'every week on Monday',
		};
		const event = { ...MOCK_EVENT, series };
		const recurring = new Array(MAX_RECURRING_LIST + 5).fill({ ...event });
		const eventcard = intlRender(<EventCard event={event} recurring={recurring} />);
		const eventcardNode = ReactDOM.findDOMNode(eventcard);
		const listItems = eventcardNode.querySelectorAll('.recurringList-item');

		expect(listItems.length).toBe(Math.min(recurring.length, MAX_RECURRING_LIST));
	});

	describe('Past events', () => {
		it('Shows how many members attended past events', () => {
			const status = 'past';
			const yes_rsvp_count = 13;
			const event = { ...MOCK_EVENT, status, yes_rsvp_count };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const attendedNode = eventcardNode.querySelector('.event-attended');
			expect(attendedNode).not.toBeNull();
			expect(attendedNode.textContent.indexOf(yes_rsvp_count.toString())).toBeGreaterThan(-1);
		});
		it('prints date in years when more than 1 year old', () => {
			const status = 'past';
			const twoYearsPast = new Date();
			twoYearsPast.setFullYear(twoYearsPast.getFullYear() - 2);
			const time = twoYearsPast;
			const event = { ...MOCK_EVENT, status, time };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const eventTime = eventcardNode.querySelector('.event-time');
			expect(eventTime.textContent.indexOf('2')).toBeGreaterThan(-1);
		});
	});

	describe('Upcoming events', () => {
		it('Shows the spots left when limited spots are left', () => {
			const spotsLeft = 50;
			const rsvp_limit = MOCK_EVENT.yes_rsvp_count + spotsLeft;
			const event = { ...MOCK_EVENT, rsvp_limit };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const spotsLeftNode = eventcardNode.querySelector('.event-spotsLeft');
			expect(spotsLeftNode).not.toBeNull();
			expect(spotsLeftNode.textContent.indexOf(spotsLeft.toString())).toBeGreaterThan(-1);
		});
		it('Indicates that a waitlist is available when no spots left', () => {
			const spotsLeft = 0;
			const rsvp_limit = MOCK_EVENT.yes_rsvp_count + spotsLeft;
			const event = { ...MOCK_EVENT, rsvp_limit };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const spotsLeftNode = eventcardNode.querySelector('.event-spotsLeft');
			expect(spotsLeftNode.textContent.indexOf('Waitlist')).toBeGreaterThan(-1);
		});
		it('Shows RSVP avatars when there are RSVPs', () => {
			const event = { ...MOCK_EVENT };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const avatarNodes = eventcardNode.querySelectorAll('.avatar--person');
			expect(avatarNodes.length).not.toBe(0);
		});
		it('Does not show RSVP avatars when there are no RSVPs', () => {
			const rsvp_sample = [];
			const yes_rsvp_count = 0;
			const event = { ...MOCK_EVENT, rsvp_sample, yes_rsvp_count };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const avatarNodes = eventcardNode.querySelectorAll('.avatar--person');
			expect(avatarNodes.length).toBe(0);
		});
		it('Renders an "additional RSVPS" count in addition to avatars at narrow width', () => {
			// narrow width only
			const yes_rsvp_count = 100;
			const event = { ...MOCK_EVENT, yes_rsvp_count };
			const eventcard = intlRender(<EventCard event={event} narrow />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const avatarNodes = eventcardNode.querySelectorAll('.avatar--person');
			const addlRsvps = eventcardNode.querySelector('.event-addlRsvps');
			const addlRsvpsCount = yes_rsvp_count - avatarNodes.length;
			expect(addlRsvps).not.toBeNull();
			expect(addlRsvps.textContent.indexOf(addlRsvpsCount)).toBeGreaterThan(-1);
		});
		it('Displays total rsvp count', () => {
			// wide width only
			const yes_rsvp_count = 100;
			const event = { ...MOCK_EVENT, yes_rsvp_count };
			const eventcard = intlRender(<EventCard event={event} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const eventGoingNode = eventcardNode.querySelector('.event-going');
			expect(eventGoingNode).not.toBeNull();
			expect(eventGoingNode.textContent.indexOf(yes_rsvp_count.toString())).toBeGreaterThan(-1);
			expect(eventGoingNode.textContent.indexOf('going')).toBeGreaterThan(-1);
		});
	});
	describe('RsvpBox', function() {
		it('exists', function() {
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={() => {}} event={MOCK_EVENT} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			expect(rsvpboxNode).not.toBeNull();
		});

		it('Provides a way to RSVP when user is authorized', () => {
			const self = {
				actions: ['rsvp']
			};
			const spyable = {
				onRsvpClick: () => {}
			};
			spyOn(spyable, 'onRsvpClick');
			const event = { ...MOCK_EVENT, self };
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={spyable.onRsvpClick} event={event} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			// just a button that calls an action - RSVP flow is TBD
			const rsvpButtonNode = rsvpboxNode.querySelector('button');
			expect(rsvpboxNode).not.toBeNull();

			TestUtils.Simulate.click(rsvpButtonNode);
			expect(spyable.onRsvpClick).toHaveBeenCalled();
		});
		it('Does not allow RSVP when user is not authorized', () => {
			// Disabled button
			const self = {
				actions: []
			};
			const spyable = {
				onRsvpClick: () => {}
			};
			spyOn(spyable, 'onRsvpClick');
			const event = { ...MOCK_EVENT, self };
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={spyable.onRsvpClick} event={event} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			// just a button that calls an action - RSVP flow is TBD
			const rsvpButtonNode = rsvpboxNode.querySelector('button');
			expect(rsvpboxNode).not.toBeNull();  // expect the button to exist, but not be clickable

			TestUtils.Simulate.click(rsvpButtonNode);
			expect(spyable.onRsvpClick).not.toHaveBeenCalled();
		});
		it('Does not allow RSVP before RSVPs open', () => {
			const open_time = new Date();
			open_time.setDate(new Date().getDate() + 7);
			const rsvp_rules = {
				open_time,
				closed: true,
			};
			const spyable = {
				onRsvpClick: () => {}
			};
			spyOn(spyable, 'onRsvpClick');
			const event = { ...MOCK_EVENT, rsvp_rules };
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={spyable.onRsvpClick} event={event} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			// just a button that calls an action - RSVP flow is TBD
			const rsvpButtonNode = rsvpboxNode.querySelector('button');
			expect(rsvpboxNode).not.toBeNull();

			TestUtils.Simulate.click(rsvpButtonNode);
			expect(spyable.onRsvpClick).not.toHaveBeenCalled();
		});
		it('Does not allow RSVP after RSVP deadline', () => {
			const close_time = new Date();
			close_time.setDate(new Date().getDate() - 7);
			const rsvp_rules = {
				close_time,
				closed: true,
			};
			const spyable = {
				onRsvpClick: () => {}
			};
			spyOn(spyable, 'onRsvpClick');
			const event = { ...MOCK_EVENT, rsvp_rules };
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={spyable.onRsvpClick} event={event} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			// just a button that calls an action - RSVP flow is TBD
			const rsvpButtonNode = rsvpboxNode.querySelector('.rsvpButton');
			expect(rsvpboxNode).not.toBeNull();

			TestUtils.Simulate.click(rsvpButtonNode);
			expect(spyable.onRsvpClick).not.toHaveBeenCalled();
		});
		it('Displays the price for events with a fee', () => {
			const fee = MOCK_FEE;
			const event = { ...MOCK_EVENT, fee };
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={() => {}} event={event} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			const feeNode = rsvpboxNode.querySelector('.event-fee');
			expect(feeNode.textContent.indexOf(MOCK_FEE.amount.toString())).toBeGreaterThan(-1);
		});
		it('Displays the RSVP close deadline when provided', () => {
			const close_time = new Date();
			close_time.setDate(new Date().getDate() + 7);  // future deadline
			const rsvp_rules = {
				close_time,
			};
			const event = { ...MOCK_EVENT, rsvp_rules };
			const rsvpbox = intlRender(<RsvpBox onRsvpClick={() => {}} event={event} />);
			const rsvpboxNode = ReactDOM.findDOMNode(rsvpbox);
			const timeLimitNode = rsvpboxNode.querySelector('.event-timeLimit');
			expect(timeLimitNode).not.toBeNull();
			expect(timeLimitNode.textContent.indexOf('deadline')).toBeGreaterThan(-1);
		});
		it('Renders a waitlist button when no spots available', () => {
			const spotsLeft = 0;
			const rsvp_limit = MOCK_EVENT.yes_rsvp_count + spotsLeft;
			const event = { ...MOCK_EVENT, rsvp_limit };
			const eventcard = intlRender(<EventCard event={event} onRsvpClick={() => {}} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const rsvpButtonNode = eventcardNode.querySelector('.rsvpButton--waitlist');
			expect(rsvpButtonNode).not.toBeNull();
		});

		it('Renders an "I\'m going" button when RSVP\'d yes', () => {
			const self = { rsvp: { response: 'yes' } };
			const event = { ...MOCK_EVENT, self };
			const eventcard = intlRender(<EventCard event={event} onRsvpClick={() => {}} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const rsvpButtonNode = eventcardNode.querySelector('.rsvpButton--going');
			expect(rsvpButtonNode).not.toBeNull();
		});

		it('Renders a "Waitlisted" button when waitlisted', () => {
			const self = { rsvp: { response: 'waitlist' } };
			const event = { ...MOCK_EVENT, self };
			const eventcard = intlRender(<EventCard event={event} onRsvpClick={() => {}} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const rsvpButtonNode = eventcardNode.querySelector('.rsvpButton--waitlisted');
			expect(rsvpButtonNode).not.toBeNull();
		});

		it('Renders a "Not going" button when RSVP\'d no', () => {
			const self = { rsvp: { response: 'no' } };
			const event = { ...MOCK_EVENT, self };
			const eventcard = intlRender(<EventCard event={event} onRsvpClick={() => {}} />);
			const eventcardNode = ReactDOM.findDOMNode(eventcard);
			const rsvpButtonNode = eventcardNode.querySelector('.rsvpButton--notGoing');
			expect(rsvpButtonNode).not.toBeNull();
		});

	});
});

