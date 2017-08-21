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

	onChange(e) {
		this.props.onChange && this.props.onChange(e.target.value);
		console.log('do I have a clabback???', this.props.datetimePickerCallback);
		this.props.datetimePickerCallback && this.props.datetimePickerCallback(e.target.value);
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
			hideLabel,
			datetimePickerCallback,	// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--time',
			className
		);

		const labelClassNames = cx(
			'label--field',
			{ 'visibility--a11yHide' : hideLabel },
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
					onChange={this.onChange}
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
	datetimePickerCallback: PropTypes.func,
};

export default TimeInput;

