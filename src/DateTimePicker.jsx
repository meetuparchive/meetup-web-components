import React from 'react';
import cx from 'classnames';
import CalendarComponent from './CalendarComponent';
import TimeInput from './TimeInput';
import DateTimeLocalInput from './DateTimeLocalInput';

/**
 * @module DateTimePicker
 * @description a component that renders a calendar ui and time input
 * defaults to datetime-local input on supported mobile browsers.
 */
class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			datetime: props.value ? new Date(props.value) : '',
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
	}

	/**
	* @function parseTimeFromDateTime
	* @description gets the time string part of our datetime state
	* @return String
	*/
	parseTimeFromDateTime(datetime) {
		return (datetime.toTimeString().split(' ')[0]).split(':', 2).join(':'); // TODO localize toLocaleTimeString ?
	}

	/**
	* @function getTime
	* @description gets the time portion of the state's datetime
	* @return String time portion of datetime  (hour and min)
	*/
	getTime() {
		if (!this.state.datetime) {
			return;
		}
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
		const newTime = new Date(value);
		const datetime = new Date(this.state.datetime);

		datetime.setTime(newTime.getTime());
		this.setDateTime(datetime);
	}

	/**
	* @function setDateTime
	* @description sets the state with the datetime value
	* @param value  datetime
	*/
	setDateTime(value) {
		this.setState({ datetime: new Date(value) });
		this.props.onChangeCallback(this.state.datetime, this.props.name);
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
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			{calendarTimeComponent : !dateOnly },
			{required},
			className
		);
		const labelClassNames = cx({required});
		const timeInputName = `${name}-time`;

		if (this.state.isDateTimeLocalSupported) {
			// TODO datetime-local opts ?

			return (
				<DateTimeLocalInput
					id={id}
					label={label}
					value={this.state.datetime}
					required={required}
					className={classNames}
					onChangeCallback={this.setDateTime}

					{...other} />
			);
		}

		// only set callbacks if this is a combo datetime component
		const onFocus = (dateOnly) ? null : this.onFocus;
		const onBlur = (dateOnly) ? null : this.onBlur;

		return (
			<div>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<div className={classNames}>

					<div>
						<CalendarComponent name={name}
							onChangeCallback={this.setDate}
							value={this.getDate()}
							onFocus={onFocus}
							onBlur={onBlur}
							opts={datepickerOptions}
							ref={ comp => this.dateComponent = comp }
						/>
						{ !dateOnly &&
								<TimeInput name={timeInputName}
									onChangeCallback={this.setTime}
									onFocus={onFocus}
									onBlur={onBlur}
									value={this.getTime()}
									ref={ comp => this.timeComponent = comp }
								/>
						}
						{ !dateOnly &&
							<input type='text'
									id='datetime-background'
									ref={ el => this.backgroundEl = el }
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}

DateTimePicker.propTypes = {
	datepickerOptions: React.PropTypes.object,
	label: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]),
	name: React.PropTypes.string.isRequired,
	required: React.PropTypes.bool,
	value: React.PropTypes.oneOfType([
		React.PropTypes.number,
		React.PropTypes.object,
		React.PropTypes.string
	]),
	dateOnly: React.PropTypes.bool,
	forceCalendar: React.PropTypes.bool,
	onChangeCallback: React.PropTypes.func
};

export default DateTimePicker;
