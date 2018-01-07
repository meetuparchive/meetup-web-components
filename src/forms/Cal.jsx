import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flatpickr from 'react-flatpickr';

export const CLASSES = {
	helperText: 'helperTextContainer',
	field: 'input--dateTimePicker select--reset',
};

/**
 * @module Cal
 * @description Single date picker component.
 * Wraps [react-flatpickr](github.com/coderhaoxin/react-flatpickr)
 *
 * For full documentation of available `datePickerOptions`, see:
 * https://chmln.github.io/flatpickr/options/
*/
class Cal extends React.Component {
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
					{...other}
				/>
				{!suppressError &&
					error && <p className="text--error text--small">{error}</p>}
			</div>
		);
	}
}

Cal.propTypes = {
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

Cal.defaultProps = {
	datepickerOptions: {},
	suppressError: false,
};

export default Cal;
