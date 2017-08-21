import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import CalendarComponent from './CalendarComponent';
import TimeInput from './TimeInput';
import DateTimeLocalInput from './DateTimeLocalInput';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

/**
 * @module DateTimePicker
 * @description a component that renders a calendar ui and time input
 * defaults to datetime-local input on supported mobile browsers.
 */
class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);

		const datetime = props.value ? new Date(props.value) : new Date();

		this.state = {
			datetime,
			isDateTimeLocalSupported: false
		};

		this.getDate = this.getDate.bind(this);
		this.setDate = this.setDate.bind(this);

		this.getTime = this.getTime.bind(this);
		this.setTime = this.setTime.bind(this);

		this.setDateTime = this.setDateTime.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}
	/**
	/* call `hasBrowserSupport` after mounting so server
	/* and client-side renders match, then immediately
	/* force a re-render. otherwise, client-side render
	/* will default to the server render, which never has
	/* browser support.
	/* @returns {undefined}
	*/
	componentDidMount() {
		this.setState({ isDateTimeLocalSupported: this.hasBrowserSupport() });
	}

	/**
	* @function hasBrowserSupport
	* @description test if this browser supports datetime local
	* @return bool whether or not this browser supports datetime local
	*/
	hasBrowserSupport() {
		if (this.props.forceCalendar || typeof document === 'undefined') {
			return false;
		}

		const input = document.createElement('input'),
			invalidValue = 'notadate';

		// some browsers (as Android stock browsers) pretend they support
		// certain input types,
		// so we set the value to an invalid value and see if browser rejects

		input.setAttribute('type', 'datetime-local');
		input.setAttribute('value', invalidValue);

		return input.value !== invalidValue;
	}

	/**
	* @function getDate
	* @description gets a date from the datetime value in state
	* @return Date
	*/
	getDate() {
		if (!this.state.datetime) {
			return;
		}
		const datetime = new Date(this.state.datetime);
		return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate());
	}

	/**
	* @function setDate
	* @description sets the date portion of the state's datetime
	* @param Date value date to set in state
	*/
	setDate(value) {
		const newDate = new Date(value);
		const datetime = new Date(this.state.datetime);

		datetime.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
		this.setDateTime(datetime);

		// this.dateComponent.setState({
		// 	value: datetime
		// });

		// update flatpickr on update
		// this.dateComponent.updateFlatpickr();
	}

	/**
	* @function parseTimeFromDateTime
	* @description gets the time string part of our datetime state
	* @param Date datetime - datetime object to be parsed
	* @return String
	*/
	parseTimeFromDateTime(datetime) {
		return (datetime.toTimeString().split(' ')[0]).split(':', 2).join(':'); // TODO: localization/i18n SDS-247
	}

	/**
	* @function parseHoursAndMinutesFromTimeString
	* @description takes a time string and returns an array of hours and minutes
	* @param String timeString a 24-hour time string, eg `18:45`
	* @return Array [0] - the hours, [1] - the minutes
	*/
	parseHoursAndMinutesFromTimeString(timeString) {
		return timeString.split(':'); // TODO: localization/i18n SDS-247
	}


	/**
	* @function parseNewTimeAsDate
	* @description takes a time string in 24hr time (e.g. `18:35`)
	* and converts it to a Date object with the current state's date and timezone
	* @return Date new date with current date and the given time
	*/
	parseNewTimeAsDate(timeStr) {
		const { datetime } = this.state;
		const parsedTime = this.parseHoursAndMinutesFromTimeString(timeStr);

		datetime.setHours(parsedTime[0], parsedTime[1]);

		return datetime;
	}

	/**
	* @function getTime
	* @description gets the time portion of the state's datetime
	* @return String time portion of datetime  (hour and min)
	*/
	getTime() {
		const datetime = new Date(this.state.datetime);
		// split on space and leave off timezone and seconds
		return this.parseTimeFromDateTime(datetime);
	}

	/**
	* @function setTime
	* @description sets the time portion of the state's datetime
	* @param value String valid time string
	*/
	setTime(value) {
		const datetime = this.parseNewTimeAsDate(value);
		this.setDateTime(datetime);
	}

	/**
	* @function setDateTime
	* @description sets the datetime when changed
	* @param value  datetime
	*/
	setDateTime(value) {
		const datetime = new Date(value);
		this.setState({ datetime });

		// for redux form
		this.props.onChange && this.props.onChange(datetime);
	}

	/**
	* @function onFocus
	* @param Event e
	* @description called if datetime compound component and used to set focused
	* class on combo component
	*/
	onFocus(e) {
		this.backgroundEl.classList.add('focused');
	}

	/**
	* @function onBlur
	* @param Event e
	* @description called when either of the date or time inputs is blurred
	* takes off focus class when neither of them are in focus
	*/
	onBlur(e) {
		const timeInput = this.timeComponent.inputEl;
		const dateInput = this.dateComponent.inputEl;
		if (document.activeElement !== timeInput && document.activeElement !== dateInput) {
			this.backgroundEl.classList.remove('focused');
		}
	}

	render() {
		const {
			className,
			dateOnly,
			datepickerOptions,	// eslint-disable-line no-unused-vars
			id,
			label,
			value,	// eslint-disable-line no-unused-vars
			required,
			name,
			error,
			timeProps,
			legend,
			showLegend,
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			{calendarTimeComponent : !dateOnly },
			{required},
			{ 'field--error': error },
			className
		);
		const childClasses = cx(
			{ 'field--error': error }
		);

		const labelClassNames = cx({required});

		const legendClassNames = cx(
			{required},
			{ 'visibility--a11yHide' : !showLegend }
		);

		const timeInputName = `${name}-time`;

		if (this.state.isDateTimeLocalSupported) {
			// TODO datetime-local opts ?

			return (
				<div>
					<DateTimeLocalInput
						id={id}
						label={label}
						value={this.state.datetime}
						required={required}
						className={classNames}
						onChangeCallback={this.setDateTime}

						{...other} />
					{ error && <p className='text--error'>{error}</p> }
				</div>
			);
		}

		// only set callbacks if this is a combo datetime component
		const onFocus = (dateOnly) ? null : this.onFocus;
		const onBlur = (dateOnly) ? null : this.onBlur;

		const calendarErrorId = `calendar-error-${new Date()}`;

		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = calendarErrorId;
		}

		const calendarComponent = (
			<CalendarComponent
				id={id}
				name={name}
				required={required}
				datetimePickerCallback={this.setDate}
				value={this.getDate()}
				onFocus={onFocus}
				onBlur={onBlur}
				opts={datepickerOptions}
				className={childClasses}
				{...other}
				ref={ comp => this.dateComponent = comp }
			/>
		);

		return (
			<div>
				{dateOnly && calendarComponent}
				{!dateOnly &&
					<fieldset>
						{legend && <legend className={legendClassNames}>{legend}</legend>}
						{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
						<Flex>
							<FlexItem>
								{calendarComponent}
							</FlexItem>
							<FlexItem>
								<TimeInput
									name={timeInputName}
									id={(timeProps && timeProps.id) || `${id}-time`}
									datetimePickerCallback={this.setTime}
									onFocus={onFocus}
									onBlur={onBlur}
									value={this.getTime()}
									ref={ comp => this.timeComponent = comp }
									className={childClasses}
									{...timeProps}
								/>
							</FlexItem>
						</Flex>
					</fieldset>
				}
				{ error && <p id={calendarErrorId} className='text--error'>{error}</p> }

			</div>
		);
	}
}

DateTimePicker.propTypes = {
	datepickerOptions: PropTypes.object,
	label: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string
	]),
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.object,
		PropTypes.string
	]),
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	dateOnly: PropTypes.bool,
	forceCalendar: PropTypes.bool,
};

export default DateTimePicker;
