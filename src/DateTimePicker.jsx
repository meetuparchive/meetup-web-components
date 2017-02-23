import React from 'react';
import cx from 'classnames';
import Flatpickr from './FlatpickrComponent';
import TimeInput from './TimeInput';
import DateTimeLocalInput from './DateTimeLocalInput';

/**
 * @module DateTimePicker
 */
class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);

		const defaultDate = new Date();
		defaultDate.setMinutes(defaultDate.getMinutes() + 30);

		this.state = {
			value: {
				date: props.value.date || defaultDate,
				time: props.value.time || `${defaultDate.getHours()}:${defaultDate.getMinutes()}:00`
			},
			isDateTimeLocalSupported: false
		};

		this.setDate = this.setDate.bind(this);
		this.setTime = this.setTime.bind(this);
		this.parseDateTime = this.parseDateTime.bind(this);
	}

	componentWillMount() {
		this.setState({ isDateTimeLocalSupported: this.hasBrowserSupport() });
	}

	hasBrowserSupport() {
		const input = document.createElement('input'),
			invalidValue = 'notadate';

		// some browsers (as Android stock browsers) pretend they support
		// certain input types,
		// so we set the value to an invalid value and see if browser rejects

		input.setAttribute('type', 'datetime-local');
		input.setAttribute('value', invalidValue);

		return !(this.props.forceFlatpickr || input.value === invalidValue);
	}

	setDate(value) {
		this.setState({ value: { date: value }});
	}

	setTime(value) {
		this.setState({ value: { time: value }});
	}

	parseDateTime(value) {
		const datetime = value.split('T'),
			newState = {
				date: datetime[0],
				time: datetime[1]
			};
		this.setState(newState);
	}

	getDateTime() {
		[this.state.value.date, this.state.value.time].join('T');
	}

	render() {
		const {
			callback,			// eslint-disable-line no-unused-vars
			datepickerOptions,  // eslint-disable-line no-unused-vars
			id,
			label,
			value,				// eslint-disable-line no-unused-vars
			className,
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			className
		);

		if (this.state.isDateTimeLocalSupported) {
			return (
				<div>
					<label htmlFor={id}>{label}</label>
					<DateTimeLocalInput
						value={this.getDateTime()}
						className={classNames}
						callback={this.parseDateTime}
						{...other} />
				</div>
			);
		}

		return (
			<div>
				<label htmlFor={id}>{label}</label>
				<Flatpickr callback={this.setDate} value={this.state.value.date} />
				<TimeInput callback={this.setTime} value={this.state.value.time} />
			</div>
		);
	}
}

DateTimePicker.propTypes = {};

export default DateTimePicker;
