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

		const propsValue = props.value || {};
		this.state = {
			value: {
				date: propsValue.date || '',
				time: propsValue.time || ''
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

	getDateTime() { return `${this.state.value.date}T${this.state.value.time}`; }

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
		);

		const labelClassNames = cx({required});
		if (this.state.isDateTimeLocalSupported) {

			const dateTimeLocalOpts = {
				min: `${datepickerOptions.minDate}T00:00:00`,
				max: `${datepickerOptions.maxDate}T00:00:00`
			};

			return (
				<DateTimeLocalInput
					id={id}
					label={label}
					value={this.getDateTime()}
					required={required}
					className={classNames}
					callback={this.parseDateTime}
					{...dateTimeLocalOpts}
					{...other} />
			);
		}

		// TODO disambiguate name prop
		return (
			<div>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<Flatpickr name={name} callback={this.setDate} value={this.state.value.date} opts={datepickerOptions} />
				{ !dateOnly && <TimeInput name={name} callback={this.setTime} value={this.state.value.time} /> }
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
	value: React.PropTypes.object,
	dateOnly: React.PropTypes.bool,
	forceFlatpickr: React.PropTypes.bool
};

export default DateTimePicker;
