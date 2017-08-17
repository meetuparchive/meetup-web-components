import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
* @module TimeInput
*/
class TimeInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value || ''
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ value: e.target.value });
		this.props.onChangeCallback && this.props.onChangeCallback(e.target.value);
	}

	render() {
		const {
			onChangeCallback,	// eslint-disable-line no-unused-vars
			id,
			label,
			name,
			className,
			required,
			value,		// eslint-disable-line no-unused-vars
			error,
			hideLabel,
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
					value={this.state.value}
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
	onChangeCallback: PropTypes.func,
	name: PropTypes.string.isRequired,
	error: PropTypes.string,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	required: PropTypes.bool
};

export default TimeInput;

