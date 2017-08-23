import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @param e Event Object
	* @description called when the input changes, in turn calls the onChange
	* 	handler prop, if there is one provided (eg supplied by redux-form or DateTimePicker)
	*/
	onChange(e) {
		this.props.onChange && this.props.onChange(e.target.value);
	}

	render() {
		const {
			id,
			label,
			name,
			className,
			required,
			value,
			error,
			onChange,			// eslint-disable-line no-unused-vars
			onChangeCallback, 	// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--time',
			className
		);

		const labelClassNames = cx(
			'label--field',
			{ required }
		);

		const errorId = `${id}-error`;

		if (error) {
			other['aria-invalid'] = true;
			other['aria-describedby'] = errorId;
		}

		return (
			<span>
				{ label && <label htmlFor={id} className={labelClassNames}>{label}</label> }
				<input
					id={id}
					type='time'
					name={name}
					value={value}
					className={classNames}
					required={required}
					onChange={this.onChange}
					ref={ input => this.inputEl = input }
					{...other}
				/>
				{ error && <p id={errorId} className='text--error'>{error}</p> }
			</span>
		);

	}
}

TimeInput.propTypes = {
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool,
	onChange: PropTypes.func,			// redux-form or DateTimePicker provides an onChange prop
};

export default TimeInput;

