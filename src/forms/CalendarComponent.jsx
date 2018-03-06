import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import withErrorList from '../utils/components/withErrorList';

import Flatpickr from 'react-flatpickr';


/**
 * @module CalendarComponent
 * @description Single date picker component.
 * Wraps [react-flatpickr](github.com/coderhaoxin/react-flatpickr)
 *
 * For full documentation of available `datePickerOptions`, see:
 * https://chmln.github.io/flatpickr/options/
*/
export class CalendarComponent extends React.Component {
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
		this.props.onChange && this.props.onChange(selectedDates[0]);
	}

	render() {
		const {
			id,
			name,
			label,
			helperText,
			error,
			datepickerOptions,
			className,
			onChange, // eslint-disable-line no-unused-vars
			required,
			requiredText,
			...other
		} = this.props;

		const classNames = {
			label: cx(
				{
					'label--required': required,
					'flush--bottom': helperText,
				}
			),
			helperText: cx(
				'helperTextContainer',
				{ required }
			),
			field: cx(
				'input--dateTimePicker select--reset',
				{
					'field--error': Boolean(error)
				},
				className
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
			<span>
				{label && (
					<label htmlFor={id || name} className={classNames.label} data-requiredtext={required && requiredText}>
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
			</span>
		);
	}
}

CalendarComponent.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	datepickerOptions: PropTypes.object,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	helperText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	onChange: PropTypes.func, // provided by `redux-form`
	required: PropTypes.bool,
	requiredText: (props) => (
		props.required && !props.requiredText &&
			new Error('Inputs with `required` prop must provide also provide a translated string for "required" in the `requiredText` prop')
	)
};

CalendarComponent.defaultProps = {
	datepickerOptions: {}
};

export default withErrorList(CalendarComponent);
