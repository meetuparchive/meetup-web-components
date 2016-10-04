import React from 'react';
import cx from 'classnames';
import Link from 'react-router/lib/Link';
import { IntlProvider } from 'react-intl';

import {
	FormattedDate,
	FormattedTime,
	FormattedMessage,
	FormattedRelative,
	defineMessages,
} from 'react-intl';

import Tearsheet from './TearSheet';
import AvatarMember from './AvatarMember';
import RsvpBox from './RsvpBox';

import messages from 'trns/foundation/EventCard.json';

/**
 * @module EventCard
 */

export const MAX_DESC_LEN = 150;
export const MAX_RECURRING_LIST = 5;

const trns = defineMessages({
	oneMemberWent: {
		id: 'event.oneMemberWent',
		defaultMessage: '1 member went',
	},
	xMembersWent: {
		id: 'event.xMembersWent',
		defaultMessage: '{count} members went',
	},
	oneMemberGoing: {
		id: 'event.oneMemberGoing',
		defaultMessage: '1 member going',
	},
	xMembersGoing: {
		id: 'event.xMembersGoing',
		defaultMessage: '{count} members going',
	},
	oneSpotLeft: {
		id: 'event.oneSpotLeft',
		defaultMessage: '1 spot left',
	},
	xSpotsLeft: {
		id: 'event.xSpotsLeft',
		defaultMessage: '{count} spots left',
	},
});

function getEventContent(event, onRsvpClick, narrow) {
	const statusProps = {};
	if (event.status === 'cancelled') {
		statusProps.children = 'Cancelled';
		statusProps.className = 'text--bold text--error';
	}
	if (event.status === 'draft') {
		statusProps.children = 'Draft';
		statusProps.className = 'text--bold text--error';
	}
	if (event.featured) {
		statusProps.children = 'Featured';
		statusProps.className = 'text--bold text--secondary';
	}
	statusProps.className = cx('event-status', statusProps.className);
	const statusMessage = statusProps.children ? <p { ...statusProps } /> : null;

	const rsvpAvatars = (event.rsvp_sample || []).map(({ member }) =>
		<AvatarMember
			className='margin--right'
			member={member}
			key={`${event.id}${member.id}`}
			small
		/>
	);
	const addlRsvpsMessage = event.yes_rsvp_count > rsvpAvatars.length && narrow ? (
		<span className='event-addlRsvps'>
			{`+${event.yes_rsvp_count - rsvpAvatars.length}`}
		</span>
	) : null;

	let wentMessage;
	if (event.yes_rsvp_count && event.status === 'past') {
		wentMessage = (
			<span className='event-attended'>
				{' · '}
				{
					event.yes_rsvp_count === 1 ?
						<FormattedMessage {...trns.oneMemberWent} /> :
						<FormattedMessage
							{...trns.xMembersWent}
							values={{ count: event.yes_rsvp_count }}
						/>
				}
			</span>
		);
	}
	const goingMessage = event.yes_rsvp_count === 1 ?
		<FormattedMessage {...trns.oneMemberGoing} /> :
		<FormattedMessage {...trns.xMembersGoing} values={{ count: event.yes_rsvp_count }} />;

	let spotsLeftMessage;
	if (event.hasOwnProperty('rsvp_limit') && event.status === 'upcoming') {
		const spotsLeft = Math.max(event.rsvp_limit - event.yes_rsvp_count, 0);
		spotsLeftMessage = (
			<p className={cx('event-spotsLeft', { 'text--error': spotsLeft < 5 && spotsLeft > 0 })}>
				{
					spotsLeft === 1 ?
						<FormattedMessage {...trns.oneSpotLeft} /> :
						<FormattedMessage {...trns.xSpotsLeft} values={{ count: spotsLeft }} />
				}
				{ spotsLeft < 1 ? ' · Waitlist available' : null }
			</p>
		);
	}

	let timeMessage;
	const yearAgo = new Date();
	yearAgo.setYear(new Date().getFullYear() - 1);
	if (new Date(event.time) > yearAgo) {
		timeMessage = (
			<span>
				<FormattedDate
					value={event.time}
					weekday='long'
				/>
				{' '}
				<FormattedTime
					value={event.time}
					hour='numeric'
					minute='numeric'
				/>
			</span>
		);
	} else {
		timeMessage = <FormattedRelative value={new Date(event.time)} units='year' />;
	}

	const nameHeading = (
		<h5 className={cx('event-name', { 'text--strikethrough': event.status === 'cancelled' })}>
			{event.name}
		</h5>
	);

	const infoHeading = (
		<p
			className={
				cx('wrap--singleLine--truncate chunk text--secondary',
					{ 'text--strikethrough': event.status === 'cancelled' })
			}>
			<span className='event-time'>
				{ timeMessage }
			</span>
			{ event.venue && event.status === 'upcoming' ? ' · ' : null }
			{ event.venue && event.status === 'upcoming' ? <span className='event-venue'>{event.venue.name}</span> : null }
			{ wentMessage }
		</p>
	);

	let description = null;
	if(event.description && event.status !== 'past' && !narrow){
		description = (
			<div className={cx('event-description', 'column-item', 'chunk')}>
				{event.description.substring(0, MAX_DESC_LEN)}
				{event.description.length > MAX_DESC_LEN ? '…' : null}
			</div>
		);
	}

	const dateContent = (
		<div className='row-item row-item--shrink'>
			<Tearsheet
				datetime={event.time}
				className='align--left'
			/>
		</div>
	);
	const detailsContent = (
		<div className='row-item column'>
			<div className='column-item row'>
				<div className='row-item column text--small'>
					<div className='column-item column-item--shrink'>
						{statusMessage}
					</div>
					<div className='column-item column-item--shrink'>
						{nameHeading}
					</div>
					<div className='column-item'>
						{infoHeading}
					</div>
					{ event.status === 'upcoming' ? (
						<div className='column-item column-item--shrink chunk'>
							{spotsLeftMessage}
							{rsvpAvatars} {addlRsvpsMessage}
							{narrow ? null : <div className='event-going'>{goingMessage}</div>}
						</div>
					) : null }
				</div>
				{ event.status === 'upcoming' && onRsvpClick ? (
					<div className='row-item row-item--shrink'>
						<RsvpBox
							onRsvpClick={onRsvpClick}
							event={event}
							narrow={narrow}
						/>
					</div>
				) : null }
			</div>
			{description}
		</div>
	);
	const className = cx('event--card row bordered padding--left padding--right', {
		'stripe--collection': event.status === 'past',
	});

	return event.group ? (
		<Link
			className={className}
			to={`/${event.group.urlname}/events/${event.id}`}>
			{dateContent}
			{detailsContent}
		</Link>
	) : (
		<div className={className}>
			{dateContent}
			{detailsContent}
		</div>
	);

}

/**
 * A listing of future instances of this event
 * @param {Object} series info about the recurring event series (e.g. description
 *   of the frequency of the recurrence
 * @param {Array} recurring the array of future event instances to list
 * @return {ReactElement} A div containing the formatted list of events
 */
function getRecurringEventList(series, recurring) {
	const recurringEventListItems = recurring &&
		recurring.slice(0, MAX_RECURRING_LIST).map((event, i) => (
			<li className='recurringList-item list-item' key={i}>
				<Link
					to={`${event.group.urlname}/events/${event.id}`}
					className='link text--bold display--block'>
					{event.name}
				</Link>
				<div className='row chunk'>
					<p className='row-item'>
						<FormattedDate
							value={event.time}
							weekday='long'
						/>
						{' '}
						<FormattedTime
							value={event.time}
							hour='numeric'
							minute='numeric'
						/>
					</p>
					<Link
						to={`${event.group.urlname}/events/${event.id}`}
						className='link row-item row-item--shrink'>
						{`${event.yes_rsvp_count} members going`}
					</Link>
				</div>
			</li>
		));

	return recurringEventListItems ? (
		<div className='recurringList attachment text--small stripe stripe--collection'>
			<h5 className='text--bold text--small chunk margin--left margin--right margin--top'>
				{`This Meetup repeats ${series.description}`}
			</h5>
			<div className='margin--left margin--right'>
				<ul className='list'>
					{recurringEventListItems}
				</ul>
			</div>
		</div>
	) : null;
}

/**
 * The event card
 */
class EventCard extends React.Component {
	render() {
		const {
			event,
			recurring,
			onRsvpClick,
			narrow,
			...other
		} = this.props;

		return (
			<IntlProvider messages={messages}>
				<div {...other}>
					{getEventContent(event, onRsvpClick, narrow)}
					{narrow ? null : getRecurringEventList(event.series, recurring)}
				</div>
			</IntlProvider>
		);
	}
}

EventCard.propTypes = {
	event: React.PropTypes.object.isRequired,
	recurring: React.PropTypes.array,
	onRsvpClick: React.PropTypes.func,
	narrow: React.PropTypes.bool
};

export default EventCard;
