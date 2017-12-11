/* eslint-disable no-return-assign */
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import withErrorList from '../utils/components/withErrorList';

/**
 * @module CalendarComponent
 * inits flatpickr js date picker over a text input
*/
export class CalendarComponent extends React.Component {
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
			altFormat: 'D M d, Y',
			defaultDate: this.props.value,
			nextArrow: `<span class="svg svg--chevron-right">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
				<use xlink:href="#icon-chevron-right" />
				</svg>
			</span>`,
			prevArrow: `<span class="svg svg--chevron-left">
				<svg preserveAspectRatio="xMinYMin meet" width="12" height="12" viewBox="0 0 12 12" className="svg-icon valign--middle" role="img">
				<use xlink:href="#icon-chevron-left" />
				</svg>
			</span>`,
			...this.props.datepickerOptions,
		};

		this.flatpickr = new Flatpickr(this.inputEl, options);
	}

	componentWillUnmount() {
		this.flatpickr && this.flatpickr.destroy();
	}

	// replaces updateFlatpickr
	// if we receive a new value from parent, update Flatpickr
	componentWillReceiveProps(newProps) {
		if (this.flatpickr) {
			if (newProps.datepickerOptions) {
				this.updateFlatpickrOptions(newProps.datepickerOptions);
			}
			this.flatpickr.setDate(newProps.value);
		}
	}

	/**
	 * Updates config options on the flatpickr instance
	 * @param {Object} newOptions new configaration options for flatpickr
	 * @return {undefined}
	 */
	updateFlatpickrOptions(newOptions) {
		Object.keys(newOptions)
			.filter(
				option => this.props.datepickerOptions[option] !== newOptions[option]
			)
			.forEach(option => {
				this.flatpickr.set(option, newOptions[option]);
			});
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
			name,
			label,
			required,
			value,
			datepickerOptions, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			helperText,
			...other
		} = this.props;

		const classNames = {
			label: cx(
				{
					required,
					'flush--bottom': helperText
				},
				className
			),
			helperText: cx(
				'helperTextContainer',
				{ required }
			),
			field: cx(
				'input--dateTimePicker select--reset',
				className
			)
		};


		return (
			<span>
				{label && (
					<label htmlFor={name} className={classNames.label}>
						{label}
					</label>
				)}
				{helperText &&
					<div className={classNames.helperText}>
						{helperText}
					</div>
				}
				<input
					type="text"
					id={name}
					name={name}
					defaultValue={value}
					className={classNames.field}
					ref={input => (this.inputEl = input)}
					{...other}
				/>
			</span>
		);
	}
}

CalendarComponent.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func, // provided by DateTimePicker or redux-form
	datepickerOptions: PropTypes.object,
	suppressError: PropTypes.bool,
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	])
};

CalendarComponent.defaultProps = {
	datepickerOptions: {},
	suppressError: false,
};

export default withErrorList(CalendarComponent);
