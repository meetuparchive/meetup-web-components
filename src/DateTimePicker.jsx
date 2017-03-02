import React from 'react';
import cx from 'classnames';
import Flatpickr from './FlatpickrComponent';
import TimeInput from './TimeInput';

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

		this.usingMobileInput = false;
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

	setIsMobile(component) {
		if (!component) { // check in case component ref is cleared out and null
			return;
		}
		this.isMobile = !!(component.flatpickr.isMobile);
	}

	render() {
		const {
			callback,			// eslint-disable-line no-unused-vars
			className,
			datepickerOptions,  // eslint-disable-line no-unused-vars
			dateOnly,
			id,
			label,
			value,				// eslint-disable-line no-unused-vars
			required,
			...other			// eslint-disable-line no-unused-vars
		} = this.props;

		const classNames = cx(
			'dateTimePicker--wrap',
			className),
			labelClassNames = cx({required});


		const timeName = `${name}-time`,
			setIsMobile = this.setIsMobile.bind(this);

		return (
			<div className={classNames}>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<Flatpickr ref={setIsMobile}
					name={name}
					callback={this.setDate}
					value={this.state.value.date}
					opts={datepickerOptions}
					dateOnly={dateOnly}
				/>
				{ !(dateOnly || this.isMobile) && <TimeInput name={timeName} callback={this.setTime} value={this.state.value.time} /> }
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
