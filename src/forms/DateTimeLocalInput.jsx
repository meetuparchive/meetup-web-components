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

		const value = this.props.defaultValue || this.props.value;

		this.state = {
			value: value ? (new Date(value).toISOString()).split('.')[0] : ''
			// example: 2017-02-18T00:00:00
			// leaving off milliseconds
			// datetime local wont set value with milliseconds
		};
		this.handleChange = this.handleChange.bind(this);
	}

	/**
	* @function handleChange
	* @param e Event the change event
	* @description called when value changes and updates its own state in case it is controlled, 
	* but also calls onChange in case it has a parent that provides onChange 
	* (redux-form or wrapping components like datetimepicker provides this)
	*/
	handleChange(e) {
		this.setState({ value: e.target.value });

		this.props.onChange && this.props.onChange(e.target.value);
	}

	render() {
		const {
			id,
			label,
			className,
			required,
			defaultValue,	// eslint-disable-line no-unused-vars
			value,
			error,
			onChange,		// eslint-disable-line no-unused-vars
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

		// prefer the value if it is set from a parent, then state or self controlled in state
		const v = value || this.state.value;
		return (
			<div>
				<label htmlFor={id} className={labelClassNames}>{label}</label>
				<input
					id={id}
					type='datetime-local'
					value={v}
					className={classNames}
					onChange={this.handleChange}
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
	onChange: PropTypes.func, // provided by redux-form or by a wrapping component eg DateTimePicker
};

export default DateTimeLocalInput;

