import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flatpickr from 'react-flatpickr';

export const CLASSES = {
	helperText: 'helperTextContainer',
	field: 'input--dateTimePicker select--reset',
};

/**
 * @module CalendarComponent
 * @description Single date picker component.
 * Wraps [react-flatpickr](github.com/coderhaoxin/react-flatpickr)
 *
 * For full documentation of available `datePickerOptions`, see:
 * https://chmln.github.io/flatpickr/options/
*/
class CalendarComponent extends React.Component {
	constructor(props) {
		super(props);

		this.onFlatPickerChange = this.onFlatPickerChange.bind(this);
	}

	/**
	 * @function onFlatPickerChange
	 * @param {Array} selectedDates - list of recently selected dates from flatpickr
	 *
	 * @description the Flatpickr component always passes an array of recently selected
	 * dates to its onChange handler, with the most recent in first position of the array.
	 * `redux-form` however, expects a single value. This function ensures that any `onChange`
	 * prop passed to this component invokes with a single date object.
	 */
	onFlatPickerChange(selectedDates) {
		console.warn(`FIRST SELECTED DATE FROM COMPONENT: ${selectedDates[0]}`);
		this.props.onChange && this.props.onChange(selectedDates[0]);
	}

	render() {
		const {
			id,
			name,
			label,
			helperText,
			error,
			suppressError,
			required,
			datepickerOptions,
			className,
			...other
		} = this.props;

		const classNames = {
			label: cx(
				{
					required,
					'flush--bottom': helperText,
				},
				className
			),
			helperText: cx(
				CLASSES.helperText,
				{ required }
			),
			field: cx(
				CLASSES.field,
				{
					'field--error': error
				}
			)
		};

		const options = {
			altInput: true,
			altFormat: 'D M d, Y',
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
			...datepickerOptions
		};

		return (
			<div>
				{label && (
					<label htmlFor={id || name} className={classNames.label}>
						{label}
					</label>
				)}
				{helperText &&
					<div className={classNames.helperText}>
						{helperText}
					</div>
				}
				<Flatpickr
					id={id || name}
					options={options}
					aria-label="Use arrow keys to navigate the calendar"
					className={classNames.field}
					onChange={this.onFlatPickerChange}
					{...other}
				/>
				{!suppressError &&
					error && <p className="text--error text--small">{error}</p>}
			</div>
		);
	}
}

CalendarComponent.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	datepickerOptions: PropTypes.object,
	required: PropTypes.bool,
	suppressError: PropTypes.bool,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

CalendarComponent.defaultProps = {
	datepickerOptions: {},
	suppressError: false,
};

export default CalendarComponent;
