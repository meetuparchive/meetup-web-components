import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);
		// onChange comment
		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @param e Event Object
	* @description ...
	*/
	onChange(e) {
		this.props.onChange && this.props.onChange(e.target.value);
		this.props.onChangeCallback && this.props.onChangeCallback(e.target.value);
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
					ref={ input => this.inputEl = input }
					{...other}
				/>
				{ error && <p className='text--error'>{error}</p> }
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
	onChangeCallback: PropTypes.func,
};

export default TimeInput;

