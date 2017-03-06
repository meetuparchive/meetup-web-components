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
	}

	componentWillMount() {
		this.setState({ isDateTimeLocalSupported: this.hasBrowserSupport() });
	}

	/**
	* @function hasBrowserSupport
	* @description test if this browser supports datetime local
	* @return bool whether or not this browser supports datetime local
	*/
	hasBrowserSupport() {
		const input = document.createElement('input'),
			invalidValue = 'notadate';

		// some browsers (as Android stock browsers) pretend they support
		// certain input types,
		// so we set the value to an invalid value and see if browser rejects

		input.setAttribute('type', 'datetime-local');
		input.setAttribute('value', invalidValue);

		return !(this.props.forceCalendar || input.value === invalidValue);
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

		datetime.setFullYear(newDate.getFullYear(), newDate.getFullMonth(), newDate.getDate());
		this.setState({ datetime });
	}

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
	* @description gsets the time portion of the state's datetime
	* @param value String valid time string
	*/
	setTime(value) {
		const newTime = new Date(value);
		const datetime = new Date(this.state.datetime);

		datetime.setTime(newTime.getTime());
		this.setState({ datetime });
	}

	setDateTime(value) {
		this.setState({ datetime: new Date(value) });
	}

	render() {
		const {
			callback,			// eslint-disable-line no-unused-vars
			className,
			dateOnly,
			datepickerOptions,  // eslint-disable-line no-unused-vars
			id,
			label,
			value,				// eslint-disable-line no-unused-vars
			required,
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			{required},
			className
		),
			labelClassNames = cx({required}),
			timeInputName = `${name}-time`;

		if (this.state.isDateTimeLocalSupported) {
			// TODO datetime-local opts ?

			return (
				<DateTimeLocalInput
					id={id}
					label={label}
					value={this.state.datetime}
					required={required}
					className={classNames}
					callback={this.setDateTime}
					{...other} />
			);
		}

		return (
			<div className={classNames}>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<CalendarComponent name={name}
					callback={this.setDate}
					value={this.getDate()}
					opts={datepickerOptions} />

				{ !dateOnly &&
					<TimeInput name={timeInputName}
						callback={this.setTime}
						value={this.getTime()} /> }
			</div>
		);
	}
}

DateTimePicker.propTypes = {
	callback: React.PropTypes.func,
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
	forceCalendar: React.PropTypes.bool
};

export default DateTimePicker;
