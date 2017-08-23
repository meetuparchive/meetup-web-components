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

		this.onChange = this.onChange.bind(this);

		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);

		// this.updateFlatpickr = this.updateFlatpickr.bind(this);
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
			onChange: this.onChange,
			onOpen: this.onOpen,
			onClose: this.onClose,
			altInput: true,
			allowInput: true,
			altFormat: 'D M d, Y', // TODO localize
			defaultDate: this.props.value
		};

		Object.assign(options, this.props.opts);
		this.flatpickr = new Flatpickr(this.inputEl, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	/**
	* @function onFlatpickrChange
	* @param Array selectedDates
	* @param dateStr
	* @param Object instance the calendar instance
	* @description signature conforms to the onChange handler flatpickr expects
	* calls onChange if prop provided (eg from redux-form) and callback with the selectedDates value 
	* (callback used in wrapping components)
	*/
	onChange(selectedDates, dateStr, instance) {
		this.props.onChange && this.props.onChange(selectedDates[0]);
		this.props.onChangeCallback && this.props.onChangeCallback(selectedDates[0]);
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

	// replaces updateFlatpickr
	componentWillReceiveProps(newProps) {
		this.flatpickr.setDate(newProps.value);
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
			opts,				// eslint-disable-line no-unused-vars
			onChange,			// eslint-disable-line no-unused-vars
			onChangeCallback,	// eslint-disable-line no-unused-vars
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
	onChangeCallback: PropTypes.func
};

export default CalendarComponent;
