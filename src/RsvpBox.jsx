import React from 'react';
import cx from 'classnames';
import { FormattedDate, FormattedTime } from 'react-intl';
import Button from './Button';

/**
 * The RSVP box contains 3 main elements related to RSVPing for an event.
 *
 * 1. RSVP status button - use to set/update RSVP
 * 2. Fee information
 * 3. RSVP open/close times
 *
 * @module RsvpBox
 */
class RsvpBox extends React.Component {
	render() {
		const {
			event,
			onRsvpClick,
			className,
			narrow,
			...other
		} = this.props;

		const classNames = cx(
			'rsvpbox',
			'text--caption',
			className
		);

		// configure rsvp open/close info
		let rsvpTimeLimitMessage, rsvpTimeLimitTime;
		let openDate, closeDate;
		// get a Date object for the open time
		if ((event.rsvp_rules || {}).open_time) {
			openDate = new Date();
			openDate.setTime(event.rsvp_rules.open_time);
		}
		// get a Date object for the close time
		if ((event.rsvp_rules || {}).close_time) {
			closeDate = new Date();
			closeDate.setTime(event.rsvp_rules.close_time);
		}
		// configure for close date
		if (closeDate && closeDate > new Date()) {
			rsvpTimeLimitMessage = 'RSVP deadline:';
			rsvpTimeLimitTime = closeDate;
		}
		// configure for open date - should override close date message
		if (openDate && openDate > new Date()) {
			rsvpTimeLimitMessage = 'RSVP opens:';
			rsvpTimeLimitTime = openDate;
		}
		const rsvpTimeLimit = rsvpTimeLimitMessage && !narrow ? (
			<div style={{ justifyContent: 'flex-end' }}>
				<p className='event-timeLimit'>
					{rsvpTimeLimitMessage}<br />
					<FormattedDate
						value={rsvpTimeLimitTime}
						month='short'
						day='numeric'
					/>
					{', '}
					<FormattedTime
						value={rsvpTimeLimitTime}
						hour='numeric'
						minute='numeric'
					/>
				</p>
			</div>
		) : null;

		// Configure RSVP status button
		const rsvpButtonProps = {
			disabled: (
				(event.rsvp_rules || {}).closed
				// ((event.self || {}).actions || []).indexOf('rsvp') === -1
			),
		};
		if (event.status === 'upcoming' /* && event.self.actions.indexOf('rsvp') !== -1 */) {
			Object.assign(rsvpButtonProps, {
				children: '+',
				text: 'RSVP',
				className: 'rsvpButton--rsvp',
			});
			const spotsLeft = event.rsvp_limit - event.yes_rsvp_count;
			if (spotsLeft < 1) {
				Object.assign(rsvpButtonProps, {
					children: '+',
					text: 'Waitlist',
					className: 'rsvpButton--waitlist',
				});
			}
		}
		const rsvpResponse = event.self === undefined ? null : (event.self.rsvp || {}).response;
		if (rsvpResponse === 'yes') {
			Object.assign(rsvpButtonProps, {
				children: '✔',
				icon: '✔',
				text: 'I\'m going',
				className: 'rsvpButton--going',
			});
		}
		if (rsvpResponse === 'no') {
			Object.assign(rsvpButtonProps, {
				children: '✘',
				icon: '✘',
				text: 'Not going',
				className: 'rsvpButton--notGoing',
			});
		}
		if (rsvpResponse === 'waitlist') {
			Object.assign(rsvpButtonProps, {
				children: '⏸',
				icon: '⏸',
				text: 'Waitlist',
				contrast: true,
				className: 'rsvpButton--waitlisted',
			});
		}
		const rsvpButton = rsvpButtonProps.children ? (
			<div>
				{/* narrow ? rsvpButtonProps.icon : (
					<Button
						{ ...rsvpButtonProps }
						className={cx('rsvpButton', rsvpButtonProps.className)}
						onClick={onRsvpClick}
						fullWidth
						small
					/>
				)*/}
				<Button
					{ ...rsvpButtonProps }
					className={cx('rsvpButton', { 'display--none': rsvpButtonProps.disabled }, rsvpButtonProps.className)}
					onClick={onRsvpClick}
					small
				/>
			</div>
		) : null;

		// configure rsvp fee info
		const rsvpFeeMessage = event.fee ?
			`${event.fee.currency}${event.fee.amount} ${event.fee.description}` : null;
		const rsvpFeeItem = rsvpFeeMessage && !narrow ? (
			<span className='event-fee text--caption'>
				{rsvpFeeMessage}
			</span>
		) : null;

		return (
			<div
				className={classNames}
				{...other}>
				{rsvpButton}
				{/* rsvpFeeItem */ }
				{rsvpTimeLimit}
			</div>
		);
	}
}

RsvpBox.propTypes = {
	event: React.PropTypes.object.isRequired,
	onRsvpClick: React.PropTypes.func.isRequired,
	narrow: React.PropTypes.bool,
};

export default RsvpBox;

