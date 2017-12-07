import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import withErrorList from '../utils/components/withErrorList';

/**
 * @module DateTimeLocalInput
 * @description renders html5 datetime-local input,
 * this component is supported on mobile browsers mostly, and should be used when supported
 *
*/
export class DateTimeLocalInput extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	/**
	* @function onChange
	* @param e Event the change event
	* @description called when value changes and in turn calls onChange from props
	* (redux-form or wrapping components like datetimepicker provides this)
	*/
	onChange(e) {
		this.props.onChange && this.props.onChange(e.target.value);
	}

	render() {
		const {
			id,
			label,
			className,
			required,
			value,
			error,
			onChange, 			// eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'input--dateTimeLocal select--reset',
			className,
			{ 'field--error': error }
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
	onChange: PropTypes.func.isRequired, // provided by redux-form or by a wrapping component eg DateTimePicker
};

export default withErrorList(DateTimeLocalInput);

