import React from 'react';
import cx from 'classnames';
import Flatpickr from 'flatpickr';

/**
 * @module DateTimePicker
 */
class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
			isSupported: false
		};
		this.onChange = this.onChange.bind(this);
	}

	// test for browser support
	componentWillMount() {
		const input = document.createElement('input'),
			invalidValue = 'notadate';

		input.setAttribute('type', 'datetime-local');
		input.setAttribute('value', invalidValue);

		// adding false to view storybook
		// in chrome since chrome supports
		const isInvalidValueDenied = (false && input.value !== invalidValue);

		// some browsers (as Android stock browsers) pretend they support
		// certain input types, so set the value and see
		this.setState({ isSupported: isInvalidValueDenied });
	}

	// init the js datetime component
	// if there is no native support
	componentDidMount() {
		if (!this.state.isSupported) {
			const options = {
				...this.props.datepickerOptions,
				onChange: this.onChange,
				altInput: true,
				altFormat: 'M d, Y h:i K' // TODO localize
			};
			this.flatpickr = new Flatpickr(this.node, options);
		}
	}

	componentWillReceiveProps(props) {
		this.flatpickr && this.flatpickr.setDate(this.state.value);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	// conforms with flatpickr onChange args
	onChange(selectedDates, dateStr, instance) {
		const newValue = (this.flatpickr) ? selectedDates[0] : selectedDates.target.value;
		this.setState({ value: newValue });
	}

	render() {
		const {
			datepickerOptions,  // eslint-disable-line no-unused-vars
			id,
			label,
			value,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'dateTimePicker',
			className
		);

		// if its supported natively, control the value through state and use onChange
		// if not, we provide a defaultValue and let flatpickr onChange handle it
		const onChangeProp = this.state.isSupported ? this.onChange : null;
		const valueProp = this.state.isSupported ? { value: this.state.value } : { defaultValue: value };

		return (
			<div>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					type={this.state.isSupported ? 'datetime-local' : 'text'}
					className={classNames}
					ref={ node => this.node = node }
					{...valueProp}
					onChange={onChangeProp}
					{...other} />
			</div>
		);
	}
}

DateTimePicker.propTypes = {};

export default DateTimePicker;
