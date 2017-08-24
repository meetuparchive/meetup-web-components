import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module CalendarComponent
 * inits flatpickr js date picker over a text input
*/
class CalendarComponent extends React.Component {

	constructor(props) {
		super(props);

		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);

		this.onFlatpickrChange = this.onFlatpickrChange.bind(this);
	}

	/**
	* @description init the js date flatpickr component
	*/
	componentDidMount() {
		// flatpickr uses `window` on import,
		// which breaks on server-sider render.
		// lazy-loading flatpickr ensures it is
		// imported only in clientside envs.
		const Flatpickr = require('flatpickr');
		const options = {
			onChange: this.onFlatpickrChange,
			onOpen: this.onOpen,
			onClose: this.onClose,
			altInput: true,
			allowInput: true,
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value
		};

		Object.assign(options, this.props.datepickerOptions);
		this.flatpickr = new Flatpickr(this.inputEl, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	// replaces updateFlatpickr
	// if we receive a new value from parent, update Flatpickr
	componentWillReceiveProps(newProps) {
		this.flatpickr.setDate(newProps.value);
	}

	/**
	* @function onFlatpickrChange
	* @param Array selectedDates
	* @param dateStr
	* @param Object instance the calendar instance
	* @description signature conforms to the onChange handler flatpickr expects
	* calls onChange if prop provided (eg from redux-form or wrapping components like DateTimePicker)
	*/
	onFlatpickrChange(selectedDates, dateStr, instance) {
		this.props.onChange && this.props.onChange(selectedDates[0]);
	}

	/**
	* @function onOpen
	* @description event hook for flatpickr, used to call onFocus
	* and apply focus highlight if this is a DateTimePicker
	*/
	onOpen() {
		this.props.onFocus && this.props.onFocus();
	}

	/**
	* @function onClose
	* @description event hook for flatpickr, used to call onBlur
	* and remove focus highlight if this is a DateTimePicker
	*/
	onClose() {
		this.props.onBlur && this.props.onBlur();
	}

	render() {
		const {
			className,
			id,
			name,
			label,
			required,
			value,
			error,
			datepickerOptions,	// eslint-disable-line no-unused-vars
			onChange,			// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimePicker',
			className
		);

		const labelClassNames = cx(
			{required},
			className
		);

		return (
			<span>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				<input
					type='text'
					id={id}
					name={name}
					defaultValue={value}
					className={classNames}
					ref={ input => this.inputEl = input }
					{...other} />

				{ error && <p className='text--error'>{error}</p> }
			</span>
		);
	}
}

CalendarComponent.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func // provided by DateTimePicker or redux-form
};

export default CalendarComponent;
