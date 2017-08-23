import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module DateTimeLocalInput
 * @description renders html5 datetime-local input, 
 * this component is supported on mobile browsers mostly, and should be used when supported
 * 
*/
class DateTimeLocalInput extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @param e Event the change event
	* @description called when value changes and in turn calls onChange from props (redux-form provides this)
	* and an onChangeCallback if provided (callback used in wrapping components like datetimepicker)
	*/
	onChange(e) {
		this.props.onChange && this.props.onChange(e.target.value); // onChange prop provided by redux-form

		// callback can come from a parent component, eg DateTimePicker
		this.props.onChangeCallback && this.props.onChangeCallback(e.target.value);
	}

	render() {
		const {
			id,
			label,
			className,
			required,
			value,
			error,
			onChangeCallback,	// eslint-disable-line no-unused-vars
			onChange, 			// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimeLocal',
			className
		);

		const labelClassNames = cx({required});

		const errorId = `${id}-error`;
		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = errorId;
		}

		return (
			<div>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<input
					id={id}
					type='datetime-local'
					value={value}
					className={classNames}
					onChange={this.onChange}
					required={required}
					{...other}
				/>
				{ error && <p className='text--error'>{error}</p> }
			</div>
		);

	}
}

DateTimeLocalInput.propTypes = {
	id: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	onChange: PropTypes.func, // provided by redux-form
	onChangeCallback: PropTypes.func // provided by a wrapping component eg DateTimePicker
};

export default DateTimeLocalInput;

