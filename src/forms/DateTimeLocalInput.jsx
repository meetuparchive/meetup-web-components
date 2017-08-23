import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module DateTimeLocalInput
 * @description renders html5 datetime-local input
*/
class DateTimeLocalInput extends React.Component {

	constructor(props) {
		super(props);
		// this.state = {
		// 	value: this.props.value ? (new Date(this.props.value).toISOString()).split('.')[0] : ''
		// 	// example: 2017-02-18T00:00:00
		// 	// leaving off milliseconds
		// 	// datetime local wont set value with milliseconds
		// };
		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @description sets state and calls a callback with the value
	* (callback used in wrapping components like datetimepicker)
	* @param e Event the change event
	*/
	onChange(e) {
		this.props.onChange && this.props.onChange(e.target.value);
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
	onChangeCallback: PropTypes.func
};

export default DateTimeLocalInput;

